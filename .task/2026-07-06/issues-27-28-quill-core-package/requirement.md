# Requirement: Issues #27 and #28 Quill Core Package

## Source

- GitHub issue #27: Establish Quill Core file package structure
- GitHub issue #28: Migrate technical-blog workflow into Quill Core skills and prompts
- User confirmations on 2026-07-06:
  - Use `packages/core` as the core package location.
  - Update CLI init to consume/reuse core assets in this task.
  - Treat Quill writing skills as core package assets/templates, not OpenCode or Marionettist runtime skills.
  - Ignore the old MVP doc guidance about delaying shared core.
  - Select task gate policy `autonomous`.

## Goal

Create the first portable Quill Core package and migrate the `technical-blog` workflow into core assets that current CLI init can consume.

## Required Outcomes

1. A `packages/core` package structure exists and is documented.
2. `technical-blog` exists as a core workflow asset with the six-step flow:
   - `topic / notes -> brief.md -> sources.md -> outline.md -> draft.md -> review.md -> final.md`
3. Each workflow step has a core writing-skill/template contract covering:
   - purpose
   - inputs required
   - expected output artifact
   - prompt template or prompt section
   - memory read recommendations
   - memory write recommendations, if any
   - human review/gate expectations
   - validation/checkpoint criteria
   - red flags and stop conditions
4. Core assets are portable and Markdown-first.
5. Core explicitly separates source/evidence organization from automatic web research.
6. Core avoids provider-specific model IDs, API keys, runtime permission policies, model account selection, concrete memory storage implementation, and command/tool scheduling behavior.
7. Current `quill init` behavior is updated to consume/reuse the core assets while preserving compatible generated output unless an issue requirement explicitly changes it.
8. `docs/project/knowledge-map.md` routes readers to new core docs if new docs are added.

## Non-Goals

- Implementing Hermes adapter.
- Implementing OpenCode or Pi adapters.
- Adding a generic workflow engine.
- Adding automatic web research.
- Adding publishing integrations.
- Reworking unrelated CLI commands or LLM client behavior.
- Updating the old MVP architecture note solely to resolve the historical “delay shared core” wording.

## Assumptions

- `packages/core` may require build/package configuration changes because current `tsconfig.json` uses `rootDir: "src"` and `include: ["src/**/*.ts"]`.
- Core writing skills may use `SKILL.md`-style or template-style Markdown files, but they are Quill assets, not agent runtime skills.
- CLI reuse may be implemented through exported constants/modules or packaged asset loading, whichever fits the current TS build with the smallest safe change.

## Risks

- Package/build boundary changes may affect release contents or runtime asset availability.
- CLI init output may regress if migrated templates differ from current embedded strings.
- Core assets may accidentally include runtime/provider concerns unless reviewed explicitly.

## Acceptance Evidence

- Build succeeds.
- Core package/assets exist under `packages/core`.
- CLI init uses the core asset source rather than maintaining separate embedded copies.
- Technical-blog step contracts contain the required sections.
- Manual content review confirms no provider IDs, API keys, runtime permission policies, model accounts, or concrete storage/runtime scheduling behavior are embedded in core.
