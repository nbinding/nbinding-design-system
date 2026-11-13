import { esc } from '../src/js/nb.js';
import { icons } from './icons.js';

export default {
  title: 'Content/Sharing steps',
  args: { message: "Can we find a day for dinner? Here's when I'm free. Add yours and send it back.", words: 'orbit-forest-wren' },
  render: ({ message, words }) => `<div class="story-frame"><div class="nb-beat"><p class="nb-beat__head"><span class="nb-beat__n">1</span>Your days</p><p class="nb-preview">${esc(message)}</p><button class="nb-button nb-button--block">${icons.share}Send the link</button></div>
    <div class="nb-beat"><p class="nb-beat__head"><span class="nb-beat__n">2</span>The words that open it</p><p class="nb-words">${esc(words)}</p><p class="nb-small">Send these in a separate message, or just say them.</p><button class="nb-button nb-button--secondary nb-button--block">${icons.copy}Copy the words</button></div></div>`,
  parameters: { docs: { description: { component: 'Blocks for sharing, explaining and listing.' } } },
};

export const SharingSteps = {};

export const ReplyCode = { args: { code: 'PD' }, render: ({ code }) => `<p class="nb-code-box">Your reply code: <strong>${esc(code)}</strong></p>` };

export const Disclosure = {
  args: { summary: 'Show the link', open: false },
  render: ({ summary, open }) => `<div class="story-frame"><details class="nb-disclosure"${open ? ' open' : ''}><summary>${esc(summary)}</summary><textarea class="nb-textarea nb-textarea--mono" readonly rows="3" aria-label="Link">https://nbinding.github.io/calshare/#abc.def</textarea></details></div>`,
};

export const ListRows = {
  render: () => `<div class="story-frame"><ul class="nb-list"><li class="nb-list__row"><a class="nb-list__main" href="#"><strong>Dinner</strong><small>Settled: Sat 21 Nov</small></a><button class="nb-text-button">Forget</button></li>
    <li class="nb-list__row"><span class="nb-list__main"><strong>Sam · PD</strong></span><span class="nb-list__aside">2 days free</span></li></ul></div>`,
};

export const HowItWorks = {
  render: () => `<div class="story-frame"><ol class="nb-steps"><li><span class="nb-steps__n">1</span><div><h3>You share</h3><p>Pick the days you're free and send the link.</p></div></li><li><span class="nb-steps__n">2</span><div><h3>They add theirs</h3><p>They mark their days and send it back.</p></div></li></ol></div>`,
};

export const SectionLabel = { args: { label: 'Your plans' }, render: ({ label }) => `<p class="nb-section">${esc(label)}</p>` };
export const PrivacyLine = { render: () => `<p class="nb-privacy">${icons.lock}<span>Encrypted in your browser. Nothing is sent to a server.</span></p>` };
export const Card = { render: () => `<div class="story-frame"><div class="nb-card"><p class="nb-h3">Planning with a group?</p><p class="nb-small">Everyone gets the same link and replies to you separately.</p></div></div>` };
