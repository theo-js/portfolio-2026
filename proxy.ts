/* eslint-disable import/no-default-export -- Required to be default export as its the middleware */
import createMiddleware from 'next-intl/middleware';
import type { NextRequest } from 'next/server';

const nextIntlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales: process.env.NEXT_PUBLIC_SUPPORTED_LOCALES?.split(',') ?? [],

  // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
  defaultLocale: process.env.NEXT_PUBLIC_DEFAULT_LOCALE ?? '',
});

export default function middleware(request: NextRequest) {
  // Custom middleware logic can be added here
  request.headers.set('x-request-url', request.url);

  return nextIntlMiddleware(request);
}

export const config = {
  // Skip all paths that should not be internationalized. This example skips
  // certain folders and all pathnames with a dot (e.g. favicon.ico)
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
