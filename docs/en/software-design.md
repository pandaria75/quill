# Quill Software Design

## 1. Document Purpose

This document explains both the current Quill MVP and its approved architecture direction for users and contributors who want a clear public understanding of what it does today, where the product center is moving, how the workflow operates, which artifacts it produces, and which capabilities are intentionally out of scope.

Quill's long-term center of gravity is **Quill Core plus adapters**: a writing-domain workflow kit whose methodology, artifacts, prompts, skills, and review discipline can travel across host environments. Quill is not meant to become a new container, a generic runtime, a model-router framework, or a replacement for Hermes, OpenCode, or Pi.

Today, Quill is still mainly exposed through a **local-first, artifact-first, Markdown-first** CLI MVP focused on helping a user produce one technical blog article through a fixed workflow. That CLI remains the current implementation, reference harness, and prototype for learning what Quill Core and future adapters should preserve.

## 2. MVP Goals and Boundaries

### 2.0 Target Direction vs Current Implementation

- **Target direction:** Quill Core plus adapters
- **First serious adapter target:** Hermes
- **Later adapter targets:** OpenCode and Pi
- **Current implementation/reference embodiment:** the standalone CLI MVP documented in the rest of this file

So this document keeps current CLI facts intact while framing them as current-state/reference behavior, not as the final product center.

### 2.1 Current Goal

The current MVP goal is narrow and practical:

- provide a locally runnable CLI
- support one fixed `technical-blog` workflow
- split writing into editable Markdown artifacts
- let the user inspect, edit, and keep content at every stage
- call a configured OpenAI-compatible provider when generation is needed

### 2.2 What Is Included Today

The current public MVP includes these capabilities:

- `quill init`: initialize a local Quill workspace
- `quill new <topic>`: create an article workspace
- `quill status <article-slug>`: inspect article artifact status
- `quill step <article-slug> <step>`: execute one workflow step
- `quill run <article-slug>`: execute the full workflow in fixed order

The core artifacts are fixed as:

- `brief.md`
- `sources.md`
- `outline.md`
- `draft.md`
- `review.md`
- `final.md`

### 2.3 What Is Intentionally Out of Scope

The current MVP deliberately does not include:

- a generic workflow DSL
- branches, loops, concurrency, or multi-agent collaboration
- automatic web research
- automatic publishing to content platforms
- a database, web UI, or multi-user system
- a plugin marketplace or complex plugin system
- complex model routing
- image generation or multimodal input
- a Marionettist runtime dependency

The best way to understand Quill today is not as an early general platform, but as **a current CLI embodiment of a writing workflow kit that is expected to evolve toward Quill Core plus adapters**.

## 3. Design Principles

### 3.1 Local First

Quill runs primarily in local folders. Workspaces, article directories, configuration, templates, style files, and generated results are stored on the local filesystem. This matters because:

- users can directly inspect and edit content
- Git can track the work naturally
- important state is not hidden in remote services or transient memory
- existing local artifacts remain available even if model generation fails

### 3.2 Artifact First

Quill is designed around files, not around a hidden continuous conversation.

Each workflow stage is expected to leave a clear Markdown artifact instead of keeping critical context only inside model session state. This improves:

- reviewability
- traceability
- resilience against lock-in
- human-and-model collaboration

### 3.3 Markdown First

The MVP uses ordinary Markdown rather than a more complex renderer or internal representation. This keeps the system:

- readable
- editable
- diff-friendly
- easy to adopt

### 3.4 Human in the Loop

Quill does not try to fully automate publishing in the MVP. Its purpose is to speed up production of editable drafts, not to replace user judgment. In practice:

- users can edit Markdown at any stage
- `sources`, `outline`, and `final` are treated as important human review points
- `review.md` is used to expose structure issues, style issues, AI flavor, and factual risks

### 3.5 Guarded Model Usage

Model-backed behavior is part of the MVP, but it is not treated as unconditional background magic. Quill sets explicit safety boundaries around generation:

- a local workspace and article artifacts must exist first
- the required API key environment variable must be available
- existing non-empty outputs are protected by default
- live generation success depends on credentials, network, and provider reachability

### 3.6 Core-First, Adapter-Oriented Direction

The approved architecture direction is to keep Quill Core:

- container-neutral
- model-provider-neutral
- memory-strategy-aware but not memory-runtime-owning
- responsible for workflow methodology, artifact contracts, prompts/skills, and review gates

In that direction, adapters are where host-specific execution concerns begin. Hermes is the first target adapter, while OpenCode and Pi are later targets. This document does not define their internals or APIs.

## 4. Runtime Shape and Directory Roles

Quill has two different layers worth separating in practice: the target architecture layer and the current MVP runtime layer.

### 4.0 Target Architecture Layer

At the target-state design level:

- Quill Core carries the reusable writing workflow kit
- adapters let that core run inside concrete host environments
- Hermes is the first adapter priority
- OpenCode and Pi are later adapter targets

This layer describes product direction, not a claim that those adapters already exist in this repository.

### 4.1 Repository-Level Resources

The repository includes:

- project documentation
- default templates and examples
- the TypeScript CLI implementation
- local development and smoke-validation scripts

These materials mainly support development, understanding, and local evaluation of the current CLI/reference implementation.

### 4.2 User Workspace Resources

After `quill init`, a local workspace is created in the current directory. Typical contents include:

- `.quill/quill.config.json`
- `.quill/styles/default.md`
- `.quill/templates/*.md`
- `.quill/workflows/technical-blog.json`
- `docs/articles/`

In this structure:

- `.quill/` stores local config, templates, style, and workflow definitions
- `docs/articles/` stores per-article artifact directories

This means Quill keeps both system-facing settings and user-facing writing outputs as visible local files.

## 5. Technical-Blog Workflow Design

The current MVP has exactly one fixed workflow: `technical-blog`.

### 5.1 Step Order

The workflow order is:

1. `brief`
2. `sources`
3. `outline`
4. `draft`
5. `review`
6. `final`

### 5.2 Responsibility of Each Step

- `brief`: clarify topic, audience, core message, angle, constraints, and notes
- `sources`: organize user-provided references, notes, verification points, and missing information
- `outline`: produce article structure
- `draft`: produce the first full draft
- `review`: inspect structure, style, AI flavor, factual risks, and suggested fixes
- `final`: revise and polish using `draft.md` and `review.md`

### 5.3 Why the Workflow Is Fixed

The MVP intentionally does not become a generic workflow engine yet. The reason is to:

- validate whether one end-to-end flow is genuinely useful
- reduce conceptual complexity
- avoid premature DSL or plugin design
- focus on stable production of one technical blog article

So the current design emphasizes **usefulness of a fixed workflow**, not platform-grade extensibility.

## 6. Artifact Model

### 6.1 Article Workspace Layout

Each article lives in a fixed directory structure:

```text
docs/articles/<date>-<slug>/
  brief.md
  sources.md
  outline.md
  draft.md
  review.md
  final.md
```

### 6.2 Artifact Responsibilities

- `brief.md`: defines the writing task itself
- `sources.md`: collects user-provided information and verification needs
- `outline.md`: carries article structure
- `draft.md`: carries the first full draft
- `review.md`: carries quality feedback and repair suggestions
- `final.md`: carries the revised publishable Markdown draft

### 6.3 Status Concepts

Quill currently distinguishes between two kinds of status concepts:

1. **runtime detection status** reported by `quill status`: `missing`, `empty`, `pending`, `exists`
2. **possible future lifecycle status** such as `created`, `generated`, `edited`, `reviewed`, `final`

Only the first kind is active public behavior in the current MVP. The second is reserved vocabulary and should not be interpreted as a fully enforced lifecycle system today.

### 6.4 Non-Overwrite Principle

Quill explicitly avoids silently overwriting user work:

- existing non-empty output files are protected by default
- only explicit `--force` indicates intentional replacement

This is a core boundary because the artifacts themselves are the main working surface for the user.

## 7. Command Behavior Design

### 7.1 `quill init`

Responsibility: initialize the local workspace.

Design characteristics:

- repeatable
- does not destroy existing files
- creates default config, templates, style, and workflow definition
- tells the user what to do next

### 7.2 `quill new <topic>`

Responsibility: create a new article directory with the six artifact files.

Design characteristics:

- auto-generates date and slug
- uses a fixed artifact structure
- does not require a model
- writes task-defining information into `brief.md` and editable placeholders elsewhere

### 7.3 `quill status <article-slug>`

