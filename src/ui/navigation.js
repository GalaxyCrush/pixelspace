import { translations } from "../data/siteData.js";

let currentLang = "en";
let currentItems = [];
let currentModalIndex = null;

function get(key, lang) {
  return key.split(".").reduce((o, k) => (o ? o[k] : undefined), translations[lang]);
}

function renderProjects(items) {
  currentItems = items;
  const grid = document.getElementById("projects-grid");
  grid.innerHTML = items
    .map(
      (p, i) => `
      <article class="project-card" data-index="${i}">
        <div class="project-card-head">
          <h3>${p.name}</h3>
          <span class="project-arrow">↗</span>
        </div>
        <p>${p.desc}</p>
        <div class="project-tags">${p.tags.map((t) => `<span class="chip">${t}</span>`).join("")}</div>
      </article>`
    )
    .join("");

  grid.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("click", () => {
      openProject(Number(card.dataset.index));
    });
  });
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

function renderTimeline(entries) {
  const container = document.getElementById("timeline");
  container.innerHTML = entries
    .map(
      (e) => `
      <li class="timeline-item">
        <div class="timeline-body">
          <span class="timeline-period">${e.period}</span>
          <h4 class="timeline-title">${e.title}</h4>
          <span class="timeline-place">${e.place}</span>
          <p class="timeline-desc">${e.desc}</p>
        </div>
      </li>`
    )
    .join("");
}

function renderCvButton(cvUrl, label) {
  const container = document.getElementById("cv-button");
  if (!cvUrl) {
    container.hidden = true;
    return;
  }
  container.hidden = false;
  container.textContent = label + " ↓";
  container.href = cvUrl;
}

function openProject(index) {
  const item = currentItems[index];
  if (!item) return;
  currentModalIndex = index;
  const t = translations[currentLang];
  const modal = document.getElementById("project-modal");
  document.getElementById("modal-title").textContent = item.name;
  document.getElementById("modal-details").textContent = item.details;
  document.getElementById("modal-highlights").innerHTML = item.highlights
    .map((h) => `<li>${h}</li>`)
    .join("");
  document.getElementById("modal-tags").innerHTML = item.tags
    .map((tag) => `<span class="chip">${tag}</span>`)
    .join("");
  const link = document.getElementById("modal-link");
  link.href = item.link;
  link.textContent = "GitHub ↗";
  document.getElementById("modal-close-label").textContent = t.projects.closeLabel;
  modal.showModal();
}

function closeProject() {
  document.getElementById("project-modal").close();
  currentModalIndex = null;
}

function initModal() {
  const modal = document.getElementById("project-modal");
  document.querySelectorAll("#modal-close, #modal-close-label").forEach((el) => {
    el.addEventListener("click", closeProject);
  });
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeProject();
  });
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
  renderTimeline(t.about.timeline);
  renderCvButton(t.contact.cvUrl, t.contact.cvLabel);

  if (currentModalIndex !== null && currentItems[currentModalIndex]) {
    const item = currentItems[currentModalIndex];
    document.getElementById("modal-title").textContent = item.name;
    document.getElementById("modal-details").textContent = item.details;
    document.getElementById("modal-highlights").innerHTML = item.highlights
      .map((h) => `<li>${h}</li>`)
      .join("");
    document.getElementById("modal-tags").innerHTML = item.tags
      .map((tag) => `<span class="chip">${tag}</span>`)
      .join("");
    document.getElementById("modal-close-label").textContent = t.projects.closeLabel;
  }

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
  initModal();

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