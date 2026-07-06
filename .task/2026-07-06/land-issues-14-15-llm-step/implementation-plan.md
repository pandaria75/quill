# Issues #14-#15 Gap-Fill Landing Implementation Plan

## Requirement Source

- `.task/2026-07-06/land-issues-14-15-llm-step/requirement.md`

## Scope Summary

Gap-fill landing for already-existing #14 and #15 implementation: validation, minimal fixes, and compact current behavior documentation.

## Involved Modules Or Areas

- CLI commands
- Workflow step execution
- LLM client integration
- Artifact writing / overwrite protection
- README or current-state docs

## Loaded Rules

- `AGENTS.md`
- `.aiassistant/rules/00-repository-rules.md`
- `.aiassistant/rules/workflow-rules.md`
- `.marionettist/tier-policy.yml`

## Loaded Docs

- `docs/project/marionettist-workflow.md`
- `docs/project/knowledge-map.md`
- GitHub issues #14 and #15
- Read-only repository exploration report for existing code/docs/scripts

## Global Forbidden Scope

- Do not reimplement the OpenAI-compatible client.
- Do not introduce complex model routing.
- Do not add shared workflow-core abstraction.
- Do not add Marionettist runtime dependency.
- Do not add dependencies unless absolutely necessary and explicitly approved.
- Do not expand CLI behavior beyond #14/#15 landing needs.
- Do not commit private content, API keys, or personal account configuration.

## Execution Strategy

- Complexity: standard / Tier M
- Default Execution: sequential
- Parallel Execution: not-needed
- Fallback Execution: sequential
- Merge Owner: primary agent
- Conflict Resolution Rule: keep smallest local change; stop before broad redesign or public API changes

## Gate Policy

- Recommended: balanced
- Selected: balanced
- Reason: repository default balanced; user accepted bounded gap-fill landing; Tier M with standard review
- finalApprovalRequired: true

## Slice Dependency Graph

| Slice | Depends On | Can Run In Parallel With | Fallback Order | Shared Files | Merge Owner | Conflict Risk |
| --- | --- | --- | --- | --- | --- | --- |
| slice-1-verification-baseline | none | none | 1 | possible source/workflow files | primary agent | medium |
| slice-2-smoke-docs | slice-1-verification-baseline | none | 2 | README/docs/current | primary agent | low |
| slice-3-final-evidence | slice-2-smoke-docs | none | 3 | task artifacts only | primary agent | low |

## Implementation Slices

### Slice 1: Verification Baseline And Minimal Behavior Fixes

#### Goal

Run/build/check current #14/#15 implementation and make only minimal source fixes required for existing intended behavior to pass.

#### Allowed Modification Scope

- `src/llm/ChatClient.ts`
- `src/llm/OpenAICompatibleClient.ts`
- `src/llm/prompts.ts`
- `src/workflows/runWorkflow.ts`
- `src/commands/step.ts`
- `src/artifacts/writeArtifact.ts`
- Existing directly relevant smoke/test files only if required by validation

#### Forbidden Scope

- New dependency additions without approval
- Model router or provider registry
- Public API stabilization for the LLM client
- Workflow core extraction
- Marionettist runtime integration
- Broad command architecture changes

#### Execution

- Mode: sequential
- Depends On: none
- Can Run With: none
- Must Not Run With: other slices
- Fallback Order: 1
- Shared Files: source/workflow files listed above
- Merge Owner: primary agent
- Conflict Risk: medium
- Gate Class: standard
- Risk Score: 3
- Gate Reasons: cli-behavior, llm-boundary, workflow-touchpoints
- Validation Level: slice
- Recommended Agent Strategy: inspect current behavior first; patch only failing or misleading minimal gaps

#### Steps

1. Run baseline build/check.
2. Inspect failures, if any, against #14/#15 scope only.
3. Apply smallest source or directly relevant smoke/test fix if required.
4. Re-run build/check.

#### Validation

- `npm run build`
- `npm run check`

#### Done Criteria

