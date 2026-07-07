from __future__ import annotations

from .cli import register_cli, scaffold_command


def register(ctx) -> None:
    ctx.register_cli_command(
        name="quill-hermes",
        help="Run the bounded Quill Hermes technical-blog adapter MVP",
        setup_fn=register_cli,
        handler_fn=scaffold_command,
        description=(
            "Bounded Quill Hermes adapter MVP for the technical-blog workflow with "
            "adapter-local artifacts and continue/revise/abort review commands."
        ),
    )
