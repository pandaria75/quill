# CLI MVP Postmortem

## Summary

Quill started as a runnable CLI MVP for a technical-blog workflow.

That MVP clarified useful writing artifacts and gates, but it also pushed product identity toward runtime concerns that are no longer the desired center.

## What The MVP Helped Prove

- editable Markdown artifacts are valuable
- workflow guidance benefits from explicit review checkpoints
- a concrete prototype exposed architecture boundaries that target docs alone would not reveal

## Why The Reset Happened

- product value belongs in portable document assets, not in a standalone runtime
- model-client and workflow-runner concerns obscured the intended document-first positioning
- Hermes should be approached through bounded research before plugin implementation

## What Was Removed From Product Center

- old CLI runtime commands
- model-backed workflow execution code
- TypeScript-packaged Core exports whose main role was document shipping
- implemented Hermes adapter/runtime code

## Capabilities To Translate Instead Of Rebuild

- article setup becomes artifact contracts and installer scaffold assets
- source organization becomes context-pack and factual-review skills
- outline, draft, review, rewrite, and final steps become capability skills inside `longform-writing`
- status and checkpoint ideas become review gates and artifact quality bars
- style profile ideas become role-card and style-adaptation guidance
- memory write ideas become `memory-candidates.md` policy, not automatic persistence

## What Replaced It

- `core/` document-first assets
- scaffold-only installer behavior
- Hermes research-first distribution skeleton

## Future Direction Guardrail

If a future task appears to require a model client, workflow runner, provider router, memory runtime, or platform replacement, stop and document the blocker. Translate reusable methodology into skills, role-cards, artifact contracts, review gates, memory policies, or distribution notes instead.

## Follow-Up Implication

Future work should validate distribution/runtime assumptions in bounded spikes rather than rebuilding a generic Quill runtime.
