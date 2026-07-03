# Implementation Plan: Issues #6/#7 CLI Init Landing

## Classification

- Workflow: development / feature
- Tier: M
- Critic gate: not required by default
- Execution mode: sequential
- Gate policy selected: `balanced`

## Test Strategy

```yaml
selectedStrategy:
  taskType: feature-completion
  changeType: CLI behavior plus smoke test harness
  summary: Encode existing manual init smoke into a repeatable package command, then use it to verify any small init supplements.

requiredEvidence:
  baseline:
    - npm run check and npm run build pass before coding.
    - Manual dist/cli.js init twice passed in a clean temp workspace.
  protectedBehavior:
    - init works from a clean workspace.
    - second init is safe and skips expected existing files.
    - init requires no API key.
  riskSensitiveAreas:
    - generated file paths and content
    - idempotency behavior
    - package script wiring

validationApproach:
  automated:
    - npm run check
    - npm run build
    - npm run smoke:init
  manual:
    - only if smoke cannot run in the local environment
  environmentDependencies:
    - Node/npm available
    - writable OS temp directory

notRunConditions:
  - If temp directory execution is unavailable, report NOT_RUN with the environment reason and exact follow-up command.
```

## Slice 1: Add Executable Init Smoke

- Status: pending approval
- Depends on: none
- Gate class: `standard`
- risk_score: 3
- Gate reasons:
  - `package-script-change`
  - `cli-smoke-coverage`
  - `mvp-acceptance-path`

### Allowed Scope

- `package.json`
- `scripts/smoke-init.mjs` or equivalent minimal smoke script under `scripts/`

### Forbidden Scope

- No feature changes to unrelated CLI commands.
- No new runtime dependencies.
- No unrelated package script rewrites.

### Steps

1. Add a smoke script that creates an isolated temp workspace.
2. Build or use the built CLI entrypoint to run `quill init` from the temp workspace.
3. Assert the expected files and directories exist.
4. Place a sentinel in an existing generated file and run `quill init` again.
5. Assert the sentinel is preserved and skipped output is reported.
6. Add a package script, preferably `smoke:init`.

### Validation

```bash
npm run check
npm run build
npm run smoke:init
```

### Done Criteria

- Smoke script exists and is callable through package script.
- Smoke passes without an API key.
- Smoke proves clean init and repeated init idempotency.

## Slice 2: Supplement Unmet Init Requirements

- Status: pending; execute only if Slice 1 or inspection proves a concrete gap
- Depends on: Slice 1 smoke evidence
- Gate class: `standard`
- risk_score: 3
- Gate reasons:
  - `public-cli-behavior`
  - `file-generation`
  - `idempotency`

### Allowed Scope

- `src/cli.ts`
- `src/commands/init.ts`
- Smoke script assertion updates only when aligned with documented requirements

### Forbidden Scope

- No `new`, `status`, `step`, or `run` implementation changes.
- No broad CLI architecture replacement.
- No dependency additions without explicit approval.

### Steps

1. Compare smoke failures to documented #6/#7 requirements.
2. Patch only the proven CLI/init gap.
3. Re-run full validation.

### Validation

```bash
npm run check
npm run build
npm run smoke:init
```

### Done Criteria

- `quill init` satisfies documented clean-workspace and repeat-run acceptance.
- Smoke passes without API key.
- No unrelated CLI behavior is changed.

## Stop Conditions

- A fix requires changing unrelated commands.
- A fix requires dependency upgrade or CLI framework replacement.
- Docs conflict with observed requirements and need user decision.
- Smoke cannot run in local environment and no credible validation substitute exists.
