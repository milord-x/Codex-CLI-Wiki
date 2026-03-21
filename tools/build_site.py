#!/usr/bin/env python3
from __future__ import annotations

import html
import json
import re
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import quote


ROOT = Path(__file__).resolve().parents[1]
SITE_DIR = ROOT / "site"
ASSETS_DIR = SITE_DIR / "assets"
DATA_DIR = SITE_DIR / "data"


def slugify(text: str) -> str:
    value = text.strip().lower()
    value = re.sub(r"[^\w\s-]", "", value, flags=re.UNICODE)
    value = re.sub(r"[\s_-]+", "-", value, flags=re.UNICODE).strip("-")
    return value or "section"


def doc_href(slug: str, section: str | None = None) -> str:
    locale = locale_for_path(slug)
    href = f"#lang={quote(locale)}&doc={quote(slug)}"
    if section:
        href += f"&section={quote(section)}"
    return href


def collect_docs() -> list[Path]:
    docs: list[Path] = []
    for path in ROOT.rglob("*"):
        if not path.is_file():
            continue
        rel = path.relative_to(ROOT)
        if rel.parts[0] in {"site", "tools"}:
            continue
        if rel.name.startswith("."):
            continue
        if not (rel.name.endswith(".md") or rel.name.endswith(".md.example")):
            continue
        docs.append(path)
    return sorted(docs, key=lambda item: sort_key(item.relative_to(ROOT).as_posix()))


def locale_for_path(rel: str) -> str:
    return "en"


def sort_key(rel: str) -> tuple:
    name = Path(rel).name
    if rel == "README.md":
        return (0, 0, rel)
    match = re.match(r"^(\d+)-", name)
    if match and "/" not in rel:
        return (1, int(match.group(1)), rel)
    if rel == "cheatsheet.md":
        return (2, 0, rel)
    if rel == "playbooks.md":
        return (2, 1, rel)
    if rel == "INDEX.md":
        return (2, 2, rel)
    if rel.startswith("examples/"):
        return (3, rel.count("/"), rel)
    return (4, 0, rel)


def group_for(rel: str) -> str:
    name = Path(rel).name
    if rel.startswith("examples/"):
        return "examples"
    if rel.startswith("en/examples/"):
        return "examples"
    if rel in {"README.md", "INDEX.md"} or name.startswith(
        ("01-", "02-", "03-", "04-")
    ):
        return "fundamentals"
    if rel.startswith("en/") and (
        rel in {"en/README.md", "en/INDEX.md"}
        or name.startswith(("01-", "02-", "03-", "04-"))
    ):
        return "fundamentals"
    if name.startswith(("05-", "06-", "07-")):
        return "cli"
    if name.startswith(("08-", "09-")):
        return "integration"
    if name.startswith(("10-", "11-", "12-", "13-")) or name in {
        "cheatsheet.md",
        "playbooks.md",
    }:
        return "practice"
    return "docs"


def strip_markdown(text: str) -> str:
    text = re.sub(r"```.*?```", " ", text, flags=re.DOTALL)
    text = re.sub(r"`([^`]+)`", r"\1", text)
    text = re.sub(r"!\[([^\]]*)\]\([^)]+\)", r"\1", text)
    text = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", text)
    text = re.sub(r"^\s{0,3}#{1,6}\s*", "", text, flags=re.MULTILINE)
    text = re.sub(r"^\s*[-*+]\s+", "", text, flags=re.MULTILINE)
    text = re.sub(r"^\s*\d+\.\s+", "", text, flags=re.MULTILINE)
    text = re.sub(r"\|", " ", text)
    text = re.sub(r"\s+", " ", text)
    return text.strip()


def resolve_link(base_rel: Path, target: str, known_docs: set[str]) -> tuple[str, bool]:
    if not target:
        return "#", False
    if target.startswith(("http://", "https://", "mailto:", "tel:")):
        return target, True
    if target.startswith("#"):
        return doc_href(base_rel.as_posix(), slugify(target[1:])), False

    if "#" in target:
        raw_path, raw_fragment = target.split("#", 1)
    else:
        raw_path, raw_fragment = target, ""

    candidate = (ROOT / base_rel.parent / raw_path).resolve()
    if candidate.is_dir():
        candidate = candidate / "README.md"

    try:
        rel_target = candidate.relative_to(ROOT).as_posix()
    except ValueError:
        return target, True

    if rel_target in known_docs:
        return doc_href(
            rel_target, slugify(raw_fragment) if raw_fragment else None
        ), False
    return target, True


