import React, {
  FC,
  PropsWithChildren,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  rootId?: string;
}

const Portal: FC<PropsWithChildren<PortalProps>> = ({
  children,
  rootId = 'portal-root',
}) => {
  const rootRef = useRef<HTMLDivElement | null>(null);

  const [mounted, setMounted] = useState(false);

  useLayoutEffect(() => {
    rootRef.current = document.createElement('div');
    rootRef.current.setAttribute('data-react-portal', 'true');
    rootRef.current.setAttribute('id', rootId);
    rootRef.current.setAttribute('data-testid', rootId);
    document.body.appendChild(rootRef.current);

    setMounted(true);

    return (): void => {
      rootRef.current?.remove();
    };
  }, []);

  if (!mounted || !rootRef.current) {
    return null;
  }

  return <>{createPortal(<>{children}</>, rootRef.current)}</>;
};

export type { PortalProps };
export { Portal };
