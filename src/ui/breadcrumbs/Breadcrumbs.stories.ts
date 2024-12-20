import type { Meta, StoryObj } from '@storybook/react';

import { Breadcrumbs } from './Breadcrumbs';

const meta: Meta<typeof Breadcrumbs> = {
  component: Breadcrumbs,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Base = {
  args: {
    options: [
      {
        title: 'App Router',
        url: 'https://nextjs.org/docs/app',
      },
      {
        title: 'Getting Started',
        url: 'https://nextjs.org/docs/app/getting-started',
      },
      {
        title: 'Installation',
        url: 'https://nextjs.org/docs/app/getting-started/installation',
      },
    ],
  },
} satisfies Story;
