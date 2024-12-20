import Cookies, { CookieAttributes } from 'js-cookie';
import { useEffect } from 'react';

const MAX_VIEWED_PRODUCTS = 10;

const useCookieHistory = (
  name: string = 'name_it',
  value: string,
  opt: CookieAttributes = {}
) => {
  useEffect(() => {
    const cookies = Cookies.get(name) || '[]';
    const viewedProducts = JSON.parse(cookies);

    // Find the index of the given value in the array
    const index = viewedProducts.indexOf(value);

    if (index !== -1) {
      // If the value exists, remove it from its current position
      viewedProducts.splice(index, 1);
    }

    // Add the value to the beginning of the array
    viewedProducts.unshift(value);

    // Ensure the array length does not exceed MAX_VIEWED_PRODUCTS
    if (viewedProducts.length > MAX_VIEWED_PRODUCTS) {
      viewedProducts.pop();
    }

    // Set the updated array back to the cookie
    Cookies.set(name, JSON.stringify(viewedProducts), opt);
  }, [name, value, opt]);
};

export { useCookieHistory };
