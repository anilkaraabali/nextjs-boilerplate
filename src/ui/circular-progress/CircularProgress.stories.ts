import type { Meta, StoryObj } from '@storybook/react';

import { CircularProgress } from './CircularProgress';

const meta: Meta<typeof CircularProgress> = {
  argTypes: {
    size: {
      control: { type: 'radio' },
      options: ['sm', 'md', 'lg', 'xl'],
    },
    theme: {
      control: { type: 'radio' },
      options: ['light', 'dark'],
    },
  },
  component: CircularProgress,
  title: 'UI/Circular Progress',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Base = {
  args: {
    size: 'md',
    theme: 'light',
  },
} satisfies Story;
