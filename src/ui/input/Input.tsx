import clsx from 'clsx';
import React, {
  ComponentPropsWithRef,
  forwardRef,
  ReactNode,
  useCallback,
  useRef,
} from 'react';

import styles from './Input.module.scss';

type InputSizeType = 'lg' | 'md' | 'sm';
type InputRadiusType = 'full' | 'lg' | 'md' | 'none' | 'sm';

interface InputProps extends Omit<ComponentPropsWithRef<'input'>, 'size'> {
  description?: ReactNode;
  endContent?: ReactNode;
  errorMessage?: ReactNode;
  label: string;
  radius?: InputRadiusType;
  size?: InputSizeType;
  startContent?: ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      description,
      disabled,
      endContent,
      errorMessage,
      id = 'input',
      label,
      placeholder,
      radius = 'md',
      size = 'sm',
      startContent,
      type = 'text',
      value,
      ...rest
    },
    ref
  ) => {
    const innerInputRef = useRef<HTMLInputElement | null>(null);
    const inputRef = useCallback(
      (node: HTMLInputElement) => {
        if (node) {
          innerInputRef.current = node;

          if (ref) {
            if (typeof ref === 'function') {
              ref(node);
            } else {
              ref.current = node;
            }
          }
        }
      },
      [ref]
    );

    return (
      <div
        className={styles['input__container']}
        onClick={() => innerInputRef.current?.focus()}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            innerInputRef.current?.focus();
          }
        }}
        role='button'
        tabIndex={0}
      >
        <div
          className={clsx(styles['input__wrapper'], {
            [styles['input__wrapper--disabled']]: disabled,
            [styles['input__wrapper--error']]: !!errorMessage,
            [styles[`input__wrapper--radius-${radius}`]]: radius,
            [styles[`input__wrapper--size-${size}`]]: size,
          })}
          data-testid='input-wrapper'
        >
          <label
            className={clsx(styles['input__label'], {
              [styles['input__label--active']]: !!value || !!placeholder,
            })}
            htmlFor={id}
          >
            {label}
          </label>
          <div className={styles['input__inner-wrapper']}>
            {startContent}
            <input
              data-testid='input'
              id={id}
              type={type}
              {...rest}
              className={styles['input__input']}
              disabled={disabled}
              placeholder={placeholder}
              ref={inputRef}
              value={value}
              {...(errorMessage
                ? { 'aria-errormessage': 'input-error', 'aria-invalid': true }
                : {})}
            />
            {endContent}
          </div>
        </div>
        {(description || errorMessage) && (
          <div className={styles['input__helper-wrapper']}>
            <div
              className={clsx(styles['input__helper-text'], {
                [styles['input__helper-text--error']]: !!errorMessage,
              })}
            >
              {errorMessage || description}
            </div>
          </div>
        )}
      </div>
    );
  }
);

export type { InputProps };
export { Input };
