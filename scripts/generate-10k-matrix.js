const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../src/data/seo-database.json');
let db = {};
try {
  db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
} catch (e) {
  console.log("Starting fresh database.");
}

const intents = ["buy", "invest-in", "luxury", "premium", "best", "top", "new-launch", "ready-possession", "spacious", "exclusive"];
const properties = ["2-bhk", "3-bhk", "4-bhk", "deck-residences", "apartments", "flats", "homes", "penthouses", "duplex", "sky-villas"];
const locations = ["mahalunge", "baner-annexe", "hinjewadi-it-park", "balewadi-high-street", "wakad", "pashan", "pune-west", "mumbai-pune-expressway", "aundh", "sus"];
const amenities = ["with-clubhouse", "near-metro-station", "with-infinity-pool", "with-open-space", "gated-community", "smart-homes", "near-highway", "with-gym", "with-tennis-court", "with-park-view"];

const categories = ['configurations', 'location', 'lifestyle', 'investment'];

let count = 0;

console.log("Generating 10,000 unique SEO pages...");

for (let i of intents) {
  for (let p of properties) {
    for (let l of locations) {
      for (let a of amenities) {
        // Distribute them evenly among the 4 silos based on a simple hash/modulus to maintain consistency
        const catIndex = (i.length + p.length + l.length + a.length) % categories.length;
        const category = categories[catIndex];
        
        const rawSlug = `${i}-${p}-${l}-${a}`;
        const fullPath = `${category}/${rawSlug}`;
        
        if (!db[fullPath]) {
          const formattedTitle = rawSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
          
          db[fullPath] = {
            title: `${formattedTitle} | K Raheja Vistas Mahalunge`,
            description: `Looking for ${formattedTitle.toLowerCase()}? Discover ultra-premium residences at K Raheja Vistas Mahalunge, offering seamless connectivity and world-class amenities.`,
            h1: formattedTitle,
            category: category,
            slug: fullPath,
            content: null
          };
          count++;
        }
      }
    }
  }
}

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
console.log(`Successfully generated and injected ${count} hyper-targeted SEO pages into the database!`);
