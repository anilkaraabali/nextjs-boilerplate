import { renderHook } from '@testing-library/react';

import { usePrevious } from '../previous.hook';

describe('usePrevious', () => {
  it('should return null on initial render', () => {
    const { result } = renderHook(() => usePrevious(0));

    expect(result.current).toBeNull();
  });

  it('should return the previous value after updates', () => {
    const { rerender, result } = renderHook(({ value }) => usePrevious(value), {
      initialProps: { value: 0 },
    });

    rerender({ value: 1 });

    expect(result.current).toBe(0);

    rerender({ value: 2 });

    expect(result.current).toBe(1);
  });

  it('should retain the previous value for non-primitive types', () => {
    const { rerender, result } = renderHook(({ value }) => usePrevious(value), {
      initialProps: { value: { key: 'initial' } },
    });

    rerender({ value: { key: 'updated' } });

    expect(result.current).toEqual({ key: 'initial' });

    rerender({ value: { key: 'latest' } });

    expect(result.current).toEqual({ key: 'updated' });
  });
});
