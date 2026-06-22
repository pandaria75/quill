# MVP Implementation Plan

The MVP must be a vertical slice that can produce one technical blog article locally. It should not stop at framework scaffolding.

## Step 1: Project Skeleton

Implement README, LICENSE, package.json, tsconfig, `src/cli.ts`, and `docs/develop`.

Acceptance:

```bash
npm install
npm run check
npm run build
```

## Step 2: `quill init`

Generate:

```text
.quill/quill.config.json
.quill/styles/default.md
.quill/templates/brief.md
.quill/templates/sources.md
.quill/templates/outline.md
.quill/templates/draft.md
.quill/templates/review.md
.quill/templates/final.md
.quill/workflows/technical-blog.json
```

It must be repeatable and must not overwrite existing files.

## Step 3: `quill new`

Command:

```bash
quill new "topic"
```

Generate an article directory and six artifact files. `brief.md` includes topic, slug, status, workflow, style, and date frontmatter. Other artifacts include TODO placeholders.

## Step 4: `quill status`

Command:

```bash
quill status <article-slug>
```

Show whether each artifact is missing, empty, pending, or has content.

## Step 5: LLM Client

Implement one OpenAI-compatible chat completions client. It only supports text input/output and does not support streaming, tool calling, web research, image generation, or model routing.

## Step 6: Prompt Templates

Implement prompt templates for brief, sources, outline, draft, review, and final.

## Step 7: `quill step`

Command:

```bash
quill step <article-slug> <step>
```

Initial priority: `outline`, `draft`, `review`, and `final`. `brief` and `sources` may start as templates and later support generation.

## Step 8: `quill run`

Command:

```bash
quill run <article-slug>
```

Run the fixed technical blog workflow in order. Skip existing non-empty artifacts unless forced.

## Step 9: Real Example

Add a public, non-private example under `docs/examples/technical-blog/`.

## Step 10: MVP Smoke Test

Run:

```bash
quill init
quill new "为什么 Agent 编程需要 Harness"
quill step <slug> outline
quill step <slug> draft
quill step <slug> review
quill step <slug> final
quill status <slug>
```

Final result: all artifacts exist and `final.md` has readable Markdown content.

## User Stories

The MVP includes the seven user stories from `01-mvp-scope.md`: initialize workspace, create article, view status, execute step, run workflow, use style profile, and review-repair loop.
