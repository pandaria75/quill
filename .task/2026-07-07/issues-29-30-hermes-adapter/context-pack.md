# Task Context Pack

## Task Goal

Land issues #29 and #30 safely by preserving Quill Core neutrality while implementing the issue #30 Hermes MVP adapter in strict, bounded sub-slices. Current approved work is S4e only: add minimal smoke documentation/example handoff and capture final validation evidence for the Hermes MVP adapter.

## Knowledge Posture

- Mode: standard
- Maturity: L1

## Current Slice Or Group

- Current Slice: S4e — Smoke Example, MVP Documentation, And Final Validation Handoff
- Status: S4e implementation approved by user after S4d completion; this is the final planned MVP slice, but final approval remains required.
- gateClass: standard
- risk_score: 3
- gateReasons: smoke-validation, user-facing-docs, final-handoff
- Completed Prior Work: S1 design update, S2 spike planning, S3 runtime spike, S4a scaffold, S4b workflow runner, S4c artifact/state handling, and S4d review gate commands are complete and reviewed.

## Gate Policy

- gatePolicy.recommended: strict
- gatePolicy.selected: strict
- gatePolicy.reason: Hermes adapter work is cross-boundary and implementation-sensitive; issue #30 depends on verified Hermes plugin, memory, model, artifact, and human-gate behavior.
- gatePolicy.finalApprovalRequired: true
- Controlling Posture: `selected` controls task continuation. `recommended` is advisory only.
- Current Gate: S4d completed and the user confirmed S4e implementation. Strict policy and finalApprovalRequired still require final approval after S4e review/critic.

## Requirement Source

- `.task/2026-07-07/issues-29-30-hermes-adapter/requirement.md`
- GitHub issues #29 and #30
- User-provided Hermes docs source: <https://hermes-agent.nousresearch.com/>

## Implementation Source

- `.task/2026-07-07/issues-29-30-hermes-adapter/implementation-plan.md`

## Involved Modules Or Areas

- Target adapter design docs
- Quill Core target architecture and package surface
- Technical-blog workflow assets and writing skill contracts
- External Hermes plugin/runtime/memory/model/gate concepts
- Planned future adapter location: `adapters/hermes/**`

## Loaded Context

### Global Rules

- `AGENTS.md`: Marionettist task flow, Tier policy usage, analysis gate, implementation and review policy.
- `docs/project/marionettist-workflow.md`: gate policy, Tier L critic gates, analysis/coding/review boundaries, context-pack contract.
- `.marionettist/tier-policy.yml`: project-local Tier guidance; selected Tier L for boundary-sensitive external-runtime integration.

### Loaded Docs And Artifacts

- `docs/project/knowledge-map.md`
- `docs/target/hermes-adapter-design.md`
- `docs/target/quill-core-architecture.md`
- `packages/core/README.md`
- `spikes/hermes-runtime-verification/**` bounded S3 evidence files

### Path-Proximity Rules

- No nearby `MODULE_RULES.md`, `AGENTS.md`, or `HARNESS_RULES.md` were found for the original target docs/core paths during initial routing.
- Future coding under `adapters/hermes/**` should check again for nearby rules before implementation.

## Execution Mode

- Mode: sequential
- Current Slice Or Group: S4e only
- Future Planned Sub-slices: S4a scaffold, S4b workflow runner, S4c artifact/state handling, S4d review gate commands, S4e smoke/docs/final validation.
- Parallel Members: none
- Fallback Order: S1, S2, S3, S4 planning, then future S4a-S4e only after required gates.
- Shared Files: `adapters/hermes/README.md`, optional `adapters/hermes/examples/technical-blog/**`, bounded `docs/project/knowledge-map.md` routing update if needed, possible adapter metadata text update, plus task artifacts for final validation evidence/status only.
- Merge Owner: primary orchestrator
- Conflict Resolution Rule: preserve Quill Core neutrality, keep Hermes-specific code separate, and stop before unapproved Core/current CLI/dependency changes.
- Validation Level: final slice handoff

## S3 Evidence Summary

