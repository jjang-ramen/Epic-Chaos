let reports = [
  { title: "6/13/26", owner: "Ceriwyn", date: "June 14, 2026", duration: "3 hours", url: "https://www.warcraftlogs.com/reports/d9JNnxW6C2Av8DBF" },
  { title: "6/12/26", owner: "Ceriwyn", date: "June 13, 2026", duration: "3 hours", url: "https://www.warcraftlogs.com/reports/A2JxVbDXBn9RzfP4" },
  { title: "6/12/26", owner: "Ceriwyn", date: "June 13, 2026", duration: "a few seconds", url: "https://www.warcraftlogs.com/reports/6NVjQ1tAxbJmPaRw" },
  { title: "6/10", owner: "Skaidi", date: "June 11, 2026", duration: "2 hours", url: "https://www.warcraftlogs.com/reports/Qr6RN9FzD4JmgpVd" },
  { title: "Unknown Zone", owner: "Jessicamayberry33", date: "June 7, 2026", duration: "a few seconds", url: "https://www.warcraftlogs.com/reports/4CAQry37GLp9BMD1" },
  { title: "6/6/26", owner: "Ceriwyn", date: "June 7, 2026", duration: "3 hours", url: "https://www.warcraftlogs.com/reports/amjdCz2Lcg4AwJ7N" }
];

const warcraftLogsReportsUrl = "https://www.warcraftlogs.com/guild/reports-list/709946";
const warcraftLogsReaderUrl = `https://r.jina.ai/http://r.jina.ai/http://${warcraftLogsReportsUrl}`;
const reportsFeedUrls = window.EPIC_CHAOS_REPORTS_ENDPOINT
  ? [window.EPIC_CHAOS_REPORTS_ENDPOINT, warcraftLogsReaderUrl, "../reports.json"]
  : [warcraftLogsReaderUrl, "../reports.json"];
const reportsRefreshMs = 5 * 60 * 1000;
const reportsList = document.querySelector("#reportsList");
const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector("#siteNav");
const sectionLinks = [...document.querySelectorAll("[data-scroll-target]")];
const backTopButton = document.querySelector(".back-top");
const sectionTargetStoreKey = "epicChaosScrollTarget";

if (window.location.pathname.endsWith("/Logs/index.html")) {
  window.history.replaceState(null, "", "/Logs/");
}

const escapeHtml = (value) =>
  String(value).replace(/[&<>"']/g, (char) => (
    { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[char]
  ));

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

function renderReports() {
  if (!reportsList) {
    return;
  }

  reportsList.innerHTML = reports.map((report) => `
    <a class="report-row" href="${report.url}">
      <strong>${escapeHtml(report.title)}</strong>
      <span>${escapeHtml(getReportMeta(report))}</span>
      <small>${escapeHtml(report.duration || "Open log")}</small>
    </a>
  `).join("");
}

function getReportMeta(report) {
  const details = [report.owner && `Logged by ${report.owner}`, report.date].filter(Boolean);
  return details.join(" / ") || "Warcraft Logs";
}

function normalizeReport(report) {
  return {
    title: cleanReportCell(report.title || report.name || report.label || "Warcraft Logs report"),
    owner: cleanReportCell(report.owner || report.uploader || report.userName || "Warcraft Logs"),
    date: cleanReportDate(report.date || report.start || report.startDate || ""),
    duration: cleanReportCell(report.duration || ""),
    url: report.url || (report.code ? `https://www.warcraftlogs.com/reports/${report.code}` : warcraftLogsReportsUrl)
  };
}

function decodeMarkdownText(value) {
  return String(value || "")
    .replace(/\\\|/g, "|")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .trim();
}

function cleanReportCell(value) {
  return decodeMarkdownText(value)
    .replace(/^\d+\$/, "")
    .replace(/\s+/g, " ")
    .trim();
}

function cleanReportDate(value) {
  return cleanReportCell(value).replace(/\s+\d{1,2}:\d{2}\s+[AP]M$/i, "");
}

function parseWarcraftLogsReports(markdown) {
  const reportRows = [];
  const rowPattern = /\|\s*\[([^\]]+)\]\((https:\/\/www\.warcraftlogs\.com\/reports\/[A-Za-z0-9]+)\)\s*\|\s*([^|]+)\|\s*([^|]*)\|\s*([^|]+)\|\s*([^|]+)\|\s*([^|]+)\|/g;
  let match = rowPattern.exec(markdown);

  while (match) {
    const [, title, url, owner, , date, duration, visibility] = match;
    if (cleanReportCell(visibility).toLowerCase() === "public") {
      reportRows.push(normalizeReport({
        title,
        owner,
        date,
        duration,
        url
      }));
    }

    match = rowPattern.exec(markdown);
  }

  return reportRows;
}

function parseReportsPayload(rawText) {
  const text = rawText.trim();
  if (!text) {
    return [];
  }

  if (text.startsWith("{") || text.startsWith("[")) {
    const payload = JSON.parse(text);
    const nextReports = Array.isArray(payload) ? payload : payload.reports;
    return Array.isArray(nextReports) ? nextReports.map(normalizeReport) : [];
  }

  return parseWarcraftLogsReports(text);
}

async function refreshReportsFromFeed() {
  if (!reportsList || !reportsFeedUrls.length) {
    return;
  }

  const reportsPanel = reportsList.closest(".reports-panel");
  reportsPanel?.classList.add("is-updating");

  try {
    for (const feedUrl of reportsFeedUrls) {
      try {
        const response = await fetch(feedUrl, { cache: "no-store" });
        if (!response.ok) {
          throw new Error(`Reports feed returned ${response.status}`);
        }

        const nextReports = parseReportsPayload(await response.text());
        if (nextReports.length) {
          reports = nextReports.slice(0, 6);
          renderReports();
          return;
        }
      } catch {
        // Try the next source, then keep baked-in reports if every feed is unavailable.
      }
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

if (backTopButton) {
  backTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    window.history.replaceState(null, "", window.location.pathname);
  });
}

renderReports();
refreshReportsFromFeed();
window.setInterval(refreshReportsFromFeed, reportsRefreshMs);

if (window.lucide) {
  window.lucide.createIcons();
}
