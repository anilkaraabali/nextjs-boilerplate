import clsx from 'clsx';
import { ComponentPropsWithRef, forwardRef } from 'react';

import styles from './Container.module.scss';

interface ContainerProps extends ComponentPropsWithRef<'div'> {
  as?: React.ElementType;
  fluid?: boolean;
}

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ as: Component = 'div', children, fluid = false, ...rest }, ref) => (
    <Component
      ref={ref}
      {...rest}
      className={clsx(
        styles['container'],
        {
          [styles['container--fluid']]: fluid,
        },
        rest.className
      )}
    >
      {children}
    </Component>
  )
);

export type { ContainerProps };
export { Container };
