# Codex CLI wiki

Independent English edition of the local Codex CLI wiki.

## What this contains

- structured daily-use documentation for Codex CLI;
- an offline HTML site with search and section filters;
- launch command `wiki codex`;
- examples for prompts, `AGENTS.md`, and skills.

## Status of sources

- Primary source of truth: official OpenAI Codex documentation.
- Local verification: `codex --help`, `codex <command> --help`, `codex --version`.
- Locally verified version on this machine: `codex-cli 0.115.0`.

## Wiki map

- [01-installation.md](./01-installation.md) — installation and first verification.
- [02-auth-and-plans.md](./02-auth-and-plans.md) — ChatGPT sign-in and API key auth.
- [03-basic-commands.md](./03-basic-commands.md) — minimum command set for day one.
- [04-interactive-workflow.md](./04-interactive-workflow.md) — practical interactive workflow.
- [05-command-reference.md](./05-command-reference.md) — command and flag reference.
- [06-config.md](./06-config.md) — `~/.codex/config.toml`, profiles, and project overrides.
- [07-models-and-modes.md](./07-models-and-modes.md) — models, sandbox, approvals, `--oss`.
- [08-skills.md](./08-skills.md) — skills, `SKILL.md`, and examples.
- [09-agents-md.md](./09-agents-md.md) — how `AGENTS.md` works.
- [10-best-practices.md](./10-best-practices.md) — operational best practices.
- [11-prompting.md](./11-prompting.md) — how to prompt Codex well.
- [12-debugging-recovery.md](./12-debugging-recovery.md) — safe bug fixing, validation, recovery.
- [13-anti-patterns.md](./13-anti-patterns.md) — common mistakes and anti-patterns.
- [cheatsheet.md](./cheatsheet.md) — quick commands and recipes.
- [playbooks.md](./playbooks.md) — ready-made workflows.
- [examples/prompts.md](./examples/prompts.md) — prompt examples.
- [examples/agents.md.example](./examples/agents.md.example) — `AGENTS.md` example.
- [examples/skills/](./examples/skills/) — skill examples.
- [INDEX.md](./INDEX.md) — compact file index.

## How to use this wiki

1. If you are new to Codex CLI, start with `01` and `02`.
2. If Codex is already installed, read `03`, `04`, `05`, and `06`.
3. Keep [cheatsheet.md](./cheatsheet.md) nearby for day-to-day work.
4. Use [playbooks.md](./playbooks.md) and [examples/prompts.md](./examples/prompts.md) for real tasks.
5. Before risky runs, review [05-command-reference.md](./05-command-reference.md) and [07-models-and-modes.md](./07-models-and-modes.md).

## HTML version

- Local HTML build output: `site/index.html`
- Open from terminal: `wiki codex`
- Rebuild only: `wiki codex --build-only`
- Print HTML path only: `wiki codex --print-path`

## Version notes

- Local `codex-cli 0.115.0` exposes `codex login --with-api-key`, reading the key from `stdin`.
- Some official examples still show `codex login --api-key ...`.
- When docs and local help disagree, prefer `codex login --help`.

## Sources

- Official Codex docs: https://developers.openai.com/codex
- Codex auth docs: https://developers.openai.com/codex/auth
- Local `@openai/codex` package README
- Local CLI help: `codex --help`
