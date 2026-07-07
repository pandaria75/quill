# Context Pack: Issues #27 and #28 Quill Core Package

## Task Goal

Create `packages/core` as the first portable Quill Core package, migrate the technical-blog workflow into core assets, and update CLI init to consume/reuse those assets.

## Requirement Source

- `.task/2026-07-06/issues-27-28-quill-core-package/requirement.md`
- GitHub issues #27 and #28
- User confirmations listed in the requirement document

## Implementation Source

- `.task/2026-07-06/issues-27-28-quill-core-package/implementation-plan.md`

## Active Tier Policy

- Source: project-local `.marionettist/tier-policy.yml`
- Selected tier: L
- Description: complex, cross-cutting, boundary-sensitive, or concretely high-risk work
- Relevant hints: `workflowHint: full-marionettist`, `gateHint: prefer-strict`, `reviewLevel: critic-required`, `modelProfileHint: think`, `minTier: L`, `maxTier: null`
- Note: tier policy is advisory; workflow and gates are controlled by `docs/project/marionettist-workflow.md` and task gate policy.

## Gate Policy

- config/default: `balanced`
- selected/effective: `autonomous`
- recommended: `strict`
- finalApprovalRequired: `true`
- Note: autonomous does not bypass the analysis-to-coding gate, boundary-sensitive slice pauses, risk_score >= 4 pauses, critic-required routing, or final approval.

## Loaded Rules and Docs

- `AGENTS.md`
- `marionettist.config.yaml`
- `.marionettist/tier-policy.yml`
- `.marionettist/model-profiles.yml`
- `docs/project/marionettist-workflow.md`
- `docs/project/knowledge-map.md`
- Issue #27 and #28 bodies via `gh issue view --json ...`

## Relevant Existing Entrypoints

- `src/commands/init.ts`: currently owns embedded prompts, templates, review checklist, style profile, and technical-blog workflow JSON.
- `package.json`: build scripts and package `files` currently include `dist`, `README.md`, and `LICENSE`.
- `tsconfig.json`: current `rootDir` is `src` and `include` is `src/**/*.ts`, so `packages/core` requires build strategy changes if implemented in TS.

## Allowed Modification Scope

- `packages/core/**`
- `src/commands/init.ts`
- `package.json`
- `tsconfig.json`
- package-local config under `packages/core/**` if needed
- focused docs routing in `docs/project/knowledge-map.md`

## Forbidden Modification Scope

- Hermes/OpenCode/Pi adapter implementations
- unrelated CLI commands
- LLM client behavior
- runtime workflow engine behavior; only narrow import compatibility needed for CLI init reuse is allowed
- provider/API-key/model-account/runtime permission defaults in core
- generic workflow engine or automatic web research

## Current Approved Slice

None yet. Analysis-to-coding gate has not been confirmed.

## Execution Mode

Sequential. No parallel group approved.

## Validation Commands

- `npm run build`
- `npm run smoke:init`
- `npm pack --dry-run`

## Test Strategy

Use build validation, CLI init smoke evidence, package dry-run where relevant, and manual core asset review for provider/runtime neutrality and technical-blog workflow completeness.

S1 must choose the asset representation and packaging strategy before later slices proceed. S1 should also capture current `quill init` generated output as a compatibility baseline where practical. Later slices should compare migrated output against that baseline where practical.

## Assumptions

- Core writing skills are file/template assets in `packages/core`, not `.agents/skills` or OpenCode/Marionettist runtime skills.
- The old MVP “delay shared core” doc guidance is not a blocker and should be ignored for this task unless directly touched.

## Risks

- Build/package configuration changes can affect distributable output.
- CLI init compatibility can regress when embedded strings are moved.
- Core portability can be weakened if runtime/provider configuration leaks into assets.
- After S4, `npm run dev` / `tsx` may require prebuilt `packages/core/dist` because CLI imports `@pandaria/quill/core` through package self-reference. S5 must assess or document this developer-experience risk.
- S5 must run `npm pack --dry-run` and close final package/baseline regression evidence.

## Stop Conditions

- Need for package-manager or monorepo migration beyond minimal config support.
- Conflict between CLI compatibility and core asset shape.
- Any need to embed provider/runtime/account/permission details in core.
- Failure to establish runtime-safe asset representation and package inclusion strategy in S1.
- Analysis-to-coding gate not confirmed.

## Plan-Review Critic Evidence

- Verdict: `PASS_WITH_WARNINGS`.
- Required changes have been folded into the implementation plan and context pack.
- Remaining warning: packaging/runtime asset availability is the main residual risk and must be resolved early in S1.
