import { LogoNext, LogoVercelmark } from '@/components/logo';
import { siteConfig } from '@/config/site';
import { Link } from '@/ui/link';
import clsx from 'clsx';
import { ComponentPropsWithRef, forwardRef } from 'react';

import styles from './Header.module.scss';

interface HeaderProps extends ComponentPropsWithRef<'header'> {}

const Header = forwardRef<HTMLElement, HeaderProps>((props, ref) => (
  <header
    data-testid='header'
    id='header'
    {...props}
    className={clsx(styles['header'], props.className)}
    ref={ref}
  >
    <nav className={styles['header__nav']}>
      <div className={styles['header__stack']}>
        <Link
          aria-label='Go to Vercel homepage'
          data-testid='logo-vercelmark'
          href='https://vercel.com/home?utm_source=next-site&amp;utm_medium=banner&amp;utm_campaign=home'
          isExternal
          title='Go to Vercel homepage'
        >
          <LogoVercelmark />
        </Link>
        <svg
          className={styles['header__divider']}
          height='32'
          viewBox='0 0 32 32'
          width='32'
        >
          <path
            d='M22 5L9 28'
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
        <Link
          aria-label='Go to the homepage'
          data-testid='logo-next'
          href='https://vercel.com/home?utm_source=next-site&amp;utm_medium=banner&amp;utm_campaign=home'
          isExternal
          title='Go to the homepage'
        >
          <LogoNext />
        </Link>
      </div>
      <ul className={styles['header__links']}>
        {siteConfig.navItems.map((item) => (
          <li className={styles['header__item']} key={item.href}>
            <a
              className={styles['header__link']}
              href={item.href}
              rel='noopener noreferrer'
              target='_blank'
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  </header>
));

export type { HeaderProps };
export { Header };
