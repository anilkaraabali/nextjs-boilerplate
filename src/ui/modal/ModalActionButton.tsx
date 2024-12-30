import clsx from 'clsx';
import React, { forwardRef } from 'react';

import { Button, ButtonProps } from '../button';
import styles from './Modal.module.scss';

const ModalActionButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, ...rest }, ref) => (
    <Button
      {...rest}
      className={clsx(styles['modal__action'], rest?.className)}
      ref={ref}
    >
      {children}
    </Button>
  )
);

export { ModalActionButton };
