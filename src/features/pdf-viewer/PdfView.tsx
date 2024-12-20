import type { InferGetServerSidePropsType } from 'next';

import { getServerSideProps } from '@/pages/cookies-policy';
import { ViewProps } from '@/types';

import { PdfViewer, PdfViewerProps } from './PdfViewer';

interface PdfViewProps extends ViewProps, PdfViewerProps {}

function PdfView(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  return <PdfViewer {...props} />;
}

export type { PdfViewProps };
export default PdfView;
