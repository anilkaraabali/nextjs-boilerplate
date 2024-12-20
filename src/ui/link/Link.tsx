import clsx from 'clsx';
import { ComponentPropsWithRef, forwardRef, ReactNode } from 'react';

import styles from './Link.module.scss';

type LinkSizeType = 'lg' | 'md' | 'sm';
type LinkUnderlineType = 'active' | 'always' | 'hover' | 'none';
type LinkThemeType = 'default' | 'primary' | 'secondary';

interface LinkProps extends ComponentPropsWithRef<'a'> {
  endContent?: ReactNode;
  /**
   * @description If `true`, the link will be rendered as a block element with a `hover` effect.
   */
  isBlock?: boolean;
  isExternal?: boolean;
  size?: LinkSizeType;
  startContent?: ReactNode;
  theme?: LinkThemeType;
  underline?: LinkUnderlineType;
}

const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      children,
      endContent,
      isBlock = false,
      isExternal = false,
      size = 'sm',
      startContent,
      theme = 'primary',
      underline = 'none',
      ...rest
    },
    ref
  ) => (
    <a
      data-testid='link'
      {...rest}
      {...(isExternal
        ? {
            rel: 'noopener noreferrer',
            target: '_blank',
          }
        : undefined)}
      className={clsx(
        styles['link'],
        {
          [styles['link--block']]: isBlock,
          [styles[`link-size--${size}`]]: size,
          [styles[`link-theme--${theme}`]]: theme,
          [styles[`link-underline--${underline}`]]: underline,
        },
        rest.className
      )}
      ref={ref}
    >
      {startContent}
      {children}
      {endContent}
    </a>
  )
);

export type { LinkProps };
export { Link };
