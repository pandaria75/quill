# Issues #29 and #30 Hermes Adapter Requirement

## Goal

Land GitHub issues #29 and #30 safely by first completing a Hermes-specific adapter design for Quill Core, then preparing issue #30 as a bounded spike/MVP implementation sequence that does not invent Hermes APIs.

## Background

- Issue #29 asks for `docs/target/hermes-adapter-design.md` to explain how Quill Core workflows, skills, prompts, artifacts, memory strategy, model-role hints, and gates map into Hermes plugin/runtime concepts.
- Issue #30 asks for a minimum Hermes adapter/plugin for the `technical-blog` workflow after the design exists.
- The user provided Hermes documentation source: <https://hermes-agent.nousresearch.com/>.
- Research confirms Hermes has a plugin system, skills, memory providers, file tools, model configuration, hooks, and commands, but does not appear to provide native workflow DAGs, per-step model routing, or workflow-level human review gates.

## In Scope

### Issue #29

- Expand `docs/target/hermes-adapter-design.md` from high-level boundary guidance into a design doc that can guide implementation.
- Cover responsibilities, non-goals, proposed plugin/file structure, skill mapping, memory strategy, model mapping, artifact strategy, gate protocol, first workflow execution path, validation plan, risks, and open questions.
- Preserve the principle: Hermes runs the workflow host/runtime; Quill Core defines the writing methodology.
- Explicitly cite confirmed Hermes concepts without claiming unverified APIs.

### Issue #30 Preparation

- Define a safe spike before full implementation.
- Define a minimum MVP path after the spike succeeds.
- Record blockers and unknowns that must stop implementation if Hermes behavior cannot be verified.

## Out Of Scope

- Implementing the Hermes adapter in the first approved slice.
- Changing current CLI behavior.
- Refactoring the entire existing CLI.
- Designing OpenCode/Pi adapters beyond brief comparison notes.
- Publishing integrations or automatic web research.
- Embedding provider-specific model configuration into Quill Core.

## Current Behavior

- `docs/target/hermes-adapter-design.md` exists but only describes high-level adapter boundaries and intentionally avoids Hermes internals.
- Quill Core assets expose the `technical-blog` workflow and writing skill contracts through `packages/core`.
- The current repository has no Hermes adapter implementation.

## Required Behavior

- The design must make future implementation possible without chat context.
- The design must distinguish confirmed Hermes behavior, Quill adapter design choices, and remaining unknowns.
- The design must specify that Quill Core remains container-neutral, model-provider-neutral, and memory-runtime-neutral.
- The design must make #30 start with a spike that verifies runtime assumptions before a full MVP.

## User Flow

1. A user installs/enables a Quill Hermes plugin or equivalent adapter package.
2. The adapter exposes a technical-blog flow through Hermes commands/skills.
3. The flow uses Quill Core assets for methodology and artifact contracts.
4. Artifacts remain human-readable Markdown: `brief.md`, `sources.md`, `outline.md`, `draft.md`, `review.md`, `final.md`.
5. Human review points pause the workflow and require explicit user action to continue or repair.

## Business Rules

- Do not guess Hermes APIs.
- Do not make Quill Core own Hermes runtime concerns.
- Do not make Quill Core own provider routing or model secrets.
- Treat Hermes memory as a host capability; Quill may define memory strategy expectations but not storage ownership.
- Treat automatic web research as out of scope.

## Data Rules

- Long-term memory must not store raw user drafts, private notes, secrets, credentials, unpublished sensitive content, or full article text by default.
- Candidate memory writes should be summarized and approval-aware.
- Artifacts remain local Markdown files or workspace files, not opaque database-only documents.

## API Contract

- No public Quill Core API changes are required for the first design slice.
- Any future Hermes adapter API must be adapter-local unless an approved follow-up slice changes core exports.

## UI Requirements

- No UI changes are required.
- For Hermes command UX, the design should describe command/gate behavior conceptually, not implement it yet.

## Compatibility Requirements

- Existing CLI and `quill init` behavior must remain unchanged unless a later approved slice explicitly changes it.
- Existing `@pandaria/quill/core` packaging expectations must not be broken.

## Error Handling

- If Hermes plugin, memory, model, artifact, or gate behavior remains unclear during implementation, stop and document the missing information instead of coding a guessed adapter.
- The future adapter should surface missing artifacts, invalid state, and gate-pending states clearly.

## Permissions And Security

- Do not bypass Hermes safety approvals.
- Do not write secrets or private content into long-term memory by default.
- Do not require `QUILL_API_KEY` for the Hermes adapter unless Hermes itself is configured that way.

## Assumptions

- Hermes plugin docs are sufficiently reliable for target design.
- The first implementation should be a runtime spike, not the full #30 adapter.
- `docs/target/hermes-adapter-design.md` is the right issue #29 artifact.

## Risks

- Hermes APIs may differ from documentation or require source-level verification.
- Human review gates require custom adapter protocol because Hermes approvals are not workflow gates.
- Per-step model-role hints need an adapter strategy because Hermes model selection is primarily session/agent scoped.
- A Python Hermes plugin may need a bridge to Quill's TypeScript-packaged core assets.

## Acceptance Criteria

- `docs/target/hermes-adapter-design.md` clearly describes Hermes adapter responsibilities and non-goals.
- Quill Core remains container-neutral and provider-neutral in the design.
- Hermes memory use is explicitly designed, including what must not be stored by default.
- Hermes model configuration is reused or mapped by the adapter rather than duplicated in Quill Core.
- The design identifies the smallest possible Hermes plugin MVP.
- The design lists implementation blockers, verification needs, and issue #30 slices/spike path.
- Future implementation work can be started from repository artifacts without needing chat context.

## Deferred Questions

- Exact `PluginContext` function signatures should be verified against Hermes source or installed package before #30 implementation.
- Exact memory provider `prefetch()` injection behavior should be verified before implementing memory integration.
- Whether per-step model routing should use `ctx.llm.complete`, subagents, or a single session model remains a design decision for #29.

## Source Notes

- GitHub issue #29: `[Architecture] Design Hermes adapter for Quill Core`.
- GitHub issue #30: `[Feature] Implement MVP Hermes adapter for technical-blog workflow`.
- Hermes docs: <https://hermes-agent.nousresearch.com/>.
- Current Quill target docs: `docs/target/hermes-adapter-design.md`, `docs/target/quill-core-architecture.md`.
- Current Quill core assets: `packages/core/src/initAssets.ts`, `packages/core/src/writingSkillContracts.ts`.
