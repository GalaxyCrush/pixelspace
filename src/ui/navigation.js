import { translations } from "../data/siteData.js";

let currentLang = "en";

function get(key, lang) {
  return key.split(".").reduce((o, k) => (o ? o[k] : undefined), translations[lang]);
}

function renderProjects(items) {
  const grid = document.getElementById("projects-grid");
  grid.innerHTML = items
    .map(
      (p) => `
      <a class="project-card" href="${p.link}" target="_blank" rel="noopener">
        <div class="project-card-head">
          <h3>${p.name}</h3>
          <span class="project-arrow">↗</span>
        </div>
        <p>${p.desc}</p>
        <div class="project-tags">${p.tags.map((t) => `<span class="chip">${t}</span>`).join("")}</div>
      </a>`
    )
    .join("");
}

function renderSkills(groups) {
  const container = document.getElementById("skills");
  container.innerHTML = groups
    .map(
      (g) => `
      <div class="skills-group">
        <span class="skills-group-label">${g.label}</span>
        <div class="skills-group-items">${g.items.map((s) => `<span class="chip chip-glow">${s}</span>`).join("")}</div>
      </div>`
    )
    .join("");
}

function renderLanguages(languages) {
  const container = document.getElementById("languages");
  container.innerHTML = languages.map((l) => `<span class="chip">${l}</span>`).join("");
}

function renderSocials(socials) {
  const container = document.getElementById("socials");
  container.innerHTML = socials
    .map((s) => `<a class="btn btn-ghost" href="${s.url}" target="_blank" rel="noopener">${s.label}</a>`)
    .join("");
}

function translate() {
  const t = translations[currentLang];

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const value = get(el.dataset.i18n, currentLang);
    if (value !== undefined) el.textContent = value;
  });

  document.querySelectorAll("[data-i18n-href]").forEach((el) => {
    const value = get(el.dataset.i18nHref, currentLang);
    if (value !== undefined) el.setAttribute("href", value);
  });

  renderProjects(t.projects.items);
  renderSkills(t.about.skillGroups);
  renderLanguages(t.about.languages);
  renderSocials(t.contact.socials);

  const langBtn = document.getElementById("lang-toggle");
  langBtn.textContent = currentLang === "pt" ? "EN" : "PT";
  document.title = t.hero.name + " · " + t.hero.role;
}

function setActiveSection(id) {
  document.querySelectorAll("[data-section]").forEach((link) => {
    link.classList.toggle("active", link.dataset.section === id);
  });
  document.querySelectorAll(".section").forEach((section) => {
    section.classList.toggle("active", section.id === id);
  });
}

function initNavigation(world) {
  document.querySelectorAll("[data-section]").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const id = link.dataset.section;
      world.setSection(id);
      setActiveSection(id);
    });
  });

  document.getElementById("lang-toggle").addEventListener("click", () => {
    currentLang = currentLang === "pt" ? "en" : "pt";
    translate();
  });

  translate();
}

export { initNavigation };