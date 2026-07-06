# Land Issues #11-#13 Implementation Plan

## Requirement Source

`.task/2026-07-06/land-issues-11-13-blog-workflow-artifacts/requirement.md`

## Scope Summary

Implement local editable technical-blog workflow artifacts for Quill MVP: workflow JSON, default style profile, review checklist, and six step prompt templates.

## Involved Modules Or Areas

- CLI initialization: `src/commands/init.ts`
- Workflow loading: `src/workflows/loadWorkflow.ts`
- Workflow execution: `src/workflows/runWorkflow.ts`
- Prompt construction: `src/llm/prompts.ts`
- Style loading: `src/styles/loadStyleProfile.ts`
- Template/design references: `docs/templates/review-checklist.md`, `docs/develop/12-prompt-template-design.md`

## Loaded Rules

- `AGENTS.md`
- `.aiassistant/rules/00-repository-rules.md`
- `.aiassistant/rules/workflow-rules.md`

## Loaded Docs

- `docs/project/marionettist-workflow.md`
- `docs/project/knowledge-map.md`
- `docs/develop/12-prompt-template-design.md`
- `docs/templates/review-checklist.md`

## Global Forbidden Scope

- No Marionettist runtime dependency.
- No shared-core extraction.
- No web UI, database, plugin marketplace, automatic publishing, automatic web research, or complex model routing.
- No dependency upgrades or build-script changes unless a blocker is found and explicitly approved.
- No broad workflow engine redesign.
- Do not use `src/workflows/steps/*.ts` as the primary implementation surface unless a narrow blocker is found.

## Execution Strategy

- Complexity: simple
- Default Execution: sequential
- Parallel Execution: not-needed
- Fallback Execution: sequential
- Merge Owner: primary implementing agent
- Conflict Resolution Rule: later slices must preserve artifact paths and contracts established by earlier slices.

## Slice Dependency Graph

| Slice | Depends On | Can Run In Parallel With | Fallback Order | Shared Files | Merge Owner | Conflict Risk |
| --- | --- | --- | --- | --- | --- | --- |
| slice-1-init-local-artifacts | none | none | 1 | `src/commands/init.ts`, smoke init expectations | primary agent | medium |
| slice-2-workflow-loading-validation | slice-1 | none | 2 | `src/workflows/loadWorkflow.ts` | primary agent | low |
| slice-3-runtime-prompt-template-loading | slice-1 | none | 3 | `src/llm/prompts.ts`, `src/workflows/runWorkflow.ts` | primary agent | medium |
| slice-4-review-checklist-injection | slice-3 | none | 4 | `src/llm/prompts.ts`, `src/workflows/runWorkflow.ts` | primary agent | medium |

## Implementation Slices

### Slice 1: Init Local Artifacts

#### Goal

Extend `quill init` output so users get editable workflow, style, checklist, and prompt/template artifacts under `.quill/`.

#### Allowed Modification Scope

- `src/commands/init.ts`
- `scripts/smoke-init.mjs` if expected generated files change

#### Forbidden Scope

- No runtime workflow/prompt behavior changes in this slice unless required to keep the build compiling.
- No dependency or package script changes.

#### Execution

- Mode: sequential
- Depends On: none
- Can Run With: none
- Must Not Run With: other slices touching shared init/template contracts
- Fallback Order: 1
- Shared Files: `src/commands/init.ts`, `scripts/smoke-init.mjs`
- Merge Owner: primary agent
- Conflict Risk: medium
- Gate Class: standard
- Risk Score: 3
- Gate Reasons: `init-output-contract`, `local-artifact-layout`, `user-editable-config`
- Validation Level: slice
- Recommended Agent Strategy: small edit, preserve existing generated files and idempotent `writeFileIfMissing` behavior.

#### Steps

1. Add local checklist output directory/file under `.quill/`.
2. Add or adjust local prompt template generation under `.quill/` using Markdown content grounded in existing docs/design.
3. Preserve existing generated workflow, style, and article artifact templates unless the new prompt path requires a clear distinction.
4. Update smoke-init expectations for any new generated files.

#### Validation

- `npm run build`
- `npm run check`
- `npm run smoke:init`

#### Done Criteria

- Fresh init creates the expected editable local artifacts.
- Re-running init preserves user edits through existing skip behavior.
- Existing init behavior for workflow/style/article templates remains compatible.

#### Rollback Notes

Revert init output additions and smoke-init expectation changes.

### Slice 2: Workflow Loading Validation

#### Goal

Make workflow JSON loading safer while preserving the `.quill/workflows/technical-blog.json` runtime path.

#### Allowed Modification Scope

- `src/workflows/loadWorkflow.ts`
- Optional small helper/type file under `src/workflows/`

#### Forbidden Scope

- No broad workflow engine rewrite.
- No dependency changes.
- No edits to `src/workflows/steps/*.ts` unless a blocker is found.

#### Execution

- Mode: sequential
- Depends On: slice-1-init-local-artifacts
- Can Run With: none
- Must Not Run With: runtime prompt-loading slices
- Fallback Order: 2
- Shared Files: `src/workflows/loadWorkflow.ts`
- Merge Owner: primary agent
- Conflict Risk: low
- Gate Class: standard
- Risk Score: 3
- Gate Reasons: `runtime-json-loading`, `validation-behavior`, `cli-regression-risk`
- Validation Level: slice
- Recommended Agent Strategy: validate JSON shape with actionable errors without adding dependencies.

#### Steps

1. Wrap JSON parse errors with workflow-path context.
2. Validate required workflow fields and step fields.
3. Validate supported model role and basic string/list field types.
4. Keep returned `Workflow` shape compatible with current callers.

#### Validation

- `npm run build`
- `npm run check`
- `npm run smoke:article-status`

