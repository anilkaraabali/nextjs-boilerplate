import clsx from 'clsx';
import { ComponentPropsWithRef, forwardRef } from 'react';

import styles from './Checkbox.module.scss';

interface CheckboxProps extends Omit<ComponentPropsWithRef<'input'>, 'size'> {
  size?: 'lg' | 'md' | 'sm';
  theme?: 'default' | 'primary' | 'secondary';
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      checked,
      children,
      id = 'checkbox',
      size = 'md',
      theme = 'primary',
      ...rest
    },
    ref
  ) => (
    <label
      className={clsx(
        styles['checkbox'],
        styles[`checkbox--size-${size}`],
        styles[`checkbox--theme-${theme}`]
      )}
      htmlFor={id}
    >
      <input
        checked={checked}
        data-testid='checkbox'
        id={id}
        ref={ref}
        type='checkbox'
        {...rest}
      />
      <span>
        <svg aria-hidden={true} role='presentation' viewBox='0 0 17 18'>
          <polyline
            fill='none'
            points='1 9 7 14 15 4'
            stroke='currentColor'
            strokeDasharray='22'
            strokeDashoffset={checked ? 44 : 66}
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            style={
              checked
                ? {
                    transition: 'stroke-dashoffset 250ms linear 0.2s',
                  }
                : undefined
            }
          />
        </svg>
      </span>
      {children}
    </label>
  )
);

export type { CheckboxProps };
export { Checkbox };
