(function () {
  const data = window.CODEX_WIKI_DATA || { docs: [], groups: [], homeSlugs: {} };
  const docs = data.docs || [];
  const docsBySlug = new Map(docs.map((doc) => [doc.slug, doc]));

  const UI = {
    en: {
      brandEyebrow: "Documentation Hub",
      brandName: "Codex CLI Wiki",
      pageEyebrow: "Documentation",
      searchLabel: "Search",
      searchPlaceholder: "Search documentation...",
      tocEyebrow: "On this page",
      mobileToggle: "Sections",
      homeButton: "Home",
      copyLink: "Copy link",
      copied: "Copied!",
      copyFailed: "Failed",
      noResultsTitle: "Nothing found",
      noResultsBody: "Try adjusting your search or filters.",
      readmeHub: "Home",
      markdown: "Markdown",
      sectionsWord: "sections",
      buildLabel: "Updated",
      sourceLabel: "Source",
      noToc: "No headings in this document.",
      groups: {
        all: "All",
        fundamentals: "Fundamentals",
        cli: "CLI Reference",
        integration: "Integration",
        practice: "Practice",
        examples: "Examples",
        docs: "Documents",
      }
    },
    ru: {
      brandEyebrow: "База документации",
      brandName: "Codex CLI Wiki",
      pageEyebrow: "Документация",
      searchLabel: "Поиск",
      searchPlaceholder: "Поиск по документации...",
      tocEyebrow: "На странице",
      mobileToggle: "Разделы",
      homeButton: "Главная",
      copyLink: "Копировать",
      copied: "Скопировано!",
      copyFailed: "Ошибка",
      noResultsTitle: "Ничего не найдено",
      noResultsBody: "Попробуйте изменить запрос или фильтры.",
      readmeHub: "Главная",
      markdown: "Markdown",
      sectionsWord: "разделов",
      buildLabel: "Обновлено",
      sourceLabel: "Источник",
      noToc: "В этом документе нет заголовков.",
      groups: {
        all: "Все",
        fundamentals: "Основы",
        cli: "CLI",
        integration: "Интеграция",
        practice: "Практика",
        examples: "Примеры",
        docs: "Документы",
      }
    },
    kk: {
      brandEyebrow: "Құжаттама орталығы",
      brandName: "Codex CLI Wiki",
      pageEyebrow: "Құжаттама",
      searchLabel: "Іздеу",
      searchPlaceholder: "Құжаттамадан іздеу...",
      tocEyebrow: "Бетте",
      mobileToggle: "Бөлімдер",
      homeButton: "Басты",
      copyLink: "Сілтеме көшіру",
      copied: "Көшірілді!",
      copyFailed: "Қате",
      noResultsTitle: "Ештеңе табылмады",
      noResultsBody: "Іздеу немесе сүзгілерді өзгертіңіз.",
      readmeHub: "Басты",
      markdown: "Markdown",
      sectionsWord: "бөлім",
      buildLabel: "Жаңартылды",
      sourceLabel: "Дереккөз",
      noToc: "Бұл құжатта тақырыптар жоқ.",
      groups: {
        all: "Барлығы",
        fundamentals: "Негіздер",
        cli: "CLI",
        integration: "Интеграция",
        practice: "Тәжірибе",
        examples: "Мысалдар",
        docs: "Құжаттар",
      }
    },
    zh: {
      brandEyebrow: "文档中心",
      brandName: "Codex CLI Wiki",
      pageEyebrow: "文档",
      searchLabel: "搜索",
      searchPlaceholder: "搜索文档...",
      tocEyebrow: "页面导航",
      mobileToggle: "章节",
      homeButton: "首页",
      copyLink: "复制链接",
      copied: "已复制！",
      copyFailed: "失败",
      noResultsTitle: "未找到结果",
      noResultsBody: "请尝试调整搜索条件或筛选器。",
      readmeHub: "首页",
      markdown: "Markdown",
      sectionsWord: "章节",
      buildLabel: "更新于",
      sourceLabel: "来源",
      noToc: "本文档没有目录。",
      groups: {
        all: "全部",
        fundamentals: "基础",
        cli: "CLI 参考",
        integration: "集成",
        practice: "实践",
        examples: "示例",
        docs: "文档",
      }
    },
    es: {
      brandEyebrow: "Centro de documentación",
      brandName: "Codex CLI Wiki",
      pageEyebrow: "Documentación",
      searchLabel: "Buscar",
      searchPlaceholder: "Buscar en la documentación...",
      tocEyebrow: "En esta página",
      mobileToggle: "Secciones",
      homeButton: "Inicio",
      copyLink: "Copiar enlace",
      copied: "¡Copiado!",
      copyFailed: "Error",
      noResultsTitle: "Sin resultados",
      noResultsBody: "Intenta ajustar tu búsqueda o filtros.",
      readmeHub: "Inicio",
      markdown: "Markdown",
      sectionsWord: "secciones",
      buildLabel: "Actualizado",
      sourceLabel: "Fuente",
      noToc: "Este documento no tiene encabezados.",
      groups: {
        all: "Todo",
        fundamentals: "Fundamentos",
        cli: "Referencia CLI",
        integration: "Integración",
        practice: "Práctica",
        examples: "Ejemplos",
        docs: "Documentos",
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
    if (browser.startsWith("ru")) return "ru";
    if (browser.startsWith("kk") || browser.startsWith("kz")) return "kk";
    if (browser.startsWith("zh")) return "zh";
    if (browser.startsWith("es")) return "es";
    return "en";
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
    mobileToggleText: document.getElementById("mobileToggleText"),
    langSwitch: document.getElementById("langSwitch"),
    brandEyebrow: document.getElementById("brandEyebrow"),
    brandName: document.getElementById("brandName"),
    pageEyebrow: document.getElementById("pageEyebrow"),
    searchLabel: document.getElementById("searchLabel"),
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
    if (!slug || !docsBySlug.has(slug)) {
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

  function mirrorSlug(currentLocale, targetLocale, slug) {
    // Try to find equivalent document in target locale
    let base = slug;
    if (currentLocale === "en") {
      base = slug.startsWith("en/") ? slug.slice(3) : slug;
    } else if (targetLocale === "en") {
      base = slug.startsWith("en/") ? slug.slice(3) : slug;
    }
    
    const candidate = targetLocale === "en" ? "en/" + base : base;
    if (docsBySlug.has(candidate)) {
      return candidate;
    }
    
    // Fallback to home page of target locale
    return homeSlugFor(targetLocale);
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
    const languages = [
      { code: "en", label: "EN" },
      { code: "ru", label: "RU" },
      { code: "kk", label: "KK" },
      { code: "zh", label: "ZH" },
      { code: "es", label: "ES" },
    ];
    
    languages.forEach((lang) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "lang-btn" + (state.locale === lang.code ? " active" : "");
      button.textContent = lang.label;
      button.setAttribute("aria-pressed", state.locale === lang.code);
      button.setAttribute("title", UI[lang.code]?.brandEyebrow || lang.code);
      button.addEventListener("click", function () {
        if (lang.code === state.locale) return;
        const nextSlug = mirrorSlug(state.locale, lang.code, state.slug || homeSlugFor(state.locale));
        setRoute(nextSlug, "", lang.code);
      });
      elements.langSwitch.appendChild(button);
    });
  }

  function renderFilters() {
    elements.filters.innerHTML = "";
    (data.groups || []).forEach((groupKey) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "filter-btn" + (state.group === groupKey ? " active" : "");
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
        link.setAttribute("data-slug", doc.slug);
        link.innerHTML =
          '<span class="nav-link-title">' + escapeHtml(doc.title) + '</span>' +
          '<span class="nav-link-meta">' + escapeHtml(doc.sourcePath) + '</span>';
        link.addEventListener("click", function (event) {
          event.preventDefault();
          setRoute(doc.slug, "", doc.locale);
          if (window.innerWidth < 900) {
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
      if (index !== -1) break;
    }
    if (index === -1) return text.slice(0, 150);
    const start = Math.max(0, index - 50);
    const end = Math.min(text.length, index + 110);
    return (start > 0 ? "…" : "") + text.slice(start, end).trim() + (end < text.length ? "…" : "");
  }

  function searchDocs(query) {
    const normalized = normalizeText(query);
    if (!normalized) return [];

    const tokens = normalized.split(/\s+/).filter(Boolean);
    const results = [];

    currentDocs().forEach((doc) => {
      if (state.group !== "all" && doc.groupKey !== state.group) return;

      let bestScore = 0;
      let bestSection = null;

      (doc.sections || []).forEach((section) => {
        const title = normalizeText(section.title);
        const text = normalizeText(section.text);
        let score = 0;

        tokens.forEach((token) => {
          if (normalizeText(doc.title).includes(token)) score += 22;
          if (normalizeText(translateGroup(doc.groupKey)).includes(token)) score += 14;
          if (title.includes(token)) score += 10;
          if (text.includes(token)) score += 4;
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

    return results.sort((a, b) => b.score - a.score).slice(0, 20);
  }

  function renderSearch() {
    const results = searchDocs(state.query);
    elements.searchResults.innerHTML = "";
    
    if (!state.query.trim()) {
      elements.searchResults.classList.add("hidden");
      return;
    }

    elements.searchResults.classList.remove("hidden");

    if (!results.length) {
      const empty = document.createElement("div");
      empty.className = "search-empty";
      empty.innerHTML = '<span class="search-empty-icon">⊘</span>' +
        '<span class="search-empty-title">' + escapeHtml(ui().noResultsTitle) + '</span>' +
        '<span class="search-empty-text">' + escapeHtml(ui().noResultsBody) + '</span>';
      elements.searchResults.appendChild(empty);
      return;
    }

    results.forEach((result) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "search-result";
      button.innerHTML =
        '<span class="search-result-title">' + escapeHtml(result.doc.title) + '</span>' +
        '<span class="search-result-section">' + escapeHtml(result.section?.title || translateGroup(result.doc.groupKey)) + '</span>' +
        '<span class="search-result-snippet">' + escapeHtml(result.snippet) + '</span>';
      button.addEventListener("click", function () {
        state.query = "";
        elements.searchInput.value = "";
        renderSearch();
        setRoute(result.doc.slug, result.section?.id, result.doc.locale);
      });
      elements.searchResults.appendChild(button);
    });
  }

  function renderDocHeader(doc) {
    elements.docCard.classList.toggle("is-home", !!doc.isReadme);
    elements.breadcrumb.textContent = doc.sourcePath;

    const headingsCount = (doc.headings || []).filter((item) => item.level >= 2).length;
    elements.docHeader.innerHTML =
      '<div class="doc-meta">' +
        '<span class="doc-tag doc-tag--primary">' + escapeHtml(translateGroup(doc.groupKey)) + '</span>' +
        '<span class="doc-tag">' + escapeHtml(doc.isReadme ? ui().readmeHub : ui().markdown) + '</span>' +
        '<span class="doc-tag doc-tag--muted">' + headingsCount + ' ' + escapeHtml(ui().sectionsWord) + '</span>' +
      '</div>' +
      '<h1 class="doc-title">' + escapeHtml(doc.title) + '</h1>' +
      '<p class="doc-excerpt">' + escapeHtml(doc.excerpt || "") + '</p>' +
      '<div class="doc-footer">' +
        '<span class="doc-source">' + escapeHtml(ui().sourceLabel) + ': <code>' + escapeHtml(doc.sourcePath) + '</code></span>' +
        '<a href="https://github.com/milord-x/Codex-CLI-Wiki" target="_blank" rel="noreferrer" class="doc-github">GitHub ↗</a>' +
      '</div>';
  }

  function renderDocContent(doc) {
    elements.docContent.innerHTML = doc.html;
    
    elements.docContent.querySelectorAll('a').forEach(link => {
      if (link.href && !link.href.startsWith('#') && !link.href.startsWith(window.location.origin)) {
        link.target = '_blank';
        link.rel = 'noreferrer noopener';
      }
    });
    
    // Remove HTML badges and images from README/markdown files
    elements.docContent.querySelectorAll('p, div, h1, h2').forEach(el => {
      const html = el.innerHTML || '';
      if (el.tagName === 'P' && el.querySelector('code, strong, em, a:not(img)')) return;
      if (el.tagName === 'H1' && el.textContent.length > 10) return;
      if (el.tagName === 'H2' && el.textContent.length > 10) return;
      
      if (html.includes('shields.io') || html.includes('img.shields')) {
        el.remove();
        return;
      }
      
      if (el.tagName === 'P' && el.querySelector('img') && el.querySelectorAll('img, a').length <= 2) {
        const imgs = el.querySelectorAll('img');
        const isOnlyImages = Array.from(imgs).every(img => 
          img.src.includes('.png') || img.src.includes('.jpg') || img.src.includes('.gif')
        );
        if (isOnlyImages) {
          el.remove();
        }
      }
    });
    
    const firstH1 = elements.docContent.querySelector('h1');
    if (firstH1 && (firstH1.innerHTML.includes('img') || firstH1.textContent.includes('Badge'))) {
      firstH1.remove();
    }
  }

  function renderToc(doc) {
    const headings = (doc.headings || []).filter((item) => item.level <= 4);
    elements.tocList.innerHTML = "";

    if (!headings.length) {
      elements.tocList.innerHTML = '<div class="toc-empty">' + escapeHtml(ui().noToc) + '</div>';
    } else {
      headings.forEach((heading) => {
        const link = document.createElement("a");
        link.href = encodeHash(doc.slug, heading.id, doc.locale);
        link.className = "toc-link toc-link--" + Math.min(Math.max(heading.level, 1), 4) +
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
    elements.tocMeta.innerHTML = '<span class="toc-date">' + escapeHtml(ui().buildLabel) + ': <time>' + escapeHtml(updatedDate) + '</time></span>';
  }

  function focusSection(sectionId) {
    if (!sectionId) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    requestAnimationFrame(function () {
      const target = document.getElementById(sectionId);
      if (!target) return;
      target.classList.remove("highlight");
      void target.offsetWidth;
      target.classList.add("highlight");
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(function () { target.classList.remove("highlight"); }, 1200);
    });
  }

  function applyLocaleUi() {
    document.documentElement.lang = state.locale;
    elements.brandEyebrow.textContent = ui().brandEyebrow;
    elements.brandName.textContent = ui().brandName;
    elements.pageEyebrow.textContent = ui().pageEyebrow;
    elements.searchLabel.textContent = ui().searchLabel;
    elements.searchInput.placeholder = ui().searchPlaceholder;
    elements.tocEyebrow.textContent = ui().tocEyebrow;
    elements.mobileToggleText.textContent = ui().mobileToggle;
    elements.homeButton.textContent = ui().homeButton;
    elements.copyLinkButton.textContent = ui().copyLink;
  }

  function render() {
    applyLocaleUi();
    renderLanguageSwitch();
    const doc = docsBySlug.get(state.slug) || docsBySlug.get(homeSlugFor(state.locale));
    if (!doc) return;
    
    state.locale = doc.locale;
    window.localStorage.setItem("codexWikiLocale", state.locale);
    document.title = "Codex CLI Wiki";
    
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
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function handleHashChange() {
    const route = decodeHash();
    state.locale = route.locale;
    state.slug = route.slug;
    state.section = route.section;
    render();
  }

  elements.searchInput.addEventListener("input", function (e) {
    state.query = e.target.value;
    renderSearch();
  });

  elements.copyLinkButton.addEventListener("click", function () {
    navigator.clipboard.writeText(window.location.href)
      .then(function () {
        elements.copyLinkButton.textContent = ui().copied;
        setTimeout(function () { elements.copyLinkButton.textContent = ui().copyLink; }, 1200);
      })
      .catch(function () {
        elements.copyLinkButton.textContent = ui().copyFailed;
        setTimeout(function () { elements.copyLinkButton.textContent = ui().copyLink; }, 1200);
      });
  });

  elements.homeButton.addEventListener("click", function () {
    setRoute(homeSlugFor(state.locale), "", state.locale);
  });

  elements.mobileToggle.addEventListener("click", function () {
    elements.sidebar.classList.toggle("open");
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "/" && document.activeElement !== elements.searchInput) {
      e.preventDefault();
      elements.searchInput.focus();
      elements.searchInput.select();
    }
    if (e.key === "Escape" && elements.sidebar.classList.contains("open")) {
      elements.sidebar.classList.remove("open");
    }
  });

  window.addEventListener("hashchange", handleHashChange);
  handleHashChange();
})();