def render_inline(text: str, base_rel: Path, known_docs: set[str]) -> str:
    placeholders: dict[str, str] = {}

    def stash(kind: str, value: str) -> str:
        key = f"@@{kind}{len(placeholders)}@@"
        placeholders[key] = value
        return key

    def code_repl(match: re.Match[str]) -> str:
        return stash("CODE", f"<code>{match.group(1)}</code>")

    escaped = html.escape(text, quote=False)
    escaped = re.sub(r"`([^`]+)`", code_repl, escaped)

    def link_repl(match: re.Match[str]) -> str:
        label = match.group(1)
        raw_target = html.unescape(match.group(2))
        href, external = resolve_link(base_rel, raw_target, known_docs)
        label_html = render_inline_basic(label)
        if external:
            return (
                f'<a href="{html.escape(href, quote=True)}" '
                'target="_blank" rel="noreferrer">'
                f"{label_html}</a>"
            )
        return f'<a href="{href}">{label_html}</a>'

    escaped = re.sub(r"\[([^\]]+)\]\(([^)]+)\)", link_repl, escaped)
    escaped = re.sub(
        r"(?<![\w\"'=])(https?://[^\s<]+)",
        r'<a href="\1" target="_blank" rel="noreferrer">\1</a>',
        escaped,
    )
    escaped = re.sub(r"\*\*([^*]+)\*\*", r"<strong>\1</strong>", escaped)
    escaped = re.sub(r"\*([^*]+)\*", r"<em>\1</em>", escaped)

    for key, value in placeholders.items():
        escaped = escaped.replace(key, value)
    return escaped


def render_inline_basic(text: str) -> str:
    escaped = html.escape(text, quote=False)
    escaped = re.sub(r"`([^`]+)`", r"<code>\1</code>", escaped)
    escaped = re.sub(r"\*\*([^*]+)\*\*", r"<strong>\1</strong>", escaped)
    escaped = re.sub(r"\*([^*]+)\*", r"<em>\1</em>", escaped)
    return escaped


def split_table_row(line: str) -> list[str]:
    stripped = line.strip().strip("|")
    return [cell.strip() for cell in stripped.split("|")]


def is_table_divider(line: str) -> bool:
    stripped = line.strip()
    if "|" not in stripped:
        return False
    cells = [cell.strip() for cell in stripped.strip("|").split("|")]
    if not cells:
        return False
    return all(cell and set(cell) <= {"-", ":"} for cell in cells)


def extract_sections(text: str) -> list[dict]:
    sections: list[dict] = []
    current = {"id": "overview", "title": "Обзор", "level": 1, "text": ""}
    in_code = False
    for line in text.splitlines():
        if line.strip().startswith("```"):
            in_code = not in_code
            continue
        if in_code:
            continue
        heading = re.match(r"^\s{0,3}(#{1,6})\s+(.+?)\s*$", line)
        if heading:
            if current["text"].strip() or not sections:
                sections.append(current)
            title = heading.group(2).strip()
            current = {
                "id": slugify(title),
                "title": title,
                "level": len(heading.group(1)),
                "text": "",
            }
            continue
        current["text"] += " " + strip_markdown(line)
    if current["text"].strip() or not sections:
        sections.append(current)
    return sections


