# Hermes Capability Checklist

Use this checklist before any Hermes plugin work. Status values are `supported`, `unsupported`, or `unknown`.

| Capability | Status | Evidence | Notes |
| --- | --- | --- | --- |
| plugin | supported | `hermes --help`, `hermes plugins --help`, `hermes plugins list` | Command-level plugin management exists; exact plugin registration API remains unknown. |
| commands | supported | `hermes --help` lists command namespaces | Host commands exist; exact third-party command registration API remains unknown. |
| skills | supported | `hermes --help`, `hermes skills --help`, `hermes skills list` | Skills are first-class; Quill skill packaging conventions remain unknown. |
| subagents | unknown | no native subagent command confirmed | A local skill name is not proof of a native subagent API. |
| memory | supported | `hermes memory --help`, `hermes memory status` | Built-in memory and providers exist; write-approval hooks remain unknown. |
| workspace file read/write | supported | `hermes tools --summary list` shows enabled `file` toolset | Broad capability confirmed; exact schema and permission boundaries remain unknown. |
| approval / gate / pause-resume | unknown | `--yolo`, `--safe-mode`, hooks, checkpoints, sessions are visible | Safety/session features are not confirmed as Quill review gates. |
| config loading | supported | `hermes config --help`, `hermes config path` | User config exists; project precedence remains unknown. |
| project-level AGENTS.md or context injection | supported | `hermes chat --help` says `--ignore-rules` skips AGENTS.md injection | Injection is indicated; exact precedence remains unknown. |
| thin plugin registration of commands/subagents | unknown | plugin management exists | Do not implement until a spike proves this. |
