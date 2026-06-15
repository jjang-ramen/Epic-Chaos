const roster = [
  { name: "Roseachi", role: "tank", className: "Monk", spec: "Brewmaster", realm: "Illidan", ilvl: 288 },
  { name: "Giaus", role: "tank", className: "Paladin", spec: "Protection", realm: "Thrall", ilvl: 290 },
  { name: "Fishguts", role: "healer", className: "Monk", spec: "Mistweaver", realm: "Ursin", ilvl: 288 },
  { name: "Solitairy", role: "healer", className: "Paladin", spec: "Holy", realm: "Illidan", ilvl: 289 },
  { name: "Nymueh", role: "healer", className: "Priest", spec: "Holy", realm: "Zul'jin", ilvl: 288 },
  { name: "Garlicnots", role: "healer", className: "Shaman", spec: "Restoration", realm: "Stormrage", ilvl: 288 },
  { name: "Yiffnoodle", role: "healer", className: "Shaman", spec: "Restoration", realm: "Emerald Dream", ilvl: 289 },
  { name: "Ceriwyn", role: "dps", className: "Death Knight", spec: "Unholy", realm: "Zul'jin", ilvl: 289 },
  { name: "S\u00edn\u00f3n", role: "dps", className: "Death Knight", spec: "Unholy", realm: "Tichondrius", ilvl: 289 },
  { name: "Manakar", role: "dps", className: "Demon Hunter", spec: "Devourer", realm: "Illidan", ilvl: 288 },
  { name: "Sianotic", role: "dps", className: "Demon Hunter", spec: "Devourer", realm: "Mal'Ganis", ilvl: 289 },
  { name: "Flashock", role: "dps", className: "Demon Hunter", spec: "Havoc", realm: "Stormrage", ilvl: 289 },
  { name: "Just\u00edn", role: "dps", className: "Druid", spec: "Balance", realm: "Sargeras", ilvl: 290 },
  { name: "Dragonboww", role: "dps", className: "Hunter", spec: "Beast Mastery", realm: "Zul'jin", ilvl: 289 },
  { name: "Serzul", role: "dps", className: "Hunter", spec: "Beast Mastery", realm: "Sen'jin", ilvl: 288 },
  { name: "Scarymonstr", role: "dps", className: "Mage", spec: "Frost", realm: "Thrall", ilvl: 288 },
  { name: "Yiffednoodle", role: "dps", className: "Mage", spec: "Frost", realm: "Emerald Dream", ilvl: 288 },
  { name: "Elliiria", role: "dps", className: "Paladin", spec: "Retribution", realm: "Illidan", ilvl: 290 },
  { name: "Islen\u00eb", role: "dps", className: "Rogue", spec: "Subtlety", realm: "Area 52", ilvl: 290 },
  { name: "M\u00f4rena", role: "dps", className: "Shaman", spec: "Elemental", realm: "Thunderlord", ilvl: 286 },
  { name: "Profien", role: "dps", className: "Warlock", spec: "Demonology", realm: "Illidan", ilvl: 290 },
  { name: "Ramenstrong", role: "dps", className: "Warrior", spec: "Fury", realm: "Area 52", ilvl: 289 }
];

let reports = [
  { title: "6/13/26", owner: "Ceriwyn", date: "June 14, 2026", duration: "3 hours", url: "https://www.warcraftlogs.com/reports/d9JNnxW6C2Av8DBF" },
  { title: "6/12/26", owner: "Ceriwyn", date: "June 13, 2026", duration: "3 hours", url: "https://www.warcraftlogs.com/reports/A2JxVbDXBn9RzfP4" },
  { title: "6/12/26", owner: "Ceriwyn", date: "June 13, 2026", duration: "a few seconds", url: "https://www.warcraftlogs.com/reports/6NVjQ1tAxbJmPaRw" },
  { title: "6/10", owner: "Skaidi", date: "June 11, 2026", duration: "2 hours", url: "https://www.warcraftlogs.com/reports/Qr6RN9FzD4JmgpVd" },
  { title: "Unknown Zone", owner: "Jessicamayberry33", date: "June 7, 2026", duration: "a few seconds", url: "https://www.warcraftlogs.com/reports/4CAQry37GLp9BMD1" },
  { title: "6/6/26", owner: "Ceriwyn", date: "June 7, 2026", duration: "3 hours", url: "https://www.warcraftlogs.com/reports/amjdCz2Lcg4AwJ7N" }
];

