// Every docs page, at every size: renders all examples, no errors, no sideways scrolling, no axe violations,
// and comfortable targets. Then again at 150% text with OpenDyslexic.
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

export const PAGES = ['index.html', 'docs/foundations.html', 'docs/brand.html', 'docs/buttons.html', 'docs/forms.html', 'docs/calendar.html',
  'docs/navigation.html', 'docs/dock.html', 'docs/overlays.html', 'docs/content.html', 'docs/poster.html', 'docs/accessibility.html'];

async function open(page, path, prefs) {
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  if (prefs) await page.addInitScript(p => sessionStorage.setItem('nb-docs-display', JSON.stringify(p)), prefs);
  await page.goto(path);
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator('template.docs-src')).toHaveCount(0); // every example rendered
  return errors;
}

async function noSideways(page) {
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(0);
  expect(await page.evaluate(() => innerWidth)).toBe(page.viewportSize().width); // the browser didn't widen the layout
}

for (const path of PAGES) {
  test(`${path} renders cleanly and passes axe`, async ({ page }) => {
    const errors = await open(page, path);
    await noSideways(page);
    // Open every disclosure so axe sees the HTML samples too
    await page.$$eval('details', ds => ds.forEach(d => { d.open = true; }));
    // preload off: axe would otherwise refetch @import-ed CSS from the wrong path, which the CSP (rightly) blocks.
    const axe = await new AxeBuilder({ page }).options({ preload: false }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze();
    const serious = axe.violations.filter(v => ['serious', 'critical'].includes(v.impact));
    expect(serious.map(v => `${v.id}: ${v.nodes.slice(0, 3).map(n => n.target.join(' ')).join(' | ')}`)).toEqual([]);
    // Interactive controls in the system are at least 44px in both directions (inline links in prose excepted)
    const small = await page.$$eval('.nb-button, .nb-icon-button, .nb-chip, .nb-text-button, .nb-cell:not(.nb-cell--blank), .nb-choice, .nb-segmented > button, .nb-options > button, .nb-disclosure > summary', els =>
      els.filter(e => e.offsetParent).map(e => [e, e.getBoundingClientRect()]).filter(([, r]) => r.height < 39.5 || r.width < 39.5).map(([e, r]) => `${e.className || e.tagName} ${Math.round(r.width)}x${Math.round(r.height)}`));
    expect(small).toEqual([]);
    expect(errors).toEqual([]);
  });

  test(`${path} holds up at 150% text with OpenDyslexic`, async ({ page }) => {
    const errors = await open(page, path, { size: 150, font: 'dyslexic', theme: 'system', dateHelp: true, spacing: true, motion: true });
    await expect(page.locator('html')).toHaveAttribute('data-nb-font', 'dyslexic');
    await noSideways(page);
    const spilling = await page.$$eval('.nb-cell span, .nb-cal__month, .nb-dock__summary, .nb-words', els =>
      els.filter(e => e.offsetParent && e.getBoundingClientRect().right > innerWidth + 1).length);
    expect(spilling).toBe(0);
    expect(errors).toEqual([]);
  });
}
