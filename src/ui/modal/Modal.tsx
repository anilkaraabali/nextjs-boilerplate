import { useOnFullScreen } from '@/hooks';
import { useConstructor } from '@/hooks/constructor.hook';
import clsx from 'clsx';
import { motion } from 'motion/react';
import React, {
  ComponentPropsWithRef,
  forwardRef,
  ReactNode,
  useCallback,
} from 'react';
import { LiaTimesSolid } from 'react-icons/lia';

import { Backdrop } from '../backdrop';
import { Button, ButtonProps } from '../button';
import { Portal } from '../portal';
import styles from './Modal.module.scss';
import { ModalActionButton } from './ModalActionButton';

type ModalSizeType =
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
  | 'full'
  | 'lg'
  | 'md'
  | 'sm'
  | 'xl'
  | 'xs';

interface ModalProps
  extends Omit<ComponentPropsWithRef<'div'>, 'size' | 'title'> {
  bindClose?: (open: () => void) => void;
  bindOpen?: (open: () => void) => void;
  documentBodyClassName?: string;
  hideCloseButton?: boolean;
  isDismissable?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
  onCloseButtonClick?: () => void;
  onESCKeyDown?: () => void;
  onOpen?: () => void;
  onOverlayClick?: () => void;
  primaryAction?: ButtonProps;
  secondaryAction?: ButtonProps;
  size?: ModalSizeType;
  title?: ReactNode;
}

const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      bindClose,
      bindOpen,
      children,
      documentBodyClassName = 'modal-block-overflow',
      hideCloseButton = false,
      isDismissable = true,
      isOpen = false,
      onClose,
      onCloseButtonClick,
      onESCKeyDown,
      onOpen,
      onOverlayClick,
      primaryAction,
      secondaryAction,
      size = 'md',
      title,
      ...rest
    },
    ref
  ) => {
    const { open, setOpen } = useOnFullScreen({
      documentBodyClassName,
      isOpen,
      onClose,
      onESCKeyDown,
      onOpen,
    });

    useConstructor(() => {
      bindOpen?.(() => {
        setOpen(true);
      });
      bindClose?.(() => {
        setOpen(false);
      });
    });

    const handleBackdropClick = useCallback((): void => {
      if (!isDismissable) return;
      onOverlayClick?.();
      setOpen(false);
    }, [onOverlayClick, setOpen]);

    const handleCloseButtonClick = useCallback((): void => {
      onCloseButtonClick?.();
      setOpen(false);
    }, [onCloseButtonClick, setOpen]);

    if (!open) {
      return null;
    }

    return (
      <Portal rootId='modal-root'>
        <div className={styles['modal__wrapper']}>
          {size !== 'full' && (
            <Backdrop
              aria-label='Close modal'
              data-testid='modal/overlay'
              onClick={handleBackdropClick}
            />
          )}
          <motion.div
            animate={{
              opacity: 1,
              scale: 1,
              transition: {
                duration: 0.15,
                ease: 'easeOut',
              },
            }}
            exit={{
              opacity: 0,
              scale: 0.75,
              transition: {
                duration: 0.15,
                ease: 'easeIn',
              },
            }}
            initial={{
              opacity: 0,
              scale: 0.75,
            }}
            key='modal'
          >
            <section
              aria-labelledby={title ? 'modal-title' : undefined}
              aria-live='assertive'
              aria-modal
              role='dialog'
              {...rest}
              className={clsx(
                styles['modal'],
                styles[`modal--size-${size}`],
                rest.className
              )}
              ref={ref}
            >
              {!hideCloseButton && (
                <Button
                  aria-label='Close'
                  className={styles['modal__close-btn']}
                  data-testid='modal/close-button'
                  endContent={<LiaTimesSolid size={16} />}
                  isIconOnly
                  onClick={handleCloseButtonClick}
                  radius='full'
                  size='sm'
                  theme='default'
                  variant='light'
                />
              )}
              {title && (
                <header
                  className={styles['modal__header']}
                  data-testid='modal/title'
                >
                  {title}
                </header>
              )}
              <div className={styles['modal__body']}>{children}</div>
              {(primaryAction || secondaryAction) && (
                <footer className={styles['modal__footer']}>
                  {secondaryAction && (
                    <ModalActionButton
                      data-testid='modal/secondary-button'
                      radius='lg'
                      variant='light'
                      {...secondaryAction}
                    />
                  )}
                  {primaryAction && (
                    <ModalActionButton
                      data-testid='modal/primary-button'
                      radius='lg'
                      {...primaryAction}
                    />
                  )}
                </footer>
              )}
            </section>
          </motion.div>
        </div>
      </Portal>
    );
  }
);

export type { ModalProps };
export { Modal };
