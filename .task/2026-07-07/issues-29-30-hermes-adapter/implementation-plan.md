# Issues #29 and #30 Hermes Adapter Implementation Plan

## Requirement Source

- `.task/2026-07-07/issues-29-30-hermes-adapter/requirement.md`
- GitHub issues #29 and #30
- Hermes docs source: <https://hermes-agent.nousresearch.com/>

## Scope Summary

First complete issue #29 by updating the Hermes adapter target design document. Then stop before issue #30 implementation. Issue #30 should begin with a runtime verification spike before any full adapter MVP.

## Involved Modules Or Areas

- Target design docs: `docs/target/hermes-adapter-design.md`
- Target architecture context: `docs/target/quill-core-architecture.md`
- Knowledge routing: `docs/project/knowledge-map.md`
- Current core packaging context: `packages/core/README.md`
- Core workflow assets: `packages/core/src/initAssets.ts`
- Core writing skill contracts: `packages/core/src/writingSkillContracts.ts`

## Loaded Rules

- `AGENTS.md`
- `docs/project/marionettist-workflow.md`
- `.marionettist/tier-policy.yml`

## Loaded Docs

- `docs/project/knowledge-map.md`
- `docs/target/hermes-adapter-design.md`
- `docs/target/quill-core-architecture.md`
- `packages/core/README.md`

## Global Forbidden Scope

- Do not implement Hermes adapter code until the analysis gate is approved and the relevant slice is selected.
- Do not change current CLI behavior.
- Do not change Quill Core public exports in the issue #29 design slice.
- Do not invent Hermes APIs or claim unverified signatures.
- Do not embed provider-specific config or secrets into Quill Core.
- Do not modify unrelated docs or rules without explicit need.

## Execution Strategy

- Complexity: complex
- Default Execution: sequential
- Parallel Execution: not-needed
- Fallback Execution: sequential
- Merge Owner: primary orchestrator
- Conflict Resolution Rule: design document is the source of truth for #29; implementation code waits for later slice approval.

## Slice Dependency Graph

| Slice | Depends On | Can Run In Parallel With | Fallback Order | Shared Files | Merge Owner | Conflict Risk |
| --- | --- | --- | --- | --- | --- | --- |
| S1: Expand Hermes adapter target design | Requirement/context | None | 1 | `docs/target/hermes-adapter-design.md` | primary orchestrator | medium |
| S2: Plan #30 runtime verification spike | S1 | None | 2 | `.task/.../implementation-plan.md`, possible docs update | primary orchestrator | medium |
| S3: Implement #30 runtime verification spike | S1, S2, explicit user approval | None | 3 | `spikes/hermes-runtime-verification/**`, task artifacts for evidence/status only | primary orchestrator | high |
| S4: Plan #30 MVP adapter implementation | S3 success, explicit S4 planning approval | None | 4 | task artifacts only during planning; future adapter files under `adapters/hermes/**` if approved | primary orchestrator | high |

## Implementation Slices

### Slice S1: Expand Hermes Adapter Target Design

#### Goal

Update `docs/target/hermes-adapter-design.md` to satisfy issue #29 acceptance criteria using confirmed Hermes documentation facts and explicit unknowns.

#### Allowed Modification Scope

- `docs/target/hermes-adapter-design.md`
- `docs/project/knowledge-map.md` only if routing changes are required after the doc update
- Task state artifacts only for gate/status updates

#### Forbidden Scope

- No production code changes
- No new Hermes plugin implementation
- No CLI behavior changes
- No core package API changes
- No provider-specific secrets or raw model IDs in Quill Core design

#### Execution

- Mode: sequential
- Depends On: requirement and context pack
- Can Run With: none
- Must Not Run With: implementation slices
- Fallback Order: 1
- Shared Files: `docs/target/hermes-adapter-design.md`
- Merge Owner: primary orchestrator
- Conflict Risk: medium
- Gate Class: boundary-sensitive
- Risk Score: 4
- Gate Reasons:
  - external-runtime-boundary
  - architecture-design
  - human-gate-protocol
  - model-routing-unknowns
- Validation Level: slice
- Recommended Agent Strategy: bounded docs edit followed by high-risk reviewer path and pre-done critic gate

#### Steps

1. Preserve existing positioning and non-goals.
2. Add confirmed Hermes capability summary with source caveats.
3. Define proposed Hermes plugin/file structure.
4. Map Quill Core workflow, skills, prompts, artifacts, memory, model-role hints, and gates to Hermes concepts.
5. Define the smallest end-to-end Hermes MVP and the required spike before full #30 implementation.
6. Record risks, blockers, and open questions without guessing APIs.

#### Validation

- Manual doc review against issue #29 acceptance criteria.
- Run `npm run check` only if TypeScript/source files are changed; expected `NOT_RUN` for S1 if docs-only.

