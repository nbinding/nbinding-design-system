import '../src/nb.css';
import './preview.css';

// Toolbar switches apply the same data attributes as the reader's display settings (see src/js/nb.js prefs).
export const globalTypes = {
  theme: { description: 'Theme', toolbar: { title: 'Theme', icon: 'mirror', items: [{ value: 'light', title: 'Light' }, { value: 'dark', title: 'Dark' }], dynamicTitle: true } },
  textSize: { description: 'Text size', toolbar: { title: 'Text size', icon: 'zoom', items: [{ value: '100', title: '100%' }, { value: '115', title: '115%' }, { value: '130', title: '130%' }, { value: '150', title: '150%' }], dynamicTitle: true } },
  font: { description: 'Reading font', toolbar: { title: 'Font', icon: 'paragraph', items: [{ value: 'default', title: 'Original' }, { value: 'sans', title: 'Plain sans' }, { value: 'dyslexic', title: 'OpenDyslexic' }], dynamicTitle: true } },
  dateHelp: { description: 'Help with dates', toolbar: { title: 'Help with dates', icon: 'calendar', items: [{ value: 'false', title: 'Off' }, { value: 'true', title: 'On' }], dynamicTitle: true } },
};
export const initialGlobals = { theme: 'light', textSize: '100', font: 'default', dateHelp: 'false' };

export const decorators = [
  (story, { globals }) => {
    const root = document.documentElement;
    root.dataset.theme = globals.theme;
    root.style.setProperty('--nb-text-scale', Number(globals.textSize) / 100);
    root.dataset.nbFont = globals.font;
    root.dataset.nbDateHelp = globals.dateHelp;
    return story();
  },
];

export const parameters = {
  layout: 'padded',
  controls: { expanded: true, matchers: { color: /(background|color)$/i } },
  a11y: { test: 'error' },
  options: { storySort: { order: ['Introduction', 'Foundations', 'Brand', 'Buttons', 'Forms', 'Calendar', 'Navigation', 'Dock', 'Overlays', 'Content', 'Poster'] } },
};

export const tags = ['autodocs'];
