import { MetadataRoute } from 'next';

const BASE_URL = 'https://www.krahejacorpvistas.com';
const NOW = new Date();

// Helper to build a sitemap entry with proper crawl signals and alternate language mappings
function entry(
  path: string,
  priority: number,
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'],
  lastModified: Date = NOW,
): MetadataRoute.Sitemap[number] {
  return {
    url: `${BASE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
    alternates: {
      languages: {
        'en-IN': `${BASE_URL}${path}`,
        'en': `${BASE_URL}${path}`,
        'en-US': `${BASE_URL}/nri/pune-real-estate-investment-for-nri-usa`,
        'en-AE': `${BASE_URL}/nri/invest-in-pune-real-estate-from-dubai`,
        'en-GB': `${BASE_URL}/nri/luxury-homes-pune-for-nri-uk`,
        'en-SG': `${BASE_URL}/nri/best-nri-investment-pune-singapore`,
        'x-default': `${BASE_URL}${path}`,
      },
    },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    // ─── TIER 1 (priority 1.0): Homepage — highest crawl authority ───
    entry('', 1.0, 'daily'),

    // ─── TIER 2 (priority 0.95): Core project & architectural showcase ───
    entry('/project/masterplan',       0.95, 'weekly'),
    entry('/project/floorplans',       0.95, 'weekly'),
    entry('/project/amenities',        0.95, 'weekly'),
    entry('/project/location',         0.95, 'weekly'),
    entry('/project/gallery',          0.95, 'weekly'),
    entry('/neighborhood',             0.95, 'weekly'),
    entry('/directory',                0.95, 'daily'),   // HTML Directory Silo

    // ─── TIER 3 (priority 0.9): High-Intent NRI Investor Funnels ───
    entry('/nri/invest-in-pune-real-estate-from-dubai',       0.9, 'weekly'),
    entry('/nri/luxury-homes-pune-for-nri-uk',                0.9, 'weekly'),
    entry('/nri/best-nri-investment-pune-singapore',          0.9, 'weekly'),
    entry('/nri/pune-real-estate-investment-for-nri-usa',     0.9, 'weekly'),

    // ─── TIER 4 (priority 0.85): Comparison & Decision Matrix ───
    entry('/compare',                                          0.85, 'weekly'),
    entry('/compare/k-raheja-vistas-vs-godrej-hillside-pune', 0.85, 'weekly'),
    entry('/investment-calculator',                            0.85, 'weekly'),

    // ─── TIER 5 (priority 0.8): Authority & Market Intelligence ───
    entry('/stories',   0.8, 'weekly'),
    entry('/updates',   0.8, 'weekly'),
    entry('/insights',  0.8, 'weekly'),

    // ─── TIER 6 (priority 0.75): Localized Languages ───
    entry('/localized/en',    0.75, 'monthly'),
    entry('/localized/mr',    0.75, 'monthly'),
    entry('/localized/hi',    0.75, 'monthly'),

    // ─── Note: 54,608 programmatic SEO matrix pages are served ───
    // ─── via the static sitemap index at /sitemap-index.xml (110 sub-sitemaps) ───
  ];
}
