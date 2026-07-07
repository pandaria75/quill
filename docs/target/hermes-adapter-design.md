# Hermes-First Adapter Design Target

## Scope

- Area or workflow: target-state adapter boundary design
- Status: approved direction for documentation and future planning
- Relationship to Core: companion to `docs/target/quill-core-architecture.md`

## Positioning

Hermes is the first target adapter/container for Quill.

This means Quill's near-term adapter design should first clarify how Quill Core can be hosted in a Hermes-based environment without turning Quill itself into a new container, runtime, or model-routing framework.

OpenCode and Pi remain later adapter targets. They are intentionally out of detailed design scope here.

## Evidence Categories

This document separates three kinds of statements:

- **Confirmed Hermes concepts**: concepts explicitly supported by the task's Hermes documentation notes, such as plugins, skills, memory providers, file tools, model configuration, hooks, and commands.
- **Quill adapter design choices**: decisions about how Quill should use those Hermes concepts while keeping Quill Core portable.
- **Unknowns requiring spike verification**: runtime details that must be verified during issue #30 before implementation relies on them.

The design below intentionally avoids claiming exact Hermes APIs, signatures, or lifecycle details.

## Adapter Purpose

The Hermes adapter boundary exists to let a Hermes-hosted execution environment carry Quill's workflow kit while keeping Quill Core portable.

Quill Core remains responsible for the writing methodology, artifact contracts, review gates, and workflow discipline. The Hermes adapter is responsible for the handoff between those core expectations and a concrete host environment.

## Confirmed Hermes Concepts Relevant To This Design

Based on the task artifacts, Hermes documentation supports these high-level concepts:

- a plugin system
- skills
- commands
- hooks
- file-oriented workspace tooling
- model configuration and provider routing at the Hermes host/session side
- memory support, including provider-style extension points
- approval/safety flows for risky operations

The same artifact set also records current gaps for Quill planning:

- no confirmed native workflow DAG runtime
- no confirmed native per-step model routing equivalent to Quill `modelRole` hints
- no confirmed native workflow-level human review gate

These gaps drive the adapter design choices below.

## Responsibilities

### Quill Core responsibilities

Quill Core remains responsible for:

- the technical-blog methodology
- workflow step intent and ordering
- prompt and skill-contract content
- artifact names and expected Markdown outputs
- review/gate policy as a workflow requirement
- memory strategy expectations at the policy level

Quill Core must remain:

- container-neutral
- provider-neutral
- memory-runtime-neutral

### Hermes adapter responsibilities

The Hermes adapter should be responsible for:

- packaging Quill Core workflow assets for Hermes-hosted use
- exposing the first supported workflow through Hermes-facing commands and/or skills
- translating Quill workflow steps into Hermes execution units
- managing local artifact reads and writes in workspace files
- mapping Quill model-role intent onto Hermes host-side model selection strategy
- implementing workflow pause/resume behavior around Quill review gates
- optionally integrating Hermes memory capabilities while enforcing Quill memory safety rules
- surfacing adapter-local state, validation errors, and blocked gate states clearly

## Responsibility Boundaries

### 1. Hosting and execution integration

The Hermes adapter should define how Quill workflow steps are hosted and executed inside a Hermes-based environment.

This is an integration boundary, not a claim that Quill owns the host runtime. The adapter should translate between Quill's workflow expectations and Hermes-hosted execution behavior at a design level.

**Design choice:** the Hermes plugin is the workflow host/runtime layer for this integration. Quill Core supplies reusable methodology assets but does not become a runtime engine.

### 2. Model configuration handoff

Quill Core should stay model-provider-neutral.

The Hermes adapter boundary should therefore handle the handoff of model-related configuration from Quill workflow needs into whatever host-side configuration mechanism is appropriate, without making Quill Core itself a provider router or config framework.

This document intentionally does not define any Hermes model configuration format or API.

**Design choice:** Quill continues to express only abstract model intent such as role or capability. The Hermes adapter maps that intent to whichever host/session/provider configuration Hermes already supports.

### 3. Memory runtime boundary

Quill is memory-strategy-aware but not memory-runtime-owning.

The Hermes adapter boundary should identify where Quill's workflow expectations about memory meet the host environment's memory/runtime capabilities. Quill Core may describe what kinds of memory support a workflow expects, but the adapter boundary is where runtime-specific realization would be connected.

This document intentionally does not define storage, persistence, retrieval, or lifecycle internals.

**Design choice:** memory is optional for the first Hermes MVP. If used, Hermes owns persistence and retrieval mechanics; Quill only defines what kinds of summaries are safe and useful.

### 4. Tool and runtime integration boundary

The Hermes adapter should define the boundary where Quill workflow steps can rely on host-provided tools, execution context, or runtime services.

