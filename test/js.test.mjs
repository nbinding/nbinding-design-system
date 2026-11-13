// nb.js helpers that run without a DOM: escaping, the brand mark and the calendar renderer.
import test from 'node:test';
import assert from 'node:assert/strict';
import { esc, mark, calendar } from '../src/js/nb.js';

test('esc escapes HTML', () => {
  assert.equal(esc('<img src=x onerror="a">&\''), '&lt;img src=x onerror=&quot;a&quot;&gt;&amp;&#39;');
  assert.equal(esc(null), '');
});

test('mark is decorative and sized', () => {
  assert.match(mark(40), /width="40"/);
  assert.match(mark(), /aria-hidden="true"/);
});

test('calendar renders a month with the right offset and day count', () => {
  const html = calendar({ month: '2026-11', today: '2026-11-13', locale: 'en-GB' });
  assert.equal((html.match(/nb-cell--blank/g) || []).length, 6); // 1 Nov 2026 is a Sunday
  assert.equal((html.match(/data-day="2026-11-/g) || []).length, 30);
  assert.match(html, /data-day="2026-11-12"[^>]*disabled/); // past
  assert.match(html, /nb-cell--today/);
  assert.match(html, /November <span class="nb-cal__year">2026<\/span>/);
});

test('calendar edit states: mine, theirs, both, maybe and times', () => {
  const html = calendar({ month: '2026-11', today: '2026-11-01', locale: 'en-GB',
    days: { '2026-11-20': { times: 'E' }, '2026-11-21': {}, '2026-11-22': { maybe: true } },
    theirs: { '2026-11-21': {}, '2026-11-23': {} } });
  const cell = d => html.match(new RegExp(`<button class="([^"]+)" data-day="${d}"[^>]*>(.*?)</button>`))?.slice(1);
  assert.match(cell('2026-11-20')[0], /nb-cell--mine/);
  assert.match(cell('2026-11-20')[1], /nb-cell__tags">E</);
  assert.match(cell('2026-11-21')[0], /nb-cell--both/);
  assert.match(cell('2026-11-22')[0], /nb-cell--mine nb-cell--maybe/);
  assert.match(cell('2026-11-22')[1], /nb-cell__q/);
  assert.match(cell('2026-11-23')[0], /nb-cell--theirs/);
  assert.match(html, /data-day="2026-11-21" aria-pressed="true" aria-label="Saturday 21 November, you&#39;re free, they&#39;re free"/);
});

test('calendar pick mode: choosable, chosen, counts, and other days disabled', () => {
  const html = calendar({ month: '2026-11', locale: 'en-GB', mode: 'pick', choosable: { '2026-11-21': {}, '2026-11-22': {} }, chosen: ['2026-11-21'], counts: { '2026-11-22': '3/4' } });
  assert.match(html, /nb-cell nb-cell--chosen" data-day="2026-11-21" aria-pressed="true"/);
  assert.match(html, /nb-cell nb-cell--choosable" data-day="2026-11-22" aria-pressed="false" aria-label="[^"]*3 of 4 can make it"/);
  assert.match(html, /data-day="2026-11-23" disabled/);
});

test('calendar escapes the lead text', () => {
  assert.match(calendar({ month: '2026-11', lead: '<b>hi</b>' }), /&lt;b&gt;hi&lt;\/b&gt;/);
});
