# Roadmap

## P0: Project Initialization

Create repository, MIT License, README, planning docs, TypeScript CLI skeleton, GitHub issues, and Project linkage.

## P1: Current CLI Reference Harness

Run the minimal article generation chain:

```text
topic / sources -> brief -> outline -> draft -> review -> final
```

The output must be editable Markdown and the CLI must work locally. This phase establishes a usable reference harness, not the final product center.

## P2: Clarify Quill Core

Document and stabilize the portable writing-kit center:

- workflow methodology and step shape
- prompts, skills, and execution guidance
- artifact contracts such as plans, context packs, and review outputs
- review gates and safety policies
- memory-strategy expectations and adapter-facing boundaries

## P3: Hermes-First Adapter Design

Define Hermes as the first serious adapter target.

Focus on responsibility boundaries only:

- hosting and execution integration
- model configuration handoff
- memory/runtime boundary
- tool/runtime integration boundary
- artifact and review-gate handoff

OpenCode and Pi stay later adapter targets.

## P4: Quality Enhancement

Improve article quality and reduce AI flavor with better style profiles, review checklists, checkpoint results, rewrite, repair, and polish capabilities.

## P5: Workflow Expansion

Add more content workflow families:

- technical blog
- project promotion
- research note
- WeChat long-form article
- Bilibili video script
- Xiaohongshu / Zhihu social post

## P6: Article Block / Article IR Exploration

Evolve carefully:

```text
Markdown
  -> Markdown + Frontmatter
  -> Markdown + Block Markers
  -> Article IR
  -> Article AST
  -> Renderer / Multi-platform Output
```

Do not start with a full AST.

## P7: Later Adapters And Platform Integrations

After the Core boundary and Hermes path are clearer, later exploration may include:

- OpenCode adapter
- Pi adapter
- other platform integrations only where they serve the core writing workflow kit

These are not near-term priorities.

## P8: Two-way Learning With Marionettist

Stable workflow, artifact, checkpoint, model role, and review gate mechanisms from Quill may feed back into Marionettist. The relationship should stay workflow-kit-oriented rather than turning Quill into a Marionettist clone or a generic runtime layer.
