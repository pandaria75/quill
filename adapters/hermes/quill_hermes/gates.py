from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path

from .core_assets import WorkflowBlockedError


@dataclass(frozen=True)
class PendingReviewState:
    workflow_name: str
    step_name: str
    artifact_name: str
    artifact_path: str
    command_name: str
    status: str = "pending"
    human_review_required: bool = True

    def to_dict(self) -> dict[str, object]:
        return {
            "workflow_name": self.workflow_name,
            "step_name": self.step_name,
            "artifact_name": self.artifact_name,
            "artifact_path": self.artifact_path,
            "command_name": self.command_name,
            "status": self.status,
            "human_review_required": self.human_review_required,
        }

    @classmethod
    def from_dict(cls, payload: dict[str, object]) -> "PendingReviewState":
        return cls(
            workflow_name=str(payload.get("workflow_name", "")),
            step_name=str(payload.get("step_name", "")),
            artifact_name=str(payload.get("artifact_name", "")),
            artifact_path=str(payload.get("artifact_path", "")),
            command_name=str(payload.get("command_name", "")),
            status=str(payload.get("status", "pending")),
            human_review_required=bool(payload.get("human_review_required", True)),
        )


REVIEW_GATE_COMMANDS = {"continue", "revise", "abort"}


@dataclass(frozen=True)
class GateCommandResult:
    command_name: str
    step_name: str
    artifact_path: Path
    detail: str


def ensure_pending_review_for_gate(
    pending_review: PendingReviewState | None,
    *,
    gate_command: str,
) -> PendingReviewState:
    if gate_command not in REVIEW_GATE_COMMANDS:
        raise WorkflowBlockedError(f"BLOCKED: unsupported review gate command {gate_command!r}")
    if pending_review is None:
        raise WorkflowBlockedError(
            f"BLOCKED: {gate_command} requires an active pending-review state in the workspace"
        )
    if pending_review.status == "aborted":
        raise WorkflowBlockedError(
            "BLOCKED: this workspace review state is already aborted; artifacts were preserved and no resume is allowed"
        )
    if pending_review.status != "pending":
        raise WorkflowBlockedError(
            f"BLOCKED: review state status {pending_review.status!r} is not resumable"
        )
    if not pending_review.human_review_required:
        raise WorkflowBlockedError("BLOCKED: pending review state does not require explicit human review")
    return pending_review
