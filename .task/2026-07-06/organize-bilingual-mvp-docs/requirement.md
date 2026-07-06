# Requirement: Organize Bilingual MVP Documentation

## Goal

整理 Quill 当前 MVP 文档，让公开文档先聚焦两类：

1. 软件设计说明文档
2. 用户使用文档

两类文档都需要中英文版本。

## Source

- User request on 2026-07-06: “现在的MVP应该已经实现了吧，帮我整理一下中英文档，要求文档先只做软件设计说明文档和用户使用文档”

## Scope

In scope:

- Create or update public Markdown docs for:
  - Chinese software design document
  - Chinese user guide
  - English software design document
  - English user guide
- Base content on observed MVP behavior from README, development docs, and current source layout.
- Keep documents design/user oriented, not source-code indexes.
- Update `docs/project/knowledge-map.md` if new docs are added or moved.
- Optionally update README links if needed to make the public docs discoverable.

Out of scope:

- Production code changes.
- Changing CLI behavior or smoke tests.
- Rewriting all historical planning docs.
- Adding API reference, source inventory, class/function lists, or exhaustive command internals.
- Publishing/deployment docs beyond local MVP use.

## Current MVP Evidence

- `README.md` states the current MVP includes `init`, `new`, `status`, guarded model-backed `step`, and `run` commands.
- `package.json` exposes `quill` and includes `build`, `check`, and `smoke:mvp` scripts.
- `docs/develop/01-mvp-scope.md` defines the MVP scope and user stories.
- `docs/develop/13-mvp-acceptance-test.md` records offline smoke and live-provider expectations.
- `src/` contains CLI commands, workflow execution, artifact handling, config loading, style loading, and an OpenAI-compatible client.

## Documentation Requirements

- Chinese docs should be primary and natural for this repository’s configured `docs.language: zh-CN`.
- English docs should mirror the same public meaning without expanding scope.
- Documents should explain:
  - MVP purpose and boundaries
  - local-first/artifact-first design
  - technical-blog workflow
  - command usage and expected files
  - model provider setup and no-key behavior
  - validation/smoke expectations
- Documents should avoid:
  - internal Marionettist task history
  - exhaustive implementation details
  - unsupported future roadmap promises beyond concise non-goals/future notes

## Gate Policy

- config/default: `balanced`
- allowTaskOverride: `true`
- recommended: `balanced`
- selected: `balanced`
- reason: Docs-only but non-trivial because it adds public documentation structure and knowledge-map routing.
- finalApprovalRequired: `true`

## Acceptance Criteria

1. The public docs contain exactly the two requested documentation categories, in Chinese and English.
2. The software design docs describe MVP design, architecture posture, workflow, artifacts, boundaries, and validation.
3. The user guides explain install/dev invocation, workspace initialization, article creation, status, step/run usage, API key setup, overwrite behavior, and smoke checks.
4. `docs/project/knowledge-map.md` routes to the new public docs if paths are added.
5. No production code is changed.