#### Done Criteria

- The design answers all issue #29 questions.
- The design explicitly describes what is confirmed versus unknown.
- The design makes #30 implementation slices derivable without chat context.

#### Rollback Notes

- Revert only `docs/target/hermes-adapter-design.md` and any routing docs changed for S1.

### Slice S2: Plan #30 Runtime Verification Spike

#### Goal

After S1 is approved, refine the implementation plan for a minimal #30 spike that verifies Hermes runtime integration before full adapter implementation.

#### Allowed Modification Scope

- `.task/2026-07-07/issues-29-30-hermes-adapter/implementation-plan.md`
- `.task/2026-07-07/issues-29-30-hermes-adapter/context-pack.md`
- Optional design doc notes if S1 identifies missing spike details

#### Forbidden Scope

- No production adapter implementation yet
- No dependency additions unless separately approved

#### Execution

- Mode: sequential
- Depends On: S1 approval
- Can Run With: none
- Must Not Run With: S3/S4
- Fallback Order: 2
- Shared Files: task artifacts
- Merge Owner: primary orchestrator
- Conflict Risk: low
- Gate Class: standard
- Risk Score: 3
- Gate Reasons:
  - planning-only
  - implementation-unknowns
- Validation Level: slice
- Recommended Agent Strategy: planner update only

#### Steps

1. Convert S1 decisions into a spike scope.
2. Name the minimum runtime behavior to verify: plugin registration, one command, one skill/step, artifact write, gate pause.
3. Define validation evidence and `NOT_RUN` conditions.

#### Validation

- Manual plan review.

#### Done Criteria

- S3 has bounded allowed/forbidden scope, validation commands, stop conditions, done criteria, rollback notes, and explicit confirmation gate posture.
- S3 preserves `Gate Class: high-risk`, `Risk Score: 5`, and its external-runtime verification gate reasons.

#### Rollback Notes

- Revert task artifact updates.

### Slice S3: Implement #30 Runtime Verification Spike

#### Goal

Verify the minimum Hermes plugin/runtime assumptions before full adapter implementation.

This is a runtime verification spike only. It must prove or disprove the smallest assumptions needed for issue #30 without implementing the full adapter MVP.

#### Allowed Modification Scope

- New spike-only files under `spikes/hermes-runtime-verification/**` for throwaway Hermes plugin/runtime verification.
- `.task/2026-07-07/issues-29-30-hermes-adapter/context-pack.md` only for S3 evidence/status handoff updates.
- `.task/2026-07-07/issues-29-30-hermes-adapter/state.json` only for gate/status updates.
- `.task/2026-07-07/issues-29-30-hermes-adapter/implementation-plan.md` only if runtime evidence forces a bounded plan correction before continuing.
- `docs/target/hermes-adapter-design.md` only if the spike discovers a material design blocker or confirmed runtime behavior that must be captured for issue #30.

#### Forbidden Scope

- No full adapter MVP before the spike passes and a later slice is explicitly approved.
- No production adapter implementation outside `spikes/hermes-runtime-verification/**`.
- No dependency additions or package-lock changes unless the user separately approves them for S3 after runtime preflight.
- No current CLI behavior changes.
- No Quill Core public API/export changes.
- No provider-specific config, model IDs, API keys, or secrets in Quill Core.
- No guessed Hermes API signatures; verify against installed/runtime/source evidence or stop.
- No memory integration in the initial spike unless Hermes hook/read/write behavior is confirmed first.
- No per-step model routing implementation unless runtime evidence supports it; default to one Hermes-configured model/session for the spike.

#### Execution

- Mode: sequential
- Depends On: S1 and S2 approval
- Can Run With: none
- Must Not Run With: S4
- Fallback Order: 3
- Shared Files: `spikes/hermes-runtime-verification/**`, task evidence/status artifacts only
- Merge Owner: primary orchestrator
- Conflict Risk: high
- Gate Class: high-risk
- Risk Score: 5
- Gate Reasons:
  - external-runtime-verification
  - new-integration-code
  - validation-environment-dependent
- Validation Level: slice
- Recommended Agent Strategy: implementation only after explicit user approval and plan-review critic PASS

#### Steps

1. Preflight runtime evidence:
   - Confirm the Hermes runtime/package/source is available in the local environment.
   - Identify the actual plugin registration/load mechanism from runtime/source evidence, not from guessed signatures.
   - If Hermes cannot be installed, loaded, or inspected without new dependencies or credentials, stop and record `NOT_RUN` with follow-up instructions.
