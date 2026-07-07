# Quill Core

## S1 Design Decision

- Asset representation: compiled TypeScript exports/constants.
- Packaging strategy: build `packages/core` with its own `tsconfig.json`, publish the built output via the root package, and expose it through the root subpath export `@pandaria/quill/core`.
- Why: this keeps `src/` and the current CLI build layout stable, avoids a package-manager/monorepo migration, and gives later slices a runtime-safe import target.

## Current `quill init` Baseline

Before any asset migration, `quill init` currently generates these `.quill/` files:

- `.quill/quill.config.json`
- `.quill/checklists/review.md`
- `.quill/prompts/brief.md`
- `.quill/prompts/sources.md`
- `.quill/prompts/outline.md`
- `.quill/prompts/draft.md`
- `.quill/prompts/review.md`
- `.quill/prompts/final.md`
- `.quill/styles/default.md`
- `.quill/templates/brief.md`
- `.quill/templates/sources.md`
- `.quill/templates/outline.md`
- `.quill/templates/draft.md`
- `.quill/templates/review.md`
- `.quill/templates/final.md`
- `.quill/workflows/technical-blog.json`

Later slices should preserve compatible generated output unless an approved requirement intentionally changes it.

## Packaging and Local Dev Notes

- The published/runtime entrypoint is the root package subpath export `@pandaria/quill/core`.
- Final package validation should include `packages/core/dist`, `packages/core/package.json`, and this README alongside the root `dist/` output.
- Current local `npm run dev` uses `tsx src/cli.ts`, but `src/commands/init.ts` imports `@pandaria/quill/core` through the root package export, so local dev currently depends on prebuilt `packages/core/dist` being present.
