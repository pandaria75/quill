# Longform Writing Workflow

## Purpose

Provide a portable, document-first method for producing high-quality longform writing.

## Scope

- one platform-neutral workflow family
- human-readable artifacts first
- role-cards adapt the workflow without becoming separate workflows
- review gates before major commitment points

## Workflow Shape

```text
intent
  -> context-pack
  -> angle
  -> structure
  -> draft
  -> review
  -> rewrite
  -> final
```

## Stage Intent

1. `intent`: capture audience, goal, constraints, and desired reader effect.
2. `context-pack`: organize provided notes, references, examples, and factual risks.
3. `angle`: choose the article's point of view and central promise.
4. `structure`: design argument flow before drafting.
5. `draft`: write a complete but editable longform draft.
6. `review`: check clarity, factual risk, structure, audience fit, and AI flavor.
7. `rewrite`: repair the draft according to review findings.
8. `final`: produce the final human-approved document.

## Required Behaviors

- keep work in files a human can inspect and edit
- treat role-cards as guidance, not automation
- keep execution-host details out of Core
- require explicit gate checks before drafting and finalization
- let different role-cards adjust tone, evidence expectations, and examples without creating new runtimes

## Non-Goals

- no standalone runner
- no model/provider selection logic
- no built-in memory persistence
- no publishing system
