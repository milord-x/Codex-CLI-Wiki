# 08. Skills

## What this is

A skill is a reusable package of instructions and helper assets for a narrow, repeatable task.

Typical contents:

- `SKILL.md` — the core instructions;
- `scripts/` — automation helpers;
- `assets/` or `references/` — templates or reference material.

## Use skills when

- a task repeats;
- the workflow should stay stable;
- domain rules matter;
- helper scripts or templates save time.

Examples:

- safe Python bug fixing;
- repository documentation generation;
- onboarding for a specific monorepo;
- release checklists.

## Do not use skills when

- it is a one-off instruction;
- the rules belong to the whole repository;
- you are about to store secrets or transient runtime state.

For stable repository-wide rules, use `AGENTS.md`.

## Where to store them

Useful locations:

- user skills: `~/.codex/skills/`
- examples in this repo: `examples/skills/`

On this machine, a system skills directory also exists:

```text
~/.codex/skills/.system/
```

## Minimal structure

```text
my-skill/
  SKILL.md
  scripts/
  assets/
```

## What to write in `SKILL.md`

Minimum useful content:

- what the skill is for;
- when to apply it;
- required inputs;
- workflow steps;
- constraints;
- validation commands;
- expected output.

Good skills are:

- narrow;
- reusable;
- explicit;
- not dependent on hidden context.

## Typical mistakes

- making the skill too broad;
- storing secrets in the skill;
- using brittle absolute paths;
- duplicating repository policy that belongs in `AGENTS.md`.

## Security

- skill scripts are executable code and should be treated like normal programs;
- avoid destructive steps unless explicitly justified;
- keep only reusable knowledge here, not secrets.

## See also

- [09-agents-md.md](./09-agents-md.md)
- [examples/skills/README.md](./examples/skills/README.md)

## Sources

- https://developers.openai.com/codex/skills
- local `~/.codex/skills/` layout
