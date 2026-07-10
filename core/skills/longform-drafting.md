# Skill: Longform Drafting

## Purpose

Produce a complete working draft without pretending it is already final.

## When To Use

- after the outline clears the draft gate
- when enough evidence exists to write through
- during major content generation

## Inputs

- intent
- angle
- structure
- context pack

## Outputs

- full draft
- visible caveats or placeholders for non-blocking unresolved gaps
- a record of blocking questions that stopped affected drafting

## Method

1. Draft section by section from the structure, preserving each section's reader-facing job. Keep the preferred problem -> why it matters -> how to address it through-line where the outline uses it, without forcing every paragraph into that sequence.
2. Keep material claims close to their evidence, stated premise, and reasoning. Make the conclusion, recommendation, or author judgment that follows proportionate to that support.
3. Preserve claim basis in prose. State verified facts precisely; explain evidence-backed conclusions with their relevant reasoning and limits; introduce author judgment as judgment; and label inference, speculation, and unknowns rather than smoothing them into certainty.
4. Use the technical-blog first-person singular stance (`我`) naturally when authorial perspective helps the reader understand an observation, trade-off, or judgment. Do not force first person into every sentence or fabricate personal experience to make the voice sound lived-in.
5. Write conversational or internet-native texture only when it improves pacing, emphasis, or rapport for the intended audience. It may coexist with precise technical explanation; it must not replace a mechanism, caveat, or explanation the reader needs.
6. Continue through a **non-blocking** uncertainty only when its caveat, placeholder, or open-question marker is visible in the affected passage and its resolution point is known. Do not invent missing evidence, examples, or support to make the draft feel complete.
7. Stop drafting the affected passage and discuss the issue with the user when uncertainty could change the central claim, intended audience, technical conclusion, solution choice, factual accuracy, public sensitivity, or authorial stance. Ask what decision is needed, why it changes the draft, and what evidence or options are currently available.
8. Flag weak passages, evidence gaps, and unfinished transitions instead of hiding them with confident language. Complete the end-to-end pass before micro-polish, leaving substantive repair for the appropriate later stage.

## Drafting Decision Guide

| Situation | Drafting treatment |
| --- | --- |
| Supported fact or evidence-backed conclusion | Draft it with its scope, evidence, reasoning, and material limit intact. |
| Author judgment | Mark it as the author's evaluation—for example, “我认为…” or an audience-appropriate equivalent—and give the reasoning that makes it useful. |
| Non-blocking uncertainty | Continue only with a visible caveat, placeholder, or open-question marker and a stated resolution point. |
| Blocking uncertainty | Stop the affected passage and discuss it with the user; do not choose its claim, audience, conclusion, solution, or stance by convenience. |
| Missing evidence | Mark the gap and return to evidence or planning work; never manufacture supporting detail. |

## Naturalness And Clarity

Prefer a readable, recognizably authored draft over mechanically uniform prose. An occasional understandable awkward or grammatically imperfect sentence may remain for later editing when it does not create a factual error, broken logic, severe ambiguity, or accidental unresolved placeholder. This tolerance does not authorize deliberately manufacturing defects, slang, irregularity, or false informality.

If a conversational phrase risks obscuring a technical claim, retain the texture only after the explanation, scope, and caveat are clear enough for the intended reader.

## Stop Condition And Handoff

For a blocking question, pause only the affected drafting path and frame a concise user question. For example: “Should this recommendation apply to all deployments or only to teams that can tolerate a maintenance window? That choice changes the solution and the caveat; the available evidence supports only the narrower claim.”

When the uncertainty is non-blocking, leave its visible marker in the draft and hand it to the planned evidence, review, or revision step. A visible marker is not a substitute for resolving a question that has become blocking.

## Quality Bar

- draft is complete end to end
- argument remains coherent
- evidence, reasoning, conclusions, and author judgments remain distinguishable
- first-person perspective appears naturally where useful, without becoming a mechanical pattern
- unresolved non-blocking issues are marked, not hidden
- blocking uncertainty has been discussed before the affected passage is drafted

## Common Failure Modes

- polishing too early
- drifting away from the chosen angle
- inventing support for missing evidence
- presenting a judgment, inference, or speculation as a settled fact
- using a caveat to continue through a blocking claim, audience, conclusion, solution, or stance decision
- forcing first-person voice or conversational texture until it obscures technical meaning

## Related Artifacts

- `../artifact-contracts/draft.md`
- `../review-gates/before-final.md`
- `../workflows/longform-writing.md`
