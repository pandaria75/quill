from __future__ import annotations

import argparse
import sys
from pathlib import Path

from .core_assets import WorkflowBlockedError
from .workflow import run_review_gate_command, run_technical_blog_step


def register_cli(subparser: argparse.ArgumentParser) -> None:
    commands = subparser.add_subparsers(dest="quill_hermes_command")

    start = commands.add_parser(
        "start",
        help="Run the next bounded technical-blog workflow step in a workspace.",
    )
    _add_workflow_arguments(start)

    resume = commands.add_parser(
        "resume",
        help="Resume by inferring the next bounded technical-blog workflow step from workspace artifacts.",
    )
    _add_workflow_arguments(resume)

    continue_command = commands.add_parser(
        "continue",
        help="Approve the current review checkpoint and advance only to the next allowed segment.",
    )
    _add_gate_arguments(continue_command)

    revise = commands.add_parser(
        "revise",
        help="Keep the current review checkpoint blocked and surface artifact revision instructions.",
    )
    _add_gate_arguments(revise)

    abort = commands.add_parser(
        "abort",
        help="Mark the current adapter-local review state aborted without deleting artifacts.",
    )
    _add_gate_arguments(abort)

    subparser.add_argument(
        "--version",
        action="store_true",
        help="Show scaffold version information.",
    )
    subparser.set_defaults(func=scaffold_command)


def scaffold_command(args: argparse.Namespace) -> int:
    if getattr(args, "version", False):
        print("quill-hermes scaffold 0.1.0")
        return 0

    command = getattr(args, "quill_hermes_command", None)
    if command in {"start", "resume"}:
        try:
            result = run_technical_blog_step(
                repo_root=_find_repo_root(),
                workspace=Path(args.workspace),
                command_name=command,
                workflow_name=args.workflow,
                topic=args.topic,
                notes=args.notes,
            )
        except WorkflowBlockedError as error:
            print(str(error), file=sys.stderr)
            return 1

        print(f"Workflow: {result.workflow_name}")
        print(f"Command: {command}")
        print(f"Step executed: {result.step_name}")
        print(f"Artifact written: {result.artifact_path}")
        _print_export_names(result.export_names)
        print(f"Memory enabled: {result.memory_enabled}")
        print(f"Model strategy: {result.model_strategy}")
        print(f"Runner detail: {result.detail}")
        return 0

    if command in {"continue", "revise", "abort"}:
        try:
            result = run_review_gate_command(
                repo_root=_find_repo_root(),
                workspace=Path(args.workspace),
                command_name=command,
                workflow_name=args.workflow,
            )
        except WorkflowBlockedError as error:
            print(str(error), file=sys.stderr)
            return 1

        print(f"Workflow: {result.workflow_name}")
        print(f"Command: {command}")
        print(f"Step executed: {result.step_name}")
        print(f"Artifact written: {result.artifact_path}")
        _print_export_names(result.export_names)
        print(f"Memory enabled: {result.memory_enabled}")
        print(f"Model strategy: {result.model_strategy}")
        print(f"Runner detail: {result.detail}")
        return 0

    print("quill-hermes: adapter scaffold loaded")
    print("Available in MVP slices: technical-blog start/resume runner path plus continue/revise/abort review commands.")
    print("Future work (S4e+): smoke docs/hand-off polish only; review approval stays adapter-local.")
    return 0


def _add_workflow_arguments(parser: argparse.ArgumentParser) -> None:
    parser.add_argument(
        "--workflow",
        default="technical-blog",
        help="Workflow name. Only technical-blog is supported in the MVP runner.",
    )
    parser.add_argument(
        "--workspace",
        required=True,
        help="Workspace directory used for bounded technical-blog artifacts.",
    )
    parser.add_argument(
        "--topic",
        default="Technical blog topic",
        help="Topic seed used when bootstrapping the first workflow step.",
    )
    parser.add_argument(
        "--notes",
        default="",
        help="Optional user notes seed. Automatic web research remains disabled.",
    )


def _add_gate_arguments(parser: argparse.ArgumentParser) -> None:
    parser.add_argument(
        "--workflow",
        default="technical-blog",
        help="Workflow name. Only technical-blog is supported in the MVP runner.",
    )
    parser.add_argument(
        "--workspace",
        required=True,
        help="Workspace directory containing bounded technical-blog artifacts and adapter-local review state.",
    )


def _print_export_names(export_names: tuple[str, ...]) -> None:
    if export_names:
        print(f"Core public exports used: {', '.join(export_names)}")
        return
    print("Core public exports used: none")


def _find_repo_root() -> Path:
    current = Path(__file__).resolve()
    for candidate in [current, *current.parents]:
        if (candidate / "package.json").is_file() and (candidate / "packages" / "core").is_dir():
            return candidate
    raise WorkflowBlockedError("BLOCKED: could not locate Quill repository root from Hermes adapter path")


if __name__ == "__main__":
    sys.exit(scaffold_command(argparse.Namespace(version=False)))
