import { esc, terms } from '../src/js/nb.js';

export default {
  title: 'Documents/Paper preview',
  args: { court: '', address: '' },
  render: ({ court, address }) => {
    const gap = (v, label) => v ? esc(v) : `<span class="nb-gap">${label}</span>`;
    return `<div class="story-frame"><article class="nb-document" aria-label="Draft consent order"><h2 class="nb-document__title">In the Family Court</h2><p class="nb-document__centre">sitting at ${gap(court, 'court')}</p>
      <h2 class="nb-document__title">Order</h2><p class="nb-document__para"><span>1.</span><span>The family home at ${gap(address, 'address')} shall be sold, and the net proceeds divided equally.</span></p>
      <p class="nb-document__para nb-document__para--later"><span>2.</span><span>Lump sum, pensions and a clean break follow once those sections are done.</span></p></article></div>`;
  },
  parameters: { docs: { description: { component: 'Drafts in formal wording, as paper. Paper stays light in dark mode. Gaps still to fill are dotted with a plain label; fill the controls to see them filled.' } } },
};

export const PaperPreview = {};
export const Filled = { args: { court: 'the Central Family Court', address: '14 Elm Road, Leeds' } };

export const Term = {
  args: { word: 'longstop date', explanation: 'The latest date something must happen by, even if the earlier date slips.' },
  render: ({ word, explanation }) => {
    const el = document.createElement('div');
    el.className = 'story-frame';
    el.innerHTML = `<p>The order needs a <button class="nb-term" data-nb-term aria-expanded="false" aria-controls="st-term">${esc(word)}</button><span class="nb-term-pop" id="st-term" role="note" hidden><strong>${esc(word[0].toUpperCase() + word.slice(1))}</strong>${esc(explanation)}</span> in case the sale is delayed.</p>`;
    terms(el);
    return el;
  },
  parameters: { docs: { description: { story: 'Tap the dotted word. Escape, a second tap or a tap elsewhere closes it. Needs `terms()` from nb.js.' } } },
};
