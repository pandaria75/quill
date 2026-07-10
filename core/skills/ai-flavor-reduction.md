# Skill: AI Flavor Reduction

## Purpose

Reduce generic, synthetic, or repetitive patterns that make prose feel machine-shaped through targeted edits. This is a texture pass, not a substitute for factual, structural, narrative, or style work.

## When To Use

- after factual correction, narrative polish, and style adaptation
- when prose sounds templated
- before final review

## Inputs

- current draft
- role-card and audience notes
- narrative and style notes

## Outputs

- revised draft with targeted synthetic patterns reduced
- a short list of returned issues when the apparent style problem belongs to an earlier pass

## Method

1. Mark only patterns that are actually harming the passage: canned symmetry or false balance, empty transitions, repetitive summaries, vague abstraction, and uniform sentence rhythm.
2. Replace vague abstraction with the specific meaning already supported by the draft. Trim padding and summary loops when they add no reader value.
3. Vary rhythm only where uniformity is accidental. Preserve useful structure, intentional repetition, and natural conversation when they help the reader.
4. Keep factual precision, technical caveats, explicit opinions, authorial reasoning, and understandable irregularity intact. A slightly awkward but understandable sentence may be the right choice for the author's voice.
5. Hand the result to final editing. Return unsupported claims, factual errors, severe ambiguity, or broken logic to factual review; return missing narrative connection to narrative polish; return audience or voice misfit to style adaptation.

## What This Skill Must Not Do

Reducing AI flavor must not manufacture mistakes, slang, fragments, grammatical defects, eccentricity, or artificial irregularity. Naturalness is preserved when it already serves meaning and voice; it is never a quota or a performance of imperfection.

## Quality Bar

- prose sounds specific
- rhythm varies naturally
- edits improve readability without hiding facts
- intentional structure, repetition, conversational wording, and understandable awkwardness survive when useful

## Boundaries And Handoffs

- **Primary ownership:** targeted detection and reduction of synthetic-sounding texture patterns after the draft's flow and style are established.
- **Not owned here:** correcting evidence, deciding argument order, or setting the author's audience voice.
- **Hand off backward:** factual review owns unsupported claims and factual failures; narrative polish owns flow and reasoning; style adaptation owns first-person stance, explicit opinion markers, and audience-appropriate conversational wording.
- **Hand off forward:** final editing decides whether the near-final copy is ready and must not reintroduce generic uniformity merely for formal neatness.

## Stop Or Return Criteria

Stop this pass when the proposed edit would change a claim, erase a useful caveat, make the passage less understandable, or require invented defects to sound human. Return the issue to its primary owner instead of disguising it as an AI-flavor concern.

## Common Failure Modes

- deleting useful structure along with repetition
- replacing plain language with forced cleverness
- masking unresolved factual issues as style issues
- manufacturing slang, fragments, mistakes, or eccentricity to simulate a human voice

## Related Artifacts

- `../artifact-contracts/rewrite.md`
- `../artifact-contracts/draft.md`
- `../review-gates/before-final.md`
- `narrative-polish.md`
- `style-adaptation.md`
- `factual-review.md`
