import { MetadataRoute } from 'next';

const BASE_URL = 'https://www.krahejacorpvistas.com';
const NOW = new Date();

// Helper to build a sitemap entry with proper crawl signals
function entry(
  path: string,
  priority: number,
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'],
  lastModified: Date = NOW,
): MetadataRoute.Sitemap[number] {
  return { url: `${BASE_URL}${path}`, lastModified, changeFrequency, priority };
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    // ─── TIER 1 (priority 1.0): Homepage — highest crawl authority ───
    entry('', 1.0, 'daily'),

    // ─── TIER 2 (priority 0.9): Core project pages — change rarely but are key conversion pages ───
    entry('/project/masterplan',       0.9, 'weekly'),
    entry('/project/floorplans',       0.9, 'weekly'),
    entry('/project/amenities',        0.9, 'weekly'),
    entry('/project/location',         0.9, 'weekly'),
    entry('/project/gallery',          0.9, 'weekly'),
    entry('/neighborhood',             0.9, 'weekly'),
    entry('/directory',                0.9, 'daily'),   // Directory changes as new pages added

    // ─── TIER 3 (priority 0.85): High-intent NRI landing pages ───
    entry('/nri/invest-in-pune-real-estate-from-dubai',       0.85, 'monthly'),
    entry('/nri/luxury-homes-pune-for-nri-uk',                0.85, 'monthly'),
    entry('/nri/best-nri-investment-pune-singapore',          0.85, 'monthly'),
    entry('/nri/pune-real-estate-investment-for-nri-usa',     0.85, 'monthly'),

    // ─── TIER 4 (priority 0.8): Comparison & research pages ───
    entry('/compare',                                          0.8, 'weekly'),
    entry('/compare/k-raheja-vistas-vs-godrej-hillside-pune', 0.8, 'monthly'),
    entry('/investment-calculator',                            0.8, 'monthly'),

    // ─── TIER 5 (priority 0.75): Content & brand authority pages ───
    entry('/stories',   0.75, 'weekly'),
    entry('/updates',   0.75, 'weekly'),
    entry('/insights',  0.75, 'weekly'),

    // ─── TIER 6 (priority 0.7): Localized / regional pages ───
    entry('/localized/en',    0.7, 'monthly'),
    entry('/localized/mr',    0.7, 'monthly'),
    entry('/localized/hi',    0.7, 'monthly'),

    // ─── Note: The 54,608 programmatic SEO pages are served via the ───
    // ─── static sitemap index at /sitemap-index.xml (110 sub-sitemaps) ───
    // ─── Those are excluded here to avoid duplicate entries.            ───
  ];
}
