# Prompt Template Design

Prompt templates should be explicit about input, output, and quality checks. They are workflow methodology, not one-off prompts.

## Brief Prompt

Goal: generate an article brief from the topic and style profile.

Inputs:

- topic
- style profile

Output:

```markdown
# Brief

## Topic

## Target Audience

## Core Message

## Angle

## Constraints

## Notes
```

## Sources Prompt

Goal: organize user-provided material without automatic web research.

If the user provided no material, generate placeholders and ask the user to add sources.

Output:

```markdown
# Sources

## User Provided Notes

## Reference Links

## Claims To Verify Later

## Missing Information
```

## Outline Prompt

Goal: create a clear article outline from brief and sources.

Output:

```markdown
# Outline

## Working Title

## Opening

## Sections

### 1.
### 2.
### 3.

## Conclusion

## Notes
```

## Draft Prompt

Goal: write a first draft from brief, sources, outline, and style profile.

Requirements:

- avoid generic AI flavor
- avoid marketing tone
- avoid empty abstractions
- include concrete scenarios and tradeoffs
- output plain Markdown

Output:

```markdown
# Draft

Body content.
```

## Review Prompt

Goal: review the draft.

Check:

- structure clarity
- point clarity
- AI flavor
- empty phrasing
- style profile fit
- factual risks
- target platform fit

Output:

```markdown
# Review

## Summary

## Structure Issues

## Style Issues

## AI Flavor Issues

## Factual Risks

## Suggested Fixes

## Decision
```

## Final Prompt

Goal: produce `final.md` from draft, review, and style profile.

Requirements:

- keep the draft's core argument
- repair issues from review
- reduce AI flavor
- do not introduce unsupported new facts
- output publishable Markdown
