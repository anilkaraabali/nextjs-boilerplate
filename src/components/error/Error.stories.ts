import type { Meta, StoryObj } from '@storybook/react';

import { Error } from './Error';

const meta: Meta<typeof Error> = {
  component: Error,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Base = {
  args: {
    statusCode: 404,
  },
} satisfies Story;
