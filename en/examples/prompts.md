# Good prompt examples

## 1. First repository overview

```text
Study the repository. Find the entrypoint, tests, run command, key modules, and highest-risk areas. Analysis only, no edits.
```

## 2. Focused bug fix

```text
Reproduce the failure in `tests/test_auth.py::test_refresh_token`. Fix it with the smallest useful patch. Do not change the public API or unrelated files. Run only the affected tests and explain the root cause.
```

## 3. Review current changes

```text
Review only the current diff. I want findings ordered by severity, with emphasis on bugs, regression risks, and missing tests. Keep summary brief.
```

## 4. Safe refactor

```text
Refactor only `src/payments/service.py`. Remove duplication and improve readability without changing behavior or the public API. Run the existing tests for this module afterwards.
```

## 5. New project

```text
I need a new Python CLI tool for ... First propose the directory structure, dependencies, and minimum MVP. After approval, generate the project. End with run commands and a smoke test.
```

## 6. Legacy code work

```text
Inspect the current conventions and architecture first. Then change only module X for task Y. No large-scale renames or file moves. Run the relevant tests and list the remaining risks.
```

## 7. Documentation generation

```text
Create developer-facing documentation for the current repo. Do not invent commands or settings: find them in config and code first. Mark all unverified statements as assumptions.
```

## 8. PR preparation

```text
Check the current diff as if it were a PR. Find likely bugs, behavioral regressions, missing tests, and questionable decisions. Then suggest a short list of focused improvements in priority order.
```
