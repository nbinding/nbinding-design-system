# nbinding design system

A calm design system for small, private tools: real type, few boxes, every state shown by shape, and one memorable idea: **two hatch directions that become solid where they meet.** It powers [Calshare](https://nbinding.github.io/calshare/) and [Stead](https://nbinding.github.io/stead-mobile/).

**Docs:** https://nbinding.github.io/nbinding-design-system/
**Storybook:** https://nbinding.github.io/nbinding-design-system/storybook/

Both go live once GitHub Pages is on: Settings → Pages → Source: **GitHub Actions**. The `Publish docs and Storybook` workflow then deploys on every push to `main`.

## App looks

Every component comes in each app's look. The docs site and Storybook both have a switch (**App look** in the docs header, **App** in the Storybook toolbar).

| Look | How | Colour | Display type |
|---|---|---|---|
| **Calshare** (default) | nothing to set | Dark grey and white | Bricolage Grotesque |
| **Stead** | `data-nb-app="stead"` on `<html>` or any element | Forest green on warm paper, with a forest dark theme | Source Serif 4 |

Both looks have light and dark themes and pass the same contrast tests. A look sets colour, display type and weights, corner radii and field edges; everything else is shared. To add an app, add its token blocks to `src/tokens.css` (copy Stead's), its entry to `APPS` in `docs/docs.js` and to the `app` toolbar in `.storybook/preview.js`.

## Storybook

Every component has stories with live **controls** for its variants, an auto-generated **Docs** page with copyable code, and an **Accessibility** panel that runs axe. The toolbar switches **App** (Calshare or Stead), **Theme**, **Text size** (up to 150%), **Font** (including OpenDyslexic), **Help with numbers** and **Help with dates** for every story. Run it locally with `npm run storybook`.

Storybook is the only part with a build step. The design system itself (`src/`) is still plain CSS and ES modules.

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
  import { overlay, toast, copy, onHold, prefs, calendar, mark, esc, money, amountWords, terms } from './src/js/nb.js';
</script>
```

- **Classes** start with `nb-`, BEM-style: `nb-button nb-button--secondary`, `nb-cell nb-cell--mine`.
- **Tokens** are CSS custom properties starting with `--nb-`. They're also in `src/tokens.json` for design tools, generated from `src/tokens.css` with `npm run tokens`.
- **Themes:** light by default, dark from the device setting, `data-theme="light|dark"` on `<html>`, or `.nb-light` / `.nb-dark` on any element to theme just that part of the page.
- **App looks:** `data-nb-app="stead"` for Stead; Calshare is the default.
- **Display settings:** `prefs.apply({...})` sets text size, reading font (`default`, `sans` or `dyslexic`), theme, help with dates, help with numbers, extra spacing and reduced motion, all through `data-nb-*` attributes on `<html>`.

## What's in it

| Area | Components |
|---|---|
| Foundations | Colour tokens (Calshare and Stead, each light and dark), type scale and weights, space, radii, tap sizes, motion, the two hatch patterns, self-hosted Bricolage Grotesque, Source Serif 4, Inter and OpenDyslexic, eyebrow, softer second heading line |
| Brand | Hatched mark, letter mark (Stead), wordmark, large wordmark |
| Buttons | Primary, block, trailing icon, leading icon, secondary, disabled, text button, destructive text button, icon button, chips |
| Forms | Field with label, hint and error; input with a button; select; textarea; segmented control; option tiles; toggle; choice rows (checkbox and radio) |
| Calendar | Month header with navigation, weekday row, day cells (free, yours, yours with times, theirs, both, maybe, both and maybe, choosable, chosen, group counts, past, today, blank), key, hint, `calendar()` renderer |
| Navigation | Top bar, breadcrumb, stepper, stepper as bars, sidebar navigation, tab bar, progress bar |
| Dock | Sticky summary with the one next action, with an error state |
| Overlays | Bottom sheet, dialog (both trap focus, close with Escape and return focus), scrim, toast, notes |
| Content | Two-step sharing ("beats"), message preview, passphrase words, reply code, disclosure, list rows, action rows, how-it-works steps, section label, privacy line, card |
| Figures | Money field (with an error), amount in words (`amountWords()`, `money()`), sum with working |
| Journey | Status marks (to do, now, done, come back to this), timeline with phases, badges, icon list (outcomes), answer summary, dated list |
| Documents | Paper preview, gaps still to fill, plain-language terms (`terms()`) |
| Poster | The settled date, for one day, several days or a group; sealed |
| Accessibility | Live display settings panel, plus the rules every component follows |

## Files

```
src/
  nb.css              Everything: imports the files below
  tokens.css          Colour, type, space, shape, motion, hatching (light, dark, scoped themes; Calshare and Stead looks)
  tokens.json         The same tokens for design tools (generated)
  fonts.css, fonts/   Self-hosted fonts and licences (FONTS.md)
  base.css            Reset, type helpers, focus, utilities, display settings
  components/         actions, forms, calendar, layout, overlays, content, figures, journey, documents
  js/nb.js            overlay, toast, copy, onHold, prefs, calendar, mark, esc, money, amountWords, terms
index.html, docs/     The documentation site: every component in light and dark with copyable HTML
test/                 Unit tests (contrast, tokens, nb.js) and browser tests (every page, axe, behaviour)
scripts/tokens-json.mjs
.storybook/, stories/  Storybook configuration and one stories file per area
```

## Development

```sh
npm run serve                 # http://localhost:4174
npm test                      # contrast, tokens in sync, nb.js
npm run storybook             # Storybook at http://localhost:6006
npm ci && npm run storybook:build && npm run test:e2e   # every page and story: axe, overflow, behaviour
```

See [TESTING.md](TESTING.md) for what's covered and [AGENTS.md](AGENTS.md) for guidance for AI coding agents.

## Licence

Code is under the [MIT License](LICENSE). Fonts are under the SIL Open Font License 1.1 (see `src/fonts/FONTS.md`).
