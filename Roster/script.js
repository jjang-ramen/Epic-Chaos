let mythicRoster = [
  { name: "Roseachi", team: "mythic", role: "tank", className: "Monk", spec: "Brewmaster", realm: "Illidan", ilvl: 288 },
  { name: "Giaus", team: "mythic", role: "tank", className: "Paladin", spec: "Protection", realm: "Thrall", ilvl: 290 },
  { name: "Fishguts", team: "mythic", role: "healer", className: "Monk", spec: "Mistweaver", realm: "Ursin", ilvl: 288 },
  { name: "Solitairy", team: "mythic", role: "healer", className: "Paladin", spec: "Holy", realm: "Illidan", ilvl: 289 },
  { name: "Nymueh", team: "mythic", role: "healer", className: "Priest", spec: "Holy", realm: "Zul'jin", ilvl: 288 },
  { name: "Garlicnots", team: "mythic", role: "healer", className: "Shaman", spec: "Restoration", realm: "Stormrage", ilvl: 288 },
  { name: "Yiffnoodle", team: "mythic", role: "healer", className: "Shaman", spec: "Restoration", realm: "Emerald Dream", ilvl: 289 },
  { name: "Ceriwyn", team: "mythic", role: "dps", className: "Death Knight", spec: "Unholy", realm: "Zul'jin", ilvl: 289 },
  { name: "S\u00edn\u00f3n", team: "mythic", role: "dps", className: "Death Knight", spec: "Unholy", realm: "Tichondrius", ilvl: 289 },
  { name: "Manakar", team: "mythic", role: "dps", className: "Demon Hunter", spec: "Devourer", realm: "Illidan", ilvl: 288 },
  { name: "Sianotic", team: "mythic", role: "dps", className: "Demon Hunter", spec: "Devourer", realm: "Mal'Ganis", ilvl: 289 },
  { name: "Flashock", team: "mythic", role: "dps", className: "Demon Hunter", spec: "Havoc", realm: "Stormrage", ilvl: 289 },
  { name: "Just\u00edn", team: "mythic", role: "dps", className: "Druid", spec: "Balance", realm: "Sargeras", ilvl: 290 },
  { name: "Dragonboww", team: "mythic", role: "dps", className: "Hunter", spec: "Beast Mastery", realm: "Zul'jin", ilvl: 289 },
  { name: "Serzul", team: "mythic", role: "dps", className: "Hunter", spec: "Beast Mastery", realm: "Sen'jin", ilvl: 288 },
  { name: "Scarymonstr", team: "mythic", role: "dps", className: "Mage", spec: "Frost", realm: "Thrall", ilvl: 288 },
  { name: "Yiffednoodle", team: "mythic", role: "dps", className: "Mage", spec: "Frost", realm: "Emerald Dream", ilvl: 288 },
  { name: "Elliiria", team: "mythic", role: "dps", className: "Paladin", spec: "Retribution", realm: "Illidan", ilvl: 290 },
  { name: "Islen\u00eb", team: "mythic", role: "dps", className: "Rogue", spec: "Subtlety", realm: "Area 52", ilvl: 290 },
  { name: "M\u00f4rena", team: "mythic", role: "dps", className: "Shaman", spec: "Elemental", realm: "Thunderlord", ilvl: 286 },
  { name: "Profien", team: "mythic", role: "dps", className: "Warlock", spec: "Demonology", realm: "Illidan", ilvl: 290 },
  { name: "Ramenstrong", team: "mythic", role: "dps", className: "Warrior", spec: "Fury", realm: "Area 52", ilvl: 289 }
];

