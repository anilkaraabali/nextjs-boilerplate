import clsx from 'clsx';
import React, { ComponentPropsWithRef, forwardRef } from 'react';

import { Button, ButtonProps } from '../button';
import { Link, LinkProps } from '../link';
import styles from './EmptyState.module.scss';

interface EmptyStateProps extends ComponentPropsWithRef<'div'> {
  action?: ButtonProps | LinkProps;
  description?: string;
  heading: string;
  imageUrl?: string;
}

const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(
  (
    { action, description, heading, imageUrl = '/media/empty.svg', ...rest },
    ref
  ) => (
    <div
      data-testid='empty-state'
      {...rest}
      className={clsx(styles['empty-state'], rest.className)}
      ref={ref}
    >
      <picture>
        <img alt='No content available' src={imageUrl} />
      </picture>
      <div className={styles['empty-state__content']}>
        <h2 className={styles['empty-state__title']}>{heading}</h2>
        {description && (
          <p className={styles['empty-state__description']}>{description}</p>
        )}
      </div>
      {typeof action !== 'undefined' ? (
        'href' in action ? (
          <Link
            theme='primary'
            {...(action as LinkProps)}
            className={clsx(styles['empty-state__action'], action?.className)}
          />
        ) : (
          <Button
            theme='primary'
            {...(action as ButtonProps)}
            className={clsx(styles['empty-state__action'], action?.className)}
          />
        )
      ) : null}
    </div>
  )
);

export type { EmptyStateProps };
export { EmptyState };
