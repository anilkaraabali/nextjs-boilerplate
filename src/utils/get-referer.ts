import { IncomingHttpHeaders } from 'http';

export const getReferer = ({
  extraPath = '',
  headers,
  redirect,
}: {
  extraPath?: string;
  headers: IncomingHttpHeaders;
  redirect: string;
}) =>
  headers.referer?.includes(`${headers.host}${extraPath}`)
    ? headers.referer
    : redirect;
