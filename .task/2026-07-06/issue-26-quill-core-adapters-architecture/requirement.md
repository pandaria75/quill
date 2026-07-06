# Requirement: Issue #26 Quill Core + Adapters Architecture Pivot

## Source

- GitHub issue: #26 `[Architecture] Pivot Quill to core workflow kit plus adapters`
- User instruction: open a new task and use `gate policy = balanced`.

## Goal

Update repository documentation so future development sessions can understand and plan from the new strategic direction without relying on prior chat context.

Quill should be positioned as a writing-domain agent workflow kit: Quill Core plus runtime/container adapters.

## Required Positioning

Quill should be treated as:

- a writing workflow methodology packaged as files, prompts, skills, protocols, and adapters
- container-neutral at the core layer
- model-provider-neutral at the core layer
- memory-strategy-aware but not memory-runtime-owning
- adapter-oriented, with Hermes as the first serious runtime target

Quill should not be treated as:

- a new agent container
- a new generic workflow runtime
- a model router/provider framework
- a publishing platform
- a replacement for Hermes, OpenCode, or Pi

## Deliverables

Documentation-only changes are expected. Candidate docs include:

- `docs/target/quill-core-architecture.md`
- `docs/target/hermes-adapter-design.md`
- `docs/zh-CN/software-design.md`
- `docs/en/software-design.md`
- `README.md`
- `docs/develop/00-vision.md`
- `docs/develop/02-roadmap.md`
- `docs/develop/05-marionettist-relationship.md`
- `docs/project/knowledge-map.md`

## Acceptance Criteria

- Repository docs clearly state that Quill's strategic direction is Quill Core plus adapters.
- The old standalone CLI MVP is described as current implementation/reference harness/prototype, not the long-term center of gravity.
- Future work can be planned from repository docs without relying on chat history.
- Hermes-first short-term plan is explicit.
- OpenCode and Pi are documented as later adapter targets.
- Docs avoid source-code indexing and remain design-oriented.
- Claims about Hermes, OpenCode, and Pi do not invent runtime/API details beyond known issue context.

## Out Of Scope

- Implementing a core directory.
- Implementing the Hermes adapter.
- Removing the current CLI.
- Changing model-calling code.
- Changing production/runtime behavior.

## Risks

- Architecture-positioning drift across bilingual and development docs.
- Accidentally presenting target architecture as current implementation.
- Inventing Hermes/OpenCode/Pi internals that are not established in the issue.
- Overwriting useful current CLI MVP facts instead of reframing them as current/reference behavior.

## Gate Policy

- config/default: `balanced`
- recommended: `strict` because this is architecture-sensitive route-reset documentation
- selected: `autonomous` by later explicit user instruction; initial `balanced` selection was superseded
- finalApprovalRequired: `true`
