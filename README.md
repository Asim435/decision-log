# Decision Log

A landing page and working demo for Decision Log — a lightweight place to
record what a team decided, why, and whether it's still active.

## Stack

- React 19 + Vite
- Tailwind CSS v4
- React Router (hash-based, so it works on GitHub Pages without server config)

No backend, no auth, no persistence — the demo app holds state in memory
only, as specified in the brief. Refreshing clears it.

## Running locally

```bash
npm install
npm run dev
```

## Building

```bash
npm run build
npm run preview
```

## Deploying to GitHub Pages

The Vite base path is set to `/decision-log/` in `vite.config.js` — update
it if the repository name differs. Build the project and publish the
`dist/` folder to the `gh-pages` branch (or point GitHub Pages at it via
Actions), for example:

```bash
npm run build
npx gh-pages -d dist
```

## Structure

```
src/
  pages/Landing.jsx     marketing page
  pages/Demo.jsx        the working app (behind "Try Demo")
  data/seedDecisions.js example entries shown on first load
  components/Reveal.jsx scroll-in animation wrapper
  hooks/useReveal.js     IntersectionObserver hook backing Reveal
```
