## Goal

Keep `@pandaria/quill` as scaffold-only installer:

```bash
npx @pandaria/quill init
npx @pandaria/quill init --target ./some-project
```

Generated target structure:

```text
AGENTS.md
.quill/core/
.quill/distributions/
```

## Non-Goals

- Do not execute writing workflows.
- Do not call models.