const reportsFeedUrl = window.EPIC_CHAOS_REPORTS_ENDPOINT || "reports.json";
const reportsRefreshMs = 5 * 60 * 1000;
const mythicRosterSheetUrl = "https://docs.google.com/spreadsheets/d/1-JUltdNITIDbBtviVhCxhUuo4glFY3qrgUVsQf5-2sw/gviz/tq";
const sheetCountRefreshMs = 5 * 60 * 1000;

const requirements = {
  rules: [
    {
      title: "Raid clock",
      items: [
        "Invites start 15 minutes early.",
        "Be at the raid entrance 10 minutes early with everything you need.",
        "Sign up to raids in a timely manner.",
        "Join raid meetings when called."
      ]
    },
    {
      title: "Conduct",
      items: [
        "Be respectful to each other.",
        "Keep criticism useful and solve problems without blaming people.",
        "Do not talk over the raid lead or fight explanations.",
        "Communicate needs, wants, late arrivals, and absences."
      ]
    },
    {
      title: "Preparation",
      items: [
        "Loot council is used.",
        "Be fully gemmed and fully enchanted.",
        "Watch guides and know the fights before raid night.",
        "Meet the throughput checks needed for your role."
      ]
    }
  ],
  riot: [
    {
      title: "Mythic Team",
      items: [
        "Mythic team runs Friday and Saturday, 9:00 PM - 12:00 AM EST.",
        "Cutting Edge is the end goal.",
        "Two Mythic+ vault slots per week, in addition to raid slots.",
        "Prioritize guild groups for keys when you can."
      ]
    },
    {
      title: "Raid standard",
      items: [
        "Fully gemmed and enchanted.",
        "Mechanics come before personal meters.",
        "Able to take constructive criticism.",
        "Come ready to improve week to week."
      ]
    },
    {
      title: "Team habits",
      items: [
        "Check Discord daily for pings, channel changes, and news.",
        "Sim yourself and upload to WoWAudit before each raid.",
        "Be active in guild and Discord.",
        "Use the required add-ons."
      ]
    }
  ],
  ruin: [
    {
      title: "Heroic Team",
      items: [
        "Heroic/AOTC team runs Wednesday, 8:00 PM - 10:00 PM EST.",
        "At least one +8 Mythic+ in your vault per week.",
        "Be ready for Heroic progression at a steady, low-drama pace.",
      ]
    },
    {
      title: "Raid standard",
      items: [
        "Fully gemmed and enchanted.",
        "Watch guides and know your specific role.",
        "Be mechanically sound and team-minded.",
        "Have the DPS or HPS needed for the boss."
      ]
    },
    {
      title: "Team habits",
      items: [
        "Check Discord daily.",
        "Tell someone ASAP if late or absent.",
        "Sim yourself and upload to WoWAudit before each raid.",
        "Be active in guild and Discord when you can."
      ]
    }
  ],
  kit: [
    {
      title: "Consumables",
      items: [
        "Combat potions.",
        "Flask or phial.",
        "Health potions.",
        "Personal food or feasts."
      ]
    },
    {
      title: "Spec items",
      items: [
        "Weapon oils or whetstones.",
        "Gateway Control Shard.",
        "Know what your spec needs.",
        "Max-level items are not required for the first two weeks of raiding."
      ]
    },
    {
      title: "Add-ons",
      items: [
        "RCLootCouncil and RCLootCouncil-WowAudit.",
        "SimulationCraft.",
        "DBM-Core or BigWigs with needed plug-ins.",
        "Recommended: MRT, Raider.IO, MDT, Details, Plater, Better-Timeline."
      ]
    }
  ]
};

