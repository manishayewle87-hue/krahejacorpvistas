// IndexNow instant ping script - runs after deploy to notify Google/Bing of all core URLs
// Uses global fetch (Node 18+)

const DOMAIN = 'www.krahejacorpvistas.com';
const INDEXNOW_KEY = 'default-indexnow-key';

const coreUrls = [
  `https://${DOMAIN}/`,
  `https://${DOMAIN}/project/masterplan`,
  `https://${DOMAIN}/project/floorplans`,
  `https://${DOMAIN}/project/amenities`,
  `https://${DOMAIN}/project/location`,
  `https://${DOMAIN}/project/gallery`,
  `https://${DOMAIN}/neighborhood`,
  `https://${DOMAIN}/directory`,
  `https://${DOMAIN}/insights`,
  `https://${DOMAIN}/stories`,
  `https://${DOMAIN}/updates`,
  `https://${DOMAIN}/nri/invest-in-pune-real-estate-from-dubai`,
  `https://${DOMAIN}/nri/luxury-homes-pune-for-nri-uk`,
  `https://${DOMAIN}/nri/best-nri-investment-pune-singapore`,
  `https://${DOMAIN}/nri/pune-real-estate-investment-for-nri-usa`,
];

const payload = {
  host: DOMAIN,
  key: INDEXNOW_KEY,
  keyLocation: `https://${DOMAIN}/${INDEXNOW_KEY}.txt`,
  urlList: coreUrls,
};

console.log('🚀 Pinging IndexNow with', coreUrls.length, 'core URLs...');

try {
  // Ping all major IndexNow endpoints
  const endpoints = [
    'https://api.indexnow.org/indexnow',
    'https://www.bing.com/indexnow',
    'https://searchadvisor.naver.com/indexnow',
    'https://yandex.com/indexnow',
  ];

  for (const endpoint of endpoints) {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(payload),
    });
    console.log(`[${endpoint}] → HTTP ${res.status}`);
  }
  console.log('✅ IndexNow pings complete.');
} catch (err) {
  console.error('IndexNow ping failed:', err.message);
}
