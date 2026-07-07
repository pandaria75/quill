# Issues #31/#32 Public Docs Pivot Requirement

## Source

- GitHub issue #31: `[Task] Reposition existing CLI as reference harness, not primary product direction`
- GitHub issue #32: `[Docs] Update public bilingual docs for Quill Core plus Hermes-first direction`
- User selected option B: a more thorough public docs polish rather than only minimal user-guide patches or structural CLI movement.

## Task Type And Tier

- Type: documentation
- Tier: M
- Tier policy source: project-local `.marionettist/tier-policy.yml`, parsed successfully.
- Tier M fields:
  - description: standard clear-scope work that benefits from analysis context before coding
  - matchRules: small or medium docs task with clear scope; more than trivial complexity but no sensitive production/security/compatibility impact
  - workflowHint: analysis-context
  - gateHint: default
  - reviewLevel: standard
  - modelProfileHint: build
  - minTier: M
  - maxTier: M

## Goal

Systematically align public bilingual documentation with the clarified product direction:

1. current implementation includes a CLI MVP/reference harness;
2. future center of gravity is Quill Core plus adapters;
3. Hermes is the short-term adapter target;
4. OpenCode and Pi are later adapter targets;
5. Quill Core should not own provider credentials or model account configuration;
6. existing containers should provide runtime, memory, tools, and model selection.

## Current Evidence

Existing docs already contain substantial pivot language:

- `README.md` states Quill is evolving toward Core plus adapters, Hermes first, and the current CLI is the current implementation/reference harness/prototype.
- `docs/en/software-design.md` and `docs/zh-CN/software-design.md` already distinguish target direction from current implementation and keep current CLI facts intact.
- `docs/target/quill-core-architecture.md` and `docs/target/hermes-adapter-design.md` capture target-state architecture and Hermes-first boundaries.
- `docs/project/knowledge-map.md` routes target architecture, Hermes adapter direction, and current Hermes adapter MVP docs.

Observed gap for option B:

- `docs/en/user-guide.md` and `docs/zh-CN/user-guide.md` remain mostly CLI-only and should be framed more explicitly as current reference-harness guides.
- Public docs should be checked as a set for repeated phrases that could still imply a standalone CLI/container as the long-term center.
- Provider credential wording should distinguish current CLI behavior from target Core/adapters responsibility boundaries.

## In Scope

- Public docs polish for:
  - `README.md`
  - `docs/en/software-design.md`
  - `docs/zh-CN/software-design.md`
  - `docs/en/user-guide.md`
  - `docs/zh-CN/user-guide.md`
  - `docs/project/knowledge-map.md` only if routing needs adjustment
- Preserve bilingual semantic alignment for English and Chinese docs.
- Preserve current-vs-target wording: do not claim Hermes adapter capabilities are fully complete unless current docs already support the claim.
- Keep docs product/workflow/architecture-oriented, not source-code indexes.

## Out Of Scope

- Moving, deleting, or renaming CLI code.
- Large source refactor.
- Implementing Quill Core files beyond existing docs.
- Implementing or changing Hermes adapter behavior.
- Removing model client code.
- Changing build, package, release, or provider credential behavior.
- Closing GitHub issues automatically unless the user explicitly asks.

## Acceptance Criteria

- Repository docs clearly say the CLI is not the long-term center of gravity.
- The CLI remains described as current/prototype/reference, not erased.
- Chinese and English public docs remain semantically aligned.
- Target architecture is described without claiming it is already fully implemented.
- No public docs imply Quill is primarily a standalone model-running container.
- Future contributors know to build Core and adapters first.
- Quill Core is clearly separated from provider credentials/model account configuration; adapters/hosts provide runtime, memory, tools, and model selection.
- Existing smoke coverage remains described as useful current/reference harness coverage.
- Knowledge map routing remains accurate if docs or routing meaning changes.

## Gate Policy

- config/default: balanced
- allowTaskOverride: true
- recommended: balanced
- selected: balanced
- reason: clear documentation task with bounded public-doc scope; no code/runtime changes; final approval remains required by default.
- finalApprovalRequired: true

## Open Questions

- None blocking after user selected option B.
