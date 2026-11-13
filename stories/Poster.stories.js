import { esc } from '../src/js/nb.js';

const day = (iso, note, people) => {
  const d = new Date(`${iso}T00:00:00Z`);
  const fmt = o => d.toLocaleDateString('en-GB', { ...o, timeZone: 'UTC' });
  return `<li><h2 class="nb-sr-only">${fmt({ weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</h2>
    <span class="nb-poster__line" aria-hidden="true">${fmt({ weekday: 'long' })}</span><span class="nb-poster__day" aria-hidden="true">${d.getUTCDate()}</span><span class="nb-poster__line" aria-hidden="true">${fmt({ month: 'long', year: 'numeric' })}</span>
    ${note ? `<p class="nb-poster__note">${esc(note)}</p>` : ''}${people ? `<p class="nb-poster__note">${esc(people)}</p>` : ''}</li>`;
};

export default {
  title: 'Poster/Settled date',
  args: { what: 'Dinner · Sam & Alex', date: '2026-11-21', note: 'Evening', people: '' },
  argTypes: { date: { control: 'text' } },
  render: ({ what, date, note, people }) => `<div class="story-frame"><div class="nb-poster"><p class="nb-poster__what">${esc(what)}</p><ul class="nb-poster__days">${day(date, note, people)}</ul><div class="nb-poster__hatch" aria-hidden="true"></div></div></div>`,
  parameters: { docs: { description: { component: 'The settled date as something worth keeping. Dark in light mode, light in dark mode.' } } },
};

export const OneDay = {};
export const Group = { args: { what: 'Hike · 4 people', note: '4 of 4 can make it', people: 'Nat, Sam · PD, Sam · 68, Jo' } };
export const SeveralDays = {
  render: () => `<div class="story-frame"><div class="nb-poster nb-poster--multi"><p class="nb-poster__what">Hike · 2 days</p><ul class="nb-poster__days">${day('2026-11-21', 'Any time')}${day('2026-11-25', 'Evening (still a maybe)')}</ul><div class="nb-poster__hatch" aria-hidden="true"></div></div></div>`,
};

export const Sealed = {
  render: () => `<div class="story-frame"><div class="nb-poster"><div class="nb-poster__seal" aria-hidden="true"></div><p class="nb-poster__what">Consent order sealed · Sam &amp; Alex</p><ul class="nb-poster__days">${day('2027-03-12', 'Binding on you both from today.')}</ul></div></div>`,
  parameters: { docs: { description: { story: 'A seal instead of the hatch, for something made official.' } } },
};
