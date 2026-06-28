const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector("#siteNav");
const sectionLinks = [...document.querySelectorAll("[data-scroll-target]")];
const backTopButton = document.querySelector(".back-top");
const sectionTargetStoreKey = "epicChaosScrollTarget";

if (window.location.pathname.endsWith("/Kill-Team/index.html")) {
  window.history.replaceState(null, "", "/Kill-Team/");
}

sectionLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = link.dataset.scrollTarget;
    if (!target) {
      return;
    }

    event.preventDefault();
    window.sessionStorage.setItem(sectionTargetStoreKey, target);
    window.location.href = "/";
  });
});

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  siteNav.addEventListener("click", (event) => {
    if (event.target.matches("a")) {
      siteNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

if (backTopButton) {
  backTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    window.history.replaceState(null, "", window.location.pathname);
  });
}

if (window.lucide) {
  window.lucide.createIcons();
}
