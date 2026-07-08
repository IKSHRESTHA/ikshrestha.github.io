# ikshrestha.github.io

Personal website of **Krishna Kumar Shrestha** — actuarial science, data & risk analytics.

Live at: https://ikshrestha.github.io

## Stack

- [Vite](https://vite.dev) + vanilla JavaScript (no framework)
- Self-hosted fonts via Fontsource (Fraunces + Inter)
- Deployed to GitHub Pages by GitHub Actions on every push to `main`

## Local development

```bash
npm install
npm run dev       # dev server with hot reload
npm run build     # production build into dist/
npm run preview   # serve the production build locally
```

## Updating content

All resume/profile content lives in **`src/data/resume.js`** — one file, plain
JavaScript objects. Edit it (new job, new exam, new project), commit, and push;
both the home page and the CV page re-render from it and GitHub Actions
redeploys automatically.

- Headshot: replace `public/images/krishna.jpg`
- Colors & fonts: design tokens at the top of `src/styles/main.css`

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the
site and publishes `dist/` to GitHub Pages.

One-time repo setup: in **Settings → Pages**, set **Source** to
**GitHub Actions**.
