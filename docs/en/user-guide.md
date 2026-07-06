# Quill MVP User Guide

## 1. What Quill Can Do Today

The current Quill MVP is meant for a local workflow where you create a writing workspace, manage a technical blog through several Markdown artifacts, and keep room for human editing throughout the process.

Today it mainly supports:

- initializing a local workspace
- creating a fixed article artifact structure
- checking artifact status
- running one workflow step
- running the full technical-blog workflow

If you expect a GUI, automatic web research, automatic publishing, or a multi-workflow platform, that is outside the current MVP.

## 2. Key Assumptions Before You Start

It helps to understand these facts first:

1. Quill is a local CLI, not an online SaaS product.
2. There is currently only one fixed workflow: `technical-blog`.
3. All important outputs are stored as local Markdown files.
4. `init`, `new`, and `status` do not require a model.
5. `step` and `run` require a model provider and API key when generation is needed.
6. Existing non-empty outputs are not overwritten by default unless you explicitly use `--force`.

## 3. Local Installation and Development Usage

The current repository is best suited for local development and evaluation. The basic setup flow is:

```bash
npm install
npm run check
npm run build
npm run dev -- --help
```

Meaning:

- `npm install`: install dependencies
- `npm run check`: run TypeScript type checking
- `npm run build`: build the CLI
- `npm run dev -- --help`: inspect the CLI surface through the local dev entrypoint

If you want to try commands directly from the repository, examples in this guide can usually be translated to:

```bash
npm run dev -- <command>
```

For example:

```bash
npm run dev -- init
```

## 4. Step One: Initialize a Workspace

Command:

```bash
quill init
```

If you are running from the repository without a global install, you can use:

```bash
npm run dev -- init
```

### 4.1 What It Does

`quill init` creates a local Quill workspace in the current directory. Typical contents include:

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

### 4.2 What You Should Expect

- it is repeatable
- it does not destroy existing files
- it prepares default config, templates, style, and workflow definition
- it creates `docs/articles/` for article workspaces

### 4.3 When to Run It

Run `quill init` first whenever the current directory does not already contain a Quill workspace. Without it, later commands may be missing required local files.

## 5. Step Two: Create an Article Workspace

Command:

```bash
quill new "Why Agent Coding Needs a Harness"
```

Repository dev mode form:

```bash
npm run dev -- new "Why Agent Coding Needs a Harness"
```

Optional form:

```bash
quill new "Topic" --workflow technical-blog --style default
```

### 5.1 What It Does

This command creates an article directory under `docs/articles/` and generates six fixed artifacts:

- `brief.md`
- `sources.md`
- `outline.md`
- `draft.md`
- `review.md`
- `final.md`

A typical layout looks like:

```text
docs/articles/2026-xx-xx-why-agent-coding-needs-harness/
  brief.md
  sources.md
  outline.md
  draft.md
  review.md
  final.md
```

### 5.2 What You Should Expect

- date and slug are generated automatically
- `brief.md` is closer to a task-definition file
- the other artifacts are created as editable Markdown
- no API key is required
- no model call is required

### 5.3 Recommended Next Action

After creation, it is a good idea to manually improve:

- the topic, audience, goal, and constraints in `brief.md`
- the notes, references, and verification points in `sources.md`

That makes later `outline`, `draft`, `review`, and `final` generation more grounded.

## 6. Step Three: Check Article Status

Command:

```bash
quill status <article-slug>
```

Dev mode example:

```bash
npm run dev -- status <article-slug>
```

### 6.1 What It Does

The command checks the six artifacts in the article directory and reports their current detected state.

### 6.2 Meaning of Current Status Labels

The current MVP uses **runtime detection labels**:

- `missing`: file does not exist
- `empty`: file exists but is empty
- `pending`: file exists but still looks like placeholder or waiting content
- `exists`: file exists and has content

These labels help you understand progress quickly, but they are not a full lifecycle management system.

### 6.3 When to Use It

It is useful when you want to:

- confirm the scaffold after creating an article
- check prerequisites before `step` or `run`
- inspect which outputs were already produced
- troubleshoot why a later step cannot continue

## 7. Step Four: Run One Step

Command:

```bash
quill step <article-slug> outline
```

Supported steps are fixed:

- `brief`
- `sources`
- `outline`
- `draft`
- `review`
- `final`

### 7.1 What It Does

When running one step, Quill reads:

- local configuration
- workflow definition
- style profile
- prerequisite artifacts

It then calls the model provider when needed and writes the result into the target Markdown artifact for that step.

### 7.2 Common Practical Sequence

Even though a single step can be run independently, the natural sequence is usually:

1. improve `brief.md`
2. improve `sources.md`
3. generate `outline`
4. generate `draft`
5. generate `review`
6. generate `final`