2. Create the smallest spike-only plugin/registration artifact under `spikes/hermes-runtime-verification/**`.
3. Verify plugin registration/load as its own evidence point.
4. Invoke one minimal Hermes-facing command path as its own evidence point.
5. Wire only one Quill-aligned workflow step using existing Quill Core methodology/assets as reference; do not change Core exports.
6. Write exactly one Markdown artifact through the Hermes-accessible workspace path, such as a minimal `brief.md` or `outline.md`, sufficient to prove artifact write behavior.
7. Implement or simulate one adapter-local review-pause state that stops automatic continuation and requires explicit user action to continue, revise, or abort.
8. Keep the model strategy to a single Hermes-configured model/session unless runtime evidence confirms a safer richer routing option.
9. Leave Hermes memory disabled. Only inspect hook/read/write behavior if needed to decide whether memory can be considered in a later slice; do not persist Quill memories in S3.
10. Capture evidence in the task context/state artifacts: command used, observed result, artifact path, gate-pause behavior, and any blockers.
11. Stop after review of S3; do not proceed to S4 without explicit confirmation.

#### Validation

- Manual runtime smoke checks, when Hermes runtime is available:
  - plugin registration/load succeeds
  - one Hermes-facing command path starts the spike
  - one Quill-aligned step runs without changing Quill Core APIs
  - one Markdown artifact is written in the workspace
  - one review pause blocks continuation until explicit user action
- `npm run check`: run only if files under `packages/` or `src/` change, or if another approved TypeScript/source change makes the existing repository check applicable.
- If S3 changes only spike files outside `packages/` and `src/`, or if spike files are Python/Hermes-only and the repo check is not applicable, record `npm run check: NOT_RUN` with reason and include the Hermes smoke evidence instead.
- Manual plan/design review after smoke evidence to decide whether S4 can be safely planned.

#### Done Criteria

- Runtime evidence confirms or disproves all minimum assumptions: plugin registration/load, one command path, one Quill-aligned step, one Markdown artifact write, and one explicit review pause.
- No Hermes API signature is guessed in committed spike code or evidence notes.
- Memory remains out of the executable spike unless hook behavior was first confirmed; any memory finding is recorded as evidence for a later slice only.
- Model behavior uses one Hermes-configured model/session unless evidence justifies documenting another approach.
- Task artifacts record validation evidence, `NOT_RUN` reasons if any, blockers, and recommended next step.
- S4 remains future work requiring explicit user confirmation.

#### Rollback Notes

- Delete `spikes/hermes-runtime-verification/**`.
- Revert S3-only task artifact evidence/status updates if the spike is abandoned.
- Revert any S3 design note updates if they are superseded or incorrect.
- If any dependency/package-lock change was separately approved for S3, revert it as part of rollback unless the user explicitly keeps it.

#### Stop Conditions

- Stop if Hermes plugin registration/load cannot be verified from runtime/source evidence.
- Stop if implementing the command path requires guessed Hermes APIs.
- Stop if a dependency addition, credential, secret, or protected environment change is needed before the user approves it.
- Stop if Quill Core API/export changes appear necessary for the spike.
- Stop if the review-pause behavior cannot require explicit user action.
- Stop if memory integration becomes necessary before hook behavior is confirmed; defer memory to a later approved slice.
- Stop before S4 regardless of S3 outcome because selected gate policy is strict and S3 is high-risk/risk_score 5.

### Slice S4: Plan #30 MVP Adapter Implementation

#### Goal

Convert the successful S3 runtime spike evidence into an executable issue #30 MVP adapter implementation sequence. S4 itself is planning/artifact work only and must not implement adapter code.

The planned MVP remains limited to the `technical-blog` workflow, one Hermes-configured model/session, adapter-local Markdown artifacts/state, explicit review gate commands, and memory disabled by default.

#### S3 Evidence Used

- Project plugin loading works from the spike root with isolated `HERMES_HOME` and `HERMES_ENABLE_PROJECT_PLUGINS=1`.
- Hermes `ctx.register_cli_command`/plugin CLI registration pattern worked for the spike command path.
- Programmatic import of `@pandaria/quill/core` worked from the Hermes plugin path via the local package self-reference.
- Adapter-local pending-review state worked through `.quill-runtime-spike/pending-review.json`.
- Memory remained disabled and did not block the MVP path.
- The verified model strategy is a single Hermes-configured model/session; per-step routing remains deferred.

#### Production-ish Location Decision

Plan the MVP adapter under `adapters/hermes/**`.

Rationale:

- Keeps Hermes-specific code separate from Quill Core (`packages/core/**`) and from the current CLI (`src/**`).
- Avoids changing current `quill` CLI behavior or Core public exports for the MVP.
- Leaves future packaging/publication decisions explicit instead of silently changing root package `files`, dependencies, or lockfiles.
- Matches the S3 evidence that a Hermes project plugin can be loaded from a bounded adapter/plugin root without global Hermes state mutation.

Planned initial layout, subject to implementation-time verification without creating files during S4 planning:

