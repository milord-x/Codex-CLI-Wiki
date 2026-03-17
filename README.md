# Codex CLI wiki

Открыть онлайн через GitHub Pages:

- EN: https://milord-x.github.io/unofficial-codex-cli-wiki/#lang=en
- RU: https://milord-x.github.io/unofficial-codex-cli-wiki/#lang=ru

Независимая локальная wiki по ежедневной работе с Codex CLI: Markdown-версия, HTML-версия с поиском и launcher `wiki codex`. Если тебе нужно просто почитать wiki, Pages-ссылка выше удобнее, чем локальная сборка.

## Что внутри

- структурированная wiki по Codex CLI на русском;
- полное английское зеркало в `en/`;
- офлайновый HTML-сайт с поиском по словам и разделам;
- launcher `wiki codex` для быстрого открытия;
- примеры prompts, `AGENTS.md` и skills.

## Быстрый старт

### Открыть без скачивания

- Открой GitHub Pages по ссылкам выше.

### Открыть HTML-версию из клонированного репозитория

```bash
./bin/wiki codex
```

### Только пересобрать HTML из клонированного репозитория

```bash
./bin/wiki codex --build-only
```

### Только вывести путь к HTML из клонированного репозитория

```bash
./bin/wiki codex --print-path
```

### Собрать напрямую без launcher

```bash
python3 tools/build_site.py
```

После сборки основной HTML-файл лежит в:

```text
site/index.html
```

Если у тебя уже установлен глобальный launcher, можно использовать и короткую форму:

```bash
wiki codex
```

## Скачать и использовать

### Linux

```bash
git clone https://github.com/milord-x/unofficial-codex-cli-wiki.git
cd unofficial-codex-cli-wiki
./bin/wiki codex
```

Если нужен только rebuild:

```bash
python3 tools/build_site.py
xdg-open site/index.html
```

### macOS

```bash
git clone https://github.com/milord-x/unofficial-codex-cli-wiki.git
cd unofficial-codex-cli-wiki
./bin/wiki codex
```

Если нужен только rebuild:

```bash
python3 tools/build_site.py
open site/index.html
```

### Windows (PowerShell)

```powershell
git clone https://github.com/milord-x/unofficial-codex-cli-wiki.git
cd unofficial-codex-cli-wiki
powershell -ExecutionPolicy Bypass -File .\bin\wiki.ps1 codex
```

Если нужен только rebuild:

```powershell
py .\tools\build_site.py
start .\site\index.html
```

## Структура репозитория

- `README.md` — стартовая точка и карта проекта.
- `LICENSE` — permissive лицензия MIT.
- `bin/` — launchers для локального открытия wiki.
- `site/` — готовая HTML-версия wiki.
- `tools/build_site.py` — генератор HTML из Markdown.
- `en/` — английская версия документации.
- `examples/` — примеры prompts, `AGENTS.md` и skills.

## Независимость и товарные знаки

- Это независимый неофициальный проект.
- Он не аффилирован с OpenAI, не одобрен OpenAI и не спонсируется OpenAI.
- Названия OpenAI, ChatGPT, GPT и Codex могут быть товарными знаками их правообладателей.
- Эта лицензия не предоставляет прав на товарные знаки, логотипы или фирменный стиль OpenAI.
- Если ты публикуешь форк или производную работу, не создавай впечатление, что это официальный проект OpenAI.

## Статус источников

- Основной источник истины: официальная документация OpenAI по Codex.
- Локальная верификация: `codex --help`, `codex <command> --help`, `codex --version`.
- Проверенная локальная версия на этой машине: `codex-cli 0.115.0`.

Почему это важно:

- Документация и CLI иногда расходятся по синтаксису между версиями.
- В спорных местах сначала доверяй `codex --help` своей установленной версии.
- В этой wiki такие расхождения помечены явно.

## Карта wiki

- [01-installation.md](./01-installation.md) — установка и первичная проверка.
- [02-auth-and-plans.md](./02-auth-and-plans.md) — вход через ChatGPT и через API key.
- [03-basic-commands.md](./03-basic-commands.md) — минимальный набор команд для старта.
- [04-interactive-workflow.md](./04-interactive-workflow.md) — практический интерактивный workflow.
- [05-command-reference.md](./05-command-reference.md) — reference по командам и ключевым флагам.
- [06-config.md](./06-config.md) — `~/.codex/config.toml`, профили, project overrides.
- [07-models-and-modes.md](./07-models-and-modes.md) — модели, sandbox, approvals, `--oss`.
- [08-skills.md](./08-skills.md) — skills, структура `SKILL.md`, примеры.
- [09-agents-md.md](./09-agents-md.md) — как писать `AGENTS.md` и как он применяется.
- [10-best-practices.md](./10-best-practices.md) — рабочие практики для реальных проектов.
- [11-prompting.md](./11-prompting.md) — как писать промпты для Codex.
- [12-debugging-recovery.md](./12-debugging-recovery.md) — безопасный багфикс, валидация, восстановление.
- [13-anti-patterns.md](./13-anti-patterns.md) — частые ошибки и анти-паттерны.
- [cheatsheet.md](./cheatsheet.md) — быстрые команды и рецепты.
- [playbooks.md](./playbooks.md) — готовые сценарии работы.
- [examples/prompts.md](./examples/prompts.md) — хорошие промпты по задачам.
- [examples/agents.md.example](./examples/agents.md.example) — пример `AGENTS.md`.
- [examples/skills/](./examples/skills/) — примеры skills.
- [INDEX.md](./INDEX.md) — краткий индекс всех файлов.

## Как пользоваться этой wiki

1. Если ты ставишь Codex впервые, начинай с `01` и `02`.
2. Если Codex уже установлен, прочитай `03`, `04`, `05`, `06`.
3. Для постоянной повседневной работы держи рядом `cheatsheet.md`.
4. Для задач в проекте используй `playbooks.md` и `examples/prompts.md`.
5. Перед risky-run всегда сверяй `05-command-reference.md` и `07-models-and-modes.md`.

## HTML-версия

- Локальная HTML-версия собирается в `site/index.html`.
- Быстрый запуск из терминала: `wiki codex`
- Только пересобрать без открытия: `wiki codex --build-only`
- Только вывести путь к HTML-файлу: `wiki codex --print-path`

## Важные версионные замечания

- Локальный `codex-cli 0.115.0` показывает `codex login --with-api-key`, читающий ключ из `stdin`.
- Часть официальных примеров все еще использует форму `codex login --api-key ...`.
- В таких случаях эта wiki приводит обе формы, но рекомендует сначала проверить `codex login --help`.
- Локальная справка также помечает `on-failure` как deprecated approval mode.

## Источники

- Официальная документация Codex: https://developers.openai.com/codex
- Аутентификация Codex: https://developers.openai.com/codex/auth
- Официальный пакет `@openai/codex` и встроенный README локальной установки
- Справка локального CLI: `codex --help`
