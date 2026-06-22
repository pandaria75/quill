# Architecture Notes

## MVP First

Quill first-stage goal is fast usefulness, not architectural perfection.

## Local First

Quill is primarily a local CLI. Artifacts live in local folders so users can edit them and track them with Git.

## Artifact First

Every workflow stage should leave a clear artifact. Important state should not live only in chat history or memory.

## Human In The Loop

Quill does not chase fully automated publishing in the MVP. Human review, editing, and confirmation remain part of the workflow.

## Markdown First

The first stage uses Markdown rather than HTML, React, PDF, or a complex renderer.

## Style Profile First

Style control is a core value. The MVP should prioritize style profiles and review checklists.

## Delay Shared Core

Do not extract a shared core at the start. Abstract only after the same mechanism has stabilized across multiple workflows or projects.

## Marionettist As Development Harness

At this stage, Marionettist is the harness for developing Quill, not a runtime dependency of Quill.

## Explicit Non-goals

The MVP should avoid generic workflow DSLs, plugin systems, automatic publishing, automatic web research, model routers, databases, web UI, and Marionettist runtime integration.
