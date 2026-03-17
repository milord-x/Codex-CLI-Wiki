# 10. Best practices

## 1. Start with investigation, not generation

Good opening prompt:

```text
Study the repository first. Find the entrypoint, tests, run commands, and major risks. Do not change code before a short plan.
```

Bad opening prompt:

```text
Make the project better.
```

## 2. Always define done

State:

- what “done” means;
- which checks must run;
- what must not change.

Example:

```text
Fix only `test_auth.py`. Do not change the public API. Run only the relevant tests and summarize the diff.
```

## 3. Create a git checkpoint before larger tasks

Practical pattern:

```bash
git status
git switch -c codex/<topic>
git stash push -u -m "pre-codex-checkpoint"
```

This makes recovery cheap if a generation goes wrong.

## 4. New projects and existing projects need different workflows

### New project

- ask for structure first;
- define stack and constraints;
- generate module by module;
- validate locally at the end.

### Existing project

- inspect first;
- find existing conventions;
- make the smallest useful patch;
- review and run regression checks.

## 5. Prefer smaller patches

Smaller tasks mean:

- lower regression risk;
- easier review;
- easier rollback;
- faster validation.

## 6. Write stable rules once

Use:

- `AGENTS.md` for repository rules;
- skills for narrow repeatable workflows;
- `config.toml` for persistent CLI defaults.

Do not repeat the same policy in prompts, docs, and three different files.

## 7. Review after editing

Minimum habit:

```bash
git diff --stat
git diff
codex review --uncommitted
```

## 8. Validation matters more than explanation

Good validation is:

- targeted;
- reproducible;
- tied to the changed area.

If a change has no validation, treat it as incomplete.

## 9. Keep dangerous modes exceptional

Sane defaults:

- `workspace-write`
- `on-request`

Do not normalize:

- `danger-full-access`
- `never`
- broad write access outside the repo

## 10. Compact long sessions

If the session grows long:

- move decisions into files;
- use `/compact`;
- use `fork` when the direction changes sharply.

## Sources

- https://developers.openai.com/codex/learn/best-practices
- https://developers.openai.com/codex/cli/features
