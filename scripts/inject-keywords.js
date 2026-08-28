const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../src/data/seo-database.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

const ecosystemKeywords = [
  "k-raheja-vistas-mahalunge-pune-phase-7",
  "ultra-luxury-3-bhk-near-hinjewadi-it-park",
  "premium-deck-residences-mahalunge-pune",
  "k-raheja-vistas-baner-annex-pune",
  "new-launch-k-raheja-corp-pune",
  "luxury-apartments-for-sale-in-mahalunge-pune",
  "best-real-estate-investment-in-pune",
  "k-raheja-vistas-pune-reviews",
  "k-raheja-mahalunge-possession-date",
  "k-raheja-vistas-mahalunge-sample-flat",
  "flats-in-mahalunge-pune-by-k-raheja",
  "top-luxury-projects-in-pune-west",
  "k-raheja-vistas-pune-floor-plan-3bhk",
  "k-raheja-vistas-pune-brochure-pdf",
  "k-raheja-corp-pune-residential-projects",
  "raheja-properties-in-pune-west",
  "k-raheja-vistas-mahalunge-price-list",
  "k-raheja-vistas-cost-sheet-2026",
  "k-raheja-baner-annexe-luxury-homes",
  "raheja-vistas-maharera-pr1260002501530",
  "k-raheja-vistas-vs-vtp-earth-one",
  "k-raheja-vistas-vs-godrej-hillside-mahalunge",
  "k-raheja-vistas-vs-rohan-harita-baner",
  "k-raheja-vistas-vs-kolte-patil-24k",
  "nri-luxury-property-investment-pune-raheja",
  "best-luxury-apartments-near-balewadi-high-street",
  "2-bhk-deck-residences-mahalunge-k-raheja",
  "3-bhk-deck-residences-mahalunge-k-raheja",
  "4-bhk-duplex-penthouses-mahalunge-k-raheja"
];

let added = 0;

ecosystemKeywords.forEach(slug => {
  if (!db[slug]) {
    const formattedWords = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    
    // Ensure title <= 65 chars
    let title = `${formattedWords} | K Raheja Vistas Pune`;
    if (title.length > 65) {
      title = `${formattedWords}`.slice(0, 65);
    }

    const description = `Explore ${formattedWords}. K Raheja Vistas Mahalunge offers ultra-luxury 2, 3 & 4 BHK deck residences near Hinjewadi, Pune. MahaRERA PR1260002501530.`.slice(0, 160);
    
    db[slug] = {
      title: title,
      description: description,
      h1: formattedWords,
      category: "Pune_Real_Estate",
      slug: slug,
      content: null
    };
    added++;
  }
});

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
console.log(`Successfully injected ${added} K Raheja ecosystem keywords into the SEO database. Total routes: ${Object.keys(db).length}`);
