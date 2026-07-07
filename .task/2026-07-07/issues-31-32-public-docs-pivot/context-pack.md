# Task Context Pack

## Task Goal

Systematically polish public bilingual docs to land GitHub issues #31 and #32: reposition the existing CLI as current reference harness/prototype and clarify the target Quill Core plus adapters direction with Hermes first.

## Knowledge Posture

- Mode: standard
- Maturity: L1

## Current Slice Or Group

- Current Slice: S1-public-docs-polish
- Gate Class: standard
- Risk Score: 2
- Gate Reasons: docs-only, bilingual-alignment-required, current-vs-target-wording-required

## Gate Policy

- Recommended: balanced
- Selected: balanced
- finalApprovalRequired: true
- Policy Notes: task-local selected policy matches repository default. This does not bypass the analysis-to-coding gate, final approval, or explicit stop conditions.

## Requirement Source

- `.task/2026-07-07/issues-31-32-public-docs-pivot/requirement.md`
- GitHub issues #31 and #32 as summarized in the requirement.

## Implementation Source

- `.task/2026-07-07/issues-31-32-public-docs-pivot/implementation-plan.md`

## Involved Modules Or Areas

- Public product documentation
- Quill Core target architecture
- Hermes-first adapter direction
- Knowledge map routing if needed

## Loaded Context

### Global Rules

- `AGENTS.md`: docs should explain design/architecture, not become source-code indexes; keep current facts distinct from target intent; update knowledge map when docs or rules are added/moved/renamed/deleted.
- `docs/project/marionettist-workflow.md`: Tier M docs task requires analysis/context before coding and explicit analysis gate confirmation.

### Knowledge Map Matches

- Public Product Documentation: bilingual public docs, semantic alignment, no source-code index.
- Quill Core Target Architecture: future Core positioning and current/reference harness distinction.
- Hermes-First Adapter Direction: target Hermes adapter responsibility boundary without claiming full implementation.
- Hermes Adapter Current MVP Docs: current adapter exists but should remain distinct from target design claims.

### Path-Proximity Rules

- No nearby `MODULE_RULES.md`, `HARNESS_RULES.md`, or nested `AGENTS.md` were loaded for this docs-only scope.

### Excluded Context

- Source implementation files excluded because the task is docs-only and does not require symbol or call-path lookup.
- Full `docs/develop/**` excluded except as indirectly referenced by current public docs; public docs and target docs are sufficient for this slice.

## Loaded Rules

- `AGENTS.md`
- `.marionettist/tier-policy.yml`
- `docs/project/marionettist-workflow.md`

## Loaded Docs

- `README.md`
- `docs/project/knowledge-map.md`
- `docs/en/software-design.md`
- `docs/zh-CN/software-design.md`
- `docs/en/user-guide.md`
- `docs/zh-CN/user-guide.md`
- `docs/target/quill-core-architecture.md`
- `docs/target/hermes-adapter-design.md`
- `packages/core/README.md`
- `adapters/hermes/README.md`

## Execution Mode

- Mode: sequential
- Current Slice Or Group: S1-public-docs-polish
- Parallel Members: none
- Fallback Order: S1 only
- Shared Files: none beyond docs in the slice
- Merge Owner: primary agent
- Conflict Resolution Rule: preserve bilingual semantic alignment, not literal translation.
- Validation Level: final

## Execution Chain

1. Edit public docs in bounded scope.
2. Review diff against #31/#32 acceptance criteria.
3. Run optional `npm run check` if useful and environment permits.
4. Run reviewer diff-review for the same slice.
5. Stop at slice/final gate for user approval.

## Allowed Modification Scope

- `README.md`
- `docs/en/software-design.md`
- `docs/zh-CN/software-design.md`
- `docs/en/user-guide.md`
- `docs/zh-CN/user-guide.md`
- `docs/project/knowledge-map.md` only if routing needs adjustment

## Forbidden Modification Scope

- `src/**`
- `packages/**`
- `adapters/**`
- package/build/test configuration
- GitHub issue mutation or closure without explicit user request
- Large CLI relocation or deletion

## Key Existing Entrypoints

- Public docs: README and bilingual software design/user guide docs.
- Target docs: Quill Core architecture and Hermes adapter design.
- Routing doc: knowledge map.

## Required Behavior

- Docs clearly explain current CLI as current/reference/prototype.
- Docs clearly explain target Core plus adapters direction.
- Hermes is first adapter target; OpenCode and Pi later.
- Quill Core does not own provider credentials or model account configuration in target architecture.
- Existing containers/hosts provide runtime, memory, tools, and model selection.
- Current behavior remains accurately described.

## Non-goals

- No source/runtime changes.
- No movement or deletion of CLI code.
- No implementation of adapter or Core behavior.
- No live model/provider validation.

## Implementation Steps

See implementation plan Slice 1.

## Validation Commands

- Manual: bilingual semantic alignment review.
- Manual: #31/#32 acceptance checklist.
- Optional command: `npm run check`.

## Assumptions

- User's option B authorizes planning a fuller public docs polish but not yet crossing the analysis-to-coding gate.
- Existing target docs are the source of target architecture wording.
- Current implementation facts should remain intact and not be erased.

## Risks

- Overclaiming future adapter/Core implementation.
- English/Chinese semantic drift.
- Repetition across README/software-design/user-guide becoming inconsistent.

## Stop Conditions

- Stop before modifying docs until user explicitly confirms the analysis gate.
- Stop if required edits would require source code movement or runtime changes.
- Stop if wording requires claiming unverified Hermes/OpenCode/Pi internals.
