# Repository Documentation Skill

## Use this skill when

- you need to create or update technical documentation for an existing repository;
- command, path, and dependency accuracy matters;
- documentation must be based on confirmed repo facts.

## Workflow

1. Find README files, build/test configs, and entrypoints.
2. Extract real run, test, and build commands.
3. Map the directory structure to the actual code.
4. Generate docs only from confirmed facts.
5. Mark all unverified details as assumptions.
6. Review the final diff for invented commands or paths.

## Constraints

- Do not invent setup steps that are not in the repo.
- Do not paste large blocks of source code into the docs.
- Do not replace project conventions with your own preferences.

## Validation

- confirm commands against `package.json`, `pyproject.toml`, `Makefile`, and `README`;
- confirm paths via repository search;
- compare documentation changes against `git diff`.

## Output contract

- short project map;
- confirmed commands;
- assumptions and limits;
- list of changed documentation files.
