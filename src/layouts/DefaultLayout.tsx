import { Footer } from '@/layouts/footer';
import { Header } from '@/layouts/header';
import { FC, PropsWithChildren } from 'react';

const DefaultLayout: FC<PropsWithChildren> = (props) => (
  <>
    <Header />
    {props.children}
    <Footer />
  </>
);

export { DefaultLayout };
