const pageTitles = new Map([
  ["home", "Home"],
  ["story", "Our Story"],
  ["products", "Products"],
  ["thisweek", "This week"]
]);

const content = document.querySelector("#page-content");
const navLinks = document.querySelectorAll(".site-nav a");

function renderPage(moveFocus = false) {
  const requestedPage = location.hash.slice(1);
  const page = pageTitles.has(requestedPage)
    ? requestedPage
    : "home";

  const template = document.querySelector(`#page-${page}`);

  content.replaceChildren(template.content.cloneNode(true));

  document.title = `${pageTitles.get(page)} | SCAAL Coffee`;

  navLinks.forEach(link => {
    if (link.getAttribute("href") === `#${page}`) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });

  if (moveFocus) {
    document.querySelector("#page-title").focus({
      preventScroll: true
    });
    window.scrollTo({ top: 0, behavior: "auto" });
  }
}

window.addEventListener("hashchange", () => renderPage(true));

renderPage();