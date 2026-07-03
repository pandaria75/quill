# Requirement: Land GitHub Issues #8-#10

## Source

- GitHub issue #8: `[Feature] Implement article workspace creation with quill new`
- GitHub issue #9: `[Feature] Implement artifact status detection`
- GitHub issue #10: `[Feature] Implement quill status command`
- User confirmation: choose option C, preserving file/content detection status separately from future lifecycle/frontmatter status.

## Goal

Land the existing Quill MVP article workspace and artifact-status CLI behavior with credible validation and minimal documentation alignment.

## Current Understanding

The repository already contains the core implementation for:

- `quill new <topic>` creating article workspaces and Markdown artifacts.
- Artifact file/content detection using `missing`, `empty`, `pending`, and `exists`.
- `quill status <article-slug>` displaying artifact status without requiring model access.

The remaining work is to prove the behavior with smoke validation and clarify documentation so detection status is not confused with future lifecycle/frontmatter status.

## In Scope

- Add a smoke check for #8, #9, and #10.
- Verify `quill new` creates the expected article directory and six artifacts.
- Verify `quill status` can show `missing`, `empty`, `pending`, and `exists`.
- Verify status/new behavior does not require `QUILL_API_KEY`.
- Add minimal documentation explaining the distinction between:
  - detection status: `missing`, `empty`, `pending`, `exists`
  - lifecycle/frontmatter status: `created`, `generated`, `edited`, `reviewed`, `final`

## Out of Scope

- Marionettist runtime dependency.
- Shared-core extraction.
- Web UI, database, plugin marketplace, automatic publishing, automatic web research, or complex model routing.
- Lifecycle-status enforcement engine.
- Broad CLI command restructuring.
- Redesign of artifact frontmatter.
- Private content, API keys, account configuration, or unpublished drafts.

## Acceptance Criteria

- Smoke validation covers the user-visible behavior for #8-#10.
- Documentation explicitly distinguishes detection status from future lifecycle/frontmatter status.
- Existing MVP boundaries remain explicit.
- `npm run check`, `npm run build`, existing smoke validation, and the new smoke validation pass unless an environment limitation is recorded.

## Assumptions

- The current code behavior is the intended MVP baseline unless validation reveals a small correctness defect.
- Any implementation fix must stay bounded to existing CLI/article/artifact files and must not redesign the workflow.

## Open Questions

- None blocking after user selected option C.
