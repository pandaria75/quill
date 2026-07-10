# Skill: Outline Architecture

## Purpose

Design a structure that can carry the chosen angle from opening to conclusion.

## When To Use

- after angle selection
- before long drafting sessions
- when argument order feels unstable

## Inputs

- audience and intent
- chosen angle
- context pack

## Outputs

- working structure
- section purpose notes with reader-facing jobs
- dependency order for claims and examples
- visible claim-basis, uncertainty, and author-judgment notes where they affect the argument

## Method

1. Define the through-line. For a technical blog, a useful default is **problem -> why it matters -> how to address it**: establish the reader's concrete difficulty, make its consequence or trade-off legible, then explain a supported path forward.
2. Treat that progression as a preference, not a template. A comparison, incident narrative, reference guide, or decision memo may need another order when the audience, evidence, or topic makes it clearer. Record why the alternative serves the reader better.
3. Give every section a reader-facing job, not just a topic label. A section might orient the reader, establish a mechanism, test a claim, expose a limit, compare options, or turn the reasoning into a practical next step.
4. Group points by the job they do, then order them for comprehension rather than note chronology. Introduce terms, conditions, and evidence before asking the reader to rely on them.
5. For each material claim, keep the chain visible: evidence or stated premise -> reasoning -> conclusion, recommendation, or marked author judgment. Do not let a conclusion appear merely because it makes the outline flow smoothly.
6. Mark where author judgment enters. A judgment may guide a recommendation when it is visibly framed as the author's evaluation and includes useful reasoning; it must not silently stand in for a verified fact or evidence-backed conclusion.
7. Carry the context pack's uncertainty route into the affected section. Continue with a non-blocking uncertainty only when its caveat, placeholder, or open-question marker remains visible and has a resolution point. Stop outlining the affected passage and discuss a blocking uncertainty with the user before choosing its framing, claim, or solution.
8. Mark evidence gaps, transition needs, and unresolved dependencies before drafting. A gap is not permission to invent support or to make a provisional claim sound settled.

## Reader-Facing Section Notes

Use a compact section record when it helps make the argument inspectable:

| Section | Reader-facing job | Claim basis and support | Judgment or uncertainty treatment | Handoff |
| --- | --- | --- | --- | --- |
| Opening | Recognize the problem and its scope | What is observed, sourced, or assumed | Mark an author judgment or caveat if present | Set up the significance question |
| Significance | Understand why the problem changes a decision, cost, risk, or outcome | Evidence and reasoning for the consequence | Preserve material limits | Prepare the criteria for a response |
| Response | Understand how to address the problem and when that response fits | Mechanism, evidence, trade-offs, and conclusion | Mark recommendations as judgment when appropriate | Lead to application or conclusion |

This is a recommended aid, not a required outline shape. Sections may be merged, repeated, reordered, or replaced when doing so better serves the reader and preserves the evidence chain.

## Uncertainty Stop Condition

Do not structure around an assumed answer when uncertainty could change the central claim, intended audience, technical conclusion, solution choice, factual accuracy, public sensitivity, or authorial stance. Stop the affected outline work and ask the user for the decision, its impact, and the known evidence or options.

For example: “Should this section recommend the migration as the default path, or present it as one option for teams with this constraint? The current evidence supports only the second framing, and the answer changes the conclusion.”

Minor uncertainty may remain in the outline only as a visible caveat, placeholder, or open question. It must not be converted into an unqualified section promise.

## Quality Bar

- structure supports the angle
- each section has a reader-facing job
- evidence, reasoning, and conclusions remain connected
- author judgment and non-blocking uncertainty are visible where they affect the reader's interpretation
- transitions can be inferred without relying on hidden assumptions

## Common Failure Modes

- outline mirrors note chronology
- sections overlap heavily
- major claims appear before setup
- forcing problem -> why -> solution onto a subject that needs another structure
- treating an author judgment, assumption, or inference as structural proof
- placing a blocking uncertainty inside the outline as though it were settled

## Related Artifacts

- `../artifact-contracts/structure.md`
- `../review-gates/before-draft.md`
- `../workflows/longform-writing.md`
