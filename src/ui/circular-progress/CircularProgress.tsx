import clsx from 'clsx';
import React, { ComponentPropsWithRef, forwardRef } from 'react';

import styles from './CircularProgress.module.scss';

interface CircularProgressProps extends ComponentPropsWithRef<'div'> {
  size?: 'lg' | 'md' | 'sm' | 'xl';
  theme?: 'dark' | 'light';
}

const CircularProgress = forwardRef<HTMLDivElement, CircularProgressProps>(
  (
    { 'aria-valuetext': ariaValueText, size = 'md', theme = 'dark', ...rest },
    ref
  ) => (
    <div
      data-testid='circular-progress'
      {...rest}
      aria-valuetext={ariaValueText || 'Loading'}
      className={clsx(
        styles['circular-progress'],
        styles[`circular-progress--${theme}`],
        styles[`circular-progress--${size}`],
        rest.className
      )}
      ref={ref}
      role='progressbar'
    />
  )
);

export type { CircularProgressProps };
export { CircularProgress };
