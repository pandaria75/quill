# MVP Acceptance Test

Run from a clean test workspace:

```bash
cd <some-test-workspace>
quill init
quill new "为什么 Agent 编程需要 Harness"
quill status <slug>
quill run <slug>
quill status <slug>
```

## Expected Result

1. Commands do not error.
2. Article directory exists.
3. `brief.md` exists.
4. `sources.md` exists.
5. `outline.md` exists and is non-empty.
6. `draft.md` exists and is non-empty.
7. `review.md` exists and is non-empty.
8. `final.md` exists and is non-empty.
9. `final.md` is ordinary Markdown.
10. All intermediate artifacts are human-editable.
11. There is no Marionettist runtime dependency.
12. README can guide the user through the flow.

## No API Key Behavior

Without `QUILL_API_KEY`:

- `quill init` must work.
- `quill new` must work.
- `quill status` must work.
- `quill step` and `quill run` must show a clear missing API key error when generation is required.
- Quill must not generate empty `final.md` and claim success.

## Smoke Test Topic

Recommended smoke test topic:

```text
为什么 Agent 编程需要 Harness
```
