# Context Pack: Issues #6/#7 CLI Init Landing

## Task Goal

Land GitHub issues #6 and #7 as one bounded task: verify and complete the TypeScript CLI skeleton and `quill init` workspace scaffold, with repeatable smoke validation.

## Task State

- taskId: `2026-07-03/land-issues-6-7-cli-init`
- phase: `finalization`
- allowedToCode: true
- currentSlice: `slice-1-add-init-smoke`
- selected gate policy: `balanced`
- final approval required: true

## Requirement Source

- `.task/2026-07-03/land-issues-6-7-cli-init/requirement.md`
- GitHub issues #6 and #7
- User confirmation: one task, add smoke test script or framework, create task files

## Implementation Source

- `.task/2026-07-03/land-issues-6-7-cli-init/implementation-plan.md`

## Loaded Rules

- `AGENTS.md`
- `.aiassistant/rules/00-repository-rules.md`
- `.aiassistant/rules/workflow-rules.md`

## Loaded Docs

- `docs/project/marionettist-workflow.md`
- `docs/project/knowledge-map.md`
- `docs/develop/01-mvp-scope.md`
- `docs/develop/09-cli-command-design.md`
- `docs/develop/13-mvp-acceptance-test.md`

## Relevant Existing Entrypoints

- `src/cli.ts`: commander CLI with `init`, `new`, `status`, `step`, and `run` commands.
- `src/commands/init.ts`: creates `.quill/`, template/style/workflow files, and `docs/articles/`; skips existing files.
- `src/utils/fs.ts`: `writeFileIfMissing` provides non-overwrite behavior.
- `package.json`: currently has `build`, `dev`, and `check`; no smoke command yet.

## Baseline Validation Evidence

- `npm run check && npm run build`: PASS.
- Manual temp-workspace smoke: `dist/cli.js init` twice created expected files then reported skipped files: PASS.

## Current Gap

- No committed smoke script or package command exists for repeatable #6/#7 validation.

## Allowed Modification Scope

- Slice 1:
  - `package.json`
  - `scripts/smoke-init.mjs` or equivalent minimal smoke script
- Slice 2 only if needed:
  - `src/cli.ts`
  - `src/commands/init.ts`
  - smoke assertion alignment when tied to documented behavior

## Forbidden Modification Scope

- No unrelated changes to `new`, `status`, `step`, or `run`.
- No dependency upgrades or broad framework replacement without user approval.
- No Marionettist runtime dependency.
- No Web UI, database, publishing, plugin marketplace, automatic web research, shared-core extraction, or complex model routing.

## Validation Commands

```bash
npm run check
npm run build
npm run smoke:init
```

## Assumptions

- Existing #6/#7 implementation is mostly complete; the known gap is repeatable smoke validation.
- `dist/cli.js` is the built package entrypoint used by smoke after `npm run build`.
- Smoke may use an isolated temp directory and must not require `QUILL_API_KEY`.

## Risks

- Package-script changes are public developer workflow surface.
- Smoke must avoid writing into the repository workspace.
- Idempotency must verify preservation, not only existence.

## Stop Conditions

- Smoke reveals a requirement gap outside #6/#7.
- Fix requires modifying unrelated commands or adding dependencies.
- Local environment cannot run the smoke command and no credible substitute exists.

## Current Approved Slice Or Group

Completed current slice: `slice-1-add-init-smoke`.

Slice 2 (`slice-2-supplement-init-gaps-if-needed`) is currently not needed because smoke validation and review found no concrete #6/#7 init implementation gap after Slice 1.
