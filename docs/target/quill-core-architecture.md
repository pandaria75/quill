# Quill Core Architecture Target

## Scope

- Area or workflow: project architecture and product direction
- Why a target-state document is needed: Quill needs a stable design reference for the shift from a standalone CLI-centered MVP toward a writing-domain workflow kit with adapters.
- Status: approved direction
- Related current docs:
  - `docs/target/architecture-intent.md`
  - current CLI-focused docs remain current-state/reference material until later slices update them

## Positioning

Quill is a writing-domain workflow kit.

Its core value is not a new runtime or container. Its core value is the reusable writing methodology that can travel across different execution environments.

## Quill Core Responsibilities

Quill Core should define and package the parts of the system that are portable across runtime environments:

- writing methodology and workflow structure
- prompts, skills, and execution guidance for agents
- artifact contracts for task state, context packs, plans, and review outputs
- review gates and workflow policies that shape safe task progression
- memory strategy expectations and boundaries for writing work
- adapter-facing contracts that let a runtime/container host the workflow without redefining Quill itself

## Adapter Boundary

Quill Core is container-neutral and model-provider-neutral.

Adapters are the boundary where a concrete runtime/container can host Quill's workflows. An adapter may handle environment-specific execution concerns, but Quill Core should remain the source of the workflow methodology, artifact expectations, and review discipline.

Hermes is the first serious adapter target from the current issue context. OpenCode and Pi are later adapter targets. This document does not define their internals or APIs.

## Memory Strategy Boundary

Quill should be memory-strategy-aware, not memory-runtime-owning.

That means Quill Core may define what kinds of memory support the workflow expects, how memory affects artifacts or review, and where memory-related responsibilities should be acknowledged. It should not become a standalone memory platform or claim ownership of runtime-specific memory implementation details.

## Current State vs Target State

### Current state

The repository currently centers a standalone CLI MVP. That remains useful as the current implementation, reference harness, and prototype for learning what Quill needs in practice.

### Target state

The long-term center of gravity is Quill Core plus adapters. The CLI MVP is not the long-term product center; it is a current/reference embodiment that can inform the portable core and future adapters.

## Explicit Non-Goals

Quill is not:

- a model-running CLI or agent container in its own right
- a generic workflow runtime
- a router or provider framework for models
- a publishing platform
- a replacement for Hermes, OpenCode, or Pi

## Relationship To External Hosts

Quill should be able to live inside or alongside other execution environments without claiming to replace them.

- Hermes: first adapter priority
- OpenCode: later adapter target
- Pi: later adapter target

This framing is intentionally high level. It describes Quill's boundaries and direction without inventing details about how those systems work internally.

## Change Strategy

- Safe first steps:
  - define the core architecture direction in target docs
  - treat current CLI behavior as reference evidence, not target architecture proof
  - describe adapters by responsibility boundary rather than implementation detail
- Required prerequisites:
  - follow-on adapter design docs
  - public-facing doc alignment across README and software design docs
- Risks or rollback concerns:
  - confusing target architecture with current implementation reality
  - accidentally re-centering Quill around runtime concerns
  - over-claiming Hermes, OpenCode, or Pi behavior
- Validation ideas:
  - confirm docs consistently describe Quill as a workflow kit
  - confirm non-goals remain explicit in later doc updates

## Maintenance Notes

- Treat this as target-state design guidance, not evidence of today's full implementation shape.
- Keep current-state CLI facts in current/reference docs until later slices explicitly reframe those documents.
