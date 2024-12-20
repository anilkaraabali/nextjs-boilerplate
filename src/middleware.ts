import type { NextRequest } from 'next/server';

import { NextResponse, userAgent } from 'next/server';

export default function middleware(req: NextRequest): NextResponse | undefined {
  const { device, isBot } = userAgent(req);
  const deviceType = device.type === 'mobile' ? 'mobile' : 'desktop';

  if (isBot) {
    return NextResponse.rewrite('/404');
  } else {
    const requestHeaders = new Headers(req.headers);

    requestHeaders.set('x-device-type', deviceType);

    return NextResponse.next({
      request: {
        // New request headers
        headers: requestHeaders,
      },
    });
  }
}