- Hermes runtime/package/source availability: local Hermes CLI available and S3 completed without dependency install or global-config mutation.
- Plugin loading: project plugin loaded from `spikes/hermes-runtime-verification/.hermes/plugins/quill-runtime-spike` with isolated `HERMES_HOME` and `HERMES_ENABLE_PROJECT_PLUGINS=1`.
- Command path: Hermes invoked the spike CLI command successfully.
- Core assets: programmatic import of `@pandaria/quill/core` worked from the plugin path.
- Quill-aligned step: the `sources` step ran and wrote `sources.md`.
- Review gate: adapter-local pending-review state required `continue`, `revise`, or `abort` before later steps.
- Memory/model: memory disabled; model strategy remained single Hermes-configured session.

## Planned Adapter Location

- Future MVP code location proposed by S4 plan: `adapters/hermes/**`.
- Rationale: separates Hermes adapter code from Quill Core (`packages/core/**`) and current CLI (`src/**`), avoids silent packaging/dependency changes, and follows S3 evidence that bounded project-plugin loading can work without global Hermes state mutation.
- If this location is rejected or requires root package publication changes before coding, stop for user decision.

## Allowed Modification Scope

For S4e:

- `adapters/hermes/README.md`
- `adapters/hermes/examples/technical-blog/**` if a bounded example workspace helps reproduce the smoke path without secrets.
- `docs/project/knowledge-map.md` only for a bounded routing update required by the adapter README/docs presence.
- `docs/target/hermes-adapter-design.md` only if implementation discovered material design evidence that must be captured.
- Bounded adapter metadata text update only to fix stale command description discovered in prior slices.
- `.task/2026-07-07/issues-29-30-hermes-adapter/context-pack.md` and `state.json` only for S4e final validation evidence/status updates.

## Forbidden Modification Scope

- No `packages/core/**` changes unless implementation stops for explicit approval.
- No `src/**` current CLI changes.
- No dependency additions, package-lock changes, root package publication changes, or model/provider config.
- No generic multi-workflow engine.
- No automatic web research.
- No per-step model routing; use one Hermes-configured model/session.
- No memory integration or persistence.
- No broad docs rewrite; `knowledge-map.md` changes are limited to bounded routing for adapter docs if needed.
- No package publishing, dependency, lockfile, Core, or current CLI changes.
- No memory persistence; document memory as disabled-by-default/policy-only.
- No per-step model routing; document as deferred.
- No claim of unsupported Hermes native workflow gate semantics.

## S4e Implementation Steps

1. Document installation/loading assumptions using isolated `HERMES_HOME` and project-plugin loading from S3/S4 evidence.
2. Document commands for `start`, `resume`, `continue`, `revise`, and `abort`, plus expected artifacts/state.
3. Document limitations: one workflow, single Hermes-configured model/session, memory disabled, no automatic research, and `continue` currently does not propagate original `topic`/`notes`.
4. Add or refresh a minimal example workspace only if it helps reproduce the smoke path without secrets.
5. Update stale adapter command description metadata if possible within bounded text/metadata scope.
6. Capture final validation evidence in task artifacts.

## S4e Validation Commands

- End-to-end Hermes smoke when runtime is available: plugin help/load, start run, artifact creation, pending review block, and `continue`/`revise`/`abort` behavior.
- Manual checks: README matches implemented behavior/limitations; no Core/current CLI/dependency/lockfile changes; memory disabled and per-step routing deferred.
- `npm run check`: run only if existing TypeScript/source files changed; expected `NOT_RUN` if implementation remains under Python/Hermes adapter docs/examples/task artifacts only.

## S4e Execution Evidence

