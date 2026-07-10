# Core Gap Review And Completion Implementation Plan

## Requirement Source

- `.task/2026-07-08/core-gap-review-completion/requirement.md`
- User confirmation after Core audit:
  - artifact contracts should use recommended structure / guiding format, not hard required templates
  - review gates should be advisory gates with explicit user confirmation
  - merge `core/memory-policies/` into `core/memory/`; keep only `core/memory/`
  - prefer complete,规范化 documents over very short stubs

## Scope Summary

Enrich Quill Core methodology documents so the existing skeleton becomes a usable document-first longform-writing workflow kit. Keep all changes Markdown-only and runtime-free.

## Involved Modules Or Areas

- `core/` portable document assets
- `README.md` and `docs/current/system-map.md` only if alignment updates become necessary after Core changes
- `.task/2026-07-08/core-gap-review-completion/` task artifacts

## Loaded Rules

- `AGENTS.md`
- `core/AGENTS.md`
- `docs/project/marionettist-workflow.md`
- `.marionettist/tier-policy.yml`

## Loaded Docs

- `README.md`
- `docs/project/knowledge-map.md`
- `docs/current/system-map.md`
- `docs/target/quill-core-architecture.md`
- Current `core/**` assets

## Global Forbidden Scope

- Hermes capability research or plugin/distribution implementation.
- Runtime, model provider, workflow runner, memory runtime, provider router, or publishing-system code.
- GitHub issue mutation or closure.
- Package entrypoint changes unless a later explicit task asks for installer/package work.
- Old CLI runtime deletion or cleanup in this task.

## Execution Strategy

- Complexity: standard
- Default Execution: sequential
- Parallel Execution: not-needed
- Fallback Execution: sequential
- Merge Owner: primary orchestrator
- Conflict Resolution Rule: later slices may refine earlier wording for consistency, but must not reverse the user-confirmed advisory/non-runtime boundaries.

## Slice Dependency Graph

| Slice | Depends On | Can Run In Parallel With | Fallback Order | Shared Files | Merge Owner | Conflict Risk |
| --- | --- | --- | --- | --- | --- | --- |
| S1-artifact-contracts | none | none | 1 | `core/artifact-contracts/*` | primary orchestrator | low |
| S2-review-gates | S1-artifact-contracts | none | 2 | `core/review-gates/*` | primary orchestrator | low |
| S3-memory-policy-consolidation | none | none | 3 | `core/memory/*`, `core/memory-policies/` | primary orchestrator | medium |
| S4-core-orientation-and-workflow-map | S1, S2, S3 | none | 4 | `core/AGENTS.md`, `core/workflows/longform-writing.md` | primary orchestrator | medium |

## Implementation Slices

### Slice 1: Artifact Contract Expansion

#### Goal

Expand all artifact contracts from one-line descriptions into complete guiding formats that are useful to writers and agents without becoming rigid runtime schemas.

#### Allowed Modification Scope

- `core/artifact-contracts/intent.md`
- `core/artifact-contracts/context-pack.md`
- `core/artifact-contracts/angle.md`
- `core/artifact-contracts/structure.md`
- `core/artifact-contracts/draft.md`
- `core/artifact-contracts/review.md`
- `core/artifact-contracts/rewrite.md`
- `core/artifact-contracts/final.md`
- `core/artifact-contracts/memory-candidates.md`

#### Forbidden Scope

- Do not add executable schemas, JSON schema validation, CLI behavior, or runtime parser expectations.
- Do not add Hermes-specific fields.

#### Execution

- Mode: sequential
- Depends On: none
- Can Run With: none
- Must Not Run With: S4, because S4 should map final contract names and sections after this slice stabilizes.
- Fallback Order: 1
- Shared Files: none outside `core/artifact-contracts/`
- Merge Owner: primary orchestrator
- Conflict Risk: low
- Gate Class: standard
- Risk Score: 2
- Gate Reasons: `core-doc-expansion`, `methodology-consistency`
- Validation Level: slice
- Recommended Agent Strategy: update contracts in a consistent pattern while preserving stage-specific meaning.

