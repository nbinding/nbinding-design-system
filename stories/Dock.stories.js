import { esc } from '../src/js/nb.js';
import { icons } from './icons.js';

export default {
  title: 'Dock/Dock',
  args: { summary: '3 days match', detail: 'Sat 21, Wed 25, Sat 28', action: 'Send back to Sam', error: '' },
  render: ({ summary, detail, action, error }) => `<div class="story-frame"><div class="nb-dock"><div class="nb-dock__row"><strong class="nb-dock__summary">${esc(summary)}</strong>${detail ? `<span class="nb-dock__detail">${esc(detail)}</span>` : ''}</div>
    ${error ? `<p class="nb-field__error" role="alert">${esc(error)}</p>` : ''}<button class="nb-button nb-button--block nb-button--trailing">${esc(action)}${icons.right}</button></div></div>`,
  parameters: { docs: { description: { component: 'Sticky at the bottom of a working screen: the count, a detail and the one next action. Focused items are kept clear of it.' } } },
};

export const WithSummary = {};
export const Empty = { args: { summary: 'No days yet', detail: 'Tap a day to start', action: 'Send to someone' } };
export const WithError = { args: { summary: 'No days yet', detail: '', action: 'Send to someone', error: 'Tap at least one day you are free.' } };
