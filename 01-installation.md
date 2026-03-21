# 01. Installation

## What this is

Codex CLI is a local coding agent from OpenAI that runs in your terminal.

## Install methods

### npm

Syntax:

```bash
npm install -g @openai/codex
```

What it does:

- installs the CLI globally into your active Node/npm environment.

Use when:

- you are on Linux or macOS;
- Node.js and npm are already working;
- you want a predictable install path.

Do not use when:

- global npm packages are blocked by policy;
- your PATH or npm global prefix is broken.

Verify:

```bash
codex --version
codex --help
```

Typical errors:

- `codex: command not found`
- outdated Node.js
- wrong npm global prefix

Security:

- install only the official `@openai/codex` package;
- avoid random install workarounds from third-party blogs.

### Homebrew

Syntax:

```bash
brew install codex
```

What it does:

- installs Codex through Homebrew.

Use when:

- you are on macOS;
- Homebrew is your normal package workflow.

Do not use when:

- your machine does not use brew;
- another install method already owns your `codex` binary.

## First verification

```bash
codex --version
codex --help
codex login status
```

Minimum success criteria:

- `codex` is in `PATH`;
- the version prints;
- `--help` shows the command list;
- auth setup can start next.

## Immediate next steps

1. Configure authentication.
2. Enable shell completion if you use the CLI often.
3. Create a basic `~/.codex/config.toml` if you want model or sandbox defaults.

## Do not do this

- do not install Codex into a random project virtualenv if you want a system CLI;
- do not mix multiple install methods without checking which binary wins in `PATH`;
- do not start real work before checking `codex --help` locally.

## Sources

- https://developers.openai.com/codex
- local `@openai/codex` README
