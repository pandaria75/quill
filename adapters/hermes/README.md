# Hermes Adapter MVP

This directory contains the bounded Hermes-hosted Quill MVP adapter for the `technical-blog` workflow only.

## Loading Assumptions

- Run commands from `adapters/hermes` so the committed project-plugin wrapper at `.hermes/plugins/quill-hermes` can load the local adapter package.
- Use an isolated `HERMES_HOME` for smoke runs.
- Set `HERMES_ENABLE_PROJECT_PLUGINS=1` so Hermes will load the project plugin without mutating global Hermes config.
- Hermes model/provider configuration stays outside this repository; this adapter assumes one Hermes-configured model/session.

Minimal isolated setup:

```bash
mkdir -p /tmp/opencode/hermes-home-s4e
python3 - <<'PY'
from pathlib import Path
Path('/tmp/opencode/hermes-home-s4e/config.yaml').write_text(
    'plugins:\n  enabled:\n    - quill-hermes\n',
    encoding='utf-8',
)
PY
rm -rf /tmp/opencode/hermes-smoke-s4e
cp -R "$(pwd)/examples/technical-blog/workspace" /tmp/opencode/hermes-smoke-s4e
```

## Commands And Expected State

All commands are exposed as `hermes quill-hermes <command>`.

### `start`

Starts a bounded `technical-blog` run and writes the first missing artifact into the workspace.

Example:

```bash
HERMES_HOME=/tmp/opencode/hermes-home-s4e \
HERMES_ENABLE_PROJECT_PLUGINS=1 \
hermes quill-hermes start \
  --workspace /tmp/opencode/hermes-smoke-s4e \
  --topic "Hermes MVP smoke" \
  --notes "Use bounded adapter-local smoke inputs only"
```

Expected result:

- writes `brief.md`
- writes `.quill-hermes/progress.json`
- does not enable memory
- uses the single Hermes-configured session/model policy

### `resume`

Infers the next missing step from workspace artifacts and runs one bounded step.

Expected result after the first `start`:

- writes `sources.md`
- writes or refreshes `.quill-hermes/pending-review.json`
- blocks further plain `resume` until explicit review action

Expected blocked observation while review is pending:

- stderr contains `BLOCKED: pending review is active for 'sources'; use continue, revise, or abort before resuming`

### `continue`

Approves the current review checkpoint and advances only to the next allowed segment.

Expected result after the first review block:

- writes `outline.md`
- refreshes `.quill-hermes/pending-review.json` for the next review step
- does not auto-run the whole workflow

### `revise`

Keeps the workspace blocked for human edits and preserves the current pending-review state.

Expected result:

- no artifact deletion
- `.quill-hermes/pending-review.json` stays present
- output tells the user to edit the current artifact, then use `continue` or `abort`

### `abort`

Marks the adapter-local review state aborted without deleting generated artifacts.

Expected result:

- artifacts remain in the workspace
- `.quill-hermes/pending-review.json` stays present with aborted state
- later review resume is blocked

## Workspace Artifacts

The MVP uses workspace-local Markdown artifacts only:

- `brief.md`
- `sources.md`
- `outline.md`
- `draft.md`
- `review.md`
- `final.md`

Adapter-local state is stored under:

- `.quill-hermes/progress.json`
- `.quill-hermes/pending-review.json`

## Current MVP Limitations

- Only `technical-blog` is supported.
- Only one Hermes-configured model/session is supported.
- Memory is disabled by default and remains policy-only; no memory persistence is implemented.
- Automatic web research is disabled.
- Per-step model routing is not implemented.
- The adapter's review commands are adapter-local state handling only; they do not claim unsupported native Hermes workflow-gate behavior.
- Known S4d limitation: `continue` currently does not propagate the original `topic` and `notes` seeds into later rendered steps.

## Smoke Path

The example workspace under `examples/technical-blog/workspace` is a clean seed. Copy it to `/tmp/opencode/hermes-smoke-s4e` before running the smoke so repository files do not become generated workspace output.

1. Help/load

   ```bash
   HERMES_HOME=/tmp/opencode/hermes-home-s4e \
   HERMES_ENABLE_PROJECT_PLUGINS=1 \
   hermes quill-hermes --help
   ```

   Expected: PASS if Hermes shows the `quill-hermes` command help.

2. Start

   Run the `start` command above.

   Expected: PASS if `brief.md` is created.

3. Resume into review block

   ```bash
   HERMES_HOME=/tmp/opencode/hermes-home-s4e \
   HERMES_ENABLE_PROJECT_PLUGINS=1 \
   hermes quill-hermes resume \
   --workspace /tmp/opencode/hermes-smoke-s4e
   ```

   Expected: PASS if `sources.md` is created and `.quill-hermes/pending-review.json` appears.

4. Plain resume while pending review

   Re-run `resume`.

   Expected: PASS if the command is BLOCKED with the pending-review message.

5. Continue

   ```bash
   HERMES_HOME=/tmp/opencode/hermes-home-s4e \
   HERMES_ENABLE_PROJECT_PLUGINS=1 \
   hermes quill-hermes continue \
   --workspace /tmp/opencode/hermes-smoke-s4e
   ```

   Expected: PASS if `outline.md` is created and the runner stops again at the next review checkpoint.

6. Revise or abort

   ```bash
   HERMES_HOME=/tmp/opencode/hermes-home-s4e \
   HERMES_ENABLE_PROJECT_PLUGINS=1 \
   hermes quill-hermes revise \
   --workspace /tmp/opencode/hermes-smoke-s4e
   ```

   Expected: PASS if the workspace stays blocked for human edits.

   ```bash
   HERMES_HOME=/tmp/opencode/hermes-home-s4e \
   HERMES_ENABLE_PROJECT_PLUGINS=1 \
   hermes quill-hermes abort \
   --workspace /tmp/opencode/hermes-smoke-s4e
   ```

   Expected: PASS if adapter-local state is marked aborted and artifacts are preserved.

If Hermes is unavailable locally, smoke is BLOCKED rather than silently claimed as passing.
