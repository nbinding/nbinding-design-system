# AGENTS.md

Guidance for AI coding agents working in this repository.

**What this is:** the nbinding design system: tokens, CSS components and a few JavaScript helpers, with a documentation site (`index.html`, `docs/`) and Storybook. It's used by Calshare (https://nbinding.github.io/calshare/) and, soon, Stead (https://nbinding.github.io/stead-mobile/). Merging to `main` publishes the docs, so merge only when the owner asks.

## Ground rules

- **No build step and no runtime dependencies for `src/`.** Plain CSS and ES modules. Only Storybook (`.storybook/`, `stories/`) is built, by CI. Dev dependencies are Playwright, axe-core and Storybook, all pinned to exact versions at least two weeks old.
- **App looks.** Calshare (default, dark grey and white) and Stead (`data-nb-app="stead"`, forest green). Components use tokens only, so they work in every look; never style for one app by its name. A look may change colour, display font and weights, radii and field edges, nothing else. Show every state by shape (hatch direction, solid, dotted, outlined, ring), never by colour alone.
- **Shared tokens in every scope.** A colour token added to one theme block must be added to all of them (Calshare light, dark, light-inside-dark, the device dark media query, and the same four for Stead). The unit tests check they match.
- **Tokens first.** Use `--nb-*` custom properties, not raw values. When you change `src/tokens.css`, run `npm run tokens` to regenerate `src/tokens.json`; a unit test fails otherwise. Contrast is tested for both themes, so keep text at 4.5:1 or better.
- **Hatching is declared on every theme scope** (`:root, .nb-light, .nb-dark, [data-nb-app]`) so it uses that scope's ink. Do the same for any token built from other tokens.
- **Prefix everything `nb-`**, BEM-style (`nb-block__element--modifier`). Don't style bare elements outside `base.css`.
- **Mobile first and robust:** 320px wide, 150% text, OpenDyslexic, light and dark. Long words must wrap (headings already do), flex and grid children need `min-width: 0`, and fieldsets need `min-inline-size: 0`. Tap targets are at least 44px.
- **Accessible markup in every example:** real buttons, links, inputs and labels; `aria-label` on icon-only buttons; decorative SVG `aria-hidden`. Overlays go through `overlay()` (focus trap, Escape, focus return). Holding something is never the only way to do it.
- **The docs follow the same strict CSP** (`script-src 'self'`, `style-src 'self'`, `connect-src 'none'`): no inline scripts or `style=""` attributes. Set dynamic styles through the CSSOM in `docs/docs.js`.
- **Escape anything from a person or a link** with `esc()` before it goes into HTML.

## Adding or changing a component

1. Add the CSS to the right file in `src/components/` (or a new file imported from `src/nb.css`).
2. Show every state on its docs page as a `<template class="docs-src" data-title="…" data-notes="…">`. `docs/docs.js` renders it in a light and a dark frame with copyable HTML. Calendars can use `<div data-cal="{json}">`, rendered by `calendar()`.
3. Add a behaviour test in `test/e2e/behaviour.spec.mjs` if it's interactive. `pages.spec.mjs` already checks rendering, axe, overflow and tap size for every page.
4. Add or update its stories in `stories/` (CSF, `render(args)` returns HTML). Give each variant a control. `storybook.spec.mjs` runs axe on every story in both app looks.
5. Add new pages to `PAGES` in `docs/docs.js` and `test/e2e/pages.spec.mjs`. Every page is tested in both app looks.
6. Update the component table in `README.md`.

## Before you push

```sh
npm test
npm run test:e2e
```

Never skip, disable or loosen a test to get CI green; fix the cause. Don't put secrets, personal details or model names in commits, code or docs.
