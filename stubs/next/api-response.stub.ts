import { NextApiResponse } from 'next';

export const nextApiResponseStub = (): NextApiResponse =>
  ({
    end: jest.fn().mockReturnThis() as NextApiResponse['end'],
    json: jest.fn().mockReturnThis() as NextApiResponse['json'],
    send: jest.fn().mockReturnThis() as NextApiResponse['send'],
    setHeader: jest.fn().mockReturnThis() as NextApiResponse['setHeader'],
    status: jest.fn().mockReturnThis() as NextApiResponse['status'],
  }) as NextApiResponse;
