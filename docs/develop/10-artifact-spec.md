# Artifact Spec

All Quill MVP artifacts are ordinary Markdown files. They must be readable, editable, and suitable for Git diffs.

## Article Workspace

```text
docs/articles/<date>-<slug>/
  brief.md
  sources.md
  outline.md
  draft.md
  review.md
  final.md
```

## Required Artifacts

- `brief.md`: topic, target audience, core message, angle, constraints, notes.
- `sources.md`: user-provided notes, reference links, claims to verify, missing information.
- `outline.md`: working title, opening, sections, conclusion, notes.
- `draft.md`: first full draft.
- `review.md`: structure, style, AI flavor, factual risks, fixes, decision.
- `final.md`: publishable Markdown draft after review-based repair.

## Frontmatter

Recommended format:

```markdown
---
article: "2026-xx-xx-why-agent-coding-needs-harness"
artifact: "outline"
status: "generated"
updated_at: "2026-xx-xxTxx:xx:xx"
---

# Outline
```

## Status Values

Quill currently uses two different status concepts:

- runtime file/content detection status, as reported by `quill status`: `missing`, `empty`, `pending`, `exists`
- future lifecycle/frontmatter status, which may be stored in artifact metadata later

Suggested lifecycle/frontmatter status values:

- `created`
- `generated`
- `edited`
- `reviewed`
- `final`

The current MVP does not enforce these lifecycle/frontmatter values. They are reserved semantics for artifact metadata, while `quill status` only reports the runtime detection labels above. The file format should leave room for future lifecycle status if needed.

## Checkpoint Result Format

Quill also reserves a separate lightweight checkpoint result format for future quality-gate outcomes. This format is documentation and source-type only in the MVP. It does not change runtime workflow execution, artifact persistence, or CLI output.

Purpose:

- record a small human-readable result for a named checkpoint
- keep checkpoint verdicts separate from artifact detection status and lifecycle/frontmatter status
- leave room for future embedding in docs or metadata without deciding persistence yet

Approved verdict values:

- `pass`
- `warn`
- `fail`
- `skip`

Approved fields:

- required `checkpoint`: checkpoint name or identifier
- required `verdict`: one of `pass | warn | fail | skip`
- required `summary`: short outcome summary
- optional `issues`: list of notable problems or concerns
- optional `nextSteps`: list of follow-up actions

Reference shape:

```ts
type CheckpointVerdict = "pass" | "warn" | "fail" | "skip";

interface CheckpointResult {
  checkpoint: string;
  verdict: CheckpointVerdict;
  summary: string;
  issues?: string[];
  nextSteps?: string[];
}
```

Non-goals for this MVP:

- changing runtime workflow behavior
- deciding where checkpoint results are stored
- auto-writing checkpoint result files
- adding CLI checkpoint commands or output changes

Future extension point:

- a later task may decide when checkpoint results are produced and where they live, while keeping this verdict vocabulary distinct from other status systems

## Artifact Rules

- Do not store critical state only in memory.
- Do not silently overwrite human edits.
- Do not generate empty artifacts and report success.
- Keep artifacts plain Markdown until block markers or IR are justified by real needs.