#### Steps

1. Give each contract a consistent section set, such as purpose, recommended sections, guidance, quality bar, and handoff.
2. Keep wording advisory: use "recommended", "should", and "may" instead of hard machine-enforced requirements.
3. Make each contract's relationship to adjacent workflow stages explicit.
4. Ensure memory candidate contract excludes raw drafts, unpublished sensitive material, and speculative notes by default.

#### Validation

- Manual review for consistent headings and advisory wording.
- Confirm no runtime/provider/Hermes execution language was introduced.

#### Done Criteria

- All nine artifact contracts are complete enough to guide human-authored artifacts.
- Contracts remain document-first and platform-neutral.

#### Rollback Notes

- Revert only the changed artifact-contract files if the structure feels too prescriptive.

### Slice 2: Advisory Review Gate Expansion

#### Goal

Expand review gates into usable advisory checkpoints with explicit user-confirmation decision records.

#### Allowed Modification Scope

- `core/review-gates/before-draft.md`
- `core/review-gates/before-final.md`

#### Forbidden Scope

- Do not define gates as runtime-enforced blockers.
- Do not add automation or model-call assumptions.

#### Execution

- Mode: sequential
- Depends On: S1-artifact-contracts
- Can Run With: none
- Must Not Run With: S4 until gate terms are stable
- Fallback Order: 2
- Shared Files: none outside `core/review-gates/`
- Merge Owner: primary orchestrator
- Conflict Risk: low
- Gate Class: standard
- Risk Score: 2
- Gate Reasons: `advisory-gates`, `user-confirmation`
- Validation Level: slice
- Recommended Agent Strategy: define checklist and decision format while preserving user choice.

#### Steps

1. Add purpose, when to use, input artifacts, advisory checklist, user decision options, and suggested block/follow-up behavior.
2. Make clear gates are designed for explicit human confirmation, not hidden automation.
3. Ensure `before-draft` checks intent/context/angle/structure readiness.
4. Ensure `before-final` checks factual review, placeholders, style fit, and handoff readiness.

#### Validation

- Manual review that gate documents use advisory language and contain a confirmation record format.

#### Done Criteria

- Both gates are actionable for users and agents.
- Neither gate claims runtime enforcement.

#### Rollback Notes

- Revert the two review-gate files if wording becomes too strict.

### Slice 3: Memory Policy Consolidation

#### Goal

Make memory guidance actionable and remove the confusing empty `core/memory-policies/` path in favor of `core/memory/` only.

#### Allowed Modification Scope

- `core/memory/memory-policy.md`
- `core/memory/memory-candidates-policy.md`
- `core/memory-policies/` removal if present and empty
- `core/AGENTS.md` or `README.md` only if needed to remove references to `memory-policies/`

#### Forbidden Scope

- Do not implement memory storage, sync, indexing, or runtime persistence.
- Do not prescribe a platform-specific memory tool.

#### Execution

- Mode: sequential
- Depends On: none
- Can Run With: none
- Must Not Run With: S4 until the final memory path is known
- Fallback Order: 3
- Shared Files: possible later reference updates in S4
- Merge Owner: primary orchestrator
- Conflict Risk: medium
- Gate Class: standard
- Risk Score: 3
- Gate Reasons: `directory-cleanup`, `memory-boundary`
- Validation Level: slice
- Recommended Agent Strategy: use safe deletion only for empty directory cleanup; keep memory content policy-oriented.

#### Steps

1. Expand memory policy to cover what memory means in Quill Core, when candidates are considered, review expectations, retention/pruning, and exclusions.
2. Expand memory-candidates policy to describe candidate shape, review questions, and safe rejection defaults.
3. Remove `core/memory-policies/` if it is empty; if deletion is blocked by tooling, leave no references to it and report the cleanup status.

