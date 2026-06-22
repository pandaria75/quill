# Quill And Marionettist

## Current Stage

Marionettist is the development harness for Quill.

Quill can borrow Marionettist ideas:

- workflow
- skill
- checkpoint
- artifact
- model role
- review gate
- validator
- run log

Quill MVP must not depend on Marionettist runtime.

## Development Process

Marionettist and `marionettist-pathway-opencode` can guide, constrain, and review Quill development.

## Runtime Process

Quill MVP runs independently as a local CLI. It should not require Marionettist core, a Marionettist shared package, or a Marionettist plugin runtime.

## Future Direction

If Quill stabilizes generic primitives such as Workflow, Step, Artifact, Checkpoint, Model Role, Run Log, Review, and Repair, those primitives can be fed back into Marionettist.

Long term, Marionettist may become a shared foundation for multiple workflow families:

- coding workflow
- writing workflow
- research workflow
- ops workflow

## Current Strategy

Quill should ship a vertical MVP first. Its internal boundaries can be shaped with future extraction in mind, but extraction should wait until real usage proves the boundary.

## Do Not Do Now

- Do not implement Quill as a Marionettist runtime plugin.
- Do not make Quill MVP wait for Marionettist shared core.
- Do not extract shared-core early.
- Do not build a complex generic workflow engine first.
- Do not sacrifice MVP speed for architecture aesthetics.
