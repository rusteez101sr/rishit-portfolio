# Rishit Dwivedi — Engineering Portfolio

Personal engineering portfolio (Next.js App Router, TypeScript, Tailwind CSS v4).

## Develop

```bash
npm install
npm run dev
```

## Checks

```bash
npm run lint
npx tsc --noEmit
npm run build
```

## Deploy

Live site: [https://rusteez101sr.github.io/rishit-portfolio/](https://rusteez101sr.github.io/rishit-portfolio/)

Static export via GitHub Actions (`.github/workflows/pages.yml`) on every push to `main`.

1. Repo **Settings → Pages → Build and deployment → Source** = **GitHub Actions**
2. Push to `main` to build and publish the `out/` export

Note: GitHub Pages for **private** repositories requires a paid GitHub plan (Pro/Team/Enterprise). Public repos can use Pages on the free plan.

## Structure

- `data/` — projects, skills, experience, site config
- `components/sections/` — homepage sections (Featured Work fully interactive)
- `app/work/[slug]` — project detail routes