#### Validation

- Manual review that only `core/memory/` is referenced as the memory policy location.
- Confirm no runtime memory implementation is introduced.

#### Done Criteria

- Memory guidance is clear, safe, and document-driven.
- Empty duplicate memory policy path no longer confuses the Core layout.

#### Rollback Notes

- Restore `core/memory-policies/` only if the user later decides to keep a separate policy namespace.

### Slice 4: Core Orientation And Workflow Integration Map

#### Goal

Make Core self-navigable by improving `core/AGENTS.md` and adding a stage-to-assets map to the longform-writing workflow.

#### Allowed Modification Scope

- `core/AGENTS.md`
- `core/workflows/longform-writing.md`
- Optional alignment touchups in `README.md` or `docs/current/system-map.md` only if the Core layout wording changes.

#### Forbidden Scope

- Do not add new workflows or convert `technical-blog` into a workflow.
- Do not add Hermes research or implementation details.

#### Execution

- Mode: sequential
- Depends On: S1-artifact-contracts, S2-review-gates, S3-memory-policy-consolidation
- Can Run With: none
- Must Not Run With: none
- Fallback Order: 4
- Shared Files: `core/AGENTS.md`, `core/workflows/longform-writing.md`
- Merge Owner: primary orchestrator
- Conflict Risk: medium
- Gate Class: standard
- Risk Score: 3
- Gate Reasons: `core-navigation`, `workflow-asset-map`
- Validation Level: final
- Recommended Agent Strategy: synthesize rather than duplicate detailed file content.

#### Steps

1. Expand `core/AGENTS.md` with Core purpose, reading order, asset relationships, extension guidance, and boundaries.
2. Add a workflow-to-assets table to `longform-writing.md` mapping stages to input/output artifacts, relevant skills, gates, and quality criteria.
3. Keep the workflow document as a methodology guide, not an execution spec.
4. Update README/system-map only if references become stale.

#### Validation

- Manual review for coherent navigation across Core categories.
- Confirm `technical-blog` remains role-card-only.
- Confirm no runtime/provider/Hermes execution claims are introduced.

#### Done Criteria

- A new reader can understand how to use Core assets together.
- Workflow, skills, contracts, review gates, role-card, and memory docs are connected without becoming a runtime.

#### Rollback Notes

- Revert orientation/map files if the navigation becomes too verbose or duplicative.

## Parallel Slice Groups

None. Sequential execution is preferred because later orientation docs should reflect the final wording of contracts, gates, and memory policies.

## Final Validation

- Manual Core consistency review.
- Confirm all changed files are Markdown-only under allowed scope, except task artifacts.
- Confirm no new runtime, provider, workflow engine, memory runtime, or Hermes implementation language.
- Optional packaging smoke after all slices if installer output should be verified: `npm run smoke:installer`.

## Documentation Update Requirement

- Update `README.md`, `docs/current/system-map.md`, or `docs/project/knowledge-map.md` only if the Core layout, routing, or public product description changes.
- Otherwise, Core-only Markdown changes are sufficient.

## Risks

- Making guidance too prescriptive despite user preference for recommended/guiding structures.
- Accidentally implying gates are runtime-enforced.
- Reintroducing runtime or memory implementation concepts while enriching methodology docs.
- Leaving stale references to the removed `core/memory-policies/` path.

---

## Follow-Up Plan: Role Card And Skill Depth

### Confirmed Direction

- Default the technical-blog role to first-person singular (`我`) without requiring first person in every sentence.
- Permit clearly marked subjective opinions and audience-appropriate internet-native wording.
- Allow final copy to retain occasional obvious awkward phrasing when meaning remains understandable.
- Treat natural irregularity as permitted, not as a quota or an instruction to manufacture errors.
- Preserve factual accuracy, logical coherence, technical meaning, and visible caveats.
- Prefer problem -> why it matters -> how to solve progression where it fits the article.
- Stop and discuss blocking uncertainty with the user instead of guessing.

