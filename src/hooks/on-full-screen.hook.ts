import { useEffect, useRef, useState } from 'react';

export interface OnFullScreenProps {
  documentBodyClassName: string;
  onClose?: () => void;
  onESCKeyDown?: () => void;
  onOpen?: () => void;
  openOnLoad: boolean;
}

export const useOnFullScreen = ({
  documentBodyClassName,
  onClose,
  onESCKeyDown,
  onOpen,
  openOnLoad,
}: OnFullScreenProps): {
  open: boolean;
  setOpen: (status: boolean) => void;
} => {
  const [open, setOpen] = useState(openOnLoad);
  const initialRenderRef = useRef(!openOnLoad);

  useEffect(() => {
    if (initialRenderRef.current) {
      initialRenderRef.current = false;

      return;
    }

    const escListener = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        setOpen(false);
        onESCKeyDown?.();
      }
    };

    if (open) {
      document.body.classList.add(documentBodyClassName);
      document.addEventListener('keydown', escListener);
      onOpen?.();
    } else {
      document.body.classList.remove(documentBodyClassName);
      document.removeEventListener('keydown', escListener);
      onClose?.();
    }

    return (): void => {
      // cleanup anyway on unmount
      document.body.classList.remove(documentBodyClassName);
      document.removeEventListener('keydown', escListener);
    };
  }, [open, onClose, onOpen, onESCKeyDown, documentBodyClassName]);

  return {
    open,
    setOpen,
  };
};
