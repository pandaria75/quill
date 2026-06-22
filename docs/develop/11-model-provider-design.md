# Model Provider Design

The MVP supports one OpenAI-compatible Chat Completions client.

## Config Example

`.quill/quill.config.json`:

```json
{
  "modelProvider": {
    "type": "openai-compatible",
    "baseUrl": "https://api.openai.com/v1",
    "apiKeyEnv": "QUILL_API_KEY",
    "defaultModel": "gpt-4.1-mini"
  },
  "models": {
    "planning": "gpt-4.1-mini",
    "drafting": "gpt-4.1-mini",
    "reviewing": "gpt-4.1-mini",
    "polishing": "gpt-4.1-mini"
  },
  "paths": {
    "articles": "docs/articles",
    "styles": ".quill/styles",
    "workflows": ".quill/workflows"
  }
}
```

## Model Roles

Model names are grouped by task role:

- `planning`
- `drafting`
- `reviewing`
- `polishing`

The MVP may use the same model for all roles. It should not use vague tiers such as `smart`, `mid`, or `cheap`.

## Environment

```bash
QUILL_API_KEY=xxx
```

If the API key is missing:

- `quill init` works.
- `quill new` works.
- `quill status` works.
- `quill step` and `quill run` fail clearly when model generation is required.

## Compatibility Goal

OpenAI-compatible design allows future use with OpenAI, proxy providers, local vLLM, Ollama OpenAI-compatible endpoints, and other compatible APIs.

## MVP Non-goals

- streaming
- tool calling
- automatic web research
- image generation
- multimodal input
- complex model routing
