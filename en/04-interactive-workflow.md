# 04. Interactive workflow

## When interactive mode is the right choice

Use `codex` when the task:

- is not fully specified;
- requires repo exploration;
- may split into multiple options;
- benefits from human confirmation between steps.

## Practical workflow

### 1. Anchor the working directory

```bash
codex -C /path/to/repo
```

Do not start from a random directory if the task is repo-specific.

### 2. Set the initial frame

Good opening prompt:

```text
Study the project. Find the entrypoint, tests, build/run commands, and main risks. First give a short plan, then wait for confirmation before editing files.
```

### 3. State your safety boundaries

For higher-risk work:

```text
Work only inside this repository. No destructive git commands. Before any edits, show a short plan.
```

### 4. Work in layers

Reliable order:

1. investigate;
2. confirm understanding;
3. make the smallest useful patch;
4. run targeted validation;
5. review the final diff.

### 5. End with validation

Good closing prompt:

```text
Run the relevant checks, then summarize what changed, what was verified, and what risks remain.
```

## Useful slash commands

### `/help`

- show slash command help.

### `/status`

- show current session and config status.

### `/model`

- inspect or switch the current model.

### `/approvals`

- change approval behavior inside the session.

### `/search`

- toggle web search.

### `/mcp`

- manage MCP integrations inside the session.

### `/compact`

- compress the current context.

Use when:

- the session is long;
- context is getting noisy;
- you want to keep momentum without restarting.

### `/clear`

- clear visible session history.

Use only when you understand the context tradeoff.

## Practices that save time

- start broad, but with hard boundaries;
- ask for investigation before modification;
- write non-goals explicitly;
- ask for targeted tests, not everything;
- use `git diff` and a checkpoint commit after a successful stage.

## Typical mistakes

- asking to “fix everything”;
- not setting the repo root;
- not stating whether tests may be changed;
- giving a goal without a done criterion.

## Sources

- https://developers.openai.com/codex/cli/features
- https://developers.openai.com/codex/cli/slash-commands
