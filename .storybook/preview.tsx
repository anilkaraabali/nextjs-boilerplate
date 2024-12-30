import type { Preview } from '@storybook/react';

import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { NextIntlClientProvider } from 'next-intl';
import React from 'react';

import enMessages from '../messages/en.json';
import { fontMono, fontSans } from '../src/config/fonts';
import { Snackbar } from '../src/ui/snackbar';
import './styles.scss';

const preview: Preview = {
  decorators: [
    (Story, args) => {
      const locale = args.globals.locale;

      return (
        <NextIntlClientProvider
          locale={locale}
          messages={enMessages}
          timeZone='Europe/Berlin'
        >
          <style>{`
            :root {
              --font-mono: ${fontMono.style.fontFamily};
              --font-sans: ${fontSans.style.fontFamily};
            }
          `}</style>
          <Snackbar />
          <Story />
        </NextIntlClientProvider>
      );
    },
  ],
  globalTypes: {
    locale: {
      defaultValue: 'en',
      description: 'Internationalization locale',
      toolbar: {
        icon: 'globe',
        items: [
          { right: '🇺🇸', title: 'English', value: 'en' },
          { right: '🇩🇪', title: 'German', value: 'de' },
        ],
      },
    },
  },
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    nextjs: {
      appDirectory: false,
    },
    viewport: {
      viewports: INITIAL_VIEWPORTS,
    },
  },
  tags: ['autodocs'],
};

export default preview;
