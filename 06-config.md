# 06. `config.toml`

## File location

Base path:

```text
~/.codex/config.toml
```

On this machine, a local config already exists:

```toml
model = "gpt-5.4"
model_reasoning_effort = "xhigh"

[projects."/home/proxy"]
trust_level = "trusted"
```

## What it is

`config.toml` stores persistent CLI defaults:

- default model;
- reasoning effort;
- sandbox and approval defaults;
- feature flags;
- profiles;
- project-specific overrides;
- MCP configuration.

## Practical precedence

Use this mental model:

1. CLI overrides via flags and `-c`
2. selected `--profile`
3. base `~/.codex/config.toml`
4. project-specific `[projects."..."]` blocks

If behavior is surprising, first look for a command-line override.

## Minimal useful example

```toml
model = "gpt-5.4"
model_reasoning_effort = "high"
sandbox_mode = "workspace-write"
approval_policy = "on-request"

[profiles.review]
model_reasoning_effort = "high"
sandbox_mode = "read-only"
approval_policy = "untrusted"

[profiles.fast]
model_reasoning_effort = "medium"

[projects."/home/user/src/app"]
trust_level = "trusted"
```

## `trust_level`

`trust_level = "trusted"` tells the CLI that this project is trusted. That affects the safety and automation UX around the repo.

Use when:

- it is your own repo;
- the codebase is understood;
- the environment is controlled.

Do not use when:

- the repo is unknown or untrusted;
- you are auditing third-party code.

## Profiles

A profile is a named config bundle.

Examples:

```bash
codex -p review
codex exec -p fast "summarize this repository"
```

Useful profiles:

- `review` — read-only plus conservative approvals
- `fast` — lower reasoning effort
- `deep` — higher reasoning effort
- `danger` — only for carefully controlled cases

## Temporary overrides

```bash
codex -c model=\"gpt-5.4\" -c model_reasoning_effort=\"high\"
codex -c approval_policy=\"on-request\"
```

Use when:

- you are testing a one-off variation;
- you do not want to edit the config permanently.

## Common mistakes

- using relative paths inside `[projects."..."]`;
- forgetting TOML quoting;
- mixing permanent and one-off settings;
- storing secrets directly in the config.

## Security

- keep API keys in environment or secret stores when possible;
- review `trust_level` carefully;
- do not enable risky defaults globally if only one repo needs them.

## Sources

- https://developers.openai.com/codex/config-basic
- https://developers.openai.com/codex/config-advanced
- https://developers.openai.com/codex/config-reference