- Build/check pass or failures are documented as pre-existing/unrelated with evidence.
- Any source changes are minimal and directly tied to #14/#15 landing.
- Internal LLM client remains internal.
- No dependencies added.

#### Rollback Notes

- Revert changes to allowed source/smoke files from this slice.

### Slice 2: Smoke Verification And Landing Notes

#### Goal

Confirm user-visible smoke behavior and add compact documentation for landed behavior.

#### Allowed Modification Scope

- `README.md`
- `docs/current/**/*.md`
- Existing smoke documentation or scripts if already present and directly relevant
- Source files from Slice 1 only for tiny fixes discovered by smoke verification

#### Forbidden Scope

- New docs architecture
- Exhaustive source index documentation
- New smoke framework
- New dependencies
- Public LLM client API docs beyond an internal current capability note

#### Execution

- Mode: sequential
- Depends On: slice-1-verification-baseline
- Can Run With: none
- Must Not Run With: slice-1 before it is complete
- Fallback Order: 2
- Shared Files: README/docs/current
- Merge Owner: primary agent
- Conflict Risk: low
- Gate Class: standard
- Risk Score: 2
- Gate Reasons: docs-user-behavior, smoke-verification
- Validation Level: slice
- Recommended Agent Strategy: document only current user-visible behavior and validation evidence

#### Steps

1. Run existing smoke commands.
2. Add compact README or current-state notes for `quill step`, env/config assumptions, overwrite protection, and internal LLM capability.
3. Avoid presenting internal LLM classes as public API.
4. Re-run relevant validation.

#### Validation

- `npm run smoke:init`
- `npm run smoke:article-status`
- `npm run build`
- `npm run check`

#### Done Criteria

- Smoke commands pass or documented `NOT_RUN`/failure reason is captured.
- README or `docs/current` describes current `quill step` behavior and LLM assumptions compactly.
- Documentation remains current-state oriented and not a source-code index.

#### Rollback Notes

- Revert docs/smoke-note changes and any tiny source fixes made during smoke verification.

### Slice 3: Final Evidence And Handoff Cleanup

#### Goal

Record final bounded review, validation evidence, and issue-closure handoff status.

#### Allowed Modification Scope

- `.task/2026-07-06/land-issues-14-15-llm-step/state.json`
- `.task/2026-07-06/land-issues-14-15-llm-step/context-pack.md`
- No production source files unless correcting a slice-local issue found during review

#### Forbidden Scope

- New feature work
- Behavior expansion
- Dependency changes
- Reimplementation

#### Execution

- Mode: sequential
- Depends On: slice-2-smoke-docs
- Can Run With: none
- Must Not Run With: earlier slices before completion
- Fallback Order: 3
- Shared Files: task artifacts
- Merge Owner: primary agent
- Conflict Risk: low
- Gate Class: simple
- Risk Score: 1
- Gate Reasons: final-evidence, scope-check
- Validation Level: final
- Recommended Agent Strategy: evidence-only cleanup; no feature changes

#### Steps

1. Ensure review and validation evidence is captured.
2. Record remaining risks or `NOT_RUN` cases.
3. Prepare final approval summary and issue follow-up notes.

#### Validation

- `npm run build`
- `npm run check`
- `npm run smoke:init`
- `npm run smoke:article-status`

#### Done Criteria

- Final validation status is recorded.
- Remaining risks or `NOT_RUN` cases are explicit.
- Final approval gate is ready.

#### Rollback Notes

- Revert task artifact updates only unless review-triggered source correction occurred.

## Parallel Slice Groups

Not used. Work is sequential and small enough that parallel execution would add coordination cost.

## Final Validation

- `npm run build`
- `npm run check`
- `npm run smoke:init`
- `npm run smoke:article-status`

## Documentation Update Requirement

Update README or `docs/current` only to describe current behavior and validation assumptions. Do not turn docs into a code index.

## Risks

- Accidentally expanding scope into public API or model routing.
- Claiming live provider validation without credentials/network evidence.
- Changing workflow/CLI behavior beyond issue landing.
