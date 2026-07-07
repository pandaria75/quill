# Implementation Plan: Issues #27 and #28 Quill Core Package

## Classification

- Task type: feature
- Tier: L
- Reason: introduces `packages/core`, adjusts package/build boundaries, migrates CLI init assets, and establishes long-term core/runtime separation.

## Gate Policy

- config/default: `balanced`
- allowTaskOverride: `true`
- recommended: `strict`
- selected: `autonomous`
- reason: selected by user; strict remains advisory because boundary/build and release-surface risk are concrete.
- effective: `autonomous`
- finalApprovalRequired: `true`

`autonomous` does not bypass the analysis-to-coding gate, final approval, critic-required work, `boundary-sensitive` slices, `risk_score >= 4`, explicit stop conditions, protected-area decisions, or dangerous-command decisions.

## Allowed Scope

- Add `packages/core/**`.
- Move/copy reusable technical-blog prompts, templates, workflow definitions, review checklist, and writing-skill contracts into core.
- Update `src/commands/init.ts` to consume/reuse core assets.
- Adjust root build/package metadata only as needed for `packages/core` and CLI runtime asset availability.
- Update `docs/project/knowledge-map.md` and focused core docs if new docs are added.

## Forbidden Scope

- No Hermes/OpenCode/Pi adapter implementation.
- No provider IDs, API key env names, runtime permission policies, or model account defaults in core assets.
- No generic workflow engine.
- No automatic web research.
- No publishing integrations.
- No unrelated CLI command, LLM client, or runtime workflow engine refactor.
- No effort spent updating the old “delay shared core” doc unless directly required by changed docs routing.

## Test Strategy

```yaml
selectedStrategy:
  taskType: "feature/refactor"
  changeType: "package extraction, asset migration, CLI init reuse"
  summary: "Use build validation, CLI init smoke evidence, package dry-run where relevant, and manual core asset review."
requiredEvidence:
  baseline: "Current init output templates/prompts/workflow are embedded in src/commands/init.ts."
  protectedBehavior: "quill init should keep compatible generated .quill prompts/templates/workflow/checklist output unless an issue requirement intentionally changes it."
  riskSensitiveAreas:
    - "package file inclusion"
    - "runtime asset availability"
    - "provider/API-key/model-account neutrality"
    - "technical-blog workflow completeness"
validationApproach:
  automatedTests: "Use existing npm scripts; add focused tests only if current repository patterns make that small and safe."
  smokeChecks:
    - "npm run build"
    - "npm run smoke:init"
    - "npm pack --dry-run during S1 and final validation when package output or runtime asset inclusion is affected"
  manualChecks:
    - "Review core assets for prohibited provider/runtime/account/permission details."
    - "Confirm every technical-blog step contract has required sections."
commandsOrChecks:
  - "npm run build"
  - "npm run smoke:init"
  - "npm pack --dry-run"
notRunConditions:
  - check: "npm pack --dry-run"
    reason: "May be deferred only if no package metadata or files inclusion changes affect distributable contents."
    requiredFollowUp: "Validator records exact NOT_RUN reason and replacement evidence."
```

## Slices

### S1: Establish Core Package Boundary

- Goal: Add minimal `packages/core` package structure and make repository build aware of it.
- Scope: `packages/core/**`, `package.json`, `tsconfig.json`, package-local config if needed.
- Required design decision: choose the core asset representation and packaging strategy before later slices proceed. Options include compiled TS exports/constants or runtime Markdown/assets, but the chosen approach must make CLI init runtime-safe under the current package/build layout.
- Required baseline: capture current `quill init` generated output before migration so later slices can compare compatibility.
- Validation: `npm run build`; early `npm pack --dry-run` if package metadata or runtime asset inclusion is changed; inspect package inclusion needs.
- gateClass: `boundary-sensitive`
- risk_score: `4`
- gateReasons: `package-boundary`, `build-config`, `release-surface`
- Critic: required before coding due to Tier L / boundary-sensitive risk.

### S2: Move Portable Init Assets Into Core

- Goal: Extract current embedded templates, prompts, review checklist, and workflow definitions from `src/commands/init.ts` into core assets/modules.
- Scope: `packages/core/**`, `src/commands/init.ts` only as needed to remove duplication later.
- Validation: `npm run build`; compare generated init output against the S1 baseline where practical; keep provider/runtime-neutrality scan as required evidence for migrated assets.
- gateClass: `standard`
- risk_score: `3`
- gateReasons: `template-migration`, `portable-assets`, `regression-risk`

### S3: Add Technical-Blog Writing-Skill Contracts

- Goal: Add core writing-skill/template contracts for `brief-builder`, `source-organizer`, `outline-builder`, `draft-writer`, `style-reviewer`, and `final-polisher`.
- Scope: `packages/core/**`.
- Validation: manual content review for all required sections and prohibited provider/runtime details; `npm run build` if contracts are imported or packaged.
- gateClass: `standard`
- risk_score: `3`
- gateReasons: `new-assets`, `workflow-semantics`, `content-validation`

### S4: Wire CLI Init To Reuse Core Assets

- Goal: Replace duplicated embedded init content in `src/commands/init.ts` with imports or loading from core.
- Scope: `src/commands/init.ts`, import/export surfaces in `packages/core/**`, build/package config if required.
- Validation: `npm run build`; `npm run smoke:init`.
- gateClass: `boundary-sensitive`
- risk_score: `4`
- gateReasons: `cli-runtime`, `cross-package-reuse`, `asset-packaging`
- Critic: required before declaring done due to boundary-sensitive risk.

### S5: Final Packaging, Docs Routing, and Regression Validation

- Goal: Confirm package output includes needed core/CLI runtime files and update focused docs routing.
- Scope: `package.json`, `docs/project/knowledge-map.md`, focused `packages/core` docs, small validation fixes only.
- Validation: `npm run build`; `npm run smoke:init`; `npm pack --dry-run`; compare init output to baseline where practical; manual prohibited-content scan.
- gateClass: `boundary-sensitive`
- risk_score: `4`
- gateReasons: `package-files`, `release-surface`, `validation-gate`
- Critic: required before final done.

## Parallelization

No parallel execution recommended. Slices touch shared package/build and CLI-init surfaces and should run sequentially.

## Stop Conditions

- Stop if supporting `packages/core` requires a package-manager or monorepo migration not already approved.
- Stop if preserving CLI init compatibility conflicts with required core package shape.
- Stop if a proposed core asset needs provider/runtime/account/permission details to function.
- Stop if S1 cannot establish a runtime-safe asset representation and package inclusion strategy.
- Stop at analysis-to-coding gate before S1.

## Plan-Review Critic Notes

- Verdict: `PASS_WITH_WARNINGS`.
- Required adjustment applied: S1 now owns the asset-representation and packaging-strategy decision, with early package inclusion validation when needed.
- Optional adjustment applied: S1 captures a current `quill init` output baseline; later slices compare against it where practical.
- Residual warning: package/build and runtime asset availability remain the primary risk and are intentionally handled in S1/S4/S5 as boundary-sensitive work.