### Follow-Up Scope

- `core/role-cards/technical-blog.md`
- all ten existing files under `core/skills/`, with depth proportional to each skill's judgment surface
- `core/workflows/longform-writing.md` for concise integration guidance only
- task-local artifacts under `.task/2026-07-08/core-gap-review-completion/`

### Follow-Up Forbidden Scope

- No new workflow family or duplicate technical-blog workflow.
- No runtime, provider, automation, storage, publishing, installer, package, Hermes, or distribution changes.
- No changes to `core/AGENTS.md`, artifact contracts, review gates, or memory docs unless a direct contradiction is discovered and separately approved.
- No intentional mistake, awkward-sentence, slang, or first-person-per-paragraph quotas.
- No informal wording that excuses factual error, broken logic, severe ambiguity, or accidental placeholders.

### Follow-Up Execution Strategy

- Complexity: standard cross-document methodology alignment
- Default Execution: sequential
- Parallel Execution: not-needed
- Fallback Execution: sequential
- Merge Owner: primary orchestrator
- Conflict Resolution Rule: preserve factual meaning and Core boundaries over stylistic consistency; the approved role-card foundation controls shared terminology.
- Gate Policy: selected `balanced`; all follow-up slices are `standard` with `risk_score <= 3`, but analysis approval, explicit uncertainty stops, and final approval remain mandatory.

### Follow-Up Dependency Graph

| Slice | Depends On | Fallback Order | Shared Semantic Surface | Conflict Risk |
| --- | --- | --- | --- | --- |
| S5-role-card-style-foundation | S1-S4 | 5 | voice, opinion/fact, naturalness | medium |
| S6-planning-and-uncertainty | S5 | 6 | uncertainty classification and discussion | medium |
| S7-structure-and-drafting | S5, S6 | 7 | progression, voice, drafting stops | medium |
| S8-rewrite-coordination | S5, S7 | 8 | style, polish, AI-flavor boundaries | medium |
| S9-factual-and-final-review | S5-S8 | 9 | substantive failures versus tolerated irregularity | medium |
| S10-workflow-integration | S5-S9 | 10 | stage routing and runtime-free boundary | medium |

### Slice 5: Role-Card And Style Foundation

#### Goal

Expand `technical-blog` into a useful specialization layer that establishes the confirmed voice, evidence, naturalness, rhetorical, and uncertainty principles without duplicating the workflow.

#### Allowed Modification Scope

- `core/role-cards/technical-blog.md`

#### Execution

- Mode: sequential
- Depends On: completed S1-S4
- Gate Class: standard
- Risk Score: 2
- Gate Reasons: `role-card-foundation`, `user-confirmed-style`, `advisory-methodology`
- Validation Level: slice

#### Steps

1. Add role stance, audience and evidence expectations, and relationship to `longform-writing`.
2. Define first-person singular as the default stance, not a per-sentence requirement.
3. Distinguish verified facts, evidence-backed conclusions, author judgments, and unresolved speculation.
4. Bound conversational or internet-native wording by clarity and audience fit.
5. Permit understandable occasional awkwardness without manufacturing it.
6. Add adaptable problem -> why -> solution guidance and blocking-uncertainty discussion rules.
7. Name the especially relevant skills, artifacts, and advisory gates without duplicating their methods.

#### Validation And Done Criteria

- Trace every confirmed preference to an explicit role-card statement.
- Confirm the role-card points to the shared workflow rather than recreating it.
- Confirm no factual standard is weakened and no runtime behavior is introduced.

#### Rollback Notes

- Revert this role-card only; do not begin dependent slices until the foundation is restored or replanned.

### Slice 6: Planning Depth And Uncertainty Routing

#### Goal

Deepen early-stage judgment so planning classifies facts, opinions, assumptions, and uncertainty and knows when user discussion is required.

