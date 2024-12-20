import { useHideOnScrollingDown } from '@/hooks';
import clsx from 'clsx';
import { ComponentPropsWithRef, forwardRef } from 'react';
import { useInView } from 'react-intersection-observer';

import styles from './AppearOnScroll.module.scss';

interface ScrollShadowProps extends ComponentPropsWithRef<'div'> {}

const ScrollShadow = forwardRef<HTMLDivElement, ScrollShadowProps>(
  ({ children, ...rest }, ref) => {
    const hideBottomNavigation = useHideOnScrollingDown();

    const { inView, ref: stickyRef } = useInView();

    return (
      <>
        <div id='scroll-shadow-sticky-ref' ref={stickyRef} />
        <div
          data-testid='scroll-shadow'
          {...rest}
          className={clsx(
            styles['scroll-shadow'],
            {
              [styles['scroll-shadow--hidden']]:
                !inView && hideBottomNavigation,
              [styles['scroll-shadow--not-in-view']]: !inView,
            },
            rest.className
          )}
          ref={ref}
        >
          {children}
        </div>
      </>
    );
  }
);

export type { ScrollShadowProps };
export { ScrollShadow };
