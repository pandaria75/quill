## Quill Core

Quill Core is a portable, document-first workflow kit for planning, drafting, reviewing, rewriting, and finalizing longform writing. Core assets describe methodology, artifact shapes, review checkpoints, role-specific guidance, and memory policy expectations that humans and agents can apply in a visible writing process.

Core is not an execution layer. Do not turn these files into a runtime, model client, workflow engine, memory system, provider router, publishing system, package entrypoint, or platform-specific integration.

## Recommended Reading Order

For a new reader or agent working inside `core/`, use this order:

1. `workflows/longform-writing.md` — understand the single initial workflow family and the eight-stage writing path.
2. `role-cards/technical-blog.md` — understand how the first role-card adapts the workflow for technical-blog writing without becoming a separate workflow.
3. `artifact-contracts/` — inspect the recommended shapes and quality bars for stage artifacts.
4. `skills/` — choose the writing or review capabilities that fit the current stage.
5. `review-gates/` — use advisory checkpoints before drafting and before finalization when user confirmation is needed.
6. `memory/` — consider durable writing guidance only after review; do not treat memory as automatic storage or recall.

When a task targets one specific asset, read that asset first, then read the adjacent workflow, contract, skill, gate, or role-card that explains its handoff context.

## Asset Relationships

- `workflows/longform-writing.md` is the workflow map. It defines the common stage sequence and shows how artifacts, skills, gates, role-cards, and memory guidance fit together.
- `artifact-contracts/` are recommended document shapes. They guide what useful artifacts should contain, but they are not hard machine-enforced schemas.
- `skills/` are reusable methods for doing writing work within a stage, such as defining audience, building context, choosing an angle, drafting, reviewing facts, reducing AI flavor, polishing narrative, adapting style, and final editing.
- `review-gates/` are advisory, human-confirmed checkpoints. They help decide whether planning is ready for drafting and whether reviewed work is ready for final handoff.
- `role-cards/` adapt the longform-writing workflow for a specific writing role, tone, evidence bar, and deliverable expectation. They should reference the workflow rather than duplicate or replace it.
- `memory/` defines how durable writing guidance may be proposed, reviewed, accepted, pruned, or rejected. It does not define storage, indexing, sync, runtime persistence, or platform behavior.

Use these assets together. A typical Core handoff names the active workflow stage, the relevant artifact contract, the role-card if any, the useful skills, the applicable advisory gate, and any memory-candidate considerations.

## Role-Card Extension Guidance

Role-cards are specialization layers on top of `longform-writing`, not new workflows. When adding or updating a role-card:

- keep the role-card focused on writing stance, audience expectations, evidence standards, tone, examples, and deliverable quality;
- point back to `workflows/longform-writing.md` for the shared process instead of redefining a full stage sequence;
- name which skills, artifact contracts, and review gates are especially important for the role;
- keep guidance portable across tools, models, editors, and publishing destinations;
- avoid adding runtime hooks, provider settings, tool commands, automation triggers, or package behavior;
- do not convert `technical-blog` or any future role-card into a separate workflow unless a later approved Core design explicitly adds another workflow family.

## Boundaries

Core files may define:

- methodology and writing process guidance;
- recommended artifact sections and quality bars;
- advisory review checkpoints and visible user-confirmation records;
- role-card guidance for adapting the workflow;
- memory candidate and memory policy guidance for durable writing preferences.

Core files must not define or require:

- executable workflow runners, hidden automation, or runtime-enforced gates;
- model-provider selection, model calls, prompt routing, or provider clients;
- storage backends, memory runtimes, sync mechanisms, indexing systems, or automatic recall;
- publishing pipelines, package entrypoints, CLI behavior, or host-specific integration;
- Hermes research, distribution behavior, or implementation details.

Prefer advisory language such as "recommended", "should", and "may" when describing document formats. Use stronger language only for Core boundaries and safety constraints.

## Core Contents

- `workflows/longform-writing.md`
- `skills/`
- `role-cards/technical-blog.md`
- `artifact-contracts/`
- `review-gates/`
- `memory/`