Responsibility: inspect artifact existence and content state for a given article.

Design characteristics:

- focuses on visible artifact state
- should be easy to scan
- does not depend on model access

### 7.4 `quill step <article-slug> <step>`

Responsibility: run only one requested step.

Design characteristics:

- reads local config, workflow, style, and prerequisite artifacts
- calls the provider when generation is needed
- writes the result back to the target Markdown artifact
- protects non-empty files by default
- fails clearly when the API key is missing

### 7.5 `quill run <article-slug>`

Responsibility: execute the full technical-blog workflow in fixed order.

Design characteristics:

- runs steps sequentially
- skips or protects existing non-empty artifacts by default
- stops clearly on generation failure
- keeps prior artifacts intact when a later step fails

## 8. Model Provider Design

### 8.1 Current Support Scope

The current MVP is designed around **one OpenAI-compatible Chat Completions client**.

That makes it naturally compatible with:

- official OpenAI-style endpoints
- proxy or hosted compatible services
- local or private systems that expose an OpenAI-compatible API

### 8.2 Configuration Shape

The local workspace config `.quill/quill.config.json` defines:

- provider type
- `baseUrl`
- `apiKeyEnv`
- default model
- model names by role
- article, style, and workflow paths

The documented default API key environment variable is:

```bash
QUILL_API_KEY
```

### 8.3 Role-Based Model Naming

Model names are organized by task role rather than vague cost tiers, for example:

- `planning`
- `drafting`
- `reviewing`
- `polishing`

This keeps configuration closer to workflow responsibility.

### 8.4 No-Key Behavior

When `QUILL_API_KEY` is not provided:

- `quill init` should still work
- `quill new` should still work
- `quill status` should still work
- `quill step` and `quill run` should fail clearly when generation is needed

This is an important MVP boundary: **missing credentials must not be disguised as success, and Quill must not claim success after producing empty output.**

### 8.5 Boundary Around Live Verification

The public documentation can safely state only that:

- offline smoke validates the no-key failure path
- successful live generation requires an intentionally provided `QUILL_API_KEY` and a reachable provider

Without those conditions, live generation should not be claimed as verified.

## 9. Validation and Smoke Expectations

### 9.1 Default Offline Smoke

The recommended baseline validation is:

```bash
npm run build
npm run smoke:mvp
```

This primarily covers:

- local workspace initialization
- article scaffold creation
- status behavior
- no-key failure behavior for model-backed commands

### 9.2 What It Does Not Prove

The baseline smoke does **not** prove that:

- live generation succeeds end to end
- the external provider is reachable
- the local credential and network setup is correct

### 9.3 Preconditions for Live Manual Validation

To validate real generation, the user needs at least:

- a configured `QUILL_API_KEY`
- a reachable provider
- a clean test workspace where `quill init`, `quill new`, `quill run`, and `quill status` can be exercised

## 10. Relationship to Marionettist

Marionettist currently acts as the **engineering harness used to build Quill**, not as part of the Quill runtime or as Quill's future host architecture by default.

That distinction matters because:

- Quill MVP should run as an independent local CLI
- users should not need Marionettist runtime knowledge to use Quill
- shared ideas do not imply a shared runtime dependency today

Likewise, Quill's future adapter strategy should not be read as turning Quill into a Marionettist clone or another general-purpose runtime.

## 11. Non-Goals and Extension Points

### 11.1 Current Non-Goals

The following should not be interpreted as implemented capability:

- a general multi-workflow platform
- publishing integrations
- automatic research agents
- multi-model collaboration systems
- a graphical interface
- team-oriented content collaboration infrastructure

### 11.2 Explicit Future Extension Points

The current design leaves room for future expansion, but these are directions rather than promises:

- more workflow families
- richer style and quality-check structures
- extended artifact metadata or lightweight checkpoint results
- a Hermes adapter first
- later adapters for OpenCode and Pi

These should be understood as possible future evolution, not current product guarantees.

## 12. One-Sentence Summary

Quill is moving toward a Core-plus-adapters architecture, but today its reference implementation is a local CLI for one fixed technical-blog workflow: it breaks writing into explicit Markdown artifacts, uses an OpenAI-compatible model provider when generation is needed, and keeps human-visible, human-editable, persistent local files at the center.
