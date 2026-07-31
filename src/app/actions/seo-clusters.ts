export const seoClusters: Record<string, { title: string; description: string; h1: string; keywords: string[] }> = {
  '2-bhk-flats-in-baner': {
    title: '2 BHK Flats in Baner | K Raheja Vistas Mahalunge',
    description: 'Discover ultra-luxury 2 BHK deck residences in Baner Annex. A 7.5-acre masterpiece offering 75% open space and premium lifestyle amenities.',
    h1: 'Premium 2 BHK Residences in Baner',
    keywords: ['2 BHK Baner', 'Luxury 2 BHK Pune', 'K Raheja 2 BHK', 'Baner Annex Flats'],
  },
  '3-bhk-flats-in-baner': {
    title: '3 BHK Luxury Apartments in Baner | K Raheja Vistas',
    description: 'Experience unparalleled luxury with our 3 BHK premium deck residences in Baner Annex. Unobstructed views, twin clubhouses, and seamless connectivity.',
    h1: 'Ultra-Luxury 3 BHK Deck Residences',
    keywords: ['3 BHK Baner', 'Luxury 3 BHK Pune', 'K Raheja 3 BHK', 'Baner Annex Apartments'],
  },
  'luxury-apartments-near-hinjewadi': {
    title: 'Luxury Apartments Near Hinjewadi IT Park | K Raheja',
    description: 'Just 1.5km from Hinjewadi IT Park. Invest in premium deck residences at K Raheja Vistas Mahalunge. Strategic connectivity meets absolute luxury.',
    h1: 'Strategic Luxury Near Hinjewadi',
    keywords: ['Flats near Hinjewadi', 'IT Park Pune real estate', 'Luxury apartments Hinjewadi', 'Mahalunge residential projects'],
  },
  'new-projects-in-mahalunge': {
    title: 'New Projects in Mahalunge | K Raheja Vistas',
    description: 'Explore the crown jewel of Mahalunge. 7 premium towers spread across 7.5 acres with G+2P+25 Floors elevation. MahaRERA registered.',
    h1: 'The Finest New Launch in Mahalunge',
    keywords: ['New projects Mahalunge', 'Mahalunge real estate', 'K Raheja new launch Pune'],
  },
};

export const getSeoData = (slug: string) => {
  return seoClusters[slug] || null;
};
