(function () {
  const data = window.CODEX_WIKI_DATA || { docs: [], groups: [], homeSlugs: {} };
  const docs = data.docs || [];
  const docsBySlug = new Map(docs.map((doc) => [doc.slug, doc]));

  const UI = {
    ru: {
      brandEyebrow: "GitHub Pages",
      brandName: "Codex CLI Wiki",
      pageEyebrow: "Документация",
      searchLabel: "Поиск",
      searchPlaceholder: "Поиск по документации...",
      tocEyebrow: "Навигация",
      mobileToggle: "Разделы",
      homeButton: "На главную",
      copyLink: "Копировать ссылку",
      copied: "Скопировано!",
      copyFailed: "Ошибка",
      noResultsTitle: "Ничего не найдено",
      noResultsBody: "Попробуйте изменить запрос или сбросить фильтры.",
      readmeHub: "Главная",
      markdown: "Markdown",
      sectionsWord: "разделов",
      buildLabel: "Обновлено",
      sourceLabel: "Источник",
      noToc: "В этом документе нет оглавления.",
      groups: {
        all: "Все",
        fundamentals: "Основы",
        cli: "CLI",
        integration: "Интеграция",
        practice: "Практика",
        examples: "Примеры",
        docs: "Документы",
      },
      welcome: {
        title: "Добро пожаловать в Codex CLI Wiki",
        subtitle: "Структурированная документация для эффективной работы с Codex CLI",
        quickLinks: "Быстрый старт",
        gettingStarted: "Начать работу",
        dailyUse: "Повседневное использование",
        advanced: "Продвинутые темы"
      }
    },
    en: {
      brandEyebrow: "GitHub Pages",
      brandName: "Codex CLI Wiki",
      pageEyebrow: "Documentation",
      searchLabel: "Search",
      searchPlaceholder: "Search documentation...",
      tocEyebrow: "Navigation",
      mobileToggle: "Sections",
      homeButton: "Home",
      copyLink: "Copy link",
      copied: "Copied!",
      copyFailed: "Failed",
      noResultsTitle: "Nothing found",
      noResultsBody: "Try a different query or reset filters.",
      readmeHub: "Home",
      markdown: "Markdown",
      sectionsWord: "sections",
      buildLabel: "Updated",
      sourceLabel: "Source",
      noToc: "This document has no table of contents.",
      groups: {
        all: "All",
        fundamentals: "Fundamentals",
        cli: "CLI",
        integration: "Integration",
        practice: "Practice",
        examples: "Examples",
        docs: "Documents",
      },
      welcome: {
        title: "Welcome to Codex CLI Wiki",
        subtitle: "Structured documentation for efficient Codex CLI workflow",
        quickLinks: "Quick Start",
        gettingStarted: "Get Started",
        dailyUse: "Daily Use",
        advanced: "Advanced Topics"
      }
    }
  };

  function detectLocale() {
    const params = new URLSearchParams(window.location.hash.replace(/^#/, ""));
    const hashLocale = params.get("lang");
    if (hashLocale && UI[hashLocale]) {
      return hashLocale;
    }
    const stored = window.localStorage.getItem("codexWikiLocale");
    if (stored && UI[stored]) {
      return stored;
    }
    const browser = (navigator.language || "").toLowerCase();
    return browser.startsWith("ru") ? "ru" : "en";
  }

  function homeSlugFor(locale) {
    return (data.homeSlugs && data.homeSlugs[locale]) || docs[0]?.slug || "";
  }

  const state = {
    query: "",
    group: "all",
    locale: detectLocale(),
    slug: homeSlugFor(detectLocale()),
    section: "",
  };

  const elements = {
    sidebar: document.getElementById("sidebar"),
    navTree: document.getElementById("navTree"),
    filters: document.getElementById("filters"),
    searchInput: document.getElementById("searchInput"),
    searchResults: document.getElementById("searchResults"),
    docCard: document.getElementById("docCard"),
    docHeader: document.getElementById("docHeader"),
    docContent: document.getElementById("docContent"),
    tocList: document.getElementById("tocList"),
    tocMeta: document.getElementById("tocMeta"),
    breadcrumb: document.getElementById("pageBreadcrumb"),
    copyLinkButton: document.getElementById("copyLinkButton"),
    homeButton: document.getElementById("homeButton"),
    mobileToggle: document.getElementById("mobileToggle"),
    langSwitch: document.getElementById("langSwitch"),
    brandEyebrow: document.getElementById("brandEyebrow"),
    brandName: document.getElementById("brandName"),
    pageEyebrow: document.getElementById("pageEyebrow"),
    searchLabel: document.getElementById("searchLabel"),
    footerLabel: document.getElementById("footerLabel"),
    tocEyebrow: document.getElementById("tocEyebrow"),
  };

  function ui() {
    return UI[state.locale] || UI.en;
  }

  function currentDocs() {
    return docs.filter((doc) => doc.locale === state.locale);
  }

  function translateGroup(key) {
    return ui().groups[key] || key;
  }

  function decodeHash() {
    const hash = window.location.hash.replace(/^#/, "");
    const params = new URLSearchParams(hash);
    let locale = params.get("lang");
    if (!locale || !UI[locale]) {
      locale = state.locale;
    }
    let slug = params.get("doc");
    const section = params.get("section") || "";
    if (slug && docsBySlug.has(slug)) {
      locale = docsBySlug.get(slug).locale;
    } else {
      slug = homeSlugFor(locale);
    }
    return { locale, slug, section };
  }

  function encodeHash(slug, section, locale) {
    const params = new URLSearchParams();
    params.set("lang", locale);
    params.set("doc", slug);
    if (section) {
      params.set("section", section);
    }
    return "#" + params.toString();
  }

  function mirrorSlug(locale, slug) {
    const base = slug.startsWith("en/") ? slug.slice(3) : slug;
    const candidate = locale === "en" ? "en/" + base : base;
    if (docsBySlug.has(candidate)) {
      return candidate;
    }
    return homeSlugFor(locale);
  }

  function setRoute(slug, section, locale) {
    const actualLocale = locale || docsBySlug.get(slug)?.locale || state.locale;
    const nextHash = encodeHash(slug, section || "", actualLocale);
    if (window.location.hash !== nextHash) {
      window.location.hash = nextHash;
      return;
    }
    state.locale = actualLocale;
    state.slug = slug;
    state.section = section || "";
    window.localStorage.setItem("codexWikiLocale", state.locale);
    render();
  }

  function groupDocs() {
    const grouped = new Map();
    currentDocs().forEach((doc) => {
      if (state.group !== "all" && doc.groupKey !== state.group) {
        return;
      }
      if (!grouped.has(doc.groupKey)) {
        grouped.set(doc.groupKey, []);
      }
      grouped.get(doc.groupKey).push(doc);
    });
    return grouped;
  }

  function renderLanguageSwitch() {
    elements.langSwitch.innerHTML = "";
    ["ru", "en"].forEach((locale) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "lang-button" + (state.locale === locale ? " active" : "");
      button.textContent = locale.toUpperCase();
      button.title = locale === "ru" ? "Русский" : "English";
      button.addEventListener("click", function () {
        const nextSlug = mirrorSlug(locale, state.slug || homeSlugFor(state.locale));
        setRoute(nextSlug, "", locale);
      });
      elements.langSwitch.appendChild(button);
    });
  }

  function renderFilters() {
    elements.filters.innerHTML = "";
    (data.groups || []).forEach((groupKey) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "filter-chip" + (state.group === groupKey ? " active" : "");
      button.textContent = translateGroup(groupKey);
      button.addEventListener("click", function () {
        state.group = groupKey;
        renderFilters();
        renderNav();
        renderSearch();
      });
      elements.filters.appendChild(button);
    });
  }

  function renderNav() {
    const grouped = groupDocs();
    elements.navTree.innerHTML = "";
    
    if (grouped.size === 0) {
      elements.navTree.innerHTML = '<div class="nav-empty">' + escapeHtml(ui().noResultsTitle) + '</div>';
      return;
    }
    
    for (const [groupKey, items] of grouped.entries()) {
      const wrapper = document.createElement("div");
      wrapper.className = "nav-group";
      const title = document.createElement("div");
      title.className = "nav-group-title";
      title.textContent = translateGroup(groupKey);
      wrapper.appendChild(title);
      items.forEach((doc) => {
        const link = document.createElement("a");
        link.className = "nav-link" + (doc.slug === state.slug ? " active" : "");
        link.href = encodeHash(doc.slug, "", state.locale);
        link.innerHTML =
          '<span class="nav-link-title">' +
          escapeHtml(doc.title) +
          "</span>" +
          '<span class="nav-link-path">' +
          escapeHtml(doc.sourcePath) +
          "</span>";
        link.addEventListener("click", function (event) {
          event.preventDefault();
          setRoute(doc.slug, "", doc.locale);
          if (window.innerWidth < 940) {
            elements.sidebar.classList.remove("open");
          }
        });
        wrapper.appendChild(link);
      });
      elements.navTree.appendChild(wrapper);
    }
  }

  function normalizeText(value) {
    return (value || "").toLowerCase().trim();
  }

  function snippetAround(text, tokens) {
    const lower = normalizeText(text);
    let index = -1;
    for (const token of tokens) {
      index = lower.indexOf(token);
      if (index !== -1) {
        break;
      }
    }
    if (index === -1) {
      return text.slice(0, 160);
    }
    const start = Math.max(0, index - 60);
    const end = Math.min(text.length, index + 120);
    const prefix = start > 0 ? "…" : "";
    const suffix = end < text.length ? "…" : "";
    return prefix + text.slice(start, end).trim() + suffix;
  }

  function searchDocs(query) {
    const normalized = normalizeText(query);
    if (!normalized) {
      return [];
    }

    const tokens = normalized.split(/\s+/).filter(Boolean);
    const results = [];

    currentDocs().forEach((doc) => {
      if (state.group !== "all" && doc.groupKey !== state.group) {
        return;
      }

      let bestScore = 0;
      let bestSection = null;

      (doc.sections || []).forEach((section) => {
        const title = normalizeText(section.title);
        const text = normalizeText(section.text);
        let score = 0;

        tokens.forEach((token) => {
          if (normalizeText(doc.title).includes(token)) {
            score += 22;
          }
          if (normalizeText(translateGroup(doc.groupKey)).includes(token)) {
            score += 14;
          }
          if (title.includes(token)) {
            score += 10;
          }
          if (text.includes(token)) {
            score += 4;
          }
        });

        if (score > bestScore) {
          bestScore = score;
          bestSection = section;
        }
      });

      if (bestScore > 0) {
        results.push({
          doc,
          section: bestSection,
          score: bestScore,
          snippet: snippetAround((bestSection && bestSection.text) || doc.text, tokens),
        });
      }
    });

    return results.sort((a, b) => b.score - a.score).slice(0, 24);
  }

  function renderSearch() {
    const results = searchDocs(state.query);
    elements.searchResults.innerHTML = "";
    if (!state.query.trim()) {
      elements.searchResults.classList.add("hidden");
      return;
    }

    if (!results.length) {
      elements.searchResults.classList.remove("hidden");
      const empty = document.createElement("div");
      empty.className = "search-result search-empty";
      empty.innerHTML =
        '<div class="result-topline"><span class="result-title">' +
        escapeHtml(ui().noResultsTitle) +
        "</span></div>" +
        '<div class="result-snippet">' +
        escapeHtml(ui().noResultsBody) +
        "</div>";
      elements.searchResults.appendChild(empty);
      return;
    }

    elements.searchResults.classList.remove("hidden");
    results.forEach((result) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "search-result";
      button.innerHTML =
        '<div class="result-topline">' +
        '<span class="result-title">' +
        escapeHtml(result.doc.title) +
        "</span>" +
        '<span class="result-section">' +
        escapeHtml(result.section ? result.section.title : translateGroup(result.doc.groupKey)) +
        "</span>" +
        "</div>" +
        '<div class="result-snippet">' +
        escapeHtml(result.snippet) +
        "</div>";
      button.addEventListener("click", function () {
        state.query = "";
        elements.searchInput.value = "";
        renderSearch();
        setRoute(result.doc.slug, result.section && result.section.id, result.doc.locale);
      });
      elements.searchResults.appendChild(button);
    });
  }

  function renderDocHeader(doc) {
    elements.docCard.classList.toggle("is-readme", !!doc.isReadme);
    elements.breadcrumb.textContent = doc.sourcePath;

    const headingsCount = (doc.headings || []).filter((item) => item.level >= 2).length;
    elements.docHeader.innerHTML =
      '<div class="doc-meta-row">' +
      '<span class="meta-pill accent">' +
      escapeHtml(translateGroup(doc.groupKey)) +
      "</span>" +
      '<span class="meta-pill">' +
      escapeHtml(doc.isReadme ? ui().readmeHub : ui().markdown) +
      "</span>" +
      '<span class="meta-pill">' +
      escapeHtml(String(headingsCount)) +
      " " +
      escapeHtml(ui().sectionsWord) +
      "</span>" +
      "</div>" +
      "<h1>" +
      escapeHtml(doc.title) +
      "</h1>" +
      '<div class="doc-excerpt">' +
      escapeHtml(doc.excerpt || "") +
      "</div>" +
      '<div class="doc-source">' +
      escapeHtml(ui().sourceLabel) +
      ': <code>' +
      escapeHtml(doc.sourcePath) +
      '</code> · <a href="https://github.com/milord-x/Codex-CLI-Wiki" target="_blank" rel="noreferrer">GitHub</a></div>';
  }

  function renderDocContent(doc) {
    elements.docContent.innerHTML = doc.html;
    
    document.querySelectorAll('.doc-content a').forEach(link => {
      if (link.href && !link.href.startsWith('#') && !link.href.startsWith('http')) {
        link.target = '_blank';
        link.rel = 'noreferrer';
      }
    });
  }

  function renderToc(doc) {
    const headings = (doc.headings || []).filter((item) => item.level <= 4);
    elements.tocList.innerHTML = "";

    if (!headings.length) {
      elements.tocList.innerHTML = '<div class="toc-empty">' + escapeHtml(ui().noToc) + "</div>";
    } else {
      headings.forEach((heading) => {
        const link = document.createElement("a");
        link.href = encodeHash(doc.slug, heading.id, doc.locale);
        link.className =
          "toc-link level-" +
          Math.min(Math.max(heading.level, 1), 4) +
          (heading.id === state.section ? " active" : "");
        link.textContent = heading.title;
        link.addEventListener("click", function (event) {
          event.preventDefault();
          setRoute(doc.slug, heading.id, doc.locale);
        });
        elements.tocList.appendChild(link);
      });
    }

    const updatedDate = (data.generatedAt || "").split("T")[0];
    elements.tocMeta.innerHTML =
      '<span class="toc-updated">' +
      escapeHtml(ui().buildLabel) + 
      ': <time>' + 
      escapeHtml(updatedDate) + 
      '</time></span>';
  }

  function focusSection(sectionId) {
    if (!sectionId) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    requestAnimationFrame(function () {
      const target = document.getElementById(sectionId);
      if (!target) {
        return;
      }
      target.classList.remove("section-highlight");
      target.classList.add("section-highlight");
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(function () {
        target.classList.remove("section-highlight");
      }, 1400);
    });
  }

  function applyLocaleUi() {
    document.documentElement.lang = state.locale;
    document.title = "Codex CLI Wiki";
    elements.brandEyebrow.textContent = ui().brandEyebrow;
    elements.brandName.textContent = ui().brandName;
    elements.pageEyebrow.textContent = ui().pageEyebrow;
    elements.searchLabel.textContent = ui().searchLabel;
    elements.searchInput.placeholder = ui().searchPlaceholder;
    elements.tocEyebrow.textContent = ui().tocEyebrow;
    elements.mobileToggle.textContent = ui().mobileToggle;
    elements.homeButton.textContent = ui().homeButton;
    elements.copyLinkButton.textContent = ui().copyLink;
  }

  function render() {
    applyLocaleUi();
    renderLanguageSwitch();
    const doc = docsBySlug.get(state.slug) || docsBySlug.get(homeSlugFor(state.locale));
    if (!doc) {
      return;
    }
    state.locale = doc.locale;
    window.localStorage.setItem("codexWikiLocale", state.locale);
    document.title = doc.title + " · Codex CLI Wiki";
    renderNav();
    renderFilters();
    renderDocHeader(doc);
    renderDocContent(doc);
    renderToc(doc);
    renderSearch();
    focusSection(state.section);
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;");
  }

  function handleHashChange() {
    const route = decodeHash();
    state.locale = route.locale;
    state.slug = route.slug;
    state.section = route.section;
    render();
  }

  elements.searchInput.addEventListener("input", function (event) {
    state.query = event.target.value;
    renderSearch();
  });

  elements.copyLinkButton.addEventListener("click", function () {
    navigator.clipboard
      .writeText(window.location.href)
      .then(function () {
        elements.copyLinkButton.textContent = ui().copied;
        setTimeout(function () {
          elements.copyLinkButton.textContent = ui().copyLink;
        }, 1200);
      })
      .catch(function () {
        elements.copyLinkButton.textContent = ui().copyFailed;
        setTimeout(function () {
          elements.copyLinkButton.textContent = ui().copyLink;
        }, 1200);
      });
  });

  elements.homeButton.addEventListener("click", function () {
    setRoute(homeSlugFor(state.locale), "", state.locale);
  });

  elements.mobileToggle.addEventListener("click", function () {
    elements.sidebar.classList.toggle("open");
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "/" && document.activeElement !== elements.searchInput) {
      event.preventDefault();
      elements.searchInput.focus();
      elements.searchInput.select();
    }
    if (event.key === "Escape" && elements.sidebar.classList.contains("open")) {
      elements.sidebar.classList.remove("open");
    }
  });

  window.addEventListener("hashchange", handleHashChange);

  handleHashChange();
})();
