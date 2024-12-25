import clsx from 'clsx';
import React, {
  ComponentPropsWithRef,
  ElementType,
  forwardRef,
  ReactNode,
  Ref,
} from 'react';

import styles from './Chip.module.scss';

type ChipThemeType = 'default' | 'primary' | 'secondary';
type ChipSizeType = 'lg' | 'md' | 'sm';
type ChipRadiusType = 'full' | 'lg' | 'md' | 'none' | 'sm';
type ChipVariantType = 'flat' | 'light' | 'solid';
type CommonType = {
  endContent?: ReactNode;
  isDisabled?: boolean;
  radius?: ChipRadiusType;
  size?: ChipSizeType;
  startContent?: ReactNode;
  theme?: ChipThemeType;
  variant?: ChipVariantType;
};

type ButtonType = ComponentPropsWithRef<'button'>;
type AnchorType = ComponentPropsWithRef<'a'>;
type StaticType = ComponentPropsWithRef<'div'>;

type ChipProps = (AnchorType | ButtonType | StaticType) & CommonType;

const Chip = forwardRef<HTMLElement, ChipProps>(
  (
    {
      children,
      endContent,
      isDisabled = false,
      radius = 'full',
      size = 'md',
      startContent,
      theme = 'default',
      variant = 'solid',
      ...rest
    },
    ref
  ) => {
    const Component: ElementType =
      'href' in rest ? 'a' : 'onClick' in rest ? 'button' : 'div';

    return (
      <Component
        data-testid='chip'
        {...(rest as ElementType<typeof Component>)}
        aria-disabled={isDisabled}
        className={clsx(
          styles['chip'],
          styles[`chip--radius-${radius}`],
          styles[`chip--size-${size}`],
          styles[`chip--theme-${theme}`],
          styles[`chip--variant-${variant}`],
          {
            [styles['chip--disabled']]: isDisabled,
            [styles['chip--with-end-content']]: endContent,
            [styles['chip--with-start-content']]: startContent,
          },
          rest.className
        )}
        ref={
          ref as Ref<HTMLAnchorElement> &
            Ref<HTMLButtonElement> &
            Ref<HTMLDivElement>
        }
        {...(Component === 'button' && { type: 'button' })}
      >
        {startContent}
        <span className={styles['chip__label']}>{children}</span>
        {endContent}
      </Component>
    );
  }
);

export type { ChipProps };
export { Chip };
