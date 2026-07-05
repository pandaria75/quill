# Workflow Design

The MVP has one fixed workflow: `technical-blog`.

## Workflow Steps

1. `brief`: clarify topic, audience, message, angle, constraints, and notes.
2. `sources`: organize user-provided notes and references without automatic web research.
3. `outline`: produce the article structure.
4. `draft`: write the first full article draft.
5. `review`: inspect the draft for structure, style, AI flavor, factual risks, and fixes.
6. `final`: repair and polish the draft using the review.

## Workflow File

The MVP workflow file is JSON, stored at `.quill/workflows/technical-blog.json`.

It supports only:

- `name`
- `description`
- ordered `steps`
- per-step `input`
- per-step `output`
- per-step `modelRole`
- per-step `humanReview`

## Deliberately Unsupported

- conditional branches
- loops
- concurrency
- multi-agent collaboration
- generic workflow DSL
- plugin mechanism

## Human Review Points

The workflow marks `sources`, `outline`, and `final` as human review points. In the MVP this can be represented as metadata and CLI output. Later versions can add explicit approval commands.

## Future Checkpoint Result Extension Point

Future quality-gate work may attach a lightweight checkpoint result to workflow-adjacent review or validation steps without changing the current MVP workflow model yet.

Checkpoint result purpose:

- represent the outcome of a named checkpoint
- keep quality-gate semantics separate from artifact detection and lifecycle status vocabularies
- stay small and human-readable for Markdown-friendly use

Approved MVP shape:

- `checkpoint`: required string
- `verdict`: required `pass | warn | fail | skip`
- `summary`: required string
- `issues`: optional string array
- `nextSteps`: optional string array

Non-goals in this slice:

- no runtime workflow execution changes
- no artifact read/write or persistence decision
- no CLI command or output changes

Future extension point:

- a later task can decide whether workflow review or validation steps emit checkpoint results and how those results are stored or surfaced