| Evidence Point | Command Or Action | Observed Result | Pass/Fail/NOT_RUN | Notes |
| --- | --- | --- | --- | --- |
| Python syntax | From `adapters/hermes`: `python3 -m py_compile "__init__.py" "quill_hermes/__init__.py" "quill_hermes/cli.py" "quill_hermes/core_assets.py" "quill_hermes/workflow.py" "quill_hermes/artifacts.py" "quill_hermes/gates.py" ".hermes/plugins/quill-hermes/__init__.py"` | Python files compiled successfully. | PASS | No behavior change outside the adapter. |
| Hermes help/load | With isolated `HERMES_HOME="/tmp/opencode/hermes-home-s4e"` and `HERMES_ENABLE_PROJECT_PLUGINS=1`: `hermes quill-hermes --help` | Hermes displayed the bounded MVP command help with `start`, `resume`, `continue`, `revise`, and `abort`. | PASS | Confirms updated metadata/help text. |
| Start smoke | `hermes quill-hermes start --workspace "/tmp/opencode/hermes-smoke-s4e" --topic "Hermes MVP smoke" --notes "Use bounded adapter-local smoke inputs only"` | Wrote `brief.md`; reported memory disabled and `single-hermes-session`. | PASS | Smoke workspace copied from `examples/technical-blog/workspace` seed into `/tmp/opencode`. |
| Resume and review block | `resume`, then plain `resume` again | First resume wrote `sources.md`; second resume returned `BLOCKED: pending review is active for 'sources'; use continue, revise, or abort before resuming`. | PASS | Confirms documented pending-review behavior. |
| Continue | `hermes quill-hermes continue --workspace "/tmp/opencode/hermes-smoke-s4e"` | Wrote `outline.md` and stopped again for review at `outline`. | PASS | Also confirms the documented S4d limitation path where prior `topic`/`notes` are not propagated into later rendered steps. |
| Revise | `hermes quill-hermes revise --workspace "/tmp/opencode/hermes-smoke-s4e"` | Review remained blocked for `outline`; artifact preserved. | PASS | Matches README guidance. |
| Abort | `hermes quill-hermes abort --workspace "/tmp/opencode/hermes-smoke-s4e"` | Adapter-local review state marked aborted; artifacts preserved. | PASS | Matches README guidance. |
| README/manual scope check | Compared README, example seed, and metadata text with implemented CLI/state behavior | Docs match the bounded MVP: `technical-blog` only, single Hermes session, memory disabled, no automatic research, no per-step model routing, no native Hermes gate claims. | PASS | Includes explicit note about `continue` not propagating original `topic`/`notes`. |
| npm run check | Not run | `packages/` and `src/` were not changed and are forbidden for S4e. | NOT_RUN | Per slice test strategy. |

## S4e Handoff Notes

- Final reviewer should use `adapters/hermes/README.md` and the example seed under `adapters/hermes/examples/technical-blog/` for smoke reproduction.
- The smoke path was validated with an isolated Hermes home and a copied temp workspace under `/tmp/opencode`, not by generating artifacts into the repository example seed.
- Remaining non-blocking hardening ideas from S4d stay deferred: state-only `revise`/`abort` repo-root lookup cleanup, `ProgressState.to_dict()` side-effect split, and stricter `PendingReviewState.from_dict` validation.

## S4d Implementation Steps

1. Add CLI subcommands or command arguments for `continue`, `revise`, and `abort` using S3-verified command registration patterns.
2. Require an existing pending-review state before resume actions.
3. On `continue`, advance only to the next allowed step and stop again at the next review checkpoint as defined by Quill assets.
4. On `revise`, keep the run blocked and surface instructions for user edits or bounded rerun behavior.
5. On `abort`, mark adapter-local state aborted without deleting artifacts.
6. Ensure no path auto-runs through all review checkpoints without explicit actions.
7. Re-validate loaded pending-review `artifact_path` against the current workspace before acting on it.
8. Handle or document `current_step: null` after workflow completion if state-reading logic assumes a step name.

## S4d Validation Commands

- Smoke checks in isolated workspace: pending review blocks automatic continuation; `continue` requires pending-review state and advances only one allowed segment; `revise` preserves blocked state/instructions; `abort` marks state aborted.
- Manual check: gate protocol is adapter-local and does not claim native Hermes workflow-gate semantics.
- `npm run check`: `NOT_RUN` unless existing TypeScript/source files change; such changes are not planned.

## S4d Execution Evidence

