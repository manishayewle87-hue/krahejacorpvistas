import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // ─── TIER 1: Revenue-generating search bots — full unrestricted access ───
      {
        userAgent: 'Googlebot',
        allow: [
          '/',
          '/nri/',
          '/compare/',
          '/investment-calculator',
          '/stories',
          '/updates',
          '/insights',
          '/project/',
          '/neighborhood',
          '/directory',
          '/localized/',
        ],
        disallow: [
          '/admin/',
          '/portal/',
          '/api/',
          '/campaign/',
          '/*?preview=*',
        ],
      },
      {
        userAgent: 'Googlebot-Image',
        allow: [
          '/assets/',
          '/public/',
          '/_next/image',
        ],
        disallow: ['/admin/', '/portal/'],
      },
      {
        userAgent: 'Googlebot-Video',
        allow: ['/assets/video.mp4', '/assets/video-thumb.jpg'],
      },
      {
        userAgent: 'AdsBot-Google',
        allow: ['/campaign/'],
        disallow: ['/admin/', '/portal/', '/api/'],
      },
      {
        userAgent: 'AdsBot-Google-Mobile',
        allow: ['/campaign/'],
        disallow: ['/admin/', '/portal/', '/api/'],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: [
          '/admin/',
          '/portal/',
          '/api/',
          '/campaign/',
          '/*?utm_*',
          '/*?fbclid=*',
          '/*?gclid=*',
        ],
        crawlDelay: 1,
      },
      {
        userAgent: 'Slurp', // Yahoo
        allow: '/',
        disallow: ['/admin/', '/portal/', '/api/', '/campaign/'],
        crawlDelay: 5,
      },
      {
        userAgent: 'DuckDuckBot',
        allow: '/',
        disallow: ['/admin/', '/portal/', '/api/', '/campaign/'],
        crawlDelay: 2,
      },

      // ─── TIER 2: AI training crawlers — explicitly denied (belt-and-suspenders with Edge WAF) ───
      { userAgent: 'GPTBot',          disallow: '/' },
      { userAgent: 'ChatGPT-User',    disallow: '/' },
      { userAgent: 'anthropic-ai',    disallow: '/' },
      { userAgent: 'ClaudeBot',       disallow: '/' },
      { userAgent: 'Claude-Web',      disallow: '/' },
      { userAgent: 'PerplexityBot',   disallow: '/' },
      { userAgent: 'Google-Extended', disallow: '/' },
      { userAgent: 'cohere-ai',       disallow: '/' },
      { userAgent: 'CCBot',           disallow: '/' },
      { userAgent: 'Diffbot',         disallow: '/' },
      { userAgent: 'Bytespider',      disallow: '/' },
      { userAgent: 'Omgili',          disallow: '/' },

      // ─── TIER 3: High-volume SEO tool bots — no proprietary content access ───
      { userAgent: 'AhrefsBot',  disallow: '/' },
      { userAgent: 'SemrushBot', disallow: '/' },
      { userAgent: 'MJ12bot',    disallow: '/' },
      { userAgent: 'DotBot',     disallow: '/' },
      { userAgent: 'PetalBot',   disallow: '/' },
      { userAgent: 'BLEXBot',    disallow: '/' },
      { userAgent: 'RogerBot',   disallow: '/' },

      // ─── TIER 4: All other bots — crawl-budget-optimised rules ───
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          // Admin & internal surfaces
          '/admin/',
          '/portal/',
          '/api/',
          '/campaign/',
          '/private/',

          // Next.js internals — waste crawl budget
          '/_next/static/',
          '/_next/image',
          '/_next/webpack-hmr',

          // URL parameter junk — causes duplicate content
          '/*?utm_*',
          '/*?fbclid=*',
          '/*?gclid=*',
          '/*?msclkid=*',
          '/*?ref=*',
          '/*?sort=*',
          '/*?filter=*',
          '/*?page=*',
          '/*?search=*',
          '/*?q=*',
          '/*&*',

          // Raw data & file types that waste crawl budget
          '/*.json',
          '/*.xml$',
          '/*.map',
          '/*.txt$',

          // Malicious path patterns (defense in depth)
          '/.env',
          '/.git/',
          '/wp-admin/',
          '/wp-login.php',
          '/xmlrpc.php',
          '/phpmyadmin/',
        ],
        crawlDelay: 2,
      },
    ],

    sitemap: [
      'https://www.krahejacorpvistas.com/sitemap.xml',
      'https://www.krahejacorpvistas.com/sitemap-index.xml',
    ],
  };
}
