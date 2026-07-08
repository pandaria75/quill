## Context

Quill previously evolved toward a local-first CLI MVP with model-backed workflow execution. That direction is no longer the intended product center.

The project is being reset around a document-first longform-writing workflow kit.

Quill should package reusable writing methodology as document assets:

- skills
- AGENTS.md
- workflows
- role-cards
- artifact contracts
- review gates
- memory policies
- platform distributions

Quill should not become a standalone agent runtime, model provider framework, workflow engine, or publishing platform.

## Goal

Rebuild Quill around a portable document-first Core plus thin platform distributions.

The first supported workflow is `longform-writing`.

The first role-card is `technical-blog`.

The first platform target is Hermes, but Hermes plugin development must be preceded by capability research.

## Required Direction

Quill Core should be:

- document-first
- platform-neutral
- model-provider-neutral
- memory-runtime-neutral
- workflow-methodology-oriented

The installer may contain code, but only for scaffold/install purposes.

## Non-Goals

Do not implement:

- model provider client
- standalone agent runtime
- workflow runner
- memory runtime
- provider router
- publishing system
- generic workflow engine
- replacement for Hermes/OpenCode/Pi/Dify

If implementation seems to require one of these, stop and document the blocker.

## Target Structure

```text
core/
  AGENTS.md
  workflows/
  skills/
  role-cards/
  artifact-contracts/
  review-gates/
  memory/

distributions/
  hermes/

tools/
  installer/

docs/
  archive/
```

## First Work Items

1. Remove old CLI runtime through a dedicated branch and PR.
2. Add CLI MVP postmortem.
3. Create document-first Core structure.
4. Define `longform-writing` workflow.
5. Add `technical-blog` role-card.
6. Add installer scaffold.
7. Add Hermes capability research checklist and report.
8. Only after research, decide whether to implement Hermes thin plugin distribution.

## Acceptance Criteria

- Old CLI runtime is removed.
- `@pandaria/quill` is retained only as installer/scaffold entrypoint.
- `core/` contains document-first workflow assets.
- `longform-writing` is the only initial workflow.
- `technical-blog` is represented as a role-card.
- Hermes work starts with capability research, not plugin implementation.
- Old open issues from the CLI-MVP direction are frozen and closed.
- README and package metadata no longer describe Quill as a local-first workflow CLI.
