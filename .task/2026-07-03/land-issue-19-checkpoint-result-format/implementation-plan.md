# Implementation Plan: Issue #19 Lightweight Checkpoint Result Format

## Tier / Gate Posture

- Tier: L (workflow/quality semantics touch multiple conceptual areas, even though implementation should be small)
- gatePolicy.recommended: `strict`
- gatePolicy.selected: `strict`
- Reason: checkpoint result semantics affect future quality gates and must not blur existing status vocabularies.
- finalApprovalRequired: `true`

## Approved Slices

### slice-1-format-docs-and-type

- Goal: Define the lightweight checkpoint result format in docs and source types without runtime behavior changes.
- Gate class: `boundary-sensitive`
- risk_score: `4`
- Gate reasons:
  - `workflow-quality-semantics`
  - `status-vocabulary-boundary`
  - `future-extension-point`
- Allowed files:
  - `docs/develop/10-artifact-spec.md`
  - `docs/develop/04-workflow-design.md`
  - `src/checkpoints/checkpointResult.ts`
  - `src/index.ts`
- Forbidden scope:
  - runtime workflow execution behavior
  - artifact write/read behavior
  - CLI commands and output behavior
  - model/provider configuration
  - persistence of checkpoint files
- Implementation notes:
  - Add string-union style types consistent with existing lightweight result patterns.
  - Use approved verdict values: `pass`, `warn`, `fail`, `skip`.
  - Use approved fields: required `checkpoint`, `verdict`, `summary`; optional `issues`, `nextSteps`.
  - Keep verdict values distinct from artifact detection statuses (`missing`, `empty`, `pending`, `exists`), lifecycle/frontmatter statuses (`created`, `generated`, `edited`, `reviewed`, `final`), and write results (`created`, `updated`, `skipped`).
  - Keep names generic enough for quality gates, not tied to Marionettist.
  - Add `src/checkpoints/checkpointResult.ts` for the type definitions.
  - Export the type from `src/index.ts` with TypeScript type-only syntax: `export type { CheckpointResult, CheckpointVerdict } from "./checkpoints/checkpointResult.js";`.
  - Do not use a bare runtime export for checkpoint types.
  - `tsconfig.json` includes `src/**/*.ts`, so `src/checkpoints/checkpointResult.ts` is inside the compile scope.
  - Do not update `docs/current/system-map.md` in this slice; it is currently a sparse template and this format-only change should not partially fill it with non-system-map content.
- Validation:
  - `npm run check`
- Done criteria:
  - Docs and source agree on field names and verdict values.
  - TypeScript compile check passes.
  - Review confirms no runtime behavior changed.

## Test Strategy

### Selected Strategy

- Task type: feature
- Change type: documentation plus source-level TypeScript type/schema
- Strategy summary: use TypeScript compile checking plus diff review for semantic boundary preservation.

### Required Evidence

- Protect current CLI behavior by avoiding command/workflow runtime edits.
- Protect existing status semantics by documenting checkpoint verdicts separately.

### Validation Approach

- Automated tests: `npm run check`
- Smoke checks: not required because runtime behavior is unchanged.
- Manual checks: reviewer verifies docs/source field alignment and no runtime behavior changes.

### NOT_RUN Conditions

- CLI smoke checks may be `NOT_RUN` if no CLI files are modified.
