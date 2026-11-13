import { esc } from '../src/js/nb.js';
import { icons, iconNames } from './icons.js';

export default {
  title: 'Buttons/Button',
  args: { label: 'Create my link', variant: 'primary', block: false, icon: 'none', iconPosition: 'leading', disabled: false },
  argTypes: {
    variant: { control: 'inline-radio', options: ['primary', 'secondary'] },
    icon: { control: 'select', options: iconNames },
    iconPosition: { control: 'inline-radio', options: ['leading', 'trailing'] },
  },
  render: ({ label, variant, block, icon, iconPosition, disabled }) => {
    const cls = ['nb-button', variant === 'secondary' && 'nb-button--secondary', block && 'nb-button--block', iconPosition === 'trailing' && 'nb-button--trailing'].filter(Boolean).join(' ');
    return `<div class="story-frame"><button class="${cls}"${disabled ? ' disabled' : ''}>${icons[icon]}${esc(label)}</button></div>`;
  },
  parameters: { docs: { description: { component: 'One primary action per screen. Primary buttons are 60px tall; everything is at least 44px.' } } },
};

export const Primary = {};
export const Secondary = { args: { variant: 'secondary', label: 'Copy the words', icon: 'copy', block: true } };
export const InTheDock = { args: { label: 'Send to someone', icon: 'right', iconPosition: 'trailing', block: true } };
export const WithIcon = { args: { label: 'Send the link', icon: 'share', block: true } };
export const Disabled = { args: { label: 'Lock in this day', disabled: true } };

export const TextButton = {
  args: { label: 'Change my days', icon: 'left' },
  render: ({ label, icon }) => `<button class="nb-text-button">${icons[icon]}${esc(label)}</button>`,
};

export const IconButton = {
  args: { icon: 'close', label: 'Close' },
  argTypes: { icon: { control: 'select', options: iconNames.filter(n => n !== 'none') }, label: { name: 'aria-label' } },
  render: ({ icon, label }) => `<button class="nb-icon-button" aria-label="${esc(label)}">${icons[icon]}</button>`,
};

export const Chip = {
  args: { label: 'Display', icon: 'settings', small: false },
  render: ({ label, icon, small }) => `<button class="nb-chip${small ? ' nb-chip--sm' : ''}">${icons[icon]}<span>${esc(label)}</span></button>`,
};
