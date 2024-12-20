import { act, renderHook } from '@testing-library/react';
import { useRouter } from 'next/router';

import { usePageIsLoading } from '../page-is-loading.hook';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('usePageIsLoading', () => {
  const mockRouterEvents = {
    off: jest.fn(),
    on: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ events: mockRouterEvents });
  });

  it('should initialize with isLoading set to false', () => {
    const { result } = renderHook(() => usePageIsLoading());

    expect(result.current).toBe(false);
  });

  it('should set isLoading to true on routeChangeStart and false on routeChangeComplete', () => {
    const { result } = renderHook(() => usePageIsLoading());

    const onRouteChangeStart = mockRouterEvents.on.mock.calls.find(
      ([event]) => event === 'routeChangeStart'
    )?.[1];
    const onRouteChangeComplete = mockRouterEvents.on.mock.calls.find(
      ([event]) => event === 'routeChangeComplete'
    )?.[1];

    act(() => {
      onRouteChangeStart();
    });

    expect(result.current).toBe(true);

    act(() => {
      onRouteChangeComplete();
    });

    expect(result.current).toBe(false);
  });

  it('should call router.events.on and router.events.off with appropriate event handlers', () => {
    const { unmount } = renderHook(() => usePageIsLoading());

    expect(mockRouterEvents.on).toHaveBeenCalledWith(
      'routeChangeStart',
      expect.any(Function)
    );
    expect(mockRouterEvents.on).toHaveBeenCalledWith(
      'routeChangeComplete',
      expect.any(Function)
    );
    expect(mockRouterEvents.on).toHaveBeenCalledWith(
      'routeChangeError',
      expect.any(Function)
    );

    unmount();

    expect(mockRouterEvents.off).toHaveBeenCalledWith(
      'routeChangeStart',
      expect.any(Function)
    );
    expect(mockRouterEvents.off).toHaveBeenCalledWith(
      'routeChangeComplete',
      expect.any(Function)
    );
    expect(mockRouterEvents.off).toHaveBeenCalledWith(
      'routeChangeError',
      expect.any(Function)
    );
  });
});
