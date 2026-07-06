# Implementation Plan: Issue #26 Quill Core + Adapters Architecture Pivot

## Task Classification

- Workflow: docs
- Tier: L, architecture-sensitive documentation pivot
- Gate policy selected: `balanced`
- Final approval required: yes

## Allowed Scope

- Documentation-only changes to:
  - `README.md`
  - `docs/target/quill-core-architecture.md`
  - `docs/target/hermes-adapter-design.md`
  - `docs/target/architecture-intent.md` if needed
  - `docs/zh-CN/software-design.md`
  - `docs/en/software-design.md`
  - `docs/develop/00-vision.md`
  - `docs/develop/02-roadmap.md`
  - `docs/develop/05-marionettist-relationship.md`
  - `docs/project/knowledge-map.md`

## Forbidden Scope

- Production code changes.
- CLI/runtime implementation changes.
- Model/provider routing implementation.
- Hermes/OpenCode/Pi adapter code.
- Claims about Hermes/OpenCode/Pi internals beyond the issue text.
- Broad doc rewrites unrelated to the architecture pivot.
- Source-code indexes or exhaustive file/class inventories.

## Slices

### S1: Draft Quill Core architecture target

- File scope:
  - Add/update `docs/target/quill-core-architecture.md`
  - May reference `docs/target/architecture-intent.md`
- gateClass: `boundary-sensitive`
- risk_score: `4`
- gateReasons:
  - `architecture-pivot`
  - `public-project-direction`
  - `future-work-contract`
- Dependencies: none
- Done criteria:
  - States Quill as a writing-domain workflow kit.
  - Defines Core value: methodology, workflows, skills/prompts, artifact contracts, review gates, memory strategy.
  - Explicitly says Quill is not a model-running CLI/container, generic runtime, router/provider framework, publishing platform, or replacement for Hermes/OpenCode/Pi.
  - Frames old CLI MVP as current implementation/reference harness, not long-term center.
  - Does not invent Hermes/OpenCode/Pi internals.

### S2: Draft Hermes-first adapter design

- File scope:
  - Add/update `docs/target/hermes-adapter-design.md`
- gateClass: `boundary-sensitive`
- risk_score: `4`
- gateReasons:
  - `adapter-boundary`
  - `external-container-positioning`
  - `hermes-first-priority`
- Dependencies: `S1`
- Done criteria:
  - Describes Hermes as first target adapter/container.
  - Defines adapter responsibilities from issue context: execution integration, model config handoff, memory runtime/tool/runtime integration boundaries.
  - Leaves OpenCode/Pi as later adapters.
  - Avoids claiming Hermes APIs or internals not present in the issue.

### S3: Align bilingual software design docs

- File scope:
  - `docs/zh-CN/software-design.md`
  - `docs/en/software-design.md`
- gateClass: `standard`
- risk_score: `3`
- gateReasons:
  - `docs-public-facing`
  - `architecture-consistency`
  - `bilingual-sync`
- Dependencies: `S1`, `S2`
- Done criteria:
  - Both language docs consistently present Quill Core + adapters.
  - Hermes-first and OpenCode/Pi-later ordering is explicit.
  - Existing CLI/MVP content is preserved as current/reference implementation where accurate.
  - Chinese and English docs convey the same architecture claims.

### S4: Reposition README around Quill Core

- File scope:
  - `README.md`
- gateClass: `standard`
- risk_score: `3`
- gateReasons:
  - `project-entrypoint`
  - `public-positioning`
- Dependencies: `S1`, `S2`
- Done criteria:
  - README clearly states Quill Core + adapters direction.
  - Short-term priority says Core + Hermes adapter first.
  - OpenCode/Pi are named as later adapter targets.
  - Old CLI MVP is framed as current/reference harness, not product center.
  - Non-goals are visible enough to prevent misunderstanding.

### S5: Align development context docs

- File scope:
  - `docs/develop/00-vision.md`
  - `docs/develop/02-roadmap.md`
  - `docs/develop/05-marionettist-relationship.md`
- gateClass: `standard`
- risk_score: `3`
- gateReasons:
  - `strategy-docs`
  - `cross-doc-consistency`
- Dependencies: `S1`, `S2`
- Done criteria:
  - Vision and roadmap reflect Quill Core + Hermes-first adapter sequence.
  - Marionettist relationship is described as similar in workflow-kit spirit, without making Quill a clone or generic workflow runtime.
  - Future work is actionable from docs without source-code indexing.

### S6: Route new architecture docs in knowledge map

- File scope:
  - `docs/project/knowledge-map.md`
- gateClass: `standard`
- risk_score: `2`
- gateReasons:
  - `knowledge-routing`
  - `docs-discoverability`
- Dependencies: `S1`, `S2`
- Done criteria:
  - New target docs are discoverable from the knowledge map.
  - Routing distinguishes current docs from target architecture docs.
  - No docs are turned into file/class indexes.

### S7: Cross-doc architecture consistency review

- File scope:
  - Read/check all modified docs from `S1` to `S6`
  - Minor wording fixes only within those files
- gateClass: `boundary-sensitive`
- risk_score: `4`
- gateReasons:
  - `architecture-coherence`
  - `public-contract-finalization`
- Dependencies: `S1` to `S6`
- Done criteria:
  - No conflicting claims about Quill's product center.
  - Non-goals are consistent.
  - Hermes-first priority is consistent.
  - OpenCode/Pi are consistently later, not erased.
  - Docs remain design-oriented, not source-code indexes.

## Execution Notes

- Because `S1`, `S2`, and `S7` are boundary-sensitive with `risk_score: 4`, they require pauses/critic handling regardless of selected `balanced` mode.
- Under selected `balanced`, continuation may be possible only for already-approved `standard` slices with `risk_score <= 3` and no mandatory stop condition.
- Initial analysis-to-coding gate still requires explicit user confirmation.

## Validation Strategy

- Review rendered Markdown structure and relative links.
- Search modified docs for conflicting positioning such as Quill as an independent CLI/container or generic runtime.
- Check bilingual docs for semantic consistency.
- Verify new target docs are linked from `docs/project/knowledge-map.md`.
- If no docs validation command exists, record manual docs review as validation evidence with an explicit `NOT_RUN` for automated docs link checking.
