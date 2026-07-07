from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path

from .artifacts import (
    ProgressState,
    artifact_exists,
    clear_pending_review_state,
    ensure_workspace_directory,
    load_progress_state,
    load_pending_review_state,
    read_markdown_artifact,
    validate_pending_review_artifact_path,
    write_markdown_artifact,
    write_pending_review_state,
    write_progress_state,
)
from .core_assets import TechnicalBlogCoreAssets, WorkflowBlockedError, load_technical_blog_core_assets
from .gates import GateCommandResult, PendingReviewState, ensure_pending_review_for_gate


KNOWN_WORKFLOW_NAME = "technical-blog"
KNOWN_STEP_NAMES = ("brief", "sources", "outline", "draft", "review", "final")
KNOWN_ARTIFACT_NAMES = (
    "brief.md",
    "sources.md",
    "outline.md",
    "draft.md",
    "review.md",
    "final.md",
)


@dataclass(frozen=True)
class TechnicalBlogStep:
    name: str
    input_artifacts: tuple[str, ...]
    output_artifact: str
    model_role: str
    human_review: bool


@dataclass(frozen=True)
class WorkflowRunResult:
    workflow_name: str
    step_name: str
    artifact_path: Path
    export_names: tuple[str, ...]
    memory_enabled: bool
    model_strategy: str
    detail: str


def run_technical_blog_step(
    *,
    repo_root: Path,
    workspace: Path,
    command_name: str,
    topic: str,
    notes: str,
    workflow_name: str = KNOWN_WORKFLOW_NAME,
) -> WorkflowRunResult:
    if workflow_name != KNOWN_WORKFLOW_NAME:
        raise WorkflowBlockedError(f"BLOCKED: unsupported workflow {workflow_name!r}")
    if command_name not in {"start", "resume"}:
        raise WorkflowBlockedError(f"BLOCKED: unsupported workflow command {command_name!r}")

    workspace = ensure_workspace_directory(workspace)
    assets = load_technical_blog_core_assets(repo_root)
    steps = _load_steps(assets)
    pending_review = load_pending_review_state(workspace)
    if pending_review is not None:
        raise WorkflowBlockedError(
            "BLOCKED: pending review is active for "
            f"{pending_review.step_name!r}; use continue, revise, or abort before resuming"
        )
    step = _select_next_step(workspace, steps)
    artifact_path = write_markdown_artifact(
        workspace,
        step.output_artifact,
        _render_step(step=step, workspace=workspace, assets=assets, topic=topic, notes=notes),
    )

    pending_review = None
    if step.human_review:
        pending_review = PendingReviewState(
            workflow_name=KNOWN_WORKFLOW_NAME,
            step_name=step.name,
            artifact_name=step.output_artifact,
            artifact_path=str(artifact_path),
            command_name=command_name,
        )
        write_pending_review_state(workspace, pending_review)
    else:
        clear_pending_review_state(workspace)

    write_progress_state(
        workspace,
        ProgressState(
            workflow_name=KNOWN_WORKFLOW_NAME,
            current_step=step.name if pending_review is not None else _next_step_name(steps, step.name),
            last_completed_step=step.name,
            pending_review=pending_review.to_dict() if pending_review is not None else None,
        ),
    )

    detail = "started workflow" if command_name == "start" else "resumed workflow from existing workspace artifacts"
    return WorkflowRunResult(
        workflow_name=KNOWN_WORKFLOW_NAME,
        step_name=step.name,
        artifact_path=artifact_path,
        export_names=assets.export_names,
        memory_enabled=False,
        model_strategy="single-hermes-session",
        detail=detail,
    )


def run_review_gate_command(
    *,
    repo_root: Path,
    workspace: Path,
    command_name: str,
    workflow_name: str = KNOWN_WORKFLOW_NAME,
) -> WorkflowRunResult:
    if workflow_name != KNOWN_WORKFLOW_NAME:
        raise WorkflowBlockedError(f"BLOCKED: unsupported workflow {workflow_name!r}")
    if command_name not in {"continue", "revise", "abort"}:
        raise WorkflowBlockedError(f"BLOCKED: unsupported review gate command {command_name!r}")

    workspace = ensure_workspace_directory(workspace)
    pending_review = ensure_pending_review_for_gate(
        load_pending_review_state(workspace),
        gate_command=command_name,
    )
    if pending_review.workflow_name != workflow_name:
        raise WorkflowBlockedError("BLOCKED: pending-review workflow does not match the requested workflow")
    validate_pending_review_artifact_path(workspace, pending_review)
    progress_state = _load_or_default_progress_state(workspace, pending_review)

    if command_name == "continue":
        assets = load_technical_blog_core_assets(repo_root)
        steps = _load_steps(assets)
        gate_result = _continue_after_review(
            workspace=workspace,
            assets=assets,
            steps=steps,
            pending_review=pending_review,
            progress_state=progress_state,
        )
        export_names = assets.export_names
    elif command_name == "revise":
        gate_result = _preserve_review_block(workspace=workspace, pending_review=pending_review)
        export_names = ()
    else:
        gate_result = _abort_review(workspace=workspace, pending_review=pending_review, progress_state=progress_state)
        export_names = ()

    return WorkflowRunResult(
        workflow_name=KNOWN_WORKFLOW_NAME,
        step_name=gate_result.step_name,
        artifact_path=gate_result.artifact_path,
        export_names=export_names,
        memory_enabled=False,
        model_strategy="single-hermes-session",
        detail=gate_result.detail,
    )


