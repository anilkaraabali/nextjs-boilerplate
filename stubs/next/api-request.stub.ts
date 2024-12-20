import { NextApiRequest } from 'next';

export const nextApiRequestStub = (
  req?: Partial<NextApiRequest>
): NextApiRequest =>
  ({
    body: {},
    cookies: {},
    headers: {},
    method: 'GET',
    query: {},
    url: '',
    ...req,
  }) as NextApiRequest;
