from __future__ import annotations

import json
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path

from .core_assets import WorkflowBlockedError
from .gates import PendingReviewState


STATE_DIRECTORY_NAME = ".quill-hermes"
PROGRESS_STATE_FILE_NAME = "progress.json"
PENDING_REVIEW_FILE_NAME = "pending-review.json"
KNOWN_ARTIFACT_NAMES = (
    "brief.md",
    "sources.md",
    "outline.md",
    "draft.md",
    "review.md",
    "final.md",
)


@dataclass(frozen=True)
class ProgressState:
    workflow_name: str
    current_step: str | None
    last_completed_step: str | None
    pending_review: dict[str, object] | None
    memory_enabled: bool = False
    memory_persistence_enabled: bool = False
    provider_data_persisted: bool = False
    model_strategy: str = "single-hermes-session"
    per_step_model_routing: bool = False

    def to_dict(self, *, workspace: Path) -> dict[str, object]:
        return {
            "schema_version": 1,
            "workflow_name": self.workflow_name,
            "current_step": self.current_step,
            "last_completed_step": self.last_completed_step,
            "pending_review": self.pending_review,
            "memory_policy": {
                "enabled": self.memory_enabled,
                "persistence_enabled": self.memory_persistence_enabled,
                "provider_data_persisted": self.provider_data_persisted,
            },
            "model_policy": {
                "strategy": self.model_strategy,
                "per_step_model_routing": self.per_step_model_routing,
            },
            "artifact_paths": {
                artifact_name: str(path.relative_to(workspace))
                for artifact_name, path in resolve_artifact_paths(workspace).items()
            },
            "state_directory": str(state_directory(workspace).relative_to(workspace)),
            "updated_at": _utc_now(),
        }

    @classmethod
    def from_dict(cls, payload: dict[str, object]) -> "ProgressState":
        memory_policy = payload.get("memory_policy")
        if not isinstance(memory_policy, dict):
            memory_policy = {}
        model_policy = payload.get("model_policy")
        if not isinstance(model_policy, dict):
            model_policy = {}
        pending_review = payload.get("pending_review")
        if pending_review is not None and not isinstance(pending_review, dict):
            raise WorkflowBlockedError("BLOCKED: progress state pending_review must be an object or null")
        current_step = payload.get("current_step")
        last_completed_step = payload.get("last_completed_step")
        if current_step is not None and not isinstance(current_step, str):
            raise WorkflowBlockedError("BLOCKED: progress state current_step must be a string or null")
        if last_completed_step is not None and not isinstance(last_completed_step, str):
            raise WorkflowBlockedError("BLOCKED: progress state last_completed_step must be a string or null")
        return cls(
            workflow_name=str(payload.get("workflow_name", "")),
            current_step=current_step,
            last_completed_step=last_completed_step,
            pending_review=pending_review,
            memory_enabled=bool(memory_policy.get("enabled", False)),
            memory_persistence_enabled=bool(memory_policy.get("persistence_enabled", False)),
            provider_data_persisted=bool(memory_policy.get("provider_data_persisted", False)),
            model_strategy=str(model_policy.get("strategy", "single-hermes-session")),
            per_step_model_routing=bool(model_policy.get("per_step_model_routing", False)),
        )


def ensure_workspace_directory(workspace: Path) -> Path:
    workspace_path = workspace.expanduser().resolve()
    if workspace_path.exists() and not workspace_path.is_dir():
        raise WorkflowBlockedError(f"BLOCKED: workspace path is not a directory: {workspace_path}")
    workspace_path.mkdir(parents=True, exist_ok=True)
    return workspace_path


def resolve_artifact_paths(workspace: Path) -> dict[str, Path]:
    workspace_path = ensure_workspace_directory(workspace)
    return {name: _safe_workspace_path(workspace_path, name) for name in KNOWN_ARTIFACT_NAMES}


def resolve_artifact_path(workspace: Path, artifact_name: str) -> Path:
    artifact_paths = resolve_artifact_paths(workspace)
    try:
        return artifact_paths[artifact_name]
    except KeyError as error:
        raise WorkflowBlockedError(f"BLOCKED: unsupported artifact name {artifact_name!r}") from error


def artifact_exists(workspace: Path, artifact_name: str) -> bool:
    return resolve_artifact_path(workspace, artifact_name).is_file()


