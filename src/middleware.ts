import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['en', 'mr', 'hi'];
const defaultLocale = 'en';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const userAgent = request.headers.get('user-agent') || '';

  // Extreme Digital Fortress: Edge WAF
  const userAgentLower = userAgent.toLowerCase();
  
  // 1. Block Scripting Agents & Scanners
  const blockedTools = ['curl', 'wget', 'python-requests', 'libwww-perl', 'go-http-client', 'java', 'nmap', 'sqlmap', 'zgrab'];
  const isBlockedTool = blockedTools.some(tool => userAgentLower.includes(tool));

  // 2. Block SEO Scrapers & Malicious Bots
  const blockedBots = ['ahrefsbot', 'semrushbot', 'mj12bot', 'dotbot', 'petalbot', 'baiduspider', 'yandexbot', 'megaindex', 'blexbot', 'screaming frog'];
  const isBlockedBot = blockedBots.some(bot => userAgentLower.includes(bot));

  // 3. Block Headless Browsers
  const isHeadless = userAgentLower.includes('headless') || userAgentLower.includes('puppeteer') || userAgentLower.includes('playwright');

  // 4. Block Vulnerability Scans (Heuristics)
  const pathnameLower = pathname.toLowerCase();
  const isMaliciousPath = pathnameLower.includes('.env') || pathnameLower.includes('wp-admin') || pathnameLower.includes('wp-login') || pathnameLower.includes('.git') || pathnameLower.includes('union') || pathnameLower.includes('select');

  if (isBlockedTool || isBlockedBot || isHeadless || isMaliciousPath || !userAgent || userAgent.trim() === '') {
    return new NextResponse('Access Denied: Digital Fortress Firewall', { status: 403 });
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
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // 5. Block AI Crawlers (LLMs) from stealing proprietary SEO content
  response.headers.set('X-Robots-Tag', 'noai, noimageai');

  return response;
}

export const config = {
  // Run middleware on all pages, excluding static assets and API routes
  matcher: [
    '/((?!api|_next/static|_next/image|assets|favicon.ico).*)',
  ],
};