- `adapters/hermes/README.md` — MVP usage, smoke path, and limitations.
- `adapters/hermes/plugin.yaml` — Hermes plugin metadata, modeled from S3 evidence only.
- `adapters/hermes/quill_hermes/__init__.py` — minimal plugin module export/registration surface.
- `adapters/hermes/quill_hermes/cli.py` — Hermes-facing `technical-blog` command registration and dispatch.
- `adapters/hermes/quill_hermes/core_assets.py` — adapter-local bridge that reads existing `@pandaria/quill/core` assets without Core export changes.
- `adapters/hermes/quill_hermes/workflow.py` — bounded technical-blog step runner.
- `adapters/hermes/quill_hermes/artifacts.py` — workspace artifact paths and Markdown read/write helpers.
- `adapters/hermes/quill_hermes/gates.py` — pending-review state, `continue`, `revise`, and `abort` handling.
- `adapters/hermes/examples/technical-blog/` — optional smoke workspace/example inputs only if needed for validation.
- `docs/project/knowledge-map.md` — only if S4e adds, moves, renames, or deletes documentation/routing-relevant artifacts.

#### Allowed Modification Scope

- For S4 planning now:
  - `.task/2026-07-07/issues-29-30-hermes-adapter/implementation-plan.md`
  - `.task/2026-07-07/issues-29-30-hermes-adapter/context-pack.md`
  - `.task/2026-07-07/issues-29-30-hermes-adapter/state.json` only for gate/status updates
  - `docs/target/hermes-adapter-design.md` only if S3 discovered material design evidence that must be captured; no such update is required by this S4 plan.
- For future S4 implementation sub-slices only after plan-review critic PASS and explicit user confirmation:
  - New adapter files under `adapters/hermes/**`
  - Task artifacts for status/evidence updates

#### Forbidden Scope

- Adapter implementation code during this planning slice.
- New production files during S4 planning.
- Dependency additions or package-lock changes.
- Current CLI behavior changes.
- Quill Core API/export changes unless a sub-slice stops and obtains explicit user approval.
- Provider-specific config, model IDs, API keys, or secrets in Quill Core.
- Generic workflow engine.
- Publishing integrations.
- Automatic web research.
- Refactor of the entire CLI.
- Memory persistence by default; memory is disabled for the MVP and policy-only unless a later approved slice changes it.
- Per-step model routing; defer and use one Hermes-configured model/session for the MVP.
- S4 implementation before plan-review critic and explicit user confirmation.

#### Execution

- Mode: sequential
- Depends On: S3 success and explicit S4 planning approval
- Can Run With: none
- Must Not Run With: none
- Fallback Order: 4
- Shared Files: `.task/.../implementation-plan.md`, `.task/.../context-pack.md`, `.task/.../state.json` during planning; future adapter files under `adapters/hermes/**` if approved
- Merge Owner: primary orchestrator
- Conflict Risk: high
- Gate Class: high-risk
- Risk Score: 5
- Gate Reasons:
  - external-runtime-integration
  - adapter-architecture
  - human-gate-behavior
  - memory-policy
- Validation Level: final
- Recommended Agent Strategy: planning-only update now; future sliced implementation only after plan-review critic PASS and explicit user confirmation

#### Steps

1. Record S3 evidence as implementation constraints.
2. Select a bounded adapter location that keeps Hermes runtime code outside Quill Core and current CLI.
3. Split future MVP work into sequential sub-slices S4a-S4e.
4. Preserve disabled-by-default memory and single-session model strategy in every sub-slice.
5. Define validation, done criteria, rollback notes, stop conditions, and gate metadata for every sub-slice.
6. Update the context pack so coding handoff knows S4 implementation remains blocked until plan-review critic and explicit user confirmation.

#### Validation

- Manual plan review only.
- `npm run check`: `NOT_RUN` because S4 planning changes task artifacts only and must not change source files.

#### Done Criteria

- Implementation plan contains executable S4a-S4e MVP sub-slices with allowed/forbidden scope, validation, done criteria, rollback notes, stop conditions, and gate metadata.
- Context pack is updated to S4 planning context and next gate posture.
- Future S4 implementation remains blocked pending plan-review critic and explicit user confirmation.

#### Rollback Notes

- Revert S4 planning edits to task artifacts.

#### Stop Conditions

- Stop if the adapter location is rejected or requires changing Quill Core/current CLI/package publication settings before approval.
- Stop if MVP implementation appears to require dependency additions or package-lock changes before separate approval.
- Stop if Hermes plugin registration, command behavior, or Core asset loading must be guessed rather than based on S3/runtime evidence.
- Stop if memory persistence becomes necessary for the MVP.
- Stop if per-step model routing becomes necessary for the MVP.
- Stop if Quill Core API/export changes appear necessary.

### Future S4 Implementation Sub-slices

