import { useEffect, useRef, useState } from 'react';

export type ScrollDirectionType = 'down' | 'up';

const useScrollDirection = ({
  initialDirection = 'down',
  scrollTriggerTime = 300,
  thresholdPixels = 0,
}: {
  initialDirection: ScrollDirectionType;
  scrollTriggerTime?: number;
  thresholdPixels: number;
}): { isScrolling: boolean; scrollDirection: ScrollDirectionType } => {
  const [scrollDirection, setScrollDirection] =
    useState<ScrollDirectionType>(initialDirection);
  const [isScrolling, setIsScrolling] = useState<boolean>(false);
  const timer = useRef<null | ReturnType<typeof setTimeout>>(null);

  // Scroll Listeners
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScrollDirection = (): void => {
      const scrollY = window.scrollY;

      if (Math.abs(scrollY - lastScrollY) < thresholdPixels) {
        // We haven't exceeded the threshold
        ticking = false;

        return;
      }

      setIsScrolling(true);
      setScrollDirection(scrollY > lastScrollY ? 'down' : 'up');
      lastScrollY = scrollY > 0 ? scrollY : 0;
      ticking = false;

      if (timer.current !== null) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(function () {
        setIsScrolling(false);
      }, scrollTriggerTime);
    };

    const onScroll = (): void => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDirection);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll);

    return (): void => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [thresholdPixels]);

  return { isScrolling, scrollDirection };
};

export { useScrollDirection };