| Evidence Point | Command Or Action | Observed Result | Pass/Fail/NOT_RUN | Notes |
| --- | --- | --- | --- | --- |
| Python syntax | From `adapters/hermes`: `python3 -m py_compile "__init__.py" "quill_hermes/__init__.py" "quill_hermes/cli.py" "quill_hermes/core_assets.py" "quill_hermes/workflow.py" "quill_hermes/artifacts.py" "quill_hermes/gates.py" ".hermes/plugins/quill-hermes/__init__.py"` | Python files compiled successfully. | PASS | Includes S4d updates to `cli.py`, `workflow.py`, `gates.py`, and `artifacts.py`. |
| Pending review blocks resume | In isolated `/tmp/opencode/hermes-workspace-s4d`: `start`, `resume`, then plain `resume` | Third command returned `BLOCKED: pending review is active for 'sources'; use continue, revise, or abort before resuming`. | PASS | Confirms no automatic continuation past review checkpoint. |
| `continue` advances one segment only | Same workspace: `hermes quill-hermes continue --workspace ...` followed by plain `resume` | `continue` wrote `outline.md` and reported `review approved for 'sources'; advanced through outline and stopped again for review at 'outline'`; following `resume` returned pending-review `BLOCKED`. | PASS | Confirms explicit action advances one allowed segment and stops at next checkpoint. |
| `revise` preserves blocked state | Isolated `/tmp/opencode/hermes-workspace-s4d-revise`: `start`, `resume`, then `revise` | `revise` returned instructions to edit `sources.md` and kept review blocked. | PASS | No artifact deletion; no memory/provider writes. |
| `abort` marks aborted without deleting artifacts | Isolated `/tmp/opencode/hermes-workspace-s4d-abort`: `start`, `resume`, then `abort` | `abort` reported adapter-local state marked aborted and artifacts preserved. | PASS | Matches S4d requirement. |
| `continue` requires pending state | Empty isolated `/tmp/opencode/hermes-workspace-s4d-no-pending`: `continue` | Returned `BLOCKED: continue requires an active pending-review state in the workspace`. | PASS | Confirms review actions require pending-review state. |
| npm run check | Not run | S4d changed only adapter Python files and task context; `packages/` and `src/` remain forbidden and unchanged for this slice. | NOT_RUN | Per S4d validation strategy. |

## S4d Review Follow-up Requirements

- S4e README/smoke docs must document that `topic` and `notes` are not currently propagated through `continue`; optionally address this in a later hardening slice by persisting topic/notes in adapter-local state.
- S4e or a later cleanup should consider deferring Quill repo-root lookup/Core asset loading to `continue` only, so `revise` and `abort` remain state-only outside the repository structure.
- The S4a `quill_hermes/__init__.py` command description still says workflow execution is future work; update no later than S4e.
- Consider splitting `ProgressState.to_dict()` path creation side effects if future tests need pure serialization.
- Consider stricter `PendingReviewState.from_dict` handling for manually corrupted `None` fields in a future cleanup pass.

## S4c Implementation Steps

1. Define adapter-local state directory, e.g. workspace-relative `.quill-hermes/`.
2. Implement artifact path resolution for `brief.md`, `sources.md`, `outline.md`, `draft.md`, `review.md`, and `final.md`.
3. Implement progress state with current step, last completed step, pending review metadata, and memory/model policy flags.
4. Validate paths remain inside the workspace before any artifact/state write.
5. Keep state human-inspectable JSON and artifacts Markdown.
6. If `gates.py` is touched in S4c, limit it to shared data structures such as the pending-review JSON schema; command dispatch and state-transition logic belong to S4d.

## S4c Validation Commands

- Hermes smoke in an isolated workspace: verify artifacts and state are written only under that workspace.
- Manual check: no memory writes, no raw secrets/provider config, and no opaque storage.
- `npm run check`: `NOT_RUN` unless existing TypeScript/source files change; such changes are not planned.

## S4c Execution Evidence

