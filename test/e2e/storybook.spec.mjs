// Every Storybook story renders without errors, fits a phone and passes axe. Needs `npm run storybook:build` first.
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { existsSync, readFileSync } from 'node:fs';

const index = new URL('../../storybook-static/index.json', import.meta.url);
const stories = existsSync(index) ? Object.values(JSON.parse(readFileSync(index, 'utf8')).entries).filter(e => e.type === 'story') : [];

test('Storybook was built for this run', () => {
  test.skip(!process.env.CI && !stories.length, 'run npm run storybook:build to include Storybook');
  expect(stories.length).toBeGreaterThan(40);
});

for (const story of stories) {
  test(`story ${story.id}`, async ({ page }, info) => {
    test.skip(info.project.name !== 'iphone', 'stories are checked once, at phone size');
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
    await page.goto(`storybook-static/iframe.html?id=${story.id}&viewMode=story`);
    const root = page.locator('#storybook-root');
    await expect(root.locator(':scope > *').first()).toBeAttached(); // some stories are icons only, with no text
    await page.evaluate(() => document.fonts.ready);
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(0);
    const axe = await new AxeBuilder({ page }).include('#storybook-root').options({ preload: false }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze();
    const serious = axe.violations.filter(v => ['serious', 'critical'].includes(v.impact));
    expect(serious.map(v => `${v.id}: ${v.nodes.slice(0, 3).map(n => n.target.join(' ')).join(' | ')}`)).toEqual([]);
    expect(errors).toEqual([]);
  });
}
