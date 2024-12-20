import clsx from 'clsx';
import { list } from 'radash';
import { ComponentPropsWithRef, forwardRef } from 'react';

import styles from './InfiniteBanner.module.scss';

interface InfiniteBannerProps extends ComponentPropsWithRef<'div'> {
  carouselClassName?: string;
  count?: number;
}

const InfiniteBanner = forwardRef<HTMLDivElement, InfiniteBannerProps>(
  ({ carouselClassName, children, count = 1, ...rest }, ref) => (
    <div
      data-testid='infinite-banner'
      {...rest}
      className={clsx(styles['infinite-banner'], rest.className)}
      ref={ref}
    >
      <div
        className={clsx(styles['infinite-banner__carousel'], carouselClassName)}
      >
        {list(count).map(() => children)}
      </div>
    </div>
  )
);

export type { InfiniteBannerProps };
export { InfiniteBanner };