| Evidence Point | Command Or Action | Observed Result | Pass/Fail/NOT_RUN | Notes |
| --- | --- | --- | --- | --- |
| Python syntax | From `adapters/hermes`: `python3 -m py_compile "__init__.py" "quill_hermes/__init__.py" "quill_hermes/cli.py" "quill_hermes/core_assets.py" "quill_hermes/workflow.py" "quill_hermes/artifacts.py" "quill_hermes/gates.py" ".hermes/plugins/quill-hermes/__init__.py"` | Python files compiled successfully. | PASS | Includes new S4c `artifacts.py` and `gates.py`. |
| Hermes CLI start path | From `adapters/hermes` with isolated `HERMES_HOME="/tmp/opencode/hermes-home-s4c"` and `HERMES_ENABLE_PROJECT_PLUGINS=1`: `hermes quill-hermes start --workspace "/tmp/opencode/hermes-workspace-s4c" --topic "S4c smoke topic" --notes "bounded notes"` | Ran `brief`, wrote `/tmp/opencode/hermes-workspace-s4c/brief.md`, reported memory disabled and single-session model strategy. | PASS | Confirms plugin CLI still exposes the command with the known S4a/S4b invocation pattern. |
| Hermes CLI resume path and state | Same environment: `hermes quill-hermes resume --workspace "/tmp/opencode/hermes-workspace-s4c"` | Ran `sources`, wrote `/tmp/opencode/hermes-workspace-s4c/sources.md`, wrote `.quill-hermes/progress.json` and `.quill-hermes/pending-review.json`. | PASS | `progress.json` records `current_step: sources`, `last_completed_step: sources`, memory disabled, no provider data persisted, and `model_strategy: single-hermes-session`. |
| Pending-review block | Same environment: a second `resume` after `sources` | Command returned `BLOCKED: pending review is active for 'sources'; explicit review commands remain future S4d work`. | PASS | Expected S4c behavior: state can block a run without implementing S4d commands. |
| State locality/manual check | Read `/tmp/opencode/hermes-workspace-s4c/.quill-hermes/progress.json` and `pending-review.json` | State files are human-inspectable JSON under `.quill-hermes/`; artifact paths point to the isolated workspace; policy flags show memory/provider persistence disabled. | PASS | S4d must still re-validate loaded pending-review artifact paths before acting on them. |
| npm run check | Not run | S4c changed only adapter Python files and task context; `packages/` and `src/` remain forbidden and unchanged for this slice. | NOT_RUN | Per S4c validation strategy. |

## S4c Review Follow-up Requirements

- S4d must re-validate `pending-review.json` `artifact_path` against the current workspace boundary before acting on it.
- S4d should document or guard `current_step: null` after workflow completion if future state-reading logic assumes a step name.
- If future tests need pure serialization, consider splitting `ProgressState.to_dict()` from path creation side effects.
- The S4a `quill_hermes/__init__.py` command description still says workflow execution is future work; update no later than S4e.

## S4b Implementation Steps

1. Load `@pandaria/quill/core` assets through an adapter-local bridge, preserving the S3 programmatic import approach where safe.
2. Map only the technical-blog workflow and known artifact names.
3. Implement sequential step planning/progression without generic branching or workflow registration.
4. Keep generated content/template handling adapter-local and file-based.
5. Emit clear blocked errors for missing inputs, failed Core asset load, or unsupported workflow names.

## S4b Validation Commands

- Hermes smoke: start a technical-blog run in an isolated workspace and verify at least the first step can execute through the runner.
- Manual check: runner references only `technical-blog` and does not introduce generic engine behavior.
- `npm run check`: `NOT_RUN` unless existing TypeScript/source files change; if Core changes appear necessary, stop before making them.

## S4b Execution Evidence

