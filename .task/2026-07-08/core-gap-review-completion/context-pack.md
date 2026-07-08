# Task Context Pack

## Task Goal

Enrich the existing Quill Core skeleton into a complete, normative document-first longform-writing workflow kit while keeping all changes platform-neutral, provider-neutral, memory-runtime-neutral, and runtime-free.

## Knowledge Posture

- Mode: `standard`
- Maturity: `L1`

## Current Slice Or Group

- Current approved slice: `S4-core-orientation-and-workflow-map`.
- S1, S2, and S3 have passed review; S4 is the active slice under selected `balanced` continuation.

## Gate Policy

- Recommended: `balanced`
- Selected: `balanced`
- finalApprovalRequired: true
- Policy Notes: Selected `balanced` is task-local posture only. It does not bypass the analysis-to-coding gate, final approval, explicit stop conditions, or protected/dangerous-command confirmation. Core slices are currently `standard` with `risk_score <= 3`, but coding still requires explicit approval first.

## Requirement Source

- `.task/2026-07-08/core-gap-review-completion/requirement.md`
- User answers:
  - artifact contracts: recommended structure / guiding format
  - gates: advisory with user confirmation
  - memory policy path: merge into `core/memory`; keep only `core/memory`
  - document depth: complete/normative rather than short stubs

## Implementation Source

- `.task/2026-07-08/core-gap-review-completion/implementation-plan.md`

## Involved Modules Or Areas

- `core/` document assets
- Knowledge-map area: Quill Core Document Assets
- Related current-state context: README and `docs/current/system-map.md`
- Target contrast: `docs/target/quill-core-architecture.md`

## Loaded Context

### Global Rules

- `AGENTS.md`: use Marionettist flow; do not code before analysis approval; keep docs as design/architecture knowledge, not source indexes.
- `core/AGENTS.md`: Core is document-first; do not turn Core into runtime, model client, workflow engine, or memory system.

### Knowledge Map Matches

- `docs/project/knowledge-map.md` -> Quill Core Document Assets.
- `README.md` -> current product surface and Core layout.
- `docs/current/system-map.md` -> current installer-only and Core asset posture.
- `docs/target/quill-core-architecture.md` -> target boundary: Core defines portable methodology, artifacts, gates, memory strategy expectations, and adapter-facing contracts without owning runtime.

### Path-Proximity Rules

- `core/AGENTS.md` applies to all Core file edits.
- No `.aiassistant/rules/*.md` files currently exist.

### Excluded Context

- Hermes distribution research docs excluded because user explicitly said Hermes research can wait.
- Old CLI runtime files excluded because this task is Core content completion, not runtime deletion.
- GitHub issue mutation excluded until user explicitly asks.

## Loaded Rules

- `AGENTS.md`
- `core/AGENTS.md`
- `docs/project/marionettist-workflow.md`
- `.marionettist/tier-policy.yml`

## Loaded Docs

- `README.md`
- `docs/project/knowledge-map.md`
- `docs/current/system-map.md`
- `docs/target/quill-core-architecture.md`
- Current `core/**` files read during audit

## Execution Mode

- Mode: sequential
- Current Slice Or Group: `S4-core-orientation-and-workflow-map`
- Parallel Members: none
- Fallback Order: S1 -> S2 -> S3 -> S4
- Shared Files: later orientation docs depend on earlier wording
- Merge Owner: primary orchestrator
- Conflict Resolution Rule: preserve advisory/non-runtime boundaries; later wording may harmonize earlier docs but must not change user-confirmed scope.
- Validation Level: slice, then final

## Execution Chain

1. S1 expands artifact contracts.
2. S2 expands advisory review gates.
3. S3 expands memory policy and removes duplicate empty memory policy path.
4. S4 improves Core orientation and workflow-to-assets map.

## Allowed Modification Scope

- `core/artifact-contracts/*.md`
- `core/review-gates/*.md`
- `core/memory/*.md`
- empty `core/memory-policies/` cleanup
- `core/AGENTS.md`
- `core/workflows/longform-writing.md`
- `README.md`, `docs/current/system-map.md`, or `docs/project/knowledge-map.md` only if references become stale
- task-local artifacts under `.task/2026-07-08/core-gap-review-completion/`

## Forbidden Modification Scope

- Hermes research or implementation.
- Runtime code, model provider clients, workflow runners, memory runtimes, provider routers, publishing systems.
- Package entrypoint changes.
- Old CLI runtime deletion or cleanup.
- GitHub issue mutation.

## Key Existing Entrypoints

- `core/workflows/longform-writing.md` is the only initial workflow.
- `core/role-cards/technical-blog.md` is the first role-card and must not become a separate workflow.
- `core/AGENTS.md` defines Core-local boundaries.

## Required Behavior

- Keep Core document-first and portable.
- Enrich documents with complete guidance, templates/checklists where useful, and clear quality bars.
- Use advisory language for artifact structures and gates.
- Gates should include a visible user-confirmation decision record.
- Memory docs should remain policy-oriented and avoid runtime/persistence ownership.

## Non-goals

- No Hermes research in this task.
- No runtime behavior.
- No model calls or provider routing.
- No hard machine-enforced schemas.
- No publishing pipeline.

## Implementation Steps

- Follow `.task/2026-07-08/core-gap-review-completion/implementation-plan.md` slice order.
- Analysis gate has been approved. Implement only the currently approved slice recorded in state and active task artifacts.

## Validation Commands

- Primary: manual Markdown review against requirement and forbidden scope.
- Optional final smoke if installer output should be checked: `npm run smoke:installer`.
- Validation evidence should record any `NOT_RUN` reason if commands are skipped because changes are Core Markdown-only.

## Assumptions

- Complete/normative means richer guidance, not runtime enforceability.
- `core/memory-policies/` is an empty duplicate path and should be removed/merged into `core/memory/`.
- The current README and system map are broadly aligned and only need updates if Core path references change.

## Risks

- Over-prescribing artifacts despite the user's guiding-format preference.
- Making advisory gates sound mandatory or automated.
- Introducing platform/runtime/provider assumptions while improving examples.
- Deleting a directory requires care even if it is empty.

## Stop Conditions

- Stop before any unapproved Core modifications outside the current slice.
- Stop if a proposed change would require Hermes assumptions.
- Stop if a slice needs runtime behavior, model integration, memory persistence, or package entrypoint changes.
- Stop before any destructive deletion beyond the explicitly scoped empty `core/memory-policies/` cleanup if the directory is not empty.
