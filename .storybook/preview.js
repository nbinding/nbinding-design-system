import '../src/nb.css';
import './preview.css';

// Toolbar switches apply the same data attributes as the reader's display settings (see src/js/nb.js prefs).
export const globalTypes = {
  app: { description: 'App look', toolbar: { title: 'App', icon: 'component', items: [{ value: 'calshare', title: 'Calshare' }, { value: 'stead', title: 'Stead' }], dynamicTitle: true } },
  theme: { description: 'Theme', toolbar: { title: 'Theme', icon: 'mirror', items: [{ value: 'light', title: 'Light' }, { value: 'dark', title: 'Dark' }], dynamicTitle: true } },
  textSize: { description: 'Text size', toolbar: { title: 'Text size', icon: 'zoom', items: [{ value: '100', title: '100%' }, { value: '115', title: '115%' }, { value: '130', title: '130%' }, { value: '150', title: '150%' }], dynamicTitle: true } },
  font: { description: 'Reading font', toolbar: { title: 'Font', icon: 'paragraph', items: [{ value: 'default', title: 'Original' }, { value: 'sans', title: 'Plain sans' }, { value: 'dyslexic', title: 'OpenDyslexic' }], dynamicTitle: true } },
  numberHelp: { description: 'Help with numbers', toolbar: { title: 'Help with numbers', icon: 'listordered', items: [{ value: 'false', title: 'Off' }, { value: 'true', title: 'On' }], dynamicTitle: true } },
  dateHelp: { description: 'Help with dates', toolbar: { title: 'Help with dates', icon: 'calendar', items: [{ value: 'false', title: 'Off' }, { value: 'true', title: 'On' }], dynamicTitle: true } },
};
export const initialGlobals = { app: 'calshare', theme: 'light', textSize: '100', font: 'default', dateHelp: 'false', numberHelp: 'false' };

export const decorators = [
  (story, { globals }) => {
    const root = document.documentElement;
    if (globals.app === 'stead') root.dataset.nbApp = 'stead'; else delete root.dataset.nbApp;
    root.dataset.theme = globals.theme;
    root.style.setProperty('--nb-text-scale', Number(globals.textSize) / 100);
    root.dataset.nbFont = globals.font;
    root.dataset.nbDateHelp = globals.dateHelp;
    root.dataset.nbNumberHelp = globals.numberHelp;
    return story();
  },
];

export const parameters = {
  layout: 'padded',
  controls: { expanded: true, matchers: { color: /(background|color)$/i } },
  a11y: { test: 'error' },
  options: { storySort: { order: ['Introduction', 'Foundations', 'Brand', 'Buttons', 'Forms', 'Calendar', 'Navigation', 'Dock', 'Overlays', 'Content', 'Figures', 'Journey', 'Documents', 'Poster'] } },
};

export const tags = ['autodocs'];
