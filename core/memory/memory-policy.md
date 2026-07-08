# Memory Policy

Quill memory is optional, document-driven guidance for carrying durable writing context across projects. It helps future work reuse approved preferences, recurring decisions, and stable lessons without requiring Quill Core to own storage, sync, indexing, runtime persistence, or a platform-specific memory tool.

## What Memory Means In Quill Core

Memory is a reviewed body of durable context that a writer or agent may consult before planning, drafting, reviewing, or rewriting. It is not a transcript archive, hidden profile, vector index, runtime database, or automatic recall system.

Use memory to preserve decisions that remain useful beyond one draft, such as:

- approved audience or positioning preferences;
- stable tone, style, terminology, or formatting choices;
- recurring editorial lessons from completed reviews;
- reusable constraints for a publication, client, role-card, or long-running writing program;
- explicit negative preferences, such as topics, claims, or patterns to avoid.

## When To Consider Memory Candidates

Consider creating memory candidates only at natural review points, not during every writing action. Good moments include:

- after an intent, angle, or structure decision is explicitly approved;
- after a draft or final review identifies a durable lesson;
- after a user corrects a recurring style, audience, terminology, or scope issue;
- after a completed article reveals a reusable framing, caveat, or exclusion;
- when retiring stale guidance exposes a replacement rule that should be reviewed.

If the value is limited to the current article, keep it in the current artifact instead of promoting it to memory.

## Review Expectations

Memory should be promoted only after deliberate review. A reviewer should be able to answer:

- Is this durable beyond the current draft?
- Is it phrased as guidance rather than as a hidden instruction?
- Is the source decision or observation clear enough to audit later?
- Is it safe to reuse without exposing unpublished, private, or sensitive material?
- Could it conflict with a newer role-card, intent, user instruction, or publication requirement?

When answers are unclear, leave the item as a candidate or reject it. Current task artifacts and explicit user instructions should override older memory guidance.

## Retention And Pruning

Memory should stay small, current, and useful. Periodically review accepted entries for:

- stale preferences that no longer match the user, publication, or role-card;
- duplicate entries that can be merged into one clearer statement;
- over-broad guidance that should be narrowed to a specific workflow, audience, or project;
- lessons that were true for one article but not reusable;
- sensitive or unpublished details that should not have been retained.

Prefer pruning or narrowing questionable memory over accumulating weak context. If an entry cannot be validated or no longer changes future writing decisions, remove it from active memory guidance.

## Exclusions

Do not promote these into memory by default:

- raw drafts, outlines, notes, transcripts, or critique text;
- unpublished sensitive details, private business context, credentials, or personal data;
- speculative claims, unresolved facts, or unverified research notes;
- one-off preferences for a single article unless the user explicitly makes them reusable;
- platform credentials, model settings, tool state, file paths, or runtime behavior;
- hidden instructions that override explicit future user choices.

## Boundary

Quill Core may define what memory-worthy guidance looks like and how it should be reviewed. It must not define or require a storage backend, synchronization mechanism, indexing strategy, runtime persistence layer, model-provider integration, or platform-specific memory feature.
