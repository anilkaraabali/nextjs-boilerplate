import type { Meta, StoryObj } from '@storybook/react';

import { useState } from 'react';
import React from 'react';

import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  argTypes: {
    size: {
      control: { type: 'radio' },
      options: ['sm', 'md', 'lg'],
    },
    theme: {
      control: { type: 'radio' },
      options: ['primary', 'secondary', 'default'],
    },
  },
  component: Checkbox,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Base = {
  args: {
    checked: false,
    children: 'Option',
    size: 'md',
    theme: 'primary',
  },
  render: (args) => {
    const [value, setValue] = useState(args.checked);

    return (
      <Checkbox
        {...args}
        checked={value}
        onChange={(e) => setValue(e.target.checked)}
      />
    );
  },
} satisfies Story;
