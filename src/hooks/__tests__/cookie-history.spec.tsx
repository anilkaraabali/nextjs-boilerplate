import { renderHook } from '@testing-library/react';
import Cookies from 'js-cookie';

import { useCookieHistory } from '../cookie-history.hook';

jest.mock('js-cookie', () => ({
  get: jest.fn(),
  set: jest.fn(),
}));

describe('useCookieHistory', () => {
  const COOKIE_NAME = 'test_cookie';
  const COOKIE_OPTIONS = { expires: 7, path: '/' };
  const MAX_VIEWED_PRODUCTS = 10;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('sets a new value in the cookie if the cookie does not exist', () => {
    (Cookies.get as jest.Mock).mockReturnValueOnce(undefined);

    renderHook(() => useCookieHistory(COOKIE_NAME, 'product1', COOKIE_OPTIONS));

    expect(Cookies.set).toHaveBeenCalledWith(
      COOKIE_NAME,
      JSON.stringify(['product1']),
      COOKIE_OPTIONS
    );
  });

  it('adds a new value to the beginning of the array', () => {
    (Cookies.get as jest.Mock).mockReturnValueOnce(
      JSON.stringify(['product2', 'product3'])
    );

    renderHook(() => useCookieHistory(COOKIE_NAME, 'product1', COOKIE_OPTIONS));

    expect(Cookies.set).toHaveBeenCalledWith(
      COOKIE_NAME,
      JSON.stringify(['product1', 'product2', 'product3']),
      COOKIE_OPTIONS
    );
  });

  it('removes duplicates of the value and reorders it to the front', () => {
    (Cookies.get as jest.Mock).mockReturnValueOnce(
      JSON.stringify(['product1', 'product2', 'product3'])
    );

    renderHook(() => useCookieHistory(COOKIE_NAME, 'product2', COOKIE_OPTIONS));

    expect(Cookies.set).toHaveBeenCalledWith(
      COOKIE_NAME,
      JSON.stringify(['product2', 'product1', 'product3']),
      COOKIE_OPTIONS
    );
  });

  it('ensures the array does not exceed MAX_VIEWED_PRODUCTS', () => {
    const longHistory = Array.from(
      { length: MAX_VIEWED_PRODUCTS },
      (_, i) => `product${i + 1}`
    );

    (Cookies.get as jest.Mock).mockReturnValueOnce(JSON.stringify(longHistory));

    renderHook(() =>
      useCookieHistory(COOKIE_NAME, 'newProduct', COOKIE_OPTIONS)
    );

    const expectedHistory = [
      'newProduct',
      ...longHistory.slice(0, MAX_VIEWED_PRODUCTS - 1),
    ];

    expect(Cookies.set).toHaveBeenCalledWith(
      COOKIE_NAME,
      JSON.stringify(expectedHistory),
      COOKIE_OPTIONS
    );
  });

  it('uses default cookie options if none are provided', () => {
    (Cookies.get as jest.Mock).mockReturnValueOnce(undefined);

    renderHook(() => useCookieHistory(COOKIE_NAME, 'product1'));

    expect(Cookies.set).toHaveBeenCalledWith(
      COOKIE_NAME,
      JSON.stringify(['product1']),
      {}
    );
  });
});
