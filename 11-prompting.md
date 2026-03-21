# 11. Prompting Codex well

## A good prompt usually contains

- goal;
- context;
- constraints;
- done criteria;
- validation command;
- desired output format.

Template:

```text
Context: ...
Goal: ...
Constraints: ...
Validate with: ...
Return: ...
```

## For a new project

Use a prompt like:

```text
I need a new project with these requirements: ...
First propose the architecture, directory structure, and minimum MVP. After approval, generate the code. End with run commands and a smoke test.
```

Why it works:

- structure comes before code;
- scope stays controlled;
- success is visible.

## For an existing project

```text
First inspect the repository and identify the current conventions. Then change only problem X, without changing the public API or touching unrelated files. Run the relevant tests and list the remaining risks.
```

Why it works:

- Codex respects the existing codebase;
- patch scope stays narrow;
- validation is built into the task.

## For a focused bug fix

```text
Reproduce the bug from this traceback: ...
Find the root cause.
Fix it with the smallest useful patch.
Add a regression test if appropriate.
Run only the relevant checks and explain why the bug happened.
```

## For safe refactoring

```text
Refactor only file X.
Goal: improve readability and remove duplication.
Behavior must not change.
Public API must not change.
After the edits, run the existing tests for this module.
```

## For repository analysis

```text
Study this repository like a new engineer joining the team.
Find the entrypoint, major modules, run commands, tests, and architecture risks.
Analysis only, no edits.
```

## For documentation generation

```text
Create developer-facing documentation for the current repository.
Do not invent commands or dependencies: find them in the repo first.
If something is not confirmed by code or config, mark it as an assumption.
```

## State these things explicitly

- whether tests may change;
- whether dependencies may be added;
- whether files may be renamed;
- whether backward compatibility is required;
- what to do if ambiguity remains.

## Avoid prompts like these

- “fix everything”
- “make it better”
- “refactor the whole project” with no constraints
- “use best practices” without defining which ones

## Practice

- one prompt, one main objective;
- split large work into stages;
- ask for a plan first when safety matters;
- allow a minimal patch explicitly when speed matters.

## See also

- [playbooks.md](./playbooks.md)
- [examples/prompts.md](./examples/prompts.md)

## Sources

- https://developers.openai.com/cookbook/examples/gpt-5/codex_prompting_guide
- https://developers.openai.com/cookbook/examples/codex/code_modernization
