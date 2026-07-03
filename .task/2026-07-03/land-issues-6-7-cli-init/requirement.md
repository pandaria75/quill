# Requirement: Land GitHub Issues #6 and #7

## Source

- User request: inspect current implementation for GitHub issues #6 and #7, supplement unmet requirements, handle as one task, add a smoke test script or framework, and create new Marionettist task files.
- Issue #6: `[Feature] Add basic Quill CLI skeleton`.
- Issue #7: `[Feature] Implement quill init workspace scaffold`.
- Relevant docs:
  - `docs/develop/01-mvp-scope.md`
  - `docs/develop/09-cli-command-design.md`
  - `docs/develop/13-mvp-acceptance-test.md`

## Goal

Confirm and complete the MVP CLI skeleton and repeatable `quill init` workspace scaffold, with repeatable smoke validation.

## In Scope

- Verify existing CLI entrypoint and command surface for #6.
- Verify existing `quill init` behavior for #7.
- Add an executable smoke test script or equivalent lightweight framework for the init scaffold.
- Add a package script for the smoke check.
- Patch only concrete unmet #6/#7 requirements discovered by inspection or smoke validation.

## Out of Scope

- Implementing unrelated behavior for `new`, `status`, `step`, or `run`.
- Adding Marionettist as a runtime dependency.
- Shared-core extraction, database, Web UI, publishing integrations, plugin marketplace, automatic web research, or complex model routing.
- Broad CLI framework replacement or dependency upgrades unless explicitly approved.

## Acceptance Criteria

- `npm run check` passes.
- `npm run build` passes.
- A repeatable smoke command exists and passes for `quill init`.
- Smoke validation proves a clean workspace gets the expected `.quill/` and `docs/articles/` structure.
- Smoke validation proves repeated `quill init` does not overwrite existing files and reports skipped files.
- `quill init` does not require an API key.
- Any remaining non-implemented behavior is explicitly documented as out of #6/#7 scope.

## Current Baseline Evidence

- `npm run check && npm run build` passes.
- Manual smoke of `dist/cli.js init` twice in a temp workspace created the expected files and reported skipped files on the second run.
- Gap found: repository has no committed smoke test script or package command.

## Gate Policy

- recommended: `balanced`
- selected: `balanced`
- reason: bounded Tier M feature-completion task with package-script and CLI init smoke coverage; no task-local override requested.
- finalApprovalRequired: true
