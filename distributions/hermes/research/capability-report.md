# Hermes Capability Report

## Scope

This report records a lightweight local capability check for Hermes before any Quill Hermes plugin work. It is not a plugin design and does not authorize implementation.

Observed local version:

```text
Hermes Agent v0.17.0 (2026.6.19)
```

## Summary Table

| Capability | Status | Evidence | Confidence |
| --- | --- | --- | --- |
| plugin | supported | `hermes plugins --help`, `hermes plugins list` | command surface confirmed; API details unknown |
| commands | supported | top-level `hermes --help` command namespaces | host commands confirmed; third-party registration unknown |
| skills | supported | `hermes skills --help`, `hermes skills list` | command surface confirmed |
| subagents | unknown | no native subagent command/API confirmed | do not infer from a skill name |
| memory | supported | `hermes memory --help`, `hermes memory status` | providers and built-in memory confirmed; policy hooks unknown |
| workspace file read/write | supported | `hermes tools --summary list` shows enabled file toolset | broad capability confirmed; schema/permissions unknown |
| approval / gate / pause-resume | unknown | `--yolo`, `--safe-mode`, hooks, checkpoints, sessions visible | not confirmed as Quill review-gate mechanism |
| config loading | supported | `hermes config --help`, `hermes config path` | user config confirmed; project precedence unknown |
| project-level AGENTS.md/context injection | supported | `hermes chat --help` says `--ignore-rules` skips AGENTS.md injection | injection confirmed at help level; precedence unknown |
| thin plugin registration of commands/subagents | unknown | plugin management exists | exact registration contract not verified |

## Supported Capabilities

- Plugin management exists at command level.
- Commands are a core Hermes surface.
- Skills are installable/listable and can be enabled.
- Memory exists through built-in memory plus external providers.
- File tools are visible as an enabled toolset.
- Config management exists through `hermes config`.
- AGENTS.md-style context injection is indicated by `--ignore-rules` help text.

## Unsupported Capabilities

None conclusively identified in this lightweight check.

## Unknown Capabilities And Blockers

- Exact plugin registration API.
- Exact command registration API for third-party plugins.
- Native subagent registration or invocation API.
- Whether Hermes safety approvals can represent Quill review gates.
- Whether pause/resume semantics can enforce Quill's before-draft and before-final gates.
- Whether memory writes can be intercepted and approval-gated according to Quill memory policy.
- Project-level config and AGENTS.md precedence rules.

## Decision

Do not implement a Hermes plugin in this reset. Continue with documentation skeleton only. A future Hermes spike must prove command registration, file write behavior, gate/pause-resume behavior, and memory-safety boundaries before plugin implementation.
