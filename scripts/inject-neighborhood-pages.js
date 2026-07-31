const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../src/data/seo-database.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

console.log('Generating Hyperlocal Neighborhood Authority Pages...');

const LANDMARKS = {
  schools: [
    'Delhi Public School Pune', 'The Orchid School Baner', 'Indus International School Pune',
    'Symbiosis International School Pune', 'Pawar Public School Baner', 'The International Institute of Engineering',
    'Victorious Kidss Educares Baner', 'Podar International School Balewadi'
  ],
  hospitals: [
    'Ruby Hall Clinic Baner', 'Sahyadri Hospital Baner', 'Medicover Hospital Hinjewadi',
    'Columbia Asia Hospital Pune', 'Surya Mother and Child Care Baner', 'Aditya Birla Memorial Hospital Pune',
    'Jupiter Hospital Baner', 'Lifeline Hospital Balewadi'
  ],
  itCompanies: [
    'Infosys Hinjewadi', 'Wipro Hinjewadi', 'TCS Hinjewadi', 'Cognizant Hinjewadi',
    'Accenture Pune Hinjewadi', 'IBM Hinjewadi', 'Tech Mahindra Hinjewadi', 'HCL Technologies Pune',
    'Capgemini Hinjewadi', 'Persistent Systems Hinjewadi'
  ],
  restaurants: [
    'Balewadi High Street Restaurants', 'Baner Road Food Hub', 'Aundh Restaurants',
    'Baner Cafe District', 'Wakad Food Street', 'Sus Road Dining'
  ],
  connectivity: [
    'Pune Metro Hinjewadi Phase 3', 'Mumbai Pune Expressway Access', 'Balewadi Stadium Pune',
    'Aundh Pune', 'Pashan Road Connectivity', 'Sus Road Mahalunge'
  ],
  malls: [
    'Phoenix Marketcity Pune', 'Westend Mall Aundh', 'Vision One Mall Baner',
    'Balewadi High Street Shopping', 'Xion Mall Hinjewadi'
  ]
};

let count = 0;

// Generate neighborhood pages
Object.entries(LANDMARKS).forEach(([category, places]) => {
  places.forEach(place => {
    const slug = place.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, '-');
    const key = `neighborhood/${slug}-near-k-raheja-vistas-mahalunge`;
    
    if (!db[key]) {
      db[key] = {
        title: `${place} Near K Raheja Vistas Mahalunge | Proximity Guide`,
        description: `${place} is conveniently located near K Raheja Vistas Mahalunge, Baner Annexe, West Pune. Discover why this ultra-premium gated community offers unmatched lifestyle connectivity for Pune families.`,
        h1: `${place} Near K Raheja Vistas Mahalunge`,
        category: 'neighborhood',
        slug: key,
        content: `
          <div class="space-y-6 text-left">
            <p class="text-lg text-white/80 font-light leading-relaxed">
              One of the most compelling advantages of choosing <strong>K Raheja Vistas Mahalunge</strong> as your home is the extraordinary 
              accessibility to <strong>${place}</strong>. Located in the heart of Baner Annexe, residents of K Raheja Vistas enjoy unparalleled 
              proximity to every essential and lifestyle destination in West Pune.
            </p>
            <h3 class="text-2xl font-serif text-[var(--color-luxury-gold)] mt-8">
              Why Location is the K Raheja Vistas Advantage
            </h3>
            <p class="text-white/70 leading-relaxed">
              ${place} is just minutes from K Raheja Vistas Mahalunge, making daily life seamlessly convenient for residents. 
              This exceptional connectivity — combined with our 7.5-acre resort-style living environment — is precisely why 
              discerning West Pune families choose K Raheja Vistas over every other luxury project in the micro-market.
            </p>
            <h3 class="text-2xl font-serif text-[var(--color-luxury-gold)] mt-8">
              Ultra-Luxury Living with Complete Urban Convenience
            </h3>
            <p class="text-white/70 leading-relaxed">
              K Raheja Vistas Mahalunge delivers the rare combination of resort-style serenity — 75% open green spaces, 
              twin world-class clubhouses, temperature-controlled infinity pool — with immediate access to Pune's finest ${category} 
              including ${place}. This is what true luxury living means in 2026.
            </p>
          </div>
        `
      };
      count++;
    }
  });
});

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
console.log(`✅ Successfully injected ${count} hyperlocal neighborhood authority pages!`);
