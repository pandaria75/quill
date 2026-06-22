# MVP Scope

Quill MVP is a local CLI that runs one fixed technical blog workflow and produces editable Markdown artifacts.

## In Scope

1. Local CLI skeleton.
2. `quill init` initializes a writing workspace.
3. `quill new <topic>` creates an article workspace.
4. `quill status <article-slug>` shows article artifact status.
5. `quill step <article-slug> <step>` executes one workflow step.
6. `quill run <article-slug>` executes the full workflow.
7. Fixed technical blog workflow.
8. Default style profile.
9. Review checklist.
10. Markdown artifacts.
11. Human approval points.
12. `brief.md`, `sources.md`, `outline.md`, `draft.md`, `review.md`, and `final.md`.

## Out Of Scope

1. Full Article AST.
2. Complex renderer.
3. Automatic publishing to WeChat, Juejin, Zhihu, Xiaohongshu, or other platforms.
4. Multi-platform plugins.
5. Full Hermes / Pi / OpenCode / Codex adaptation.
6. Complete shared foundation.
7. Complex model router.
8. Generic workflow engine.
9. Automatic web research.
10. Image generation workflow.
11. Full video script workflow.
12. Web UI.
13. Multi-user system.
14. Database.
15. Plugin marketplace.
16. Marionettist runtime dependency.

## MVP User Stories

### 1. Initialize Writing Workspace

Command:

```bash
quill init
```

Creates:

```text
.quill/
  quill.config.json
  styles/default.md
  templates/brief.md
  templates/sources.md
  templates/outline.md
  templates/draft.md
  templates/review.md
  templates/final.md
  workflows/technical-blog.json
docs/articles/
```

Acceptance criteria:

1. `quill init` can be repeated without destroying existing files.
2. Existing files are skipped or reported.
3. Default style profile is generated.
4. Default technical blog workflow is generated.
5. `docs/articles` exists.
6. Command output tells the user the next step.

### 2. Create Article Workspace

Command:

```bash
quill new "为什么 Agent 编程需要 Harness"
```

Creates:

```text
docs/articles/2026-xx-xx-why-agent-coding-needs-harness/
  brief.md
  sources.md
  outline.md
  draft.md
  review.md
  final.md
```

Acceptance criteria:

1. Slug is generated automatically.
2. Date is generated automatically.
3. Artifact structure is fixed.
4. All artifacts are human-editable Markdown.
5. No model is required to create the workspace.

### 3. View Article Status

Command:

```bash
quill status <article-slug>
```

Acceptance criteria:

1. Locates the article directory.
2. Checks whether each artifact exists.
3. Checks whether each artifact is empty.
4. Output is easy to scan.
5. No model is required.

### 4. Execute One Step

Command:

```bash
quill step <article-slug> outline
```

Supported steps: `brief`, `sources`, `outline`, `draft`, `review`, `final`.

Acceptance criteria:

1. Executes only the requested step.
2. Reads required inputs.
3. Writes Markdown output.
4. Does not overwrite existing non-empty content unless `--force` is used.
5. Gives clear errors.
6. Does not depend on Marionettist runtime.

### 5. Run Full Workflow

Command:

```bash
quill run <article-slug>
```

Acceptance criteria:

1. Runs steps in technical blog workflow order.
2. Ensures all six artifacts exist.
3. Keeps existing non-empty artifacts unless forced.
4. Leaves prior artifacts intact on failure.
5. Does not depend on Marionettist runtime.

### 6. Use Style Profile

`draft`, `review`, and `final` must read `.quill/styles/default.md`.

Acceptance criteria:

1. Style profile is plain Markdown.
2. Default profile contains no private information.
3. MVP only requires `default`.

### 7. Review And Repair Loop

`review.md` must examine structure, style, AI flavor, factual risks, and suggested fixes. `final.md` must use `draft.md`, `review.md`, and the style profile.
