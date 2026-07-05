# Context Pack: Issue #19 Lightweight Checkpoint Result Format

## Task Goal

Land GitHub issue #19 by defining a lightweight checkpoint result format in docs and source types, without changing Quill runtime behavior.

## Requirement Source

- `.task/2026-07-03/land-issue-19-checkpoint-result-format/requirement.md`

## Implementation Source

- `.task/2026-07-03/land-issue-19-checkpoint-result-format/implementation-plan.md`

## Loaded Rules / Constraints

- `AGENTS.md`: use Marionettist gates for non-trivial work; do not code before analysis confirmation.
- `marionettist.config.yaml`: `knowledge.mode: mudball`, `knowledge.maturity: L1`, default gate policy `balanced`, final approval required.
- `.marionettist/tier-policy.yml`: project-local Tier policy valid; Tier L hints prefer strict and critic-required review.
- No `.aiassistant/rules/*.md` files found.

## Relevant Docs

- `docs/develop/10-artifact-spec.md`: artifact format and existing status vocabulary boundary.
- `docs/develop/04-workflow-design.md`: current workflow steps and `humanReview` metadata.
- `docs/current/system-map.md`: current-state knowledge location; currently sparse. Do not update in this slice to avoid partially filling a template for a format-only change.

## Relevant Source

- `src/workflows/runWorkflow.ts`: existing step result is `"generated" | "skipped"`; do not change in this slice.
- `src/artifacts/writeArtifact.ts`: existing write result pattern is lightweight string unions.
- `src/artifacts/artifactStatus.ts`: runtime detection status must remain separate.
- `src/index.ts`: possible public export point for the new type.

## Current Approved Slice

- `slice-1-format-docs-and-type`
- Gate class: `boundary-sensitive`
- risk_score: `4`
- Critic required before coding: yes, because Tier L / boundary-sensitive.

## Approved Checkpoint Result Format

- Verdict values: `pass`, `warn`, `fail`, `skip`.
- Required fields: `checkpoint`, `verdict`, `summary`.
- Optional fields: `issues`, `nextSteps`.
- Boundary: verdict values must remain distinct from artifact detection statuses, lifecycle/frontmatter statuses, and write results.
- Compile scope: `tsconfig.json` includes `src/**/*.ts`, so `src/checkpoints/checkpointResult.ts` is covered.

## Allowed Modification Scope

- `docs/develop/10-artifact-spec.md`
- `docs/develop/04-workflow-design.md`
- `src/checkpoints/checkpointResult.ts`
- `src/index.ts`

## Forbidden Modification Scope

- Runtime workflow execution behavior.
- Artifact persistence behavior.
- CLI command behavior or output.
- Model provider/config behavior.
- Any external account, secret, or personal configuration.

## Validation Commands

- `npm run check`

## Assumptions

- The MVP result format can be represented as TypeScript string unions and interfaces.
- A future task will decide persistence location and generation timing.

## Risks

- Blurring checkpoint verdicts with artifact detection or lifecycle statuses.
- Accidentally changing runtime behavior while adding a type.
- Over-designing a platform-like quality gate system.

## Stop Conditions

- Any need to change CLI/runtime behavior.
- Any need to decide checkpoint file path or persistence lifecycle.
- Type/docs disagreement on field names or verdict values.
- Any need to update `docs/current/system-map.md`; defer that to a broader current-state documentation task.
