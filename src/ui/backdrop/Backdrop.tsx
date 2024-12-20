import clsx from 'clsx';
import { ComponentPropsWithRef, forwardRef } from 'react';

import styles from './Backdrop.module.scss';

interface BackdropProps extends ComponentPropsWithRef<'button'> {
  onEscape?: React.KeyboardEventHandler<HTMLButtonElement>;
}

const Backdrop = forwardRef<HTMLButtonElement, BackdropProps>(
  (
    { 'aria-label': ariaLabel = 'Backdrop', onEscape, onKeyDown, ...rest },
    ref
  ) => (
    <button
      aria-label={ariaLabel}
      data-testid='backdrop'
      {...rest}
      className={clsx(styles['backdrop'], rest.className)}
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          e.preventDefault();
          onEscape?.(e);
        }
        onKeyDown?.(e);
      }}
      ref={ref}
      type='button'
    />
  )
);

export type { BackdropProps };
export { Backdrop };
