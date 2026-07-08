# Quill Architecture Reset Implementation Plan

## Requirement Source

`.task/2026-07-08/architecture-reset-document-first-core/requirement.md`

## Scope Summary

Reset product architecture from CLI/runtime MVP to document-first Core assets plus scaffold-only installer and Hermes research documentation.

## Involved Modules Or Areas

- Root package metadata and npm entrypoint
- Old TypeScript CLI/runtime under `src/`
- Old TypeScript Core package under `packages/core/`
- Old Hermes adapter under `adapters/hermes/`
- New document-first assets under `core/`
- New distribution docs under `distributions/hermes/`
- New installer under `tools/installer/`
- README and project knowledge routing
- GitHub issues #20-#25 and reset issues

## Loaded Rules

- `AGENTS.md`
- `.aiassistant/rules/00-repository-rules.md`
- `.aiassistant/rules/workflow-rules.md`

## Loaded Docs

- `docs/project/knowledge-map.md`
- `docs/current/system-map.md`
- `docs/target/quill-core-architecture.md`
- `docs/target/hermes-adapter-design.md`

## Global Forbidden Scope

- Do not implement standalone agent runtime, model provider client, workflow runner, generic workflow engine, memory runtime, provider router, publishing system, or Hermes/OpenCode/Pi/Dify replacement.
- Do not implement a full Hermes plugin before capability research.
- Do not reintroduce `quill new`, `quill step`, `quill run`, or `quill status` as product commands.

## Execution Strategy

- Complexity: complex
- Default Execution: sequential
- Parallel Execution: not-needed
- Fallback Execution: sequential
- Merge Owner: primary orchestrator
- Conflict Resolution Rule: user reset prompt wins over previous CLI-MVP docs when conflicts exist.

## Slice Dependency Graph

| Slice | Depends On | Can Run In Parallel With | Fallback Order | Shared Files | Merge Owner | Conflict Risk |
| --- | --- | --- | --- | --- | --- | --- |
| S1-document-first-core-and-installer-reset | analysis approval | none | 1 | package, README, docs routing | primary orchestrator | high |
| S1b-delete-old-cli-mvp-docs | S1 + explicit user confirmation | none | 2 | docs routing | primary orchestrator | medium |
| S2-github-issue-freeze-and-pr | S1b | none | 3 | GitHub issues/PR | primary orchestrator | medium |

## Implementation Slices

### Slice 1: S1-document-first-core-and-installer-reset

#### Goal

Perform the repository architecture reset in files: remove old runtime product surface, add document-first Core structure, add scaffold-only installer, add Hermes research docs, update README/package metadata, and add postmortem.

#### Allowed Modification Scope

- `core/**`
- `distributions/hermes/**`
- `tools/installer/**`
- `docs/archive/**`
- `docs/project/knowledge-map.md`
- `docs/current/system-map.md`
- `README.md`
- `package.json`
- `package-lock.json`
- `.npmignore`
- `.gitignore`
- delete/replace old `src/**`, `packages/core/**`, `scripts/**`, `adapters/hermes/**`

#### Forbidden Scope

- No external writes outside repository except validation temp dirs under `/tmp/opencode` if needed.
- No GitHub mutations in S1.
- No publishing, release, deploy, or global config mutation.

#### Execution

- Mode: sequential
- Depends On: analysis approval
- Can Run With: none
- Must Not Run With: S2 GitHub issue mutation
- Fallback Order: 1
- Shared Files: package metadata, README, knowledge map
- Merge Owner: primary orchestrator
- Conflict Risk: high
- Gate Class: high-risk
- Risk Score: 5
- Gate Reasons: runtime-deletion, package-entrypoint-change, architecture-reset, hermes-boundary
- Validation Level: slice
- Recommended Agent Strategy: bounded coder implementation then bounded review.

#### Steps

