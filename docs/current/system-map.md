# Current System Map

Use this file to record how the project works today.

This is a current-state document, not a target architecture document. Prefer observed reality over polished theory.

It must not become a code index. List only the files, entrypoints, and flows needed to explain behavior or change risk.

## Scope

- Area or workflow: current document-first package surface and scaffold-only installer
- Why this document exists: record the post-reset product shape after the CLI/runtime direction was removed
- Last substantial verification date: 2026-07-08
- Related rules:
  - `AGENTS.md`
  - `.aiassistant/rules/00-repository-rules.md`
  - `.aiassistant/rules/workflow-rules.md`

## Knowledge Status

- Facts confirmed:
  - the root npm package keeps the name `@pandaria/quill`
  - the product entrypoint is a scaffold-only installer at `tools/installer/src/cli.js`
  - portable Core assets now live under `core/`
  - Hermes work is documentation-only under `distributions/hermes/`
- Inferences needing confirmation:
  - none for this reset slice beyond later packaging smoke in consumer environments
- Unknowns or missing evidence:
  - exact Hermes plugin/runtime APIs remain intentionally unknown

## Entrypoints

List the main starting points for this area.

- Fact:
  - `npx @pandaria/quill init`
  - `npx @pandaria/quill init --target <path>`
- Inference:
  - none
- Unknown:
  - no additional product entrypoints are intended in the current reset

## Main Call Paths

Summarize only the important paths that explain behavior, side effects, or risk.

1. Fact: `quill init` -> create target root scaffolding -> copy `core/` into `.quill/core` -> copy Hermes research docs into `.quill/distributions/hermes` -> write lightweight config
2. Fact: repository readers -> `README.md` / `core/` / `distributions/hermes/` -> understand Quill as a document-first workflow kit rather than a runnable workflow CLI
3. Unknown: future Hermes runtime call path until a dedicated spike verifies adapter behavior

## Related Files And Areas

Keep this selective. Include only the files or directories that matter for understanding behavior or making safe changes.

- Fact:
  - `tools/installer/src/cli.js` - current package/bin entrypoint
  - `core/` - portable document-first workflow assets
  - `distributions/hermes/` - research-first Hermes distribution skeleton
  - `docs/archive/cli-mvp-postmortem.md` - historical explanation for the architecture pivot
- Inference:
  - none
- Unknown:
  - future Hermes implementation package layout after runtime verification

## Implicit Rules And Constraints

Capture rules that appear to shape behavior even if they are not yet formalized elsewhere.

- Fact:
  - Quill Core must stay runtime-free and provider-neutral
  - installer behavior is limited to copying assets and writing lightweight local config
  - Hermes current-state docs must not imply plugin implementation exists
- Inference:
  - none
- Unknown:
  - exact installer evolution boundaries if future distributions need extra host metadata

## High-Risk Areas

- package metadata and bin entrypoint: a wrong path would make `npx @pandaria/quill init` unusable
- large architecture deletion boundary: stale references can accidentally keep the old CLI posture alive
- Hermes boundary: documentation must stay explicit about unknowns to avoid accidental fake implementation claims

## Safe-Change Advice

- Start from these entrypoints or seams: `tools/installer/src/cli.js`, `core/`, `distributions/hermes/`, `package.json`
- Change these areas together when relevant: README, package metadata, system map, and knowledge map
- Re-check these behaviors after changes: installer smoke output, package dry-run contents, and forbidden old command references in active product files
- Prefer these low-blast-radius approaches first: document assets plus scaffold-only copy behavior
- Escalate or pause when these unknowns remain unresolved: Hermes runtime details, plugin registration assumptions, or any change that would reintroduce a runtime layer

## Open Questions

- What exact Hermes plugin/package shape should a future spike validate first?
- Should future distributions share one installer config schema or keep distribution-local metadata?

## Target-State Contrast (Optional)

If needed, add only a short note pointing to related `docs/target/...` material.

- Related target doc: `docs/target/hermes-adapter-design.md`
- Why current state differs from target: the current reset intentionally stops at document assets and research skeletons instead of implementing runtime-hosted adapters

## Maintenance Notes

- Update this file when the current behavior, risks, or key paths are clarified.
- Move desired-future design into `docs/target/`, not into this file.
