import { seoConfig } from '@/config';
import { DefaultSeo } from 'next-seo';
import NextHead from 'next/head';
import React from 'react';

const Head = () => (
  <>
    <DefaultSeo {...seoConfig} />
    <NextHead>
      <meta
        content='viewport-fit=cover, width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'
        key='viewport'
        name='viewport'
      />
      <meta content='#FAFAFA' name='theme-color' />
      <link href='/favicon.ico' rel='icon' />
    </NextHead>
  </>
);

export { Head };
