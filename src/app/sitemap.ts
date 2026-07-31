import { MetadataRoute } from 'next';
import seoDatabase from '@/data/seo-database.json';

const DOMAIN = 'https://krahejavistasmahalunge.com';
const URLS_PER_SITEMAP = 500;

export async function generateSitemaps() {
  const dynamicRoutes = Object.keys(seoDatabase);
  const totalSitemaps = Math.ceil(dynamicRoutes.length / URLS_PER_SITEMAP);
  return Array.from({ length: totalSitemaps }).map((_, id) => ({ id }));
}

export default function sitemap({ id }: { id: number }): MetadataRoute.Sitemap {
  const isFirstSitemap = id === 0;

  let routes: MetadataRoute.Sitemap = [];

  if (isFirstSitemap) {
    const coreRoutes = [
      '', 
      '/neighborhood', 
      '/project/gallery', 
      '/project/floorplans', 
      '/updates', 
      '/project/location',
      '/project/masterplan',
      '/project/amenities'
    ].map((route) => ({
      url: `${DOMAIN}${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: route === '' ? 1.0 : 0.9,
    }));
    routes = [...coreRoutes];
  }

  const dynamicSlugs = Object.keys(seoDatabase);
  const start = id * URLS_PER_SITEMAP;
  const end = start + URLS_PER_SITEMAP;
  const chunkedSlugs = dynamicSlugs.slice(start, end);

  const dynamicRoutes: MetadataRoute.Sitemap = chunkedSlugs.map((slug) => {
    // @ts-expect-error - indexing is valid
    const data = seoDatabase[slug];
    const isArticle = data?.category === 'blog' || data?.category === 'research';
    
    return {
      url: `${DOMAIN}/${slug}`,
      lastModified: new Date(),
      changeFrequency: isArticle ? 'monthly' as const : 'weekly' as const,
      priority: isArticle ? 0.6 : 0.8,
    };
  });

  return [...routes, ...dynamicRoutes];
}
