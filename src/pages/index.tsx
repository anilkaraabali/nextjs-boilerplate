import type { GetServerSideProps } from 'next';

import { HomeViewProps } from '@/features/home/HomeView';
import { getViewProps } from '@/utils';
import { promiseAllSettled } from '@/utils/promise-all-settled';

export const getServerSideProps = (async (ctx) => {
  const [messages] = await promiseAllSettled([getViewProps(ctx, ['Homepage'])]);

  return {
    props: {
      ...messages,
    },
  };
}) satisfies GetServerSideProps<HomeViewProps>;

export { default } from '@/features/home/HomeView';