Quill Core should describe the workflow-side need for those capabilities; the adapter boundary should describe where host-specific integration begins.

### 5. Artifact and protocol handoff

Quill Core defines artifacts such as task state, plans, context packs, and review outputs.

The Hermes adapter boundary should preserve those artifact contracts while clarifying how a Hermes-hosted environment receives, produces, or passes along them during execution.

### 6. Review and gate handoff

Quill's review gates and workflow safety policies remain core responsibilities.

The Hermes adapter boundary may need to specify where a Hermes-hosted execution environment triggers, carries, or returns those gate-related artifacts and decisions, without changing Quill's core review contract.

**Design choice:** because no native workflow gate primitive is confirmed, the adapter should implement an explicit pause/resume protocol at the adapter layer rather than treating Hermes safety approval as equivalent to Quill review gates.

## Proposed Hermes Plugin Structure

The exact filenames and registration entrypoints must be verified during issue #30, but the adapter should likely be organized as an adapter-local Hermes plugin package with responsibilities separated roughly like this:

- `plugin/manifest-or-registration` — Hermes plugin declaration and top-level registration
- `plugin/commands/technical-blog` — user-facing entrypoint to start or resume the workflow
- `plugin/workflows/technical-blog-runner` — adapter-local step runner for the first workflow
- `plugin/skills/` — Hermes-facing skill assets or wrappers that expose Quill writing tasks
- `plugin/artifacts/` — artifact path resolution, read/write helpers, and state persistence helpers
- `plugin/gates/` — pause/resume protocol and pending-review state handling
- `plugin/memory/` — optional summary-oriented memory integration boundary
- `plugin/models/` — model-role mapping and host-side model selection helpers
- `plugin/bridges/core-assets` — loading or invoking Quill Core assets without moving provider/runtime logic into Core

This structure is a design partition, not a claim about exact Hermes package conventions.

## Workflow And Skill Mapping

### Confirmed facts

- Hermes supports plugins, commands, skills, and file tools.
- Quill Core already defines the technical-blog workflow assets and writing skill contracts.

### Adapter design choice

The first Hermes adapter should expose only one bounded workflow: `technical-blog`.

The adapter should treat Quill Core assets as the source of truth for:

- workflow step names and intent
- prompt/material structure
- artifact expectations
- writing discipline

The Hermes plugin should then provide:

- a start/resume command for the workflow
- step execution wrappers that call the appropriate Quill asset or prompt contract
- skill-facing descriptions that make the workflow usable inside Hermes conventions

### Non-goal

The first adapter should not try to build a generic workflow engine for all future Quill flows.

## Artifact Strategy

The first Hermes adapter should preserve Quill's human-readable artifact contract in local workspace files.

Expected first-path artifacts remain Markdown files such as:

- `brief.md`
- `sources.md`
- `outline.md`
- `draft.md`
- `review.md`
- `final.md`

Adapter-local state may also need a small machine-readable progress file to track:

- current workflow step
- pending review gate
- artifact locations
- resume token or equivalent adapter-local status

Design constraints:

- artifact content should remain file-based and inspectable by users
- adapter state should be local to the adapter, not a new Quill Core public API
- artifacts should not become opaque memory-only or database-only objects

## Memory Strategy

### Confirmed facts

- Hermes has memory capabilities and provider-style extension points.

### Quill adapter design choice

For the first adapter, memory should be optional and conservative.

Recommended default behavior:

- store workflow artifacts in files, not long-term memory
- use memory only for compact reusable summaries when clearly useful
- require adapter-level approval awareness before persisting candidate memories
- prefer summaries of stable preferences, style guidance, or prior approved outcomes over raw draft storage

Must not store by default:

- full raw drafts
- private notes
- secrets or credentials
- unpublished sensitive content
- full article text

### Unknowns to verify later

- how Hermes memory provider hooks are invoked in practice
- whether memory writes can be intercepted or approval-gated in the needed way
- whether memory prefetch/injection behavior is suitable for Quill step context

## Model Mapping Strategy

### Confirmed facts

- Hermes supports model configuration and provider routing on the Hermes side.

### Quill adapter design choice

Quill Core should continue to express only role-level or capability-level intent. The Hermes adapter should map that intent onto Hermes-controlled model selection.

This means:

- Quill Core does not embed provider-specific configuration
- Quill Core does not own secrets
- Hermes host config remains the place where actual providers and model identifiers are chosen
- the adapter may define a local mapping layer from Quill role hints to Hermes host-side model choices

Conservative first-path mapping strategy:

- support a single configured model/session for the initial spike and MVP if per-step routing is not yet verified
- treat richer per-step routing as an enhancement only after Hermes behavior is verified

Open question:

- whether future per-step routing should use separate Hermes calls, subagent/session segmentation, or a single session model with prompt-level role differences

