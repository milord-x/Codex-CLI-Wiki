# 09. `AGENTS.md`

## What it is

`AGENTS.md` is a local instruction file for Codex. It stores durable rules for a project or directory tree.

Typical contents:

- architecture constraints;
- allowed and forbidden commands;
- editing rules;
- test and validation expectations;
- commit and PR conventions;
- security boundaries.

## Where to place it

Useful levels:

- global: `~/.codex/AGENTS.md`
- repository root: `<repo>/AGENTS.md`
- subdirectory: `<repo>/subdir/AGENTS.md`

## How it applies

High-level model:

- the global file applies everywhere;
- the repo root file adds repo-specific rules;
- nested files further specialize rules for subdirectories.

Use nested files only when a subdirectory truly needs different rules.

## Use `AGENTS.md` when

- the repo has mandatory workflow rules;
- safety constraints must be explicit;
- test or release behavior is special;
- you do not want Codex guessing project policy.

## Do not use it when

- the instruction is only for one session;
- the file would contain secrets;
- it would duplicate the README in full;
- the content changes all the time.

## What to include

A good `AGENTS.md` usually states:

- how to find the entrypoint;
- how to run build, test, and lint;
- which directories must not be touched;
- whether tests and fixtures may be changed;
- what successful validation means;
- what the final answer should contain.

## What not to include

- keys and passwords;
- giant training-like explanations;
- contradictory rules across nearby directories;
- person-specific tribal knowledge.

## Best practice

- keep it short and normative;
- keep stable project rules there;
- keep task-specific nuance in the prompt;
- keep narrow repeatable workflows in skills.

## Security

- do not store secrets;
- do not normalize dangerous defaults;
- do not write vague “do anything you want” style rules.

## See also

- [08-skills.md](./08-skills.md)
- [examples/agents.md.example](./examples/agents.md.example)

## Sources

- https://developers.openai.com/codex/guides/agents-md
