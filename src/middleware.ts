import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['en', 'mr', 'hi'];
const defaultLocale = 'en';

// --- IN-MEMORY EDGE RATE LIMITER (POST submissions only) ---
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const MAX_POST_REQUESTS = 5;

// Whitelisted search engine and SSL verification bots (NEVER block these)
const ALLOWED_BOT_SUBSTRINGS = [
  'googlebot',
  'bingbot',
  'applebot',
  'slurp',
  'duckduckbot',
  'yandex',
  'baiduspider',
  'adsbot-google',
  'mediapartners-google',
  'apis-google',
  'let\'s encrypt',
  'acme-challenge',
  'certbot',
  'vercel',
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 0. SSL Certificate Generation & ACME http-01 Challenge Pass-through (Critical for Vercel/Let's Encrypt)
  if (
    pathname.startsWith('/.well-known') ||
    pathname.includes('acme-challenge') ||
    pathname.endsWith('robots.txt') ||
    pathname.endsWith('sitemap.xml') ||
    pathname.includes('/sitemaps/') ||
    pathname === '/default-indexnow-key.txt'
  ) {
    return NextResponse.next();
  }

  const userAgent = request.headers.get('user-agent') || '';
  const userAgentLower = userAgent.toLowerCase();

  const isAllowedSearchBot = ALLOWED_BOT_SUBSTRINGS.some(bot => userAgentLower.includes(bot));

  // Extreme Digital Fortress: Edge WAF (Only filter if NOT a verified search engine or SSL probe)
  if (!isAllowedSearchBot) {
    // 1. Block Scripting Agents & Scanners
    const blockedTools = ['curl', 'wget', 'python-requests', 'python-urllib', 'libwww-perl', 'go-http-client', 'java/', 'nmap', 'sqlmap', 'zgrab', 'masscan', 'nikto', 'dirbuster', 'nuclei'];
    const isBlockedTool = blockedTools.some(tool => userAgentLower.includes(tool));

    // 2. Block SEO Scrapers & Unauthorized AI Dataset Crawlers
    const blockedBots = [
      'ahrefsbot', 'semrushbot', 'mj12bot', 'dotbot', 'petalbot',
      'megaindex', 'blexbot', 'screaming frog', 'seokicks',
      'majestic', 'rogerbot', 'exabot', 'gigabot', 'scrapy',
      'ia_archiver', 'facebookexternalhit',
      // AI Content Scrapers (unauthorized training crawlers)
      'gptbot', 'chatgpt-user', 'anthropic-ai', 'claude-web', 'claudebot', 'cohere-ai',
      'perplexitybot', 'google-extended', 'ccbot', 'commoncrawl', 'diffbot', 'bytespider', 'omgili'
    ];
    const isBlockedBot = blockedBots.some(bot => userAgentLower.includes(bot));

    // 3. Block Headless Browsers
    const isHeadless = userAgentLower.includes('headless') || userAgentLower.includes('puppeteer') || userAgentLower.includes('playwright') || userAgentLower.includes('phantomjs');

    // 4. Block Vulnerability Scans (Heuristics)
    const pathnameLower = pathname.toLowerCase();
    const isMaliciousPath = pathnameLower.includes('.env') || pathnameLower.includes('wp-admin') || pathnameLower.includes('wp-login') || pathnameLower.includes('.git') || pathnameLower.includes('union') || pathnameLower.includes('select') || pathnameLower.includes('../') || pathnameLower.includes('etc/passwd') || pathnameLower.includes('xmlrpc');

    if (isBlockedTool || isBlockedBot || isHeadless || isMaliciousPath || (!userAgent && !pathname.startsWith('/api'))) {
      return new NextResponse('Access Denied', { status: 403, headers: { 'X-Block-Reason': 'Digital-Fortress-WAF' } });
    }
  }

  // Edge Personalization (Phase 8.3)
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || '127.0.0.1';
  const city = request.headers.get('x-vercel-ip-city') || request.headers.get('cf-ipcity') || 'Unknown';
  const country = request.headers.get('x-vercel-ip-country') || request.headers.get('cf-ipcountry') || 'Unknown';
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-user-city', city);
  requestHeaders.set('x-user-country', country);

  // --- RATE LIMITING (POST requests only) ---
  let rateLimitRemaining = MAX_POST_REQUESTS;
  if (request.method === 'POST') {
    const now = Date.now();
    const entry = rateLimitMap.get(ip);
    if (entry && now - entry.timestamp < RATE_LIMIT_WINDOW_MS) {
      if (entry.count >= MAX_POST_REQUESTS) {
        return new NextResponse('Too Many Requests', {
          status: 429,
          headers: {
            'X-RateLimit-Limit': String(MAX_POST_REQUESTS),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': String(Math.ceil((entry.timestamp + RATE_LIMIT_WINDOW_MS) / 1000)),
            'Retry-After': '60',
          },
        });
      }
      entry.count++;
      rateLimitRemaining = MAX_POST_REQUESTS - entry.count;
    } else {
      rateLimitMap.set(ip, { count: 1, timestamp: now });
      rateLimitRemaining = MAX_POST_REQUESTS - 1;
    }
  }

  // i18n Routing (Phase 10.2)
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/localized/${locale}/`) || pathname === `/localized/${locale}`
  );

  if (!pathnameHasLocale && pathname.startsWith('/landing')) {
    request.nextUrl.pathname = `/localized/${defaultLocale}${pathname}`;
    return NextResponse.redirect(request.nextUrl);
  }

  // Return the response with the modified edge headers
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // Block AI Crawlers (LLMs) from stealing proprietary SEO content
  response.headers.set('X-Robots-Tag', 'noai, noimageai');
  
  // Rate-limit signaling for POST endpoints
  if (request.method === 'POST') {
    response.headers.set('X-RateLimit-Limit', String(MAX_POST_REQUESTS));
    response.headers.set('X-RateLimit-Remaining', String(Math.max(0, rateLimitRemaining)));
  }

  return response;
}

export const config = {
  // Run middleware on application routes, strictly excluding static assets, ACME challenges, and sitemaps
  matcher: [
    '/((?!api|_next/static|_next/image|assets|favicon.ico|\\.well-known|robots\\.txt|sitemap\\.xml|sitemaps|default-indexnow-key\\.txt).*)',
  ],
};
