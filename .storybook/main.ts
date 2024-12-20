import type { StorybookConfig } from '@storybook/nextjs';

const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  core: {
    disableTelemetry: true,
  },
  framework: {
    name: '@storybook/nextjs',
    options: {
      builder: {
        useSWC: true,
      },
    },
  },
  webpackFinal: async (config) => {
    if (config.resolve) {
      config.resolve.plugins = [
        ...(config.resolve.plugins || []),
        new TsconfigPathsPlugin({
          extensions: config.resolve.extensions,
        }),
      ];
    }

    return config;
  },
  staticDirs: [
    '../public',
    {
      from: '../src/pages/_app.tsx',
      to: 'src/pages/_app.tsx',
    },
  ],
  docs: {
    autodocs: 'tag',
  },
};
export default config;
