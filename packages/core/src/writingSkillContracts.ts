export const technicalBlogWritingSkillOrder = [
  "brief-builder",
  "source-organizer",
  "outline-builder",
  "draft-writer",
  "style-reviewer",
  "final-polisher"
] as const;

export type TechnicalBlogWritingSkillId = (typeof technicalBlogWritingSkillOrder)[number];

export const technicalBlogWritingSkillContracts: Record<TechnicalBlogWritingSkillId, string> = {
  "brief-builder": `# Brief Builder Contract

## Purpose

Turn the topic, notes, and style direction into a focused brief for the rest of the writing workflow.

## Inputs Required

- topic or working idea
- user notes or constraints, if any
- style profile guidance

## Expected Output Artifact

- \`brief.md\`

## Prompt Template Or Section

- primary template: \`quillInitPrompts.brief\`
- expected output shape: \`quillInitTemplates.brief\`
- required prompt sections: Goal, Inputs, Output

## Memory Read Recommendations

- read any stored project context for audience, angle, and constraints before drafting the brief
- read the active style profile so voice and structure preferences are respected early

## Memory Write Recommendations

- write back the chosen audience, core message, and angle for later outline and draft steps

## Human Gate Expectations

- human review is recommended when the topic, audience, or core message is still ambiguous
- stop for human clarification before downstream steps if the brief cannot name a concrete angle

## Validation And Checkpoint Criteria

- every section from \`brief.md\` is present
- audience, message, and angle are specific enough to guide the outline
- constraints and notes do not conflict with the style profile
- content stays in plain Markdown without provider or runtime instructions

## Red Flags And Stop Conditions

- topic is too vague to define a clear angle
- user intent conflicts with the available notes
- required facts are missing and would force invention
- any proposal requires provider-specific settings, runtime policies, or automatic research
`,
  "source-organizer": `# Source Organizer Contract

## Purpose

Organize user-provided notes, links, and claims into a source inventory without performing automatic web research.

## Inputs Required

- \`brief.md\`
- user-provided notes, references, or claim lists

## Expected Output Artifact

- \`sources.md\`

## Prompt Template Or Section

- primary template: \`quillInitPrompts.sources\`
- expected output shape: \`quillInitTemplates.sources\`
- required prompt sections: Goal, Guidance, Output

## Memory Read Recommendations

- read the brief's audience, angle, and constraints before organizing sources
- read any stored evidence notes to avoid dropping user-supplied references

## Memory Write Recommendations

- write back unresolved factual claims and missing information for review before drafting

## Human Gate Expectations

- human review is expected before outline or draft work when claims need verification or key evidence is missing
- a human may add sources manually, but the contract does not authorize automatic web lookup

## Validation And Checkpoint Criteria

- every section from \`sources.md\` is present
- references are limited to material the user already provided
- uncertain claims are separated from confirmed notes
- missing information is explicit and actionable

## Red Flags And Stop Conditions

- the workflow depends on external research not supplied by the user
- claims are presented as verified without evidence
- references are invented, guessed, or expanded automatically
- any step introduces browsing, provider tooling, or runtime permission assumptions
`,
  "outline-builder": `# Outline Builder Contract

## Purpose

Convert the brief and organized sources into a clear article structure with a working title, opening, sections, and conclusion.

## Inputs Required

- \`brief.md\`
- \`sources.md\`

## Expected Output Artifact

- \`outline.md\`

## Prompt Template Or Section

- primary template: \`quillInitPrompts.outline\`
- expected output shape: \`quillInitTemplates.outline\`
- required prompt sections: Goal, Output

## Memory Read Recommendations

- read the brief for audience, angle, and constraints
- read stored factual-risk notes from source organization before finalizing section order

## Memory Write Recommendations

- write back the chosen structure and open questions that the draft should resolve carefully

## Human Gate Expectations

- human review is expected before drafting so structure and scope can be corrected early
- stop for human input if the outline cannot connect evidence to the planned sections

## Validation And Checkpoint Criteria

- every section from \`outline.md\` is present
- the opening states a concrete problem or framing
- sections build logically toward the conclusion
- notes capture any unresolved gaps or risks

## Red Flags And Stop Conditions

- section order does not support the brief's core message
- key claims in the outline lack support in the organized sources
- the outline expands scope beyond the approved topic
- any instruction requires model, provider, or runtime configuration details
`,
  "draft-writer": `# Draft Writer Contract

## Purpose

Write the first article draft from the brief, sources, outline, and style profile in clear Markdown.

## Inputs Required

- \`brief.md\`
- \`sources.md\`
- \`outline.md\`
- style profile guidance

## Expected Output Artifact

- \`draft.md\`

## Prompt Template Or Section

- primary template: \`quillInitPrompts.draft\`
- expected output shape: \`quillInitTemplates.draft\`
- required prompt sections: Goal, Requirements, Output

## Memory Read Recommendations

- read the latest brief, sources, outline, and style profile together before drafting
- read stored open questions so unsupported claims are not treated as settled facts

## Memory Write Recommendations

- write back any sections that still need evidence, examples, or repair before review

## Human Gate Expectations

- human review is optional before the review step but recommended for sensitive claims or strong editorial preferences
- stop for human clarification if the draft would otherwise invent facts or contradict the brief

## Validation And Checkpoint Criteria

- output remains plain Markdown and follows the \`draft.md\` structure
- tone matches the style profile and avoids generic AI flavor
- major claims map back to the brief or source material
- concrete examples and tradeoffs are used when available

## Red Flags And Stop Conditions

- unsupported new facts are introduced
- tone becomes generic, promotional, or detached from the style profile
- the draft ignores key constraints from the brief
- the step depends on provider-specific runtime behavior or automatic research
`,
  "style-reviewer": `# Style Reviewer Contract

## Purpose

Review the draft for structure, clarity, style fit, AI flavor, and factual risk before final polishing.

## Inputs Required

- \`brief.md\`
- \`outline.md\`
- \`draft.md\`
- style profile guidance

## Expected Output Artifact

- \`review.md\`

## Prompt Template Or Section

- primary template: \`quillInitPrompts.review\`
- expected output shape: \`quillInitTemplates.review\`
- supporting checklist: \`quillInitChecklists.review\`
- required prompt sections: Goal, Check, Output

## Memory Read Recommendations

- read the brief and outline before reviewing so feedback stays aligned with the intended structure
- read any stored factual-risk notes from earlier steps before marking issues

## Memory Write Recommendations

- write back the top repair priorities so the final polish step can address them directly

## Human Gate Expectations

- human review is recommended when the article will be published externally or when factual risk is high
- stop for human decision if the review cannot clearly choose pass versus needs repair

## Validation And Checkpoint Criteria

- every section from \`review.md\` is present
- review feedback is concrete, actionable, and tied to the draft content
- factual risks are separated from style issues
- the decision section reflects the actual severity of findings

## Red Flags And Stop Conditions

- review feedback is vague or purely generic
- serious factual risks are hidden inside style comments
- the review approves text that clearly conflicts with the brief or outline
- any instruction adds provider, runtime, or account-specific behavior
`,
  "final-polisher": `# Final Polisher Contract

## Purpose

Produce the final article by repairing review findings while preserving the draft's supported core argument.

## Inputs Required

- \`brief.md\`
- \`sources.md\`
- \`outline.md\`
- \`draft.md\`
- \`review.md\`
- style profile guidance

## Expected Output Artifact

- \`final.md\`

## Prompt Template Or Section

- primary template: \`quillInitPrompts.final\`
- expected output shape: \`quillInitTemplates.final\`
- required prompt sections: Goal, Requirements

## Memory Read Recommendations

- read the review findings first, then re-read the draft and source context before polishing
- read stored repair priorities so critical issues are handled before stylistic refinements

## Memory Write Recommendations

- no required memory write; optionally record residual risks or follow-up edits for human publishing review

## Human Gate Expectations

- human review is expected before publication or distribution of the final article
- stop for human approval if significant factual uncertainty or unresolved review findings remain

## Validation And Checkpoint Criteria

- output remains plain Markdown and follows the \`final.md\` shape
- review findings are addressed without introducing unsupported new claims
- core argument stays consistent with the brief and outline
- remaining factual uncertainty is explicit rather than hidden

## Red Flags And Stop Conditions

- final polish removes important nuance or changes the core argument without justification
- unresolved factual-risk items remain unmarked
- the step introduces new unsupported examples or claims
- any proposal depends on provider-specific setup, runtime permissions, or automatic web research
`
} as const;
