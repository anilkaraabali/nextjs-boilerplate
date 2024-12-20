import { ViewProps } from '@/types';
import { getDeviceInfo } from '@/utils/get-device-info';
import { getReferer } from '@/utils/get-referer';
import { GetServerSidePropsContext } from 'next';
import { pick } from 'radash';

export const getViewProps = async (
  ctx: GetServerSidePropsContext,
  namespaces: string[] = []
): Promise<ViewProps> => ({
  ...getDeviceInfo(ctx.req.headers['user-agent']),
  messages: pick((await import(`../../messages/${ctx.locale}.json`)).default, [
    ...namespaces,
    'Common',
  ]),
  referer: getReferer({
    headers: ctx.req.headers,
    redirect: '/',
  }),
});
