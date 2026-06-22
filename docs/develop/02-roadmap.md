# Roadmap

## P0: Project Initialization

Create repository, MIT License, README, planning docs, TypeScript CLI skeleton, GitHub issues, and Project linkage.

## P1: Quill MVP

Run the minimal article generation chain:

```text
topic / sources -> brief -> outline -> draft -> review -> final
```

The output must be editable Markdown and the CLI must work locally.

## P2: Quality Enhancement

Improve article quality and reduce AI flavor with better style profiles, review checklists, checkpoint results, rewrite, repair, and polish capabilities.

## P3: Workflow Expansion

Add more content workflow families:

- technical blog
- project promotion
- research note
- WeChat long-form article
- Bilibili video script
- Xiaohongshu / Zhihu social post

## P4: Article Block / Article IR Exploration

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

## P5: Two-way Learning With Marionettist

Stable workflow, artifact, checkpoint, model role, and review gate mechanisms from Quill may feed back into Marionettist. Marionettist may later become a shared Agent Workflow Harness across coding, writing, research, and ops workflows.

## P6: Platform Adaptation

Future exploration may include Hermes plugin, Pi plugin, OpenCode pathway, Codex release, Dify, ComfyUI, SearXNG, Jina, and related toolchains. These are not MVP goals.
