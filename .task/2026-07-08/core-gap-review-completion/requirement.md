# Requirement: Core Gap Review And Completion

## Source

- User requested a new task for issues #33~#38.
- Hermes research is explicitly out of scope for this task.
- The immediate goal is to review existing `core/` assets and identify optimization or incompleteness before making changes.

## Goal

Make Quill Core feel complete enough as a document-first longform-writing workflow kit for the initial `technical-blog` role-card, without turning Core into a runtime, model client, workflow engine, memory runtime, provider router, or publishing system.

## In Scope

- Review and improve `core/` document assets:
  - `core/AGENTS.md`
  - `core/workflows/longform-writing.md`
  - `core/skills/`
  - `core/role-cards/technical-blog.md`
  - `core/artifact-contracts/`
  - `core/review-gates/`
  - `core/memory/`
- Check alignment with README, current system map, and target Core architecture intent when needed.
- Keep all Core assets portable, platform-neutral, model-provider-neutral, and runtime-free.

## Out Of Scope

- Hermes capability research.
- Hermes plugin/distribution implementation.
- Rebuilding CLI runtime behavior.
- Model provider clients, workflow runner, memory runtime, provider router, publishing system, or generic workflow engine.
- Closing or mutating GitHub issues unless explicitly requested later.

## Acceptance Criteria

- Core review identifies concrete gaps, duplicated/unclear boundaries, and improvement opportunities.
- Any proposed Core updates preserve document-first methodology boundaries.
- `longform-writing` remains the initial workflow.
- `technical-blog` remains a role-card, not a separate workflow.
- Artifact contracts, skills, review gates, and memory guidance are internally coherent.
- Analysis stops before coding/document edits for explicit user confirmation.

## Open Questions

- None blocking for initial review. If specific Core behavior is ambiguous, stop and ask before inventing methodology.