| Evidence Point | Command Or Action | Observed Result | Pass/Fail/NOT_RUN | Notes |
| --- | --- | --- | --- | --- |
| Python syntax | From `adapters/hermes`: `python3 -m py_compile "__init__.py" "quill_hermes/__init__.py" "quill_hermes/cli.py" "quill_hermes/core_assets.py" "quill_hermes/workflow.py" ".hermes/plugins/quill-hermes/__init__.py"` | Python files compiled successfully. | PASS | Includes S4b `core_assets.py` and `workflow.py`. |
| Hermes first runner path | From `adapters/hermes`: `HERMES_HOME="/tmp/opencode/hermes-home-s4b" HERMES_ENABLE_PROJECT_PLUGINS=1 hermes quill-hermes start --workspace "/tmp/opencode/hermes-workspace-s4b" --topic "S4b smoke topic" --notes "bounded notes"` | Hermes executed `technical-blog` start path, ran `brief`, and wrote `/tmp/opencode/hermes-workspace-s4b/brief.md`. | PASS | Used isolated temp Hermes home; memory disabled; model strategy single Hermes session. |
| Core public export bridge | Same `start` command | Loaded public exports: `technicalBlogWorkflowDefinition`, `quillInitTemplates`, `quillInitPrompts`, `quillInitStyleProfiles`, `technicalBlogWritingSkillOrder`, `technicalBlogWritingSkillContracts`. | PASS | Bridge now validates presence and basic shape of these public exports before JSON handoff. |
| npm run check | Not run | S4b changed only adapter Python files and task context; `packages/` and `src/` remain forbidden and unchanged for this slice. | NOT_RUN | Per S4b validation strategy. |

## S4b Review Repair Evidence

| Evidence Point | Command Or Action | Observed Result | Pass/Fail/NOT_RUN | Notes |
| --- | --- | --- | --- | --- |
| Clean blocked states for Core text assets | Updated `workflow.py` to route missing template, prompt, or default style profile through `WorkflowBlockedError` instead of raw `KeyError`. | Missing text assets now produce adapter-local `BLOCKED:` messages. | PASS | Addresses S4b reviewer F1. |
| Python syntax after review repair | From `adapters/hermes`: `python3 -m py_compile "__init__.py" "quill_hermes/__init__.py" "quill_hermes/cli.py" "quill_hermes/core_assets.py" "quill_hermes/workflow.py" ".hermes/plugins/quill-hermes/__init__.py"` | Python files compiled successfully. | PASS | Re-run after F1 repair. |
| Hermes first runner path after review repair | From `adapters/hermes`: `HERMES_HOME="/tmp/opencode/hermes-home-s4b" HERMES_ENABLE_PROJECT_PLUGINS=1 hermes quill-hermes start --workspace "/tmp/opencode/hermes-workspace-s4b" --topic "S4b smoke topic" --notes "bounded notes"` | Hermes executed `technical-blog` start path, ran `brief`, and wrote `/tmp/opencode/hermes-workspace-s4b/brief.md`. | PASS | Re-run after F1 repair. |

## S4a Completed Evidence

| Evidence Point | Command Or Action | Observed Result | Pass/Fail/NOT_RUN | Notes |
| --- | --- | --- | --- | --- |
| Python syntax | From `adapters/hermes`: `python3 -m py_compile "__init__.py" "quill_hermes/__init__.py" "quill_hermes/cli.py" ".hermes/plugins/quill-hermes/__init__.py"` | Python files compiled successfully. | PASS | Generated `__pycache__` is ignored by `adapters/hermes/.gitignore`. |
| Hermes plugin load/help | From `adapters/hermes`: `HERMES_HOME="/tmp/opencode/hermes-home-s4a" HERMES_ENABLE_PROJECT_PLUGINS=1 hermes quill-hermes --help` | Hermes displayed `usage: hermes quill-hermes [-h] [--version]` and scaffold description. | PASS | Used isolated temp Hermes home and committed `.hermes/plugins/quill-hermes` wrapper. |
| npm run check | Not run | S4a changed only `adapters/hermes/**` Python/Markdown/YAML scaffold files; `packages/` and `src/` remain forbidden and unchanged for this slice. | NOT_RUN | Per S4a validation strategy. |

## S4b Done Criteria

- Adapter runner can progress through the intended technical-blog step sequence in principle, with clear blocked states.
- Core asset loading remains adapter-local and does not require Core export changes.
- Model strategy remains single Hermes-configured session.
- No S4c artifact/state handling, S4d review gates, memory persistence, per-step routing, Core/current CLI/dependency changes are present.

