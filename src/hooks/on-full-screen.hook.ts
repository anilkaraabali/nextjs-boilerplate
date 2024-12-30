import { useEffect, useRef, useState } from 'react';

interface OnFullScreenProps {
  documentBodyClassName: string;
  isOpen: boolean;
  onClose?: () => void;
  onESCKeyDown?: () => void;
  onOpen?: () => void;
}

const useOnFullScreen = ({
  documentBodyClassName,
  isOpen,
  onClose,
  onESCKeyDown,
  onOpen,
}: OnFullScreenProps): {
  open: boolean;
  setOpen: (status: boolean) => void;
} => {
  const [open, setOpen] = useState(isOpen);
  const initialRenderRef = useRef(!isOpen);

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
      document.body.classList.remove(documentBodyClassName);
      document.removeEventListener('keydown', escListener);
    };
  }, [open, onClose, onOpen, onESCKeyDown, documentBodyClassName]);

  return {
    open,
    setOpen,
  };
};

export type { OnFullScreenProps };
export { useOnFullScreen };