These sub-slices are planned by S4 but are not approved for coding by the S4 planning work itself. Because task-local `gatePolicy.selected` is `strict`, each future coding sub-slice or approved group requires the appropriate gate, and the first implementation sub-slice requires plan-review critic PASS plus explicit user confirmation.

#### S4a: Adapter Scaffold And Hermes Plugin Layout

##### Goal

Create the minimal `adapters/hermes/**` plugin scaffold and command registration surface using only S3-verified Hermes plugin/CLI patterns.

##### Allowed Modification Scope

- New files under `adapters/hermes/**` for plugin metadata, Python package/module scaffold, command registration shell, and README skeleton.
- Task artifacts for status/evidence only.

##### Forbidden Scope

- No `packages/core/**` changes.
- No `src/**` current CLI changes.
- No dependency additions, package-lock changes, root package publication changes, or model/provider config.
- No workflow execution beyond a help/version/no-op command.
- No memory persistence.

##### Execution

- Mode: sequential
- Depends On: S4 planning approval, plan-review critic PASS, explicit user confirmation
- Can Run With: none
- Must Not Run With: S4b-S4e
- Fallback Order: 4a
- Shared Files: `adapters/hermes/**`
- Merge Owner: primary orchestrator
- Conflict Risk: medium
- Gate Class: boundary-sensitive
- Risk Score: 4
- Gate Reasons:
  - external-runtime-integration
  - new-adapter-location
  - plugin-registration
- Validation Level: slice
- Recommended Agent Strategy: implement minimal scaffold, run Hermes help/load smoke only, then review

##### Steps

1. Create the `adapters/hermes` scaffold without touching Core or current CLI.
2. Add plugin metadata based on the S3 `plugin.yaml` evidence, avoiding unverified fields.
3. Add minimal Python registration/module files sufficient for Hermes to expose the adapter command help.
4. Document local smoke invocation using isolated `HERMES_HOME` and project-plugin loading.

##### Validation

- Hermes smoke: from the adapter root or documented project-plugin root, verify plugin load/help command with isolated `HERMES_HOME` and `HERMES_ENABLE_PROJECT_PLUGINS=1`.
- `npm run check`: `NOT_RUN` unless TypeScript/source files under existing repo packages are changed; such changes are forbidden for S4a.

##### Done Criteria

- Hermes can discover/load the adapter scaffold and show the command help.
- No Core, current CLI, dependency, lockfile, or provider-config changes are present.
- README records memory disabled and single-session model assumptions.

##### Rollback Notes

- Delete `adapters/hermes/**` files added by S4a and revert S4a task artifact updates.

##### Stop Conditions

- Stop if Hermes cannot load a plugin from `adapters/hermes/**` without global config mutation, dependency additions, or guessed registration APIs.
- Stop if the scaffold requires root package publication or Core export changes.

#### S4b: Technical-blog Workflow Runner For All MVP Steps

##### Goal

Implement a bounded technical-blog runner that uses existing Quill Core assets to progress through `brief`, `sources`, `outline`, `draft`, `review`, and `final` artifact steps without building a generic workflow engine.

##### Allowed Modification Scope

- `adapters/hermes/quill_hermes/core_assets.py`
- `adapters/hermes/quill_hermes/workflow.py`
- Adapter-local updates to `cli.py` needed to dispatch start/resume commands.
- Task artifacts for status/evidence only.

##### Forbidden Scope

- No Quill Core API/export changes unless implementation stops for explicit approval.
- No current CLI changes.
- No generic multi-workflow engine.
- No automatic web research.
- No per-step model routing; use one Hermes-configured model/session.
- No memory integration.

##### Execution

- Mode: sequential
- Depends On: S4a PASS
- Can Run With: none
- Must Not Run With: S4c-S4e
- Fallback Order: 4b
- Shared Files: `adapters/hermes/quill_hermes/**`
- Merge Owner: primary orchestrator
- Conflict Risk: high
- Gate Class: high-risk
- Risk Score: 5
- Gate Reasons:
  - workflow-execution
  - core-asset-bridge
  - external-runtime-integration
  - single-session-model-policy
- Validation Level: slice
- Recommended Agent Strategy: implement one bounded workflow path, then smoke through first executable path before continuing

##### Steps

1. Load `@pandaria/quill/core` assets through an adapter-local bridge, preserving the S3 programmatic import approach where safe.
2. Map only the technical-blog workflow and known artifact names.
3. Implement sequential step progression without generic branching or workflow registration.
4. Keep generated content/template handling adapter-local and file-based.
5. Emit clear blocked errors for missing inputs, failed Core asset load, or unsupported workflow names.

##### Validation

- Hermes smoke: start a technical-blog run in an isolated workspace and verify at least the first step can execute through the runner.
- Manual check: runner references only `technical-blog` and does not introduce generic engine behavior.
- `npm run check`: `NOT_RUN` unless existing TypeScript/source files change; if Core changes appear necessary, stop before making them.

