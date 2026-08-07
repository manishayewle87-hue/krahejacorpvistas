import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

let errors = 0;
let warnings = 0;
let passed = 0;

function assert(condition, message, isWarning = false) {
  if (!condition) {
    if (isWarning) {
      console.warn(`[WARN] ${message}`);
      warnings++;
    } else {
      console.error(`[FAIL] ${message}`);
      errors++;
    }
  } else {
    console.log(`[PASS] ${message}`);
    passed++;
  }
}

console.log('====================================================');
console.log('  Google Rank #1 SEO Health & Compliance Guardrail  ');
console.log('====================================================\n');

// 1. Programmatic Metadata Check
const seoDbPath = path.join(rootDir, 'src/data/seo-database.json');
assert(fs.existsSync(seoDbPath), 'seo-database.json exists in src/data/');
if (fs.existsSync(seoDbPath)) {
  const data = JSON.parse(fs.readFileSync(seoDbPath, 'utf8'));
  const keys = Object.keys(data);
  const totalRoutes = keys.length;
  assert(totalRoutes > 0, `seo-database.json contains programmatic routes (${totalRoutes} routes detected)`);
  
  let validTitles = 0;
  let validDescs = 0;
  Object.values(data).forEach(entry => {
    if (entry.title && entry.title.length > 0 && entry.title.length <= 65) validTitles++;
    if (entry.description && entry.description.length > 0 && entry.description.length <= 160) validDescs++;
  });
  
  assert(validTitles === totalRoutes, `All ${totalRoutes} programmatic routes have valid SEO title lengths (<= 65 chars)`);
  assert(validDescs === totalRoutes, `All ${totalRoutes} programmatic routes have valid SEO description lengths (<= 160 chars)`);
}

// 2. E-E-A-T & Speakable Schema Check in layout.tsx
const layoutPath = path.join(rootDir, 'src/app/layout.tsx');
assert(fs.existsSync(layoutPath), 'src/app/layout.tsx exists');
if (fs.existsSync(layoutPath)) {
  const layoutContent = fs.readFileSync(layoutPath, 'utf8');
  assert(layoutContent.includes('"@type": "Organization"'), 'layout.tsx contains Organization JSON-LD schema (E-E-A-T)');
  assert(layoutContent.includes('"@type": "Person"'), 'layout.tsx contains Person author JSON-LD schema (E-E-A-T)');
  assert(layoutContent.includes('SpeakableSpecification'), 'layout.tsx contains SpeakableSpecification schema (Voice Search AEO)');
}

// 3. Edge Anti-Scraping Defense Check
const middlewarePath = path.join(rootDir, 'src/middleware.ts');
assert(fs.existsSync(middlewarePath), 'src/middleware.ts exists');
if (fs.existsSync(middlewarePath)) {
  const middlewareContent = fs.readFileSync(middlewarePath, 'utf8');
  assert(middlewareContent.includes('blockedBots'), 'middleware.ts defines scraper bot blacklist');
  assert(middlewareContent.includes('403'), 'middleware.ts rejects scraper bots with 403 Forbidden');
}

// 4. HTML Directory Link Silo Check
const directoryPath = path.join(rootDir, 'src/app/directory/page.tsx');
const directoryGroupPath = path.join(rootDir, 'src/app/directory/[group]/page.tsx');
const footerPath = path.join(rootDir, 'src/components/layout/Footer.tsx');
assert(fs.existsSync(directoryPath), 'HTML Directory Hub (src/app/directory/page.tsx) exists');
assert(fs.existsSync(directoryGroupPath), 'HTML Grouped Silos (src/app/directory/[group]/page.tsx) exists');
if (fs.existsSync(footerPath)) {
  const footerContent = fs.readFileSync(footerPath, 'utf8');
  assert(footerContent.includes('/directory'), 'Universal footer links to /directory PageRank funnel');
}

// 5. Sitemap & Robots Configuration
const sitemapPath = path.join(rootDir, 'src/app/sitemap.ts');
const robotsPath = path.join(rootDir, 'src/app/robots.ts');
assert(fs.existsSync(sitemapPath), 'Dynamic sitemap (src/app/sitemap.ts) exists');
// 6. AI Search Engine Optimization (AEO / GEO)
const llmsPath = path.join(rootDir, 'src/app/llms.txt/route.ts');
assert(fs.existsSync(llmsPath), 'AI Search Engine autodiscovery route (/llms.txt) exists');

// 7. Homepage SERP FAQ Rich Snippet Check
const homePath = path.join(rootDir, 'src/app/page.tsx');
assert(fs.existsSync(homePath), 'Homepage (src/app/page.tsx) exists');
if (fs.existsSync(homePath)) {
  const homeContent = fs.readFileSync(homePath, 'utf8');
  assert(homeContent.includes('AeoFaqBlock'), 'Homepage includes AeoFaqBlock for SERP FAQ Rich Snippets');
}

// 8. Google Merchant Feed Autodiscovery Check
if (fs.existsSync(layoutPath)) {
  const layoutContent = fs.readFileSync(layoutPath, 'utf8');
  assert(layoutContent.includes('/api/google-merchant-feed'), 'layout.tsx includes Google Merchant XML Feed autodiscovery link');
}

// 9. HTTP Security Headers Check
const nextConfigPath = path.join(rootDir, 'next.config.ts');
assert(fs.existsSync(nextConfigPath), 'next.config.ts exists');
if (fs.existsSync(nextConfigPath)) {
  const configContent = fs.readFileSync(nextConfigPath, 'utf8');
  assert(configContent.includes('Strict-Transport-Security'), 'next.config.ts enforces HSTS Strict-Transport-Security');
}

// 10. IndexNow Domain Verification Key Check
const indexNowPath = path.join(rootDir, 'public/default-indexnow-key.txt');
assert(fs.existsSync(indexNowPath), 'IndexNow domain verification key file (public/default-indexnow-key.txt) exists');

console.log('\n----------------------------------------------------');
console.log(`Summary: ${passed} PASSED | ${warnings} WARNINGS | ${errors} ERRORS`);
console.log('----------------------------------------------------\n');

if (errors > 0) {
  console.error('CRITICAL: SEO Rank #1 Compliance Verification FAILED. Fix errors before deploying.');
  process.exit(1);
} else {
  console.log('SUCCESS: All Google Rank #1 SEO Guardrail checks PASSED!');
  process.exit(0);
}
