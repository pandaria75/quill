# Knowledge Map

This file routes agents and humans to project knowledge.

It must not become a code index. Do not list every file, class, function, or symbol here.

Docs explain context. Rules enforce constraints. Keep them separate and update this file whenever docs or rules are added, moved, renamed, or deleted.

Rule files may also record rule metadata such as `type`, `confidence`, and `source`. Read those semantics from `AGENTS.md` and the rule files themselves; do not treat every rule entry as equally strong by default.

When `marionettist.config.yaml` exists, read `knowledge.mode` and `knowledge.maturity` before deciding how much knowledge to load or create.

## Project Overview

- Knowledge Docs:
  - `docs/zh-CN/` for public Chinese product-facing documentation
  - `docs/en/` for public English product-facing documentation
  - `docs/project/` for repository-wide workflow and routing
  - `docs/project/tier-policy-workflow-design.md` for installed future-facing Tier-policy workflow research boundaries and roadmap context
  - `docs/current/` for current-state knowledge about how the project works today
  - `docs/target/` for desired future design, migration direction, or proposed architecture, including Quill Core and adapter-direction docs such as `docs/target/quill-core-architecture.md` and `docs/target/hermes-adapter-design.md`
- Rule Files:
  - `AGENTS.md`
  - `.aiassistant/rules/*.md`
- Scope:
  - route readers to the smallest relevant set of docs and rules
  - keep current fact separate from target intent
- When To Read:
  - before loading detailed docs for a non-trivial task
  - whenever docs, rules, or file roles change
- Boundary Notes:
  - `docs/current/` is for observed reality first
  - `docs/target/` is for future intent, not current fact
  - label knowledge as fact, inference, or unknown inside detailed docs
  - keep rule-strength metadata in rule files, not in knowledge docs

## Current-State-First Routing

For mixed-responsibility, legacy-heavy, or mudball projects, start with `docs/current/` unless the task is explicitly about future design.

Use this order:

1. read `AGENTS.md` and relevant rules first
2. read `docs/project/knowledge-map.md` to choose the smallest relevant knowledge area
3. read `docs/current/...` for how the project works today
4. read `docs/target/...` only when the task involves planned changes, migration direction, or intentional future-state design

If the current state is unclear, document the uncertainty as an unknown instead of filling the gap with target design.

## Project Workflow Design

- Areas: Marionettist task flow, Tier-based routing, gate boundaries, future workflow configurability
- Tags: workflow, tier, gate-policy, task-state, research
- Docs:
  - Current: `docs/project/marionettist-workflow.md`
  - Target: `docs/project/tier-policy-workflow-design.md`
- Rules:
  - `AGENTS.md`
- Read When:
  - working on Marionettist execution flow, Tier policy, gate behavior, or future workflow design boundaries
- Boundaries:
  - keep `gatePolicy` semantics unchanged
  - treat Tier policy as classification/workflow-hint logic until a later approved design says otherwise
  - do not treat the design draft as implemented behavior
  - use the design draft to understand deferred hardening and future-engine boundaries, not current execution rules
- Validation:
  - confirm project-neutral language
  - confirm proposed workflow configurability remains design-only unless explicitly implemented in an approved slice

## Public Product Documentation

- Areas: user-facing explanation of the Quill MVP design and how to use it
- Tags: public-docs, product, user-guide, software-design, bilingual
- Docs:
  - Chinese: `docs/zh-CN/software-design.md`, `docs/zh-CN/user-guide.md`
  - English: `docs/en/software-design.md`, `docs/en/user-guide.md`
- Rules:
  - `AGENTS.md`
- Read When:
  - a reader wants a public overview of Quill MVP capabilities, workflow, boundaries, setup, validation expectations, or troubleshooting
  - a task adds, renames, or updates public-facing Quill documentation
- Boundaries:
  - keep these docs product- and workflow-oriented, not as source-code indexes
  - describe current MVP behavior and explicit non-goals clearly
  - do not claim live provider generation is verified unless credentials and provider reachability were intentionally validated
- Validation:
  - confirm Chinese and English docs stay semantically aligned
  - confirm the docs remain detailed enough for user understanding without turning into file/class/function inventories

## Quill Core Target Architecture

- Areas: future Quill Core positioning, architecture pivot, non-goals, and how target architecture differs from the current MVP/reference harness
- Tags: target-architecture, quill-core, architecture-pivot, non-goals
- Docs:
  - Current context: `docs/current/`
  - Public current-facing summaries: `docs/zh-CN/software-design.md`, `docs/en/software-design.md`
  - Target: `docs/target/quill-core-architecture.md`
- Rules:
  - `AGENTS.md`
- Read When:
  - the task needs Quill's intended future architecture rather than only today's implementation
  - a reader needs the Quill Core positioning or architecture non-goals
- Boundaries:
  - treat `docs/target/quill-core-architecture.md` as future-direction design, not proof of current implementation
  - use `docs/current/` and public current-facing docs when the task is about what exists today
  - keep routing architecture-oriented rather than turning this map into a repository index
- Validation:
  - confirm routing makes the current MVP/reference harness distinct from the target Quill Core design

## Quill Core Current Packaging Surface

