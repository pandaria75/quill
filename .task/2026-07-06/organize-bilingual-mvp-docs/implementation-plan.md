# Implementation Plan: Organize Bilingual MVP Documentation

## Tier Classification

- Tier: M
- Reason: Clear docs-only task, but more than a trivial typo because it introduces/organizes public bilingual documentation and routing.
- Critic: not required by default.

## Selected Gate Policy

- selected: `balanced`
- final approval required: yes
- analysis-to-doc-editing gate: required

## Slice 1: Bilingual Public MVP Docs

- id: `slice-1-bilingual-public-docs`
- gateClass: `standard`
- risk_score: 2
- criticRequired: false
- allowed scope:
  - `docs/zh-CN/**`
  - `docs/en/**`
  - `docs/project/knowledge-map.md`
  - `README.md` only for short discoverability links if needed
- forbidden scope:
  - `src/**`
  - `scripts/**`
  - `package.json`
  - generated build outputs
  - unrelated Marionettist workflow or configuration changes
- proposed documents:
  - `docs/zh-CN/software-design.md`
  - `docs/zh-CN/user-guide.md`
  - `docs/en/software-design.md`
  - `docs/en/user-guide.md`

## Content Outline

### Software Design Document

- MVP overview
- Design principles: local-first, artifact-first, Markdown-first, human-in-the-loop, model-provider guarded
- Runtime architecture at a high level
- Technical-blog workflow and artifacts
- Command behavior boundaries
- Config/model provider design
- Validation and acceptance checks
- Non-goals and extension points

### User Guide

- What Quill does today
- Local development and CLI invocation
- `quill init`
- `quill new`
- `quill status`
- `quill step`
- `quill run`
- API key setup and no-key behavior
- `--force` overwrite behavior
- Offline smoke checks
- Troubleshooting notes

## Validation Strategy

- Manual docs review for consistency across Chinese/English versions.
- Confirm docs do not become source-code indexes.
- Optional: run no build required because production code is unchanged; if README command examples are changed materially, run `npm run check` only if useful.

## Stop Conditions

- User wants different public doc paths/names.
- User wants the old `docs/develop` set deleted or heavily reorganized instead of leaving it as internal planning history.
- User wants additional categories beyond software design and user guide.