let heroicRoster = [
  { name: "Deadlyblood", team: "heroic", role: "tank", className: "Death Knight", ilvl: 288.94 },
  { name: "Greekthunder", team: "heroic", role: "healer", className: "Shaman", ilvl: 288.88 },
  { name: "Omegaprimus", team: "heroic", role: "dps", className: "Paladin", ilvl: 288.75 },
  { name: "Statnshield", team: "heroic", role: "dps", className: "Warrior", ilvl: 288.69 },
  { name: "Tjørvi", team: "heroic", role: "dps", className: "Priest", ilvl: 287.25 },
  { name: "Dazarecks", team: "heroic", role: "dps", className: "Monk", ilvl: 287.13 },
  { name: "Wyclyf", team: "heroic", role: "tank", className: "Paladin", ilvl: 286.94 },
  { name: "Kragith", team: "heroic", role: "dps", className: "Hunter", ilvl: 285.63 },
  { name: "Mooitairy", team: "heroic", role: "healer", className: "Paladin", ilvl: 284.75 },
  { name: "Hydrasoul", team: "heroic", role: "dps", className: "Demon Hunter", ilvl: 283.25 },
  { name: "Ceriona", team: "heroic", role: "healer", className: "Druid", ilvl: 282.31 },
  { name: "Rosezen", team: "heroic", role: "tank", className: "Monk", ilvl: 281.56 },
  { name: "Kittykite", team: "heroic", role: "dps", className: "Mage", ilvl: 281.5 },
  { name: "Skjaldvor", team: "heroic", role: "healer", className: "Paladin", ilvl: 281.13 },
  { name: "Minerva", team: "heroic", role: "dps", className: "Mage", ilvl: 280.13 },
  { name: "Cinex", team: "heroic", role: "dps", className: "Mage", ilvl: 279.06 },
  { name: "Kyaneos", team: "heroic", role: "dps", className: "Monk", ilvl: 279.06 }
];

const roleLabels = { tank: "Tank", healer: "Healer", dps: "DPS" };
const teamLabels = { mythic: "Mythic Team", heroic: "Heroic Team" };
const statusOrder = { main: 0, bench: 1, trial: 2 };
const sheetSources = {
  mythic: {
    label: "Mythic Team",
    id: "1-JUltdNITIDbBtviVhCxhUuo4glFY3qrgUVsQf5-2sw",
    gid: "0"
  },
  heroic: {
    label: "Heroic Team",
    id: "1_PLuFV1FyUksXnjt0djp4dx8Pq2v-yQdT7m-x9WUbdo",
    gid: "0"
  }
};
const sheetRefreshMs = 5 * 60 * 1000;
const tankSpecs = new Set([
  "death knight:blood",
  "demon hunter:vengeance",
  "druid:guardian",
  "monk:brewmaster",
  "paladin:protection",
  "warrior:protection"
]);
const healerSpecs = new Set([
  "druid:restoration",
  "evoker:preservation",
  "monk:mistweaver",
  "paladin:holy",
  "priest:discipline",
  "priest:holy",
  "shaman:restoration"
]);

const dashboard = document.querySelector("#rosterDashboard");
const searchInput = document.querySelector("#rosterSearch");
const teamButtons = [...document.querySelectorAll("[data-team-filter]")];
const roleButtons = [...document.querySelectorAll("[data-role-filter]")];
const mythicGrid = document.querySelector("#mythicRoster");
const heroicGrid = document.querySelector("#heroicRoster");
const mythicSummary = document.querySelector("#mythicSummary");
const heroicSummary = document.querySelector("#heroicSummary");
const sheetSyncStatus = document.querySelector("#sheetSyncStatus");
const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector("#siteNav");
const sectionLinks = [...document.querySelectorAll("[data-scroll-target]")];
const backTopButton = document.querySelector(".back-top");
const sectionTargetStoreKey = "epicChaosScrollTarget";

let activeTeam = "all";
let activeRole = "all";

if (window.location.pathname.endsWith("/Roster/index.html")) {
  window.history.replaceState(null, "", "/Roster/");
}

const slugClass = (value) => `class-${value.toLowerCase().replace(/\s+/g, "-")}`;
const formatIlvl = (value) => Number.isInteger(value) ? value : value.toFixed(2);
const cleanCell = (value) => String(value || "").trim();
const statusRank = (value) => statusOrder[cleanCell(value).toLowerCase()] ?? 99;
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

function average(players) {
  if (!players.length) {
    return "-";
  }
  const avg = players.reduce((sum, player) => sum + player.ilvl, 0) / players.length;
  return avg.toFixed(1);
}

