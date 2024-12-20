import clsx from 'clsx';
import React, { ComponentPropsWithRef, forwardRef, ReactNode } from 'react';

import styles from './Button.module.scss';

type ButtonThemeType = 'default' | 'primary' | 'secondary';
type ButtonVariantType = 'flat' | 'ghost' | 'light' | 'solid';
type ButtonSizeType = 'lg' | 'md' | 'sm';
type ButtonRadiusType = 'full' | 'lg' | 'md' | 'none' | 'sm';

interface ButtonProps extends ComponentPropsWithRef<'button'> {
  endContent?: ReactNode;
  isIconOnly?: boolean;
  radius?: ButtonRadiusType;
  size?: ButtonSizeType;
  startContent?: ReactNode;
  theme?: ButtonThemeType;
  variant?: ButtonVariantType;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      endContent,
      isIconOnly = false,
      radius = 'sm',
      size = 'md',
      startContent,
      theme = 'primary',
      type = 'button',
      variant = 'solid',
      ...rest
    },
    ref
  ) => (
    <button
      aria-label={isIconOnly ? 'icon button' : undefined}
      data-testid='button'
      type={type}
      {...rest}
      className={clsx(
        styles['button'],
        {
          [styles['button--fab']]: isIconOnly,
          [styles[`button-radius--${radius}`]]: radius,
          [styles[`button-size--${size}`]]: size,
          [styles[`button-theme--${theme}`]]: theme,
          [styles[`button-variant--${variant}`]]: variant,
        },
        rest.className
      )}
      ref={ref}
    >
      {startContent}
      {children}
      {endContent}
    </button>
  )
);

export type { ButtonProps };
export { Button };
