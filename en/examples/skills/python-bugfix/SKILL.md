# Python Bugfix Skill

## Use this skill when

- there is a reproducible Python bug;
- the fix should stay minimal;
- the project can be validated with `pytest` or another local test runner;
- public API stability matters.

## Inputs you need

- traceback or reproduction steps;
- affected module path, if known;
- test command or failing test name.

## Workflow

1. Confirm the symptom and how to reproduce it.
2. Find the smallest code area connected to the bug.
3. Form a root-cause hypothesis.
4. Fix the bug with the smallest useful patch.
5. Add a regression test if appropriate.
6. Run the relevant checks.
7. Summarize modified files, checks, and remaining risks.

## Constraints

- Do not turn this into broad refactoring.
- Do not change the public API without explicit direction.
- Do not touch unrelated files.
- Do not hide uncertainty: if the cause is not confirmed, say so.

## Validation

- `pytest path/to/test_file.py`
- `git diff --stat`
- `git diff`

## Output contract

- root cause;
- what changed;
- which tests ran;
- remaining regression risk.