### 7.3 When `step` Is the Better Choice

Use `step` when:

- you want to advance only one stage
- you manually edited earlier artifacts and want to regenerate a later stage
- you do not want to execute the whole workflow at once

## 8. Step Five: Run the Full Workflow

Command:

```bash
quill run <article-slug>
```

### 8.1 What It Does

`quill run` executes the full fixed technical-blog workflow in order:

1. `brief`
2. `sources`
3. `outline`
4. `draft`
5. `review`
6. `final`

### 8.2 What You Should Expect

- sequential execution, not parallel execution
- existing non-empty artifacts are skipped or protected by default
- generation failure causes a clear stop
- earlier artifacts are not erased just because a later step fails

### 8.3 When `run` Is a Good Fit

Use it when:

- `brief.md` and `sources.md` are reasonably prepared
- you want to advance the whole article in order
- you want a realistic end-to-end trial of the workflow

## 9. API Key and Model Provider Setup

### 9.1 Current Default Assumption

The current MVP uses an OpenAI-compatible provider design and typically expects:

```bash
QUILL_API_KEY
```

That means generation commands read credentials from the environment variable at runtime.

### 9.2 Minimum Requirements

To validate real generation, you need at least:

- `QUILL_API_KEY` to be set
- a reachable OpenAI-compatible provider
- local configuration and network access that can actually reach that provider

### 9.3 Minimal Reminder

```bash
QUILL_API_KEY=...
```

The exact shell syntax may differ, but the requirement does not: **generation commands must be able to read that variable when they run.**

### 9.4 Important Clarification

The repository’s offline smoke checks do not prove successful live generation. Live generation is only verified when `QUILL_API_KEY` is intentionally provided and the provider is reachable.

## 10. What Happens Without an API Key

If `QUILL_API_KEY` is not set, the expected behavior is:

- `quill init`: works
- `quill new`: works
- `quill status`: works
- `quill step`: fails clearly when generation is required
- `quill run`: fails clearly when generation is required

You should not expect:

- successful generation without credentials
- empty output files being treated as success
- missing-credential errors being hidden

## 11. `--force` Overwrite Behavior

The current MVP protects existing non-empty artifacts by default.

That means:

- if the target output file already exists and is non-empty, Quill will not overwrite it by default
- only explicit `--force` means you intentionally want to replace that output

### 11.1 When to Be Careful

Be cautious when:

- you already manually edited `outline.md`, `draft.md`, `review.md`, or `final.md`
- you only want to continue the flow rather than regenerate the current output
- you are not sure whether you can easily recover the previous version

### 11.2 Recommended Habit

Before using `--force`, first:

- inspect the current artifact content
- commit or stash important work in Git
- make sure you know exactly which step output you want to replace

## 12. Validation and Smoke Recommendations

### 12.1 Default Offline Smoke

The baseline validation commands are:

```bash
npm run build
npm run smoke:mvp
```

They mainly validate:

- local scaffold behavior
- article artifact creation
- status logic
- clear no-key failure behavior

### 12.2 Real Live-Generation Validation

If you want to validate whether Quill can truly generate article content, use a controlled test workspace and run a flow like:

1. `quill init`
2. `quill new "Why Agent Coding Needs a Harness"`
3. `quill status <slug>`
4. `quill run <slug>`
5. `quill status <slug>`

And remember the required conditions:

- `QUILL_API_KEY` is provided
- the provider is reachable

## 13. Common Problems and Troubleshooting

### 13.1 `step` or `run` says the API key is missing

Check:

- whether `QUILL_API_KEY` is actually set
- whether the current shell passes it into the command process
- whether local config still points `apiKeyEnv` to `QUILL_API_KEY`

### 13.2 The article status is not what you expected

Check:

- whether the `article-slug` is correct
- whether the article directory really exists under `docs/articles/`
- whether the Markdown files exist, are empty, or still contain placeholder content

### 13.3 A step did not overwrite older output

That is usually the default protection behavior rather than a bug. Quill protects existing non-empty artifacts unless you explicitly choose `--force`.

### 13.4 Offline smoke passed, but live generation still fails

That is possible because offline smoke is not meant to prove live generation success. Live generation still depends on:

- your API key
- provider reachability
- correct network and local configuration

## 14. Final Boundary Reminder

To use Quill with the right expectations, keep these boundaries in mind:

- there is only one fixed technical-blog workflow today
- the main value is editable local artifacts, not maximum automation
- the current focus is one end-to-end article flow, not a general platform
- public docs describe current behavior and cautious extension points, not inflated roadmap promises

With those expectations, it becomes much easier to understand why Quill is designed this way and whether it fits your writing workflow today.
