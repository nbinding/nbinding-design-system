// Tokens: contrast in both themes, the JSON in sync with the CSS, and the three themes defining the same colours.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { buildTokens } from '../scripts/tokens-json.mjs';

const hex = h => { const n = parseInt(h.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; };
const lum = ([r, g, b]) => { const f = c => { c /= 255; return c <= .03928 ? c / 12.92 : ((c + .055) / 1.055) ** 2.4; }; return .2126 * f(r) + .7152 * f(g) + .0722 * f(b); };
const ratio = (a, b) => { const [x, y] = [lum(hex(a)), lum(hex(b))].sort((p, q) => q - p); return (x + .05) / (y + .05); };

const tokens = await buildTokens();

for (const theme of ['light', 'dark']) {
  const c = tokens.color[theme];
  test(`${theme}: text pairs meet WCAG AA (4.5:1)`, () => {
    for (const [fg, bg] of [['ink', 'surface'], ['ink', 'panel'], ['muted', 'surface'], ['muted', 'panel'], ['accent-ink', 'accent'], ['error', 'surface'], ['ink', 'field']]) {
      const r = ratio(c[fg], c[bg]);
      assert.ok(r >= 4.5, `${theme} ${fg} on ${bg} is ${r.toFixed(2)}:1`);
    }
  });
  test(`${theme}: focus ring and outlines meet 3:1 against the surface`, () => {
    for (const fg of ['ring', 'ink']) assert.ok(ratio(c[fg], c.surface) >= 3, `${theme} ${fg} is ${ratio(c[fg], c.surface).toFixed(2)}:1`);
  });
}

test('light and dark define the same colour tokens', () => {
  assert.deepEqual(Object.keys(tokens.color.light).sort(), Object.keys(tokens.color.dark).sort());
});

test('src/tokens.json is up to date (run npm run tokens)', async () => {
  const saved = JSON.parse(await readFile(new URL('../src/tokens.json', import.meta.url), 'utf8'));
  assert.deepEqual(saved, tokens);
});

test('the prefers-color-scheme block matches the explicit dark theme', async () => {
  const css = await readFile(new URL('../src/tokens.css', import.meta.url), 'utf8');
  const media = css.slice(css.indexOf('@media (prefers-color-scheme: dark)'), css.indexOf(':root[data-theme="dark"], .nb-dark'));
  for (const [k, v] of Object.entries(tokens.color.dark)) assert.ok(media.includes(`--nb-${k}: ${v};`), `--nb-${k} differs in the media query`);
});
