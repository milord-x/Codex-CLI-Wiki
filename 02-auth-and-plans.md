# 02. Auth and plans

## Two main scenarios

### Sign in with a ChatGPT account

What it is:

- interactive sign-in with your ChatGPT account;
- the recommended path for manual day-to-day use.

Syntax:

```bash
codex login
codex login status
codex logout
```

What it does:

- opens the login flow;
- stores local credentials;
- lets you use Codex under a supported ChatGPT plan.

Use when:

- you work interactively;
- you use your own laptop or workstation;
- you do not want to manage API keys manually.

Do not use when:

- you need headless CI;
- a browser login is not possible;
- billing must be isolated per service.

Typical errors:

- signed in with the wrong account;
- browser flow completed but terminal auth did not update;
- blocked SSO or device-flow issues.

Security:

- keep work and personal accounts separate;
- avoid shared OS users;
- verify status before demos or screen sharing.

### Sign in with an API key

What it is:

- authentication via OpenAI API key;
- better for automation and explicit billing control.

Locally verified syntax for `codex-cli 0.115.0`:

```bash
printenv OPENAI_API_KEY | codex login --with-api-key
```

Official examples may also show:

```bash
codex login --api-key "$OPENAI_API_KEY"
```

Use when:

- you need CI/CD;
- you want service-level billing and quota control;
- browser auth is not appropriate.

Do not use when:

- the key would end up in shell history;
- ChatGPT sign-in already covers the use case;
- you cannot securely store the key.

Typical errors:

- `OPENAI_API_KEY` is not exported;
- you are using syntax from a different CLI version;
- invalid or exhausted key.

Security:

- prefer `stdin`, CI secrets, or environment injection;
- never commit keys to markdown, configs, `AGENTS.md`, or skills;
- rotate keys regularly.

## Device auth

Local help also exposes:

```bash
codex login --device-auth
```

Use when:

- a browser flow is blocked;
- you are on a remote machine.

## ChatGPT plan vs API key

Use ChatGPT sign-in when:

- the work is interactive;
- setup speed matters;
- you do not need service-level key management.

Use API key auth when:

- you need CI;
- billing separation matters;
- automation must be controlled and reproducible.

## Minimum verification

```bash
codex login status
```

## Sources

- https://developers.openai.com/codex/auth
- https://help.openai.com/en/articles/11369540-codex-in-chatgpt
- local `codex login --help`
