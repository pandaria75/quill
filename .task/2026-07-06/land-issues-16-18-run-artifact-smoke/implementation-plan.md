# Land Issues #16-#18 Implementation Plan

## Requirement Source

- `.task/2026-07-06/land-issues-16-18-run-artifact-smoke/requirement.md`
- GitHub issues #16, #17, #18.
- User confirmation of recommended approach: offline default smoke, MVP `run` UX enhancement, no artifact-system rewrite, keep workflow step stubs untouched.

## Scope Summary

Land the MVP technical-blog workflow by tightening `quill run`, proving/maintaining six-artifact behavior, adding an offline smoke test for `init/new/status/step/run`, and updating docs to reflect implemented behavior and live-provider limits.

## Involved Modules Or Areas

- CLI command handlers: `src/commands/run.ts`, optionally `src/commands/status.ts` if shared formatting is needed.
- Workflow execution: `src/workflows/runWorkflow.ts`, `src/workflows/loadWorkflow.ts` as context only unless a small error-message fix is needed.
- Artifact metadata/status: `src/articles/articlePaths.ts`, `src/artifacts/artifactStatus.ts` as context only unless a small test-discovered fix is needed.
- Smoke scripts: `scripts/*.mjs`, `package.json` scripts.
- Docs: `README.md`, `docs/develop/13-mvp-acceptance-test.md`.

## Loaded Rules

- `AGENTS.md`: Marionettist gates, local-first task artifacts, no coding before analysis gate confirmation, docs/rules sync expectations.
- `.aiassistant/rules/*.md`: no rule files found.

## Loaded Docs

- `docs/project/marionettist-workflow.md`: task state, gates, Tier/gate semantics.
- `docs/project/knowledge-map.md`: project workflow routing and docs/rules boundaries.
- `docs/develop/13-mvp-acceptance-test.md`: MVP acceptance and no-API-key behavior.

## Global Forbidden Scope

- Do not add Marionettist runtime dependency.
- Do not create shared-core/platform/plugin architecture.
- Do not add web UI, database, automatic publishing, automatic web research, or complex model routing.
- Do not introduce a new test framework for this task.
- Do not commit API keys, private content, or personal account configuration.
- Do not delete or repurpose `src/workflows/steps/*.ts` stubs in this task.

## Execution Strategy

- Complexity: simple-to-standard
- Default Execution: sequential
- Parallel Execution: not-needed
- Fallback Execution: sequential
- Merge Owner: primary agent
- Conflict Resolution Rule: keep scope to MVP command/test/docs surfaces; if implementation requires broader architecture changes, stop and ask.

## Slice Dependency Graph

| Slice | Depends On | Can Run In Parallel With | Fallback Order | Shared Files | Merge Owner | Conflict Risk |
| --- | --- | --- | --- | --- | --- | --- |
| slice-1-run-mvp-ux | none | none | 1 | `src/commands/run.ts` | primary agent | low |
| slice-2-offline-mvp-smoke | slice-1-run-mvp-ux | none | 2 | `scripts/`, `package.json` | primary agent | medium |
| slice-3-docs-and-final-evidence | slice-1, slice-2 | none | 3 | `README.md`, `docs/develop/13-mvp-acceptance-test.md` | primary agent | low |

## Implementation Slices

### Slice 1: Run Command MVP UX

#### Goal

Make `quill run <article-slug>` feel like an MVP-supported workflow command by improving progress, failure clarity, and success summary while preserving the current model-backed execution path.

#### Allowed Modification Scope

- `src/commands/run.ts`
- Optional small helper extraction only if it keeps behavior local and simple.

#### Forbidden Scope

- No new workflow engine.
- No Marionettist dependency.
- No model provider redesign.
- No artifact-system rewrite.
- No deletion of workflow step stubs.

#### Execution

- Mode: sequential
- Depends On: none
- Can Run With: none
- Must Not Run With: slice-2 if shared output assertions depend on final CLI strings
- Fallback Order: 1
- Shared Files: `src/commands/run.ts`
- Merge Owner: primary agent
- Conflict Risk: low
- Gate Class: standard
- Risk Score: 2
- Gate Reasons: `cli-workflow`, `bounded-command-ux`, `no-architecture-change`
- Validation Level: slice
- Recommended Agent Strategy: bounded edit plus build/check; no broad refactor.

#### Steps

1. Inspect current `runCommand` behavior.
2. Add concise per-step progress that includes step index/name and target artifact when available.
3. Track generated/skipped counts for a final summary.
4. Ensure failure stops before workflow-complete output and wraps/propagates a clear failed-step message without hiding the original missing-key error.
5. Avoid changing `runWorkflowStep` unless needed for error clarity.

#### Validation

- `npm run check`
- `npm run build`
- Manual no-key command after build in a temp workspace if needed: `quill init && quill new <topic> && quill run <slug>` should fail clearly before success summary.

#### Done Criteria

- Successful run path has clearer progress and final summary.
- Missing API key path names the failed step and missing env var.
- No success message appears on failure.

#### Rollback Notes

- Revert `src/commands/run.ts` to previous simple loop if regressions appear.

### Slice 2: Offline MVP Smoke Test

#### Goal

Add a stable smoke script that covers `init`, `new`, `status`, `step`, and `run` behavior without requiring API keys or network access.

#### Allowed Modification Scope

- `scripts/smoke-mvp.mjs` or similarly named new smoke script.
- `package.json` scripts.
- Existing smoke scripts only if a small shared pattern fix is necessary.

