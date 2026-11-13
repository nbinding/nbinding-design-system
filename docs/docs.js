// Documentation site behaviour: header and nav, light/dark example frames with copyable HTML, live demos.
import { esc, mark, calendar, overlay, toast, copy, onHold, prefs } from '../src/js/nb.js';

const root = document.documentElement.dataset.root || '..';
const PAGES = [
  ['index.html', 'Overview', 'Principles, quick start and every component'],
  ['docs/foundations.html', 'Foundations', 'Colour, type, space, shape, hatching'],
  ['docs/brand.html', 'Brand', 'Mark and wordmark'],
  ['docs/buttons.html', 'Buttons', 'Primary, secondary, text, icon, chips'],
  ['docs/forms.html', 'Forms', 'Fields, segmented, toggles, choices'],
  ['docs/calendar.html', 'Calendar', 'Day states, overlap, picking, key'],
  ['docs/navigation.html', 'Navigation', 'Top bar, breadcrumb, stepper, sidebar'],
  ['docs/dock.html', 'Dock', 'Count and the one next action'],
  ['docs/overlays.html', 'Overlays', 'Sheet, dialog, toast, notes'],
  ['docs/content.html', 'Content', 'Sharing steps, words, disclosure, lists'],
  ['docs/poster.html', 'Poster', 'The settled date'],
  ['docs/accessibility.html', 'Accessibility', 'Display settings and rules'],
];
const href = p => `${root}/${p}`.replace(/^\.\//, '');
const here = location.pathname.split('/').slice(-2).join('/');
const isCurrent = p => here.endsWith(p) || (p === 'index.html' && /\/$|\/index\.html$/.test(location.pathname) && !location.pathname.includes('/docs/'));

prefs.apply(prefs.read('nb-docs-display'), 'nb-docs-display');

// Header, nav and footer
document.querySelector('[data-docs-header]')?.insertAdjacentHTML('afterbegin', `
  <a class="nb-skip" href="#main">Skip to content</a>
  <div class="docs-top"><a class="nb-brand" href="${href('index.html')}">${mark()}<span>nbinding design</span></a>
    <div class="nb-row"><a class="nb-chip nb-chip--sm" href="${href('storybook/')}">Storybook</a><a class="nb-chip nb-chip--sm" href="https://github.com/nbinding/nbinding-design-system">Source</a><button class="nb-chip nb-chip--sm" data-docs-theme aria-label="Switch light or dark">Theme</button></div></div>
  <nav class="docs-nav" aria-label="Design system pages"><ul>${PAGES.map(([p, t]) => `<li><a class="nb-chip nb-chip--sm" href="${href(p)}"${isCurrent(p) ? ' aria-current="page"' : ''}>${t}</a></li>`).join('')}</ul></nav>`);
document.querySelector('[data-docs-footer]')?.insertAdjacentHTML('afterbegin', `<p>nbinding design system. Fonts under the SIL Open Font License. Used by <a href="https://nbinding.github.io/calshare/">Calshare</a>.</p>`);
document.querySelector('[data-docs-cards]')?.insertAdjacentHTML('afterbegin', PAGES.slice(1).map(([p, t, d]) => `<li><a href="${href(p)}"><strong>${t}</strong><small>${d}</small></a></li>`).join(''));
document.querySelector('[data-docs-theme]')?.addEventListener('click', () => {
  const p = prefs.read('nb-docs-display');
  const dark = document.documentElement.dataset.theme === 'dark' || (!document.documentElement.dataset.theme && matchMedia('(prefers-color-scheme: dark)').matches);
  prefs.apply({ ...p, theme: dark ? 'light' : 'dark' }, 'nb-docs-display');
});

// Calendars described by data attributes render through the real helper
for (const el of document.querySelectorAll('template')) for (const cal of el.content.querySelectorAll('[data-cal]')) cal.outerHTML = calendar(JSON.parse(cal.dataset.cal));
document.querySelectorAll('[data-mark]').forEach(el => { el.outerHTML = mark(Number(el.dataset.mark) || 26, el.dataset.class || 'nb-brand__mark'); });
for (const el of document.querySelectorAll('template')) el.content.querySelectorAll('[data-mark]').forEach(m => { m.outerHTML = mark(Number(m.dataset.mark) || 26, m.dataset.class || 'nb-brand__mark'); });

// Each <template class="docs-src"> becomes a light frame, a dark frame and its HTML
document.querySelectorAll('template.docs-src').forEach((tpl, i) => {
  const html = tpl.innerHTML.trim().replace(/\n {4}/g, '\n');
  const fig = document.createElement('figure');
  fig.className = 'docs-ex';
  const id = `ex-${i}`;
  fig.innerHTML = `<figcaption><p class="docs-ex__title" id="${id}">${esc(tpl.dataset.title)}</p>${tpl.dataset.notes ? `<p class="docs-ex__notes">${esc(tpl.dataset.notes)}</p>` : ''}</figcaption>
    <div class="docs-frames">${tpl.dataset.only === 'one' ? `<div class="docs-frame">${html}</div>` : `<div class="docs-frame nb-light" aria-label="${esc(tpl.dataset.title)}, light"><span class="docs-frame__label">Light</span>${html}</div><div class="docs-frame nb-dark" role="group" aria-label="${esc(tpl.dataset.title)}, dark"><span class="docs-frame__label">Dark</span>${html}</div>`}</div>
    <details class="nb-disclosure docs-code"><summary>HTML</summary><pre tabindex="0" aria-label="HTML for ${esc(tpl.dataset.title)}"><code>${esc(html)}</code></pre><button class="nb-chip nb-chip--sm" data-docs-copy>Copy HTML</button></details>`;
  fig.querySelectorAll('.nb-dark [id]').forEach(x => { x.id += '-dark'; });
  fig.querySelectorAll('.nb-dark [for]').forEach(x => { x.htmlFor += '-dark'; });
  fig.querySelectorAll('.nb-dark [aria-labelledby]').forEach(x => { x.setAttribute('aria-labelledby', x.getAttribute('aria-labelledby').split(' ').map(v => v + '-dark').join(' ')); });
  fig.querySelectorAll('.nb-dark [aria-describedby]').forEach(x => { x.setAttribute('aria-describedby', x.getAttribute('aria-describedby').split(' ').map(v => v + '-dark').join(' ')); });
  fig.querySelectorAll('.nb-dark input[name]').forEach(x => { x.name += '-dark'; });
  fig.querySelector('[data-docs-copy]').addEventListener('click', async () => toast(await copy(html) ? 'HTML copied' : 'Copy failed: select it by hand'));
  tpl.replaceWith(fig);
});

// Swatches and hatch samples get their backgrounds through the CSSOM (inline style attributes are blocked by the CSP).
document.querySelectorAll('[data-swatch]').forEach(el => { el.style.background = `var(--nb-${el.dataset.swatch})`; });
document.querySelectorAll('[data-hatch]').forEach(el => { el.style.background = { a: 'var(--nb-hatch-a)', b: 'var(--nb-hatch-b)', solid: 'var(--nb-ink)' }[el.dataset.hatch]; });

// Live demos: segmented and option buttons toggle; day cells cycle; hold opens the sheet
document.addEventListener('click', e => {
  const seg = e.target.closest('.nb-segmented > button, .nb-options > button');
  if (seg && !seg.closest('[data-docs-prefs]')) {
    const attr = seg.hasAttribute('aria-checked') ? 'aria-checked' : 'aria-pressed';
    seg.parentElement.querySelectorAll('button').forEach(b => b.setAttribute(attr, String(b === seg)));
  }
  const cell = e.target.closest('[data-docs-live] .nb-cell:not(:disabled)');
  if (cell) {
    const order = ['', 'M', 'A', 'E', null];
    if (!cell.classList.contains('nb-cell--mine')) { cell.classList.add('nb-cell--mine'); cell.setAttribute('aria-pressed', 'true'); }
    else {
      const tags = cell.querySelector('.nb-cell__tags'), cur = tags?.textContent || '', next = order[order.indexOf(cur) + 1];
      tags?.remove();
      if (next === null || next === undefined) { cell.classList.remove('nb-cell--mine', 'nb-cell--maybe'); cell.querySelector('.nb-cell__q')?.remove(); cell.setAttribute('aria-pressed', 'false'); }
      else if (next) cell.insertAdjacentHTML('beforeend', `<span class="nb-cell__tags">${next}</span>`);
    }
  }
  const open = e.target.closest('[data-docs-open]');
  if (open) overlay(document.getElementById(open.dataset.docsOpen));
  if (e.target.closest('[data-docs-toast]')) toast('Message copied');
});
document.querySelectorAll('[data-docs-live]').forEach(el => onHold(el, '.nb-cell:not(:disabled)', cell => {
  const sheet = document.getElementById('demo-sheet');
  if (!sheet) return;
  sheet.querySelector('.nb-sheet__title').textContent = cell.getAttribute('aria-label').split(',').slice(0, 2).join(',');
  overlay(sheet);
}));

// Display settings demo (accessibility page): applies to the whole docs site for this tab
const panel = document.querySelector('[data-docs-prefs]');
if (panel) {
  const sync = () => {
    const p = prefs.read('nb-docs-display');
    panel.querySelectorAll('[data-key][data-value]').forEach(b => b.setAttribute('aria-pressed', String(String(p[b.dataset.key]) === b.dataset.value)));
    panel.querySelectorAll('input[data-key]').forEach(i => { i.checked = !!p[i.dataset.key]; });
  };
  panel.addEventListener('click', e => {
    const b = e.target.closest('[data-key][data-value]'); if (!b) return;
    const p = prefs.read('nb-docs-display'); p[b.dataset.key] = b.dataset.key === 'size' ? Number(b.dataset.value) : b.dataset.value;
    prefs.apply(p, 'nb-docs-display'); sync();
  });
  panel.addEventListener('change', e => {
    const i = e.target.closest('input[data-key]'); if (!i) return;
    const p = prefs.read('nb-docs-display'); p[i.dataset.key] = i.checked; prefs.apply(p, 'nb-docs-display'); sync();
  });
  panel.querySelector('[data-docs-reset]')?.addEventListener('click', () => { prefs.apply({ ...prefs.defaults }, 'nb-docs-display'); sync(); });
  sync();
}