#### Allowed Modification Scope

- `core/skills/audience-and-intent.md`
- `core/skills/context-pack-building.md`
- `core/skills/topic-angle-discovery.md`

#### Execution

- Mode: sequential
- Depends On: S5
- Gate Class: standard
- Risk Score: 3
- Gate Reasons: `uncertainty-routing`, `claim-basis`, `user-discussion-boundary`
- Validation Level: slice

#### Steps

1. Capture authorial stance and blocking audience, purpose, sensitivity, or voice uncertainty.
2. Distinguish facts, source-backed conclusions, author judgments, assumptions, speculation, and unknowns.
3. Define blocking uncertainty versus minor uncertainty that may continue with a visible caveat.
4. Test whether an angle is evidence-supported, explicitly opinion-led, or too uncertain to select.
5. Add stop and question-framing guidance instead of guessed preferences or conclusions.

#### Validation And Done Criteria

- Walk one blocking and one non-blocking uncertainty path through all three skills.
- Confirm no skill silently converts opinion or speculation into fact.
- Revert the three planning skills together if terminology diverges.

### Slice 7: Structure, Progression, And Drafting

#### Goal

Deepen structure and drafting around progressive explanation, natural first-person voice, and uncertainty-safe writing.

#### Allowed Modification Scope

- `core/skills/outline-architecture.md`
- `core/skills/longform-drafting.md`

#### Execution

- Mode: sequential
- Depends On: S5, S6
- Gate Class: standard
- Risk Score: 3
- Gate Reasons: `rhetorical-progression`, `drafting-judgment`, `uncertainty-stop`
- Validation Level: slice

#### Steps

1. Teach problem -> why it matters -> how to solve as a preferred through-line while allowing justified alternatives.
2. Give each section a reader-facing job and connect evidence to conclusions.
3. Mark where subjective author judgment enters the argument.
4. Apply first-person voice naturally rather than mechanically.
5. Continue with visible caveats only for non-blocking uncertainty; discuss blocking uncertainty before drafting the affected passage.
6. Permit conversational texture without deliberately introducing defects.

#### Validation And Done Criteria

- Walk a representative outline through problem, significance, and solution.
- Confirm alternative structures remain available when justified.
- Confirm drafting distinguishes visible caveats from mandatory user discussion.

### Slice 8: Rewrite Coordination And AI-Flavor Reduction

#### Goal

Clarify the boundaries and recommended ordering among style adaptation, narrative polish, AI-flavor reduction, and final editing while preserving natural irregularity.

#### Allowed Modification Scope

- `core/skills/style-adaptation.md`
- `core/skills/narrative-polish.md`
- `core/skills/ai-flavor-reduction.md`

#### Execution

- Mode: sequential
- Depends On: S5, S7
- Gate Class: standard
- Risk Score: 3
- Gate Reasons: `rewrite-coordination`, `meaning-preservation`, `ai-flavor-boundary`
- Validation Level: slice

#### Steps

1. Recommend: factual issues first, narrative flow, audience/style adaptation, targeted AI-flavor reduction, then final editing.
2. Route issues back when a later pass exposes an earlier factual or structural problem.
3. Preserve problem/why/solution progression and authorial reasoning during narrative polish.
4. Apply first-person voice, audience-appropriate network language, and explicit opinion markers during style adaptation.
5. Target generic symmetry, empty transitions, repetition, canned summaries, and uniform rhythm during AI-flavor reduction.
6. Preserve factual precision, useful structure, conversational wording, intentional repetition, and understandable irregularity.
7. State explicitly that reducing AI flavor does not mean manufacturing mistakes or eccentricity.

#### Validation And Done Criteria

- Use a responsibility matrix for unsupported claims, synthetic symmetry, conversational wording, awkward-but-understandable sentences, and severe ambiguity.
- Confirm every issue has one primary owner and a clear handoff.
- Revert the three rewrite skills together if coordination terminology diverges.

