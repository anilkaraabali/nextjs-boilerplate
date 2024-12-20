import type { Args, Meta, StoryObj } from '@storybook/react';

import { Button } from '../button';
import { useSnackbar } from './hook';
import { Snackbar } from './Snackbar';

const meta: Meta<typeof Snackbar> = {
  argTypes: {
    bottom: {
      type: 'number',
    },
    position: {
      control: { type: 'radio' },
      options: ['bottom-center', 'bottom-left'],
    },
  },
  component: Snackbar,
};

export default meta;
type Story = StoryObj<typeof meta>;

const SnackbarWithAction = (args: Args) => {
  const { alert } = useSnackbar();

  return (
    <>
      <Button
        onClick={() =>
          alert({
            actionsInBelow: args.actionsInBelow,
            bottom: args.bottom,
            message: args.message,
            position: args.position,
            primaryAction: args.primaryAction,
            secondaryAction: args.secondaryAction,
          })
        }
        theme='secondary'
      >
        Open snackbar
      </Button>
    </>
  );
};

export const Base = {
  args: {
    actionsInBelow: false,
    message: 'Snackbar label',
    position: 'bottom-center',
    primaryAction: {
      children: 'Action 1',
    },
    secondaryAction: {
      children: 'Action 2',
    },
  },
  render: (args) => <SnackbarWithAction {...args} />,
} satisfies Story;
