let reports = [
  { title: "Heroic", owner: "Skaidi", url: "https://www.warcraftlogs.com/reports/QMnCzTFt3GvLxYRa" },
  { title: "May 30, 2026", owner: "Ceriwyn", url: "https://www.warcraftlogs.com/reports/NM3wxZPCmbL72yfY" },
  { title: "May 29, 2026", owner: "Ceriwyn", url: "https://www.warcraftlogs.com/reports/2jpDn36qGAxkcHLR" },
  { title: "May 27, 2026", owner: "Ceriwyn", url: "https://www.warcraftlogs.com/reports/hgjTDQJwZAR1qzBX" },
  { title: "May 27, 2026", owner: "Skaidi", url: "https://www.warcraftlogs.com/reports/f8XNhpA2bvWZqyDL" },
  { title: "May 23, 2026", owner: "Ceriwyn", url: "https://www.warcraftlogs.com/reports/FQmJdk4WMwTY8nv7" }
];

const reportsFeedUrl = window.EPIC_CHAOS_REPORTS_ENDPOINT || "../reports.json";
const reportsRefreshMs = 5 * 60 * 1000;
const reportsList = document.querySelector("#reportsList");
const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector("#siteNav");

const escapeHtml = (value) =>
  String(value).replace(/[&<>"']/g, (char) => (
    { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[char]
  ));

function renderReports() {
  if (!reportsList) {
    return;
  }

  reportsList.innerHTML = reports.map((report) => `
    <a class="report-row" href="${report.url}">
      <strong>${escapeHtml(report.title)}</strong>
      <span>Logged by ${escapeHtml(report.owner)}</span>
      <small>Open log</small>
    </a>
  `).join("");
}

function normalizeReport(report) {
  return {
    title: report.title || report.name || report.label || "Warcraft Logs report",
    owner: report.owner || report.uploader || report.userName || "Warcraft Logs",
    url: report.url || (report.code ? `https://www.warcraftlogs.com/reports/${report.code}` : "https://www.warcraftlogs.com/guild/reports-list/709946")
  };
}

async function refreshReportsFromFeed() {
  if (!reportsList || !reportsFeedUrl) {
    return;
  }

  const reportsPanel = reportsList.closest(".reports-panel");
  reportsPanel?.classList.add("is-updating");

  try {
    const response = await fetch(reportsFeedUrl, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Reports feed returned ${response.status}`);
    }

    const payload = await response.json();
    const nextReports = Array.isArray(payload) ? payload : payload.reports;
    if (Array.isArray(nextReports) && nextReports.length) {
      reports = nextReports.map(normalizeReport).slice(0, 6);
      renderReports();
    }
  } catch {
    // Keep the baked-in reports if the live feed is unavailable.
  } finally {
    reportsPanel?.classList.remove("is-updating");
  }
}

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

renderReports();
refreshReportsFromFeed();
window.setInterval(refreshReportsFromFeed, reportsRefreshMs);

if (window.lucide) {
  window.lucide.createIcons();
}
