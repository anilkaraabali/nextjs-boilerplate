import { RefObject, useEffect, useRef, useState } from 'react';

function useSticky<T extends HTMLElement>(): [RefObject<T>, boolean] {
  const stickyRef = useRef<T>(null);
  const [sticky, setSticky] = useState(false);

  const observe = (): void => {
    if (!stickyRef.current) return;

    const refPageOffset = stickyRef.current.getBoundingClientRect().top;
    const stickyOffset = parseInt(getComputedStyle(stickyRef.current).top);
    const stickyActive = refPageOffset <= stickyOffset;

    setSticky(stickyActive);
  };

  useEffect(() => {
    if (!stickyRef.current) {
      return;
    }

    observe();

    const handleScroll = () => {
      observe();
    };

    document.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    window.addEventListener('orientationchange', handleScroll);

    return (): void => {
      document.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      window.removeEventListener('orientationchange', handleScroll);
    };
  }, [sticky]);

  return [stickyRef, sticky];
}

export { useSticky };
