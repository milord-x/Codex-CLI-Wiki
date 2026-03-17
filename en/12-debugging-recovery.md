# 12. Safe bug fixing, validation, and recovery

## Safe bug-fix workflow

### 1. Reproduce first

Do not start editing before the symptom is confirmed.

Good starting prompt:

```text
Reproduce the bug first and show a root-cause hypothesis. Do not change code until you identify the smallest broken area.
```

### 2. Create a checkpoint

```bash
git status
git switch -c fix/<topic>
git stash push -u -m "pre-codex-fix"
```

### 3. Constrain the patch

```text
Fix only module X. Do not change unrelated files. Do not change the public API without separate confirmation.
```

### 4. Ask for the smallest useful patch

This lowers:

- regression risk;
- diff size;
- review cost.

### 5. Validate locally

Minimum:

```bash
git diff --stat
git diff
```

Then:

- relevant unit tests;
- relevant linters/formatters;
- manual smoke test if no automation exists.

Also useful:

```bash
codex review --uncommitted
```

## What good validation looks like

Good validation:

- targets the changed code path;
- is reproducible with a clear command;
- checks expected behavior, not only “does it crash”.

Weak validation:

- “it seems to run”
- formatting only
- no diff review

## Recovering from a bad generation

### Scenario 1: the patch went in the wrong direction

Steps:

1. stop the session;
2. inspect `git diff`;
3. revert only the bad hunks;
4. restart with a narrower prompt.

Safe command:

```bash
git restore -p .
```

### Scenario 2: the idea was good, but the session lost focus

Use:

```bash
codex resume --last
codex fork --last
```

`resume` continues the same line of work.

`fork` tries a new branch of reasoning.

### Scenario 3: you want a clean restart

Steps:

1. keep the useful diff if needed;
2. revert only the current unwanted changes;
3. restate the task as a smaller patch.

Avoid destructive reset unless you fully understand what is in the working tree.

## Common mistakes

- refactoring before fixing;
- skipping regression tests;
- not documenting the original symptom;
- not checking `git diff`;
- running broad dangerous commands for a narrow problem.

## Practical safe prompt

```text
Reproduce the bug. Fix it with the smallest useful patch. Add a regression test if appropriate. Do not change the public API or unrelated files. Then run the relevant checks and list the remaining risks.
```

## Sources

- https://developers.openai.com/codex/learn/best-practices
- https://developers.openai.com/codex/noninteractive