## S4b Review Follow-up Requirements

- S4c must add workspace path containment before or around the write path established in `workflow.py`; user-supplied workspace paths must not allow accidental writes outside the intended adapter workspace boundary.
- S4d must enforce Quill Core `humanReview` flags with adapter-local gate state before any runner path can auto-advance through review-required checkpoints.
- The S4a `quill_hermes/__init__.py` command description still says workflow execution is future work; update it in the next slice that touches registration metadata.
- Before or during the next touch of `workflow.py`, consider wrapping `_load_steps()` field-access drift (`name`, `input`, `output`, `modelRole`, `humanReview`) into `WorkflowBlockedError` so malformed Core workflow shape does not produce a raw traceback.
- Before or during the next touch of `cli.py`, consider adding a safe unexpected-exception adapter fallback if desired; keep it bounded and avoid hiding actionable `BLOCKED:` messages.

## Key Existing Entrypoints

- `packages/core/src/initAssets.ts`: defines `technicalBlogWorkflowDefinition`, templates, prompts, and artifact names.
- `packages/core/src/writingSkillContracts.ts`: defines six technical-blog writing skill contracts.
- `@pandaria/quill/core`: current package export used successfully by the S3 spike.
- S3 spike reference: `spikes/hermes-runtime-verification/.hermes/plugins/quill-runtime-spike/cli.py`.

## Compact Test Strategy

### Required Evidence

- S4b: adapter-local bridge can load public `@pandaria/quill/core` assets used by the runner.
- S4b: Hermes command can execute the first bounded technical-blog runner path in an isolated workspace.

### Smoke Checks

- S4b: Hermes smoke through the first executable technical-blog runner path only.

### Manual Checks

- Verify `adapters/hermes/**` remains separate from Core/current CLI.
- Verify memory is disabled-by-default and no per-step model routing is implemented.
- Verify S4b does not implement S4c artifact/state handling or S4d review gate commands.

### NOT_RUN Conditions

- `npm run check`: `NOT_RUN` for S4b unless existing TypeScript/source files change, which should not happen.
- Hermes smoke: `NOT_RUN` only if Hermes runtime is unavailable or required approval/dependency is missing; record reason and follow-up.

### Risks / Stop Conditions

- Stop if adapter location needs user decision, package publication changes, or root package changes before coding.
- Stop if implementation would require guessing Hermes APIs.
- Stop if Core API/export changes, current CLI changes, dependencies, lockfiles, secrets, protected environment changes, memory persistence, or per-step model routing become necessary.

### Handoff Notes

- For coder: implement only S4b. Do not implement S4c artifact/state handling, S4d review gates, or S4e docs/final validation.
- For reviewer: verify workflow runner is bounded to technical-blog, uses public Core exports only, and keeps memory/per-step routing disabled.
- For validator: S4b validation is Hermes first-runner-path smoke; `npm run check` is not applicable unless forbidden source paths change.

## Assumptions

- S3 evidence is sufficient to plan an MVP adapter without changing Quill Core or current CLI.
- `adapters/hermes/**` is acceptable as a bounded production-ish adapter location unless the user rejects it.
- Future implementation can use isolated Hermes runtime/project-plugin smoke checks without global config mutation.

## Risks

- Moving from spike to production-ish adapter may reveal Hermes packaging/discovery constraints not covered by S3.
- Artifact/state handling and review gates are high-risk because they preserve human-gate behavior and workspace safety.
- Memory integration remains privacy-sensitive and intentionally deferred.

## Stop Conditions

- Stop after S4b review before S4c because selected gate policy is strict.
- Stop if implementation would require guessing Hermes APIs.
- Stop if future work requires dependency additions, credentials, protected environment changes, Quill Core API/export changes, current CLI behavior changes, or root package publication changes without separate approval.
- Stop if memory persistence or per-step model routing becomes necessary for the MVP.
- Stop for final approval by default.
