# Requirement: Land Issues #14-#15 LLM Client And Step Command

## Source Issues

- GitHub #14: `[Feature] Add OpenAI-compatible chat client`
- GitHub #15: `[Feature] Implement quill step command`

## User Decision

Use gap-fill landing rather than reimplementation. Existing #14/#15 core behavior appears present; this task should make the work verifiable, documented, and safely closeable.

## Goal

Land the existing OpenAI-compatible chat client and `quill step` command work by closing verification, smoke, and documentation gaps while preserving MVP boundaries.

## Scope

- Verify the current OpenAI-compatible client behavior around request/response handling and integration.
- Verify the current `quill step` behavior around workflow loading, input artifact loading, model generation, artifact writing, and overwrite protection.
- Add only minimal fixes needed to make existing intended behavior build/check/smoke cleanly.
- Add compact current-behavior notes to user-facing or current-state docs where useful.

## Acceptance Criteria

- `npm run build` passes.
- `npm run check` passes.
- Existing smoke commands remain passing where applicable:
  - `npm run smoke:init`
  - `npm run smoke:article-status`
- `quill step` behavior is documented at a user-facing or current-state level.
- The OpenAI-compatible client remains an internal implementation detail for now.
- No private content, API keys, or personal account configuration is committed.
- No new dependency is added unless explicitly justified and approved.

## Non-goals

- No reimplementation of the LLM client.
- No complex model routing.
- No shared workflow-core extraction.
- No Marionettist runtime dependency.
- No public API commitment for the internal LLM client.
- No broad CLI redesign.
- No web UI, database, plugin marketplace, automatic publishing, or automatic web research.

## Assumptions

- Existing code already covers the main #14/#15 behavior.
- Landing means validation, minimal fixes, compact documentation, and issue-closure evidence.
- Live provider validation may require credentials/network and must not be claimed unless actually run.

## Open Decisions

- If implementation work reveals that a new dependency, public API export, or broader model-routing decision is required, stop and ask before proceeding.
