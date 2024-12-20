import { LogoVercel } from '@/components/logo';
import { siteConfig } from '@/config';
import { Container } from '@/ui/container/Container';
import { Link } from '@/ui/link';
import clsx from 'clsx';
import React, { ComponentPropsWithRef, forwardRef } from 'react';

import styles from './Footer.module.scss';

interface FooterProps extends ComponentPropsWithRef<'footer'> {}

const Footer = forwardRef<HTMLElement, FooterProps>((props, ref) => (
  <footer
    data-testid='footer'
    id='footer'
    {...props}
    className={clsx(styles['footer'], props.className)}
    ref={ref}
  >
    <Container className={styles['footer__content']}>
      <nav className={styles['footer__nav']}>
        <Link
          aria-label='Vercel logo'
          href='https://vercel.com'
          isExternal
          theme='default'
        >
          <LogoVercel data-testid='logo-vercel' />
        </Link>
        {siteConfig.footerItems.map((item, index) => (
          <div key={index}>
            <h4 className={styles['footer__title']}>{item.title}</h4>
            <ul className={styles['footer__list']}>
              {item.items.map((subItem, subIndex) => (
                <li className={styles['footer__item']} key={subIndex}>
                  <Link
                    className={styles['footer__link']}
                    href={subItem.href}
                    isExternal
                    theme='default'
                  >
                    {subItem.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </Container>
  </footer>
));

export type { FooterProps };
export { Footer };
