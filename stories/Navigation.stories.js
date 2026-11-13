import { mark, esc } from '../src/js/nb.js';
import { icons } from './icons.js';

export default {
  title: 'Navigation/Stepper',
  args: { steps: 'Sam shares, Alex adds days, Sam picks, Alex confirms', current: 2 },
  argTypes: { current: { control: { type: 'range', min: 1, max: 5 } } },
  render: ({ steps, current }) => `<div class="story-wide"><ol class="nb-stepper" aria-label="Progress">${steps.split(',').map((s, i) => `<li${i + 1 < current ? ' data-state="done"' : ''}${i + 1 === current ? ' aria-current="step"' : ''}>${esc(s.trim())}</li>`).join('')}</ol></div>`,
  parameters: { docs: { description: { component: 'Shows whose turn it is. The current step has aria-current="step".' } } },
};

export const Stepper = {};

export const TopBar = {
  args: { showPlans: true },
  render: ({ showPlans }) => `<div class="story-wide"><header class="nb-topbar"><a class="nb-brand" href="#">${mark()}<span>calshare</span></a><div class="nb-topbar__actions">${showPlans ? '<a class="nb-chip" href="#">Your plans</a>' : ''}<button class="nb-chip" aria-label="Display and accessibility settings">${icons.settings}<span>Display</span></button></div></header></div>`,
};

export const Breadcrumb = {
  args: { section: 'Step 2 of 4' },
  render: ({ section }) => `<nav class="nb-breadcrumb" aria-label="Breadcrumb">Calshare <span aria-hidden="true">/</span> <strong>${esc(section)}</strong></nav>`,
};

export const Sidebar = {
  args: { current: 2 },
  argTypes: { current: { control: { type: 'range', min: 1, max: 4 } } },
  render: ({ current }) => {
    const steps = [['Sam shares', 'Marks free days and sends the link'], ['Alex adds days', 'Marks theirs and sends it back'], ['Sam picks', 'Chooses from the shared days'], ['Alex confirms', 'Locks in the final days']];
    return `<nav class="nb-sidebar" aria-label="Plan steps"><a class="nb-brand nb-brand--lg" href="#">${mark(32)}<span>calshare</span></a><p class="nb-sidebar__label">Private, day-level scheduling</p>
      <ol class="nb-nav">${steps.map(([t, d], i) => `<li><span class="nb-nav__item"${i + 1 === current ? ' aria-current="step"' : ''}><span class="nb-nav__num">${i + 1 < current ? '✓' : String(i + 1).padStart(2, '0')}</span><span><strong>${t}</strong><small>${d}</small></span></span></li>`).join('')}</ol>
      <progress class="nb-progress" value="${current - 1}" max="4" aria-label="Steps done">${current - 1} of 4</progress></nav>`;
  },
};

export const Progress = {
  args: { value: 2, max: 4 },
  render: ({ value, max }) => `<div class="story-frame"><progress class="nb-progress" value="${Number(value)}" max="${Number(max)}" aria-label="Steps done">${value} of ${max}</progress></div>`,
};

export const StepperBars = {
  args: { current: 3 },
  argTypes: { current: { control: { type: 'range', min: 1, max: 7 } } },
  render: ({ current }) => {
    const s = ['The two of you', 'Children', 'Home', 'Savings', 'Pensions', 'Income', 'After the order'];
    return `<div class="story-frame"><p class="nb-small"><strong>Section ${current} of 7 · ${s[current - 1]}</strong></p><ol class="nb-stepper nb-stepper--bars" aria-label="Sections">${s.map((t, i) => `<li${i + 1 < current ? ' data-state="done"' : ''}${i + 1 === current ? ' aria-current="step"' : ''}><span class="nb-sr-only">${t}${i + 1 < current ? ', done' : ''}</span></li>`).join('')}</ol></div>`;
  },
};

export const TabBar = {
  args: { current: 'Journey' },
  argTypes: { current: { control: 'inline-radio', options: ['Journey', 'D81', 'Form A', 'Order'] } },
  render: ({ current }) => `<div class="story-frame"><nav class="nb-tabbar" aria-label="Stead">${[['Journey', 'journey'], ['D81', 'sums'], ['Form A', 'form'], ['Order', 'scales']].map(([t, i]) => `<a class="nb-tabbar__item" href="#"${t === current ? ' aria-current="page"' : ''}>${icons[i]}${t}</a>`).join('')}</nav></div>`,
};
