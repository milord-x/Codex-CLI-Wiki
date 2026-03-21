# 07. Models and modes

## Model selection

What it is:

- the model controls reasoning quality, speed, and availability.

How to select:

```bash
codex -m gpt-5.4
codex exec -m gpt-5.4 "analyze this repo"
```

Use explicit `-m` when:

- you need repeatability;
- you are comparing models;
- the active profile is not enough.

## Reasoning effort

What it is:

- how much thinking effort the model should spend.

Usually set in config:

```toml
model_reasoning_effort = "medium"
```

Practical defaults:

- `medium` — normal daily work
- `high` — harder debugging and refactoring
- `xhigh` — expensive but useful for deep multi-step analysis

Do not increase reasoning effort by habit; use it when complexity justifies it.

## Hosted model vs local OSS provider

### Hosted model

Use this by default when you want the normal official Codex experience.

### `--oss`

What it is:

- switch to a local open-source model provider.

Syntax:

```bash
codex --oss
codex --oss --local-provider ollama
codex --oss --local-provider lmstudio
```

Use when:

- you are experimenting locally;
- a local model server is available;
- hosted Codex is not the goal.

Do not use when:

- you need official hosted behavior;
- no local model server is running.

Typical errors:

- provider not running;
- model not loaded;
- assuming behavior parity with hosted Codex.

## Sandbox mode

### `read-only`

- read-only exploration
- best for audits, repository study, code explanation

### `workspace-write`

- normal daily mode
- best for editing inside the current repo

### `danger-full-access`

- no sandbox restriction
- use only in externally sandboxed, fully understood environments

## Approval policy

### `untrusted`

- only trusted commands run without approval
- good for cautious first contact with a repo

### `on-request`

- the model decides when to request approval
- best general default for interactive work

### `never`

- never ask for approval
- only appropriate for tightly controlled automation

### `on-failure`

- visible locally as deprecated
- avoid building new workflows on it

## `--full-auto`

What it is:

- shorthand for low-friction automatic execution.

Use when:

- the repo is trusted;
- the task is narrow and well-defined;
- you will review the result.

Do not use when:

- the repo is unknown;
- the refactor is large;
- production data or broad system access is involved.

## Practical combinations

| Scenario | Model | Sandbox | Approval |
|---|---|---|---|
| Unknown repo review | hosted default | `read-only` | `untrusted` |
| Normal bug fix | `gpt-5.4` | `workspace-write` | `on-request` |
| CI one-shot | pinned model | `workspace-write` | `never` |
| Deep root-cause analysis | `gpt-5.4` with higher reasoning | `read-only` or `workspace-write` | `on-request` |

## Sources

- https://developers.openai.com/codex/models
- https://developers.openai.com/codex/agent-approvals-security
- local `codex --help`
