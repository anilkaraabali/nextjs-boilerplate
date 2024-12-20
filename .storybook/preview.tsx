import type { Preview } from '@storybook/react';
import React from 'react';
import './styles.scss';

import { Snackbar } from '../src/ui/snackbar';
import { fontMono, fontSans } from '../src/config/fonts';
import { NextIntlClientProvider } from 'next-intl';

import enMessages from '../messages/en.json';

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
  },
  tags: ['autodocs'],
  globalTypes: {
    locale: {
      description: 'Internationalization locale',
      defaultValue: 'en',
      toolbar: {
        icon: 'globe',
        items: [
          { value: 'en', right: '🇺🇸', title: 'English' },
          { value: 'de', right: '🇩🇪', title: 'German' },
        ],
      },
    },
  },
};

export default preview;
