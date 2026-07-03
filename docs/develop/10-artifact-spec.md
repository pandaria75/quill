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

## Artifact Rules

- Do not store critical state only in memory.
- Do not silently overwrite human edits.
- Do not generate empty artifacts and report success.
- Keep artifacts plain Markdown until block markers or IR are justified by real needs.
