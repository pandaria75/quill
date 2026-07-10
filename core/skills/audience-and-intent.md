# Skill: Audience and Intent

## Purpose

Define who the piece is for, what it should achieve, and what constraints shape success.

## When To Use

- at workflow start
- when audience assumptions feel vague
- before topic narrowing

## Inputs

- brief or assignment
- target publication context
- known audience constraints

## Outputs

- explicit audience statement
- intent summary
- success criteria for the article
- authorial stance and its visible boundaries
- an uncertainty record with a discussion decision

## Method

1. Name the primary audience: its technical context, vocabulary, likely decision, and what it already knows.
2. State the desired reader outcome and the article's purpose; distinguish that purpose from a merely broad topic.
3. Record scope, constraints, non-goals, and public-sensitivity considerations.
4. Capture the technical-blog author's stance where it matters: whether the piece speaks from first-person experience (`我`), makes an explicitly marked author judgment, or primarily explains evidence. Do not invent experience, consensus, or certainty to fill this field.
5. Classify each material planning statement as a verified fact, evidence-backed conclusion, author judgment, assumption, inference or speculation, or unknown. Keep its basis beside it rather than allowing a planning label to imply proof.
6. Route uncertainty before narrowing the topic. A blocking uncertainty requires user discussion; a non-blocking uncertainty may remain only with a visible caveat or explicit marker in the handoff.

## Uncertainty Routing

Treat uncertainty as **blocking** when resolving it could change the central claim, intended audience, technical conclusion, solution, factual accuracy, public sensitivity, or authorial stance. Stop work on the affected decision and discuss it with the user rather than guessing.

An uncertainty is **non-blocking** only when it does not change those decisions and can safely remain visible while later work continues. Record it as a caveat, placeholder, or open question with its owner or resolution point; do not quietly convert it into an assumption or fact.

Frame a user question concisely: name the decision, explain why the answer changes the article, state the supported options or known evidence, and ask for the needed choice. For example: “Should this target operators new to the system or experienced maintainers? That changes the vocabulary, examples, and the article's central promise.”

## Claim-Basis Notes

| Category | Planning treatment |
| --- | --- |
| Verified fact | Retain a source, direct observation, or checkable basis. |
| Evidence-backed conclusion | Record the evidence, reasoning, and material limit. |
| Author judgment | Mark it as the author's evaluation or preference; include why it is useful. |
| Assumption | State the provisional premise and what would invalidate it; never present it as confirmed. |
| Inference or speculation | Label the reasoning as tentative, hypothesis, or open possibility. |
| Unknown | Say what is not known and whether it blocks the next decision. |

## Quality Bar

- audience is specific
- intent is testable
- scope avoids trying to serve everyone
- authorial stance is appropriate to the technical-blog role and not fabricated
- every material uncertainty has a visible route: discuss, caveat, or defer

## Common Failure Modes

- audience defined too broadly
- article goal confused with topic label
- hidden constraints left unstated
- treating an author judgment, assumption, or speculation as audience evidence
- guessing a consequential audience, sensitivity, or stance preference instead of discussing it

## Related Artifacts

- `../artifact-contracts/intent.md`
- `../role-cards/technical-blog.md`
- `../workflows/longform-writing.md`
