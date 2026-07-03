# Implementation Plan: Issues #8-#10

## Tier And Gate Policy

- Tier: M
- gatePolicy.recommended: `balanced`
- gatePolicy.selected: `balanced`
- gatePolicy.reason: bounded feature landing task; core behavior exists, remaining work is validation and docs alignment.
- gatePolicy.finalApprovalRequired: true

Coding must not start until the analysis gate is explicitly confirmed.

## Allowed Scope

- `scripts/` smoke validation for article creation and status detection.
- `package.json` only for a small smoke script entry.
- `README.md`.
- `docs/develop/10-artifact-spec.md`.
- Existing implementation files only if smoke validation exposes a small correctness defect:
  - `src/commands/new.ts`
  - `src/commands/status.ts`
  - `src/articles/createArticle.ts`
  - `src/artifacts/artifactStatus.ts`

## Forbidden Scope

- Marionettist runtime dependency.
- Shared-core extraction.
- Database, web UI, plugin, publishing, automatic web research, or model-routing work.
- Lifecycle-status enforcement engine.
- Broad CLI command restructuring.
- Frontmatter redesign.
- Private content, API keys, account configuration, or unpublished drafts.

## Test Strategy

### Selected Strategy

- Task type: feature landing / validation hardening.
- Change type: CLI smoke coverage plus docs alignment.
- Strategy summary: use a temp-workspace smoke script against the built CLI to validate article creation, artifact detection statuses, and no model/API-key requirement.

### Required Evidence

- `quill new` creates one article directory and six expected artifacts.
- `quill status` runs without `QUILL_API_KEY`.
- Status output demonstrates `pending`, `missing`, `empty`, and `exists`.
- Docs distinguish detection status from lifecycle/frontmatter status.

### Commands Or Checks

- `npm run check`
- `npm run build`
- `npm run smoke:init`
- `npm run smoke:article-status` if a package script is added, otherwise `node scripts/smoke-article-status.mjs`

## Slices

### Slice 1: Add smoke coverage for #8-#10

- id: `slice-1-add-smoke-coverage`
- gateClass: `standard`
- risk_score: 3
- gateReasons:
  - `cli-behavior-validation`
  - `package-script-touch-if-used`
  - `bounded-smoke`

#### Goal

Add credible smoke validation proving `quill new`, artifact status detection, and `quill status` behavior.

#### Likely Files Changed

- Add `scripts/smoke-article-status.mjs`.
- Optionally update `package.json` with `smoke:article-status`.

#### Modification Order

1. Create smoke script using an isolated temporary workspace.
2. Run built CLI through `dist/cli.js`.
3. Assert `quill new` creates the expected article artifacts.
4. Mutate artifact files to cover `missing`, `empty`, `pending`, and `exists`.
5. Assert `quill status` output includes expected artifact/status pairs.
6. Add package script if useful.
7. Run validation commands.

#### Done Criteria

- Smoke fails clearly on missing workspace creation, missing artifacts, model requirement leakage, or wrong status labels.
- Required validation passes or records a precise `NOT_RUN` reason.

### Slice 2: Align docs for detection vs lifecycle status

- id: `slice-2-docs-status-semantics`
- gateClass: `simple`
- risk_score: 1
- gateReasons:
  - `docs-only`
  - `selected-option-C`
  - `minimal-alignment`

#### Goal

Document the selected distinction between runtime file/content detection and future lifecycle/frontmatter status.

#### Likely Files Changed

- `README.md`
- `docs/develop/10-artifact-spec.md`

#### Modification Order

1. Update README to list exact status detection labels.
2. Update artifact spec to clarify detection status vs lifecycle/frontmatter status.
3. Avoid presenting future lifecycle statuses as currently enforced behavior.

#### Done Criteria

- Documentation aligns with option C.
- MVP boundaries remain explicit.

## Recommended Execution Order

Execute sequentially:

1. `slice-1-add-smoke-coverage`
2. `slice-2-docs-status-semantics`

Parallel execution is not recommended because both slices rely on the exact status vocabulary.
