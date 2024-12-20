import type { Meta, StoryObj } from '@storybook/react';

import { EmptyState } from './EmptyState';

const meta: Meta<typeof EmptyState> = {
  component: EmptyState,
  title: 'UI/Empty State',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Base = {
  args: {
    action: {
      children: 'Create new',
    },
    description: 'There is no data available for this section.',
    heading: 'No data available',
  },
} satisfies Story;