const roleLabels = {
  tank: "Tank",
  healer: "Healer",
  dps: "DPS"
};

const slugClass = (value) => `class-${value.toLowerCase().replace(/\s+/g, "-")}`;
const cleanCell = (value) => String(value || "").trim();

const escapeHtml = (value) =>
  String(value).replace(/[&<>"']/g, (char) => (
    { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[char]
  ));

const rosterGrid = document.querySelector("#rosterGrid");
const rosterSummary = document.querySelector("#rosterSummary");
const rosterSearch = document.querySelector("#rosterSearch");
const mythicRosterCount = document.querySelector("#mythicRosterCount");
const roleButtons = [...document.querySelectorAll("[data-role-filter]")];
const requirementPanel = document.querySelector("#requirementPanel");
const requirementButtons = [...document.querySelectorAll("[data-requirement-tab]")];
const reportsList = document.querySelector("#reportsList");
const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector("#siteNav");
const sectionLinks = [...document.querySelectorAll("[data-scroll-target]")];
const backTopButton = document.querySelector(".back-top");
const sectionTargetStoreKey = "epicChaosScrollTarget";

let activeRole = "all";

function cleanIndexPath() {
  if (window.location.pathname.endsWith("/index.html") && !window.location.hash) {
    window.history.replaceState(null, "", "/");
  }
}

function scrollToHomeSection(target) {
  const section = document.getElementById(target);
  if (!section) {
    return false;
  }

  section.scrollIntoView({ behavior: "smooth", block: "start" });
  window.history.replaceState(null, "", "/");
  return true;
}

function handleStoredSectionTarget() {
  const target = window.sessionStorage.getItem(sectionTargetStoreKey) || window.location.hash.slice(1);
  if (!target) {
    return;
  }

  window.sessionStorage.removeItem(sectionTargetStoreKey);
  window.requestAnimationFrame(() => {
    window.setTimeout(() => {
      scrollToHomeSection(target);
    }, 40);
  });
}

sectionLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = link.dataset.scrollTarget;
    if (!target) {
      return;
    }

    event.preventDefault();
    if (!scrollToHomeSection(target)) {
      window.sessionStorage.setItem(sectionTargetStoreKey, target);
      window.location.href = "/";
    }
  });
});

cleanIndexPath();

function getFilteredRoster() {
  if (!rosterSearch) {
    return roster;
  }

  const search = rosterSearch.value.trim().toLowerCase();

  return roster.filter((player) => {
    const roleMatch = activeRole === "all" || player.role === activeRole;
    const searchable = `${player.name} ${player.className} ${player.spec} ${player.realm}`.toLowerCase();
    return roleMatch && searchable.includes(search);
  });
}

function renderRoster() {
  if (!rosterGrid || !rosterSummary || !rosterSearch) {
    return;
  }

  const visible = getFilteredRoster();
  const average = visible.length
    ? Math.round(visible.reduce((sum, player) => sum + player.ilvl, 0) / visible.length)
    : 0;
  const top = visible.length ? Math.max(...visible.map((player) => player.ilvl)) : 0;

  rosterSummary.innerHTML = [
    `<span class="summary-pill"><b>${visible.length}</b> shown</span>`,
    `<span class="summary-pill"><b>${average || "-"}</b> avg ilvl</span>`,
    `<span class="summary-pill"><b>${top || "-"}</b> top ilvl</span>`,
    `<span class="summary-pill"><b>${roster.filter((p) => p.role === "tank").length}</b> tanks</span>`,
    `<span class="summary-pill"><b>${roster.filter((p) => p.role === "healer").length}</b> healers</span>`,
    `<span class="summary-pill"><b>${roster.filter((p) => p.role === "dps").length}</b> DPS</span>`
  ].join("");

  rosterGrid.innerHTML = visible.map((player) => `
    <article class="player-card ${slugClass(player.className)}">
      <header>
        <div>
          <h3>${escapeHtml(player.name)}</h3>
          <p>${escapeHtml(player.spec)} ${escapeHtml(player.className)}</p>
        </div>
        <span class="ilvl">${player.ilvl}</span>
      </header>
      <div class="player-meta">
        <span class="chip role-${player.role}">${roleLabels[player.role]}</span>
        <span class="chip">${escapeHtml(player.realm)}</span>
      </div>
    </article>
  `).join("");
}

