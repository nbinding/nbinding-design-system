# nbinding design system

A calm, monochrome design system for small, private tools. Dark grey and white, real type, few boxes, and one memorable idea: **two hatch directions that become solid where they meet.** It powers [Calshare](https://nbinding.github.io/calshare/).

**Docs and live examples:** https://nbinding.github.io/nbinding-design-system/ once GitHub Pages is on (Settings → Pages → Deploy from a branch → `main`, `/ (root)`).

## Principles

1. **Shape before colour.** Every state reads in greyscale: hatched one way, hatched the other, solid, dotted, outlined.
2. **Space, not boxes.** Type and whitespace do the structuring. Panels and cards are the exception.
3. **One next action.** Each screen has one obvious primary button, often in the sticky dock.
4. **Comfortable for everyone.** Works at 320px wide, at 150% text, with OpenDyslexic, in light and dark, by keyboard and screen reader.

## Quick start

There's no build step and there are no runtime dependencies. Copy `src/` into your project, or serve it, then:

```html
<link rel="stylesheet" href="src/nb.css">
<script type="module">
  import { overlay, toast, copy, onHold, prefs, calendar, mark, esc } from './src/js/nb.js';
</script>
```

- **Classes** start with `nb-`, BEM-style: `nb-button nb-button--secondary`, `nb-cell nb-cell--mine`.
- **Tokens** are CSS custom properties starting with `--nb-`. They're also in `src/tokens.json` for design tools, generated from `src/tokens.css` with `npm run tokens`.
- **Themes:** light by default, dark from the device setting, `data-theme="light|dark"` on `<html>`, or `.nb-light` / `.nb-dark` on any element to theme just that part of the page.
- **Display settings:** `prefs.apply({...})` sets text size, reading font (`default`, `sans` or `dyslexic`), theme, help with dates, extra spacing and reduced motion, all through `data-nb-*` attributes on `<html>`.

## What's in it

| Area | Components |
|---|---|
| Foundations | Colour tokens (light and dark), type scale, space, radii, tap sizes, motion, the two hatch patterns, self-hosted Bricolage Grotesque, Inter and OpenDyslexic |
| Brand | Hatched mark, wordmark, large wordmark |
| Buttons | Primary, block, trailing icon, leading icon, secondary, disabled, text button, icon button, chips |
| Forms | Field with label, hint and error; input with a button; select; textarea; segmented control; option tiles; toggle; choice rows (checkbox and radio) |
| Calendar | Month header with navigation, weekday row, day cells (free, yours, yours with times, theirs, both, maybe, both and maybe, choosable, chosen, group counts, past, today, blank), key, hint, `calendar()` renderer |
| Navigation | Top bar, breadcrumb, stepper, sidebar navigation, progress bar |
| Dock | Sticky summary with the one next action, with an error state |
| Overlays | Bottom sheet, dialog (both trap focus, close with Escape and return focus), scrim, toast, notes |
| Content | Two-step sharing ("beats"), message preview, passphrase words, reply code, disclosure, list rows, how-it-works steps, section label, privacy line, card |
| Poster | The settled date, for one day, several days or a group |
| Accessibility | Live display settings panel, plus the rules every component follows |

## Files

```
src/
  nb.css              Everything: imports the files below
  tokens.css          Colour, type, space, shape, motion, hatching (light, dark, scoped themes)
  tokens.json         The same tokens for design tools (generated)
  fonts.css, fonts/   Self-hosted fonts and licences (FONTS.md)
  base.css            Reset, type helpers, focus, utilities, display settings
  components/         actions, forms, calendar, layout, overlays, content
  js/nb.js            overlay, toast, copy, onHold, prefs, calendar, mark, esc
index.html, docs/     The documentation site: every component in light and dark with copyable HTML
test/                 Unit tests (contrast, tokens, nb.js) and browser tests (every page, axe, behaviour)
scripts/tokens-json.mjs
```

## Development

```sh
npm run serve                 # http://localhost:4174
npm test                      # contrast, tokens in sync, nb.js
npm ci && npm run test:e2e    # every page at 3 sizes and at 150% OpenDyslexic, axe, behaviour
```

See [TESTING.md](TESTING.md) for what's covered and [AGENTS.md](AGENTS.md) for guidance for AI coding agents.

## Licence

Fonts are under the SIL Open Font License 1.1 (see `src/fonts/FONTS.md`). The repository owner hasn't chosen a licence for the code yet.
