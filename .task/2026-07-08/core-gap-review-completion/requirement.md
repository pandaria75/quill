# Requirement: Core Gap Review And Completion

## Source

- User requested a new task for issues #33~#38.
- Hermes research is explicitly out of scope for this task.
- The immediate goal is to review existing `core/` assets and identify optimization or incompleteness before making changes.
- Follow-up review found that `core/role-cards/technical-blog.md` and the judgment-heavy files under `core/skills/` remain too shallow.
- User confirmed the following writing-style direction:
  - default to first-person singular (`我`) for the technical-blog role;
  - allow clearly subjective opinions when they are presented as the author's judgment rather than as fact;
  - allow appropriate internet-native or conversational wording;
  - tolerate occasional obvious awkward or grammatically imperfect sentences in final copy when meaning remains understandable;
  - treat these traits as permitted natural expression, not quotas that must be manufactured;
  - when facts, intent, or requirements are uncertain, discuss the uncertainty with the user instead of guessing;
  - prefer progressive explanation that introduces the problem, explains why it matters, and then discusses how to solve it.

## Goal

Make Quill Core feel complete enough as a document-first longform-writing workflow kit for the initial `technical-blog` role-card, without turning Core into a runtime, model client, workflow engine, memory runtime, provider router, or publishing system.

## In Scope

- Review and improve `core/` document assets:
  - `core/AGENTS.md`
  - `core/workflows/longform-writing.md`
  - `core/skills/`
  - `core/role-cards/technical-blog.md`
  - `core/artifact-contracts/`
  - `core/review-gates/`
  - `core/memory/`
- Expand the `technical-blog` role-card into a useful specialization layer without duplicating the workflow.
- Deepen judgment-heavy skills with decision guidance, examples, boundaries, uncertainty handling, and stopping criteria where useful.
- Clarify the relationship and recommended ordering among style adaptation, narrative polish, AI-flavor reduction, and final editing.
- Update longform workflow guidance only where needed to explain progressive problem-to-why-to-solution structure, revision routing, and skill coordination.
- Check alignment with README, current system map, and target Core architecture intent when needed.
- Keep all Core assets portable, platform-neutral, model-provider-neutral, and runtime-free.

## Out Of Scope

- Hermes capability research.
- Hermes plugin/distribution implementation.
- Rebuilding CLI runtime behavior.
- Model provider clients, workflow runner, memory runtime, provider router, publishing system, or generic workflow engine.
- Closing or mutating GitHub issues unless explicitly requested later.

## Acceptance Criteria

- Core review identifies concrete gaps, duplicated/unclear boundaries, and improvement opportunities.
- Any proposed Core updates preserve document-first methodology boundaries.
- `longform-writing` remains the initial workflow.
- `technical-blog` remains a role-card, not a separate workflow.
- Artifact contracts, skills, review gates, and memory guidance are internally coherent.
- The technical-blog role defaults to first-person authorial expression and permits clearly marked subjective judgment.
- AI-flavor reduction preserves natural irregularity, conversational or internet-native language, and tolerable non-blocking awkward sentences instead of optimizing every sentence toward formal correctness.
- Factual errors, misleading claims, broken logic, severe ambiguity, and accidental unresolved placeholders remain review failures even when informal expression is allowed.
- Planning and drafting guidance distinguishes blocking uncertainty that requires user discussion from minor uncertainty that may continue with a visible caveat or placeholder.
- Outline and drafting guidance supports a progressive problem -> why it matters -> how to address it rhetorical path without making that path a runtime-enforced template.
- Analysis stops before coding/document edits for explicit user confirmation.

## Confirmed Interpretation Boundaries

- First person means first-person singular (`我`) by default for the initial technical-blog role.
- Subjective statements should remain distinguishable from verified facts, evidence-backed conclusions, and unresolved speculation.
- Internet-native wording may support voice, pacing, emphasis, or reader rapport, but should not replace technical explanation or create material ambiguity.
- Final copy may retain occasional obvious awkward phrasing when it remains understandable. The workflow should tolerate such phrasing rather than deliberately manufacture errors.
- Uncertainty affecting the central claim, audience, technical conclusion, solution choice, factual accuracy, public sensitivity, or authorial stance requires user discussion before the affected work proceeds.

## Open Questions

- None currently blocking. If implementation reveals a new style or factual-boundary ambiguity, stop and discuss it with the user rather than inferring a preference.
