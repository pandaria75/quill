# Final Evidence

## Validation Summary

- `npm run check` — PASS
- `npm run build` — PASS
- `npm run smoke:init` — PASS
- `npm run smoke:article-status` — PASS
- `npm run smoke:mvp` — PASS

## Offline Verification Boundary

- Offline smoke verifies `init`, `new`, `status`, and the expected no-key failure behavior for `step` and `run`.
- Offline smoke does not verify successful live generation.

## NOT_RUN

- Live LLM end-to-end generation — NOT_RUN
  - Reason: requires private `QUILL_API_KEY`, network access, and possible provider cost.
