const mythicRoster = [
  { name: "Roseachi", team: "mythic", role: "tank", className: "Monk", spec: "Brewmaster", realm: "Illidan", ilvl: 287 },
  { name: "Giaus", team: "mythic", role: "tank", className: "Paladin", spec: "Protection", realm: "Thrall", ilvl: 290 },
  { name: "Fishguts", team: "mythic", role: "healer", className: "Monk", spec: "Mistweaver", realm: "Ursin", ilvl: 288 },
  { name: "Solitairy", team: "mythic", role: "healer", className: "Paladin", spec: "Holy", realm: "Illidan", ilvl: 286 },
  { name: "Nymueh", team: "mythic", role: "healer", className: "Priest", spec: "Holy", realm: "Zul'jin", ilvl: 288 },
  { name: "Garlicnots", team: "mythic", role: "healer", className: "Shaman", spec: "Restoration", realm: "Stormrage", ilvl: 288 },
  { name: "Ceriwyn", team: "mythic", role: "dps", className: "Death Knight", spec: "Unholy", realm: "Zul'jin", ilvl: 288 },
  { name: "Sínón", team: "mythic", role: "dps", className: "Death Knight", spec: "Unholy", realm: "Tichondrius", ilvl: 287 },
  { name: "Manakar", team: "mythic", role: "dps", className: "Demon Hunter", spec: "Devourer", realm: "Illidan", ilvl: 288 },
  { name: "Sianotic", team: "mythic", role: "dps", className: "Demon Hunter", spec: "Devourer", realm: "Mal'Ganis", ilvl: 288 },
  { name: "Flashock", team: "mythic", role: "dps", className: "Demon Hunter", spec: "Havoc", realm: "Stormrage", ilvl: 289 },
  { name: "Justin", team: "mythic", role: "dps", className: "Druid", spec: "Balance", realm: "Sargeras", ilvl: 289 },
  { name: "Dragonboww", team: "mythic", role: "dps", className: "Hunter", spec: "Beast Mastery", realm: "Zul'jin", ilvl: 287 },
  { name: "Serzul", team: "mythic", role: "dps", className: "Hunter", spec: "Beast Mastery", realm: "Sen'jin", ilvl: 288 },
  { name: "Scarymonstr", team: "mythic", role: "dps", className: "Mage", spec: "Frost", realm: "Thrall", ilvl: 287 },
  { name: "Yiffednoodle", team: "mythic", role: "dps", className: "Mage", spec: "Frost", realm: "Emerald Dream", ilvl: 287 },
  { name: "Arkabama", team: "mythic", role: "dps", className: "Paladin", spec: "Retribution", realm: "Sargeras", ilvl: 286 },
  { name: "Elliiria", team: "mythic", role: "dps", className: "Paladin", spec: "Retribution", realm: "Illidan", ilvl: 290 },
  { name: "Islenë", team: "mythic", role: "dps", className: "Rogue", spec: "Subtlety", realm: "Area 52", ilvl: 289 },
  { name: "Mörena", team: "mythic", role: "dps", className: "Shaman", spec: "Elemental", realm: "Thunderlord", ilvl: 282 },
  { name: "Profien", team: "mythic", role: "dps", className: "Warlock", spec: "Demonology", realm: "Illidan", ilvl: 286 },
  { name: "Warristy", team: "mythic", role: "dps", className: "Warrior", spec: "Arms", realm: "Stormrage", ilvl: 290 },
  { name: "Ramenstrong", team: "mythic", role: "dps", className: "Warrior", spec: "Fury", realm: "Area 52", ilvl: 289 }
];

const heroicRoster = [
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

const allRoster = [...mythicRoster, ...heroicRoster];
const roleLabels = { tank: "Tank", healer: "Healer", dps: "DPS" };
const teamLabels = { mythic: "Mythic Team", heroic: "Heroic Team" };

const dashboard = document.querySelector("#rosterDashboard");
const searchInput = document.querySelector("#rosterSearch");
const teamButtons = [...document.querySelectorAll("[data-team-filter]")];
const roleButtons = [...document.querySelectorAll("[data-role-filter]")];
const mythicGrid = document.querySelector("#mythicRoster");
const heroicGrid = document.querySelector("#heroicRoster");
const mythicSummary = document.querySelector("#mythicSummary");
const heroicSummary = document.querySelector("#heroicSummary");
const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector("#siteNav");

let activeTeam = "all";
let activeRole = "all";

const slugClass = (value) => `class-${value.toLowerCase().replace(/\s+/g, "-")}`;
const formatIlvl = (value) => Number.isInteger(value) ? value : value.toFixed(2);
const escapeHtml = (value) =>
  String(value).replace(/[&<>"']/g, (char) => (
    { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[char]
  ));

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
  const searchable = `${player.name} ${player.className} ${player.spec || ""} ${player.realm || ""} ${teamLabels[player.team]}`.toLowerCase();
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
        <span class="chip team-name">${teamLabels[player.team]}</span>
        <span class="chip role-${player.role}">${roleLabels[player.role]}</span>
        ${realm}
      </div>
    </article>
  `;
}

function renderTeam(grid, section, players) {
  if (!grid || !section) {
    return [];
  }

  section.classList.toggle("is-hidden", activeTeam !== "all" && players[0]?.team !== activeTeam);

  const visible = players.filter(matchesFilters);
  grid.innerHTML = visible.length
    ? visible.map(playerCard).join("")
    : `<div class="empty-state">No roster members match the current filters.</div>`;

  return visible;
}

function renderRoster() {
  const mythicVisible = renderTeam(mythicGrid, document.querySelector('[data-team-section="mythic"]'), mythicRoster);
  const heroicVisible = renderTeam(heroicGrid, document.querySelector('[data-team-section="heroic"]'), heroicRoster);
  renderSummary(mythicSummary, mythicVisible);
  renderSummary(heroicSummary, heroicVisible);
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

renderDashboard();
renderRoster();

if (window.lucide) {
  window.lucide.createIcons();
}
