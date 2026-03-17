# 03. Basic commands

## Minimum useful set

### `codex`

What it is:

- the interactive TUI/CLI session.

Syntax:

```bash
codex
codex "fix the first failing test in this repo"
codex -C /path/to/repo
```

Use when:

- you need exploration;
- you want iterative back-and-forth;
- the task may branch.

Do not use when:

- you need a non-interactive CI step;
- you only need a machine-readable result.

### `codex exec`

What it is:

- non-interactive execution.

Syntax:

```bash
codex exec "run tests, fix the first failure, summarize the changes"
```

Use when:

- you want repeatable one-shot runs;
- shell automation matters;
- you need JSON or structured output.

### `codex review`

What it is:

- non-interactive code review.

Syntax:

```bash
codex review --uncommitted
codex review --base main
codex review --commit <sha>
```

Use when:

- self-reviewing changes before a commit or PR;
- checking staged, unstaged, or commit-based diffs.

### `codex resume` and `codex fork`

- `resume` continues an older session;
- `fork` creates a new branch of thought from an older session.

Use when:

- you want to restore context;
- you want an alternative solution path without destroying the original one.

### `codex login status`

- quick auth health check.

### `codex completion`

- generate shell completion scripts.

Example:

```bash
codex completion bash
codex completion zsh
```

## Useful global flags

### `-C, --cd <DIR>`

- set the working root explicitly;
- use it when the repo is not your current directory.

### `-m, --model <MODEL>`

- pin the model explicitly;
- use it when repeatability matters.

### `-p, --profile <NAME>`

- load a profile from `config.toml`;
- use it for repeatable modes such as `review`, `fast`, or `deep`.

### `-s, --sandbox <MODE>`

- control filesystem access;
- common modes: `read-only`, `workspace-write`, `danger-full-access`.

### `-a, --ask-for-approval <POLICY>`

- control command confirmation behavior;
- `on-request` is usually a good default for interactive use.

### `--search`

- enable web search;
- use it only when the task truly needs fresh external facts.

### `--full-auto`

- low-friction automatic mode;
- use it only in a trusted repo with a narrow, well-defined task.

## Recommended first run

```bash
codex -C /path/to/repo
```

Then start with:

```text
Study the repository first. Find the entrypoint, tests, run commands, and main risks. Do not change anything before a short plan.
```

## Sources

- https://developers.openai.com/codex/cli
- local `codex --help`, `codex exec --help`, `codex review --help`
