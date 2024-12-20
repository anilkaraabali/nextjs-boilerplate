import type { Meta, StoryObj } from '@storybook/react';

import { InfiniteBanner } from './InfiniteBanner';

const meta: Meta<typeof InfiniteBanner> = {
  component: InfiniteBanner,
  title: 'UI/Infinite Banner',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Base = {
  args: {
    children: <h2>Free home delivery on orders of 50$ or more** .</h2>,
    count: 3,
  },
} satisfies Story;
