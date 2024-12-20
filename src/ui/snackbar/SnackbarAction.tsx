import React, { FC } from 'react';

import { Button, ButtonProps } from '../button';
import { Link, LinkProps } from '../link';
import { useSnackbarStore } from './SnackbarStore';

type SnackbarActionType = ButtonProps | LinkProps;

interface SnackbarActionProps {
  action: SnackbarActionType;
}

const SnackbarAction: FC<SnackbarActionProps> = ({ action }) => {
  const { hide } = useSnackbarStore();

  return 'href' in action ? (
    <Link
      theme='primary'
      {...(action as LinkProps)}
      href={action.href}
      onClick={(e): void => {
        action.onClick?.(e);
        hide();
      }}
    >
      {action.children}
    </Link>
  ) : (
    <Button
      theme='primary'
      variant='light'
      {...(action as ButtonProps)}
      onClick={(e): void => {
        action.onClick?.(e as never);
        hide();
      }}
    >
      {action.children}
    </Button>
  );
};

export type { SnackbarActionProps, SnackbarActionType };
export { SnackbarAction };
