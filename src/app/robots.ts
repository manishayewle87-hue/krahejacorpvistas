import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // ─── TIER 1: Googlebot & Global Search Engine Crawlers — Full Unrestricted Access ───
      {
        userAgent: 'Googlebot',
        allow: '/',
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
          '/',
          '/assets/',
          '/public/',
          '/_next/image',
        ],
        disallow: ['/admin/', '/portal/'],
      },
      {
        userAgent: 'Googlebot-Video',
        allow: ['/', '/assets/video.mp4', '/assets/video-thumb.jpg'],
      },
      {
        userAgent: 'Googlebot-News',
        allow: ['/', '/insights', '/stories', '/updates'],
        disallow: ['/admin/', '/portal/'],
      },
      {
        userAgent: 'AdsBot-Google',
        allow: ['/campaign/', '/'],
        disallow: ['/admin/', '/portal/', '/api/'],
      },
      {
        userAgent: 'AdsBot-Google-Mobile',
        allow: ['/campaign/', '/'],
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
        userAgent: 'Applebot',
        allow: '/',
        disallow: ['/admin/', '/portal/', '/api/'],
      },
      {
        userAgent: 'Applebot-Extended',
        allow: '/',
        disallow: ['/admin/', '/portal/', '/api/'],
      },
      {
        userAgent: 'Yandex',
        allow: '/',
        disallow: ['/admin/', '/portal/', '/api/', '/campaign/'],
        crawlDelay: 2,
      },
      {
        userAgent: 'DuckDuckBot',
        allow: '/',
        disallow: ['/admin/', '/portal/', '/api/', '/campaign/'],
      },
      {
        userAgent: 'Slurp', // Yahoo
        allow: '/',
        disallow: ['/admin/', '/portal/', '/api/', '/campaign/'],
        crawlDelay: 3,
      },

      // ─── TIER 2: Unauthorized AI Dataset Harvesters — Explicit Denial ───
      { userAgent: 'GPTBot',          disallow: '/' },
      { userAgent: 'ChatGPT-User',    disallow: '/' },
      { userAgent: 'anthropic-ai',    disallow: '/' },
      { userAgent: 'ClaudeBot',       disallow: '/' },
      { userAgent: 'Claude-Web',      disallow: '/' },
      { userAgent: 'Google-Extended', disallow: '/' },
      { userAgent: 'cohere-ai',       disallow: '/' },
      { userAgent: 'CCBot',           disallow: '/' },
      { userAgent: 'Diffbot',         disallow: '/' },
      { userAgent: 'Bytespider',      disallow: '/' },
      { userAgent: 'Omgili',          disallow: '/' },

      // ─── TIER 3: High-Volume SEO Scraper Tools — Disallow ───
      { userAgent: 'AhrefsBot',  disallow: '/' },
      { userAgent: 'SemrushBot', disallow: '/' },
      { userAgent: 'MJ12bot',    disallow: '/' },
      { userAgent: 'DotBot',     disallow: '/' },
      { userAgent: 'PetalBot',   disallow: '/' },
      { userAgent: 'BLEXBot',    disallow: '/' },
      { userAgent: 'RogerBot',   disallow: '/' },

      // ─── TIER 4: Default Wildcard Crawler Rules (Crawl-Budget Optimization) ───
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          // Admin & Private internal surfaces
          '/admin/',
          '/portal/',
          '/api/',
          '/campaign/',
          '/private/',

          // Next.js internals
          '/_next/static/',
          '/_next/image',
          '/_next/webpack-hmr',

          // Query parameters causing duplicate content
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

          // Raw data files
          '/*.json',
          '/*.xml$',
          '/*.map',
          '/*.txt$',

          // Security paths (defense in depth)
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
