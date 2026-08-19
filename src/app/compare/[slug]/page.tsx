import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Script from 'next/script';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { CheckCircle2, XCircle, MinusCircle } from 'lucide-react';
import Image from 'next/image';

export const revalidate = 86400; // 24 hours ISR edge cache

type CompareRow = { label: string; krv: string; competitor: string; krvWins: boolean | 'tie' };

const COMPARISONS: Record<string, {
  title: string; description: string; h1: string;
  competitor: string; competitorLocation: string;
  rows: CompareRow[];
}> = {
  'k-raheja-vistas-vs-godrej-hillside-mahalunge': {
    title: 'K Raheja Vistas vs Godrej Hillside Mahalunge | Which is Better?',
    description: 'Detailed comparison of K Raheja Vistas Mahalunge vs Godrej Hillside — price, amenities, location, configurations, MahaRERA compliance and investment potential in West Pune.',
    h1: 'K Raheja Vistas vs Godrej Hillside — Complete Comparison 2026',
    competitor: 'Godrej Hillside Mahalunge',
    competitorLocation: 'Mahalunge, Pune',
    rows: [
      { label: 'Land Area', krv: '7.5 Acres', competitor: '5.2 Acres', krvWins: true },
      { label: 'Total Towers', krv: '7 Towers', competitor: '5 Towers', krvWins: true },
      { label: 'Open Space', krv: '75% Open', competitor: '60% Open', krvWins: true },
      { label: 'Private Deck', krv: '✓ Every Home', competitor: 'Selected Units', krvWins: true },
      { label: 'Clubhouse', krv: 'Twin Clubhouses', competitor: 'Single Clubhouse', krvWins: true },
      { label: 'Starting Price', krv: '₹1.10 Cr', competitor: '₹1.25 Cr', krvWins: true },
      { label: 'MahaRERA', krv: 'PR1260002501530', competitor: 'Registered', krvWins: 'tie' },
      { label: 'Developer Track Record', krv: '65+ Years, Pan-India', competitor: '30+ Years, Pan-India', krvWins: true },
      { label: 'Smart Home', krv: '✓ Standard', competitor: 'Premium Add-on', krvWins: true },
      { label: 'Hinjewadi Distance', krv: '4.5 km', competitor: '6 km', krvWins: true },
    ]
  },
  'k-raheja-vistas-vs-rohan-harita-baner': {
    title: 'K Raheja Vistas vs Rohan Harita Baner | Side-by-Side Review',
    description: 'K Raheja Vistas Mahalunge vs Rohan Harita Baner — which luxury project offers better value, amenities, and investment returns in West Pune?',
    h1: 'K Raheja Vistas vs Rohan Harita Baner — Detailed 2026 Comparison',
    competitor: 'Rohan Harita Baner',
    competitorLocation: 'Baner, Pune',
    rows: [
      { label: 'Land Area', krv: '7.5 Acres', competitor: '4.0 Acres', krvWins: true },
      { label: 'Configurations', krv: '2, 3, 4 BHK + Duplex', competitor: '2 & 3 BHK Only', krvWins: true },
      { label: 'Deck Residences', krv: '✓ All Homes', competitor: '✗ Not Available', krvWins: true },
      { label: 'Clubhouse', krv: 'Twin Clubhouses', competitor: 'Single Clubhouse', krvWins: true },
      { label: 'Infinity Pool', krv: 'Temperature Controlled', competitor: 'Standard Pool', krvWins: true },
      { label: 'Starting Price', krv: '₹1.10 Cr', competitor: '₹98 Lakh', krvWins: false },
      { label: 'MahaRERA', krv: 'PR1260002501530', competitor: 'Registered', krvWins: 'tie' },
      { label: 'Possession', krv: 'On Schedule (2026)', competitor: 'On Schedule', krvWins: 'tie' },
      { label: 'Smart Home', krv: '✓ Standard', competitor: '✗ Optional', krvWins: true },
      { label: 'Brand Pedigree', krv: 'K Raheja Corp', competitor: 'Rohan Builders', krvWins: true },
    ]
  },
  'k-raheja-vistas-vs-kolte-patil-baner': {
    title: 'K Raheja Vistas vs Kolte Patil Baner | Investment Comparison 2026',
    description: 'Comparing K Raheja Vistas Mahalunge against Kolte Patil projects in Baner — price per sqft, amenities, ROI, and why K Raheja Vistas delivers more value.',
    h1: 'K Raheja Vistas vs Kolte Patil Baner — Which Offers Better ROI?',
    competitor: 'Kolte Patil Life Republic',
    competitorLocation: 'Wakad-Hinjewadi, Pune',
    rows: [
      { label: 'Micro-Market', krv: 'Baner Annexe / Mahalunge', competitor: 'Marunji / Hinjewadi Ph 2', krvWins: true },
      { label: 'Land Area', krv: '7.5 Acres Integrated', competitor: 'Large Township', krvWins: 'tie' },
      { label: 'Density', krv: 'Low Density (650 Units)', competitor: 'High Density (5000+ Units)', krvWins: true },
      { label: 'Deck Architecture', krv: 'Private Decks on All Units', competitor: 'Standard Balconies', krvWins: true },
      { label: 'Starting Price', krv: '₹1.10 Cr', competitor: '₹85 Lakh', krvWins: false },
      { label: 'Balewadi High Street', krv: '2 km (5 mins)', competitor: '9 km (25 mins)', krvWins: true },
      { label: 'Rental Yield', krv: '4–6% pa', competitor: '3.5–4% pa', krvWins: true },
      { label: 'MahaRERA', krv: 'PR1260002501530', competitor: 'Registered', krvWins: 'tie' },
      { label: 'Hinjewadi Distance', krv: '4.5 km', competitor: '2 km', krvWins: false },
    ]
  },
  'best-luxury-projects-near-hinjewadi': {
    title: 'Best Luxury Projects Near Hinjewadi IT Park 2026 | Top Picks',
    description: 'Looking for luxury homes near Hinjewadi IT Park? Compare the top premium residential projects in West Pune — K Raheja Vistas, Godrej Hillside, Rohan Harita and more.',
    h1: 'Top 5 Luxury Projects Near Hinjewadi IT Park — 2026 Rankings',
    competitor: 'Other Projects Near Hinjewadi',
    competitorLocation: 'West Pune',
    rows: [
      { label: '#1 Pick', krv: 'K Raheja Vistas Mahalunge', competitor: 'Others', krvWins: true },
      { label: 'Distance from Hinjewadi', krv: '4.5 km', competitor: '4–8 km', krvWins: true },
      { label: 'Acres', krv: '7.5 Acres', competitor: '4–6 Acres', krvWins: true },
      { label: 'Private Decks', krv: 'Every Residence', competitor: 'Not Standard', krvWins: true },
      { label: 'Open Spaces', krv: '75%', competitor: '50–65%', krvWins: true },
      { label: 'Configurations', krv: '2–4 BHK + Duplex', competitor: '2–3 BHK', krvWins: true },
      { label: 'Price Entry', krv: '₹1.10 Cr', competitor: '₹98L–₹1.3Cr', krvWins: true },
      { label: 'Appreciation (5yr)', krv: '18% YoY', competitor: '10–14% YoY', krvWins: true },
      { label: 'MahaRERA', krv: 'PR1260002501530', competitor: 'Varies', krvWins: true },
      { label: 'Smart Home', krv: 'Standard', competitor: 'Premium Add-on', krvWins: true },
    ]
  },
};

