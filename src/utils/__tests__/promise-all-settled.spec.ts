import { promiseAllSettled } from '../promise-all-settled';

describe('promiseAllSettled', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('resolves with all fulfilled values when all promises resolve', async () => {
    const promises = [
      Promise.resolve(1),
      Promise.resolve(2),
      Promise.resolve(3),
    ];

    const result = await promiseAllSettled(promises);

    expect(result).toEqual([1, 2, 3]);
  });

  it('returns error objects for rejected promises', async () => {
    const errorMessage = 'Some error';
    const promises = [Promise.resolve(1), Promise.reject(errorMessage)];

    const result = await promiseAllSettled(promises);

    expect(result).toEqual([
      1,
      {
        error: {
          body: errorMessage,
          status: 500,
        },
        ok: false,
      },
    ]);
  });

  it('handles mixed resolved and rejected promises', async () => {
    const promises = [
      Promise.resolve('a'),
      Promise.reject('error1'),
      Promise.resolve('b'),
      Promise.reject('error2'),
    ];

    const result = await promiseAllSettled(promises);

    expect(result).toEqual([
      'a',
      {
        error: {
          body: 'error1',
          status: 500,
        },
        ok: false,
      },
      'b',
      {
        error: {
          body: 'error2',
          status: 500,
        },
        ok: false,
      },
    ]);
  });

  it('logs errors for rejected promises to the console', async () => {
    const promises = [Promise.reject('Error logging test')];

    await promiseAllSettled(promises);

    // eslint-disable-next-line no-console
    expect(console.error).toHaveBeenCalledWith(
      'Promise rejected with reason: Error logging test'
    );
  });

  it('returns an empty array when no promises are passed', async () => {
    const promises: Promise<unknown>[] = [];

    const result = await promiseAllSettled(promises);

    expect(result).toEqual([]);
  });
});
