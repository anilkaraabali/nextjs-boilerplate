import clsx from 'clsx';
import {
  ComponentPropsWithRef,
  forwardRef,
  useCallback,
  useState,
} from 'react';
import { LiaAngleDownSolid, LiaAngleUpSolid } from 'react-icons/lia';

import { SanitizeHtmlAsync } from '../sanitize-html';
import styles from './CollapsingDescription.module.scss';

const MAX_HEIGHT = 124;

interface CollapsingDescriptionProps extends ComponentPropsWithRef<'div'> {
  maxHeight?: number;
  text: string;
}

const CollapsingDescription = forwardRef<
  HTMLDivElement,
  CollapsingDescriptionProps
>(({ maxHeight = MAX_HEIGHT, text, ...rest }, ref) => {
  const [scrollHeight, setScrollHeight] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const contentRef = useCallback(
    (node: HTMLDivElement) => {
      if (node) {
        setScrollHeight(node.scrollHeight);
      }
    },
    [expanded]
  );

  const Icon = expanded ? LiaAngleUpSolid : LiaAngleDownSolid;

  return (
    <div
      data-testid='collapsing-description'
      {...rest}
      className={clsx(styles['collapsing-description'], rest.className)}
      ref={ref}
    >
      <div
        className={clsx(styles['collapsing-description__content'], {
          [styles['collapsing-description__content--trim']]:
            !expanded && scrollHeight > maxHeight,
        })}
        data-testid='collapsing-description-content'
        ref={contentRef}
        style={
          {
            '--collapsing-description-max-height': maxHeight,
            maxHeight: expanded ? scrollHeight : maxHeight,
          } as React.CSSProperties
        }
      >
        <SanitizeHtmlAsync text={text} />
      </div>
      {scrollHeight > maxHeight ? (
        <button
          className={styles['collapsing-description__button']}
          onClick={(): void => {
            setExpanded(!expanded);
          }}
          type='button'
        >
          <Icon size={20} />
        </button>
      ) : null}
    </div>
  );
});

export type { CollapsingDescriptionProps };
export { CollapsingDescription };
