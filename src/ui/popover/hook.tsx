import React, { useCallback, useEffect, useReducer, useRef } from 'react';

import { Popover, PopoverProps } from './Popover';
import { popoverReducer } from './reducer';

interface PopoverHookResultInterface {
  close: () => void;
  onClick: React.MouseEventHandler<Element>;
  onMouseEnter: React.MouseEventHandler<Element>;
  Popover: (props: PopoverProps) => ReturnType<typeof Popover>;
}

const usePopover = (): PopoverHookResultInterface => {
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const onCloseRef = useRef<Function | null>(null);

  const [state, dispatch] = useReducer(popoverReducer, {
    open: false,
    triggerEl: null,
    triggerType: null,
  });

  const { open, triggerEl, triggerType } = state;

  const listener = useCallback(
    (mouseEvent: MouseEvent) => {
      const clickInsidePopover = popoverRef.current?.contains(
        mouseEvent.target as Node
      );
      const clickTriggerEl = triggerEl?.contains(mouseEvent.target as Node);

      if (!clickTriggerEl && !clickInsidePopover) {
        dispatch({ type: 'close' });
      }
    },
    [popoverRef, triggerEl, dispatch]
  );

  useEffect(() => {
    if (triggerType === 'click') {
      if (open) {
        document.addEventListener('click', listener, { capture: true });
      } else {
        document.removeEventListener('click', listener, { capture: true });
        onCloseRef.current?.();
      }
    } else if (triggerType === 'hover') {
      if (open) {
        document.addEventListener('mousemove', listener, { capture: true });
      } else {
        document.removeEventListener('mousemove', listener, { capture: true });
        onCloseRef.current?.();
      }
    }

    return (): void => {
      document.removeEventListener('click', listener, { capture: true });
      document.removeEventListener('mousemove', listener, { capture: true });
    };
  }, [open, triggerType]);

  return {
    close: (): void => {
      dispatch({ type: 'close' });
    },
    onClick: (event): void => {
      dispatch({ currentTarget: event.currentTarget, type: 'onClick' });
    },
    onMouseEnter: (event): void => {
      dispatch({ currentTarget: event.currentTarget, type: 'onMouseEnter' });
    },
    Popover: (props): ReturnType<typeof Popover> => {
      if (!open) {
        return null;
      }

      return <Popover {...props} ref={popoverRef} />;
    },
  };
};

export { usePopover };
