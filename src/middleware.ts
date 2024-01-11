import createIntlMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';
import { HEADERS } from './consts/headers';

export default async function middleware(request: NextRequest) {
  const defaultLocale = 'en';
  const { geo } = request;

  const handleI18nRouting = createIntlMiddleware({
    locales: ['en', 'pt'],
    defaultLocale,
  });
  const response = handleI18nRouting(request);

  response.headers.set(HEADERS.USER_CITY, geo?.city || 'Campinas');
  response.headers.set(HEADERS.USER_COUNTRY, geo?.country || 'BR');

  return response;
}

export const config = {
  matcher: ['/', '/(pt|en)/:path*'],
};
