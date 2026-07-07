from __future__ import annotations

import argparse
import json
import subprocess
import sys
from pathlib import Path


def register_cli(subparser: argparse.ArgumentParser) -> None:
    run_parser = subparser.add_subparsers(dest="runtime_spike_command")

    run = run_parser.add_parser(
        "run",
        help="Run the spike's single Quill-aligned sources step and stop at review pause",
    )
    run.add_argument(
        "--workspace",
        required=True,
        help="Workspace directory where the spike writes sources.md and pending-review state.",
    )
    run.add_argument(
        "--topic",
        default="Hermes runtime verification spike",
        help="Topic text used to bootstrap brief.md when missing.",
    )
    subparser.set_defaults(func=runtime_spike_command)


def runtime_spike_command(args: argparse.Namespace) -> int:
    command = getattr(args, "runtime_spike_command", None)
    if command != "run":
        print("usage: hermes quill-runtime-spike run --workspace <dir> [--topic <text>]")
        return 2

    repo_root = _find_repo_root()
    workspace = Path(args.workspace).resolve()
    workspace.mkdir(parents=True, exist_ok=True)

    quill_assets = _load_quill_assets(repo_root)
    sources_step = quill_assets["step"]
    if not sources_step.get("humanReview"):
        raise RuntimeError("Expected technical-blog sources step to require human review")

    brief_path = workspace / "brief.md"
    if not brief_path.exists():
        brief_path.write_text(_bootstrap_brief(args.topic), encoding="utf-8")

    sources_path = workspace / str(sources_step["output"])
    sources_path.write_text(_render_sources_markdown(quill_assets["template"], args.topic), encoding="utf-8")

    pause_dir = workspace / ".quill-runtime-spike"
    pause_dir.mkdir(parents=True, exist_ok=True)
    pause_path = pause_dir / "pending-review.json"
    pause_payload = {
        "status": "pending-review",
        "workflow": quill_assets["workflow"],
        "step": sources_step["name"],
        "artifact": sources_path.relative_to(workspace).as_posix(),
        "requiredUserAction": ["continue", "revise", "abort"],
        "memoryEnabled": False,
        "modelStrategy": "single-hermes-session",
        "quillCoreLoad": "programmatic-import",
    }
    pause_path.write_text(json.dumps(pause_payload, indent=2) + "\n", encoding="utf-8")

    print(f"Loaded plugin command for workflow: {quill_assets['workflow']}")
    print(f"Ran step: {sources_step['name']}")
    print(f"Wrote artifact: {sources_path}")
    print(f"Review pause recorded at: {pause_path}")
    print("User action required: continue, revise, or abort before any later step.")
    return 0


def _find_repo_root() -> Path:
    current = Path(__file__).resolve()
    for candidate in [current, *current.parents]:
        if (candidate / "package.json").is_file() and (candidate / "packages" / "core").is_dir():
            return candidate
    raise RuntimeError("Could not locate Quill repository root from spike plugin path")


def _load_quill_assets(repo_root: Path) -> dict:
    node_script = """
import('@pandaria/quill/core').then((m) => {
  const step = m.technicalBlogWorkflowDefinition.steps.find((entry) => entry.name === 'sources');
  if (!step) {
    throw new Error('sources step not found');
  }
  console.log(JSON.stringify({
    workflow: m.technicalBlogWorkflowDefinition.name,
    step,
    template: m.quillInitTemplates.sources
  }));
}).catch((error) => {
  console.error(error && error.stack ? error.stack : String(error));
  process.exit(1);
});
""".strip()
    result = subprocess.run(
        ["node", "-e", node_script],
        cwd=repo_root,
        capture_output=True,
        text=True,
        check=False,
    )
    if result.returncode != 0:
        raise RuntimeError(f"Failed to import @pandaria/quill/core: {result.stderr.strip()}")
    return json.loads(result.stdout)


def _bootstrap_brief(topic: str) -> str:
    return (
        "# Brief\n\n"
        "## Topic\n\n"
        f"{topic}\n\n"
        "## Target Audience\n\n"
        "Spike verification reader.\n\n"
        "## Core Message\n\n"
        "Verify Hermes can host one bounded Quill-aligned step safely.\n\n"
        "## Angle\n\n"
        "Runtime verification only; not the full adapter MVP.\n\n"
        "## Constraints\n\n"
        "No memory persistence, no per-step model routing, no CLI/Core changes.\n\n"
        "## Notes\n\n"
        "Bootstrapped by the S3 runtime spike when brief.md is absent.\n"
    )


def _render_sources_markdown(template: str, topic: str) -> str:
    return (
        template.rstrip()
        + "\n\n"
        + "## Spike Evidence\n\n"
        + f"- Topic: {topic}\n"
        + "- Generated from Quill Core's programmatically imported `sources` template.\n"
        + "- Memory remained disabled for this spike run.\n"
        + "- Next progression is intentionally paused for explicit user review.\n"
    )


if __name__ == "__main__":
    sys.exit(runtime_spike_command(argparse.Namespace(runtime_spike_command=None)))