function matchesFilters(player) {
  const search = (searchInput?.value || "").trim().toLowerCase();
  const teamMatch = activeTeam === "all" || player.team === activeTeam;
  const roleMatch = activeRole === "all" || player.role === activeRole;
  const searchable = `${player.name} ${player.className} ${player.spec || ""} ${player.realm || ""} ${player.race || ""} ${player.status || ""} ${teamLabels[player.team]}`.toLowerCase();
  return teamMatch && roleMatch && searchable.includes(search);
}

function renderDashboard() {
  if (!dashboard) {
    return;
  }

  dashboard.innerHTML = [
    { label: "Mythic Team", value: mythicRoster.length },
    { label: "Heroic Team", value: heroicRoster.length },
    { label: "Mythic avg ilvl", value: average(mythicRoster) },
    { label: "Heroic avg ilvl", value: average(heroicRoster) }
  ].map((tile) => `
    <div class="dashboard-tile">
      <span>${tile.label}</span>
      <strong>${tile.value}</strong>
    </div>
  `).join("");
}

function renderSummary(target, players) {
  if (!target) {
    return;
  }

  target.innerHTML = [
    `<span class="summary-pill"><b>${players.length}</b> shown</span>`,
    `<span class="summary-pill"><b>${average(players)}</b> avg ilvl</span>`,
    `<span class="summary-pill"><b>${players.filter((p) => p.role === "tank").length}</b> tanks</span>`,
    `<span class="summary-pill"><b>${players.filter((p) => p.role === "healer").length}</b> healers</span>`,
    `<span class="summary-pill"><b>${players.filter((p) => p.role === "dps").length}</b> DPS</span>`
  ].join("");
}

function playerCard(player) {
  const details = player.spec ? `${player.spec} ${player.className}` : player.className;
  const realm = player.realm ? `<span class="chip">${escapeHtml(player.realm)}</span>` : "";
  const race = player.race ? `<span class="chip">${escapeHtml(player.race)}</span>` : "";
  const statusType = player.status ? player.status.toLowerCase().replace(/\s+/g, "-") : "";
  const status = player.status ? `<span class="chip roster-status status-${statusType}">${escapeHtml(player.status)}</span>` : "";

  return `
    <article class="player-card ${slugClass(player.className)}">
      <header>
        <div>
          <h3>${escapeHtml(player.name)}</h3>
          <p>${escapeHtml(details)}</p>
        </div>
        <span class="ilvl">${formatIlvl(player.ilvl)}</span>
      </header>
      <div class="player-meta">
        ${status}
        <span class="chip team-name">${teamLabels[player.team]}</span>
        <span class="chip role-${player.role}">${roleLabels[player.role]}</span>
        ${realm}
        ${race}
      </div>
    </article>
  `;
}

function renderTeam(grid, section, players) {
  if (!grid || !section) {
    return [];
  }

  section.classList.toggle("is-hidden", activeTeam !== "all" && players[0]?.team !== activeTeam);

  const visible = sortRosterPlayers(players.filter(matchesFilters));
  grid.innerHTML = visible.length
    ? visible.map(playerCard).join("")
    : `<div class="empty-state">No roster members match the current filters.</div>`;

  return visible;
}

function sortRosterPlayers(players) {
  return [...players].sort((a, b) => (
    statusRank(a.status) - statusRank(b.status) ||
    (a.sheetOrder ?? 0) - (b.sheetOrder ?? 0) ||
    a.name.localeCompare(b.name)
  ));
}

function renderRoster() {
  const mythicVisible = renderTeam(mythicGrid, document.querySelector('[data-team-section="mythic"]'), mythicRoster);
  const heroicVisible = renderTeam(heroicGrid, document.querySelector('[data-team-section="heroic"]'), heroicRoster);
  renderSummary(mythicSummary, mythicVisible);
  renderSummary(heroicSummary, heroicVisible);
}

function setSheetStatus(message, state = "loading") {
  if (!sheetSyncStatus) {
    return;
  }

  sheetSyncStatus.textContent = message;
  sheetSyncStatus.dataset.state = state;
}

