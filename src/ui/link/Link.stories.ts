import type { Meta, StoryObj } from '@storybook/react';

import { Link } from './Link';

const meta: Meta<typeof Link> = {
  args: {
    href: 'https://example.com',
    isBlock: false,
    isExternal: false,
    size: 'sm',
    theme: 'primary',
    underline: 'always',
  },
  argTypes: {
    children: {
      control: 'text',
    },
    size: {
      control: { type: 'radio' },
      options: ['sm', 'md', 'lg'],
    },
    theme: {
      control: { type: 'radio' },
      options: ['primary', 'secondary', 'default', 'danger'],
    },
    underline: {
      control: { type: 'radio' },
      options: ['active', 'always', 'hover', 'none'],
    },
  },
  component: Link,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Base = {
  args: {
    children: 'Label',
  },
} satisfies Story;
