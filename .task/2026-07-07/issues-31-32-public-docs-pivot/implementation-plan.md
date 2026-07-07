# Issues #31/#32 Public Docs Pivot Implementation Plan

## Requirement Source

`.task/2026-07-07/issues-31-32-public-docs-pivot/requirement.md`

## Scope Summary

Perform a systematic but docs-only public documentation polish for issues #31/#32. Emphasize Quill Core plus adapters, Hermes-first direction, current CLI as reference harness/prototype, and provider/runtime responsibility boundaries.

## Involved Modules Or Areas

- Public product documentation
- Quill Core target architecture wording
- Hermes-first adapter direction wording
- Knowledge-map routing only if needed

## Loaded Rules

- `AGENTS.md`
- `docs/project/marionettist-workflow.md`
- `.marionettist/tier-policy.yml`

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

## Global Forbidden Scope

- No source code changes.
- No CLI relocation.
- No build/package/release behavior changes.
- No provider credential behavior changes.
- No claims that target-state adapter behavior is fully implemented unless supported by current docs.
- No source-code index in public docs or knowledge map.

## Execution Strategy

- Complexity: simple
- Default Execution: sequential
- Parallel Execution: not-needed
- Fallback Execution: sequential
- Merge Owner: primary agent
- Conflict Resolution Rule: keep bilingual docs semantically aligned; when English/Chinese differ, preserve meaning rather than word-for-word translation.

## Slice Dependency Graph

| Slice | Depends On | Can Run In Parallel With | Fallback Order | Shared Files | Merge Owner | Conflict Risk |
| --- | --- | --- | --- | --- | --- | --- |
| S1-public-docs-polish | none | none | 1 | public docs | primary agent | low |

## Implementation Slices

### Slice 1: S1-public-docs-polish

#### Goal

Polish public docs as a set so issues #31/#32 acceptance criteria are explicitly satisfied without moving CLI code or changing runtime behavior.

#### Allowed Modification Scope

- `README.md`
- `docs/en/software-design.md`
- `docs/zh-CN/software-design.md`
- `docs/en/user-guide.md`
- `docs/zh-CN/user-guide.md`
- `docs/project/knowledge-map.md` only if routing needs adjustment

#### Forbidden Scope

- `src/**`
- `packages/**`
- `adapters/**`
- build/test/package config
- issue closure or GitHub mutation without explicit user request

#### Execution

- Mode: sequential
- Depends On: none
- Can Run With: none
- Must Not Run With: unrelated source changes
- Fallback Order: S1 only
- Shared Files: none beyond docs in slice
- Merge Owner: primary agent
- Conflict Risk: low
- Gate Class: standard
- Risk Score: 2
- Gate Reasons:
  - docs-only
  - bilingual-alignment-required
  - current-vs-target-wording-required
- Validation Level: final
- Recommended Agent Strategy: bounded docs edit plus reviewer diff-review

#### Steps

1. Review public docs for wording that still over-centers CLI as long-term product direction.
2. Update `README.md` only if a concise clarity improvement is still needed.
3. Update English and Chinese software design docs only where systematic polish improves issue acceptance mapping.
4. Update English and Chinese user guides to state they are current reference-harness guides and to clarify provider credential/model account boundary.
5. Update knowledge map only if the docs changes add, remove, rename, or materially change routing.
6. Keep target-vs-current language explicit and avoid implementation overclaims.

#### Validation

- Manual check: English and Chinese docs are semantically aligned.
- Manual check: #31 and #32 acceptance criteria are traceable to the updated docs.
- Manual check: no source-code index was added.
- Command: `npm run check` optional but acceptable as a repository sanity check; docs-only changes do not require live provider validation.

#### Done Criteria

- Updated docs explicitly satisfy #31/#32 acceptance criteria.
- CLI remains described as current/reference/prototype.
- Target Core/adapters direction is clear.
- Provider credential/model account ownership remains outside Quill Core in target wording.
- No source/runtime behavior changes are included.

#### Rollback Notes

- Revert the docs-only changes in this slice. No runtime state migration or build artifact cleanup should be needed.

## Final Validation

- Manual bilingual alignment review.
- Manual issue acceptance checklist for #31/#32.
- Optional `npm run check` if environment is available.

## Documentation Update Requirement

This task is itself a documentation update. Knowledge map update is required only if routing changes.

## Test Strategy

### Selected Strategy

- Task type: documentation
- Change type: public docs wording and routing alignment
- Strategy summary: manual acceptance and bilingual semantic review, with optional TypeScript check as a broad sanity command.

### Required Evidence

- Reproduction or baseline evidence: current docs already include pivot wording but user guides are mostly CLI-only.
- Behavior that must be protected: current CLI docs remain accurate; target docs remain clearly future-facing.
- Risk-sensitive areas: bilingual drift, target/current overclaiming, provider credential boundary wording.

### Validation Approach

- Automated tests: optional `npm run check`; no logic changes expected.
- Smoke checks: not required for docs-only changes.
- Manual checks: required for issue acceptance and bilingual alignment.
- Environment dependencies: none for manual docs checks.

### NOT_RUN Conditions

- Live provider validation: not run; docs-only task and #31/#32 do not change runtime generation.
- Hermes live smoke: not run; no adapter behavior changes.

## Risks

- Over-polishing may accidentally imply target-state work is implemented.
- Bilingual docs may diverge if English and Chinese edits are not kept aligned.
- README/software-design/user-guide may repeat similar ideas with slightly inconsistent wording.
