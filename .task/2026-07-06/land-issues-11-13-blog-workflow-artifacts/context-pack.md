# Task Context Pack

## Task Goal

Land GitHub issues #11, #12, and #13 by making Quill's technical-blog workflow artifacts local-first, Markdown/JSON-based, human-editable, and runtime-loaded where relevant.

## Knowledge Posture

- Mode: mudball
- Maturity: L1

Use current code behavior as source of truth. Keep docs references compact and current-state-first.

## Current Slice Or Group

No coding slice is approved yet. Proposed first slice after user confirmation: `slice-1-init-local-artifacts`.

## Gate Policy

- Recommended: balanced
- Selected: balanced
- finalApprovalRequired: true
- Policy Notes: `balanced` is selected from repository default for this Tier M task. It does not bypass the analysis-to-coding gate, final approval, explicit stop conditions, or any stronger pause required by `gateClass`/`risk_score`.

## Requirement Source

`.task/2026-07-06/land-issues-11-13-blog-workflow-artifacts/requirement.md`

## Implementation Source

`.task/2026-07-06/land-issues-11-13-blog-workflow-artifacts/implementation-plan.md`

## Involved Modules Or Areas

- CLI initialization and generated local artifacts
- Workflow JSON loading
- Prompt construction and runtime prompt-template loading
- Review checklist injection for the review step

## Loaded Context

### Global Rules

- `AGENTS.md`: Tier M tasks need analysis plus task-scoped context pack before coding; do not cross analysis-to-coding gate without explicit confirmation.
- `.aiassistant/rules/00-repository-rules.md`: do not expand task scope; preserve existing project conventions; docs are not a substitute for source inspection.
- `.aiassistant/rules/workflow-rules.md`: non-trivial tasks must not move from analysis to coding without confirmation; context pack required for Tier M/L tasks.

### Knowledge Map Matches

- `docs/project/knowledge-map.md`: project workflow routing only; no detailed module docs exist for this CLI area.
- `docs/project/marionettist-workflow.md`: gate policy, Tier handling, context pack, and slice metadata rules.

### Path-Proximity Rules

No nearby `MODULE_RULES.md`, `AGENTS.md`, or `HARNESS_RULES.md` were identified for the target files during bounded inspection.

### Excluded Context

- Broader `docs/target/` content: not needed because this task is MVP current-state implementation.
- Full docs tree: excluded to avoid turning docs into a code index.

## Loaded Rules

- `AGENTS.md`
- `.aiassistant/rules/00-repository-rules.md`
- `.aiassistant/rules/workflow-rules.md`

## Loaded Docs

- `docs/project/marionettist-workflow.md`
- `docs/project/knowledge-map.md`
- `docs/develop/12-prompt-template-design.md`
- `docs/templates/review-checklist.md`

## Execution Mode

- Mode: sequential
- Current Slice Or Group: none approved; next proposed slice is `slice-1-init-local-artifacts`
- Parallel Members: none
- Fallback Order: slice 1, slice 2, slice 3, slice 4
- Shared Files: `src/commands/init.ts`, `src/llm/prompts.ts`, `src/workflows/runWorkflow.ts`
- Merge Owner: primary implementing agent
- Conflict Resolution Rule: later slices preserve artifact paths/contracts from earlier slices.
- Validation Level: slice, then final validation after slice 4

## Execution Chain

1. `quill init` creates local defaults.
2. Workflow loading reads `.quill/workflows/technical-blog.json`.
3. Workflow execution loads style profile and input artifacts.
4. Prompt construction uses local step prompt template content.
5. Review step includes local review checklist content.

## Allowed Modification Scope

- `src/commands/init.ts`
- `src/workflows/loadWorkflow.ts`
- `src/workflows/runWorkflow.ts`
- `src/llm/prompts.ts`
- Optional small loader/helper files under `src/workflows/`, `src/llm/`, or `src/styles/`
- Smoke tests under `scripts/` when generated artifact expectations change
- Documentation only if user-facing artifact layout or behavior needs documentation sync

## Forbidden Modification Scope

- Marionettist runtime dependency
- Shared-core extraction
- Web UI, database, plugin marketplace, automatic publishing, automatic web research, complex model routing
- Dependency upgrades or package script changes without explicit approval
- Broad workflow engine redesign
- `src/workflows/steps/*.ts` as the primary implementation surface unless a narrow blocker is found
- Private content, API keys, or account configuration

## Key Existing Classes Or Entrypoints

- `src/commands/init.ts`: currently creates `.quill/styles/default.md`, `.quill/templates/*.md`, `.quill/workflows/technical-blog.json`, and `docs/articles`.
- `src/workflows/loadWorkflow.ts`: currently reads workflow JSON and casts parsed data to `Workflow`.
- `src/workflows/runWorkflow.ts`: currently loads style profile, reads inputs, builds prompt, calls model client, and writes output.
- `src/llm/prompts.ts`: currently uses inline `stepInstructions` switch.
- `docs/develop/12-prompt-template-design.md`: prompt design reference for six workflow steps.
- `docs/templates/review-checklist.md`: review checklist content reference.

## Required Behavior

- Local `.quill/` artifacts are editable and generated idempotently.
- Runtime respects local prompt/checklist/style/workflow artifacts.
- Review checklist is included only for the review step.
- Workflow JSON validation errors are actionable.
- Existing smoke tests remain meaningful and are updated when expected generated files change.

## Non-goals

- No broad prompt methodology redesign beyond issue #13.
- No model routing redesign.
- No automatic web research.
- No publishing or platform integration.

## Implementation Steps

See implementation plan slices. Start with `slice-1-init-local-artifacts` only after explicit user confirmation.

## Validation Commands

- `npm run build`
- `npm run check`
- `npm run smoke:init`
- `npm run smoke:article-status`
- Manual check if needed: inspect generated `.quill/` artifacts and verify review prompt construction includes checklist content.

## Test Strategy

- Task type: feature
- Change type: CLI init generation plus runtime artifact loading
- Required evidence: generated artifacts, type/build success, smoke tests, and review-checklist inclusion evidence.
- NOT_RUN allowed only when command/environment is unavailable; report command, reason, and follow-up.

## Assumptions

- Existing `commander`/Node/TypeScript stack remains unchanged.
- `quill run` may require LLM credentials, so prompt/checklist inclusion may need non-LLM validation or manual evidence if no current smoke command covers it.

## Risks

- `.quill/templates/` currently appears to hold article artifact templates; prompt templates may need a distinct `.quill/prompts/` path to avoid confusion.
- Shared files across slices make parallel execution unnecessary and risky.
- Runtime prompt construction behavior changes can affect generated content quality even when type checks pass.

## Stop Conditions

- Need to change agreed artifact layout.
- Need for dependency upgrade or package script changes.
- Need to use `src/workflows/steps/*.ts` as a primary surface.
- Need to change behavior outside issues #11-#13.
- Validation path cannot produce credible evidence.
