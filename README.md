# Quill

Quill is a local-first workflow CLI for high-quality content production. It is planned as the `@pandaria/quill` npm package.

Current status: early planning / MVP stage. The repository contains the project plan, MVP architecture notes, and a small TypeScript CLI skeleton. The CLI currently focuses on local workspace scaffolding and artifact status checks; model-backed writing workflow execution is still MVP work.

## Goals

Quill is designed to help produce editable Markdown artifacts for:

- technical blogs
- project promotion posts
- research notes
- long-form articles
- social post drafts
- video scripts
- story or script drafts

The first MVP is intentionally narrower: one fixed technical blog workflow that creates and updates `brief.md`, `sources.md`, `outline.md`, `draft.md`, `review.md`, and `final.md`.

## MVP Workflow

The planned MVP workflow is:

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

## What Works Now

- `quill --help` shows the CLI surface.
- `quill init` creates a local `.quill` workspace without overwriting existing files.
- `quill new <topic>` creates a local article workspace with Markdown artifacts.
- `quill status <article-slug>` reports whether each artifact exists, is empty, or has content.

## Planned MVP Commands

- `quill step <article-slug> <step>`: planned model-backed execution for one workflow step.
- `quill run <article-slug>`: planned full technical blog workflow execution.

The current skeleton includes guarded implementations for `step` and `run`. They require `QUILL_API_KEY` before model-backed generation and do not create empty final artifacts as fake success.

## Project Structure

```text
src/                 TypeScript CLI source
docs/develop/        planning, scope, architecture, and MVP implementation docs
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

Quill MVP does not depend on the Marionettist runtime. It should run as an independent local CLI. If Quill later produces stable workflow primitives, those primitives may feed back into Marionettist, but Quill should not wait for a shared core before shipping a vertical MVP.

## Roadmap

- P0: repository initialization, MIT license, docs, TypeScript CLI skeleton, GitHub issues and project linkage.
- P1: MVP local technical blog workflow from topic and sources to final Markdown.
- P2: quality improvements, style profiles, review checklist, checkpoints, repair and polish.
- P3: more writing workflow families.
- P4: Markdown block markers, then Article IR if justified.
- P5: feed stable workflow primitives back to Marionettist.
- P6: future platform integrations.

## Security And Privacy

Do not commit API keys, private article drafts, unpublished business plans, private style profiles, account configuration, or commercial content plans. Use `.env` locally and keep private articles under ignored paths such as `docs/articles/private/`.

## License

MIT License. See [LICENSE](./LICENSE).
