# 05. Command reference

This file complements `codex --help`; it does not replace it. When official docs and your installed CLI disagree, prefer local help for your current version.

## Top-level flags

| Flag | What it is | Use when | Do not use when | Example | Errors and safety |
|---|---|---|---|---|---|
| `-C, --cd <DIR>` | set working root | repo is not the current directory | you are already at the correct root | `codex -C ~/src/app` | wrong path means work happens in the wrong place |
| `-m, --model <MODEL>` | explicit model selection | you need repeatability or A/B comparison | a profile already pins the model | `codex -m gpt-5.4` | unavailable model for your account |
| `-p, --profile <NAME>` | profile from `config.toml` | you use repeatable modes | one-off experimentation | `codex -p review` | missing profile |
| `-c, --config key=value` | direct config override | quick ad hoc overrides | the setting is permanent and should live in a profile | `codex -c model_reasoning_effort=\"high\"` | TOML typing and quoting mistakes |
| `-s, --sandbox <MODE>` | sandbox mode | you need explicit filesystem policy | you do not understand the risk | `codex -s workspace-write` | `danger-full-access` is dangerous |
| `-a, --ask-for-approval <POLICY>` | approval policy | you want command confirmation control | you do not understand the automation tradeoff | `codex -a on-request` | `never` is risky in a live repo |
| `--full-auto` | low-friction automatic execution | task is narrow and repo is trusted | large refactors or unknown repos | `codex --full-auto` | always review the diff |
| `--dangerously-bypass-approvals-and-sandbox` | full safety bypass | only in an externally sandboxed environment | almost always | `codex ... --dangerously-bypass-approvals-and-sandbox` | maximum risk |
| `--search` | web search tool | fresh external facts are required | local context is enough | `codex --search` | do not confuse repo truth with web truth |
| `--add-dir <DIR>` | add extra writable directory | you truly need access outside repo root | repo root is enough | `codex --add-dir ../shared` | avoid widening write scope casually |
| `--oss` | local OSS model provider | LM Studio or Ollama is available | you want official hosted Codex | `codex --oss` | local model server must be running |
| `--local-provider <lmstudio|ollama>` | local provider selector | multiple local providers exist | you are not using `--oss` | `codex --oss --local-provider ollama` | wrong provider name |
| `-i, --image <FILE>` | attach image input | screenshots or UI issues matter | the image does not affect the task | `codex -i screenshot.png` | avoid sensitive screenshots |

## Commands

### `codex`

- What it is: interactive session.
- Syntax: `codex [OPTIONS] [PROMPT]`
- What it does: starts the TUI or inline interactive session.
- Use when: you need dialogue and exploration.
- Do not use when: CI or strict one-shot automation is the goal.
- Example: `codex -C ~/repo "find the cause of this flaky test"`
- Typical mistakes: wrong repo root, vague prompt, wrong sandbox.
- Safety: do not bypass sandbox casually.

### `codex exec`

- What it is: non-interactive execution.
- Syntax: `codex exec [OPTIONS] [PROMPT]`
- Use when: scripting, automation, reproducible runs.
- Do not use when: you need active back-and-forth.
- Example: `codex exec --json "run tests and summarize failures"`
- Useful flags: `--json`, `--ephemeral`, `--output-last-message`, `--output-schema`, `--skip-git-repo-check`.
- Safety: pin `-C`, model, sandbox, and approval behavior explicitly in automation.

### `codex exec resume`

- What it is: non-interactive continuation of a previous session.
- Syntax: `codex exec resume [SESSION_ID] [PROMPT]`
- Use when: a batch run should reuse earlier context.

### `codex review`

- What it is: code review over a diff.
- Syntax: `codex review [--uncommitted|--base <branch>|--commit <sha>] [PROMPT]`
- What it does: reports findings on the selected changes.
- Use when: self-review before merge or commit.
- Do not use when: you expect automatic fixes instead of review.
- Example: `codex review --uncommitted`
- Safety: review is safer than auto-editing and should be normal before merge.

### `codex login`

- What it is: login management.
- Syntax: `codex login`, `codex login status`, `codex logout`
- Useful flags: `--with-api-key`, `--device-auth`
- Use when: initial setup or account switching.

### `codex resume`

- What it is: continue an interactive session.
- Syntax: `codex resume [SESSION_ID] [PROMPT]`
- Useful flags: `--last`, `--all`

### `codex fork`

- What it is: branch a previous session into a new thread of work.
- Syntax: `codex fork [SESSION_ID] [PROMPT]`

### `codex apply`

- What it is: apply a diff from a Codex task into your local working tree.
- Syntax: `codex apply <TASK_ID>`
- Safety: inspect provenance and `git diff` first.

### `codex completion`

- What it is: shell completion generation.
- Syntax: `codex completion [bash|zsh|fish|powershell|elvish]`

### `codex mcp`

- What it is: manage MCP servers.
- Subcommands: `list`, `get`, `add`, `remove`, `login`, `logout`

Key forms:

```bash
codex mcp list
codex mcp add my-tool -- my-command --serve
codex mcp add docs --url https://example.invalid/mcp
codex mcp get my-tool
codex mcp remove my-tool
codex mcp login my-tool
codex mcp logout my-tool
```

Important details:

- `mcp add` accepts either `--url` or a local command after `--`.
- `--env KEY=VALUE` is for stdio servers.
- `--bearer-token-env-var` is for HTTP MCP.
- `list` and `get` support `--json`.

Safety:

- only connect trusted MCP servers;
- keep tokens in env or secrets, not markdown files.

### `codex sandbox`

- What it is: run commands in Codex-provided sandbox wrappers.
- Subcommands: `linux`, `macos`, `windows`
- Example: `codex sandbox linux --full-auto make test`

### `codex features`

- What it is: feature flag management.
- Subcommands: `list`, `enable`, `disable`

Examples:

```bash
codex features list
codex features enable unified_exec
codex features disable unified_exec
```

### Rare or experimental commands

| Command | Purpose | Note |
|---|---|---|
| `codex mcp-server` | run Codex as an MCP server | specialized integration use case |
| `codex app-server` | app-related tooling | not a normal daily command |
| `codex debug` | debug tooling | use only while debugging the CLI |
| `codex cloud` | browse Codex Cloud tasks | experimental |

## Approval policy

Locally visible policies:

- `untrusted`
- `on-request`
- `never`
- `on-failure` — deprecated

Typical usage:

- interactive work: `on-request`
- cautious review/audit: `untrusted`
- sandboxed automation: sometimes `never`

## Sandbox mode

- `read-only` — explore only
- `workspace-write` — normal day-to-day mode
- `danger-full-access` — only for well-understood, externally sandboxed environments

## Sources

- https://developers.openai.com/codex/cli/reference
- https://developers.openai.com/codex/noninteractive
- local `codex ... --help`
