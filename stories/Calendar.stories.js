import { calendar, esc } from '../src/js/nb.js';

const mine = { '2026-11-20': {}, '2026-11-21': {}, '2026-11-25': { times: 'E' }, '2026-11-27': { times: 'M', maybe: true } };
const theirs = { '2026-11-14': {}, '2026-11-21': {}, '2026-11-25': {}, '2026-11-28': { maybe: true } };

export default {
  title: 'Calendar/Month',
  args: { month: '2026-11', today: '2026-11-13', showTheirs: false, lead: "Tap the days you're free." },
  argTypes: { month: { control: 'text' }, today: { control: 'text' } },
  render: ({ month, today, showTheirs, lead }) => `<div class="story-frame">${calendar({ month, today, days: mine, theirs: showTheirs ? theirs : {}, lead })}</div>`,
  parameters: { docs: { description: { component: 'Rendered with `calendar()` from nb.js. Yours are hatched one way, theirs the other, both solid; times as letters; maybes dotted with "?".' } } },
};

export const MarkingDays = {};
export const TheOverlap = {
  args: { showTheirs: true, lead: 'Sam is free on 4 days. Tap the ones you can do.' },
  render: args => `${default_render(args)}<ul class="nb-key" aria-label="Key"><li><span class="nb-swatch nb-swatch--theirs"></span>Sam</li><li><span class="nb-swatch nb-swatch--mine"></span>You</li><li><span class="nb-swatch nb-swatch--both"></span>Both of you</li><li><span class="nb-swatch nb-swatch--maybe">?</span>Maybe</li></ul>`,
};
function default_render({ month, today, showTheirs, lead }) { return `<div class="story-frame">${calendar({ month, today, days: mine, theirs: showTheirs ? theirs : {}, lead })}</div>`; }

export const Picking = {
  render: ({ month, today }) => `<div class="story-frame">${calendar({ month, today, mode: 'pick', choosable: { '2026-11-21': {}, '2026-11-25': { times: 'E' }, '2026-11-28': { maybe: true } }, chosen: ['2026-11-21'] })}</div>`,
};

export const GroupCounts = {
  render: ({ month, today }) => `<div class="story-frame">${calendar({ month, today, mode: 'pick', choosable: { '2026-11-20': {}, '2026-11-21': {}, '2026-11-22': {} }, chosen: ['2026-11-21'], counts: { '2026-11-20': '2/4', '2026-11-21': '4/4', '2026-11-22': '2/4' } })}</div>`,
};

const STATES = {
  free: ['', 'Free to mark'], mine: ['nb-cell--mine', "You're free"], theirs: ['nb-cell--theirs', "They're free"], both: ['nb-cell--both', 'Both free'],
  maybe: ['nb-cell--mine nb-cell--maybe', "You're free, maybe"], 'both maybe': ['nb-cell--both nb-cell--maybe', 'Both free, maybe'],
  choosable: ['nb-cell--choosable', 'Can choose'], chosen: ['nb-cell--chosen', 'Chosen'], past: ['nb-cell--past', 'Past'], today: ['nb-cell--today', 'Today'],
};
export const DayCell = {
  args: { state: 'mine', day: 21, times: '', count: '' },
  argTypes: { state: { control: 'select', options: Object.keys(STATES) }, times: { control: 'inline-radio', options: ['', 'M', 'A', 'E', 'ME'] } },
  render: ({ state, day, times, count }) => {
    const [cls, label] = STATES[state], maybe = cls.includes('maybe'), tag = count || times;
    return `<div class="nb-cal__grid sb-cell"><button class="nb-cell ${cls}" aria-label="${esc(label)}"${state === 'past' ? ' disabled' : ''}><span class="nb-cell__num">${Number(day)}</span>${tag ? `<span class="nb-cell__tags">${esc(tag)}</span>` : ''}${maybe ? '<span class="nb-cell__q" aria-hidden="true">?</span>' : ''}</button></div><style>.sb-cell{max-width:340px}</style>`;
  },
};

export const Key = {
  render: () => `<ul class="nb-key" aria-label="Key"><li><span class="nb-swatch nb-swatch--theirs"></span>Them</li><li><span class="nb-swatch nb-swatch--mine"></span>You</li><li><span class="nb-swatch nb-swatch--both"></span>Both</li><li><span class="nb-swatch nb-swatch--maybe">?</span>Maybe</li><li><span class="nb-swatch nb-swatch--choosable"></span>Can choose</li></ul>`,
};
