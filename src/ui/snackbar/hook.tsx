import { SnackbarStoreProps, useSnackbarStore } from './SnackbarStore';

const useSnackbar = (): Pick<
  SnackbarStoreProps,
  'alert' | 'hide' | 'isVisible'
> => {
  const { alert, hide, isVisible } = useSnackbarStore();

  return {
    alert,
    hide,
    isVisible,
  };
};

export { useSnackbar };
