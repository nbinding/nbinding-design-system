# Testing

Every pull request and every push to `main` runs these checks in GitHub Actions.

## Unit tests (`npm test`)

These use Node's built-in test runner, need no install, and run in about a second.

| File | Covers |
|---|---|
| `test/tokens.test.mjs` | **Contrast in both themes:** ink, muted, error and accent text on surface, panel and field all reach at least 4.5:1, and the focus ring and outlines reach 3:1. Light and dark define the same tokens. The device dark mode block matches the explicit dark theme. `src/tokens.json` is up to date with `src/tokens.css`. |
| `test/js.test.mjs` | `esc()` escapes HTML. The brand mark is decorative. `calendar()` gets the month offset and day count right, marks past days and today, renders every edit state (yours, theirs, both, maybe, times) and pick state (choosable, chosen, counts), writes complete screen-reader labels, and escapes text. |

## Browser tests (`npm run test:e2e`)

These are Playwright tests in `test/e2e/`, run at iPhone 13, iPhone SE (320px) and 1280px desktop sizes. `test/serve.mjs` serves the repo.

| File | Covers |
|---|---|
| `pages.spec.mjs` | **Every docs page:** every example renders, there are no console errors, and nothing scrolls sideways. The sideways check also confirms the phone browser never widened the layout viewport. **axe-core** finds no serious or critical WCAG 2.2 AA violations in light and dark frames, with all code samples open. Every interactive component is at least 44px in both directions (40px chips allowed). Then **again at 150% text with OpenDyslexic**, help with dates, extra spacing and reduced motion: no sideways scrolling, and no calendar, dock or passphrase text past the edge. |
| `behaviour.spec.mjs` | The dialog and sheet trap focus, close with Escape and Done, return focus and remove the scrim. The calendar demo cycles a day's time on tap, and holding opens the sheet without also cycling the day. Segmented controls select one option. Display settings apply across pages, persist for the tab and reset. Copy HTML shows a toast. No requests go to other hosts. |

```sh
npm ci
npx playwright install chromium   # skip in Claude Code cloud sessions: a matching browser is pre-installed
npm run test:e2e
```

`@playwright/test` is pinned to match the development browser. Dependabot skips its minor and patch updates, so update it deliberately.

## Also in CI

- **CodeQL** `security-extended` JavaScript scanning on PRs, on pushes to `main` and weekly.
- **Dependabot** for GitHub Actions (weekly) and npm (monthly).

## Recommended repository settings

- **Pages:** deploy from `main`, `/ (root)`, so the docs site goes live.
- **Code security:** turn on secret scanning and push protection.
- **Branches → `main`:** require the test and CodeQL checks before merging.
