import type { Meta, StoryObj } from '@storybook/react';

import { LiaAngellist, LiaArrowRightSolid } from 'react-icons/lia';

import { Button } from './Button';

const meta: Meta<typeof Button> = {
  args: {
    disabled: false,
    isIconOnly: false,
    radius: 'sm',
    size: 'md',
    theme: 'primary',
    type: 'button',
    variant: 'solid',
  },
  argTypes: {
    children: {
      control: 'text',
    },
    disabled: {
      control: 'boolean',
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
      options: ['flat', 'ghost', 'light', 'solid'],
    },
  },
  component: Button,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const LabelOnly = {
  args: {
    children: 'Label',
  },
} satisfies Story;

export const LabelWithStartContent = {
  args: {
    children: 'Label',
    startContent: <LiaAngellist size={20} />,
  },
} satisfies Story;

export const LabelWithEndContent = {
  args: {
    children: 'Label',
    endContent: <LiaArrowRightSolid size={20} />,
  },
} satisfies Story;

export const IconOnly = {
  args: {
    endContent: <LiaArrowRightSolid size={20} />,
    isIconOnly: true,
  },
} satisfies Story;