1. Remove old CLI/runtime/model/Hermes implementation files.
2. Add document-first Core assets in `core/`.
3. Add Hermes distribution research/checklist/report and documentation skeleton.
4. Add scaffold-only installer in `tools/installer/src/cli.js`.
5. Update package metadata to retain `@pandaria/quill` and expose only installer `init` command.
6. Rewrite README and add CLI MVP postmortem.
7. Update project knowledge routing/current map.

#### Validation

- `node tools/installer/src/cli.js init --target /tmp/opencode/quill-installer-smoke`
- inspect generated `/tmp/opencode/quill-installer-smoke/AGENTS.md` and `.quill/`
- `npm pack --dry-run`
- grep product files for forbidden command strings and model client claims

#### Done Criteria

- Old CLI commands are absent from product entrypoints.
- `@pandaria/quill` package name is retained.
- Installer supports only `init` and `init --target`.
- Required `core/` and `distributions/hermes/research/` files exist.
- README states document-first Core, installer non-runtime, Hermes research-first, and technical-blog role-card.

#### Rollback Notes

- Revert S1 commit or branch changes to restore previous CLI MVP.

### Slice 1b: S1b-delete-old-cli-mvp-docs

#### Goal

Delete old CLI-MVP product/development/user documentation after explicit user confirmation that old docs should also be removed.

#### Allowed Modification Scope

- Delete `docs/develop/**`
- Delete `docs/templates/**`
- Delete `docs/examples/**`
- Delete `examples/articles/**`
- Update `docs/project/knowledge-map.md`, `docs/current/system-map.md`, and `README.md` only if needed to remove stale references

#### Forbidden Scope

- Do not delete `.task/**` history.
- Do not delete `docs/archive/cli-mvp-postmortem.md`.
- Do not delete `docs/project/**`, `docs/current/system-map.md`, or `docs/target/**` unless a later explicit confirmation names them.
- Do not delete `docs/en/**` or `docs/zh-CN/**` in S1b; user selected option 2 to preserve these for later rewrite.
- No GitHub mutations in this slice.

#### Execution

- Mode: sequential
- Depends On: S1-document-first-core-and-installer-reset
- Gate Class: high-risk
- Risk Score: 5
- Gate Reasons: destructive-doc-delete, old-direction-cleanup, docs-routing
- Validation Level: slice

#### Validation

- Confirm deleted paths no longer have tracked files.
- Static search active docs for stale old CLI-MVP user/develop doc references.
- Confirm preserved archive/project/current/target docs still exist.
- Confirm preserved `docs/en/**` and `docs/zh-CN/**` still exist.

#### Done Criteria

- Confirmed old CLI-MVP docs are deleted.
- Knowledge routing does not point to deleted docs.
- English and Chinese public docs remain for later rewrite.

#### Rollback Notes

- Restore deleted docs from git if the cleanup is too broad.

### Slice 2: S2-github-issue-freeze-and-pr

#### Goal

Perform GitHub issue maintenance and open PR after S1 passes review.

#### Allowed Modification Scope

- GitHub labels/issues/PR only.

#### Forbidden Scope

- No additional repository code edits unless S1 review requires repair.

#### Execution

- Mode: sequential
- Depends On: S1-document-first-core-and-installer-reset
- Gate Class: boundary-sensitive
- Risk Score: 4
- Gate Reasons: external-github-mutation, issue-closure
- Validation Level: final

#### Validation

- `gh issue view` checks for #20-#25 state/label/comment.
- PR URL returned.
- Verify Architecture Reset issue and follow-up issues A-F exist.
- Verify remote branch exists after push.

#### Done Criteria

- #20-#25 are commented, labeled, and closed.
- Reset epic and recommended follow-up issues are created or blockers reported.
- PR is created from `reset/document-first-core`.

## Final Validation

- Installer smoke and package dry run pass.
- GitHub issue state is verified after S2.

## Documentation Update Requirement

README, postmortem, knowledge map, current map, Core assets, and Hermes research docs must be updated in S1.

## Risks

- Large deletion may leave package metadata or docs pointing to old paths.
- Hermes installed behavior is only partially observed; API details must stay `unknown`.
- GitHub mutation requires explicit gate after S1.
