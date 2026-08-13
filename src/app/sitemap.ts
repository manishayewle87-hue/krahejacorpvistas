import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.krahejacorpvistas.com';
  
  // Core application routes that change frequently or carry maximum weight
  const routes = [
    '',
    '/project/masterplan',
    '/project/floorplans',
    '/project/amenities',
    '/project/location',
    '/project/gallery',
    '/neighborhood',
    '/directory'
  ];

  const now = new Date();

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: 'daily',
    priority: route === '' ? 1.0 : 0.9,
  }));
}
