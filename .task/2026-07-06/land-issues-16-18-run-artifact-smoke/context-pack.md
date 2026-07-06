# Task Context Pack

## Task Goal

Land GitHub issues #16-#18: make `quill run` MVP-supported, preserve/verify six Markdown artifacts, and add a stable offline MVP smoke test covering `init`, `new`, `status`, `step`, and `run` behavior.

## Knowledge Posture

- Mode: `standard`
- Maturity: `L1`

## Current Slice Or Group

- Current approved proposal: `slice-1-run-mvp-ux`
- Coding is not yet authorized. Analysis-to-coding confirmation is required first.

## Gate Policy

- Recommended: `balanced`
- Selected: `balanced`
- finalApprovalRequired: true
- Policy Notes: `balanced` is the repo default and user accepted the recommended approach. It does not bypass the analysis-to-coding gate, final approval, protected/dangerous command stops, or elevated-risk stops.

## Requirement Source

- `.task/2026-07-06/land-issues-16-18-run-artifact-smoke/requirement.md`
- GitHub issues #16, #17, #18.

## Implementation Source

- `.task/2026-07-06/land-issues-16-18-run-artifact-smoke/implementation-plan.md`

## Involved Modules Or Areas

- CLI commands: `src/commands/run.ts`, `src/commands/step.ts`, `src/commands/status.ts`
- Workflow execution: `src/workflows/runWorkflow.ts`, `src/workflows/loadWorkflow.ts`
- Artifacts: `src/articles/articlePaths.ts`, `src/artifacts/artifactStatus.ts`
- Smoke scripts: `scripts/smoke-init.mjs`, `scripts/smoke-article-status.mjs`, new `scripts/smoke-mvp.mjs`
- Docs: `README.md`, `docs/develop/13-mvp-acceptance-test.md`

## Loaded Context

### Global Rules

- `AGENTS.md`: follow Marionettist gates; do not code before explicit confirmation; use task-scoped artifacts; keep docs concise; no broad implementation from conversation only.

### Knowledge Map Matches

- `docs/project/knowledge-map.md`: project workflow routing only; no code-index use.
- `docs/project/marionettist-workflow.md`: task state, gate policy, slice metadata, final gate report requirements.

### Path-Proximity Rules

- No nearby `MODULE_RULES.md`, `HARNESS_RULES.md`, or nested `AGENTS.md` were identified for the target files during initial analysis.
- `.aiassistant/rules/*.md`: no files found.

### Excluded Context

- Full docs tree not loaded because knowledge maturity is L1 and this task has a tight CLI/test/doc surface.
- `docs/target/**` not loaded because current implementation behavior, not future architecture, controls this task.

## Loaded Rules

- `AGENTS.md`

## Loaded Docs

- `docs/project/marionettist-workflow.md`
- `docs/project/knowledge-map.md`
- `docs/develop/13-mvp-acceptance-test.md`

## Execution Mode

- Mode: sequential
- Current Slice Or Group: `slice-1-run-mvp-ux`
- Parallel Members: none
- Fallback Order: slice-1, slice-2, slice-3
- Shared Files: none for current slice except `src/commands/run.ts`
- Merge Owner: primary agent
- Conflict Resolution Rule: keep changes bounded; if broader architecture edits appear necessary, stop and ask.
- Validation Level: slice

## Execution Chain

- CLI `run` command currently: `src/commands/run.ts` -> `loadConfig` -> `loadWorkflow` -> `resolveArticle` -> loop `workflow.steps` -> `runWorkflowStep` -> model client -> `writeArtifact`.
- Missing key error originates in `src/workflows/runWorkflow.ts` when `process.env[config.modelProvider.apiKeyEnv]` is absent.
- `status` command uses `getArtifactStatuses` and `formatArtifactStatus` over `artifactNames`.

## Allowed Modification Scope

### Current slice: `slice-1-run-mvp-ux`

- `src/commands/run.ts`
- Optional tiny local helper only if it avoids duplication and does not broaden architecture.

### Later approved slices after gate/continuation

- Slice 2: `scripts/smoke-mvp.mjs`, `package.json`, tiny smoke-related fixes if necessary.
- Slice 3: `README.md`, `docs/develop/13-mvp-acceptance-test.md`, task-local evidence.

## Forbidden Modification Scope

- No Marionettist runtime dependency.
- No shared-core/platform/plugin architecture.
- No new test framework.
- No real API calls in default smoke.
- No committed secrets or private article content.
- No deleting or repurposing `src/workflows/steps/*.ts` stubs.
- No artifact-system rewrite unless the user explicitly approves a new scope.

## Key Existing Classes Or Entrypoints

- `runCommand(articleSlug, options, cwd)` in `src/commands/run.ts`
- `stepCommand(articleSlug, stepName, options, cwd)` in `src/commands/step.ts`
- `statusCommand(articleSlug, cwd)` in `src/commands/status.ts`
- `runWorkflowStep(options)` in `src/workflows/runWorkflow.ts`
- `loadWorkflow(cwd, config, name)` in `src/workflows/loadWorkflow.ts`
- `artifactNames` in `src/articles/articlePaths.ts`
- Existing smoke script patterns in `scripts/smoke-init.mjs` and `scripts/smoke-article-status.mjs`

## Required Behavior

- `quill run` executes configured workflow steps in order.
- It prints clear per-step progress and final success summary only after all steps complete.
- It stops on first failure and keeps the failed step/cause clear.
- Missing `QUILL_API_KEY` remains a clear generation-time error for `step` and `run`.
- Offline smoke validates no-key paths without claiming live generation success.

## Non-goals

- Live provider smoke by default.
- Workflow engine redesign.
- Artifact lifecycle statuses.
- Shared core with Marionettist.

## Implementation Steps

For current slice only:

1. Edit `src/commands/run.ts` to improve logging and summary.
2. Preserve existing options and force behavior.
3. Ensure thrown errors include failed step context while retaining original missing-key text.
4. Run slice validation.

## Validation Commands

Current slice:

- `npm run check`
- `npm run build`

Later/final:

- `npm run smoke:init`
- `npm run smoke:article-status`
- `npm run smoke:mvp`

Optional manual live-provider check:

- `QUILL_API_KEY=... quill run <slug>` in a temp/local workspace.

## Assumptions

- User selected the recommended offline default smoke and no-rewrite approach.
- The default configured missing-key env var is `QUILL_API_KEY` unless local config changes it.
- Existing command error handling surfaces thrown errors to CLI stderr with non-zero exit.

## Risks

- Exact CLI output can become brittle for smoke assertions; use stable fragments.
- Wrapping errors incorrectly could hide useful root causes.
- Live generation remains unverified by default smoke due to credential boundary.

## Stop Conditions

- Stop before coding until user confirms the analysis-to-coding gate.
- Stop if implementation requires new architecture, new test framework, or provider redesign.
- Stop before any destructive shell action, release/publish/deploy, project-external write, or credential use.
- Stop if validation cannot run and no acceptable `NOT_RUN` reason exists.
