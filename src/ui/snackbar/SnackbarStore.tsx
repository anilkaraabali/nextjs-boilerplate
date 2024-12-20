import { create } from 'zustand';

import { SnackbarProps } from './Snackbar';

interface SnackbarStoreProps extends SnackbarProps {
  alert: (props: SnackbarProps) => void;
  hide: () => void;
  isVisible: boolean;
  timerRef: null | ReturnType<typeof setTimeout>;
}

const defaultState: Pick<
  SnackbarStoreProps,
  'isVisible' | 'message' | 'timerRef'
> = {
  isVisible: false,
  message: '',
  timerRef: null,
};

const useSnackbarStore = create<SnackbarStoreProps>((set, get) => ({
  ...defaultState,
  alert: (props) => {
    const { hide, timerRef } = get();

    if (timerRef) {
      clearTimeout(timerRef);
    }

    const hasAction = props.primaryAction || props.secondaryAction;
    const newTimerRef = setTimeout(
      () => {
        hide();
      },
      hasAction ? 6000 : 4000
    );

    set({
      ...props,
      isVisible: true,
      timerRef: newTimerRef,
    });
  },
  hide: () => {
    const { timerRef } = get();

    if (timerRef) {
      clearTimeout(timerRef);
    }
    set({ ...defaultState });
  },
}));

export type { SnackbarStoreProps };
export { useSnackbarStore };
