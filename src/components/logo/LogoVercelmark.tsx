import { ComponentPropsWithRef, forwardRef } from 'react';

interface LogoVercelmarkProps extends ComponentPropsWithRef<'svg'> {}

const LogoVercelmark = forwardRef<SVGSVGElement, LogoVercelmarkProps>(
  (props, ref) => (
    <svg
      aria-label='Vercel logomark'
      height='22'
      role='img'
      style={{ overflow: 'visible', width: 'auto' }}
      viewBox='0 0 74 64'
      {...props}
      ref={ref}
    >
      <path d='M37.5896 0.25L74.5396 64.25H0.639648L37.5896 0.25Z' />
    </svg>
  )
);

export type { LogoVercelmarkProps };
export { LogoVercelmark };
