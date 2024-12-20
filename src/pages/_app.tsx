import type { AppProps, NextWebVitalsMetric } from 'next/app';

import { ErrorBoundary } from '@/components/error';
import { fontMono, fontSans } from '@/config';
import { DefaultLayout, Head } from '@/layouts';
import '@/styles/index.scss';
import { Snackbar } from '@/ui/snackbar';
import { NextPage } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { useRouter } from 'next/router';

export type NextPageWithLayout<P = object, IP = P> = {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
} & NextPage<P, IP>;

type AppPropsWithLayout = {
  Component: NextPageWithLayout;
} & AppProps;

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout =
    Component.getLayout ?? ((page) => <DefaultLayout>{page}</DefaultLayout>);

  const router = useRouter();

  return (
    <ErrorBoundary
      deviceType={pageProps.deviceType}
      isTouchable={pageProps.isTouchable}
      messages={pageProps.messages}
      referer={pageProps.referer}
    >
      <NextIntlClientProvider
        locale={router.locale}
        messages={pageProps.messages}
        timeZone='Europe/Berlin'
      >
        <div id='root'>
          <Head />
          <Snackbar />
          {getLayout(<Component {...pageProps} />)}
        </div>
      </NextIntlClientProvider>
    </ErrorBoundary>
  );
}

export const fonts = {
  mono: fontMono.style.fontFamily,
  sans: fontSans.style.fontFamily,
};

export function reportWebVitals(metric: NextWebVitalsMetric) {
  const name = metric.name.replace('Next.js-', '');
  const value = metric.value.toFixed(name === 'CLS' ? 1 : 0);

  // eslint-disable-next-line no-console
  console.info(
    `CWV-${name}:${value}:${
      metric.startTime ? Math.round(metric.startTime) : 0
    }`
  );
}
