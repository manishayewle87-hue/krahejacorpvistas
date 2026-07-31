import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/private/', '/admin/', '/portal/'],
    },
    sitemap: 'https://krahejavistasmahalunge.com/sitemap.xml',
  };
}
