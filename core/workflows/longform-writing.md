# Longform Writing Workflow

## Purpose

Provide a portable, document-first method for producing high-quality longform writing.

## Scope

- one platform-neutral workflow family
- human-readable artifacts first
- role-cards adapt the workflow without becoming separate workflows
- review gates before major commitment points

## Workflow Shape

```text
intent
  -> context-pack
  -> angle
  -> structure
  -> draft
  -> review
  -> rewrite
  -> final
```

This shape is a methodology map, not an execution specification. Stages may be revisited when new evidence or user direction changes the writing basis, but the visible artifacts should make those changes inspectable.

## Stage Intent

1. `intent`: capture audience, goal, constraints, and desired reader effect.
2. `context-pack`: organize provided notes, references, examples, and factual risks.
3. `angle`: choose the article's point of view and central promise.
4. `structure`: design argument flow before drafting.
5. `draft`: write a complete but editable longform draft.
6. `review`: check clarity, factual risk, structure, audience fit, and AI flavor.
7. `rewrite`: repair the draft according to review findings.
8. `final`: produce the final human-approved document.

## Uncertainty Return Path

When uncertainty affects the central claim, intended audience, technical conclusion, solution choice, factual accuracy, public sensitivity, or authorial stance, pause the affected work and return the question to the user for discussion. Record the uncertainty and the decision needed in the current artifact rather than guessing or letting a later pass conceal it.

Minor uncertainty may continue only with a visible caveat or placeholder when it does not change those foundations. This is guidance for a human-visible handoff, not an automatic stop or escalation mechanism.

## Technical-Blog Progression

When the `technical-blog` role-card is active, prefer a reader-facing progression from the problem, to why it matters, to how it can be addressed. This is a useful through-line for structure, drafting, and rewriting—not a required outline shape. A different progression may better serve the evidence, audience, or article purpose.

Keep role-specific voice, opinion-marking, and naturalness guidance in `role-cards/technical-blog.md`; use the relevant skills for their detailed methods.

## Rewrite Coordination

For a technical blog, a useful advisory order is factual review first, then narrative polish, audience/style adaptation, targeted AI-flavor reduction, and final editing. Apply only the passes that help the document; this sequence does not prescribe an execution system.

Later passes should route a newly exposed factual, structural, or unresolved-uncertainty issue back to the earlier stage or skill that can address it. Narrative polish should not resolve factual questions, style adaptation should not mask a structural problem, AI-flavor reduction should not manufacture mistakes, and final editing should not flatten suitable authorial voice or tolerate severe ambiguity.

## Workflow-To-Assets Map

Use this map to connect each workflow stage to the Core assets that support it. The map is intentionally document-oriented: it describes what to inspect, produce, and confirm, not how any host tool should run the work.

| Stage | Typical Inputs | Output Artifact | Relevant Skills | Gates / Memory Touchpoints | Quality Criteria |
| --- | --- | --- | --- | --- | --- |
| `intent` | brief, assignment, target audience, publication context, constraints | `artifact-contracts/intent.md` | `skills/audience-and-intent.md` | memory may inform stable audience, tone, or publication preferences when explicitly relevant | audience is specific, purpose is testable, scope and non-goals are visible |
| `context-pack` | intent, source notes, references, examples, factual risks, known constraints | `artifact-contracts/context-pack.md` | `skills/context-pack-building.md` | memory candidates may be noted only for durable, reviewed lessons; raw notes stay out of memory by default | context is concise, sources are traceable, assumptions and unknowns are explicit |
| `angle` | intent, context pack, topic candidates, evidence constraints | `artifact-contracts/angle.md` | `skills/topic-angle-discovery.md` | memory may surface recurring positioning preferences, but current intent wins | angle is narrower than the topic, evidence-backed, and strong enough to shape structure |
| `structure` | intent, context pack, chosen angle, section ideas, evidence gaps | `artifact-contracts/structure.md` | `skills/outline-architecture.md` | `review-gates/before-draft.md` checks planning readiness before drafting | section order supports the angle, each section has a job, major unsupported claims are marked before drafting; technical blogs may use problem -> why it matters -> how to address it |
| `draft` | confirmed or explicitly caveated intent, context pack, angle, structure, role-card guidance | `artifact-contracts/draft.md` | `skills/longform-drafting.md` | before-draft gate decision should be visible when the work needs explicit planning confirmation | draft is complete end to end, claims stay close to evidence, unresolved gaps are marked rather than hidden; blocking uncertainty returns for user discussion |
| `review` | draft, context pack, sources, role-card expectations, current caveats | `artifact-contracts/review.md` | `skills/factual-review.md` | review may identify memory candidates, but acceptance belongs under `memory/` policy guidance | important claims are checked, uncertainty is visible, and factual or structural issues are routed back before later rewrite passes |
| `rewrite` | draft, review notes, structure notes, role-card or user style direction | `artifact-contracts/rewrite.md` | `skills/narrative-polish.md`, `skills/style-adaptation.md`, `skills/ai-flavor-reduction.md` | `review-gates/before-final.md` can be prepared once review findings are resolved or intentionally deferred | rewrite preserves factual meaning and authorial reasoning while improving flow, style, and targeted generic phrasing; later discoveries return to the appropriate earlier work |
| `final` | rewritten draft, review/rewrite notes, final gate checklist, handoff expectations | `artifact-contracts/final.md` | `skills/final-editing.md` | `review-gates/before-final.md`; memory candidates may be proposed after human-visible review | final article is human-approved for the agreed handoff, placeholders are resolved or explained, remaining caveats are visible |

Role-cards adapt the criteria in this table. For example, `role-cards/technical-blog.md` raises the importance of traceable claims, technical precision, and explicit assumptions, while still using `longform-writing` as the workflow.

## Using Role-Cards With This Workflow

- Treat role-cards as lenses over the shared stages, not as separate workflow names.
- Apply a role-card when choosing examples, evidence depth, voice, terminology, and review emphasis.
- Keep the active role-card visible in planning, drafting, review, and final handoff notes when it materially changes decisions.
- If role guidance conflicts with the current user intent or source evidence, resolve the conflict visibly instead of silently following older or generic guidance.

`technical-blog` is the initial role-card. It should remain a role-card-only asset unless a future approved Core design explicitly adds another workflow family.

## Advisory Gates

- Use `review-gates/before-draft.md` after `structure` and before `draft` when planning needs explicit confirmation.
- Use `review-gates/before-final.md` after review/rewrite work and before accepting `final`.
- Gates are visible decision aids. They are not hidden automation, runtime enforcement, model-call requirements, or publishing actions.

## Memory Touchpoints

Memory is optional and reviewed. Consider `artifact-contracts/memory-candidates.md`, `memory/memory-policy.md`, and `memory/memory-candidates-policy.md` only when a durable lesson, approved preference, or reusable editorial decision appears.

Do not promote raw drafts, unpublished sensitive material, speculative notes, temporary article context, platform settings, or runtime behavior into memory by default.

## Required Behaviors

- keep work in files a human can inspect and edit
- treat role-cards as guidance, not automation
- keep execution-host details out of Core
- require explicit gate checks before drafting and finalization
- let different role-cards adjust tone, evidence expectations, and examples without creating new runtimes
- keep artifact structures advisory and human-readable
- record gate decisions visibly when the workflow needs user confirmation

## Non-Goals

- no standalone runner
- no model/provider selection logic
- no built-in memory persistence
- no publishing system
- no hidden automation or runtime-enforced review gates
- no separate `technical-blog` workflow; `technical-blog` remains a role-card
