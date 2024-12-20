import { act, renderHook } from '@testing-library/react';

import { OnFullScreenProps, useOnFullScreen } from '../on-full-screen.hook';

describe('useOnFullScreen', () => {
  const defaultProps: OnFullScreenProps = {
    documentBodyClassName: 'fullscreen-active',
    openOnLoad: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    document.body.className = '';
  });

  it('should initialize with openOnLoad state', () => {
    const { result } = renderHook(() =>
      useOnFullScreen({ ...defaultProps, openOnLoad: true })
    );

    expect(result.current.open).toBe(true);
    expect(document.body).toHaveClass('fullscreen-active');
  });

  it('should call onOpen and add class when setOpen(true)', () => {
    const onOpenMock = jest.fn();
    const { result } = renderHook(() =>
      useOnFullScreen({ ...defaultProps, onOpen: onOpenMock })
    );

    act(() => {
      result.current.setOpen(true);
    });

    expect(result.current.open).toBe(true);
    expect(onOpenMock).toHaveBeenCalled();
    expect(document.body).toHaveClass('fullscreen-active');
  });

  it('should call onClose and remove class when setOpen(false)', () => {
    const onCloseMock = jest.fn();
    const { result } = renderHook(() =>
      useOnFullScreen({
        ...defaultProps,
        onClose: onCloseMock,
        openOnLoad: true,
      })
    );

    act(() => {
      result.current.setOpen(false);
    });

    expect(result.current.open).toBe(false);
    expect(onCloseMock).toHaveBeenCalled();
    expect(document.body).not.toHaveClass('fullscreen-active');
  });

  it('should call onESCKeyDown and close on Escape key press', () => {
    const onESCKeyDownMock = jest.fn();
    const { result } = renderHook(() =>
      useOnFullScreen({
        ...defaultProps,
        onESCKeyDown: onESCKeyDownMock,
        openOnLoad: true,
      })
    );

    act(() => {
      const event = new KeyboardEvent('keydown', { key: 'Escape' });

      document.dispatchEvent(event);
    });

    expect(result.current.open).toBe(false);
    expect(onESCKeyDownMock).toHaveBeenCalled();
    expect(document.body).not.toHaveClass('fullscreen-active');
  });

  it('should clean up class and event listeners on unmount', () => {
    const { unmount } = renderHook(() =>
      useOnFullScreen({ ...defaultProps, openOnLoad: true })
    );

    unmount();

    expect(document.body).not.toHaveClass('fullscreen-active');

    const event = new KeyboardEvent('keydown', { key: 'Escape' });

    document.dispatchEvent(event);
  });
});
