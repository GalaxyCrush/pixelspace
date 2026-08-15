import {
  translations,
  type Lang,
  type ProjectItem,
  type Social,
  type SkillGroup,
  type TimelineEntry,
} from "../data/siteData.js";

import type { World } from "../core/World.js";

let currentLang: Lang = "en";
let currentItems: ProjectItem[] = [];
let currentModalIndex: number | null = null;

function get(key: string, lang: Lang): string | undefined {
  return key.split(".").reduce<unknown>(
    (o, k) => (o ? (o as Record<string, unknown>)[k] : undefined),
    translations[lang]
  ) as string | undefined;
}

function renderProjects(items: ProjectItem[]): void {
  currentItems = items;
  const grid = document.getElementById("projects-grid");
  if (!grid) return;
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
      openProject(Number((card as HTMLElement).dataset.index));
    });
  });
}

function renderSkills(groups: SkillGroup[]): void {
  const container = document.getElementById("skills");
  if (!container) return;
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

function renderLanguages(languages: string[]): void {
  const container = document.getElementById("languages");
  if (!container) return;
  container.innerHTML = languages.map((l) => `<span class="chip">${l}</span>`).join("");
}

function renderSocials(socials: Social[]): void {
  const container = document.getElementById("socials");
  if (!container) return;
  container.innerHTML = socials
    .map((s) => `<a class="btn btn-ghost" href="${s.url}" target="_blank" rel="noopener">${s.label}</a>`)
    .join("");
}

function renderTimeline(entries: TimelineEntry[]): void {
  const container = document.getElementById("timeline");
  if (!container) return;
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

function renderCvButton(cvUrl: string, label: string): void {
  const container = document.getElementById("cv-button") as HTMLAnchorElement | null;
  if (!container) return;
  if (!cvUrl) {
    container.hidden = true;
    return;
  }
  container.hidden = false;
  container.textContent = label + " ↓";
  container.href = cvUrl;
}

function openProject(index: number): void {
  const item = currentItems[index];
  if (!item) return;
  currentModalIndex = index;
  const t = translations[currentLang];
  const modal = document.getElementById("project-modal") as HTMLDialogElement;
  document.getElementById("modal-title")!.textContent = item.name;
  document.getElementById("modal-details")!.textContent = item.details;
  document.getElementById("modal-highlights")!.innerHTML = item.highlights
    .map((h) => `<li>${h}</li>`)
    .join("");
  document.getElementById("modal-tags")!.innerHTML = item.tags
    .map((tag) => `<span class="chip">${tag}</span>`)
    .join("");
  const link = document.getElementById("modal-link") as HTMLAnchorElement;
  link.href = item.link;
  link.textContent = "GitHub ↗";
  document.getElementById("modal-close-label")!.textContent = t.projects.closeLabel;
  modal.showModal();
}

function closeProject(): void {
  (document.getElementById("project-modal") as HTMLDialogElement).close();
  currentModalIndex = null;
}

function initModal(): void {
  const modal = document.getElementById("project-modal") as HTMLDialogElement;
  document.querySelectorAll("#modal-close, #modal-close-label").forEach((el) => {
    el.addEventListener("click", closeProject);
  });
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeProject();
  });
}

function translate(): void {
  const t = translations[currentLang];

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const value = get(el.getAttribute("data-i18n")!, currentLang);
    if (value !== undefined) el.textContent = value;
  });

  document.querySelectorAll("[data-i18n-href]").forEach((el) => {
    const value = get(el.getAttribute("data-i18n-href")!, currentLang);
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
    document.getElementById("modal-title")!.textContent = item.name;
    document.getElementById("modal-details")!.textContent = item.details;
    document.getElementById("modal-highlights")!.innerHTML = item.highlights
      .map((h) => `<li>${h}</li>`)
      .join("");
    document.getElementById("modal-tags")!.innerHTML = item.tags
      .map((tag) => `<span class="chip">${tag}</span>`)
      .join("");
    document.getElementById("modal-close-label")!.textContent = t.projects.closeLabel;
  }

  const langBtn = document.getElementById("lang-toggle")!;
  langBtn.textContent = currentLang === "pt" ? "EN" : "PT";
  document.title = t.hero.name + " · " + t.hero.role;
}

function setActiveSection(id: string): void {
  document.querySelectorAll("[data-section]").forEach((link) => {
    link.classList.toggle("active", link.getAttribute("data-section") === id);
  });
  document.querySelectorAll(".section").forEach((section) => {
    section.classList.toggle("active", section.id === id);
  });
}

function initNavigation(world: World): void {
  initModal();

  document.querySelectorAll("[data-section]").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const id = link.getAttribute("data-section")!;
      world.setSection(id);
      setActiveSection(id);
    });
  });

  document.getElementById("lang-toggle")!.addEventListener("click", () => {
    currentLang = currentLang === "pt" ? "en" : "pt";
    translate();
  });

  translate();
}

export { initNavigation };