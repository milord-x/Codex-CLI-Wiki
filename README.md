# Codex CLI wiki

Open online via GitHub Pages:

- EN: https://milord-x.github.io/unofficial-codex-cli-wiki/#lang=en
- RU: https://milord-x.github.io/unofficial-codex-cli-wiki/#lang=ru

An independent local wiki for daily work with Codex CLI: Markdown version, HTML version with search, and a `wiki codex` launcher. If you only need to read the wiki, the Pages link above is more convenient than building locally.

## What’s inside

- structured Codex CLI wiki in Russian;
- full English mirror in `en/`;
- offline HTML site with search by words and sections;
- `wiki codex` launcher for quick access;
- examples of prompts, `AGENTS.md`, and skills.

## Quick start

### Open without downloading

- Open the GitHub Pages links above.

### Open HTML version from cloned repository

```bash
./bin/wiki codex
```

### Rebuild HTML only from cloned repository

```bash
./bin/wiki codex --build-only
```

### Print HTML path only from cloned repository

```bash
./bin/wiki codex --print-path
```

### Build directly without launcher

```bash
python3 tools/build_site.py
```

After build, the main HTML file is located at:

```text
site/index.html
```

If you already have the global launcher installed, you can use the short form:

```bash
wiki codex
```

## Download and use

### Linux

```bash
git clone https://github.com/milord-x/unofficial-codex-cli-wiki.git
cd unofficial-codex-cli-wiki
./bin/wiki codex
```

If you only need rebuild:

```bash
python3 tools/build_site.py
xdg-open site/index.html
```

### macOS

```bash
git clone https://github.com/milord-x/unofficial-codex-cli-wiki.git
cd unofficial-codex-cli-wiki
./bin/wiki codex
```

If you only need rebuild:

```bash
python3 tools/build_site.py
open site/index.html
```

### Windows (PowerShell)

```powershell
git clone https://github.com/milord-x/unofficial-codex-cli-wiki.git
cd unofficial-codex-cli-wiki
powershell -ExecutionPolicy Bypass -File .\bin\wiki.ps1 codex
```

If you only need rebuild:

```powershell
py .\tools\build_site.py
start .\site\index.html
```

## Repository structure

- `README.md` — entry point and project map.
- `LICENSE` — permissive MIT license.
- `bin/` — launchers for local wiki access.
- `site/` — ready HTML version of the wiki.
- `tools/build_site.py` — HTML generator from Markdown.
- `en/` — English version of documentation.
- `examples/` — examples of prompts, `AGENTS.md`, and skills.

## Independence and trademarks

- This is an independent unofficial project.
- It is not affiliated with OpenAI, not endorsed by OpenAI, and not sponsored by OpenAI.
- Names OpenAI, ChatGPT, GPT, and Codex may be trademarks of their respective owners.
- This license does not grant rights to trademarks, logos, or branding of OpenAI.
- If you publish a fork or derivative work, do not create the impression that it is an official OpenAI project.

## Source status

- Primary source of truth: official OpenAI Codex documentation.
- Local verification: `codex --help`, `codex <command> --help`, `codex --version`.
- Verified local version on this machine: `codex-cli 0.115.0`.

Why this matters:

- Documentation and CLI syntax may differ between versions.
- In ambiguous cases, trust `codex --help` from your installed version first.
- Such discrepancies are explicitly marked in this wiki.

## Wiki map

- [01-installation.md](./01-installation.md) — installation and initial verification.
- [02-auth-and-plans.md](./02-auth-and-plans.md) — login via ChatGPT and API key.
- [03-basic-commands.md](./03-basic-commands.md) — minimal command set to start.
- [04-interactive-workflow.md](./04-interactive-workflow.md) — practical interactive workflow.
- [05-command-reference.md](./05-command-reference.md) — reference for commands and key flags.
- [06-config.md](./06-config.md) — `~/.codex/config.toml`, profiles, project overrides.
- [07-models-and-modes.md](./07-models-and-modes.md) — models, sandbox, approvals, `--oss`.
- [08-skills.md](./08-skills.md) — skills, `SKILL.md` structure, examples.
- [09-agents-md.md](./09-agents-md.md) — how to write `AGENTS.md` and how it is applied.
- [10-best-practices.md](./10-best-practices.md) — working practices for real projects.
- [11-prompting.md](./11-prompting.md) — how to write prompts for Codex.
- [12-debugging-recovery.md](./12-debugging-recovery.md) — safe bug fixing, validation, recovery.
- [13-anti-patterns.md](./13-anti-patterns.md) — common mistakes and anti-patterns.
- [cheatsheet.md](./cheatsheet.md) — quick commands and recipes.
- [playbooks.md](./playbooks.md) — ready-to-use workflows.
- [examples/prompts.md](./examples/prompts.md) — good prompts by task.
- [examples/agents.md.example](./examples/agents.md.example) — example `AGENTS.md`.
- [examples/skills/](./examples/skills/) — skill examples.
- [INDEX.md](./INDEX.md) — concise index of all files.

## How to use this wiki

1. If installing Codex for the first time, start with `01` and `02`.
2. If Codex is already installed, read `03`, `04`, `05`, `06`.
3. For daily work, keep `cheatsheet.md` nearby.
4. For project tasks, use `playbooks.md` and `examples/prompts.md`.
5. Before risky runs, check `05-command-reference.md` and `07-models-and-modes.md`.

## HTML version

- Local HTML version is built into `site/index.html`.
- Quick launch from terminal: `wiki codex`
- Rebuild only: `wiki codex --build-only`
- Print HTML path: `wiki codex --print-path`

## Important version notes

- Local `codex-cli 0.115.0` uses `codex login --with-api-key` reading the key from `stdin`.
- Some official examples still use `codex login --api-key ...`.
- This wiki includes both forms but recommends checking `codex login --help` first.
- Local help also marks `on-failure` as a deprecated approval mode.

## Sources

- Official Codex documentation: https://developers.openai.com/codex
- Codex authentication: https://developers.openai.com/codex/auth
- Official package `@openai/codex` and its local README
- Local CLI help: `codex --help`

