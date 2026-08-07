import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/private/', 
          '/admin/', 
          '/portal/',
          '/*?utm_*',        // Block tracking params to save crawl budget
          '/*?fbclid=*',     // Block Facebook click IDs
          '/*?sort=*',       // Block duplicate sort parameters
          '/*?filter=*',     // Block duplicate filter parameters
          '/*&*',            // Block complex query chains
        ],
        crawlDelay: 1, // Be polite to the edge server while serving 54K routes
      }
    ],
    sitemap: 'https://www.krahejacorpvistas.com/sitemap.xml',
    host: 'https://www.krahejacorpvistas.com'
  };
}
