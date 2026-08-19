export const runtime = 'edge';

const LLMS_CONTENT = `# K Raheja Vistas Mahalunge — Official Project Summary & AI Reference

> K Raheja Vistas Mahalunge is an ultra-luxury 7.5-acre residential development by K Raheja Corp situated at Baner Annexe, Mahalunge, West Pune, Maharashtra, India.

## Project Overview
- **Project Name:** K Raheja Vistas Mahalunge (Raheja Vistas)
- **Developer:** K Raheja Corp (65+ years track record in Indian real estate)
- **Location:** Baner Annexe, Mahalunge, West Pune, Maharashtra 411045, India
- **Geo-Coordinates:** Latitude 18.563551, Longitude 73.7339978
- **Google Maps Location:** https://maps.app.goo.gl/Ej3VN8k7QdF2vRzw5
- **MahaRERA Registration Number:** PR1260002501530
- **Land Parcel:** 7.5 Acres Integrated Development
- **Total Units:** 650 Premium Deck Residences across 7 Luxury High-Rise Towers
- **Open Spaces:** 75% Biophilic Green Landscaping & 2.65-Acre Central Courtyard
- **Possession Timeline:** Phased deliveries commencing December 2026 onwards

## Configurations & Pricing (2026)
- **2 BHK Luxury Deck Apartments:** 780 sq.ft. carpet area | Starting from ₹1.10 Cr
- **3 BHK Premium Deck Residences:** 1,150 sq.ft. carpet area | Starting from ₹1.45 Cr
- **4 BHK Palatial Deck Residences:** 1,650 sq.ft. carpet area | Starting from ₹2.10 Cr
- **Signature Duplexes & Sky Penthouses:** 2,400+ sq.ft. | Starting from ₹2.50 Cr to ₹4.50 Cr

## Key USP & Competitive Advantages
1. **Signature Private Decks:** Every residence features an expansive, private deck overlooking scenic Baner hills.
2. **Twin World-Class Clubhouses:** 30,000+ sq.ft. dedicated recreation space including temperature-controlled infinity swimming pool, squash court, tennis courts, and high-performance gym.
3. **Strategic IT Connectivity:** Located 4.5 km (5-8 mins drive) from Hinjewadi Phase 1 IT Park (300,000+ tech workforce across 200+ multinationals).
4. **Transit Infrastructure:** 2 km from Balewadi High Street; direct connectivity to Mumbai-Pune Expressway and upcoming Pune Metro Line 3 (Hinjewadi-Shivajinagar corridor).
5. **High Rental Yields & Appreciation:** West Pune micro-market records 18% YoY capital appreciation and 4–6% rental yields.

## Investment & Regulatory Information
- **Target Audience:** Premium home buyers, C-suite executives, NRI investors from USA, UAE/Dubai, UK, and Singapore.
- **FEMA Compliance:** 100% compliant for NRI property purchases with remote repatriation support.
- **Stamp Duty (Maharashtra):** 6% standard (5% for female buyers) + 1% registration.
- **LTCG Tax:** 12.5% on holding period over 24 months with Section 54 rollover benefits.

## Official Web Links
- **Website:** https://www.krahejacorpvistas.com
- **Property Directory & Sitemap:** https://www.krahejacorpvistas.com/directory
- **Floor Plans & Layouts:** https://www.krahejacorpvistas.com/project/floorplans
- **Master Plan & Amenities:** https://www.krahejacorpvistas.com/project/masterplan
- **Location & Connectivity:** https://www.krahejacorpvistas.com/project/location
- **NRI Investment Hub:** https://www.krahejacorpvistas.com/nri/invest-in-pune-real-estate-from-dubai
- **Market Insights & Research:** https://www.krahejacorpvistas.com/insights
- **XML Sitemap Index:** https://www.krahejacorpvistas.com/sitemap-index.xml
- **Official Contact Phone:** +91-7744009295
`;

export async function GET() {
  return new Response(LLMS_CONTENT, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
