# Anshal Gupta: portfolio

One-page Astro site. GSAP + Lenis for motion, no framework runtime, about 63 KB total.

## Run
```
npm install
npm run dev      # http://localhost:4321
npm run build    # static output in dist/
```

## Edit content
Everything lives in `src/data/site.ts` (copy, stats, work rows, stack, projects, skin colours).

## Deploy (GitHub Pages)
1. Push to a repo named `<username>.github.io` (or any repo).
2. In `astro.config.mjs` set `site` to your real URL. For a project repo also set `base: '/<repo>'`.
3. Repo Settings, Pages, Source: GitHub Actions. `.github/workflows/deploy.yml` builds and publishes on push to `main`.

## Check before publishing
- `site.url` in `site.ts` is a guess: replace it with your real domain.
- The ToolDeck link (`https://tooldeck.co`) can be removed if you don't want it public.
- GitHub is intentionally not linked. Add it once the profile has recent work.
- The 60% engagement claim is left out until it has a clear definition and baseline.
- Your email is public on the page. Swap for a form or alias if you prefer.
- `public/Anshal_Gupta_Resume.pdf` is the resume copy; replace when you update it.
