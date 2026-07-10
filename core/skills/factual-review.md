# Skill: Factual Review

## Purpose

Check whether a draft's claims are supported, correctly scoped, and honest about what is known. This is a substance review, not a polish pass: clear prose cannot make an unsupported claim reliable.

## When To Use

- after a draft exists and before final editing;
- when sources, examples, dates, scope, or technical conclusions are in doubt;
- when a rewrite pass exposes a possible factual or reasoning problem.

## Inputs

- draft and its intended audience, purpose, and authorial stance;
- context pack and claim-level notes where available;
- cited, linked, observed, or otherwise referenced evidence.

## Outputs

- review notes that classify material statements and identify their support;
- corrections, caveats, or questions for the author or user;
- a clear handoff: ready for final editing, return to drafting or research, or pause for user discussion.

## Statement Categories

Classify the meaningful statement before deciding how to treat it. A statement may contain more than one category; separate them rather than letting one supported detail validate the whole sentence.

| Category | What it is | Suitable treatment |
| --- | --- | --- |
| Verified fact | A checkable statement directly supported by reliable, relevant evidence. | Keep the evidence traceable and preserve its limits. |
| Evidence-backed conclusion | A conclusion reasonably drawn from stated evidence. | Show the connection and qualify it when the evidence does not establish certainty. |
| Author judgment | A stated evaluation, preference, or interpretation. | Keep the authorial voice; mark it as judgment rather than fact. |
| Assumption or inference | A provisional premise or conclusion not directly established by the available evidence. | Label it, narrow it, support it further, or ask whether it may be used. |
| Unresolved speculation or unknown | A claim whose truth, applicability, or required context cannot yet be established. | Do not present it as settled; use a visible caveat only if it is non-blocking, otherwise pause for discussion. |

Examples: “The benchmark completed in 42 seconds” is a verified fact only when the benchmark and conditions can be checked. “That result suggests the cache is the main bottleneck” is an evidence-backed conclusion if the reasoning is shown. “I would not choose this trade-off for a small team” is an author judgment. “The next release will likely fix it” is an inference or speculation unless a reliable commitment supports it.

## Decision Guidance

1. List the draft's central claim, consequential supporting claims, numbers, comparisons, and causal statements.
2. Classify each statement and locate its evidence, reasoning, or explicit authorial marker.
3. Check scope: audience, environment, version, time, sample, exception, and condition should not be broader than the support allows.
4. Check the reasoning chain. Evidence may support an observation without proving a cause, recommendation, or universal rule.
5. Decide the handling:
   - **Correct before handoff** factual errors, stale claims presented as current, misleading scope, invented authority, false precision, and broken reasoning.
   - **Clarify or qualify** conclusions that are plausible but stronger than their evidence, and non-blocking assumptions that can remain visible to the reader.
   - **Discuss with the user** blocking uncertainty about the central claim, factual accuracy, technical conclusion, public sensitivity, or a solution choice. Do not resolve it by guesswork.
   - **Preserve** clearly marked author judgments when they do not impersonate evidence or conceal uncertainty.

## Review Questions

- What exactly is being claimed, and which category does it belong to?
- Can a reader distinguish observed fact, conclusion, and the author's judgment?
- Does the evidence support this scope, comparison, causal link, or degree of certainty?
- Would a missing condition, counterexample, or date materially change the meaning?
- Is uncertainty visible and non-blocking, or does it require a user decision before this passage can proceed?

## Stopping And Handoff

Return the draft for correction or user discussion when a material claim is false, misleading, falsely certain, unsupported at its stated scope, or based on broken reasoning. Also stop when essential evidence is unavailable and the missing answer changes the central claim or recommendation.

Hand off to final editing only when material claims have an appropriate category and treatment, evidence and caveats are traceable enough for the intended use, and no blocking factual or reasoning issue remains. Final editing must not silently solve an unresolved factual question.

## Quality Bar

- important claims are traceable to evidence, reasoning, or clearly marked author judgment;
- conclusions do not outrun evidence;
- uncertainty is visible at the appropriate level;
- no invented authority, false precision, misleading scope, or hidden speculation remains.

## Common Failure Modes

- checking wording instead of substance;
- treating an opinion as a fact because it sounds confident;
- allowing implication, causation, or generality to outrun evidence;
- accepting a caveat where the unknown actually blocks the article's claim;
- asking final editing to repair a factual or reasoning problem.

## Boundaries

This skill provides an advisory, document-based review method. It does not verify facts automatically, select sources, run tools, or enforce a runtime gate.

## Related Artifacts

- `../artifact-contracts/review.md`
- `../artifact-contracts/context-pack.md`
- `../review-gates/before-final.md`
