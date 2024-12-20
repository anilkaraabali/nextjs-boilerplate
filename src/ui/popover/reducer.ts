import { Reducer } from 'react';

interface PopoverState {
  open: boolean;
  triggerEl: Element | null;
  triggerType: 'click' | 'hover' | null;
}

type PopoverActionType =
  | {
      currentTarget: Element & EventTarget;
      type: 'onClick';
    }
  | {
      currentTarget: Element & EventTarget;
      type: 'onMouseEnter';
    }
  | {
      type: 'close';
    };

const popoverReducer: Reducer<PopoverState, PopoverActionType> = (
  state,
  action
) => {
  switch (action.type) {
    case 'onClick':
      return {
        ...state,
        open: !state.open,
        triggerEl: action.currentTarget,
        triggerType: 'click',
      };

    case 'onMouseEnter':
      return {
        ...state,
        open: !state.open,
        triggerEl: action.currentTarget,
        triggerType: 'hover',
      };

    case 'close':
      return {
        ...state,
        open: false,
      };
  }
};

export type { PopoverActionType, PopoverState };
export { popoverReducer };
