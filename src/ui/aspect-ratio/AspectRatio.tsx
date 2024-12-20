import clsx from 'clsx';
import { ComponentPropsWithRef, forwardRef } from 'react';

import styles from './AspectRatio.module.scss';

interface AspectRatioProps extends ComponentPropsWithRef<'div'> {
  ratio?: number;
}

const AspectRatio = forwardRef<HTMLDivElement, AspectRatioProps>(
  ({ children, ratio = 1 / 1, ...rest }, ref) => (
    <div
      className={styles['aspect-ratio']}
      data-testid='aspect-ratio'
      role='presentation'
      style={{ '--ratio': ratio } as React.CSSProperties}
    >
      <div
        {...rest}
        className={clsx(styles['aspect-ratio__inner'], rest.className)}
        ref={ref}
      >
        {children}
      </div>
    </div>
  )
);

export type { AspectRatioProps };
export { AspectRatio };
