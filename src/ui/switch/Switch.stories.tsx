import type { Args, Meta, StoryObj } from '@storybook/react';

import { useState } from 'react';

import { Switch } from './Switch';

const meta: Meta<typeof Switch> = {
  argTypes: {
    checked: { control: false },
    size: {
      control: { type: 'radio' },
      options: ['sm', 'md', 'lg'],
    },
    theme: {
      control: { type: 'radio' },
      options: ['primary', 'secondary', 'default'],
    },
  },
  component: Switch,
};

export default meta;
type Story = StoryObj<typeof meta>;

const StoryRender = (args: Args) => {
  const [isChecked, setIsChecked] = useState(args.checked);

  return (
    <Switch
      {...args}
      checked={isChecked}
      onClick={() => setIsChecked(!isChecked)}
    />
  );
};

export const Base = {
  args: {
    disabled: false,
    id: 'mode',
    size: 'md',
    theme: 'default',
  },
  render: (args) => <StoryRender {...args} />,
} satisfies Story;

export const WithLabel = {
  args: {
    children: 'Airplane mode',
    disabled: false,
    id: 'mode',
    size: 'md',
    theme: 'default',
  },
  render: (args) => <StoryRender {...args} />,
} satisfies Story;
