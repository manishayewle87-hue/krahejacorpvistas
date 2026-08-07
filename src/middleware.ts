import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['en', 'mr', 'hi'];
const defaultLocale = 'en';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const userAgent = request.headers.get('user-agent') || '';

  // Edge Anti-Scraping Defense (Hardening)
  // Block known aggressive SEO scrapers and empty User-Agents from stealing programmatic content, while allowing Googlebot
  const blockedBots = ['AhrefsBot', 'SemrushBot', 'MJ12bot', 'DotBot', 'PetalBot', 'Baiduspider', 'YandexBot'];
  const isBlocked = blockedBots.some(bot => userAgent.includes(bot));
  
  if (isBlocked || !userAgent || userAgent.trim() === '') {
    return new NextResponse('Access Denied: Scraper Bot Detected or Invalid User-Agent', { status: 403 });
  }

  // Edge Personalization (Phase 8.3)
  const city = request.headers.get('x-vercel-ip-city') || request.headers.get('cf-ipcity') || 'Unknown';
  const country = request.headers.get('x-vercel-ip-country') || request.headers.get('cf-ipcountry') || 'Unknown';
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-user-city', city);
  requestHeaders.set('x-user-country', country);

  // i18n Routing (Phase 10.2)
  // Check if there is any supported locale in the pathname
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/localized/${locale}/`) || pathname === `/localized/${locale}`
  );

  if (!pathnameHasLocale && pathname.startsWith('/landing')) {
    // Redirect if there is no locale (specifically for localized marketing routes)
    request.nextUrl.pathname = `/localized/${defaultLocale}${pathname}`;
    return NextResponse.redirect(request.nextUrl);
  }

  // Return the response with the modified edge headers
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  // Run middleware on all pages, excluding static assets and API routes
  matcher: [
    '/((?!api|_next/static|_next/image|assets|favicon.ico).*)',
  ],
};
