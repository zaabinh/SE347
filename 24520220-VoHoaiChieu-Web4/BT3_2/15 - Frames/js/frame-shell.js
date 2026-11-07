const sideMenu = document.querySelector("#side-menu");
const menuToggle = document.querySelector(".menu-toggle");
const pageLinks = document.querySelectorAll('a[target="exercise-frame"]');
const exerciseFrame = document.querySelector('iframe[name="exercise-frame"]');

function fitFrameContent() {
  const frameDocument = exerciseFrame.contentDocument;
  if (!frameDocument || frameDocument.readyState !== "complete") return;

  const frameRoot = frameDocument.documentElement;
  if (window.matchMedia("(max-width: 760px)").matches) {
    frameRoot.style.zoom = "";
    return;
  }

  frameRoot.style.zoom = "1";
  const frameBody = frameDocument.body;
  const contentWidth = Math.max(frameRoot.scrollWidth, frameBody.scrollWidth);
  const contentHeight = Math.max(frameRoot.scrollHeight, frameBody.scrollHeight);
  const scale = Math.min(
    1,
    exerciseFrame.clientWidth / contentWidth,
    exerciseFrame.clientHeight / contentHeight
  ) * 0.98;

  frameRoot.style.zoom = String(scale);
}

exerciseFrame.addEventListener("load", fitFrameContent);
window.addEventListener("resize", fitFrameContent);
if (exerciseFrame.contentDocument.readyState === "complete") {
  fitFrameContent();
}

function closeMenu() {
  sideMenu.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Mở mục lục");
}

menuToggle.addEventListener("click", () => {
  const open = sideMenu.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Đóng mục lục" : "Mở mục lục");
});

pageLinks.forEach((link) => {
  link.addEventListener("click", () => {
    document.querySelectorAll(".side-menu a").forEach((sideLink) => {
      const active = sideLink.href === link.href;
      sideLink.classList.toggle("active", active);
      if (active) sideLink.setAttribute("aria-current", "page");
      else sideLink.removeAttribute("aria-current");
    });
    document.querySelectorAll(".top-link").forEach((topLink) => {
      topLink.classList.toggle("current", topLink.href === link.href);
    });
    document.querySelectorAll(".nav-group").forEach((group) => {
      group.open = false;
    });
    closeMenu();
  });
});
