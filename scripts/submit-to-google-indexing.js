/**
 * Google Indexing API Blitz Script
 * 
 * Prerequisites:
 * 1. Enable "Web Search Indexing API" in Google Cloud Console
 * 2. Create a Service Account & download JSON key
 * 3. Add Service Account as Owner in Google Search Console
 * 4. Place the JSON key at: scripts/google-service-account.json
 * 5. Run: npm install google-auth-library
 * 6. Execute: node scripts/submit-to-google-indexing.js
 */

const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '../src/data/seo-database.json');
const SERVICE_ACCOUNT_PATH = path.join(__dirname, 'google-service-account.json');
const DOMAIN = 'https://www.krahejacorpvistas.com';
const BATCH_SIZE = 100;   // Google allows 200/day per service account — be safe
const BATCH_DELAY_MS = 1000; // 1 second between batches

async function getAccessToken() {
  // Dynamic require for google-auth-library
  let GoogleAuth;
  try {
    ({ GoogleAuth } = require('google-auth-library'));
  } catch (e) {
    console.error('❌ Missing dependency. Run: npm install google-auth-library');
    process.exit(1);
  }

  if (!fs.existsSync(SERVICE_ACCOUNT_PATH)) {
    console.error(`❌ Service account key not found at: ${SERVICE_ACCOUNT_PATH}`);
    console.log('👉 Download from Google Cloud Console > IAM & Admin > Service Accounts');
    process.exit(1);
  }

  const auth = new GoogleAuth({
    keyFile: SERVICE_ACCOUNT_PATH,
    scopes: ['https://www.googleapis.com/auth/indexing'],
  });

  const client = await auth.getClient();
  const token = await client.getAccessToken();
  return token.token;
}

async function submitBatch(urls, token) {
  const results = { success: 0, failed: 0 };

  for (const url of urls) {
    try {
      const response = await fetch('https://indexing.googleapis.com/v3/urlNotifications:publish', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: url,
          type: 'URL_UPDATED'
        })
      });

      if (response.ok) {
        results.success++;
        process.stdout.write('✅');
      } else {
        results.failed++;
        process.stdout.write('❌');
      }
    } catch {
      results.failed++;
      process.stdout.write('⚠️');
    }
  }
  return results;
}

async function main() {
  console.log('🚀 K Raheja Vistas — Google Indexing API Blitz');
  console.log('================================================\n');

  const db = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
  const allSlugs = Object.keys(db);
  
  // Build full URL list — prioritize pillar pages first
  const priorityPages = [
    `${DOMAIN}/`,
    `${DOMAIN}/configurations/3-bhk-premium-deck-residences-baner-annexe`,
    `${DOMAIN}/configurations/luxury-2-bhk-apartments-mahalunge`,
    `${DOMAIN}/investment/real-estate-investment-baner-annexe`,
    `${DOMAIN}/location/mahalunge-baner-annexe-hinjewadi-proximity`,
    `${DOMAIN}/lifestyle/luxury-lifestyle-clubhouse-mahalunge`,
    `${DOMAIN}/stories`,
    `${DOMAIN}/compare/k-raheja-vistas-vs-godrej-hillside-mahalunge`,
    `${DOMAIN}/compare/best-luxury-projects-near-hinjewadi`,
    `${DOMAIN}/nri/invest-in-pune-real-estate-from-dubai`,
  ];

  const allUrls = [
    ...priorityPages,
    ...allSlugs.map(slug => `${DOMAIN}/${slug}`)
  ];

  console.log(`📊 Total URLs to submit: ${allUrls.length}`);
  console.log(`📦 Batch size: ${BATCH_SIZE}`);
  console.log(`⏱  Estimated time: ~${Math.ceil(allUrls.length / BATCH_SIZE)} seconds\n`);

  const token = await getAccessToken();
  console.log('🔑 OAuth token acquired. Starting submission...\n');

  let totalSuccess = 0;
  let totalFailed = 0;

  for (let i = 0; i < allUrls.length; i += BATCH_SIZE) {
    const batch = allUrls.slice(i, i + BATCH_SIZE);
    const batchNum = Math.floor(i / BATCH_SIZE) + 1;
    const totalBatches = Math.ceil(allUrls.length / BATCH_SIZE);

    process.stdout.write(`\nBatch ${batchNum}/${totalBatches}: `);
    const results = await submitBatch(batch, token);
    totalSuccess += results.success;
    totalFailed += results.failed;

    if (i + BATCH_SIZE < allUrls.length) {
      await new Promise(resolve => setTimeout(resolve, BATCH_DELAY_MS));
    }
  }

  console.log('\n\n================================================');
  console.log(`✅ SUCCESS: ${totalSuccess} URLs submitted to Google`);
  console.log(`❌ FAILED:  ${totalFailed} URLs`);
  console.log('\n📌 Next step: Monitor indexing in Google Search Console → URL Inspection');
  console.log('🕐 Pages typically appear in Google within 24–48 hours.');
}

main().catch(console.error);
