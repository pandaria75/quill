# Quill And Marionettist

## Current Stage

Marionettist is the development harness for Quill.

Quill can borrow workflow-kit ideas from Marionettist:

- workflow
- skill
- checkpoint
- artifact
- model role
- review gate
- validator
- run log

That similarity is about reusable workflow discipline, not product identity. Quill is a writing-domain workflow kit; it should not become a Marionettist clone or a generic workflow runtime.

## Current Runtime Reality

The repository currently contains a local CLI MVP. That CLI is the current implementation and reference harness for Quill, not proof that Quill's long-term center should remain a standalone CLI or host runtime.

Quill Core should remain independent from Marionettist runtime requirements.

## Development Process

Marionettist and `marionettist-pathway-opencode` can guide, constrain, and review Quill development.

## Runtime Process

Quill's target direction is **Core plus adapters**.

- Quill Core should carry the writing methodology, artifact contracts, review gates, and workflow expectations.
- Adapters should connect that core to concrete host environments.
- Hermes is the first serious adapter target.

Quill should not require Marionettist core, a Marionettist shared package, or a Marionettist plugin runtime in order to define its own core identity.

## Future Direction

If Quill stabilizes portable primitives such as Workflow, Step, Artifact, Checkpoint, Model Role, Run Log, Review, and Repair, those lessons can feed back into Marionettist.

Long term, Marionettist may become a shared foundation for multiple workflow families:

- coding workflow
- writing workflow
- research workflow
- ops workflow

## Current Strategy

Keep the relationship actionable and bounded:

- use Marionettist as the development harness
- define Quill Core contracts in Quill docs
- design Hermes-first adapter boundaries without inventing Hermes internals
- leave OpenCode and Pi as later adapter targets

Quill should keep future extraction in mind, but should not block on a shared-core or plugin-runtime story.

## Do Not Do Now

- Do not implement Quill as a Marionettist runtime plugin.
- Do not make Quill MVP wait for Marionettist shared core.
- Do not extract shared-core early.
- Do not build a complex generic workflow engine first.
- Do not sacrifice MVP speed for architecture aesthetics.
- Do not describe Quill as a replacement for Hermes, OpenCode, or Pi.
