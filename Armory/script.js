const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector("#siteNav");
const sectionLinks = [...document.querySelectorAll("[data-scroll-target]")];
const backTopButton = document.querySelector(".back-top");
const killCards = [...document.querySelectorAll(".kill-card")];
const killModal = document.querySelector("#killModal");
const modalYoutube = document.querySelector("#modalYoutube");
const modalTitle = document.querySelector("#modalKillTitle");
const modalClose = document.querySelector(".modal-close");
const sectionTargetStoreKey = "epicChaosScrollTarget";
let muteInterval = null;

if (window.location.pathname.endsWith("/Armory/index.html")) {
  window.history.replaceState(null, "", "/Armory/");
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

function youtubeEmbedUrl(videoId) {
  const params = new URLSearchParams({
    autoplay: "1",
    mute: "1",
    enablejsapi: "1",
    controls: "1",
    fs: "1",
    rel: "0",
    modestbranding: "1",
    playsinline: "1"
  });

  return `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`;
}

function muteYoutubePlayer() {
  if (!modalYoutube?.contentWindow) {
    return;
  }

  modalYoutube.contentWindow.postMessage(
    JSON.stringify({
      event: "command",
      func: "mute",
      args: []
    }),
    "*"
  );
}

function startMuteLock() {
  clearInterval(muteInterval);
  muteYoutubePlayer();
  muteInterval = window.setInterval(muteYoutubePlayer, 900);
}

function stopMuteLock() {
  clearInterval(muteInterval);
  muteInterval = null;
}

function openKillVideo(card) {
  if (!killModal || !modalYoutube || !modalTitle) {
    return;
  }

  const videoId = card.dataset.youtube;
  const title = card.dataset.title || "Kill Video";

  if (!videoId) {
    return;
  }

  modalTitle.textContent = title;
  modalYoutube.title = `${title} kill video`;
  modalYoutube.src = youtubeEmbedUrl(videoId);
  modalYoutube.addEventListener("load", muteYoutubePlayer, { once: true });
  startMuteLock();

  if (typeof killModal.showModal === "function") {
    killModal.showModal();
  } else {
    killModal.setAttribute("open", "");
  }
}

function closeKillVideo() {
  if (!killModal || !modalYoutube) {
    return;
  }

  modalYoutube.src = "about:blank";
  stopMuteLock();

  if (killModal.open && typeof killModal.close === "function") {
    killModal.close();
  } else {
    killModal.removeAttribute("open");
  }
}

killCards.forEach((card) => {
  card.tabIndex = 0;
  card.setAttribute("role", "button");
  card.setAttribute("aria-label", `Open ${card.dataset.title || "kill"} video`);

  card.addEventListener("click", () => openKillVideo(card));
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openKillVideo(card);
    }
  });
});

modalClose?.addEventListener("click", closeKillVideo);

killModal?.addEventListener("cancel", (event) => {
  event.preventDefault();
  closeKillVideo();
});

killModal?.addEventListener("click", (event) => {
  if (event.target === killModal) {
    closeKillVideo();
  }
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