def parse_markdown(
    text: str, base_rel: Path, known_docs: set[str]
) -> tuple[str, list[dict], str]:
    lines = text.splitlines()
    output: list[str] = []
    headings: list[dict] = []
    paragraph: list[str] = []
    first_paragraph = ""
    i = 0

    def flush_paragraph() -> None:
        nonlocal paragraph, first_paragraph
        if not paragraph:
            return
        joined = " ".join(part.strip() for part in paragraph if part.strip())
        if joined:
            rendered = render_inline(joined, base_rel, known_docs)
            output.append(f"<p>{rendered}</p>")
            if not first_paragraph and not joined.startswith("<"):
                first_paragraph = strip_markdown(joined)
        paragraph = []

    while i < len(lines):
        line = lines[i]
        stripped = line.strip()

        if stripped.startswith("```"):
            flush_paragraph()
            language = stripped[3:].strip()
            code_lines: list[str] = []
            i += 1
            while i < len(lines) and not lines[i].strip().startswith("```"):
                code_lines.append(lines[i])
                i += 1
            code = "\n".join(code_lines)
            class_attr = (
                f' class="language-{html.escape(language)}"' if language else ""
            )
            output.append(
                f"<pre><code{class_attr}>{html.escape(code, quote=False)}</code></pre>"
            )
            i += 1
            continue

        heading = re.match(r"^\s{0,3}(#{1,6})\s+(.+?)\s*$", line)
        if heading:
            flush_paragraph()
            level = len(heading.group(1))
            title = heading.group(2).strip()
            heading_id = slugify(title)
            headings.append({"level": level, "title": title, "id": heading_id})
            output.append(
                f'<h{level} id="{heading_id}">{render_inline(title, base_rel, known_docs)}</h{level}>'
            )
            i += 1
            continue

        if (
            stripped.startswith("|")
            and i + 1 < len(lines)
            and is_table_divider(lines[i + 1])
        ):
            flush_paragraph()
            headers = split_table_row(line)
            i += 2
            rows: list[list[str]] = []
            while i < len(lines) and lines[i].strip().startswith("|"):
                rows.append(split_table_row(lines[i]))
                i += 1
            thead = "".join(
                f"<th>{render_inline(cell, base_rel, known_docs)}</th>"
                for cell in headers
            )
            tbody_rows = []
            for row in rows:
                cells = "".join(
                    f"<td>{render_inline(cell, base_rel, known_docs)}</td>"
                    for cell in row
                )
                tbody_rows.append(f"<tr>{cells}</tr>")
            output.append(
                '<div class="table-wrap"><table>'
                f"<thead><tr>{thead}</tr></thead><tbody>{''.join(tbody_rows)}</tbody>"
                "</table></div>"
            )
            continue

        unordered = re.match(r"^\s*[-*+]\s+(.+)$", line)
        ordered = re.match(r"^\s*(\d+)\.\s+(.+)$", line)
        if unordered or ordered:
            flush_paragraph()
            list_type = "ul" if unordered else "ol"
            items: list[str] = []
            while i < len(lines):
                current = lines[i]
                match = (
                    re.match(r"^\s*[-*+]\s+(.+)$", current)
                    if list_type == "ul"
                    else re.match(r"^\s*(\d+)\.\s+(.+)$", current)
                )
                if not match:
                    break
                item_text = match.group(1 if list_type == "ul" else 2).strip()
                items.append(
                    f"<li>{render_inline(item_text, base_rel, known_docs)}</li>"
                )
                i += 1
            output.append(f"<{list_type}>{''.join(items)}</{list_type}>")
            continue

        if not stripped:
            flush_paragraph()
            i += 1
            continue

        paragraph.append(line)
        i += 1

    flush_paragraph()
    return "\n".join(output), headings, first_paragraph


def build_docs() -> list[dict]:
    docs = collect_docs()
    known_docs = {path.relative_to(ROOT).as_posix() for path in docs}
    result = []
    for order, path in enumerate(docs):
        rel = path.relative_to(ROOT)
        source = path.read_text(encoding="utf-8")
        html_output, headings, excerpt = parse_markdown(source, rel, known_docs)
        sections = extract_sections(source)
        title = headings[0]["title"] if headings else rel.name
        text = strip_markdown(source)
        result.append(
            {
                "slug": rel.as_posix(),
                "locale": locale_for_path(rel.as_posix()),
                "title": title,
                "sourcePath": rel.as_posix(),
                "groupKey": group_for(rel.as_posix()),
                "order": order,
                "isReadme": rel.name.startswith("README"),
                "isExample": rel.as_posix().startswith(("examples/", "en/examples/")),
                "html": html_output,
                "excerpt": excerpt or text[:180],
                "text": text,
                "headings": headings,
                "sections": sections,
            }
        )
    return result


def main() -> None:
    SITE_DIR.mkdir(parents=True, exist_ok=True)
    ASSETS_DIR.mkdir(parents=True, exist_ok=True)
    DATA_DIR.mkdir(parents=True, exist_ok=True)

    docs = build_docs()
    payload = {
        "generatedAt": datetime.now(timezone.utc).isoformat(),
        "homeSlugs": {"en": "README.md"},
        "docs": docs,
        "groups": [
            "all",
            "fundamentals",
            "cli",
            "integration",
            "practice",
            "examples",
            "docs",
        ],
    }

    content_js = (
        "window.CODEX_WIKI_DATA = "
        + json.dumps(payload, ensure_ascii=False, separators=(",", ":"))
        + ";\n"
    )
    (DATA_DIR / "content.js").write_text(content_js, encoding="utf-8")


if __name__ == "__main__":
    main()
