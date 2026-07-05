# Requirement: Issue #19 Lightweight Checkpoint Result Format

## Source

- GitHub issue: #19 `[Feature] Add lightweight checkpoint result format`
- Area: `checkpoint`
- Phase: `P2 Quality`
- User confirmation: implement the recommended MVP scope: document the format, add a lightweight source type, keep runtime behavior unchanged, and leave a clear extension point.

## Goal

Define a lightweight checkpoint result format for Quill quality gates without introducing a Marionettist runtime dependency or premature platform/shared-core design.

## MVP Scope

1. Document the checkpoint result format in repository docs.
2. Add a lightweight source-level type/schema, such as `CheckpointResult`, for future quality-gate work.
3. State explicitly that this task does not change workflow runtime behavior, does not auto-write checkpoint files, and does not add CLI checkpoint commands/output.
4. Leave a clear future extension point for P2 quality gates.

## Out of Scope

- Marionettist runtime dependency.
- Shared-core extraction.
- Automatic checkpoint file persistence.
- New CLI commands or changed `quill run`, `quill step`, or `quill status` behavior.
- Web UI, database, plugin marketplace, automatic publishing, automatic web research, or complex model routing.
- Changing artifact detection status or lifecycle/frontmatter status semantics.

## Boundary Decisions

- Checkpoint result is a third, quality-gate result vocabulary. It must not replace runtime artifact detection status (`missing`, `empty`, `pending`, `exists`) or reserved lifecycle/frontmatter status (`created`, `generated`, `edited`, `reviewed`, `final`).
- The format should remain local-first, Markdown-friendly, human-readable, and small enough to be embedded in docs or future artifact metadata/files.
- The initial type should be independent from workflow execution and persistence.

## Approved Format Shape

The MVP checkpoint result format uses these verdict values:

- `pass`
- `warn`
- `fail`
- `skip`

The MVP source type should represent this shape:

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

The approved verdict values intentionally do not overlap with artifact detection status (`missing`, `empty`, `pending`, `exists`), lifecycle/frontmatter status (`created`, `generated`, `edited`, `reviewed`, `final`), or write results (`created`, `updated`, `skipped`).

## Acceptance Criteria

- Documentation clearly defines the checkpoint result purpose, fields, allowed verdict values, and non-goals.
- Source includes a lightweight exported type/schema for checkpoint result data.
- The implementation does not change current CLI behavior.
- `npm run check` passes.
- MVP boundaries and future extension notes are explicit.

## Open Questions

- None blocking for the approved MVP scope.
- Future tasks must decide where checkpoint results live and when they are produced.
