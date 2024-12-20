import { IncomingHttpHeaders } from 'http';

import { getReferer } from '../get-referer';

describe('getReferer', () => {
  it('returns the referer when it includes the host and extraPath', () => {
    const headers: IncomingHttpHeaders = {
      host: 'example.com',
      referer: 'https://example.com/some-path',
    };
    const result = getReferer({
      extraPath: '/some-path',
      headers,
      redirect: 'https://fallback.com',
    });

    expect(result).toBe('https://example.com/some-path');
  });

  it('returns the redirect URL when the referer does not include the host', () => {
    const headers: IncomingHttpHeaders = {
      host: 'example.com',
      referer: 'https://another.com/some-path',
    };
    const result = getReferer({
      extraPath: '/some-path',
      headers,
      redirect: 'https://fallback.com',
    });

    expect(result).toBe('https://fallback.com');
  });

  it('returns the redirect URL when the referer does not include the extraPath', () => {
    const headers: IncomingHttpHeaders = {
      host: 'example.com',
      referer: 'https://example.com/other-path',
    };
    const result = getReferer({
      extraPath: '/some-path',
      headers,
      redirect: 'https://fallback.com',
    });

    expect(result).toBe('https://fallback.com');
  });

  it('returns the redirect URL when the referer is undefined', () => {
    const headers: IncomingHttpHeaders = {
      host: 'example.com',
    };
    const result = getReferer({
      extraPath: '/some-path',
      headers,
      redirect: 'https://fallback.com',
    });

    expect(result).toBe('https://fallback.com');
  });

  it('handles an empty extraPath gracefully', () => {
    const headers: IncomingHttpHeaders = {
      host: 'example.com',
      referer: 'https://example.com',
    };
    const result = getReferer({
      extraPath: '',
      headers,
      redirect: 'https://fallback.com',
    });

    expect(result).toBe('https://example.com');
  });

  it('handles cases where host is undefined', () => {
    const headers: IncomingHttpHeaders = {
      referer: 'https://example.com/some-path',
    };
    const result = getReferer({
      extraPath: '/some-path',
      headers,
      redirect: 'https://fallback.com',
    });

    expect(result).toBe('https://fallback.com');
  });
});
