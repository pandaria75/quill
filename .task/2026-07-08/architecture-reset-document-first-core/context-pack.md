# Context Pack: Quill Architecture Reset

## Task Goal

Reset Quill into a document-first longform-writing workflow kit with portable Core document assets, scaffold-only installer, and Hermes research-first distribution docs.

## Requirement Source

`.task/2026-07-08/architecture-reset-document-first-core/requirement.md`

## Implementation Source

`.task/2026-07-08/architecture-reset-document-first-core/implementation-plan.md`

## Involved Modules Or Knowledge Areas

- Root package metadata
- Old CLI/runtime/model code
- Document-first Core assets
- Installer scaffold
- Hermes distribution research docs
- Public README and project knowledge routing

## Loaded Rules

- `AGENTS.md`
- `.aiassistant/rules/00-repository-rules.md`
- `.aiassistant/rules/workflow-rules.md`

## Loaded Docs

- `docs/project/knowledge-map.md`
- `docs/current/system-map.md`
- `docs/target/quill-core-architecture.md`
- `docs/target/hermes-adapter-design.md`

## Allowed Modification Scope

Current slice S1 may modify/delete repository files needed to remove old runtime surface and add document-first assets:

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

## Forbidden Modification Scope

- No GitHub issue/PR mutation in S1.
- No publish/release/deploy/global config mutation.
- No project-external writes except `/tmp/opencode` validation targets.
- No standalone runtime/model client/workflow runner/memory runtime/provider router/publishing system.

## Key Existing Entrypoints

- Old `src/cli.ts` registers forbidden commands and should be deleted/replaced by installer-only entrypoint under `tools/installer`.
- Old `src/workflows/runWorkflow.ts` and `src/llm/OpenAICompatibleClient.ts` implement forbidden model-backed workflow execution.
- Old `adapters/hermes/quill_hermes/*` implements a Hermes adapter and should be replaced by research/documentation skeleton.

## Current Approved Slice

S2-github-issue-freeze-and-pr

## Execution Mode

Sequential. Gate policy selected: strict.

## S2 Allowed Scope

- Ensure GitHub label `frozen-old-direction` exists.
- For issues #20-#25: add the uniform freeze comment, add `frozen-old-direction`, and close as not planned when supported.
- Create Architecture Reset issue.
- Create follow-up issues A-F.
- Run final validation, commit, push `reset/document-first-core`, and create PR.

## S2 Forbidden Scope

- No additional product/documentation edits except task-state updates needed for execution evidence.
- No publish/release/deploy/global config mutation.
- No force-push, history rewrite, or branch deletion.

## Validation Commands

- `node tools/installer/src/cli.js init --target /tmp/opencode/quill-installer-smoke`
- `npm pack --dry-run`
- grep forbidden product strings in active product files
- S2: `gh issue view` #20-#25 to verify closed state, label, and freeze comment.
- S2: `gh issue view` created reset/follow-up issues to verify titles exist.
- S2: `gh pr view` created PR to verify URL, title, branch, and body.

## S2 Execution Checklist

1. Ensure label `frozen-old-direction` exists; create it if absent.
2. Preflight-read #20-#25 state.
3. For each issue #20-#25: add uniform comment, apply label, close.
4. Create Architecture Reset issue with the title and body from the user prompt.
5. Create follow-up issues A-F from the user prompt.
6. Re-run local validation and inspect `git status`, `git diff`, and recent log before commit.
7. Commit intended files only.
8. Push `reset/document-first-core` and create PR against `main`.

## S2 Issue Templates

### Freeze Comment For #20-#25

```markdown
This issue is frozen after the Quill architecture reset.

It was created under the old CLI-MVP direction. Do not implement it directly.

Quill is being repositioned as a document-first longform-writing workflow kit. Any useful idea from this issue should be translated later into one of:

- core skill
- role-card
- artifact contract
- review gate
- memory policy
- platform distribution note

Do not use this issue as an execution entrypoint for building CLI runtime, model provider clients, workflow runners, memory runtime, or generic agent infrastructure.

Superseded by the architecture reset work.
```

### Architecture Reset Issue

- Title: `[Architecture Reset] Rebuild Quill as document-first longform-writing workflow kit`
- Body source: user-provided Section 10.5 architecture reset issue body from the task prompt.

### Follow-Up Issues A-F

- `[Reset] Remove old CLI runtime and add postmortem`
- `[Core] Create document-first Quill Core structure`
- `[Core] Define longform-writing workflow`
- `[Core] Add technical-blog role-card`
- `[Installer] Add scaffold-only installer`
- `[Hermes Research] Verify required Hermes capabilities before plugin development`

## Test Strategy

### Selected Strategy
- Task type: architecture reset/refactor/docs/package scaffold
- Change type: product surface deletion plus scaffold-only installer
- Strategy summary: smoke scaffold output, package dry-run, static forbidden-surface search, and review.

### Required Evidence
- Installer creates target root `AGENTS.md` and `.quill/core`, `.quill/distributions`.
- Package retains `@pandaria/quill` and exposes installer only.
- Old runtime commands and model client are absent from product entrypoints.

### NOT_RUN Conditions
- Live Hermes plugin execution: NOT_RUN because this slice intentionally does not implement a plugin.
- GitHub issue mutations: NOT_RUN in S1; reserved for S2 after gate.

## Assumptions

- Historical `.task/**` artifacts may retain old CLI references as project history.
- Existing target docs can be superseded by user reset instructions where conflicts exist.

## Risks

- Package metadata may accidentally omit installable assets.
- Over-cleaning docs could erase useful postmortem evidence; preserve pivot rationale instead.
- Hermes API details must not be guessed.

## Stop Conditions

- If implementation appears to require a runtime, model client, workflow engine, memory runtime, or Hermes plugin, stop and document blocker.
- Stop at strict gate after S1 coding, validation, and review.
- For S1b, do not delete `.task/**`, `docs/archive/cli-mvp-postmortem.md`, `docs/project/**`, `docs/current/system-map.md`, or `docs/target/**`.
- For S1b, preserve `docs/en/**` and `docs/zh-CN/**`; user selected option 2 to leave them for later rewrite.
