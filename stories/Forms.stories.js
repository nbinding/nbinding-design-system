import { esc } from '../src/js/nb.js';
import { icons } from './icons.js';

export default {
  title: 'Forms/Field',
  args: { label: 'Your name', placeholder: 'e.g. Sam', value: '', optional: false, hint: '', error: '' },
  render: ({ label, placeholder, value, optional, hint, error }) => `<div class="story-frame"><div class="nb-field">
    <label class="nb-field__label" for="f1">${esc(label)}${optional ? ' <small>Optional</small>' : ''}</label>
    <input class="nb-input" id="f1" placeholder="${esc(placeholder)}" value="${esc(value)}"${error ? ' aria-invalid="true"' : ''}${hint || error ? ' aria-describedby="f1-d"' : ''}>
    ${error ? `<p class="nb-field__error" id="f1-d">${esc(error)}</p>` : hint ? `<p class="nb-field__hint" id="f1-d">${esc(hint)}</p>` : ''}
  </div></div>`,
  parameters: { docs: { description: { component: 'Labels above fields, hints below, errors in words. Fields sit on the panel colour without borders.' } } },
};

export const TextField = {};
export const WithHint = { args: { label: "What's it for?", optional: true, placeholder: 'Dinner, a call, the hike', hint: 'Shown at the top of the plan.' } };
export const WithError = { args: { label: 'Passphrase', value: 'oak', error: 'Use a passphrase of at least 6 characters.' } };

export const InputWithButton = {
  args: { value: 'orbit-forest-wren' },
  render: ({ value }) => `<div class="story-frame"><div class="nb-field"><span class="nb-field__label" id="w-l">The words that open it</span>
    <div class="nb-input-row"><input class="nb-input nb-input--mono" aria-labelledby="w-l" value="${esc(value)}"><button class="nb-icon-button" aria-label="Suggest new words">${icons.dice}</button></div></div></div>`,
};

export const Select = {
  render: () => `<div class="story-frame"><label class="nb-field"><span class="nb-field__label">Starting</span><select class="nb-select"><option>November 2026</option><option>December 2026</option></select></label></div>`,
};

export const Textarea = {
  args: { value: 'Can we find a day for dinner?' },
  render: ({ value }) => `<div class="story-frame"><label class="nb-field"><span class="nb-field__label">Message</span><textarea class="nb-textarea" rows="4">${esc(value)}</textarea></label></div>`,
};

export const Segmented = {
  args: { options: 'One person, A group', selected: 0 },
  argTypes: { selected: { control: { type: 'number', min: 0 } } },
  render: ({ options, selected }) => `<div class="story-frame"><div class="nb-field"><span class="nb-field__label" id="s-l">Who's it for?</span>
    <div class="nb-segmented" role="radiogroup" aria-labelledby="s-l">${options.split(',').map((o, i) => `<button role="radio" aria-checked="${i === selected}">${esc(o.trim())}</button>`).join('')}</div></div></div>`,
};

export const OptionTiles = {
  args: { selected: 100 },
  argTypes: { selected: { control: 'inline-radio', options: [100, 115, 130, 150] } },
  render: ({ selected }) => `<div class="story-frame"><fieldset class="nb-field"><legend class="nb-field__label">Text size</legend><div class="nb-options">
    ${[[100, 'Standard'], [115, 'Large'], [130, 'Larger'], [150, 'Largest']].map(([v, l]) => `<button aria-pressed="${v === selected}">${l}<small>${v}%</small></button>`).join('')}</div></fieldset></div>`,
};

export const Toggle = {
  args: { title: 'Help with dates', description: 'Show the weekday inside every day and label today.', checked: true },
  render: ({ title, description, checked }) => `<div class="story-frame"><label class="nb-toggle"><input type="checkbox"${checked ? ' checked' : ''}><span class="nb-toggle__text"><strong>${esc(title)}</strong><small>${esc(description)}</small></span></label></div>`,
};

export const ChoiceRows = {
  args: { type: 'checkbox' },
  argTypes: { type: { control: 'inline-radio', options: ['checkbox', 'radio'] } },
  render: ({ type }) => `<div class="story-frame"><ul class="nb-choices">
    <li><label class="nb-choice"><input type="${type}" name="c" checked><span class="nb-choice__text"><strong>Saturday, 21 November</strong><small>Any time (maybe)</small></span></label></li>
    <li><label class="nb-choice"><input type="${type}" name="c"><span class="nb-choice__text"><strong>Friday, 27 November</strong><small>Morning</small></span></label></li></ul></div>`,
};
