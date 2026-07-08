# Core Gap Review And Completion Implementation Plan

## Requirement Source

- `.task/2026-07-08/core-gap-review-completion/requirement.md`
- User confirmation after Core audit:
  - artifact contracts should use recommended structure / guiding format, not hard required templates
  - review gates should be advisory gates with explicit user confirmation
  - merge `core/memory-policies/` into `core/memory/`; keep only `core/memory/`
  - prefer complete,规范化 documents over very short stubs

## Scope Summary

Enrich Quill Core methodology documents so the existing skeleton becomes a usable document-first longform-writing workflow kit. Keep all changes Markdown-only and runtime-free.

## Involved Modules Or Areas

- `core/` portable document assets
- `README.md` and `docs/current/system-map.md` only if alignment updates become necessary after Core changes
- `.task/2026-07-08/core-gap-review-completion/` task artifacts

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
- Current `core/**` assets

## Global Forbidden Scope

- Hermes capability research or plugin/distribution implementation.
- Runtime, model provider, workflow runner, memory runtime, provider router, or publishing-system code.
- GitHub issue mutation or closure.
- Package entrypoint changes unless a later explicit task asks for installer/package work.
- Old CLI runtime deletion or cleanup in this task.

## Execution Strategy

- Complexity: standard
- Default Execution: sequential
- Parallel Execution: not-needed
- Fallback Execution: sequential
- Merge Owner: primary orchestrator
- Conflict Resolution Rule: later slices may refine earlier wording for consistency, but must not reverse the user-confirmed advisory/non-runtime boundaries.

## Slice Dependency Graph

| Slice | Depends On | Can Run In Parallel With | Fallback Order | Shared Files | Merge Owner | Conflict Risk |
| --- | --- | --- | --- | --- | --- | --- |
| S1-artifact-contracts | none | none | 1 | `core/artifact-contracts/*` | primary orchestrator | low |
| S2-review-gates | S1-artifact-contracts | none | 2 | `core/review-gates/*` | primary orchestrator | low |
| S3-memory-policy-consolidation | none | none | 3 | `core/memory/*`, `core/memory-policies/` | primary orchestrator | medium |
| S4-core-orientation-and-workflow-map | S1, S2, S3 | none | 4 | `core/AGENTS.md`, `core/workflows/longform-writing.md` | primary orchestrator | medium |

## Implementation Slices

### Slice 1: Artifact Contract Expansion

#### Goal

Expand all artifact contracts from one-line descriptions into complete guiding formats that are useful to writers and agents without becoming rigid runtime schemas.

#### Allowed Modification Scope

- `core/artifact-contracts/intent.md`
- `core/artifact-contracts/context-pack.md`
- `core/artifact-contracts/angle.md`
- `core/artifact-contracts/structure.md`
- `core/artifact-contracts/draft.md`
- `core/artifact-contracts/review.md`
- `core/artifact-contracts/rewrite.md`
- `core/artifact-contracts/final.md`
- `core/artifact-contracts/memory-candidates.md`

#### Forbidden Scope

- Do not add executable schemas, JSON schema validation, CLI behavior, or runtime parser expectations.
- Do not add Hermes-specific fields.

#### Execution

- Mode: sequential
- Depends On: none
- Can Run With: none
- Must Not Run With: S4, because S4 should map final contract names and sections after this slice stabilizes.
- Fallback Order: 1
- Shared Files: none outside `core/artifact-contracts/`
- Merge Owner: primary orchestrator
- Conflict Risk: low
- Gate Class: standard
- Risk Score: 2
- Gate Reasons: `core-doc-expansion`, `methodology-consistency`
- Validation Level: slice
- Recommended Agent Strategy: update contracts in a consistent pattern while preserving stage-specific meaning.

#### Steps

1. Give each contract a consistent section set, such as purpose, recommended sections, guidance, quality bar, and handoff.
2. Keep wording advisory: use "recommended", "should", and "may" instead of hard machine-enforced requirements.
3. Make each contract's relationship to adjacent workflow stages explicit.
4. Ensure memory candidate contract excludes raw drafts, unpublished sensitive material, and speculative notes by default.

#### Validation

- Manual review for consistent headings and advisory wording.
- Confirm no runtime/provider/Hermes execution language was introduced.

#### Done Criteria

- All nine artifact contracts are complete enough to guide human-authored artifacts.
- Contracts remain document-first and platform-neutral.

#### Rollback Notes

- Revert only the changed artifact-contract files if the structure feels too prescriptive.

### Slice 2: Advisory Review Gate Expansion

#### Goal

Expand review gates into usable advisory checkpoints with explicit user-confirmation decision records.

#### Allowed Modification Scope

- `core/review-gates/before-draft.md`
- `core/review-gates/before-final.md`

#### Forbidden Scope

- Do not define gates as runtime-enforced blockers.
- Do not add automation or model-call assumptions.

#### Execution

- Mode: sequential
- Depends On: S1-artifact-contracts
- Can Run With: none
- Must Not Run With: S4 until gate terms are stable
- Fallback Order: 2
- Shared Files: none outside `core/review-gates/`
- Merge Owner: primary orchestrator
- Conflict Risk: low
- Gate Class: standard
- Risk Score: 2
- Gate Reasons: `advisory-gates`, `user-confirmation`
- Validation Level: slice
- Recommended Agent Strategy: define checklist and decision format while preserving user choice.

