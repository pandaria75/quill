# Context Pack: Organize Bilingual MVP Documentation

## Task Goal

Create/organize bilingual public MVP documentation for Quill, limited to software design docs and user usage docs.

## Requirement Source

- `.task/2026-07-06/organize-bilingual-mvp-docs/requirement.md`

## Implementation Source

- `.task/2026-07-06/organize-bilingual-mvp-docs/implementation-plan.md`

## Current Approved Slice

- `slice-1-bilingual-public-docs`

## Phase And Coding Permission

- phase: coding
- allowedToCode: true after user confirmed the analysis gate

## Loaded Rules And Docs

- `AGENTS.md`
- `marionettist.config.yaml`
- `.marionettist/tier-policy.yml`
- `docs/project/marionettist-workflow.md`
- `docs/project/knowledge-map.md`
- `README.md`
- `package.json`
- `docs/develop/01-mvp-scope.md`
- `docs/develop/03-architecture-notes.md`
- `docs/develop/04-workflow-design.md`
- `docs/develop/08-mvp-implementation-plan.md`
- `docs/develop/09-cli-command-design.md`
- `docs/develop/10-artifact-spec.md`
- `docs/develop/11-model-provider-design.md`
- `docs/develop/13-mvp-acceptance-test.md`

## Knowledge Policy

- knowledge.mode: `standard`
- knowledge.maturity: `L1`
- Keep docs compact, current-state oriented, and useful. Do not turn docs into code indexes.

## Allowed Modification Scope

- `docs/zh-CN/**`
- `docs/en/**`
- `docs/project/knowledge-map.md`
- `README.md` only for concise discoverability links if needed

## Forbidden Modification Scope

- Production source code (`src/**`)
- Scripts and package metadata unless separately approved
- Broad rewrite/delete of historical planning docs
- Marionettist workflow/config changes

## Gate Policy

- recommended: `balanced`
- selected: `balanced`
- reason: Docs-only but non-trivial public structure/routing change.
- finalApprovalRequired: true

## Test Strategy

- type: docs/manual
- required evidence:
  - docs exist in both languages
  - Chinese and English versions are semantically aligned
  - knowledge map routes to created docs
  - no source-code index content added
- allowed NOT_RUN:
  - Build/tests may be `NOT_RUN` if only Markdown docs and knowledge-map links change.

## Risks

- Existing `docs/develop` files are planning/history docs, not polished public docs.
- User asked for only two categories; avoid adding extra public categories now.
- Need avoid claiming live provider success unless `QUILL_API_KEY` flow was actually verified.

## Stop Conditions

- Analysis-to-doc-editing gate not confirmed.
- User requests deletion/reorganization of existing planning docs.
- Public docs path/language layout differs from user expectation.
