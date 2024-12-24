import type { Meta, StoryObj } from '@storybook/react';

import { useState } from 'react';

import { Input } from './Input';

const meta: Meta<typeof Input> = {
  args: {
    disabled: false,
    label: 'Email',
    placeholder: 'Enter your email',
    size: 'sm',
    type: 'email',
    value: '',
  },
  argTypes: {
    radius: {
      control: { type: 'radio' },
      options: ['sm', 'md', 'lg', 'full', 'none'],
    },
    size: {
      control: { type: 'radio' },
      options: ['sm', 'md', 'lg'],
    },
  },
  component: Input,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 375 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Base = {
  render: (args) => {
    const [value, setValue] = useState(args.value);

    return (
      <Input
        {...args}
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />
    );
  },
} satisfies Story;

export const WithDescription = {
  args: {
    description: "We'll never share your email with anyone else.",
    value: 'john@doe.com',
  },
} satisfies Story;

export const WithErrorMessage = {
  args: {
    errorMessage: (
      <ul>
        <li>Password must be 4 characters or more.</li>
        <li>Password must include at least 1 upper case letter</li>
        <li>Password must include at least 1 symbol.</li>
      </ul>
    ),
    label: 'Password',
    placeholder: 'Enter your password',
    type: 'password',
    value: 'john@doe.com',
  },
} satisfies Story;

export const WithContent = {
  args: {
    endContent: 'USD',
    label: 'Price',
    placeholder: '0.00',
    startContent: '$',
  },
} satisfies Story;
