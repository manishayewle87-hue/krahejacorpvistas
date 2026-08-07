const fs = require('fs');
const path = require('path');

const DOMAIN = 'https://www.krahejacorpvistas.com';
const URLS_PER_SITEMAP = 500;

function main() {
  console.log('Generating Static Enterprise XML Sitemaps...');
  
  const dbPath = path.join(process.cwd(), 'src/data/seo-database.json');
  const sitemapsDir = path.join(process.cwd(), 'public/sitemaps');
  
  // Ensure public/sitemaps directory exists
  if (!fs.existsSync(sitemapsDir)) {
    fs.mkdirSync(sitemapsDir, { recursive: true });
  }

  const rawData = fs.readFileSync(dbPath, 'utf8');
  const db = JSON.parse(rawData);
  const dynamicSlugs = Object.keys(db);
  
  
  const totalSitemaps = Math.ceil(dynamicSlugs.length / URLS_PER_SITEMAP);
  let sitemapIndexXml = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  const now = new Date().toISOString();

  // Create core static routes sitemap-0.xml
  const coreRoutes = [
    '', 
    '/neighborhood', 
    '/project/gallery', 
    '/project/floorplans', 
    '/updates', 
    '/project/location',
    '/project/masterplan',
    '/project/amenities',
    '/insights',
    '/stories',
    '/directory',
    '/nri/invest-in-pune-real-estate-from-dubai',
    '/nri/luxury-homes-pune-for-nri-uk',
    '/nri/best-nri-investment-pune-singapore',
    '/nri/pune-real-estate-investment-for-nri-usa'
  ];

  // Add a-z and 0-9 directory paths
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'.split('');
  chars.forEach(char => coreRoutes.push('/directory/' + char));

  for (let i = 0; i < totalSitemaps; i++) {
    const start = i * URLS_PER_SITEMAP;
    const end = start + URLS_PER_SITEMAP;
    const chunkedSlugs = dynamicSlugs.slice(start, end);

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    // Inject core routes into the first sitemap
    if (i === 0) {
      coreRoutes.forEach(route => {
        xml += `  <url>\n    <loc>${DOMAIN}${route}</loc>\n    <lastmod>${now}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${route === '' ? '1.0' : '0.9'}</priority>\n  </url>\n`;
      });
    }

    chunkedSlugs.forEach(slug => {
      const data = db[slug];
      const isArticle = data?.category === 'blog' || data?.category === 'research';
      const changeFreq = isArticle ? 'monthly' : 'weekly';
      const priority = isArticle ? '0.6' : '0.8';
      
      // Escape ampersands and xml specific chars in URL just in case
      const escapedUrl = `${DOMAIN}/${slug}`.replace(/&/g, '&amp;');
      
      xml += `  <url>\n    <loc>${escapedUrl}</loc>\n    <lastmod>${now}</lastmod>\n    <changefreq>${changeFreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>\n`;
    });

    xml += `</urlset>`;
    
    fs.writeFileSync(path.join(sitemapsDir, `sitemap-${i}.xml`), xml);
    sitemapIndexXml += `  <sitemap>\n    <loc>${DOMAIN}/sitemaps/sitemap-${i}.xml</loc>\n    <lastmod>${now}</lastmod>\n  </sitemap>\n`;
  }

  sitemapIndexXml += `</sitemapindex>`;
  
  // Write the main sitemap.xml index to the root of public/
  fs.writeFileSync(path.join(process.cwd(), 'public/sitemap.xml'), sitemapIndexXml);

  console.log(`Successfully generated ${totalSitemaps} static sitemaps and index public/sitemap.xml for ${dynamicSlugs.length} routes.`);
}

main();
