import { fontSans } from '@/config';
import Document, {
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';
import React from 'react';

export default class MyDocument extends Document<DocumentInitialProps> {
  render() {
    return (
      <Html lang='en' style={{ scrollBehavior: 'smooth' }}>
        <Head />
        <body className={fontSans.variable}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
