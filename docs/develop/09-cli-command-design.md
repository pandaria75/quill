# CLI Command Design

## `quill --help`

Shows command descriptions and options.

## `quill init`

Creates the local Quill workspace:

```text
.quill/
  quill.config.json
  styles/default.md
  templates/*.md
  workflows/technical-blog.json
docs/articles/
```

It never overwrites existing files.

## `quill new`

Command:

```bash
quill new "文章选题"
```

Options:

```bash
quill new "文章选题" --workflow technical-blog --style default
```

Behavior:

- creates `docs/articles/<date>-<slug>/`
- creates all six artifact files
- writes topic and frontmatter into `brief.md`
- writes TODO placeholders into other artifacts
- does not require a model

## `quill status`

Command:

```bash
quill status <article-slug>
```

Behavior: display artifact status for `brief.md`, `sources.md`, `outline.md`, `draft.md`, `review.md`, and `final.md`.

## `quill step`

Command:

```bash
quill step <article-slug> outline
```

Supported steps:

- `brief`
- `sources`
- `outline`
- `draft`
- `review`
- `final`

Behavior:

- reads config, workflow, style profile, and previous artifacts
- calls the model for the current step
- writes Markdown output
- does not overwrite non-empty files unless `--force` is used
- fails clearly if API key is missing

## `quill run`

Command:

```bash
quill run <article-slug>
```

Behavior:

- runs steps in workflow order
- skips existing non-empty artifacts by default
- prints before and after status
- preserves existing artifacts on failure