#### Forbidden Scope

- No test framework addition.
- No real API calls.
- No committed secrets or persistent generated article content.

#### Execution

- Mode: sequential
- Depends On: slice-1-run-mvp-ux
- Can Run With: none
- Must Not Run With: none
- Fallback Order: 2
- Shared Files: `package.json`
- Merge Owner: primary agent
- Conflict Risk: medium
- Gate Class: standard
- Risk Score: 3
- Gate Reasons: `smoke-test`, `cli-output-contract`, `offline-credential-boundary`
- Validation Level: slice
- Recommended Agent Strategy: follow existing `scripts/smoke-*.mjs` style; assert stable behavior and key phrases, not brittle full output.

#### Steps

1. Create a temp workspace and run built `dist/cli.js`.
2. Delete `QUILL_API_KEY` from child process environment.
3. Run `init`, `new`, and `status` success paths.
4. Assert all six artifact files exist and status does not require API key.
5. Run `step <slug> brief` expecting non-zero exit and a clear missing-key message.
6. Run `run <slug>` expecting non-zero exit and a clear missing-key message plus no workflow success claim.
7. Add `npm run smoke:mvp`.

#### Validation

- `npm run build`
- `npm run smoke:mvp`
- Existing smoke scripts remain runnable:
  - `npm run smoke:init`
  - `npm run smoke:article-status`

#### Done Criteria

- New smoke passes without credentials.
- New smoke covers all required commands.
- Package script is documented by name in final evidence.

#### Rollback Notes

- Remove the new smoke script and package script if it proves too brittle, then fall back to documented manual checks.

### Slice 3: Docs And Final Evidence

#### Goal

Update public docs and acceptance documentation to match implemented MVP behavior and record validation evidence for issue closure.

#### Allowed Modification Scope

- `README.md`
- `docs/develop/13-mvp-acceptance-test.md`
- Task-local final evidence in `.task/2026-07-06/land-issues-16-18-run-artifact-smoke/` if needed.

#### Forbidden Scope

- Do not add broad future-platform docs.
- Do not claim live generation is verified by offline smoke.
- Do not document private provider/account setup beyond the existing `QUILL_API_KEY` boundary.

#### Execution

- Mode: sequential
- Depends On: slice-1-run-mvp-ux, slice-2-offline-mvp-smoke
- Can Run With: none
- Must Not Run With: none
- Fallback Order: 3
- Shared Files: docs only
- Merge Owner: primary agent
- Conflict Risk: low
- Gate Class: simple
- Risk Score: 2
- Gate Reasons: `docs-sync`, `issue-evidence`
- Validation Level: final
- Recommended Agent Strategy: update only stale or missing MVP text.

#### Steps

1. Update `README.md` so `quill run` is no longer described as planned-only.
2. Clarify offline smoke vs live model-backed end-to-end verification.
3. Update `docs/develop/13-mvp-acceptance-test.md` with the new smoke command and no-key behavior.
4. Record final validation evidence in the response or task state.

#### Validation

- `npm run check`
- `npm run build`
- `npm run smoke:init`
- `npm run smoke:article-status`
- `npm run smoke:mvp`

#### Done Criteria

- Docs match actual CLI behavior.
- Final evidence is enough to close #16, #17, and #18.

#### Rollback Notes

- Revert docs updates if they overclaim behavior not implemented.

## Parallel Slice Groups

Not used. Slices are sequential because the smoke test depends on stable `run` CLI output and final docs depend on implementation evidence.

## Final Validation

- `npm run check`
- `npm run build`
- `npm run smoke:init`
- `npm run smoke:article-status`
- `npm run smoke:mvp`
- Optional manual live-provider check when credentials are available: `QUILL_API_KEY=... quill run <slug>` in a temp/local workspace.

## Documentation Update Requirement

- Required for README and acceptance docs because current public docs still describe `quill run` as planned-only and do not name the new smoke script.
- `docs/project/knowledge-map.md` does not need an update unless new docs are added or docs are moved/renamed.

## Test Strategy

### Selected Strategy

- Task type: feature / task validation for CLI workflow.
- Change type: bounded CLI behavior, artifact verification, smoke coverage.
- Strategy summary: use existing build/check plus procedural smoke scripts; keep default smoke offline and credential-free; document live provider verification as environment-dependent manual evidence.

### Required Evidence

- Reproduction or baseline evidence: existing `run` and smoke scripts inspected; no-key acceptance behavior documented.
- Behavior that must be protected: local scaffold commands work without credentials, model-backed commands fail clearly without credentials, no false success on missing API key.
- Risk-sensitive areas: CLI output contract, temporary workspace cleanup, private credential boundary.

### Validation Approach

- Automated tests: TypeScript check/build and Node smoke scripts.
- Smoke checks: existing `smoke:init`, existing `smoke:article-status`, new `smoke:mvp`.
- Manual checks: optional live-provider e2e with `QUILL_API_KEY`.
- Environment dependencies: live generation requires credentials/network and is not part of default automated smoke.

### NOT_RUN Conditions

- Check: live LLM end-to-end generation.
- Reason: requires private `QUILL_API_KEY`, network, and may incur provider cost.
- Required follow-up: run manually only when credentials are intentionally available.

## Risks

- Output assertions may become brittle if they match whole stdout/stderr; assertions should use stable fragments.
- Full generation success cannot be proven offline; avoid claiming it from smoke alone.
- Adding `run` behavior beyond UX/error clarity could accidentally broaden scope.
