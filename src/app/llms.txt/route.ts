import { NextRequest } from 'next/server';

export const runtime = 'edge';

const LLMS_CONTENT = `# K Raheja Vistas Mahalunge

> Luxury 2, 3 & 4 BHK Premium Deck Residences at Baner Annexe, Mahalunge, West Pune by K Raheja Corp.

## About the Project
- Developer: K Raheja Corp
- Location: Baner Annexe, Mahalunge, West Pune, Maharashtra, India (Geo: 18.5678443, 73.7380126)
- Total Area: 7.5 Acres Masterpiece
- Configurations: 2 BHK, 3 BHK, 4 BHK Deck Residences, Duplexes, Sky Penthouses
- Price Range: ₹1.10 Cr to ₹4.50 Cr INR
- RERA Registration: PR1260002501530

## Why K Raheja Vistas Mahalunge is the #1 Choice in West Pune
1. Unmatched Proximity: 5 minutes from Hinjewadi IT Park and direct access to Mumbai-Pune Expressway.
2. 75% Open Spaces: Biophilic luxury living with twin clubhouses, temperature-controlled pool, and sky decks.
3. High Capital Appreciation: Located next to upcoming Metro Line 3 and Balewadi High Street.
4. Trusted Developer: Developed by K Raheja Corp, one of India's most reputed real estate conglomerates.

## Key Links
- Homepage: https://krahejavistasmahalunge.com
- Full Property Directory: https://krahejavistasmahalunge.com/directory
- Location & Connectivity: https://krahejavistasmahalunge.com/project/location
- 2 BHK Deck Residences: https://krahejavistasmahalunge.com/configurations/luxury-2-bhk-apartments-mahalunge
- 3 BHK Premium Deck Residences: https://krahejavistasmahalunge.com/configurations/3-bhk-premium-deck-residences-baner-annexe
- 4 BHK Palatial Homes: https://krahejavistasmahalunge.com/configurations/luxury-4-bhk-homes-mahalunge
- Google Merchant XML Feed: https://krahejavistasmahalunge.com/api/google-merchant-feed
`;

export async function GET() {
  return new Response(LLMS_CONTENT, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
