import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';

addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: 'nbinding design',
    brandUrl: 'https://github.com/nbinding/nbinding-design-system',
    fontBase: '"Inter", system-ui, sans-serif',
    colorPrimary: '#1b1c1e',
    colorSecondary: '#1b1c1e',
    appBg: '#f4f4f2',
    appContentBg: '#ffffff',
    appBorderRadius: 12,
    textColor: '#1b1c1e',
    barSelectedColor: '#1b1c1e',
  }),
  sidebar: { showRoots: true },
});
