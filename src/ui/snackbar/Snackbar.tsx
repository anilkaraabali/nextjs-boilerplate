import clsx from 'clsx';
import React, { FC, useEffect, useState } from 'react';

import { Portal } from '../portal';
import styles from './Snackbar.module.scss';
import { SnackbarAction, SnackbarActionType } from './SnackbarAction';
import { useSnackbarStore } from './SnackbarStore';

interface SnackbarProps {
  actionsInBelow?: boolean;
  bottom?: number;
  message: string;
  position?: 'bottom-center' | 'bottom-left';
  primaryAction?: SnackbarActionType;
  secondaryAction?: SnackbarActionType;
  status?: 'critical' | 'info' | 'success' | 'warning';
}

const Snackbar: FC = () => {
  const {
    actionsInBelow = false,
    bottom,
    isVisible,
    message,
    position = 'bottom-center',
    primaryAction,
    secondaryAction,
  } = useSnackbarStore();

  const [isShowing, setIsShowing] = useState(false);
  const [addAnimation, setAddAnimation] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsShowing(true);
      setTimeout(() => {
        setAddAnimation(true);
      }, 10);
    } else {
      setAddAnimation(false);
      setTimeout(() => {
        setIsShowing(false);
      }, 150);
    }
  }, [isVisible]);

  if (!isShowing) {
    return null;
  }

  return (
    <Portal rootId='snackbar-root'>
      <div
        className={clsx(
          styles['snackbar__wrapper'],
          styles[`snackbar__wrapper--${position}`]
        )}
        style={bottom ? { bottom: `${bottom}px` } : undefined}
      >
        <div
          aria-live='assertive'
          className={clsx(styles['snackbar'], {
            [styles['snackbar--below']]:
              actionsInBelow && (primaryAction || secondaryAction),
            [styles['snackbar--visible']]: !!addAnimation,
          })}
          role='alert'
        >
          <div className={styles['snackbar__content']}>
            <p className={styles['snackbar__label']}>{message}</p>
          </div>
          {(primaryAction || secondaryAction) && (
            <div className={styles['snackbar__actions']}>
              {primaryAction && (
                <SnackbarAction
                  action={primaryAction}
                  aria-label='Primary action'
                />
              )}
              {secondaryAction && (
                <SnackbarAction
                  action={secondaryAction}
                  aria-label='Secondary action'
                />
              )}
            </div>
          )}
        </div>
      </div>
    </Portal>
  );
};

export type { SnackbarProps };
export { Snackbar };
