from __future__ import annotations

from .cli import register_cli, runtime_spike_command


def register(ctx) -> None:
    ctx.register_cli_command(
        name="quill-runtime-spike",
        help="Run the Quill Hermes runtime verification spike",
        setup_fn=register_cli,
        handler_fn=runtime_spike_command,
        description=(
            "Spike-only CLI that loads Quill Core assets, runs one sources step, "
            "writes one Markdown artifact, and stops at an explicit review pause."
        ),
    )