def read_markdown_artifact(workspace: Path, artifact_name: str) -> str:
    artifact_path = resolve_artifact_path(workspace, artifact_name)
    if not artifact_path.is_file():
        raise WorkflowBlockedError(f"BLOCKED: missing artifact {artifact_name!r}")
    return artifact_path.read_text(encoding="utf-8")


def write_markdown_artifact(workspace: Path, artifact_name: str, content: str) -> Path:
    artifact_path = resolve_artifact_path(workspace, artifact_name)
    artifact_path.write_text(content, encoding="utf-8")
    return artifact_path


def state_directory(workspace: Path) -> Path:
    workspace_path = ensure_workspace_directory(workspace)
    state_path = _safe_workspace_path(workspace_path, STATE_DIRECTORY_NAME)
    state_path.mkdir(parents=True, exist_ok=True)
    return state_path


def progress_state_path(workspace: Path) -> Path:
    return _safe_workspace_path(state_directory(workspace), PROGRESS_STATE_FILE_NAME)


def pending_review_state_path(workspace: Path) -> Path:
    return _safe_workspace_path(state_directory(workspace), PENDING_REVIEW_FILE_NAME)


def load_pending_review_state(workspace: Path) -> PendingReviewState | None:
    path = pending_review_state_path(workspace)
    if not path.is_file():
        return None
    payload = _read_json(path)
    if not isinstance(payload, dict):
        raise WorkflowBlockedError("BLOCKED: pending review state must be a JSON object")
    state = PendingReviewState.from_dict(payload)
    if not state.workflow_name or not state.step_name or not state.artifact_name or not state.artifact_path:
        raise WorkflowBlockedError("BLOCKED: pending review state is missing required metadata")
    return state


def write_pending_review_state(workspace: Path, pending_review: PendingReviewState) -> Path:
    path = pending_review_state_path(workspace)
    _write_json(path, pending_review.to_dict())
    return path


def clear_pending_review_state(workspace: Path) -> None:
    path = pending_review_state_path(workspace)
    if path.exists():
        path.unlink()


def write_progress_state(workspace: Path, progress_state: ProgressState) -> Path:
    workspace_path = ensure_workspace_directory(workspace)
    path = progress_state_path(workspace_path)
    _write_json(path, progress_state.to_dict(workspace=workspace_path))
    return path


def load_progress_state(workspace: Path) -> ProgressState | None:
    path = progress_state_path(workspace)
    if not path.is_file():
        return None
    payload = _read_json(path)
    if not isinstance(payload, dict):
        raise WorkflowBlockedError("BLOCKED: progress state must be a JSON object")
    state = ProgressState.from_dict(payload)
    if not state.workflow_name:
        raise WorkflowBlockedError("BLOCKED: progress state is missing required workflow metadata")
    return state


def validate_pending_review_artifact_path(workspace: Path, pending_review: PendingReviewState) -> Path:
    expected_path = resolve_artifact_path(workspace, pending_review.artifact_name)
    actual_path = Path(pending_review.artifact_path).expanduser().resolve()
    if actual_path != expected_path:
        raise WorkflowBlockedError(
            "BLOCKED: pending review artifact path no longer matches the current workspace boundary"
        )
    if not actual_path.is_file():
        raise WorkflowBlockedError(
            f"BLOCKED: pending review artifact is missing from the current workspace: {pending_review.artifact_name!r}"
        )
    return actual_path


def _safe_workspace_path(base_directory: Path, relative_path: str) -> Path:
    candidate = (base_directory / relative_path).resolve()
    try:
        candidate.relative_to(base_directory)
    except ValueError as error:
        raise WorkflowBlockedError(
            f"BLOCKED: adapter-local path escaped the workspace boundary: {relative_path!r}"
        ) from error
    return candidate


def _read_json(path: Path) -> object:
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except json.JSONDecodeError as error:
        raise WorkflowBlockedError(f"BLOCKED: invalid JSON in adapter-local state file: {path}") from error


def _write_json(path: Path, payload: dict[str, object]) -> None:
    path.write_text(json.dumps(payload, indent=2, sort_keys=True) + "\n", encoding="utf-8")


def _utc_now() -> str:
    return datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")