def _load_steps(assets: TechnicalBlogCoreAssets) -> tuple[TechnicalBlogStep, ...]:
    workflow = assets.workflow
    raw_steps = workflow.get("steps")
    if not isinstance(raw_steps, list):
        raise WorkflowBlockedError("BLOCKED: technical-blog workflow public export is missing a step list")

    steps = tuple(
        TechnicalBlogStep(
            name=_required_step_string(step, "name"),
            input_artifacts=_required_step_input_artifacts(step),
            output_artifact=_required_step_string(step, "output"),
            model_role=_required_step_string(step, "modelRole"),
            human_review=_required_step_bool(step, "humanReview"),
        )
        for step in raw_steps
    )
    if tuple(step.name for step in steps) != KNOWN_STEP_NAMES:
        raise WorkflowBlockedError(
            "BLOCKED: technical-blog step order changed in @pandaria/quill/core public exports"
        )
    if tuple(step.output_artifact for step in steps) != KNOWN_ARTIFACT_NAMES:
        raise WorkflowBlockedError(
            "BLOCKED: technical-blog artifact names changed in @pandaria/quill/core public exports"
        )
    return steps


def _select_next_step(workspace: Path, steps: tuple[TechnicalBlogStep, ...]) -> TechnicalBlogStep:
    for step in steps:
        if artifact_exists(workspace, step.output_artifact):
            continue
        missing = [name for name in step.input_artifacts if not artifact_exists(workspace, name)]
        if missing:
            raise WorkflowBlockedError(
                f"BLOCKED: missing required input artifacts for step {step.name!r}: {', '.join(missing)}"
            )
        return step
    raise WorkflowBlockedError("BLOCKED: all technical-blog MVP artifacts already exist in the workspace")


def _render_step(
    *,
    step: TechnicalBlogStep,
    workspace: Path,
    assets: TechnicalBlogCoreAssets,
    topic: str,
    notes: str,
) -> str:
    style_profile = _required_text_asset(
        assets.style_profiles,
        "default",
        "style profile",
    )
    template = _required_text_asset(assets.templates, step.name, "template")
    prompt = _required_text_asset(assets.prompts, step.name, "prompt")
    contract = _skill_contract_for_step(step.name, assets)

    if step.name == "brief":
        return (
            template
            + "\n\n"
            + "## Hermes Runner Notes\n\n"
            + f"- Topic seed: {topic}\n"
            + "- Generated by the bounded Hermes technical-blog runner.\n"
            + "- Memory remains disabled.\n"
            + "- Model strategy remains a single Hermes-configured session.\n"
            + (f"- User notes seed: {notes}\n" if notes else "- User notes seed: none provided.\n")
        )

    inputs = _read_inputs(workspace, step.input_artifacts)
    return (
        template
        + "\n\n"
        + "## Hermes Runner Context\n\n"
        + f"- Step: {step.name}\n"
        + f"- Model role hint from Quill Core: {step.model_role}\n"
        + f"- Human review flag from Quill Core: {'true' if step.human_review else 'false'}\n"
        + "- Memory remains disabled.\n"
        + "- Model strategy remains a single Hermes-configured session.\n"
        + (f"- Topic seed: {topic}\n" if topic else "")
        + (f"- User notes seed: {notes}\n" if notes else "")
        + "\n## Source Inputs\n\n"
        + inputs
        + "\n\n## Prompt Reference\n\n```\n"
        + prompt
        + "\n```\n\n## Skill Contract Reference\n\n"
        + contract
        + "\n\n## Style Profile Reference\n\n```\n"
        + style_profile
        + "\n```\n"
    )