#### Done Criteria

- Valid generated workflow loads successfully.
- Malformed or invalid workflow shape fails with an actionable error.

#### Rollback Notes

Restore the previous `JSON.parse(raw) as Workflow` behavior.

### Slice 3: Runtime Prompt Template Loading

#### Goal

Load local Markdown prompt templates when building prompts, while preserving style profile and input artifact behavior.

#### Allowed Modification Scope

- `src/llm/prompts.ts`
- `src/workflows/runWorkflow.ts`
- Optional small loader helper under `src/llm/` or `src/workflows/`

#### Forbidden Scope

- No LLM provider changes.
- No prompt format beyond local Markdown template loading.
- No broad rewrite of workflow execution.

#### Execution

- Mode: sequential
- Depends On: slice-1-init-local-artifacts
- Can Run With: none
- Must Not Run With: slice-4 until prompt loading contract is clear
- Fallback Order: 3
- Shared Files: `src/llm/prompts.ts`, `src/workflows/runWorkflow.ts`
- Merge Owner: primary agent
- Conflict Risk: medium
- Gate Class: standard
- Risk Score: 3
- Gate Reasons: `prompt-behavior-change`, `runtime-template-loading`, `generated-artifact-compatibility`
- Validation Level: slice
- Recommended Agent Strategy: minimal async loader path; keep prompt output Markdown-only and preserve input block behavior.

#### Steps

1. Add runtime loading for the current step prompt template from the agreed `.quill/` path.
2. Thread loaded prompt template content into prompt construction.
3. Preserve style profile and input artifact blocks.
4. Make missing prompt templates fail with actionable local file path guidance or a clearly documented fallback.

#### Validation

- `npm run build`
- `npm run check`
- `npm run smoke:article-status`

#### Done Criteria

- Runtime prompt construction uses local Markdown prompt templates.
- Existing article status smoke path remains unaffected.

#### Rollback Notes

Restore inline `stepInstructions` switch behavior.

### Slice 4: Review Checklist Injection

#### Goal

Inject local review checklist content into the review step prompt.

#### Allowed Modification Scope

- `src/llm/prompts.ts`
- `src/workflows/runWorkflow.ts`
- Optional checklist loader helper under `src/llm/` or `src/styles/`

#### Forbidden Scope

- No unrelated review workflow redesign.
- No checklist content expansion beyond issue scope.
- No edits to step implementation stubs unless necessary.

#### Execution

- Mode: sequential
- Depends On: slice-3-runtime-prompt-template-loading
- Can Run With: none
- Must Not Run With: none
- Fallback Order: 4
- Shared Files: `src/llm/prompts.ts`, `src/workflows/runWorkflow.ts`
- Merge Owner: primary agent
- Conflict Risk: medium
- Gate Class: standard
- Risk Score: 3
- Gate Reasons: `review-step-behavior`, `prompt-injection-path`, `checklist-runtime-loading`
- Validation Level: final
- Recommended Agent Strategy: inject checklist only for `review`; keep other steps unaffected.

#### Steps

1. Load local review checklist artifact.
2. Include checklist content only when current step is `review`.
3. Keep missing checklist behavior explicit and user-friendly.
4. Add or update smoke/manual validation evidence to confirm inclusion path.

#### Validation

- `npm run build`
- `npm run check`
- `npm run smoke:init`
- `npm run smoke:article-status`
- Manual check: inspect generated local artifacts and verify review-step prompt construction includes checklist content.

#### Done Criteria

- Review step receives local checklist content.
- Checklist remains human-editable.
- Final validation passes or any `NOT_RUN` reasons are documented.

#### Rollback Notes

Remove checklist injection and restore prior review prompt behavior.

## Parallel Slice Groups

None. The slices share init/runtime prompt files, so sequential execution is safer.

## Final Validation

- `npm run build`
- `npm run check`
- `npm run smoke:init`
- `npm run smoke:article-status`
- Manual artifact inspection if runtime prompt inclusion cannot be fully covered by existing smoke scripts.

## Test Strategy

### Selected Strategy

- Task type: feature
- Change type: CLI init artifact generation plus runtime artifact loading
- Strategy summary: Use TypeScript build/check plus smoke tests for init and article-status behavior; supplement with manual prompt/checklist inclusion evidence if no existing smoke path exercises model-backed `run`.

### Required Evidence

- Reproduction or baseline evidence: current init generates local style/templates/workflow inline; runtime currently parses workflow JSON and builds prompt instructions inline.
- Behavior that must be protected: existing generated defaults remain usable, local user edits are respected, status/init smoke commands do not require LLM credentials.
- Risk-sensitive areas: runtime JSON/template loading, prompt construction, review checklist injection.

### Validation Approach

- Automated tests: `npm run build`, `npm run check`
- Smoke checks: `npm run smoke:init`, `npm run smoke:article-status`
- Manual checks: generated `.quill/` artifact inventory; review prompt includes checklist content if not automated.
- Environment dependencies: local Node/npm environment; no external LLM should be needed for init/status smoke tests.

### NOT_RUN Conditions

- If a validation command is unavailable due to missing dependencies or environment constraints, report `NOT_RUN` with command, reason, and required follow-up.

## Documentation Update Requirement

Update docs only if the implemented artifact layout or workflow behavior changes user-facing design beyond existing docs. If docs/rules are added, moved, renamed, or deleted, update `docs/project/knowledge-map.md`.

## Risks

- `.quill/templates/` currently appears to represent article artifact templates, while prompt templates may need a distinct local path to avoid semantic confusion.
- Existing smoke tests may need updates for new generated files.
- `quill run` may be the only path that exercises prompt construction and may require LLM credentials; manual or unit-level validation may be needed for prompt/checklist inclusion.
