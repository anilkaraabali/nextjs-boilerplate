import clsx from 'clsx';
import React, { ComponentPropsWithRef, forwardRef } from 'react';

import styles from './Switch.module.scss';

interface SwitchProps extends ComponentPropsWithRef<'button'> {
  checked?: boolean;
  size?: 'lg' | 'md' | 'sm';
  theme?: 'default' | 'primary' | 'secondary';
}

const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      checked = false,
      children,
      id = 'switch',
      size = 'md',
      theme = 'default',
      ...rest
    },
    ref
  ) => (
    <label
      className={clsx(styles['switch'], styles[`switch--size-${size}`])}
      htmlFor={id}
    >
      <button
        aria-checked={checked}
        data-testid='switch'
        id={id}
        {...rest}
        className={clsx(
          styles['switch__button'],
          styles[`switch__button--size-${size}`],
          styles[`switch__button--theme-${theme}`],
          {
            [styles['switch__button--checked']]: checked,
          },
          rest.className
        )}
        ref={ref}
        role='switch'
        type='button'
      />
      {children}
    </label>
  )
);

export type { SwitchProps };
export { Switch };