def _skill_contract_for_step(step_name: str, assets: TechnicalBlogCoreAssets) -> str:
    mapping = {
        "brief": "brief-builder",
        "sources": "source-organizer",
        "outline": "outline-builder",
        "draft": "draft-writer",
        "review": "style-reviewer",
        "final": "final-polisher",
    }
    if step_name not in mapping:
        raise WorkflowBlockedError(f"BLOCKED: no writing skill contract mapping for step {step_name!r}")
    skill_id = mapping[step_name]
    if skill_id not in assets.writing_skill_contracts:
        raise WorkflowBlockedError(
            f"BLOCKED: missing writing skill contract public export for {skill_id!r}"
        )
    return assets.writing_skill_contracts[skill_id].rstrip()


def _required_text_asset(source: dict[str, str], key: str, label: str) -> str:
    value = source.get(key)
    if not isinstance(value, str) or not value.strip():
        raise WorkflowBlockedError(f"BLOCKED: missing {label} public export for {key!r}")
    return value.rstrip()


def _read_inputs(workspace: Path, input_artifacts: tuple[str, ...]) -> str:
    sections: list[str] = []
    for artifact_name in input_artifacts:
        content = read_markdown_artifact(workspace, artifact_name).rstrip()
        sections.append(f"### {artifact_name}\n\n{content}")
    return "\n\n".join(sections)


def _next_step_name(steps: tuple[TechnicalBlogStep, ...], current_step_name: str) -> str | None:
    for index, step in enumerate(steps):
        if step.name != current_step_name:
            continue
        if index + 1 >= len(steps):
            return None
        return steps[index + 1].name
    raise WorkflowBlockedError(f"BLOCKED: unknown workflow step {current_step_name!r}")


def _load_or_default_progress_state(workspace: Path, pending_review: PendingReviewState) -> ProgressState:
    progress_state = load_progress_state(workspace)
    if progress_state is None:
        return ProgressState(
            workflow_name=pending_review.workflow_name,
            current_step=pending_review.step_name,
            last_completed_step=pending_review.step_name,
            pending_review=pending_review.to_dict(),
        )
    if progress_state.workflow_name != pending_review.workflow_name:
        raise WorkflowBlockedError("BLOCKED: progress state workflow does not match pending-review workflow")
    return progress_state


def _continue_after_review(
    *,
    workspace: Path,
    assets: TechnicalBlogCoreAssets,
    steps: tuple[TechnicalBlogStep, ...],
    pending_review: PendingReviewState,
    progress_state: ProgressState,
) -> GateCommandResult:
    reviewed_index = _step_index(steps, pending_review.step_name)

    if reviewed_index + 1 >= len(steps):
        clear_pending_review_state(workspace)
        write_progress_state(
            workspace,
            ProgressState(
                workflow_name=pending_review.workflow_name,
                current_step=None,
                last_completed_step=pending_review.step_name,
                pending_review=None,
                memory_enabled=progress_state.memory_enabled,
                memory_persistence_enabled=progress_state.memory_persistence_enabled,
                provider_data_persisted=progress_state.provider_data_persisted,
                model_strategy=progress_state.model_strategy,
                per_step_model_routing=progress_state.per_step_model_routing,
            ),
        )
        return GateCommandResult(
            command_name="continue",
            step_name=pending_review.step_name,
            artifact_path=Path(pending_review.artifact_path),
            detail=(
                f"review approved for {pending_review.step_name!r}; workflow is complete and current_step is null"
            ),
        )

    executed_steps: list[str] = []
    last_artifact_path = Path(pending_review.artifact_path)
    for step in steps[reviewed_index + 1 :]:
        missing = [name for name in step.input_artifacts if not artifact_exists(workspace, name)]
        if missing:
            raise WorkflowBlockedError(
                f"BLOCKED: missing required input artifacts for step {step.name!r}: {', '.join(missing)}"
            )
        last_artifact_path = write_markdown_artifact(
            workspace,
            step.output_artifact,
            _render_step(step=step, workspace=workspace, assets=assets, topic="", notes=""),
        )
        executed_steps.append(step.name)
        if step.human_review:
            next_pending = PendingReviewState(
                workflow_name=pending_review.workflow_name,
                step_name=step.name,
                artifact_name=step.output_artifact,
                artifact_path=str(last_artifact_path),
                command_name="continue",
            )
            write_pending_review_state(workspace, next_pending)
            write_progress_state(
                workspace,
                ProgressState(
                    workflow_name=pending_review.workflow_name,
                    current_step=step.name,
                    last_completed_step=step.name,
                    pending_review=next_pending.to_dict(),
                    memory_enabled=progress_state.memory_enabled,
                    memory_persistence_enabled=progress_state.memory_persistence_enabled,
                    provider_data_persisted=progress_state.provider_data_persisted,
                    model_strategy=progress_state.model_strategy,
                    per_step_model_routing=progress_state.per_step_model_routing,
                ),
            )
            return GateCommandResult(
                command_name="continue",
                step_name=step.name,
                artifact_path=last_artifact_path,
                detail=(
                    f"review approved for {pending_review.step_name!r}; advanced through {', '.join(executed_steps)} "
                    f"and stopped again for review at {step.name!r}"
                ),
            )

    final_step_name = executed_steps[-1]
    clear_pending_review_state(workspace)
    write_progress_state(
        workspace,
        ProgressState(
            workflow_name=pending_review.workflow_name,
            current_step=None,
            last_completed_step=final_step_name,
            pending_review=None,
            memory_enabled=progress_state.memory_enabled,
            memory_persistence_enabled=progress_state.memory_persistence_enabled,
            provider_data_persisted=progress_state.provider_data_persisted,
            model_strategy=progress_state.model_strategy,
            per_step_model_routing=progress_state.per_step_model_routing,
        ),
    )
    return GateCommandResult(
        command_name="continue",
        step_name=final_step_name,
        artifact_path=last_artifact_path,
        detail=(
            f"review approved for {pending_review.step_name!r}; advanced through {', '.join(executed_steps)} and completed the workflow"
        ),
    )


