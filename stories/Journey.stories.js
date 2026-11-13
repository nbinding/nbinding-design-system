import { esc } from '../src/js/nb.js';
import { icons } from './icons.js';

const STEPS = ['Put your agreement in writing', 'Gather your figures', 'Decide when the home changes hands', 'Update wills and nominations', 'Draft the consent order'];
const mark = (state, n) => state === 'done' ? `<span class="nb-status nb-status--done" role="img" aria-label="Done">${icons.tick}</span>`
  : state === 'later' ? '<span class="nb-status nb-status--later" role="img" aria-label="Come back to this">?</span>'
  : `<span class="nb-status${state === 'now' ? ' nb-status--now' : ''}">${n}</span>`;

export default {
  title: 'Journey/Timeline',
  args: { current: 3, phase: 'Before the Conditional Order' },
  argTypes: { current: { control: { type: 'range', min: 1, max: 5 } } },
  render: ({ current, phase }) => `<div class="story-frame"><ol class="nb-timeline" aria-label="Steps">${phase ? `<li class="nb-timeline__phase">${esc(phase)}</li>` : ''}${STEPS.map((t, i) => {
    const n = i + 1, state = n < current ? 'done' : n === current ? 'now' : '';
    return `<li class="nb-timeline__item${state === 'done' ? ' nb-timeline__item--done' : ''}"${state === 'now' ? ' aria-current="step"' : ''}>${mark(state, n)}<span><span class="nb-timeline__title">${esc(t)}</span>${state === 'now' ? '<span class="nb-timeline__detail">You are here</span>' : ''}</span></li>`;
  }).join('')}</ol></div>`,
  parameters: { docs: { description: { component: 'Status reads by shape: a plain number (to do), a ring (now), solid with a tick (done), dotted with "?" (come back to this).' } } },
};

export const Timeline = {};

export const StatusMarks = {
  render: () => `<p class="nb-row">${mark('', 4)}${mark('now', 3)}${mark('done')}${mark('later')}</p>`,
};

export const Badges = {
  args: { variant: 'solid', icon: 'tick' },
  argTypes: { variant: { control: 'inline-radio', options: ['plain', 'solid', 'ring', 'dashed'] }, icon: { control: 'select', options: ['tick', 'question', 'speech', 'cross', 'download', 'info'] } },
  render: ({ variant, icon }) => `<span class="nb-badge${variant === 'plain' ? '' : ` nb-badge--${variant}`}">${icons[icon]}</span>`,
};

export const IconList = {
  render: () => `<div class="story-frame"><ul class="nb-icon-list" aria-label="What the judge can do">
    <li><span class="nb-badge nb-badge--solid">${icons.tick}</span><div><h3>Approves</h3><p>The order is sealed and binds you both.</p><p class="nb-icon-list__then">Go to step 13.</p></div></li>
    <li><span class="nb-badge nb-badge--ring">${icons.question}</span><div><h3>Asks questions</h3><p>A figure needs explaining or a clause rewording.</p><p class="nb-icon-list__then">Reply in writing by the date given.</p></div></li>
    <li><span class="nb-badge nb-badge--dashed">${icons.speech}</span><div><h3>Lists a short hearing</h3><p>Usually brief, to understand something in person.</p></div></li>
    <li><span class="nb-badge">${icons.cross}</span><div><h3>Refuses</h3><p>Rare when the figures are full.</p><p class="nb-icon-list__then">Amend and resubmit.</p></div></li></ul></div>`,
};

export const Answers = {
  args: { skipped: true },
  render: ({ skipped }) => `<div class="story-frame"><dl class="nb-answers">
    <div class="nb-answers__row"><dt><span class="nb-status nb-status--sm nb-status--done" role="img" aria-label="Answered">${icons.tick}</span>Value today</dt><dd>£425,000</dd></div>
    <div class="nb-answers__row"><dt><span class="nb-status nb-status--sm nb-status--done" role="img" aria-label="Answered">${icons.tick}</span>Mortgage still owed</dt><dd>£182,400</dd></div>
    ${skipped ? `<div class="nb-answers__row"><dt><span class="nb-status nb-status--sm nb-status--later" role="img" aria-label="Come back to this">?</span><span>Early repayment charge<small>You chose to come back to this</small></span></dt><dd><a href="#">Answer</a></dd></div>` : ''}</dl></div>`,
};

export const DatedList = {
  render: () => `<div class="story-frame"><ul class="nb-dates">
    <li><span class="nb-when" aria-hidden="true"><b>9</b><span>Apr</span></span><span><span class="nb-sr-only">9 April: </span><strong>Home goes on the market</strong><small>Within 28 days of the order</small></span></li>
    <li><span class="nb-when" aria-hidden="true"><b>30</b><span>Apr</span></span><span><span class="nb-sr-only">30 April: </span><strong>Lump sum of £40,000 to Alex</strong><small>From Sam, by bank transfer</small></span></li>
    <li><span class="nb-when" aria-hidden="true"><b>12</b><span>Sep</span></span><span><span class="nb-sr-only">12 September: </span><strong>Longstop date for the sale</strong><small>If unsold, either of you can apply to the court</small></span></li></ul></div>`,
};
