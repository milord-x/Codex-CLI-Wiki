# Playbooks

## 1. Start a new project

Goal:

- get a clean MVP skeleton instead of uncontrolled code generation.

Steps:

1. define the stack, constraints, and target outcome;
2. ask for architecture and directory structure first;
3. generate module by module after approval;
4. finish with run commands and a smoke test.

Command:

```bash
codex -C ~/new-project
```

Prompt:

```text
I need a new project for these requirements: ...
First propose the architecture, directory structure, and minimum file set. Do not generate more than the MVP. After approval, create the project and give me run commands.
```

## 2. Analyze an unfamiliar repository

Steps:

1. start in read-only mode;
2. ask for a repo map;
3. identify entrypoint, tests, run commands, and risk areas;
4. edit only after the analysis is clear.

Command:

```bash
codex -C ~/repo -s read-only -a untrusted
```

Prompt:

```text
Study this repository like a new engineer. Find the entrypoint, tests, run commands, key modules, and technical risks. Analysis only, no edits.
```

## 3. Fix a focused bug

Steps:

1. create a checkpoint;
2. ask for reproduction and root cause;
3. allow only the smallest useful patch;
4. request a regression test and targeted validation.

Prompt:

```text
Reproduce the bug from the traceback below. Fix it with the smallest useful patch. Do not change the public API or unrelated files. Add a regression test if appropriate. Then run the relevant checks and list the remaining risks.
```

## 4. Safe refactoring

Steps:

1. define non-goals;
2. keep the work inside one module or layer;
3. require behavioral parity;
4. compare the diff and run tests.

Prompt:

```text
Refactor only module X. Goal: remove duplication and improve readability. Behavior and public API must stay the same. After the edits, run the existing tests for this module and explain how behavior was preserved.
```

## 5. Finish an unfinished project

Steps:

1. inspect current state first;
2. list unfinished areas;
3. prioritize blockers;
4. close one blocker at a time with validation.

Prompt:

```text
Analyze the project and identify what is missing for a usable MVP. First produce a blocker list and execution order. Then take only the first blocker and bring it to a verifiable state.
```

## 6. Create documentation

Steps:

1. find real commands and config in the repo;
2. forbid invented setup steps;
3. generate docs from confirmed facts only;
4. review paths and command accuracy before finishing.

Prompt:

```text
Create developer documentation for the current repository. Do not invent commands, dependencies, or paths: first find them in code and config. If something is not confirmed, mark it as an assumption.
```
