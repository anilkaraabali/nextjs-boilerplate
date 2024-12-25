import type { Meta, StoryObj } from '@storybook/react';

import { LiaTimesSolid } from 'react-icons/lia';

import { Chip } from './Chip';

const meta: Meta<typeof Chip> = {
  args: {
    isDisabled: false,
    radius: 'full',
    size: 'md',
    theme: 'default',
    variant: 'solid',
  },
  argTypes: {
    children: {
      control: 'text',
    },
    radius: {
      control: { type: 'radio' },
      options: ['full', 'lg', 'md', 'none', 'sm'],
    },
    size: {
      control: { type: 'radio' },
      options: ['sm', 'md', 'lg'],
    },
    theme: {
      control: { type: 'radio' },
      options: ['primary', 'secondary', 'default'],
    },
    variant: {
      control: { type: 'radio' },
      options: ['flat', 'light', 'solid'],
    },
  },
  component: Chip,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Base = {
  args: {
    children: 'Chip',
  },
} satisfies Story;

export const WithStartEndContent = {
  args: {
    children: 'Chip',
    endContent: <LiaTimesSolid size={16} />,
  },
} satisfies Story;
