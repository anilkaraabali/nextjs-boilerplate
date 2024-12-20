import type { Meta, StoryObj } from '@storybook/react';

import { Backdrop } from './Backdrop';

const meta: Meta<typeof Backdrop> = {
  component: Backdrop,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Base = {} satisfies Story;
