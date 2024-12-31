import clsx from 'clsx';
import React, { forwardRef, useCallback } from 'react';
import {
  IoIosAlert,
  IoIosCheckmarkCircle,
  IoIosInformationCircle,
  IoIosWarning,
} from 'react-icons/io';
import { LiaTimesSolid } from 'react-icons/lia';

import styles from './Alert.module.scss';

type AlertStatusType =
  | 'danger'
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning';

interface AlertProps extends React.ComponentPropsWithRef<'div'> {
  hideIcon?: boolean;
  onCloseButtonClick: React.MouseEventHandler<HTMLButtonElement>;
  status?: AlertStatusType;
  text: string;
}

const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    { hideIcon = false, onCloseButtonClick, status = 'default', text, ...rest },
    ref
  ) => {
    const Icon = useCallback(() => {
      switch (status) {
        case 'default':
        case 'primary':
        case 'secondary':
          return <IoIosInformationCircle size={24} />;
        case 'success':
          return <IoIosCheckmarkCircle size={24} />;
        case 'danger':
          return <IoIosAlert size={24} />;
        case 'warning':
          return <IoIosWarning size={24} />;
      }
    }, [status]);

    return (
      <div
        aria-live={
          status === 'success' || status === 'danger' ? 'assertive' : 'polite'
        }
        data-testid='alert'
        role='alert'
        {...rest}
        className={clsx(
          styles['alert'],
          styles[`alert--${status}`],
          rest.className
        )}
        ref={ref}
      >
        <div className={styles['alert__content']}>
          {!hideIcon && (
            <div className={styles['alert__icon']}>
              <Icon data-testid='alert/icon' />
            </div>
          )}
          <div className={styles['alert__title']}>{text}</div>
        </div>
        <button
          aria-label='Close alert'
          className={styles['alert__button']}
          data-testid='alert/close-button'
          onClick={onCloseButtonClick}
          type='button'
        >
          <LiaTimesSolid />
        </button>
      </div>
    );
  }
);

export type { AlertProps };
export { Alert };