##### Done Criteria

- Adapter runner can progress through the intended technical-blog step sequence in principle, with clear blocked states.
- Core asset loading remains adapter-local and does not require Core export changes.
- Model strategy remains single Hermes-configured session.

##### Rollback Notes

- Revert S4b changes under `adapters/hermes/quill_hermes/**` and related task artifact updates.

##### Stop Conditions

- Stop if all-step execution requires changing Core exports, current CLI behavior, dependencies, or package publication settings.
- Stop if step execution requires per-step Hermes model routing.
- Stop if Hermes command/session behavior is not sufficient to run a bounded workflow path.

#### S4c: Artifact And Adapter-local State Handling

##### Goal

Implement workspace Markdown artifact management and adapter-local progress/pending-review state for the full MVP artifact set.

##### Allowed Modification Scope

- `adapters/hermes/quill_hermes/artifacts.py`
- `adapters/hermes/quill_hermes/gates.py` for shared state structures only where needed by artifact state.
- Adapter-local tests/smoke fixtures or examples under `adapters/hermes/**` if needed.
- Task artifacts for status/evidence only.

##### Forbidden Scope

- No memory persistence or Hermes memory provider writes.
- No opaque database-only artifacts.
- No writes outside the user-specified or adapter-created workspace.
- No secrets/model/provider config in artifacts or state.
- No Core/current CLI changes.

##### Execution

- Mode: sequential
- Depends On: S4b PASS
- Can Run With: none
- Must Not Run With: S4d-S4e
- Fallback Order: 4c
- Shared Files: `adapters/hermes/quill_hermes/artifacts.py`, possible `gates.py`
- Merge Owner: primary orchestrator
- Conflict Risk: high
- Gate Class: high-risk
- Risk Score: 5
- Gate Reasons:
  - artifact-integrity
  - adapter-state
  - memory-policy
  - workspace-safety
- Validation Level: slice
- Recommended Agent Strategy: implement state format conservatively, verify file paths and no memory writes

##### Steps

1. Define adapter-local state directory, e.g. workspace-relative `.quill-hermes/`.
2. Implement artifact path resolution for `brief.md`, `sources.md`, `outline.md`, `draft.md`, `review.md`, and `final.md`.
3. Implement progress state with current step, last completed step, pending review metadata, and memory/model policy flags.
4. Validate paths remain inside the workspace.
5. Keep state human-inspectable JSON and artifacts Markdown.
6. If `gates.py` is touched in S4c, limit it to shared data structures such as the pending-review JSON schema; command dispatch and state-transition logic belong to S4d.

##### Validation

- Smoke check in an isolated workspace: artifacts and state are written only under that workspace.
- Manual check: no memory writes, no raw secrets/provider config, and no opaque storage.
- `npm run check`: `NOT_RUN` unless existing TypeScript/source files change; such changes are not planned.

##### Done Criteria

- Full MVP artifact names can be created/read/updated safely.
- Adapter-local state can resume or block a run without global persistence.
- Memory remains disabled by default and state records that policy.

##### Rollback Notes

- Revert S4c adapter files and delete generated example/smoke workspace artifacts if created.

##### Stop Conditions

- Stop if safe workspace path containment cannot be implemented confidently.
- Stop if persistence outside local workspace or Hermes memory becomes necessary.
- Stop if state semantics would conflict with Quill review gates.

#### S4d: Review Gate Commands And Human Resume Protocol

##### Goal

Implement explicit `continue`, `revise`, and `abort` gate commands around adapter-local pending-review state so the MVP cannot auto-progress past review checkpoints.

##### Allowed Modification Scope

- `adapters/hermes/quill_hermes/gates.py`
- Adapter-local updates to `cli.py` and `workflow.py` required for gate dispatch.
- Task artifacts for status/evidence only.

##### Forbidden Scope

- No reliance on Hermes safety approvals as a substitute for Quill workflow review gates.
- No automatic continuation after pending review.
- No memory writes during review or resume.
- No current CLI/Core changes.

##### Execution

- Mode: sequential
- Depends On: S4c PASS
- Can Run With: none
- Must Not Run With: S4e
- Fallback Order: 4d
- Shared Files: `adapters/hermes/quill_hermes/gates.py`, `cli.py`, `workflow.py`
- Merge Owner: primary orchestrator
- Conflict Risk: high
- Gate Class: high-risk
- Risk Score: 5
- Gate Reasons:
  - human-gate-behavior
  - adapter-state
  - explicit-user-action
  - workflow-safety
- Validation Level: slice
- Recommended Agent Strategy: implement gate protocol and prove automatic progression is blocked

##### Steps

