# Land Issues #11-#13: Technical Blog Workflow Artifacts

## Requirement Source

- GitHub issue #11: `[Feature] Add fixed technical blog workflow`
- GitHub issue #12: `[Feature] Add default style profile and review checklist`
- GitHub issue #13: `[Feature] Add prompt templates for technical blog workflow`
- User confirmation on 2026-07-06: use local editable `.quill/` JSON/Markdown artifacts, load them at runtime, inject the review checklist into the review step, and do not use `src/workflows/steps/*.ts` as the primary implementation surface.

## Goal

Land the MVP technical-blog workflow artifact layer for Quill so `quill init` creates local, human-editable defaults and runtime code loads the relevant local workflow/style/prompt/checklist artifacts.

## Scope

1. Fixed technical-blog workflow JSON and loader behavior.
2. Default style profile plus review checklist artifact.
3. Step-specific prompt templates for `brief`, `sources`, `outline`, `draft`, `review`, and `final`.

## Required Behavior

- `quill init` should create editable local defaults under `.quill/`.
- Workflow definition remains a JSON artifact at `.quill/workflows/technical-blog.json`.
- Style profile remains a Markdown artifact at `.quill/styles/default.md`.
- Review checklist is generated as a local Markdown artifact and used by the `review` step.
- Prompt templates are generated as local Markdown artifacts and used when building step prompts.
- Runtime loading should preserve local-first behavior and respect user edits.
- Runtime failures for malformed workflow JSON or missing required artifacts should be actionable.

## Confirmed Design Decisions

- Use Markdown/JSON files under `.quill/` as the MVP customization surface.
- Prefer runtime loading from `.quill/` over hard-coded prompt instructions.
- Inject checklist content into the review step prompt.
- Keep `src/workflows/steps/*.ts` out of the primary implementation path unless coding reveals a narrow blocker.

## Non-goals

- No Marionettist runtime dependency.
- No shared-core extraction.
- No web UI, database, plugin marketplace, automatic publishing, automatic web research, or complex model routing.
- No dependency upgrades unless a blocker is found and explicitly approved.
- No broad workflow engine redesign.

## Acceptance Criteria

- Issue #11 can be verified from repository files and CLI behavior.
- Issue #12 can be verified from generated local artifacts and review-step behavior.
- Issue #13 can be verified from generated prompt templates and runtime prompt construction.
- MVP boundaries remain explicit.
- No private content, API keys, or personal account configuration is committed.

## Assumptions

- Existing package scripts are the validation surface: `npm run build`, `npm run check`, `npm run smoke:init`, and `npm run smoke:article-status`.
- Smoke tests should not require an external LLM key for init/status verification.

## Open Questions

- None blocking after user confirmation. If coding reveals that artifact path choice affects compatibility, stop and ask before changing the agreed local artifact layout.
