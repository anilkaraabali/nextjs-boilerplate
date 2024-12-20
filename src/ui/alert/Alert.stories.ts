import type { Meta, StoryObj } from '@storybook/react';

import { Alert } from './Alert';

const meta: Meta<typeof Alert> = {
  argTypes: {
    status: {
      control: { type: 'radio' },
      options: [
        'default',
        'primary',
        'secondary',
        'warning',
        'danger',
        'success',
      ],
    },
  },

  component: Alert,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Base = {
  args: {
    hideIcon: false,
    status: 'success',
    get text() {
      return `This is a ${this.status} alert`;
    },
  },
} satisfies Story;