1. Add CLI subcommands or command arguments for `continue`, `revise`, and `abort` using S3-verified command registration patterns.
2. Require an existing pending-review state before resume actions.
3. On `continue`, advance only to the next allowed step and stop again at the next review checkpoint as defined by Quill assets.
4. On `revise`, keep the run blocked and surface instructions for user edits or bounded rerun behavior.
5. On `abort`, mark adapter-local state aborted without deleting artifacts.
6. Ensure no path auto-runs through all review checkpoints without explicit actions.

##### Validation

- Smoke checks:
  - pending review blocks automatic continuation
  - `continue` requires pending-review state and advances only one allowed segment
  - `revise` preserves blocked state/instructions
  - `abort` marks state aborted
- Manual check: gate protocol is adapter-local and does not claim native Hermes workflow-gate semantics.
- `npm run check`: `NOT_RUN` unless existing TypeScript/source files change; such changes are not planned.

##### Done Criteria

- Review gate behavior requires explicit user action and is observable in workspace state.
- No Hermes approval mechanism is misrepresented as Quill review approval.
- Resume protocol is documented enough for the smoke/example slice.

##### Rollback Notes

- Revert S4d adapter changes and task artifact updates; preserve user workspace artifacts unless explicitly deleting generated smoke data.

##### Stop Conditions

- Stop if Hermes command behavior cannot express the required user actions safely.
- Stop if implementation would auto-progress past required review gates.
- Stop if review handling requires native Hermes gate APIs not verified by S3.

#### S4e: Smoke Example, MVP Documentation, And Final Validation Handoff

##### Goal

Add the minimal documentation and smoke/example path needed for a reviewer to validate the MVP end to end without changing Core/current CLI behavior.

##### Allowed Modification Scope

- `adapters/hermes/README.md`
- `adapters/hermes/examples/technical-blog/**` if a bounded example workspace is needed.
- `docs/project/knowledge-map.md` only for the bounded routing update required if `adapters/hermes/README.md` or other docs are added.
- Task artifacts for final validation evidence/status.
- `docs/target/hermes-adapter-design.md` only if implementation discovers material design evidence that must be captured.

##### Forbidden Scope

- No broad docs rewrite; `knowledge-map.md` changes are limited to the routing update required by added/moved/renamed/deleted docs or rules.
- No package publishing, dependency, lockfile, Core, or current CLI changes.
- No memory persistence; document memory as disabled-by-default/policy-only.
- No per-step model routing; document as deferred.

##### Execution

- Mode: sequential
- Depends On: S4d PASS
- Can Run With: none
- Must Not Run With: none
- Fallback Order: 4e
- Shared Files: `adapters/hermes/README.md`, `adapters/hermes/examples/**`, task artifacts
- Merge Owner: primary orchestrator
- Conflict Risk: medium
- Gate Class: standard
- Risk Score: 3
- Gate Reasons:
  - smoke-validation
  - user-facing-docs
  - final-handoff
- Validation Level: final
- Recommended Agent Strategy: run documented smoke path and capture exact PASS/NOT_RUN evidence

##### Steps

1. Document installation/loading assumptions using isolated `HERMES_HOME` and project-plugin loading from S3/S4 evidence.
2. Document commands for start/resume/revise/abort and expected artifacts.
3. Document limitations: one workflow, single Hermes-configured model/session, memory disabled, no automatic research.
4. Add or refresh a minimal example workspace only if it helps reproduce the smoke path without secrets.
5. Capture final validation evidence in task artifacts.

##### Validation

- End-to-end Hermes smoke, when Hermes runtime is available:
  - plugin load/help
  - start technical-blog run
  - artifact creation for expected Markdown files as implemented
  - pending review blocks continuation
  - continue/revise/abort commands behave as documented
- Manual checks:
  - README matches implemented behavior and limitations
  - no Core/current CLI/dependency/lockfile changes
  - memory disabled by default and per-step routing deferred
- `npm run check`: run only if existing TypeScript/source files changed; expected `NOT_RUN` if implementation remains under Python/Hermes adapter files only and repository TS check is not applicable.

##### Done Criteria

- Reviewer can follow the documented smoke path.
- Final task artifacts record validation status, `NOT_RUN` reasons if any, and remaining risks.
- MVP remains bounded to technical-blog and preserves Quill Core neutrality.
- If `adapters/hermes/README.md` or other docs are added, `docs/project/knowledge-map.md` is updated with the bounded routing entry or an explicit reviewer-approved reason is recorded.

##### Rollback Notes

- Revert S4e docs/example/task artifact changes. If rolling back the full MVP, remove `adapters/hermes/**` and generated smoke workspaces.

##### Stop Conditions

- Stop if smoke validation cannot run and no credible manual evidence can be captured.
- Stop if docs would need to promise unsupported Hermes behavior.
- Stop if final validation reveals Core/current CLI/API changes are necessary.

## Parallel Slice Groups

None. This task is boundary-sensitive and should proceed sequentially.

## Test Strategy

