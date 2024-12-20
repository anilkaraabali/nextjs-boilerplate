import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../button';
import { usePopover } from './hook';
import { Popover } from './Popover';

const meta: Meta<typeof Popover> = {
  args: {
    as: 'div',
  },
  component: Popover,
};

export default meta;
type Story = StoryObj<typeof meta>;

const PopoverWithClick = () => {
  const { onClick, Popover } = usePopover();

  return (
    <>
      <Button onClick={onClick} theme='secondary'>
        Click me!
      </Button>
      <Popover>Popover content</Popover>
    </>
  );
};

const PopoverWithHover = () => {
  const { onMouseEnter, Popover } = usePopover();

  return (
    <>
      <Button onMouseEnter={onMouseEnter} theme='secondary'>
        Hover me!
      </Button>
      <Popover>Popover content</Popover>
    </>
  );
};

export const WithClick = {
  render: (args) => <PopoverWithClick {...args} />,
} satisfies Story;

export const WithHover = {
  render: (args) => <PopoverWithHover {...args} />,
} satisfies Story;