function parseSheetCsv(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let quoted = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const next = text[index + 1];

    if (char === '"') {
      if (quoted && next === '"') {
        cell += '"';
        index += 1;
      } else {
        quoted = !quoted;
      }
      continue;
    }

    if (char === "," && !quoted) {
      row.push(cell);
      cell = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && next === "\n") {
        index += 1;
      }
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
      continue;
    }

    cell += char;
  }

  if (cell || row.length) {
    row.push(cell);
    rows.push(row);
  }

  return rows;
}

function countRosterRowsFromCsv(csv) {
  return parseSheetCsv(csv).filter((row) => {
    const name = cleanCell(row[0]);
    const status = cleanCell(row[3]);
    const className = cleanCell(row[5]);
    const ilvl = Number.parseFloat(cleanCell(row[7]).replace(/,/g, ""));

    return name && status && className && Number.isFinite(ilvl) && status.toLowerCase() !== "rank";
  }).length;
}

async function updateMythicRosterCount() {
  if (!mythicRosterCount) {
    return;
  }

  try {
    const params = new URLSearchParams({
      tqx: "out:csv",
      gid: "0",
      cache: String(Date.now())
    });
    const response = await fetch(`${mythicRosterSheetUrl}?${params.toString()}`, { cache: "no-store" });

    if (!response.ok) {
      throw new Error(`Mythic roster sheet returned ${response.status}`);
    }

    const count = countRosterRowsFromCsv(await response.text());

    if (count > 0) {
      mythicRosterCount.textContent = String(count);
    }
  } catch (error) {
    mythicRosterCount.textContent = String(roster.length);
  }
}

function startSheetCountRefresh() {
  updateMythicRosterCount();
  window.setInterval(updateMythicRosterCount, sheetCountRefreshMs);
}

function renderRequirements(key) {
  if (!requirementPanel) {
    return;
  }

  requirementPanel.innerHTML = requirements[key].map((group) => `
    <article class="requirement-card">
      <h3>${escapeHtml(group.title)}</h3>
      <ul>
        ${group.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
      </ul>
    </article>
  `).join("");
}

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
    title: report.title || report.name || report.label || "Warcraft Logs report",
    owner: report.owner || report.uploader || report.userName || "Warcraft Logs",
    date: report.date || report.start || report.startDate || "",
    duration: report.duration || "",
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

function startReportsAutoRefresh() {
  if (!reportsList) {
    return;
  }

  refreshReportsFromFeed();
  window.setInterval(refreshReportsFromFeed, reportsRefreshMs);
}

if (roleButtons.length && rosterSearch) {
  roleButtons.forEach((button) => {
    button.addEventListener("click", () => {
      activeRole = button.dataset.roleFilter;
      roleButtons.forEach((item) => {
        const selected = item === button;
        item.classList.toggle("is-active", selected);
        item.setAttribute("aria-pressed", String(selected));
      });
      renderRoster();
    });
  });
}

if (requirementButtons.length) {
  requirementButtons.forEach((button) => {
    button.addEventListener("click", () => {
      requirementButtons.forEach((item) => {
        const selected = item === button;
        item.classList.toggle("is-active", selected);
        item.setAttribute("aria-selected", String(selected));
      });
      renderRequirements(button.dataset.requirementTab);
      if (window.lucide) {
        window.lucide.createIcons();
      }
    });
  });
}

if (rosterSearch) {
  rosterSearch.addEventListener("input", renderRoster);
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

renderRoster();
startSheetCountRefresh();
renderReports();
startReportsAutoRefresh();
renderRequirements("rules");
handleStoredSectionTarget();

if (window.lucide) {
  window.lucide.createIcons();
}