### Selected Strategy

- Task type: architecture design followed by external runtime integration.
- Change type: docs-only for S1; integration spike/MVP for later slices.
- Strategy summary: use manual acceptance review for S1; require runtime smoke evidence for #30 spike/MVP.

### Required Evidence

- S1: design covers issue #29 acceptance criteria and clearly separates confirmed Hermes facts from unknowns.
- S2: implementation plan and context pack bound S3 spike scope, validation, stop conditions, rollback, and future-work gate posture.
- S3: Hermes plugin can be installed/enabled or loaded, one command can run, one Quill-aligned step can produce/update one Markdown artifact, and review behavior can pause for explicit user action.
- S4 planning: plan and context pack define S4a-S4e with gate metadata, `adapters/hermes/**` location rationale, disabled memory, single-session model strategy, validation, rollback, and stop conditions.
- Future S4 implementation: evidence should expand from S3 to the bounded MVP path, expected Markdown artifact set, and explicit `continue`/`revise`/`abort` review protocol.

### Validation Approach

- Automated tests: not required for S1/S2/S4 planning; future S4 implementation should prefer Hermes smoke evidence unless adapter-local automated tests become low-friction without dependency changes.
- Smoke checks: required for future S4 implementation when Hermes runtime is available; S3 smoke baseline is plugin load, one command, one step, one Markdown artifact, and one review pause.
- Manual checks: required for S1 design review, S4 planning review, and future human-gate behavior.
- Environment dependencies: Hermes runtime availability for S3/S4.

### Commands Or Checks

- S1 manual check: compare `docs/target/hermes-adapter-design.md` against issue #29 acceptance criteria.
- S2 manual check: review this implementation plan and context pack for bounded S3 scope and preserved high-risk metadata.
- S3 smoke checks: Hermes plugin registration/load, one command invocation, one Quill-aligned step, one Markdown artifact write, and one review pause requiring explicit user action.
- S4 planning manual check: review S4a-S4e boundaries, `adapters/hermes/**` location, disabled memory, single-session model, and strict gate posture.
- Future S4 smoke checks: plugin load/help, technical-blog start/resume path, workspace Markdown artifacts, pending-review block, and `continue`/`revise`/`abort` behavior.
- `npm run check`: only if TypeScript/source files change.

### NOT_RUN Conditions

- S1 `npm run check`: acceptable `NOT_RUN` if only Markdown docs are modified.
- S2 `npm run check`: accepted `NOT_RUN` because S2 is planning/task-artifact-only.
- S3 runtime smoke: `NOT_RUN` only if Hermes cannot be installed, loaded, or executed in the environment, or if required dependency/credential approval is missing; must include follow-up instructions and preserve S4 as blocked.
- S4 planning `npm run check`: accepted `NOT_RUN` because S4 planning changes task artifacts only and must not change source files.
- Future S4 runtime smoke: `NOT_RUN` only if Hermes cannot be executed or required approval/dependency is missing; must include follow-up instructions.

### Risks / Stop Conditions

- Stop if Hermes API signatures cannot be verified for implementation.
- Stop if model routing or human gate behavior would require guessing runtime behavior.
- Stop S3 if memory integration is required before hook behavior is confirmed.
- Stop S3 if anything broader than plugin load, one command, one step, one Markdown artifact, and one review pause is needed to prove the minimum assumptions.
- Stop future S4 implementation if `adapters/hermes/**` location is rejected or requires unapproved root package/publication changes.
- Stop future S4 implementation if memory persistence, per-step model routing, dependency additions, package-lock changes, Core API/export changes, or current CLI behavior changes become necessary.

### Handoff Notes

- For coder: S1 is docs-only and must not implement code.
- For S2 planner: update only task artifacts unless S1 revealed a required design-doc correction.
- For S3 coder: implement only the runtime verification spike after explicit user confirmation; default to one Hermes-configured model/session and keep memory disabled.
- For S4 plan reviewer: run manual plan review before any S4 implementation; strict selected gate policy controls continuation.
- For future S4 coder: implement only the approved S4 sub-slice after plan-review critic PASS and explicit user confirmation.
- For validator: S4 planning validation is manual plan review; verify TypeScript behavior only if future source changes make it applicable.

## Final Validation

- For issue #29: design acceptance review and docs/routing review.
- For issue #30: runtime smoke path after future approval.

## Documentation Update Requirement

- `docs/target/hermes-adapter-design.md` must be updated for S1.
- `docs/project/knowledge-map.md` only needs updates if routing entries become stale or new docs are added/moved/renamed/deleted.

## Risks

- Hermes docs may omit source-level details needed for implementation.
- Human gates and per-step model routing require adapter-level design because Hermes does not expose native equivalents in the collected docs.
- Future Python plugin code may need packaging decisions not yet present in this TypeScript-centered repository.
