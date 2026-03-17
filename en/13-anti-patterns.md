# 13. Common mistakes and anti-patterns

## 1. Overly broad requests

Bad:

```text
Fix the project.
```

Why it fails:

- Codex has to guess the scope;
- the diff grows too large;
- review becomes expensive.

What to do instead:

- constrain the module, goal, and done criteria.

## 2. Dangerous defaults

Bad:

- normalizing `danger-full-access` or `never`.

Why it fails:

- you remove useful safety rails.

Better:

- default to `workspace-write` and `on-request`.

## 3. Ignoring current repository conventions

Bad:

- forcing a brand-new style onto an existing codebase.

Better:

- inspect current conventions first;
- patch second.

## 4. Not checking local `--help`

Why it matters:

- CLI behavior changes over time;
- some official or older examples may not match your installed version.

Better:

- when in doubt, run `codex <command> --help`.

## 5. Secrets in prompts or docs

Bad:

- API keys, bearer tokens, private URLs, passwords in prompts, `AGENTS.md`, or wiki files.

Better:

- use env vars and secret management.

## 6. No checkpoint before large work

Bad:

- rollback becomes painful;
- useful comparison points disappear.

Better:

- create a branch or stash first.

## 7. No targeted validation

Bad:

- treating generated code as finished without tests or review.

Better:

- run tests and review the changed area specifically.

## 8. Turning `AGENTS.md` into a dump

Bad:

- giant file;
- duplicate README content;
- contradictory rules.

Better:

- keep only durable, normative project policy there.

## 9. Making a skill too generic

Bad:

- one skill that “does everything”.

Better:

- one skill = one narrow repeatable workflow.

## 10. Asking for refactoring when a bug fix is needed

Bad:

- the real fix disappears inside unrelated changes.

Better:

- fix first, refactor later.

## 11. Using web search without a reason

Bad:

- mixing repo truth with irrelevant external noise.

Better:

- turn on `--search` only for time-sensitive external facts.

## 12. Treating a good explanation as proof

Bad:

- the rationale sounds convincing, but nothing was verified.

Better:

- demand reproduction, diff review, and validation.
