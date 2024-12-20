import type { Meta, StoryObj } from '@storybook/react';

import { Container } from './Container';

const meta: Meta<typeof Container> = {
  component: Container,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Base = {
  args: {
    as: 'div',
    children: 'Hello, world!',
    fluid: false,
    style: { backgroundColor: 'red' },
  },
} satisfies Story;
