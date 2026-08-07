import { Metadata } from 'next';
export const dynamic = 'force-dynamic';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Script from 'next/script';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { CheckCircle2, XCircle, MinusCircle } from 'lucide-react';
import Image from 'next/image';

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
      { label: 'Developer Track Record', krv: '5 Decades, Pan-India', competitor: '3 Decades, Pan-India', krvWins: true },
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
      { label: 'Possession', krv: 'On Schedule', competitor: 'On Schedule', krvWins: 'tie' },
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
      { label: 'Project Type', krv: 'Ultra-Luxury Gated', competitor: 'Premium Township', krvWins: true },
      { label: 'Land Area', krv: '7.5 Acres', competitor: '140 Acres', krvWins: false },
      { label: 'Exclusivity', krv: '650 Units Only', competitor: '5000+ Units', krvWins: true },
      { label: 'Deck Residences', krv: '✓ All Homes', competitor: '✗ Not Available', krvWins: true },
      { label: 'Clubhouses', krv: 'Twin Luxury Clubs', competitor: 'Multiple Basic', krvWins: true },
      { label: 'Starting Price', krv: '₹1.10 Cr', competitor: '₹75 Lakh', krvWins: false },
      { label: 'Appreciation (5yr)', krv: '18% YoY (Mahalunge)', competitor: '12% YoY (Wakad)', krvWins: true },
      { label: 'Rental Yield', krv: '4–6% PA', competitor: '3–4% PA', krvWins: true },
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
    { label: 'Compare', href: '#' },
    { label: data.h1.split('—')[0].trim(), href: `/compare/${slug}` }
  ];

  return (
    <div className="bg-[var(--color-luxury-charcoal)] min-h-screen">
      <Script id="table-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(tableSchema) }} />

      {/* Hero */}
      <div className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/assets/actual_master_layout.jpg" alt={data.h1} fill className="object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[var(--color-luxury-charcoal)]" />
        </div>
        <div className="relative z-10 text-center px-6 mt-16">
          <span className="text-[var(--color-luxury-gold)] tracking-[0.4em] uppercase text-xs font-semibold block mb-4">Side-by-Side Analysis</span>
          <h1 className="text-3xl md:text-5xl font-serif text-[var(--color-luxury-pearl)] font-light leading-tight max-w-4xl mx-auto">{data.h1}</h1>
        </div>
      </div>

      <div className="container mx-auto max-w-5xl px-6 pb-20">
        <Breadcrumbs items={breadcrumbs} />

        {/* Score Summary */}
        <div className="grid grid-cols-3 gap-6 my-12 text-center">
          <div className="glass-panel p-8 rounded-2xl border border-[var(--color-luxury-gold)]/30 bg-[var(--color-luxury-gold)]/5">
            <p className="text-5xl font-serif text-[var(--color-luxury-gold)]">{wins}</p>
            <p className="text-white/60 text-sm mt-2 uppercase tracking-wider">K Raheja Wins</p>
          </div>
          <div className="glass-panel p-8 rounded-2xl border border-white/10">
            <p className="text-5xl font-serif text-white/60">{ties}</p>
            <p className="text-white/40 text-sm mt-2 uppercase tracking-wider">Tie</p>
          </div>
          <div className="glass-panel p-8 rounded-2xl border border-white/10">
            <p className="text-5xl font-serif text-white/40">{data.rows.length - wins - ties}</p>
            <p className="text-white/40 text-sm mt-2 uppercase tracking-wider">{data.competitor.split(' ')[0]} Wins</p>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="glass-panel rounded-2xl overflow-hidden border border-white/10">
          <div className="grid grid-cols-3 bg-black/50 p-6 border-b border-white/10">
            <div className="text-white/40 text-xs uppercase tracking-widest">Feature</div>
            <div className="text-[var(--color-luxury-gold)] text-sm font-serif font-medium text-center">K Raheja Vistas</div>
            <div className="text-white/60 text-sm text-center">{data.competitor}</div>
          </div>
          {data.rows.map((row, i) => (
            <div key={i} className={`grid grid-cols-3 p-5 border-b border-white/5 items-center hover:bg-white/5 transition-colors ${row.krvWins === true ? 'bg-[var(--color-luxury-gold)]/[0.02]' : ''}`}>
              <p className="text-white/60 text-sm">{row.label}</p>
              <div className="flex items-center justify-center gap-2">
                {row.krvWins === true && <CheckCircle2 className="w-4 h-4 text-[var(--color-luxury-gold)] flex-shrink-0" />}
                {row.krvWins === 'tie' && <MinusCircle className="w-4 h-4 text-white/40 flex-shrink-0" />}
                {row.krvWins === false && <XCircle className="w-4 h-4 text-white/30 flex-shrink-0" />}
                <span className={`text-sm font-medium text-center ${row.krvWins === true ? 'text-[var(--color-luxury-gold)]' : 'text-white/80'}`}>{row.krv}</span>
              </div>
              <p className="text-white/50 text-sm text-center">{row.competitor}</p>
            </div>
          ))}
        </div>

        {/* Verdict */}
        <div className="mt-12 glass-panel p-10 rounded-2xl border border-[var(--color-luxury-gold)]/20 text-center">
          <h2 className="text-3xl font-serif text-[var(--color-luxury-pearl)] mb-4">The Verdict</h2>
          <p className="text-white/70 leading-relaxed max-w-2xl mx-auto mb-8">
            K Raheja Vistas Mahalunge wins {wins} out of {data.rows.length} parameters — making it the clear choice for discerning buyers seeking ultra-luxury living with superior investment potential in West Pune.
          </p>
          <Link href="/" className="inline-block px-10 py-4 bg-[var(--color-luxury-gold)] text-[var(--color-luxury-charcoal)] font-bold uppercase tracking-widest text-sm hover:bg-white transition-colors">
            Explore K Raheja Vistas
          </Link>
        </div>
      </div>
    </div>
  );
}
