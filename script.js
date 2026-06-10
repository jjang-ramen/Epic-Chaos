const roster = [
  { name: "Roseachi", role: "tank", className: "Monk", spec: "Brewmaster", realm: "Illidan", ilvl: 287 },
  { name: "Giaus", role: "tank", className: "Paladin", spec: "Protection", realm: "Thrall", ilvl: 290 },
  { name: "Fishguts", role: "healer", className: "Monk", spec: "Mistweaver", realm: "Ursin", ilvl: 288 },
  { name: "Solitairy", role: "healer", className: "Paladin", spec: "Holy", realm: "Illidan", ilvl: 286 },
  { name: "Nymueh", role: "healer", className: "Priest", spec: "Holy", realm: "Zul'jin", ilvl: 288 },
  { name: "Garlicnots", role: "healer", className: "Shaman", spec: "Restoration", realm: "Stormrage", ilvl: 288 },
  { name: "Ceriwyn", role: "dps", className: "Death Knight", spec: "Unholy", realm: "Zul'jin", ilvl: 288 },
  { name: "Sínón", role: "dps", className: "Death Knight", spec: "Unholy", realm: "Tichondrius", ilvl: 287 },
  { name: "Manakar", role: "dps", className: "Demon Hunter", spec: "Devourer", realm: "Illidan", ilvl: 288 },
  { name: "Sianotic", role: "dps", className: "Demon Hunter", spec: "Devourer", realm: "Mal'Ganis", ilvl: 288 },
  { name: "Flashock", role: "dps", className: "Demon Hunter", spec: "Havoc", realm: "Stormrage", ilvl: 289 },
  { name: "Justin", role: "dps", className: "Druid", spec: "Balance", realm: "Sargeras", ilvl: 289 },
  { name: "Dragonboww", role: "dps", className: "Hunter", spec: "Beast Mastery", realm: "Zul'jin", ilvl: 287 },
  { name: "Serzul", role: "dps", className: "Hunter", spec: "Beast Mastery", realm: "Sen'jin", ilvl: 288 },
  { name: "Scarymonstr", role: "dps", className: "Mage", spec: "Frost", realm: "Thrall", ilvl: 287 },
  { name: "Yiffednoodle", role: "dps", className: "Mage", spec: "Frost", realm: "Emerald Dream", ilvl: 287 },
  { name: "Arkabama", role: "dps", className: "Paladin", spec: "Retribution", realm: "Sargeras", ilvl: 286 },
  { name: "Elliiria", role: "dps", className: "Paladin", spec: "Retribution", realm: "Illidan", ilvl: 290 },
  { name: "Islenë", role: "dps", className: "Rogue", spec: "Subtlety", realm: "Area 52", ilvl: 289 },
  { name: "Mörena", role: "dps", className: "Shaman", spec: "Elemental", realm: "Thunderlord", ilvl: 282 },
  { name: "Profien", role: "dps", className: "Warlock", spec: "Demonology", realm: "Illidan", ilvl: 286 },
  { name: "Warristy", role: "dps", className: "Warrior", spec: "Arms", realm: "Stormrage", ilvl: 290 },
  { name: "Ramenstrong", role: "dps", className: "Warrior", spec: "Fury", realm: "Area 52", ilvl: 289 }
];

let reports = [
  { title: "Heroic", owner: "Skaidi", url: "https://www.warcraftlogs.com/reports/QMnCzTFt3GvLxYRa" },
  { title: "May 30, 2026", owner: "Ceriwyn", url: "https://www.warcraftlogs.com/reports/NM3wxZPCmbL72yfY" },
  { title: "May 29, 2026", owner: "Ceriwyn", url: "https://www.warcraftlogs.com/reports/2jpDn36qGAxkcHLR" },
  { title: "May 27, 2026", owner: "Ceriwyn", url: "https://www.warcraftlogs.com/reports/hgjTDQJwZAR1qzBX" },
  { title: "May 27, 2026", owner: "Skaidi", url: "https://www.warcraftlogs.com/reports/f8XNhpA2bvWZqyDL" },
  { title: "May 23, 2026", owner: "Ceriwyn", url: "https://www.warcraftlogs.com/reports/FQmJdk4WMwTY8nv7" }
];

const reportsFeedUrl = window.EPIC_CHAOS_REPORTS_ENDPOINT || "reports.json";
const reportsRefreshMs = 5 * 60 * 1000;

const requirements = {
  rules: [
    {
      title: "Raid clock",
      items: [
        "Invites start 15 minutes early.",
        "Be at the raid entrance 10 minutes early with everything you need.",
        "Sign up to raids in a timely manner.",
        "Attend all raider meetings."
      ]
    },
    {
      title: "Conduct",
      items: [
        "Be respectful to each other.",
        "No negativity during raid and no blame game.",
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
        "Pull the DPS or HPS needed to kill the boss."
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
        "Run Mythic+ with other raiders before pugging away."
      ]
    },
    {
      title: "Raid standard",
      items: [
        "Fully gemmed and enchanted.",
        "Mechanically sound over tunnel vision.",
        "Able to take constructive criticism.",
        "Drive to constantly improve."
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
        "Be ready for Heroic progression without making it a job.",
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
        "Pots.",
        "Flask.",
        "Health potions.",
        "Personal food."
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

const escapeHtml = (value) =>
  String(value).replace(/[&<>"']/g, (char) => (
    { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[char]
  ));

const rosterGrid = document.querySelector("#rosterGrid");
const rosterSummary = document.querySelector("#rosterSummary");
const rosterSearch = document.querySelector("#rosterSearch");
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
renderReports();
startReportsAutoRefresh();
renderRequirements("rules");
handleStoredSectionTarget();

if (window.lucide) {
  window.lucide.createIcons();
}
