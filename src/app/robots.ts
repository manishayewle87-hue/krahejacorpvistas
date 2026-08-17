import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Googlebot gets full, unrestricted access for maximum crawl coverage
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/admin/', '/portal/', '/api/'],
      },
      {
        // Bing gets full access for secondary search coverage
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/admin/', '/portal/', '/api/'],
      },
      {
        // All other bots get crawl-budget-optimized rules
        userAgent: '*',
        allow: '/',
        disallow: [
          '/private/',
          '/admin/',
          '/portal/',
          '/api/',
          '/*?utm_*',
          '/*?fbclid=*',
          '/*?gclid=*',
          '/*?sort=*',
          '/*?filter=*',
          '/*&*',
          '/*.json$',
        ],
        crawlDelay: 2,
      }
    ],
    sitemap: [
      'https://www.krahejacorpvistas.com/sitemap.xml',
      'https://www.krahejacorpvistas.com/sitemap-index.xml'
    ],
    host: 'https://www.krahejacorpvistas.com'
  };
}
