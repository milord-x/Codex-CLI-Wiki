# Cheatsheet

## Install and sign in

```bash
npm install -g @openai/codex
codex --version
codex login
codex login status
printenv OPENAI_API_KEY | codex login --with-api-key
codex logout
```

## Start a session

```bash
codex
codex -C ~/repo
codex -C ~/repo "study the project first, then propose a plan"
codex -m gpt-5.4 -C ~/repo
```

## Wiki

```bash
wiki codex
wiki codex --build-only
wiki codex --print-path
```

## Safe modes

```bash
codex -s read-only -a untrusted
codex -s workspace-write -a on-request
codex --full-auto
```

## Non-interactive

```bash
codex exec "summarize this repository"
codex exec --json "run tests and summarize failures"
codex exec --ephemeral "explain this stack trace"
codex exec -o result.txt "write final summary only"
```

## Review

```bash
codex review --uncommitted
codex review --base main
codex review --commit <sha>
```

## Sessions

```bash
codex resume --last
codex fork --last
codex exec resume --last "continue and produce a final summary"
```

## Config

```bash
codex -p review
codex -c model=\"gpt-5.4\"
codex -c approval_policy=\"on-request\"
codex -c sandbox_mode=\"workspace-write\"
```

## MCP

```bash
codex mcp list
codex mcp add docs --url https://example.invalid/mcp
codex mcp add mytool -- my-command --serve
codex mcp get docs
codex mcp remove docs
```

## Features

```bash
codex features list
codex features enable unified_exec
codex features disable unified_exec
```

## Completion

```bash
codex completion bash
codex completion zsh
codex completion fish
```

## Good starting prompts

```text
Study the repository. Find the entrypoint, tests, and run commands. Do not edit anything before a short plan.
```

```text
Reproduce the bug, fix it with the smallest useful patch, run the relevant tests, and summarize the remaining risks.
```

```text
Review only the changed files. I want findings by severity, not a long overview.
```
