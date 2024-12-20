import { ComponentPropsWithRef, forwardRef } from 'react';

interface PopoverProps extends ComponentPropsWithRef<'div'> {
  as?: React.ElementType;
}

const Popover = forwardRef<HTMLElement, PopoverProps>(
  ({ as: Component = 'div', children, ...rest }, ref) => (
    <Component ref={ref} {...rest}>
      {children}
    </Component>
  )
);

export type { PopoverProps };
export { Popover };
