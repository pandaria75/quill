# Review Gate: Before Final

## Purpose

Use this advisory checkpoint to decide whether a reviewed or rewritten draft is ready to become the final article. The gate helps confirm that factual review, unresolved placeholders, rewrite needs, style fit, and final handoff expectations are visible before the user accepts the final version.

This gate is document-first and human-confirmed. It is not a runtime-enforced blocker, hidden automation step, model-call requirement, publishing pipeline, or platform-specific approval mechanism.

## When To Use

Use this gate after drafting, review, and any needed rewrite pass, and before the final article is handed off for publication, archival, or downstream use.

Use it more carefully when:

- the article includes technical claims, external references, or time-sensitive facts;
- earlier review produced unresolved comments or rewrite requests;
- style, audience fit, or role-card alignment is important;
- the final handoff must include caveats, publication notes, or memory-candidate considerations.

## Input Artifacts

Recommended inputs:

- `draft`: the latest article text.
- `review`: factual, structural, style, and risk notes from review.
- `rewrite`: the latest rewrite plan or applied rewrite notes, if a rewrite pass occurred.
- `final`: the proposed final article or finalization notes.
- Earlier planning artifacts when needed: `intent`, `context-pack`, `angle`, and `structure`.

If review or rewrite artifacts are intentionally absent, record why the draft can still be finalized safely.

## Advisory Checklist

Before finalizing, check:

- Factual claims that matter to reader trust have been reviewed against available sources or marked with caveats.
- Unresolved placeholders, TODOs, comments, bracketed notes, and draft-only markers have been removed or intentionally retained with explanation.
- Rewrite requests from review are either applied, rejected with rationale, or explicitly deferred.
- The article still matches the confirmed intent, audience, angle, and scope.
- Style, tone, and depth fit the active role-card or user-provided style direction.
- Examples, links, code snippets, citations, and terminology are consistent and ready for readers.
- Sensitive assumptions, uncertain claims, or time-bound statements are not presented as stronger than the evidence supports.
- The final handoff notes make clear what is ready, what remains caveated, and what should not be inferred.

## User Confirmation / Decision Record

Record the user's decision in the finalization notes, task thread, or other visible handoff location.

Suggested format:

```md
### Before Final Gate Decision

- Decision: Accept final / Revise before final / Pause for clarification
- Confirmed by: <user or accountable reviewer>
- Date: <YYYY-MM-DD>
- Inputs reviewed: draft, review, rewrite, final, <other>
- Remaining caveats: <uncertain facts, publication notes, or deferred improvements>
- Final handoff instructions: <destination, formatting, exclusions, or next owner>
```

Accepting final means the user confirms the article is ready for the agreed handoff. It does not imply automated publication, runtime enforcement, or hidden approval outside the visible decision record.

## If Not Ready

If the gate is not ready, choose the smallest useful follow-up:

- perform targeted fact review on disputed or high-impact claims;
- remove or resolve placeholders and draft-only notes;
- complete a focused rewrite pass for clarity, structure, or reader fit;
- adjust tone or depth to match the intended audience and role-card;
- add caveats where evidence is incomplete or time-sensitive;
- ask the user to decide between competing finalization choices.

Avoid restarting the whole workflow unless the article no longer matches the confirmed intent or angle.

## Handoff

When the gate is confirmed, hand off:

- the final article;
- the decision record;
- remaining caveats, if any;
- publication or downstream-use notes, if provided by the user;
- any memory-candidate notes that should be reviewed separately under the memory guidance.

The receiving person or tool should treat the visible final handoff as the source of truth, not as evidence of unstated automation or hidden checks.
