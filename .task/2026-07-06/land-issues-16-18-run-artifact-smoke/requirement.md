# Land Issues #16-#18 Requirement

## Goal

Land GitHub issues #16, #17, and #18 for Quill's P1 MVP by making the local-first technical-blog workflow usable and verifiable:

- #16: `quill run` executes the fixed technical-blog workflow in order.
- #17: Quill generates and maintains the six core Markdown artifacts: `brief.md`, `sources.md`, `outline.md`, `draft.md`, `review.md`, and `final.md`.
- #18: Add an MVP end-to-end smoke test that covers `init`, `new`, `step`, `run`, and `status` behavior without requiring private credentials by default.

## Background

Quill is an independent local-first workflow CLI for high-quality content production. The current MVP is intentionally narrow: one fixed technical blog workflow with human-editable Markdown artifacts at every stage.

Repository evidence shows these pieces already exist in partial form:

- `quill init`, `quill new`, `quill status`, and `quill step` are implemented.
- `quill run` exists and iterates workflow steps, but needs MVP-quality progress/error/summary behavior before treating #16 as landed.
- `quill new` creates all six artifacts as Markdown placeholders.
- `quill step` and `quill run` use model-backed generation through `QUILL_API_KEY`.
- Existing smoke tests are Node scripts that run the built CLI from temporary workspaces and do not require private credentials.

## In Scope

- Keep the fixed `technical-blog` workflow local-first and Markdown-first.
- Improve `quill run` user feedback enough for MVP use:
  - clear workflow/article start message;
  - per-step progress messages;
  - clear failure behavior when a step cannot run;
  - clear final completion/status summary when the workflow succeeds.
- Preserve overwrite protection for existing non-empty artifacts unless `--force` is provided.
- Preserve generation through the current model-backed `runWorkflowStep` path.
- Confirm the six artifacts remain the supported MVP artifact set.
- Add a default offline smoke test that verifies:
  - `quill init` works without `QUILL_API_KEY`;
  - `quill new` creates a local article workspace and all six artifacts;
  - `quill status` reports artifact statuses without credentials;
  - `quill step` shows a clear missing API key error when generation is required;
  - `quill run` shows a clear missing API key error when generation is required;
  - Quill does not claim successful generation without credentials.
- Add or update package scripts for the new smoke test.
- Update public docs where they still describe `quill run` as planned or omit the offline-vs-live verification boundary.

## Out Of Scope

- Marionettist runtime dependency.
- Shared-core extraction.
- Web UI, database, plugin marketplace, automatic publishing, automatic web research, or complex model routing.
- Adding a new test framework unless a later task explicitly approves it.
- Rebuilding the artifact system or replacing the current JSON workflow source.
- Deleting or repurposing `src/workflows/steps/*.ts` stubs in this task.
- Committing private content, API keys, personal account config, or real unpublished article drafts.

## Current Behavior

- `README.md` still states `quill run <article-slug>` is planned, even though a guarded command exists.
- `src/commands/run.ts` runs each workflow step in order and prints basic step messages.
- `runWorkflowStep` requires the configured API key environment variable before model generation.
- Existing smoke scripts cover init and article status but do not cover `step` or `run`.

## Required Behavior

- `quill run <article-slug>` should be an MVP-supported command for the technical-blog workflow.
- `quill run` must execute workflow steps in the configured order and stop on the first hard failure.
- On failure, prior artifacts generated before the failure must be left intact, and the command must not report workflow success.
- Without `QUILL_API_KEY`, `quill step` and `quill run` must fail clearly when generation is required.
- The default automated smoke test must be stable/offline and must not require API keys or network access.
- Live model-backed end-to-end verification should be documented as manual or environment-dependent follow-up, not required by the default smoke script.

## User Flow

Default local flow:

```bash
quill init
quill new "为什么 Agent 编程需要 Harness"
quill status <slug>
quill run <slug>
quill status <slug>
```

Offline smoke flow:

```bash
npm run build
npm run smoke:mvp
```

The offline smoke flow verifies scaffold and no-key failure behavior. Live generation still requires `QUILL_API_KEY`.

## Business Rules

- Markdown artifacts are the source of human-visible state for the MVP.
- The six supported MVP artifacts are `brief`, `sources`, `outline`, `draft`, `review`, and `final`.
- Existing non-empty artifacts are protected from overwrite unless `--force` is explicitly used.
- Generated output remains ordinary Markdown and human-editable.

## Data Rules

- Do not write private content into repository-tracked files.
- Smoke tests must use temporary workspaces and clean them up after execution.
- Smoke tests must not require secrets, network access, or real provider calls by default.

## API Contract

- No public library API is introduced in this task.
- CLI behavior remains centered on the existing command names and arguments.
- `QUILL_API_KEY` remains the default credential environment variable from local config unless user configuration changes it.

## UI Requirements

- CLI output should be concise, actionable, and suitable for smoke-script assertions.
- Missing API key errors should mention the missing environment variable and the need to set it before model-backed generation.

## Compatibility Requirements

- Continue supporting Node `>=20`.
- Keep existing smoke scripts working.
- Keep generated `.quill` workflow/prompt/template structure compatible with current `quill init` output.

## Error Handling

- `quill run` stops at the first failing step.
- Failure output should make the failed step and cause clear enough for a user to recover.
- The command must not print a successful workflow-complete message after a failure.

## Permissions And Security

- Do not log API keys.
- Do not commit credentials or private account configuration.
- Do not add external service calls to the default smoke test.

## Assumptions

- The user accepted the recommended approach: offline default smoke, MVP `run` UX enhancement, no artifact-system rewrite, keep step stubs untouched.
- Existing JSON workflow loading remains the implementation source for workflow step order.
- Existing `runWorkflowStep` remains the model-backed generation implementation.

## Risks

- Tests that assert exact output too tightly may be brittle; prefer stable key phrases.
- `quill run` cannot fully validate live generation without credentials; document this limitation clearly.
- Over-expanding this task into framework/runtime design would violate MVP boundaries.

## Acceptance Criteria

- `quill run` is documented as implemented MVP behavior rather than planned-only behavior.
- `quill run` logs per-step execution and successful completion/summary when all steps succeed.
- `quill run` fails clearly on missing API key and does not claim success.
- The six core artifacts are still created by `quill new` and recognized by `status`.
- A new default smoke script covers `init`, `new`, `status`, `step`, and `run` behavior without requiring `QUILL_API_KEY`.
- `npm run check`, `npm run build`, existing smoke scripts, and the new smoke script pass after implementation.
- MVP boundaries remain explicit in docs.

## Deferred Questions

- Whether to add a separate live-provider smoke command is deferred until credentials/CI policy is decided.
- Whether to remove or repurpose `src/workflows/steps/*.ts` stubs is deferred to a future refactor.
- Whether artifact lifecycle statuses beyond runtime detection labels are needed is deferred.

## Source Notes

- GitHub #16: `[Feature] Implement quill run workflow execution`.
- GitHub #17: `[Feature] Generate article artifacts brief/sources/outline/draft/review/final`.
- GitHub #18: `[Task] Add MVP end-to-end smoke test`.
- User confirmed recommended direction in chat on 2026-07-06.