- Areas: current packaged Quill Core boundary, exported init assets, and local dev/runtime caveats
- Tags: current-state, quill-core, packaging, cli-init
- Docs:
  - Current: `packages/core/README.md`
  - Related current behavior: `docs/current/`
  - Target contrast: `docs/target/quill-core-architecture.md`
- Rules:
  - `AGENTS.md`
- Read When:
  - validating what the current root package actually ships for Quill Core
  - checking how CLI init reuses packaged core assets today
  - assessing current local-dev caveats around prebuilt `packages/core/dist`
- Boundaries:
  - treat `packages/core/README.md` as current packaging/runtime guidance, not a repository-wide code index
  - keep current package behavior distinct from future Quill Core architecture goals
- Validation:
  - confirm routing stays focused on package/runtime behavior and does not blur current-state facts with target design

## Hermes-First Adapter Direction

- Areas: first-adapter target design, adapter responsibility boundaries, and Hermes-first sequencing relative to later adapters
- Tags: target-architecture, adapter, hermes, integration-direction
- Docs:
  - Target: `docs/target/hermes-adapter-design.md`
  - Related target context: `docs/target/quill-core-architecture.md`
- Rules:
  - `AGENTS.md`
- Read When:
  - the task is about adapter-direction planning or Hermes-first integration boundaries
  - a reader needs future adapter positioning without assuming current adapter implementation exists
- Boundaries:
  - treat this as target design only unless current-state docs explicitly confirm implementation
  - do not infer undocumented Hermes, OpenCode, or Pi internals from routing alone
  - keep the entry focused on responsibilities and sequencing, not file-by-file implementation detail
- Validation:
  - confirm the map makes Hermes adapter design discoverable while preserving the current-vs-target distinction

## Knowledge Maturity Routing

Use `knowledge.maturity` to scale routing depth and governance expectations:

- **L0**: route only the minimum docs and rules needed for the task; prefer explicit unknowns over broad discovery
- **L1**: prioritize `docs/current/` coverage for entrypoints, major flows, risk zones, and safe-change advice
- **L2**: maintain reusable routing for important areas and load both current and target docs only when they materially affect the task
- **L3**: expect stronger routing discipline, clearer ownership notes, and docs/rules sync when meaning changes
- **L4**: expect high-trust curated routing, stronger confirmed/hard rule usage, and careful separation of current fact vs target intent

Use maturity as a scaling guide, not as a reason to load all docs.

For `knowledge.mode: mudball`:

- default to `docs/current/` first at every maturity level
- keep target docs optional and future-facing
- treat L0-L1 as valid operating levels
- do not assume L3/L4 governance unless the project explicitly chose it

## Knowledge Labels

Detailed docs should distinguish:

- **Fact**: directly observed in code, config, runtime behavior, logs, or confirmed repository docs
- **Inference**: likely interpretation of current behavior that still needs confirmation
- **Unknown**: unresolved question, missing evidence, or area not yet inspected
- **Target**: desired future behavior or design direction; keep this in `docs/target/` unless a current-state doc must reference it for contrast

Do not silently upgrade inference or target guidance into present-day fact.
Do not silently upgrade `observed` or `target` rules into enforceable hard constraints.

## How To Use This File

- Use this file to choose a small set of relevant docs and rules.
- Match the task to one or more knowledge areas by purpose, workflow, ownership, validation needs, or change surface.
- Read only the entries that match the current task.
- Prefer `docs/current/` for real behavior and `docs/target/` for intended future behavior.
- Prefer rule files for constraints, and check rule metadata before treating a rule as a blocker.
- Use repository search or source inspection for file and symbol lookup.
- Do not list the whole repository here.

## Knowledge Area Template

Copy this block for each major project area:

```md
### <Area Name>

- Areas:
- Tags:
- Docs:
  - Current: `docs/current/...`
  - Target: `docs/target/...`
- Rules:
  - `.aiassistant/rules/...`
  - `AGENTS.md`
- Read When:
- Boundaries:
- Validation:
```

## Example Structure

Replace these placeholders with project-local content.

### <Area Name>

- Areas: <functional area, module family, workflow, or bounded subsystem>
- Tags: <short routing keywords>
- Docs:
  - Current: `docs/current/...`
  - Target: `docs/target/...`
- Rules:
  - `.aiassistant/rules/...`
  - `AGENTS.md`
- Read When:
  - <when this area is relevant>
- Boundaries:
  - <safety, ownership, layering, or compatibility constraints>
- Validation:
  - <tests, smoke checks, or review expectations>

## Mudball-Friendly Documentation Guidance

For codebases with unclear boundaries or mixed responsibilities:

- document current entrypoints, call paths, risk zones, and safe-change advice before proposing cleanup
- keep related-file notes small and purpose-based, not exhaustive
- prefer facts and unknowns over polished architecture language
- prefer gradual maturity growth over immediate governance escalation
- add target-state docs only when they help explain a proposed improvement or migration path

## Path-Proximity Rule Reminder

When target files are known, agents should also look upward from those paths for local rule files such as:

- `MODULE_RULES.md`
- `AGENTS.md`
- `HARNESS_RULES.md`

Local path rules narrow area-specific behavior, but repository-global safety and boundary rules still take precedence if there is a conflict.
