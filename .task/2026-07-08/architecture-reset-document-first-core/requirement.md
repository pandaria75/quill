# Quill Architecture Reset Requirement

## Source

User request: reset Quill from the old CLI-MVP direction into a document-first longform-writing workflow kit.

## New Positioning

Quill is a document-first longform-writing workflow kit. Its core value is portable methodology captured as document assets, not a standalone agent runtime, model client, workflow runner, memory runtime, provider router, or publishing system.

## Required Core Shape

- `core/` contains platform-neutral document assets:
  - `AGENTS.md`
  - `workflows/longform-writing.md`
  - capability-oriented skills
  - `role-cards/technical-blog.md`
  - artifact contracts
  - review gates
  - memory policies
- First workflow: `longform-writing` only.
- `technical-blog` is a role-card, not a workflow.
- Memory is policy/candidate generation only; no memory runtime.

## Installer Scope

Keep npm package name `@pandaria/quill` but use it only as scaffold/installer entrypoint.

Allowed commands:

- `npx @pandaria/quill init`
- `npx @pandaria/quill init --target ./some-project`

Installer may only copy document assets, write a thin target `AGENTS.md`, create `.quill/`, copy selected distributions, and write lightweight config. It must not run writing workflows.

Forbidden old commands:

- `quill new`
- `quill step`
- `quill run`
- `quill status`

## Hermes Scope

Do not implement a full Hermes plugin in this reset. Add research checklist/report and documentation skeleton only. Unknown Hermes capabilities must be marked `unknown` rather than guessed.

## Old Direction To Remove

Remove or de-productize:

- old `src/` CLI runtime
- model-backed workflow execution
- OpenAI-compatible chat client
- old smoke scripts validating CLI MVP behavior
- TypeScript-compiled Core constants/exports when they only encode document assets
- implemented Hermes adapter/runtime code
- README/package metadata that present Quill as a local-first workflow CLI

## Required Postmortem

Add `docs/archive/cli-mvp-postmortem.md` explaining the architecture pivot objectively.

## GitHub Issue Work

After repository changes are ready, handle GitHub issues:

- ensure `frozen-old-direction` label exists
- comment, label, and close #20-#25
- create architecture reset issue
- create recommended follow-up issues A-F when feasible

## Gate Policy

- recommended: strict
- selected: strict
- reason: high-risk architecture reset, deletion of old runtime, package entrypoint change, GitHub mutations
- finalApprovalRequired: true
