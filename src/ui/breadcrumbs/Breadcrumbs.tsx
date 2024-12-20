import clsx from 'clsx';
import React, { ComponentPropsWithRef, forwardRef } from 'react';

import styles from './Breadcrumbs.module.scss';
import { BreadcrumbOptionType, BreadcrumbsOption } from './BreadcrumbsOption';

interface BreadcrumbsProps extends ComponentPropsWithRef<'nav'> {
  options: BreadcrumbOptionType[];
}

const Breadcrumbs = forwardRef<HTMLElement, BreadcrumbsProps>(
  ({ options, ...rest }, ref) => (
    <nav
      aria-label={'Navigation menu (breadcrumbs)'}
      data-testid='breadcrumbs'
      {...rest}
      className={clsx(styles['breadcrumbs'], rest.className)}
      ref={ref}
    >
      <ol className={styles['breadcrumbs__list']}>
        {options.map((option, index, currentArray) => {
          const isLast = index === currentArray.length - 1;

          return (
            <BreadcrumbsOption
              currentIndex={index}
              isFirstOption={index === 0}
              isLastOption={isLast}
              key={index + 1}
              option={option}
            />
          );
        })}
      </ol>
    </nav>
  )
);

export type { BreadcrumbsProps };
export { Breadcrumbs };
