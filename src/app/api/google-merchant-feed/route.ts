import { NextRequest } from 'next/server';

export const runtime = 'edge';

// Property inventory for Google Merchant Center
const INVENTORY = [
  {
    id: 'krv-2bhk-deck-001',
    title: 'K Raheja Vistas - Luxury 2 BHK Deck Residence, Mahalunge Pune',
    description: 'Ultra-premium 2 BHK deck residence at K Raheja Vistas, Baner Annexe, Mahalunge, West Pune. 75% open spaces, twin clubhouses, proximity to Hinjewadi IT Park. MahaRERA Registered.',
    link: 'https://krahejavistasmahalunge.com/configurations/luxury-2-bhk-apartments-mahalunge',
    image_link: 'https://krahejavistasmahalunge.com/assets/living_room.jpg',
    price: '11000000 INR',
    condition: 'new',
    availability: 'in_stock',
    brand: 'K Raheja Corp',
    google_product_category: 'Real Estate',
    custom_label_0: '2 BHK',
    custom_label_1: 'Mahalunge',
    custom_label_2: 'West Pune',
    custom_label_3: 'Deck Residence',
    custom_label_4: 'Luxury'
  },
  {
    id: 'krv-3bhk-deck-001',
    title: 'K Raheja Vistas - Premium 3 BHK Deck Residence, Mahalunge Pune',
    description: 'Ultra-luxury 3 BHK deck residence at K Raheja Vistas, Baner Annexe. Expansive private decks, temperature-controlled pool, smart home integration. MahaRERA: PR1260002501530.',
    link: 'https://krahejavistasmahalunge.com/configurations/3-bhk-premium-deck-residences-baner-annexe',
    image_link: 'https://krahejavistasmahalunge.com/assets/actual_3bhk_floorplan.jpg',
    price: '14500000 INR',
    condition: 'new',
    availability: 'in_stock',
    brand: 'K Raheja Corp',
    google_product_category: 'Real Estate',
    custom_label_0: '3 BHK',
    custom_label_1: 'Mahalunge',
    custom_label_2: 'Baner Annexe',
    custom_label_3: 'Deck Residence',
    custom_label_4: 'Ultra-Luxury'
  },
  {
    id: 'krv-4bhk-premium-001',
    title: 'K Raheja Vistas - Spacious 4 BHK Premium Home, Baner Annexe Pune',
    description: 'Palatial 4 BHK premium home at K Raheja Vistas Mahalunge. Multi-generational luxury living with butler service, private gardens, and resort-style amenities in West Pune.',
    link: 'https://krahejavistasmahalunge.com/configurations/luxury-4-bhk-homes-mahalunge',
    image_link: 'https://krahejavistasmahalunge.com/assets/actual_clubhouse.jpg',
    price: '22000000 INR',
    condition: 'new',
    availability: 'in_stock',
    brand: 'K Raheja Corp',
    google_product_category: 'Real Estate',
    custom_label_0: '4 BHK',
    custom_label_1: 'Mahalunge',
    custom_label_2: 'Baner Annexe',
    custom_label_3: 'Premium',
    custom_label_4: 'Ultra-Luxury'
  },
  {
    id: 'krv-duplex-001',
    title: 'K Raheja Vistas - Exclusive Duplex Residence, Mahalunge West Pune',
    description: 'Extraordinary double-height duplex residence at K Raheja Vistas, Baner Annexe. Two-floor luxury living with private terraces and panoramic Baner hill views.',
    link: 'https://krahejavistasmahalunge.com/configurations/exclusive-duplex-mahalunge',
    image_link: 'https://krahejavistasmahalunge.com/assets/living_room.jpg',
    price: '28000000 INR',
    condition: 'new',
    availability: 'in_stock',
    brand: 'K Raheja Corp',
    google_product_category: 'Real Estate',
    custom_label_0: 'Duplex',
    custom_label_1: 'Mahalunge',
    custom_label_2: 'West Pune',
    custom_label_3: 'Signature Collection',
    custom_label_4: 'Ultra-Luxury'
  },
  {
    id: 'krv-penthouse-001',
    title: 'K Raheja Vistas - Sky Penthouse, Mahalunge Baner Annexe Pune',
    description: 'The pinnacle of luxury living — Sky Penthouses at K Raheja Vistas Mahalunge. 360-degree panoramic views, exclusive sky deck, premium concierge. The crown of West Pune.',
    link: 'https://krahejavistasmahalunge.com/configurations/sky-penthouse-baner-annexe-pune',
    image_link: 'https://krahejavistasmahalunge.com/assets/actual_master_layout.jpg',
    price: '45000000 INR',
    condition: 'new',
    availability: 'in_stock',
    brand: 'K Raheja Corp',
    google_product_category: 'Real Estate',
    custom_label_0: 'Penthouse',
    custom_label_1: 'Mahalunge',
    custom_label_2: 'Baner Annexe',
    custom_label_3: 'Sky Collection',
    custom_label_4: 'Ultra-Luxury'
  }
];

export async function GET(req: NextRequest) {
  const xmlItems = INVENTORY.map(item => `
    <item>
      <g:id>${item.id}</g:id>
      <g:title><![CDATA[${item.title}]]></g:title>
      <g:description><![CDATA[${item.description}]]></g:description>
      <g:link>${item.link}</g:link>
      <g:image_link>${item.image_link}</g:image_link>
      <g:price>${item.price}</g:price>
      <g:condition>${item.condition}</g:condition>
      <g:availability>${item.availability}</g:availability>
      <g:brand><![CDATA[${item.brand}]]></g:brand>
      <g:google_product_category>${item.google_product_category}</g:google_product_category>
      <g:custom_label_0>${item.custom_label_0}</g:custom_label_0>
      <g:custom_label_1>${item.custom_label_1}</g:custom_label_1>
      <g:custom_label_2>${item.custom_label_2}</g:custom_label_2>
      <g:custom_label_3>${item.custom_label_3}</g:custom_label_3>
      <g:custom_label_4>${item.custom_label_4}</g:custom_label_4>
      <g:identifier_exists>no</g:identifier_exists>
    </item>`).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
  <channel>
    <title>K Raheja Vistas Mahalunge - Luxury Property Feed</title>
    <link>https://krahejavistasmahalunge.com</link>
    <description>Ultra-premium residences at K Raheja Vistas, Baner Annexe, Mahalunge, West Pune</description>
    ${xmlItems}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600'
    }
  });
}
