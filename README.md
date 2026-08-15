# PixelSpace

Personal portfolio with a space-themed 3D scene, built with Three.js and Vite. Each section has its own low-poly planet with rings, moons, stars, nebulas, and shooting stars.

## Stack

- Vite 8
- Three.js
- TypeScript
- CSS

## Development

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

## Content

All texts and data (projects, timeline, skills, languages) live in `src/data/siteData.js`, with PT/EN translations.

## Deploy

The workflow in `.github/workflows/deploy.yml` builds and publishes to GitHub Pages on every push to `main`. Prerequisite: Settings > Pages > Source: GitHub Actions.

## Structure

```
src/
  components/   3D scene (planets, particles, comets, lights, camera)
  core/         World, main, systems (renderer, resizer)
  data/         siteData.js (content and translations)
  ui/           navigation, language, modals
styles/         CSS
```