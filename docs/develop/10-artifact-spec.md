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

Suggested status values:

- `created`
- `generated`
- `edited`
- `reviewed`
- `final`

The MVP may not enforce all statuses, but the file format should leave room for them.

## Artifact Rules

- Do not store critical state only in memory.
- Do not silently overwrite human edits.
- Do not generate empty artifacts and report success.
- Keep artifacts plain Markdown until block markers or IR are justified by real needs.
