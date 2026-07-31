const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../src/data/seo-database.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

// Advanced SEO Silo Architecture
const silos = [
  // SILO 1: Location & Connectivity
  "location/baner-annexe-pune",
  "location/flats-near-hinjewadi-it-park",
  "location/mahalunge-to-baner-connectivity",
  "location/upcoming-infrastructure-mahalunge-pune",
  "location/k-raheja-vistas-distance-from-mumbai-pune-expressway",
  
  // SILO 2: Configurations & Typology
  "configurations/luxury-apartments-mahalunge",
  "configurations/3-bhk-premium-deck-residences-baner-annexe",
  "configurations/2-bhk-flats-in-k-raheja-vistas-mahalunge",
  "configurations/spacious-balcony-apartments-pune-west",
  "configurations/k-raheja-vistas-floor-plans-and-layouts",

  // SILO 3: Lifestyle & Amenities
  "lifestyle/ultra-luxury-living-pune",
  "lifestyle/residential-projects-with-clubhouse-in-baner",
  "lifestyle/k-raheja-vistas-twin-clubhouses-amenities",
  "lifestyle/projects-with-75-percent-open-space-pune",
  "lifestyle/premium-gated-communities-in-mahalunge",

  // SILO 4: Investment & ROI
  "investment/real-estate-investment-baner-annexe",
  "investment/k-raheja-vistas-mahalunge-price-trends",
  "investment/rental-yields-in-mahalunge-pune",
  "investment/why-nris-are-investing-in-baner-annexe",
  "investment/k-raheja-corp-brand-value-appreciation",

  // SILO 5: Competitor Comparisons
  "compare/best-projects-in-mahalunge",
  "compare/k-raheja-vistas-vs-godrej-hillside-mahalunge",
  "compare/k-raheja-vistas-vs-lodha-belmondo",
  "compare/baner-vs-mahalunge-real-estate-comparison"
];

let added = 0;

silos.forEach(slug => {
  if (!db[slug]) {
    // Extract the keyword part from the slug (e.g., "flats-near-hinjewadi-it-park")
    const parts = slug.split('/');
    const category = parts[0];
    const rawKeyword = parts[1];
    
    // Title Case formatter
    const formattedTitle = rawKeyword.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    
    db[slug] = {
      title: `${formattedTitle} | K Raheja Vistas Mahalunge Pune`,
      description: `Comprehensive guide to ${formattedTitle} in Pune West. Discover why K Raheja Vistas Mahalunge is the ultimate choice for ${category} seekers.`,
      h1: formattedTitle,
      category: category,
      slug: slug,
      content: null
    };
    added++;
  }
});

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
console.log(`Successfully injected ${added} Advanced Silo pages into the SEO Architecture.`);
