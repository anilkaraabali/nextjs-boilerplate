import { useEffect, useRef } from 'react';

function usePrevious<T>(value: T): null | T {
  const ref = useRef<null | T>(null);

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}

export { usePrevious };
