import { renderHook } from '@testing-library/react';

import { useHideOnScrollingDown } from '../hide-on-scrolling-down.hook';
import { useScrollDirection } from '../scroll-direction.hook';

jest.mock('../scroll-direction.hook', () => ({
  useScrollDirection: jest.fn(),
}));

describe('useHideOnScrollingDown', () => {
  const mockUseScrollDirection = useScrollDirection as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return false initially when not scrolling', () => {
    mockUseScrollDirection.mockReturnValue({
      isScrolling: false,
      scrollDirection: 'up',
    });

    const { result } = renderHook(() => useHideOnScrollingDown());

    expect(result.current).toBe(false);
  });

  it('should return false when scrolling up', () => {
    mockUseScrollDirection.mockReturnValue({
      isScrolling: true,
      scrollDirection: 'up',
    });

    const { result } = renderHook(() => useHideOnScrollingDown());

    expect(result.current).toBe(false);
  });

  it('should return true when scrolling down', () => {
    mockUseScrollDirection.mockReturnValue({
      isScrolling: true,
      scrollDirection: 'down',
    });

    const { result } = renderHook(() => useHideOnScrollingDown());

    expect(result.current).toBe(true);
  });

  it('should return false when scrolling stops after scrolling down', () => {
    const { rerender, result } = renderHook(() => useHideOnScrollingDown());

    mockUseScrollDirection.mockReturnValue({
      isScrolling: true,
      scrollDirection: 'down',
    });
    rerender();

    expect(result.current).toBe(true);

    mockUseScrollDirection.mockReturnValue({
      isScrolling: false,
      scrollDirection: 'down',
    });
    rerender();

    expect(result.current).toBe(false);
  });

  it('should respect the initial direction and threshold', () => {
    renderHook(() => useHideOnScrollingDown('down', 100));

    expect(mockUseScrollDirection).toHaveBeenCalledWith({
      initialDirection: 'down',
      thresholdPixels: 100,
    });
  });
});
