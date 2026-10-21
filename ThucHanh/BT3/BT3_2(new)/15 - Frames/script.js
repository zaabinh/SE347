(() => {
    // defer ensures the HTML exists; this function keeps variables out of global scope.
    const pageFrame = document.getElementById("page-frame");
    const homeContent = document.getElementById("home-content");
    const homeLink = document.querySelector("[data-home]");
    const topNav = document.querySelector(".top-nav");
    const menuToggle = document.querySelector(".menu-toggle");
    const dropdowns = [...topNav.querySelectorAll("details")];
    const navLinks = [...document.querySelectorAll("a[data-page]"), homeLink];
    const homeTitle = document.title;
    let frameUrl = "about:blank";

    // Read each page once from the top menu; both menus share the same data-page IDs.
    const pages = new Map([...topNav.querySelectorAll("a[data-page]")].map(link => [link.dataset.page, {
        title: link.textContent.trim(),
        url: new URL(link.getAttribute("href"), document.baseURI).href
    }]));

    function setMenuOpen(open) {
        topNav.classList.toggle("menu-open", open);
        menuToggle.setAttribute("aria-expanded", String(open));
        menuToggle.setAttribute("aria-label", open ? "Đóng mục lục" : "Mở mục lục");
    }

    function closeMenus() {
        dropdowns.forEach(group => { group.open = false; });
        setMenuOpen(false);
    }

    function renderPage(pageId, updateHistory = true) {
        // Unknown IDs fall back to Giới thiệu. The iframe isolates each exercise's CSS/JS.
        const page = pages.get(pageId);
        const target = page?.url || "about:blank";
        document.title = page ? `Bài tập - ${page.title}` : homeTitle;
        homeContent.hidden = !!page;
        pageFrame.hidden = !page;
        pageFrame.title = page?.title || "Nội dung bài tập";
        if (frameUrl !== target) {
            // replace prevents iframe loads from adding extra Back/Forward entries.
            pageFrame.contentWindow.location.replace(target);
            frameUrl = target;
        }

        // Keep visual highlights and screen-reader state consistent in both menus.
        navLinks.forEach(link => {
            const active = page ? link.dataset.page === pageId : link === homeLink;
            link.classList.toggle("active", active);
            if (active) link.setAttribute("aria-current", "page");
            else link.removeAttribute("aria-current");
        });
        dropdowns.forEach(group => group.classList.toggle("active-group", !!group.querySelector("a.active")));
        closeMenus();

        if (updateHistory) {
            // Preserve other URL parameters, and skip duplicate history entries.
            const url = new URL(location.href);
            if (page) url.searchParams.set("page", pageId);
            else url.searchParams.delete("page");
            if (url.href !== location.href) history.pushState(null, "", url);
        }
    }

    function renderFromUrl() {
        // Initial load and Back/Forward already have a URL; do not push another entry.
        renderPage(new URLSearchParams(location.search).get("page"), false);
    }

    // One listener handles both menus. Modified clicks retain native browser behavior.
    document.addEventListener("click", event => {
        const link = event.target.closest("a[data-page], a[data-home]");
        if (link && event.button === 0 && !event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey) {
            event.preventDefault();
            renderPage(link.dataset.page);
        } else if (!topNav.contains(event.target)) closeMenus();
    });
    menuToggle.addEventListener("click", () => {
        if (topNav.classList.contains("menu-open")) closeMenus();
        else setMenuOpen(true);
    });
    dropdowns.forEach(group => {
        // Allow one open category at a time.
        group.addEventListener("toggle", () => {
            if (group.open) dropdowns.forEach(other => { if (other !== group) other.open = false; });
        });
    });

    function handleEscape(event) {
        if (event.key !== "Escape") return;
        const openGroup = dropdowns.find(group => group.open);
        const mobileOpen = topNav.classList.contains("menu-open");
        closeMenus();
        // Return focus to the control that reopens the menu, including iframe events.
        if (mobileOpen) menuToggle.focus();
        else openGroup?.querySelector("summary").focus();
    }

    document.addEventListener("keydown", handleEscape);
    pageFrame.addEventListener("load", () => {
        // Iframe events do not bubble into the parent document.
        try {
            pageFrame.contentDocument?.addEventListener("click", closeMenus);
            pageFrame.contentDocument?.addEventListener("keydown", handleEscape);
        } catch { /* Local files can have separate origins; navigation still works. */ }
    });
    window.addEventListener("popstate", renderFromUrl);
    window.matchMedia("(max-width: 768px)").addEventListener("change", closeMenus);
    renderFromUrl();
})();