### Slice 9: Factual And Final Review Alignment

#### Goal

Align factual and final review with opinion/fact separation and narrow tolerance for understandable awkwardness.

#### Allowed Modification Scope

- `core/skills/factual-review.md`
- `core/skills/final-editing.md`

#### Execution

- Mode: sequential
- Depends On: S5-S8
- Gate Class: standard
- Risk Score: 3
- Gate Reasons: `factual-integrity`, `final-quality-boundary`, `tolerated-irregularity`
- Validation Level: slice

#### Steps

1. Classify statements as verified fact, evidence-backed conclusion, author judgment, inference, or unresolved speculation.
2. Require correction or discussion for factual errors, misleading scope, false certainty, and broken reasoning.
3. Distinguish blocking quality failures from tolerable natural irregularity.
4. Permit occasional understandable awkwardness only when it does not create factual error, severe ambiguity, broken logic, or accidental placeholders.
5. Prevent final editing from flattening first-person voice or suitable internet-native wording.

#### Validation And Done Criteria

- Apply the categories to representative fact, opinion, inference, speculation, and error examples.
- Confirm severe ambiguity and broken logic always fail while one understandable awkward sentence may pass.
- Revert both review skills together if their boundaries diverge.

### Slice 10: Workflow Integration

#### Goal

Integrate the deeper role-card and skill coordination into `longform-writing` without duplicating skill details or creating orchestration behavior.

#### Allowed Modification Scope

- `core/workflows/longform-writing.md`

#### Execution

- Mode: sequential
- Depends On: S5-S9
- Gate Class: standard
- Risk Score: 3
- Gate Reasons: `workflow-integration`, `cross-skill-consistency`, `runtime-free-boundary`
- Validation Level: final

#### Steps

1. Add concise blocking-uncertainty return guidance.
2. Add problem -> why -> solution as a preferred technical-blog progression, not a mandatory workflow shape.
3. Clarify rewrite-stage coordination and issue routing.
4. Keep role-specific details in the role-card and detailed methods in skills.
5. Reconfirm advisory gates and document-first handoffs.

#### Validation And Done Criteria

- Trace the eight-stage workflow with the technical-blog role active.
- Confirm uncertainty has a visible user-discussion return path.
- Confirm no runtime enforcement, ownership gaps, or separate technical-blog workflow is introduced.

### Follow-Up Test Strategy

#### Selected Strategy

- Task type: documentation methodology enhancement
- Strategy: structured manual review, preference traceability, scenario walkthroughs, responsibility mapping, and boundary scans

#### Required Evidence

- Every confirmed user preference maps to role-card and skill guidance.
- Fact, opinion, inference, speculation, and error remain distinguishable.
- Blocking and non-blocking uncertainty have different handling paths.
- Rewrite skills have distinct responsibilities and a coherent recommended order.
- Core remains advisory, portable, document-first, and runtime-free.

#### Commands Or Checks

- `git diff --check`
- `git diff -- core/role-cards/technical-blog.md core/skills core/workflows/longform-writing.md`
- Manual changed-file allowlist review.
- Manual eight-stage technical-blog scenario walkthrough.
- `npm run smoke:installer` only if packaged Core-copy behavior needs verification.

#### NOT_RUN Conditions

- Installer smoke may be `NOT_RUN` when changes are Markdown methodology only and package inclusion behavior is untouched.
- Required follow-up: record the reason and manually confirm changed files remain under the existing packaged `core/` tree.

### Follow-Up Stop Conditions

- A new ambiguity affects authorial stance, factual treatment, public sensitivity, solution choice, or acceptance boundaries.
- A proposed edit requires files outside the follow-up allowlist.
- A skill cannot align without contradicting the approved role-card foundation.
- Validation would require examples presented as verified technical facts without evidence.
- Any wording implies errors or slang should be deliberately manufactured.
