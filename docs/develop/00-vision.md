# Quill Vision

Quill is evolving toward **Quill Core plus adapters**: a writing-domain workflow kit whose methodology, prompts, skills, artifact contracts, and review discipline can travel across host environments.

It is not a generic AI text generator, a new agent container, a generic workflow runtime, or a replacement for Hermes, OpenCode, or Pi. Its purpose is to guide writing through explicit workflow stages, editable artifacts, review gates, and repair loops so the final output stays human-editable and portable.

## Target Content Types

Long term, Quill may support:

- technical blogs
- project promotion posts
- research notes
- long-form public articles
- Zhihu / Xiaohongshu post drafts
- Bilibili video scripts
- story and script drafts

## Core Beliefs

- Good content generation is a workflow problem, not only a prompt problem.
- Every important stage should leave a durable artifact.
- Markdown is the right first format because it is readable, editable, diffable, and portable.
- Style control and review loops matter more than raw one-shot generation.
- Quill Core should stay container-neutral and model-provider-neutral.
- Quill should be memory-strategy-aware, not memory-runtime-owning.
- The MVP/reference harness must teach the core, not become the long-term product center.

## Current Reference Harness

Today the repository's main runnable embodiment is a local-first CLI for one technical blog workflow:

```text
topic / notes
  -> brief.md
  -> sources.md
  -> outline.md
  -> draft.md
  -> review.md
  -> final.md
```

This remains useful as the **current implementation, reference harness, and prototype** for learning what Quill Core and future adapters should preserve.

## Target Product Shape

The long-term center of gravity is not the standalone CLI. The target shape is:

- **Quill Core**: writing methodology, workflow structure, prompts, skills, artifact contracts, review gates, and memory-strategy expectations
- **Adapters**: host-specific integration boundaries that let Quill run inside concrete environments without redefining Quill itself

Short-term sequencing:

- first, clarify Quill Core contracts
- next, design Hermes as the first serious adapter target
- later, explore adapters for OpenCode and Pi

Future work should keep current CLI facts as reference evidence while planning around the Core-plus-adapters direction.
