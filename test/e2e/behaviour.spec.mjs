// The interactive pieces: overlays, hold-to-press, tap cycling, toggles, display settings, copy.
import { test, expect } from '@playwright/test';

test('dialog and sheet trap focus, close with Escape and return focus', async ({ page }) => {
  await page.goto('docs/overlays.html');
  const opener = page.getByRole('button', { name: 'Open dialog' }).first();
  await opener.click();
  const dialog = page.getByRole('dialog', { name: 'Forget this plan?' });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole('button', { name: 'Keep it' })).toBeFocused();
  for (let i = 0; i < 5; i++) await page.keyboard.press('Tab');
  expect(await page.evaluate(() => document.querySelector('#ov-dialog').contains(document.activeElement))).toBe(true);
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await expect(opener).toBeFocused();
  await expect(page.locator('.nb-scrim')).toHaveCount(0);

  const sheetOpener = page.getByRole('button', { name: 'Open sheet' }).first();
  await sheetOpener.click();
  const sheet = page.getByRole('dialog', { name: 'Times and maybes' });
  await expect(sheet).toBeVisible();
  await expect(page.locator('body')).toHaveClass(/nb-locked/);
  await sheet.getByRole('button', { name: 'Done' }).click();
  await expect(sheet).toBeHidden();
  await expect(sheetOpener).toBeFocused();
});

test('calendar demo: tap cycles a day; holding opens the sheet without cycling', async ({ page }) => {
  await page.goto('docs/calendar.html');
  const live = page.locator('[data-docs-live]');
  const cell = live.locator('[data-day="2026-11-16"]');
  await cell.click();
  await expect(cell).toHaveClass(/nb-cell--mine/);
  for (const t of ['M', 'A', 'E']) { await cell.click(); await expect(cell.locator('.nb-cell__tags')).toHaveText(t); }
  await cell.click();
  await expect(cell).not.toHaveClass(/nb-cell--mine/);

  const target = live.locator('[data-day="2026-11-17"]');
  const box = await target.boundingBox();
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down(); await page.waitForTimeout(650); await page.mouse.up();
  const sheet = page.locator('#demo-sheet');
  await expect(sheet).toBeVisible();
  await expect(sheet.locator('.nb-sheet__title')).toContainText('17');
  await expect(target).not.toHaveClass(/nb-cell--mine/);
  await page.keyboard.press('Escape');
  await expect(sheet).toBeHidden();
});

test('segmented controls and option tiles select one at a time', async ({ page }) => {
  await page.goto('docs/forms.html');
  const group = page.getByRole('radiogroup', { name: "Who's it for?" }).first();
  await group.getByRole('radio', { name: 'A group' }).click();
  await expect(group.getByRole('radio', { name: 'A group' })).toHaveAttribute('aria-checked', 'true');
  await expect(group.getByRole('radio', { name: 'One person' })).toHaveAttribute('aria-checked', 'false');
});

test('display settings apply to the site and persist for the tab', async ({ page }) => {
  await page.goto('docs/accessibility.html');
  const panel = page.locator('[data-docs-prefs]');
  await panel.getByRole('button', { name: /Largest/ }).click();
  await panel.getByRole('button', { name: 'OpenDyslexic' }).click();
  await panel.getByRole('button', { name: 'Dark' }).click();
  await panel.getByRole('checkbox', { name: /Help with dates/ }).check();
  const html = page.locator('html');
  await expect(html).toHaveAttribute('data-nb-font', 'dyslexic');
  await expect(html).toHaveAttribute('data-theme', 'dark');
  await expect(html).toHaveAttribute('data-nb-date-help', 'true');
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--nb-text-scale').trim())).toBe('1.5');
  await page.goto('docs/calendar.html');
  await expect(html).toHaveAttribute('data-nb-font', 'dyslexic');
  await expect(page.locator('.nb-cell--today .nb-cell__wd').first()).toHaveText('Today');
  await page.goto('docs/accessibility.html');
  await page.getByRole('button', { name: 'Reset display settings' }).click();
  await expect(html).toHaveAttribute('data-nb-font', 'default');
});

test('app look switch: Stead restyles every component and persists for the tab', async ({ page }) => {
  await page.goto('docs/buttons.html');
  const html = page.locator('html');
  await expect(html).not.toHaveAttribute('data-nb-app', /./);
  const looks = page.getByRole('group', { name: 'App look' });
  await expect(looks.getByRole('button', { name: 'Calshare' })).toHaveAttribute('aria-pressed', 'true');
  const bg = () => page.locator('.docs-frame.nb-light .nb-button').first().evaluate(b => getComputedStyle(b).backgroundColor);
  const before = await bg();
  await looks.getByRole('button', { name: 'Stead' }).click();
  await expect(html).toHaveAttribute('data-nb-app', 'stead');
  await expect(looks.getByRole('button', { name: 'Stead' })).toHaveAttribute('aria-pressed', 'true');
  await expect.poll(bg).toBe('rgb(41, 70, 74)'); // Stead's forest accent (after the button's transition)
  expect(before).not.toBe(await bg());
  expect(await page.evaluate(() => getComputedStyle(document.querySelector('.nb-display')).fontFamily)).toContain('Source Serif 4');
  await page.goto('docs/journey.html');
  await expect(html).toHaveAttribute('data-nb-app', 'stead');
  await page.getByRole('group', { name: 'App look' }).getByRole('button', { name: 'Calshare' }).click();
  await expect(html).not.toHaveAttribute('data-nb-app', /./);
});

test('plain-language term opens beside the word and closes with Escape or a tap elsewhere', async ({ page }) => {
  await page.goto('docs/documents.html');
  const term = page.locator('.docs-frame.nb-light [data-nb-term]').first();
  const pop = page.locator('.docs-frame.nb-light .nb-term-pop:not(.nb-term-pop--inline)').first();
  await expect(pop).toBeHidden();
  await term.click();
  await expect(term).toHaveAttribute('aria-expanded', 'true');
  await expect(pop).toBeVisible();
  const [t, p] = [await term.boundingBox(), await pop.boundingBox()];
  expect(p.y).toBeGreaterThan(t.y); // below the word
  expect(p.x + p.width).toBeLessThanOrEqual(page.viewportSize().width); // never off screen
  await page.keyboard.press('Escape');
  await expect(pop).toBeHidden();
  await expect(term).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(pop).toBeVisible();
  await page.locator('h1').click();
  await expect(pop).toBeHidden();
  await expect(term).toHaveAttribute('aria-expanded', 'false');
});

test('help with numbers sets its attribute', async ({ page }) => {
  await page.goto('docs/accessibility.html');
  await page.locator('[data-docs-prefs]').getByRole('checkbox', { name: /Help with numbers/ }).check();
  await expect(page.locator('html')).toHaveAttribute('data-nb-number-help', 'true');
});

test('copy HTML shows a toast', async ({ page, context, browserName }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']).catch(() => {});
  await page.goto('docs/buttons.html');
  await page.locator('.docs-code summary').first().click();
  await page.getByRole('button', { name: 'Copy HTML' }).first().click();
  await expect(page.locator('.nb-toast:not(.nb-toast--inline)')).toContainText(/HTML copied|Copy failed/);
});

test('the docs pages make no requests to other hosts', async ({ page }) => {
  const external = [];
  page.on('request', r => { if (!r.url().startsWith('http://localhost:4174/') && !r.url().startsWith('data:')) external.push(r.url()); });
  for (const p of ['index.html', 'docs/calendar.html', 'docs/accessibility.html']) await page.goto(p);
  expect(external).toEqual([]);
});
