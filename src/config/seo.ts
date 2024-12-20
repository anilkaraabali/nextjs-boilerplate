import { NextSeoProps } from 'next-seo';

const seoConfig: NextSeoProps = {
  description:
    'Next.js by Vercel is the full-stack React framework for the web.',
  openGraph: {
    description:
      'Next.js by Vercel is the full-stack React framework for the web',
    images: [
      {
        height: 1600,
        url: 'https://assets.vercel.com/image/upload/front/nextjs/twitter-card.png',
        width: 2800,
      },
    ],
    locale: 'en_IE',
    site_name: '@vercel',
    type: 'website',
    url: 'https://www.url.ie/',
  },
  title: 'Next.js by Vercel - The React Framework',
  twitter: {
    cardType: 'summary_large_image',

    handle: '@handle',
    site: '@vercel',
  },
};

export { seoConfig };
