const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../src/data/seo-database.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

const newKeywords = [
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
  "k-raheja-vistas-pune-brochure-pdf"
];

let added = 0;

newKeywords.forEach(slug => {
  if (!db[slug]) {
    const formattedTitle = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    
    db[slug] = {
      title: `${formattedTitle} | K Raheja Vistas Mahalunge Pune`,
      description: `Explore the finest ${formattedTitle}. K Raheja Vistas Mahalunge offers unparalleled ultra-luxury and seamless connectivity near Hinjewadi, Pune.`,
      h1: formattedTitle,
      category: "Pune_Real_Estate",
      slug: slug,
      content: null
    };
    added++;
  }
});

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
console.log(`Successfully injected ${added} highly-targeted Pune real estate keyword clusters into the SEO matrix.`);
