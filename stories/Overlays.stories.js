import { esc, overlay } from '../src/js/nb.js';
import { icons } from './icons.js';

export default {
  title: 'Overlays/Sheet',
  args: { title: 'Saturday, 21 November' },
  render: ({ title }) => `<div class="story-frame"><div class="nb-sheet nb-sheet--inline" role="group" aria-labelledby="sh-t"><div class="nb-sheet__grip" aria-hidden="true"></div><h2 class="nb-sheet__title" id="sh-t">${esc(title)}</h2>
    <div class="nb-stack"><div class="nb-segmented" role="group" aria-label="Time"><button aria-pressed="true">Any time</button><button aria-pressed="false">Morning</button><button aria-pressed="false">Afternoon</button><button aria-pressed="false">Evening</button></div>
    <div class="nb-segmented" role="group" aria-label="How sure"><button aria-pressed="true">Free</button><button aria-pressed="false">? Maybe</button></div><button class="nb-button nb-button--block">Done</button></div></div></div>`,
  parameters: { docs: { description: { component: 'Sheets and dialogs trap focus, close with Escape and return focus. Open them with `overlay()` from nb.js. Shown in place here; the Open stories use the real thing.' } } },
};

export const Sheet = {};

export const OpenASheet = {
  render: () => {
    const el = document.createElement('div');
    el.innerHTML = `<button class="nb-button nb-button--secondary">Open sheet</button>
      <div class="nb-sheet" role="dialog" aria-modal="true" aria-labelledby="os-t" hidden><div class="nb-sheet__grip" aria-hidden="true"></div><h2 class="nb-sheet__title" id="os-t">Times and maybes</h2><p class="nb-small">Escape or Done closes this and returns focus.</p><p></p><button class="nb-button nb-button--block" data-nb-close data-nb-autofocus>Done</button></div>`;
    el.querySelector('button').addEventListener('click', () => overlay(el.querySelector('.nb-sheet')));
    return el;
  },
};

export const Dialog = {
  args: { title: 'Display and accessibility' },
  render: ({ title }) => `<div class="story-frame"><div class="nb-dialog nb-dialog--inline" role="group" aria-labelledby="dl-t"><div class="nb-dialog__head"><h2 class="nb-dialog__title" id="dl-t">${esc(title)}</h2><button class="nb-icon-button" aria-label="Close">${icons.close}</button></div>
    <p class="nb-small">Make it comfortable for you. Settings last for this tab.</p><div class="nb-dialog__actions"><button class="nb-button nb-button--secondary">Reset</button><button class="nb-button">Done</button></div></div></div>`,
};

export const Toast = {
  args: { message: 'Message copied' },
  render: ({ message }) => `<span class="nb-toast nb-toast--inline" role="status">${esc(message)}</span>`,
};

export const Note = {
  args: { variant: 'info', title: 'This is an older link.', body: 'You already have a later step saved on this device.' },
  argTypes: { variant: { control: 'inline-radio', options: ['info', 'error'] } },
  render: ({ variant, title, body }) => `<div class="story-frame"><div class="nb-note${variant === 'error' ? ' nb-note--error' : ''}"${variant === 'error' ? ' role="alert"' : ''}><p><strong>${esc(title)}</strong> ${esc(body)}</p>${variant === 'info' ? '<button class="nb-text-button">Open the latest</button>' : ''}</div></div>`,
};
