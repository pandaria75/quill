# Quill

Quill is a document-first longform-writing workflow kit.

Its product center is portable document assets, not a standalone runtime, model client, workflow runner, memory runtime, or provider router.

## What Ships

- `core/` document assets for the first workflow family: `longform-writing`
- capability-oriented skills
- `technical-blog` as a role-card
- artifact contracts, review gates, and memory guidance
- a scaffold-only installer exposed as `npx @pandaria/quill init`
- Hermes distribution research docs and skeleton directories only

## Supported Command

```bash
npx @pandaria/quill init
npx @pandaria/quill init --target ./some-project
```

The installer copies Quill document assets into `.quill/`, writes a thin workspace `AGENTS.md`, and adds lightweight configuration. It does not run workflows.

## Core Layout

```text
core/
  AGENTS.md
  workflows/longform-writing.md
  skills/
  role-cards/technical-blog.md
  artifact-contracts/
  review-gates/
  memory/
```

## Hermes Status

Hermes is the first distribution target, but this reset is research-first.

- no Hermes plugin implementation is shipped here
- unknown Hermes capabilities stay marked `unknown`
- future work should start with a bounded spike

See:

- `distributions/hermes/research/capability-checklist.md`
- `distributions/hermes/research/capability-report.md`
- `distributions/hermes/plugin/README.md`
- `distributions/hermes/commands/README.md`
- `distributions/hermes/subagents/README.md`
- `distributions/hermes/config/README.md`
- `distributions/hermes/memory/README.md`

## Technical-Blog Role

`technical-blog` is a role-card for longform-writing work. It is not a product command and not a workflow runner.

## Architecture Notes

- Quill Core is container-neutral.
- Quill Core is model-provider-neutral.
- Memory is policy-oriented only.
- Host/runtime behavior belongs in future distributions, not in Core.

## Repository Reset Notes

The earlier CLI MVP was archived as a product direction. See `docs/archive/cli-mvp-postmortem.md` for the pivot summary.

## License

MIT License. See [LICENSE](./LICENSE).
