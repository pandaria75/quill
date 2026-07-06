# Hermes-First Adapter Design Target

## Scope

- Area or workflow: target-state adapter boundary design
- Status: approved direction for documentation and future planning
- Relationship to Core: companion to `docs/target/quill-core-architecture.md`

## Positioning

Hermes is the first target adapter/container for Quill.

This means Quill's near-term adapter design should first clarify how Quill Core can be hosted in a Hermes-based environment without turning Quill itself into a new container, runtime, or model-routing framework.

OpenCode and Pi remain later adapter targets. They are intentionally out of detailed design scope here.

## Adapter Purpose

The Hermes adapter boundary exists to let a Hermes-hosted execution environment carry Quill's workflow kit while keeping Quill Core portable.

Quill Core remains responsible for the writing methodology, artifact contracts, review gates, and workflow discipline. The Hermes adapter is responsible for the handoff between those core expectations and a concrete host environment.

## Responsibility Boundaries

### 1. Hosting and execution integration

The Hermes adapter should define how Quill workflow steps are hosted and executed inside a Hermes-based environment.

This is an integration boundary, not a claim that Quill owns the host runtime. The adapter should translate between Quill's workflow expectations and Hermes-hosted execution behavior at a design level.

### 2. Model configuration handoff

Quill Core should stay model-provider-neutral.

The Hermes adapter boundary should therefore handle the handoff of model-related configuration from Quill workflow needs into whatever host-side configuration mechanism is appropriate, without making Quill Core itself a provider router or config framework.

This document intentionally does not define any Hermes model configuration format or API.

### 3. Memory runtime boundary

Quill is memory-strategy-aware but not memory-runtime-owning.

The Hermes adapter boundary should identify where Quill's workflow expectations about memory meet the host environment's memory/runtime capabilities. Quill Core may describe what kinds of memory support a workflow expects, but the adapter boundary is where runtime-specific realization would be connected.

This document intentionally does not define storage, persistence, retrieval, or lifecycle internals.

### 4. Tool and runtime integration boundary

The Hermes adapter should define the boundary where Quill workflow steps can rely on host-provided tools, execution context, or runtime services.

Quill Core should describe the workflow-side need for those capabilities; the adapter boundary should describe where host-specific integration begins.

### 5. Artifact and protocol handoff

Quill Core defines artifacts such as task state, plans, context packs, and review outputs.

The Hermes adapter boundary should preserve those artifact contracts while clarifying how a Hermes-hosted environment receives, produces, or passes along them during execution.

### 6. Review and gate handoff

Quill's review gates and workflow safety policies remain core responsibilities.

The Hermes adapter boundary may need to specify where a Hermes-hosted execution environment triggers, carries, or returns those gate-related artifacts and decisions, without changing Quill's core review contract.

## Non-Goals

This document does not:

- define Hermes internals or APIs
- claim Hermes command structures, lifecycle hooks, or storage mechanisms
- design OpenCode or Pi adapters in detail
- turn Quill into a container, runtime, or provider-routing layer

## Sequencing

- First target adapter: Hermes
- Later target adapters: OpenCode, Pi

The purpose of this sequencing is prioritization, not exclusivity. Quill Core should remain portable enough that later adapters can follow without redefining the core architecture.

## Design Cautions

- Keep target-state language separate from current implementation facts.
- Describe boundaries and responsibility categories rather than invented integration mechanics.
- Preserve Quill Core as the source of workflow methodology rather than shifting product identity into the adapter layer.
