# Quill

Quill is evolving toward **Quill Core plus adapters**: a writing-domain workflow kit whose methodology, prompts, skills, artifact contracts, and review discipline can travel across host environments.

Short-term priority: define **Quill Core** clearly and make **Hermes** the first serious adapter target. **OpenCode** and **Pi** are later adapter targets.

Current status: early planning / MVP stage. The repository still contains a small TypeScript CLI and related docs. That CLI is the **current implementation, reference harness, and prototype**, not the long-term product center.

Useful target-direction docs:

- [Quill Core Architecture Target](./docs/target/quill-core-architecture.md)
- [Hermes-First Adapter Design Target](./docs/target/hermes-adapter-design.md)

## What Quill Is And Is Not

Quill is intended to be:

- a writing workflow methodology packaged as reusable artifacts, prompts, skills, and review gates
- container-neutral at the core layer
- model-provider-neutral at the core layer
- memory-strategy-aware, not memory-runtime-owning
- adapter-oriented, with Hermes first and OpenCode/Pi later

Quill is not intended to become:

- a new agent container or standalone host runtime
- a generic workflow runtime
- a model router or provider framework
- a publishing platform
- a replacement for Hermes, OpenCode, or Pi

## Current Reference Harness

Today, the repository's main runnable embodiment is a local-first, artifact-first, Markdown-first CLI MVP. It remains useful as the current reference harness for learning what Quill Core and future adapters should preserve, but it is not the long-term product center.

## Goals

Quill is designed to help produce editable Markdown artifacts for:

- technical blogs
- project promotion posts
- research notes
- long-form articles
- social post drafts
- video scripts
- story or script drafts

The current CLI MVP is intentionally narrower: one fixed technical blog workflow that creates and updates `brief.md`, `sources.md`, `outline.md`, `draft.md`, `review.md`, and `final.md`.

## Current CLI MVP Workflow

The current MVP workflow is:

```text
topic / notes
  -> brief.md
  -> sources.md
  -> outline.md
  -> draft.md
  -> review.md
  -> final.md
```

Every stage leaves a Markdown artifact that can be edited by a person. Quill should not hide important state only in model context.

## What Works Now In The Reference Harness

- `quill --help` shows the CLI surface.
- `quill init` creates a local `.quill` workspace without overwriting existing files.
- `quill new <topic>` creates a local article workspace with Markdown artifacts.
- `quill status <article-slug>` reports file/content detection status for each artifact: `missing`, `empty`, `pending`, or `exists`.
- `quill step <article-slug> <step>` loads the configured workflow, reads the required input artifacts, calls the configured model provider, and writes the target artifact.
- `quill run <article-slug>` executes the fixed technical-blog workflow in order, prints per-step progress, and stops clearly on the first generation failure.

These runtime detection labels are separate from any future lifecycle/frontmatter labels such as `created`, `generated`, `edited`, `reviewed`, or `final`. The current MVP CLI reports the detection labels above; it does not enforce lifecycle statuses.

## Model-Backed Step Behavior In The Current CLI MVP

Current assumptions and guards:

- Run `quill init` first so local workflow, prompt, template, and checklist files exist under `.quill/`.
- `quill step` uses the selected workflow (default `technical-blog`) and resolves its output artifact from the step name: `brief`, `sources`, `outline`, `draft`, `review`, or `final`.
- The command requires the configured API key environment variable before generation. The default local config uses `QUILL_API_KEY` with the default OpenAI-compatible base URL `https://api.openai.com/v1`.
- In the current CLI MVP, provider credentials and model selection live in the local host/workspace configuration. In the target Core-plus-adapters direction, Quill Core should not own provider credentials, model account configuration, or host runtime selection.
- The OpenAI-compatible chat client is an internal implementation detail for current MVP capability, not a public API commitment.
- Existing non-empty output artifacts are protected from overwrite by default. Use `--force` only when you intentionally want to replace an existing non-empty artifact.
- Live provider execution depends on local credentials/network/config and should not be assumed from scaffold-only smoke checks.

Offline smoke coverage is available with:

```bash
npm run build
npm run smoke:mvp
```

This smoke covers local scaffold/status behavior plus the expected no-key failure path for `quill step` and `quill run`. It does not verify successful live generation; that still requires `QUILL_API_KEY` and provider access.

## Documentation

- 中文软件设计说明: [`docs/zh-CN/software-design.md`](./docs/zh-CN/software-design.md)
- 中文用户使用文档: [`docs/zh-CN/user-guide.md`](./docs/zh-CN/user-guide.md)
- English software design: [`docs/en/software-design.md`](./docs/en/software-design.md)
- English user guide: [`docs/en/user-guide.md`](./docs/en/user-guide.md)
- Target architecture: [`docs/target/quill-core-architecture.md`](./docs/target/quill-core-architecture.md)
- Hermes-first adapter target: [`docs/target/hermes-adapter-design.md`](./docs/target/hermes-adapter-design.md)

## Project Structure

```text
src/                 TypeScript CLI source for the current reference harness
docs/develop/        planning, scope, architecture, and MVP implementation docs
docs/target/         target-state Quill Core and adapter direction docs
docs/templates/      default writing templates
docs/examples/       public examples only
examples/articles/   placeholder for safe sample articles
```

## Local Development

```bash
npm install
npm run check
npm run build
npm run dev -- --help
```

To try the local scaffold commands:

```bash
npm run dev -- init
npm run dev -- new "为什么 Agent 编程需要 Harness"
npm run dev -- status <article-slug>
```

Model-backed commands will require:

```bash
QUILL_API_KEY=...
```

## Quill And Marionettist

Marionettist is the development harness for building Quill. Quill may borrow ideas from Marionettist such as workflow, skill, checkpoint, artifact, model role, and review gate.

The current CLI MVP does not depend on the Marionettist runtime. That independence is a fact about today's reference harness, not a statement that the long-term product center is a standalone CLI or host runtime. If Quill later produces stable workflow primitives, those primitives may feed back into Marionettist.

## Roadmap

This is a condensed summary of [`docs/develop/02-roadmap.md`](./docs/develop/02-roadmap.md). Keep phase numbers aligned with that detailed roadmap.

- P0: repository initialization, MIT license, docs, TypeScript CLI skeleton, GitHub issues and project linkage.
- P1: current CLI MVP for a local technical blog workflow from topic and sources to final Markdown.
- P2: clarify Quill Core contracts and architecture boundaries.
- P3: Hermes-first adapter design and integration path.
- P4: quality improvements, style profiles, review checklist, checkpoints, repair and polish.
- P5: more writing workflow families and stronger reusable workflow-kit assets.
- P6: careful Article Block / Article IR exploration if justified.
- P7: later adapters such as OpenCode and Pi, plus platform integrations only where they support the core workflow-kit direction.
- P8: two-way learning with Marionettist while keeping Quill workflow-kit-oriented rather than a Marionettist clone or generic runtime.

## Security And Privacy

Do not commit API keys, private article drafts, unpublished business plans, private style profiles, account configuration, or commercial content plans. Use `.env` locally and keep private articles under ignored paths such as `docs/articles/private/`.

## License

MIT License. See [LICENSE](./LICENSE).
