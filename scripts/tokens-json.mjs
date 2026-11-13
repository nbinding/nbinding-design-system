// Build src/tokens.json from src/tokens.css so design tools get the same values. `npm run tokens` writes it;
// the unit tests fail if the JSON is out of date.
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const block = (css, selector) => {
  const start = css.indexOf(selector);
  if (start < 0) throw new Error(`missing ${selector}`);
  const open = css.indexOf('{', start), close = css.indexOf('}', open);
  return css.slice(open + 1, close);
};
const vars = text => Object.fromEntries([...text.matchAll(/--nb-([\w-]+):\s*([^;]+);/g)].map(([, k, v]) => [k, v.trim()]));

export async function buildTokens() {
  const css = await readFile(new URL('../src/tokens.css', import.meta.url), 'utf8');
  const light = vars(block(css, ':root, .nb-light {'));
  const dark = vars(block(css, ':root[data-theme="dark"], .nb-dark {'));
  const rest = vars(block(css, ':root {\n  /* Type */'));
  const steadType = vars(block(css, '[data-nb-app="stead"] {\n  /* Stead type and shape */'));
  const stead = {
    light: vars(block(css, '[data-nb-app="stead"], [data-nb-app="stead"] .nb-light {')),
    dark: vars(block(css, ':root[data-nb-app="stead"][data-theme="dark"], [data-nb-app="stead"] .nb-dark, .nb-dark[data-nb-app="stead"] {')),
    font: { display: steadType['font-display'] },
    weight: { display: steadType['weight-display'], heading: steadType['weight-heading'] },
    radius: Object.fromEntries(Object.entries(steadType).filter(([k]) => k.startsWith('radius-')).map(([k, v]) => [k.slice(7), v])),
  };
  const pick = prefix => Object.fromEntries(Object.entries(rest).filter(([k]) => k.startsWith(prefix)).map(([k, v]) => [k.slice(prefix.length), v]));
  return {
    $description: 'nbinding design system tokens. Generated from src/tokens.css by scripts/tokens-json.mjs. Do not edit by hand.',
    color: { light, dark },
    font: pick('font-'),
    weight: pick('weight-'),
    text: pick('text-'),
    space: pick('space-'),
    radius: pick('radius-'),
    size: { tap: rest.tap, button: rest.button, page: rest.page },
    motion: { duration: rest.duration, ease: rest.ease },
    app: { stead },
  };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  await writeFile(new URL('../src/tokens.json', import.meta.url), JSON.stringify(await buildTokens(), null, 2) + '\n');
  console.log('wrote src/tokens.json');
}
