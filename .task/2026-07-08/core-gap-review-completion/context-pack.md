# Task Context Pack

## Task Goal

Deepen the technical-blog role-card and all existing Core writing skills so they provide usable judgment guidance, preserve a first-person human voice, distinguish opinions from facts, tolerate understandable natural irregularity, use progressive problem-to-why-to-solution explanation, and discuss blocking uncertainty with the user instead of guessing.

## Knowledge Posture

- Mode: `standard`
- Maturity: `L1`

## Current Slice Or Group

- Completed follow-up slices: S5-S10; implementation and independent review passed.
- No current coding slice; final validation passed and the task is waiting for final approval.
- S10 gate metadata was `gateClass: standard`, `risk_score: 3`, with `gateReasons: workflow-integration, cross-skill-consistency, runtime-free-boundary`.
- User explicitly approved continuation through the remaining planned slices, subject to selected `balanced` continuation rules and mandatory stops.
- S1-S4 remain completed historical slices.

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
  - technical-blog voice: first-person singular (`我`) by default, without requiring it in every sentence
  - opinions: permitted when visibly distinguished from facts and unresolved speculation
  - internet-native wording: permitted when appropriate for audience, pacing, or emphasis
  - final phrasing: occasional obvious awkward sentences may remain when meaning is understandable
  - naturalness: permitted rather than manufactured as a quota
  - rhetoric: prefer problem -> why it matters -> how to solve progression where suitable
  - uncertainty: discuss blocking uncertainty with the user instead of guessing

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
- Current `core/**` files read during audit, with follow-up emphasis on the role-card, all ten skills, and workflow integration

## Execution Mode

- Mode: sequential
- Current Slice Or Group: none; all planned slices completed
- Parallel Members: none
- Fallback Order: S5 -> S6 -> S7 -> S8 -> S9 -> S10
- Shared Files: no same-slice file overlap; later skills and workflow depend on S5 terminology
- Merge Owner: primary orchestrator
- Conflict Resolution Rule: preserve advisory/non-runtime boundaries; later wording may harmonize earlier docs but must not change user-confirmed scope.
- Validation Level: slice, then final

## Execution Chain

1. S5 establishes the technical-blog role and style foundation.
2. S6 deepens planning skills and uncertainty routing.
3. S7 deepens progressive structure and first-person drafting.
4. S8 coordinates rewrite skills and redefines AI-flavor reduction around preserving human texture.
5. S9 aligns factual and final review with opinion/fact boundaries and tolerated irregularity.
6. S10 integrates concise routing guidance into the shared workflow.

## Allowed Modification Scope

- `core/role-cards/technical-blog.md`
- all ten existing Markdown files under `core/skills/`
- `core/workflows/longform-writing.md`
- task-local artifacts under `.task/2026-07-08/core-gap-review-completion/`

## Forbidden Modification Scope

- Hermes research or implementation.
- Runtime code, model provider clients, workflow runners, memory runtimes, provider routers, publishing systems.
- Package entrypoint changes.
- Old CLI runtime deletion or cleanup.
- GitHub issue mutation.
- `core/AGENTS.md`, artifact contracts, review gates, memory docs, README, and project docs unless a direct contradiction is discovered and separately approved.
- Deliberate mistake, awkward-sentence, slang, or first-person-per-paragraph quotas.

## Key Existing Entrypoints

- `core/workflows/longform-writing.md` is the only initial workflow.
- `core/role-cards/technical-blog.md` is the first role-card and must not become a separate workflow.
- `core/AGENTS.md` defines Core-local boundaries.

## Required Behavior

- Keep Core document-first and portable.
- Give judgment-heavy skills decision guidance, examples or scenarios, boundaries, uncertainty handling, handoffs, and stopping criteria where useful.
- Default the technical-blog role to first-person singular while allowing natural variation.
- Keep subjective opinions visibly distinct from verified facts, evidence-backed conclusions, inference, and speculation.
- Allow audience-appropriate internet-native wording and occasional understandable awkwardness in final copy.
- Never use informality to excuse factual error, broken logic, severe ambiguity, or accidental placeholders.
- Prefer problem -> why it matters -> how to solve progression without enforcing one outline template.
- Stop and discuss uncertainty that affects the central claim, audience, technical conclusion, solution choice, factual accuracy, public sensitivity, or authorial stance.

## Non-goals

- No Hermes research in this task.
- No runtime behavior.
- No model calls or provider routing.
- No hard machine-enforced schemas or mandatory style quotas.
- No publishing pipeline.

## Implementation Steps

- Follow the S5-S10 order in `.task/2026-07-08/core-gap-review-completion/implementation-plan.md`.
- Do not perform further Core edits unless final validation finds a blocking issue and a bounded repair is approved under the existing retry policy.

## Validation Commands

- `git diff --check`
- bounded diff review for `core/role-cards/technical-blog.md`, `core/skills/`, and `core/workflows/longform-writing.md`
- manual preference traceability checklist and eight-stage technical-blog walkthrough
- manual fact/opinion/inference/speculation/error examples and blocking/non-blocking uncertainty scenarios
- optional `npm run smoke:installer` only if package-copy behavior needs verification; otherwise record `NOT_RUN` because changes are Markdown methodology only

## Assumptions

- First-person singular is a default role stance, not a requirement for every sentence or paragraph.
- Subjective voice and internet-native wording remain subordinate to technical meaning and audience comprehension.
- Understandable awkward phrasing may survive final editing, but errors should not be intentionally manufactured.
- Existing artifact contracts, review gates, memory guidance, README, and system map remain aligned unless implementation discovers a direct contradiction.

## Risks

- Turning style permissions into forced quotas or caricatured informality.
- Letting first-person opinion blur into unsupported factual claims.
- Letting tolerated awkwardness excuse severe ambiguity, broken logic, or technical error.
- Duplicating the workflow inside the role-card or skills.
- Applying rewrite passes in a way that removes authorial voice or reintroduces synthetic uniformity.

## Stop Conditions

- Stop before any unapproved Core modification outside the current slice.
- Stop if a proposed change would require Hermes assumptions.
- Stop if a slice needs runtime behavior, model integration, memory persistence, or package entrypoint changes.
- Stop and discuss any new ambiguity affecting authorial stance, factual treatment, public sensitivity, solution choice, or acceptance boundaries.
- Stop if a proposed edit requires files outside the follow-up allowlist or implies errors/slang should be deliberately manufactured.
