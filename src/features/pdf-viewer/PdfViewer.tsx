import { BreadcrumbOptionType, Breadcrumbs } from '@/ui/breadcrumbs';
import { CircularProgress } from '@/ui/circular-progress';
import { Container } from '@/ui/container';
import { list, throttle } from 'radash';
import { FC, useCallback, useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

import styles from './PdfViewer.module.scss';

pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.js';

interface PdfViewerProps {
  breadcrumbs: BreadcrumbOptionType[];
  fileName: string;
  title: string;
}

const PdfViewer: FC<PdfViewerProps> = ({ breadcrumbs, fileName, title }) => {
  const [numPages, setNumPages] = useState<null | number>(null);
  const [initialWidth, setInitialWidth] = useState<number | undefined>(
    undefined
  );

  const onDocumentLoadSuccess = useCallback(
    ({ numPages }: { numPages: number }) => {
      setNumPages(numPages);
    },
    []
  );

  useEffect(() => {
    const listener = () => {
      const element = document.querySelector('#main');

      setInitialWidth(element?.getBoundingClientRect().width);
    };

    window.addEventListener('resize', throttle({ interval: 500 }, listener));
    listener();

    return () => {
      window.removeEventListener(
        'resize',
        throttle({ interval: 500 }, listener)
      );
    };
  }, []);

  const PageWrapper = useCallback<FC<{ pageNumber: number }>>(
    ({ pageNumber }) => (
      <Page pageNumber={pageNumber + 1} width={initialWidth} />
    ),
    [initialWidth]
  );

  return (
    <main>
      <Container>
        <Breadcrumbs
          className={styles['pdf-layout__breadcrumbs']}
          options={breadcrumbs}
        />
        <div className={styles['pdf-layout__header']}>
          <h1 className={styles['pdf-layout__title']}>{title}</h1>
        </div>
        <Document
          file={fileName}
          loading={<CircularProgress size='xl' />}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          {numPages &&
            list(numPages - 1).map((pageNumber) => (
              <PageWrapper key={`page_${pageNumber}`} pageNumber={pageNumber} />
            ))}
        </Document>
      </Container>
    </main>
  );
};

export type { PdfViewerProps };
export { PdfViewer };