## Human Gate Strategy

Quill review gates are workflow requirements, but Hermes approvals are not yet confirmed to match that workflow concept directly.

The adapter should therefore implement a simple gate protocol:

1. execute steps until a Quill-defined review checkpoint is reached
2. write or update the relevant Markdown artifacts
3. record adapter-local pending-review state
4. stop further automatic progression
5. require explicit user action to continue, revise, or abort

This preserves Quill's gate discipline without assuming a native Hermes workflow gate primitive.

## First Workflow Execution Path

The smallest end-to-end supported path should be the `technical-blog` workflow only.

Conceptual path:

1. user enables or installs the Hermes plugin
2. user invokes the Hermes-facing technical-blog start command
3. adapter loads Quill Core workflow assets for technical-blog
4. adapter creates or locates the workspace artifact set
5. adapter runs the first bounded step using Hermes-hosted execution
6. adapter writes Markdown artifacts after each completed step
7. adapter pauses at the first required human review checkpoint
8. user reviews artifacts and explicitly resumes or requests revision
9. adapter continues until final artifact completion

This is a workflow host design path, not a claim about exact command names or runtime signatures.

## Smallest Hermes MVP

The minimum intended MVP for issue #30 should be:

- one Hermes plugin
- one user-facing technical-blog command
- one bounded technical-blog workflow runner
- Quill Core asset reuse for prompts/contracts
- Markdown artifact generation in a local workspace
- one explicit pause/resume review gate
- optional memory disabled by default unless verified safe
- host-side model configuration supplied by Hermes, not Quill Core

Anything broader should wait until the spike confirms runtime assumptions.

## Validation Plan

For this design slice:

- primary validation is manual acceptance review against issue #29 requirements
- `npm run check` is not required when only Markdown changes

For later issue #30 work, required validation evidence should include:

- plugin registration/load confirmation
- one runnable technical-blog command path
- at least one Quill step producing a Markdown artifact
- pause/resume behavior at a review gate
- clear blocked-state reporting when runtime assumptions are missing

## Risks And Open Questions

### Risks

- Hermes documentation may not match installed/runtime behavior.
- The adapter may need a bridge between Hermes-side implementation and Quill Core's TypeScript-packaged assets.
- Per-step model routing may be weaker than Quill's ideal model-role granularity.
- Human review gates may require more adapter-local state machinery than expected.
- Memory integration could create privacy or persistence risks if enabled too early.

### Open questions requiring issue #30 spike evidence

- What exact plugin registration shape does Hermes require?
- What exact command and skill registration surfaces are available?
- How should Quill Core assets be loaded or bridged from the Hermes plugin environment?
- What is the smallest reliable adapter-local state file needed for pause/resume?
- Can Hermes memory writes and reads be constrained to Quill's approval-aware summary policy?
- Is a single-model first implementation sufficient for the technical-blog workflow?

## Issue #30 Sequencing: Spike First, MVP Second

### Spike goal

Before full implementation, issue #30 should begin with a runtime verification spike that proves the adapter can safely rely on Hermes behavior.

The spike should verify only the minimum assumptions:

- plugin registration works
- one command can start or resume a workflow
- one Quill-aligned step can run
- one Markdown artifact can be written
- one review pause can block continuation until explicit user action

### Spike stop conditions

Stop the implementation and document blockers if any of the following remain unclear:

- plugin or command registration behavior
- artifact write path behavior
- pause/resume feasibility
- model selection strategy needed for the first workflow
- memory integration safety or hook behavior if memory is attempted

### MVP after successful spike

Only after the spike succeeds should the first MVP expand to:

- the bounded `technical-blog` workflow path
- the expected Markdown artifact set
- the explicit review checkpoint behavior
- conservative model mapping
- optional memory integration only if verified safe and useful

## Non-Goals

This document does not:

- define Hermes internals or APIs
- claim Hermes command structures, lifecycle hooks, or storage mechanisms
- design OpenCode or Pi adapters in detail
- turn Quill into a container, runtime, or provider-routing layer
- implement the Hermes plugin
- change current CLI behavior
- change Quill Core public exports for the first adapter slice
- guess exact Hermes API signatures

## Sequencing

- First target adapter: Hermes
- Later target adapters: OpenCode, Pi

The purpose of this sequencing is prioritization, not exclusivity. Quill Core should remain portable enough that later adapters can follow without redefining the core architecture.

## Design Cautions

- Keep target-state language separate from current implementation facts.
- Describe boundaries and responsibility categories rather than invented integration mechanics.
- Preserve Quill Core as the source of workflow methodology rather than shifting product identity into the adapter layer.
- Treat Hermes runtime, model, memory, and command details as implementation-time verification targets when not explicitly confirmed.