#### Steps

1. Add purpose, when to use, input artifacts, advisory checklist, user decision options, and suggested block/follow-up behavior.
2. Make clear gates are designed for explicit human confirmation, not hidden automation.
3. Ensure `before-draft` checks intent/context/angle/structure readiness.
4. Ensure `before-final` checks factual review, placeholders, style fit, and handoff readiness.

#### Validation

- Manual review that gate documents use advisory language and contain a confirmation record format.

#### Done Criteria

- Both gates are actionable for users and agents.
- Neither gate claims runtime enforcement.

#### Rollback Notes

- Revert the two review-gate files if wording becomes too strict.

### Slice 3: Memory Policy Consolidation

#### Goal

Make memory guidance actionable and remove the confusing empty `core/memory-policies/` path in favor of `core/memory/` only.

#### Allowed Modification Scope

- `core/memory/memory-policy.md`
- `core/memory/memory-candidates-policy.md`
- `core/memory-policies/` removal if present and empty
- `core/AGENTS.md` or `README.md` only if needed to remove references to `memory-policies/`

#### Forbidden Scope

- Do not implement memory storage, sync, indexing, or runtime persistence.
- Do not prescribe a platform-specific memory tool.

#### Execution

- Mode: sequential
- Depends On: none
- Can Run With: none
- Must Not Run With: S4 until the final memory path is known
- Fallback Order: 3
- Shared Files: possible later reference updates in S4
- Merge Owner: primary orchestrator
- Conflict Risk: medium
- Gate Class: standard
- Risk Score: 3
- Gate Reasons: `directory-cleanup`, `memory-boundary`
- Validation Level: slice
- Recommended Agent Strategy: use safe deletion only for empty directory cleanup; keep memory content policy-oriented.

#### Steps

1. Expand memory policy to cover what memory means in Quill Core, when candidates are considered, review expectations, retention/pruning, and exclusions.
2. Expand memory-candidates policy to describe candidate shape, review questions, and safe rejection defaults.
3. Remove `core/memory-policies/` if it is empty; if deletion is blocked by tooling, leave no references to it and report the cleanup status.

#### Validation

- Manual review that only `core/memory/` is referenced as the memory policy location.
- Confirm no runtime memory implementation is introduced.

#### Done Criteria

- Memory guidance is clear, safe, and document-driven.
- Empty duplicate memory policy path no longer confuses the Core layout.

#### Rollback Notes

- Restore `core/memory-policies/` only if the user later decides to keep a separate policy namespace.

### Slice 4: Core Orientation And Workflow Integration Map

#### Goal

Make Core self-navigable by improving `core/AGENTS.md` and adding a stage-to-assets map to the longform-writing workflow.

#### Allowed Modification Scope

- `core/AGENTS.md`
- `core/workflows/longform-writing.md`
- Optional alignment touchups in `README.md` or `docs/current/system-map.md` only if the Core layout wording changes.

#### Forbidden Scope

- Do not add new workflows or convert `technical-blog` into a workflow.
- Do not add Hermes research or implementation details.

#### Execution

- Mode: sequential
- Depends On: S1-artifact-contracts, S2-review-gates, S3-memory-policy-consolidation
- Can Run With: none
- Must Not Run With: none
- Fallback Order: 4
- Shared Files: `core/AGENTS.md`, `core/workflows/longform-writing.md`
- Merge Owner: primary orchestrator
- Conflict Risk: medium
- Gate Class: standard
- Risk Score: 3
- Gate Reasons: `core-navigation`, `workflow-asset-map`
- Validation Level: final
- Recommended Agent Strategy: synthesize rather than duplicate detailed file content.

#### Steps

1. Expand `core/AGENTS.md` with Core purpose, reading order, asset relationships, extension guidance, and boundaries.
2. Add a workflow-to-assets table to `longform-writing.md` mapping stages to input/output artifacts, relevant skills, gates, and quality criteria.
3. Keep the workflow document as a methodology guide, not an execution spec.
4. Update README/system-map only if references become stale.

#### Validation

- Manual review for coherent navigation across Core categories.
- Confirm `technical-blog` remains role-card-only.
- Confirm no runtime/provider/Hermes execution claims are introduced.

#### Done Criteria

- A new reader can understand how to use Core assets together.
- Workflow, skills, contracts, review gates, role-card, and memory docs are connected without becoming a runtime.

#### Rollback Notes

- Revert orientation/map files if the navigation becomes too verbose or duplicative.

## Parallel Slice Groups

None. Sequential execution is preferred because later orientation docs should reflect the final wording of contracts, gates, and memory policies.

## Final Validation

- Manual Core consistency review.
- Confirm all changed files are Markdown-only under allowed scope, except task artifacts.
- Confirm no new runtime, provider, workflow engine, memory runtime, or Hermes implementation language.
- Optional packaging smoke after all slices if installer output should be verified: `npm run smoke:installer`.

## Documentation Update Requirement

- Update `README.md`, `docs/current/system-map.md`, or `docs/project/knowledge-map.md` only if the Core layout, routing, or public product description changes.
- Otherwise, Core-only Markdown changes are sufficient.

## Risks

- Making guidance too prescriptive despite user preference for recommended/guiding structures.
- Accidentally implying gates are runtime-enforced.
- Reintroducing runtime or memory implementation concepts while enriching methodology docs.
- Leaving stale references to the removed `core/memory-policies/` path.
