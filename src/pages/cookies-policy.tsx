import type { GetServerSideProps } from 'next';

import { PdfViewProps } from '@/features/pdf-viewer/PdfView';
import { getViewProps } from '@/utils';
import { promiseAllSettled } from '@/utils/promise-all-settled';

export const getServerSideProps = (async (ctx) => {
  const [messages] = await promiseAllSettled([getViewProps(ctx)]);

  return {
    props: {
      breadcrumbs: [
        { title: 'Home', url: '/' },
        { title: 'Cookies policy', url: '/cookies-policy' },
      ],
      fileName:
        'https://ontheline.trincoll.edu/images/bookdown/sample-local-pdf.pdf',
      title: 'Cookies policy',
      ...messages,
    },
  };
}) satisfies GetServerSideProps<PdfViewProps>;

export { default } from '@/features/pdf-viewer/PdfView';
