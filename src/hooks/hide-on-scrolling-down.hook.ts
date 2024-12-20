import { useEffect, useState } from 'react';

import {
  ScrollDirectionType,
  useScrollDirection,
} from './scroll-direction.hook';

const useHideOnScrollingDown = (
  initialDirection: ScrollDirectionType = 'up',
  thresholdPixels: number = 0
): boolean => {
  const [hideComponent, setHideComponent] = useState(false);

  const { isScrolling, scrollDirection } = useScrollDirection({
    initialDirection,
    thresholdPixels,
  });

  useEffect(() => {
    if (!isScrolling || scrollDirection === 'up') {
      setHideComponent(false);
    } else if (scrollDirection === 'down') {
      setHideComponent(true);
    }
  }, [isScrolling, scrollDirection]);

  return hideComponent;
};

export { useHideOnScrollingDown };
