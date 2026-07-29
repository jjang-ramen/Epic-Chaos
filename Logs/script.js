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
    <article class="report-card">
      <div class="report-card-main">
        <a class="report-title" href="${escapeHtml(report.url)}">${escapeHtml(report.title)}</a>
        <span>${escapeHtml(getReportMeta(report))}</span>
      </div>
      <small>${escapeHtml(report.duration || "Open log")}</small>
      <div class="report-actions" aria-label="Report tools">
        <a class="report-action primary" href="${escapeHtml(report.url)}">
          <i data-lucide="bar-chart-3"></i>
          Log
        </a>
        ${renderReportToolLink(report, "Wipefest", "activity", getWipefestUrl)}
        ${renderReportToolLink(report, "Analyzer", "search-check", getWowAnalyzerUrl)}
        <button class="report-action" type="button" data-report-copy="${escapeHtml(report.url)}">
          <i data-lucide="copy"></i>
          Copy
        </button>
      </div>
    </article>
  `).join("");

  createLucideIcons();
}

function getReportMeta(report) {
  const details = [report.owner && `Logged by ${report.owner}`, report.date].filter(Boolean);
  return details.join(" / ") || "Warcraft Logs";
}

function getReportCode(report) {
  const match = String(report.url || "").match(/warcraftlogs\.com\/reports\/([A-Za-z0-9]+)/i);
  return match ? match[1] : "";
}

function getWipefestUrl(report) {
  const code = getReportCode(report);
  return code ? `https://www.wipefest.gg/report/${code}?gameVersion=warcraft-live` : "";
}

function getWowAnalyzerUrl(report) {
  const code = getReportCode(report);
  return code ? `https://wowanalyzer.com/report/${code}` : "";
}

function renderReportToolLink(report, label, icon, buildUrl) {
  const url = buildUrl(report);
  if (!url) {
    return "";
  }

  return `
    <a class="report-action" href="${escapeHtml(url)}">
      <i data-lucide="${icon}"></i>
      ${label}
    </a>
  `;
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

if (reportsList) {
  reportsList.addEventListener("click", async (event) => {
    const copyButton = event.target.closest("[data-report-copy]");
    if (!copyButton) {
      return;
    }

    const reportUrl = copyButton.dataset.reportCopy;
    if (!reportUrl) {
      return;
    }

    try {
      await navigator.clipboard.writeText(reportUrl);
      setCopyButtonState(copyButton, "Copied");
    } catch {
      const fallback = document.createElement("textarea");
      fallback.value = reportUrl;
      fallback.setAttribute("readonly", "");
      fallback.style.position = "fixed";
      fallback.style.opacity = "0";
      document.body.appendChild(fallback);
      fallback.select();
      document.execCommand("copy");
      fallback.remove();
      setCopyButtonState(copyButton, "Copied");
    }
  });
}

function setCopyButtonState(button, label) {
  const original = button.dataset.originalLabel || button.textContent.trim();
  button.dataset.originalLabel = original;
  button.classList.add("is-copied");
  button.innerHTML = `<i data-lucide="check"></i>${label}`;
  createLucideIcons();

  window.setTimeout(() => {
    button.classList.remove("is-copied");
    button.innerHTML = `<i data-lucide="copy"></i>${escapeHtml(original)}`;
    createLucideIcons();
  }, 1600);
}

function createLucideIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

renderReports();
refreshReportsFromFeed();
window.setInterval(refreshReportsFromFeed, reportsRefreshMs);

createLucideIcons();