function sheetCsvUrl(source) {
  const params = new URLSearchParams({
    tqx: "out:csv",
    gid: source.gid,
    cache: String(Date.now())
  });

  return `https://docs.google.com/spreadsheets/d/${source.id}/gviz/tq?${params.toString()}`;
}

function parseCsv(text) {
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

function extractSpec(note, className) {
  let value = cleanCell(note).replace(/\s+\d+\s*$/, "").trim();
  const classSuffix = ` ${className}`;

  if (value.endsWith(classSuffix)) {
    value = value.slice(0, -classSuffix.length).trim();
  }

  return value === className ? "" : value;
}

function inferRole(className, spec) {
  const key = `${className.toLowerCase()}:${spec.toLowerCase()}`;

  if (tankSpecs.has(key)) {
    return "tank";
  }

  if (healerSpecs.has(key)) {
    return "healer";
  }

  return "dps";
}

function rosterFromSheetRows(rows, team) {
  return rows
    .map((row, index) => {
      const name = cleanCell(row[0]);
      const status = cleanCell(row[3]);
      const className = cleanCell(row[5]);
      const ilvl = Number.parseFloat(cleanCell(row[7]).replace(/,/g, ""));
      const race = cleanCell(row[row.length - 2]);
      const note = cleanCell(row[row.length - 1]);
      const spec = extractSpec(note, className);

      return {
        name,
        team,
        role: inferRole(className, spec),
        className,
        spec,
        status,
        race,
        ilvl,
        sheetOrder: index
      };
    })
    .filter((player) => (
      player.name &&
      player.className &&
      Number.isFinite(player.ilvl) &&
      player.status &&
      player.status.toLowerCase() !== "rank"
    ));
}

async function fetchSheetRoster(team, source) {
  const response = await fetch(sheetCsvUrl(source), { cache: "no-store" });

  if (!response.ok) {
    throw new Error(`${source.label} sheet returned ${response.status}`);
  }

  const csv = await response.text();
  const players = rosterFromSheetRows(parseCsv(csv), team);

  if (!players.length) {
    throw new Error(`${source.label} sheet did not return roster rows`);
  }

  return players;
}

async function syncSheetRosters() {
  setSheetStatus("Syncing roster from Google Sheets...", "loading");

  const results = await Promise.allSettled([
    fetchSheetRoster("mythic", sheetSources.mythic),
    fetchSheetRoster("heroic", sheetSources.heroic)
  ]);
  const failed = [];

  if (results[0].status === "fulfilled") {
    mythicRoster = results[0].value;
  } else {
    failed.push(sheetSources.mythic.label);
  }

  if (results[1].status === "fulfilled") {
    heroicRoster = results[1].value;
  } else {
    failed.push(sheetSources.heroic.label);
  }

  renderDashboard();
  renderRoster();

  const time = new Intl.DateTimeFormat([], {
    hour: "numeric",
    minute: "2-digit"
  }).format(new Date());

  if (!failed.length) {
    setSheetStatus(`Roster synced at ${time}. Refreshes every 5 minutes.`, "ok");
    return;
  }

  if (failed.length < 2) {
    setSheetStatus(`Partial sync at ${time}. Showing local fallback data for ${failed.join(", ")}.`, "warning");
    return;
  }

  setSheetStatus("Could not reach Google Sheets. Showing the local roster.", "warning");
}

function setActiveButton(buttons, selectedButton, attribute) {
  buttons.forEach((button) => {
    const selected = button === selectedButton;
    button.classList.toggle("is-active", selected);
    button.setAttribute(attribute, String(selected));
  });
}

teamButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeTeam = button.dataset.teamFilter;
    setActiveButton(teamButtons, button, "aria-pressed");
    renderRoster();
  });
});

roleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeRole = button.dataset.roleFilter;
    setActiveButton(roleButtons, button, "aria-pressed");
    renderRoster();
  });
});

if (searchInput) {
  searchInput.addEventListener("input", renderRoster);
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

renderDashboard();
renderRoster();
syncSheetRosters();
window.setInterval(syncSheetRosters, sheetRefreshMs);

if (window.lucide) {
  window.lucide.createIcons();
}