export async function generateStaticParams() {
  return Object.keys(COMPARISONS).map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const data = COMPARISONS[slug];
  if (!data) return {};
  return {
    title: data.title,
    description: data.description,
    alternates: { canonical: `https://www.krahejacorpvistas.com/compare/${slug}` },
    openGraph: {
      title: data.title,
      description: data.description,
      url: `https://www.krahejacorpvistas.com/compare/${slug}`,
      images: [{ url: '/assets/banner.jpg', width: 1200, height: 630, alt: data.h1 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: data.title,
      description: data.description,
      images: ['/assets/banner.jpg'],
    },
  };
}

export default async function ComparisonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = COMPARISONS[slug];
  if (!data) { notFound(); return null; }

  const wins = data.rows.filter(r => r.krvWins === true).length;
  const ties = data.rows.filter(r => r.krvWins === 'tie').length;

  const tableSchema = {
    "@context": "https://schema.org",
    "@type": "Table",
    "name": data.h1,
    "description": data.description,
    "about": {
      "@type": "ApartmentComplex",
      "name": "K Raheja Vistas Mahalunge",
      "address": { "@type": "PostalAddress", "addressLocality": "Mahalunge, Pune", "addressCountry": "IN" }
    }
  };

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Compare Projects', href: '/compare' },
    { label: data.h1, href: `/compare/${slug}` }
  ];

  return (
    <div className="min-h-screen bg-[var(--color-luxury-charcoal)] pt-32 pb-24 px-6">
      <Script id="compare-table-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(tableSchema) }} />

      <div className="container mx-auto max-w-5xl">
        <Breadcrumbs items={breadcrumbs} />

        {/* Hero */}
        <div className="text-center mb-16">
          <span className="text-[var(--color-luxury-gold)] tracking-[0.4em] uppercase text-xs font-semibold block mb-4">
            Independent Real Estate Analysis
          </span>
          <h1 className="text-3xl md:text-5xl font-serif text-[var(--color-luxury-pearl)] font-light leading-tight mb-6 max-w-4xl mx-auto">
            {data.h1}
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed">
            {data.description}
          </p>

          {/* Win Score Banner */}
          <div className="mt-8 inline-flex items-center gap-4 bg-[var(--color-luxury-gold)]/10 border border-[var(--color-luxury-gold)]/30 px-6 py-3 rounded-full text-sm">
            <span className="text-[var(--color-luxury-gold)] font-bold">K Raheja Vistas Advantage:</span>
            <span className="text-white">Ahead in <strong>{wins}</strong> out of {data.rows.length} categories ({ties} tied)</span>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden mb-16 shadow-2xl">
          <div className="grid grid-cols-3 bg-white/5 border-b border-white/10 p-5 text-sm font-semibold tracking-wider uppercase">
            <div className="text-white/50">Feature / Metric</div>
            <div className="text-[var(--color-luxury-gold)] text-center font-bold">K Raheja Vistas</div>
            <div className="text-white/60 text-center">{data.competitor}</div>
          </div>

          <div className="divide-y divide-white/5">
            {data.rows.map((row, idx) => (
              <div key={idx} className={`grid grid-cols-3 p-5 text-sm items-center transition-colors ${row.krvWins === true ? 'bg-[var(--color-luxury-gold)]/5 hover:bg-[var(--color-luxury-gold)]/10' : 'hover:bg-white/5'}`}>
                <div className="text-white/80 font-medium flex items-center gap-2">
                  {row.krvWins === true && <CheckCircle2 className="w-4 h-4 text-[var(--color-luxury-gold)] flex-shrink-0" />}
                  {row.krvWins === false && <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />}
                  {row.krvWins === 'tie' && <MinusCircle className="w-4 h-4 text-white/40 flex-shrink-0" />}
                  {row.label}
                </div>
                <div className="text-center font-semibold text-white">
                  <span className={row.krvWins === true ? 'text-[var(--color-luxury-gold)]' : 'text-white'}>{row.krv}</span>
                </div>
                <div className="text-center text-white/60">
                  {row.competitor}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Other Comparisons */}
        <div className="mb-16">
          <h2 className="text-2xl font-serif text-[var(--color-luxury-pearl)] mb-6">Explore Other Project Comparisons</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(COMPARISONS).filter(([k]) => k !== slug).map(([key, item]) => (
              <Link key={key} href={`/compare/${key}`} className="glass-panel p-5 rounded-xl border border-white/10 hover:border-[var(--color-luxury-gold)] transition-colors block group">
                <p className="text-white font-medium group-hover:text-[var(--color-luxury-gold)] transition-colors text-sm mb-2">{item.h1}</p>
                <span className="text-[var(--color-luxury-gold)] text-xs font-semibold">View Comparison &rarr;</span>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center glass-panel p-12 rounded-3xl border border-[var(--color-luxury-gold)]/20 bg-[var(--color-luxury-gold)]/5">
          <h2 className="text-3xl font-serif text-[var(--color-luxury-pearl)] mb-4">Experience the K Raheja Vistas Advantage</h2>
          <p className="text-white/60 mb-8 max-w-xl mx-auto">Book a private site visit and experience Pune&apos;s finest deck residences with your own eyes.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+917744009295" className="px-10 py-4 bg-[var(--color-luxury-gold)] text-[var(--color-luxury-charcoal)] font-bold uppercase tracking-widest text-sm hover:bg-white transition-colors">
              Schedule Site Visit (+91 77440 09295)
            </a>
            <Link href="/project/floorplans" className="px-10 py-4 border border-white/30 text-white font-bold uppercase tracking-widest text-sm hover:border-[var(--color-luxury-gold)] hover:text-[var(--color-luxury-gold)] transition-colors">
              View Floor Plans
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
