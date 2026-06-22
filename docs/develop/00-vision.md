# Quill Vision

Quill is a local-first workflow CLI for high-quality content production.

It is not a generic AI text generator. Its purpose is to guide writing through explicit workflow stages, editable Markdown artifacts, style profiles, review gates, and repair loops so the final output is something a human can continue editing and publishing.

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
- Every important stage should leave a local artifact.
- Markdown is the right first format because it is readable, editable, diffable, and portable.
- Style control and review loops matter more than raw one-shot generation.
- The MVP must be a usable vertical slice, not a framework demo.

## First Product Shape

The first version should help a user run one technical blog workflow locally:

```text
topic / notes
  -> brief.md
  -> sources.md
  -> outline.md
  -> draft.md
  -> review.md
  -> final.md
```

The result should be an ordinary Markdown article with clear structure, controlled style, and lower AI flavor.