def _preserve_review_block(*, workspace: Path, pending_review: PendingReviewState) -> GateCommandResult:
    write_pending_review_state(workspace, pending_review)
    return GateCommandResult(
        command_name="revise",
        step_name=pending_review.step_name,
        artifact_path=Path(pending_review.artifact_path),
        detail=(
            f"review remains blocked for {pending_review.step_name!r}; edit {pending_review.artifact_name!r} in the workspace, "
            "then use continue to approve the next segment or abort to stop without deleting artifacts"
        ),
    )


def _abort_review(
    *,
    workspace: Path,
    pending_review: PendingReviewState,
    progress_state: ProgressState,
) -> GateCommandResult:
    aborted_review = PendingReviewState(
        workflow_name=pending_review.workflow_name,
        step_name=pending_review.step_name,
        artifact_name=pending_review.artifact_name,
        artifact_path=pending_review.artifact_path,
        command_name="abort",
        status="aborted",
        human_review_required=pending_review.human_review_required,
    )
    write_pending_review_state(workspace, aborted_review)
    write_progress_state(
        workspace,
        ProgressState(
            workflow_name=pending_review.workflow_name,
            current_step=None,
            last_completed_step=progress_state.last_completed_step or pending_review.step_name,
            pending_review=aborted_review.to_dict(),
            memory_enabled=progress_state.memory_enabled,
            memory_persistence_enabled=progress_state.memory_persistence_enabled,
            provider_data_persisted=progress_state.provider_data_persisted,
            model_strategy=progress_state.model_strategy,
            per_step_model_routing=progress_state.per_step_model_routing,
        ),
    )
    return GateCommandResult(
        command_name="abort",
        step_name=pending_review.step_name,
        artifact_path=Path(pending_review.artifact_path),
        detail=(
            f"review aborted for {pending_review.step_name!r}; adapter-local state is marked aborted and artifacts were preserved"
        ),
    )


def _step_index(steps: tuple[TechnicalBlogStep, ...], step_name: str) -> int:
    for index, step in enumerate(steps):
        if step.name == step_name:
            return index
    raise WorkflowBlockedError(f"BLOCKED: pending review references unknown workflow step {step_name!r}")


def _required_step_string(step: object, field_name: str) -> str:
    if not isinstance(step, dict):
        raise WorkflowBlockedError("BLOCKED: technical-blog workflow steps must be objects")
    value = step.get(field_name)
    if not isinstance(value, str) or not value.strip():
        raise WorkflowBlockedError(
            f"BLOCKED: technical-blog workflow step is missing required field {field_name!r}"
        )
    return value


def _required_step_input_artifacts(step: object) -> tuple[str, ...]:
    if not isinstance(step, dict):
        raise WorkflowBlockedError("BLOCKED: technical-blog workflow steps must be objects")
    value = step.get("input")
    if not isinstance(value, list) or any(not isinstance(item, str) or not item.strip() for item in value):
        raise WorkflowBlockedError(
            "BLOCKED: technical-blog workflow step is missing required field 'input'"
        )
    return tuple(value)


def _required_step_bool(step: object, field_name: str) -> bool:
    if not isinstance(step, dict):
        raise WorkflowBlockedError("BLOCKED: technical-blog workflow steps must be objects")
    value = step.get(field_name)
    if not isinstance(value, bool):
        raise WorkflowBlockedError(
            f"BLOCKED: technical-blog workflow step is missing required field {field_name!r}"
        )
    return value
