# Manaal Maple — Integrated Portfolio

Single-page portfolio built from `Sus69/portfolio2` at commit
`a542566` ("feat: apply Whimsical Editorial theme to hero, cards,
projects and footer"). All four sections already carry the Whimsical
Editorial theme (Cloud White `#F2F5FA`, Bubblegum Pink `#FF3F70`,
Sunset Orange `#FF8552`, Golden Yellow `#FFD447`, Electric Cobalt
`#3548C8`, Midnight Blue `#14245C`; DM Sans body, Fredoka display,
Caveat hand-drawn notes).

## Order (confirmed by Manaal, 8 Nov 2026)

1. **Hero** — `hero-section`, interactive fluid identity reveal
   (WebGL Navier-Stokes, `BACKGROUND.svg` / `ANIMATED.svg` / real
   portrait). Top of the page.
2. **Cards** — `card-section`, scroll-driven Toolkit card stack
   (GSAP + ScrollTrigger, pinned). Anchor `#toolkit`.
3. **Projects** — `txt-img-cvrt-section`, text-to-image project
   showcase (safar, itqan, adval, noortrack, AS&OI), pinned.
   Anchor `#projects`.
4. **Footer** — `ftr-sprze-section`, footer surprise reveal, pinned.
   Anchor `#contact`.

The card section appears **once**, after the hero — it is not
repeated below the projects section.

## Integration approach

One Vite + React 19 app (`src/App.tsx`) that imports the three React
sections as components in that order, plus a `Hero` component.

- **React sections copied verbatim** from `portfolio2@a542566`
  (`src/sections/cards|projects|footer`), keeping their relative
  imports, GSAP timelines, data files and `ThemeCat` components
  untouched. No copy, project names, card titles or animation logic
  were changed.
- **Hero is plain HTML/JS, not React.** `src/hero/Hero.tsx` renders
  only the hero `<header id="hero">` markup from
  `hero-section/index.html` — the hero's own static
  projects/tech-stack/contact `<main>` is *not* included, because
  the integrated page supplies those with the projects section and
  the footer. Its nav links were retargeted to the integrated
  anchors (`#toolkit`, `#projects`, `#contact`).
  `hero-section/fluid.js` is an IIFE with no cleanup API: it is
  loaded as a classic script (`public/hero/assets.js` then
  `public/hero/fluid.js`, in that order) from a `useEffect` after
  the canvas mounts, guarded so it loads once. The loop is
  intentionally left running — the hero never unmounts.
  Hero artwork is untouched (`BACKGROUND.svg`, `ANIMATED.svg`,
  `REAL.png`/`REAL.webp`, `assets.js` data-URIs, `fluid.js`).
- **CSS collisions:** the only real class collision across the four
  sections was `.nav-pill` / `.active` (hero top-left nav vs. the
  cards' centred nav). It is solved by scoping: all of
  `hero-section/style.css` is prefixed with `.hero-scope` (the
  `Hero` component wraps its markup in `<div className="hero-scope">`),
  except `:root` variables and the dropped `html` rule (the shared
  global handles page scrolling). The `body { user-select: none }`
  rule from the hero is scoped too, so text stays selectable in the
  other sections. The three React sections' CSS is otherwise
  disjoint (`.experience`/`.card-*`, `.projects-*`/`.project-letter`,
  `.ftr-*`), and their themed `global.css` files are identical, so
  they are merged into one `src/styles/global.css`.
- **Pinning:** each React section keeps its own ScrollTrigger pin
  (cards pin `.scene` for +5400/7000px, projects pin their section,
  footer pins its root). They are stacked in normal document flow,
  so each pin/unpin happens in turn while scrolling the page.
  Reduced-motion fallbacks are preserved (the sections render their
  static content when `prefers-reduced-motion` is set).

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # tsc + vite build -> dist/
npm run preview  # serve the production build locally
```

## Deploy (Vercel)

`vercel.json` sets framework `vite`, build `npm run build`, output
`dist/`. The site builds to a single `dist/` directory, including
`public/hero/` assets and `public/project-images/`.

> Vercel note (8 Nov 2026): the connected Vercel account is
> `sus69` (manaalmaple255@gmail.com, hobby). Listing projects under
> the team `manaals-projects-f1265a23` (`team_tQ3kfL5ZyikpdiZg7WBt7pas`)
> returns 403 "Not authorized … You must re-authenticate to this
> scope", and the Vercel MCP tool list has no `authorize_team_access`
> tool, so a team-scoped deployment cannot be created from here
> without the user re-authorising that team scope. See the build
> report for the exact findings.
