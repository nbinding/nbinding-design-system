// Storybook for the nbinding design system. The system itself has no build step; only this browsable
// catalogue is built (npm run storybook:build), and GitHub Actions publishes it next to the docs site.
/** @type { import('@storybook/html-vite').StorybookConfig } */
export default {
  framework: { name: '@storybook/html-vite', options: {} },
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.js'],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y'],
  core: { disableTelemetry: true },
};
