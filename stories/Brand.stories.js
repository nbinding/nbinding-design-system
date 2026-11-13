import { mark, esc } from '../src/js/nb.js';

export default {
  title: 'Brand/Wordmark',
  args: { name: 'calshare', size: 'md' },
  argTypes: { size: { control: 'inline-radio', options: ['md', 'lg'] }, name: { control: 'text' } },
  render: ({ name, size }) => `<a class="nb-brand${size === 'lg' ? ' nb-brand--lg' : ''}" href="#">${mark(size === 'lg' ? 32 : 26)}<span>${esc(name)}</span></a>`,
  parameters: { docs: { description: { component: 'The mark is a square hatched both ways: the overlap the system is built around. It inherits the text colour.' } } },
};

export const Wordmark = {};
export const Large = { args: { size: 'lg' } };
export const MarkOnly = {
  render: () => `<div class="nb-row">${mark(26)}${mark(40)}${mark(64)}</div>`,
  parameters: { docs: { description: { story: 'Decorative. Pair it with a visible or visually hidden name.' } } },
};
