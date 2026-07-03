# Context Pack: Issues #8-#10 Article Status Landing

## Task Goal

Land GitHub issues #8-#10 by adding smoke validation and minimal documentation alignment for existing `quill new`, artifact detection, and `quill status` behavior.

## Requirement Source

- `.task/2026-07-03/land-issues-8-10-article-status/requirement.md`
- User selected option C: keep file/content detection status separate from future lifecycle/frontmatter status.

## Implementation Source

- `.task/2026-07-03/land-issues-8-10-article-status/implementation-plan.md`

## Current Phase

- phase: review
- allowedToCode: true
- current approved slice: `slice-1-add-smoke-coverage`

## Tier And Gate Policy

- Tier: M
- config/default: `balanced`
- allowTaskOverride: true
- recommended: `balanced`
- selected: `balanced`
- effective: `balanced`
- finalApprovalRequired: true

Gate policy controls Marionettist pause/continue posture only; it does not change tool permissions or dangerous-command handling.

## Loaded Rules

- `AGENTS.md`
- `.aiassistant/rules/00-repository-rules.md`
- `.aiassistant/rules/workflow-rules.md`

## Loaded Docs

- `docs/project/marionettist-workflow.md`
- `docs/project/knowledge-map.md`
- `docs/develop/10-artifact-spec.md`
- `README.md`

## Knowledge Posture

- `knowledge.mode`: `mudball`
- `knowledge.maturity`: `L1`
- Current behavior should be verified from source and smoke checks; target/future lifecycle status should not be treated as current enforcement.

## Relevant Existing Entrypoints

- CLI command registration: `src/cli.ts`
- `quill new`: `src/commands/new.ts`, `src/articles/createArticle.ts`
- article path helpers: `src/articles/articlePaths.ts`
- article resolution: `src/articles/resolveArticle.ts`
- artifact status detection: `src/artifacts/artifactStatus.ts`
- filesystem helpers: `src/utils/fs.ts`
- current smoke pattern: `scripts/smoke-init.mjs`
- scripts: `package.json`

## Allowed Modification Scope

- `scripts/` smoke validation.
- `package.json` only for a smoke script entry.
- `README.md`.
- `docs/develop/10-artifact-spec.md`.
- Existing implementation files only if smoke validation reveals a small correctness defect in allowed CLI/article/artifact behavior.

## Forbidden Modification Scope

- Marionettist runtime dependency.
- Shared-core extraction.
- Web UI, database, plugin marketplace, automatic publishing, automatic web research, or complex model routing.
- Lifecycle-status enforcement engine.
- Broad CLI command restructuring.
- Artifact frontmatter redesign.
- Private content, API keys, account configuration, or unpublished drafts.

## Current Approved Slice

Most recently approved slice after explicit user confirmation:

- `slice-2-docs-status-semantics`
- gateClass: `simple`
- risk_score: 1
- gateReasons: `docs-only`, `selected-option-C`, `minimal-alignment`

## Validation Commands

- `npm run check`
- `npm run build`
- `npm run smoke:init`
- `npm run smoke:article-status` if added, otherwise `node scripts/smoke-article-status.mjs`

## Test Strategy Handoff

- Validate CLI behavior in a temporary workspace using the built CLI.
- Cover `pending`, `missing`, `empty`, and `exists` in one smoke script.
- Confirm `quill status` and `quill new` do not require `QUILL_API_KEY`.
- For docs-only edits, manual review is acceptable; still run full validation after both slices unless blocked.

## Assumptions

- Existing implementation is the intended MVP baseline.
- The selected option C resolves the status vocabulary ambiguity.
- Small implementation fixes are allowed only if validation exposes defects.

## Risks

- Documentation could accidentally present future lifecycle status as currently enforced.
- Smoke coverage could become too brittle if it asserts unrelated formatting.
- Package script changes touch project tooling, so keep them minimal.

## Stop Conditions

- Any need to redefine artifact lifecycle semantics.
- Any need for workflow-engine or frontmatter enforcement changes.
- Any request to add model routing, automatic generation, publishing, database, or shared-core work.
- Validation failure requiring broad redesign rather than a small bounded fix.
- Coding delegation failure must be resolved before review or slice completion is accepted. Current slice-1 worktree changes are draft/unaccepted because they were applied by the orchestrator after coder retry cancellation.
