const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../src/data/seo-database.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

console.log('Booting Semantic Content Engine for 10,000 pages...');

// --- SPINTAX ARRAYS ---
const luxuryIntros = [
  "Welcome to the pinnacle of ultra-luxury living in Pune.",
  "Discover an exclusive lifestyle tailored for the discerning few in West Pune.",
  "Experience bespoke architectural brilliance and unparalleled opulence.",
  "Step into a world where modern elegance meets nature's tranquility.",
  "Elevate your living standards with Pune's most anticipated ultra-premium development."
];

const marketContexts = [
  "Set against the thriving landscape of the Pune real estate market, Mahalunge has emerged as the premier destination for high-net-worth individuals.",
  "Positioned perfectly in West Pune, this micro-market offers immediate access to the Hinjewadi IT hub while preserving a serene, resort-like atmosphere.",
  "As the demand for luxury homes in Pune accelerates, Baner Annexe and Mahalunge stand out as the golden corridor for premium real estate investment.",
  "With sweeping views of the Baner hills and seamless connectivity to the Mumbai-Pune Expressway, West Pune is redefining metropolitan luxury."
];

const amenitiesSpintax = [
  "Residents will enjoy exclusive access to twin clubhouses, a 2.65-acre central courtyard, and a temperature-controlled infinity pool.",
  "The estate features 75% open landscaped areas, curated wellness zones, and a state-of-the-art gymnasium designed for holistic living.",
  "Every detail is meticulously crafted, offering smart home integration, private expansive decks, and multi-tier security for complete peace of mind.",
  "Immerse yourself in world-class amenities including tennis courts, sprawling park views, and an elite concierge service."
];

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function detectConfiguration(slug) {
  if (slug.includes('5-bhk')) return 'Palatial 5 BHK Residences';
  if (slug.includes('4-bhk')) return 'Ultra-Spacious 4 BHK Homes';
  if (slug.includes('3-bhk')) return 'Premium 3 BHK Deck Residences';
  if (slug.includes('2-bhk')) return 'Luxury 2 BHK Apartments';
  if (slug.includes('duplex')) return 'Exclusive Double-Height Duplexes';
  if (slug.includes('simplex')) return 'Bespoke Simplex Layouts';
  if (slug.includes('penthouse')) return 'Sky-High Penthouses';
  return 'Ultra-Luxury Deck Residences';
}

let updatedCount = 0;

for (const key in db) {
  const page = db[key];
  
  // Only inject content if it's missing or if it's not a blog (blogs have custom content)
  if (page.category !== 'blog') {
    const configString = detectConfiguration(key);
    
    // Generate the unique semantic HTML payload
    const htmlContent = `
      <div class="space-y-6 text-left">
        <p class="text-lg md:text-xl text-white/80 font-light leading-relaxed">
          <strong>${page.h1}</strong>: ${getRandom(luxuryIntros)} ${getRandom(marketContexts)}
        </p>
        
        <h3 class="text-2xl font-serif text-[var(--color-luxury-gold)] mt-8 mb-4">
          Redefining ${configString} in West Pune
        </h3>
        
        <p class="text-white/70 leading-relaxed mb-6">
          When exploring the highly competitive Pune real estate market, discerning buyers demand more than just square footage. 
          Our ${configString.toLowerCase()} are engineered for optimal space utilization, natural cross-ventilation, and majestic views of the Mahalunge skyline.
        </p>

        <h3 class="text-2xl font-serif text-[var(--color-luxury-gold)] mt-8 mb-4">
          Unrivaled Lifestyle & Connectivity
        </h3>
        
        <p class="text-white/70 leading-relaxed mb-6">
          ${getRandom(amenitiesSpintax)} K Raheja Vistas Mahalunge guarantees an unparalleled lifestyle, setting the ultimate benchmark for luxury homes in Pune.
        </p>
      </div>
    `;

    page.content = htmlContent;
    updatedCount++;
  }
}

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
console.log(`Success! Injected rich, LSI-optimized semantic HTML content into ${updatedCount} programmatic pages.`);
