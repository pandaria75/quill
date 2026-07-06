# Context Pack: Issue #26 Quill Core + Adapters Architecture Pivot

## Task Goal

Land GitHub issue #26 as documentation: reposition Quill from an independent CLI/container direction toward Quill Core plus adapters, with Hermes as the first adapter target and OpenCode/Pi later.

## Requirement Source

- `.task/2026-07-06/issue-26-quill-core-adapters-architecture/requirement.md`
- GitHub issue #26 content read through `gh issue view 26`.

## Implementation Source

- `.task/2026-07-06/issue-26-quill-core-adapters-architecture/implementation-plan.md`

## Current Phase

- phase: `coding`
- allowedToCode: `true`
- current approved slice: `S7`

## Gate Policy

- config/default: `balanced`
- allowTaskOverride: `true`
- recommended: `strict`
- selected: `autonomous`
- reason: User changed task policy to autonomous and asked not to pause for non-blocking issues; strict remains advisory because the task is architecture-sensitive. Mandatory stops still apply for boundary-sensitive, risk_score >= 4, critic-required, explicit stop, and final approval gates.
- finalApprovalRequired: `true`

## Tier Policy Context

- Source: project-local `.marionettist/tier-policy.yml`, valid.
- Selected tier: L.
- Tier L description: complex, cross-cutting, boundary-sensitive, or concretely high-risk work.
- Advisory hints:
  - workflowHint: `full-marionettist`
  - gateHint: `prefer-strict`
  - reviewLevel: `critic-required`
  - modelProfileHint: `think`
  - minTier: `L`
  - maxTier: `null`
- Note: Tier policy is advisory. Executable gate behavior comes from `docs/project/marionettist-workflow.md` and selected task gate policy.

## Knowledge And Docs Loaded

- `AGENTS.md`
- `marionettist.config.yaml`
- `.marionettist/model-profiles.yml`
- `.marionettist/tier-policy.yml`
- `docs/project/marionettist-workflow.md`
- `docs/project/knowledge-map.md`
- `README.md`
- `docs/target/architecture-intent.md`
- `docs/current/system-map.md`
- `docs/zh-CN/software-design.md`
- `docs/en/software-design.md`
- `docs/develop/00-vision.md`
- `docs/develop/02-roadmap.md`
- `docs/develop/05-marionettist-relationship.md`

## Allowed Modification Scope

- Documentation-only changes to the files listed in the implementation plan.

## Forbidden Modification Scope

- No production/runtime code changes.
- No adapter implementation.
- No model-calling changes.
- No removal of current CLI.
- No invented Hermes/OpenCode/Pi internals.

## Key Existing Context

- Existing public and develop docs strongly describe the current local CLI MVP.
- Issue #26 says this old direction should be reframed, not deleted: current CLI MVP becomes reference harness/prototype.
- `docs/target/architecture-intent.md` is still a template and may be supplemented by more specific target docs.
- `docs/project/knowledge-map.md` must be updated if new docs are added.

## Current Approved Slice Or Group

- `S7`: Cross-doc architecture consistency review.
- Scope: read/check all modified docs from S1 to S6; apply minor wording fixes only within those files.
- gateClass: `boundary-sensitive`
- risk_score: `4`
- gateReasons: `architecture-coherence`, `public-contract-finalization`
- Mandatory stop after completion: selected `autonomous` does not bypass final approval or risk_score >= 4 work.

## Validation Commands / Checks

- Manual Markdown structure and link review.
- Bilingual semantic consistency review for `docs/zh-CN/software-design.md` and `docs/en/software-design.md`.
- Search modified docs for old-positioning conflicts.
- Verify new docs are discoverable from `docs/project/knowledge-map.md`.
- Automated docs link check: `NOT_RUN` unless an existing project command is identified.

## Assumptions

- Issue #26 is authoritative for the route reset.
- Hermes internals are not known from repository docs yet; adapter docs should describe boundaries and responsibility categories only.
- OpenCode and Pi should be named as later targets, not designed in detail.

## Risks

- Confusing current implementation with target architecture.
- Over-claiming adapter capabilities.
- Bilingual docs drifting semantically.
- Public README and develop docs presenting different product centers.

## Stop Conditions

- Stop before editing product/docs deliverables until user confirms crossing the analysis-to-coding gate.
- Stop if a claim requires unknown Hermes/OpenCode/Pi runtime details.
- Stop at boundary-sensitive slices or `risk_score >= 4` work unless explicitly approved through the applicable gate.
