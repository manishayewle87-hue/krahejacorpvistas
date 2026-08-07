import Script from 'next/script';
import { Metadata } from 'next';
import Link from 'next/link';

export function generateMetadata({ params }: { params: { market: string } }): Metadata {
  const markets: Record<string, { title: string; description: string; city: string; country: string; locale: string }> = {
    'invest-in-pune-real-estate-from-dubai': {
      title: 'Invest in Pune Real Estate from Dubai | K Raheja Vistas Mahalunge',
      description: 'NRI real estate investment opportunity from Dubai (UAE). K Raheja Vistas Mahalunge offers ultra-luxury 2 & 3 BHK deck residences in West Pune with 18% YoY appreciation.',
      city: 'Dubai', country: 'UAE', locale: 'en-AE'
    },
    'luxury-homes-pune-for-nri-uk': {
      title: 'Luxury Homes in Pune for NRI from UK | K Raheja Vistas Mahalunge',
      description: 'NRI property investment from United Kingdom. Discover ultra-premium residences at K Raheja Vistas, Baner Annexe, Mahalunge — Pune\'s most exclusive address.',
      city: 'London', country: 'UK', locale: 'en-GB'
    },
    'best-nri-investment-pune-singapore': {
      title: 'Best NRI Investment in Pune from Singapore | K Raheja Vistas',
      description: 'Top-rated NRI real estate investment from Singapore. K Raheja Vistas Mahalunge offers high rental yields, Metro connectivity and luxury living in West Pune.',
      city: 'Singapore', country: 'Singapore', locale: 'en-SG'
    },
    'pune-real-estate-investment-for-nri-usa': {
      title: 'Pune Real Estate Investment for NRI USA | K Raheja Vistas Mahalunge',
      description: 'NRI investment from USA in Pune\'s luxury real estate market. K Raheja Vistas Mahalunge — 7.5-acre gated community in Baner Annexe with world-class amenities.',
      city: 'USA', country: 'United States', locale: 'en-US'
    },
  };

  const data = markets[params.market] || markets['invest-in-pune-real-estate-from-dubai'];

  return {
    title: data.title,
    description: data.description,
    alternates: {
      canonical: `https://www.krahejacorpvistas.com/nri/${params.market}`,
      languages: {
        [data.locale]: `https://www.krahejacorpvistas.com/nri/${params.market}`,
        'x-default': `https://www.krahejacorpvistas.com/`,
      },
    },
    openGraph: {
      title: data.title,
      description: data.description,
    }
  };
}

const NRI_MARKETS = {
  'invest-in-pune-real-estate-from-dubai': {
    city: 'Dubai, UAE', flag: '🇦🇪', currency: 'AED',
    headline: 'Invest in Pune\'s Most Coveted Address from Dubai',
    subheadline: 'Repatriate wealth, secure your family\'s future, and build a legacy back home.',
    benefits: [
      'Fully FEMA-compliant NRI purchase process',
      'Dedicated NRI Relationship Manager in Dubai',
      '18% YoY appreciation in Mahalunge micro-market',
      'Rental yields of 4-6% pa from Hinjewadi IT professionals'
    ]
  },
  'luxury-homes-pune-for-nri-uk': {
    city: 'United Kingdom', flag: '🇬🇧', currency: 'GBP',
    headline: 'Own Ultra-Luxury Property in Pune from the UK',
    subheadline: 'Favourable INR-GBP exchange rates make this the ideal moment to invest.',
    benefits: [
      'Online virtual property tours available',
      'Full legal documentation handled remotely',
      'DTAA benefits available for UK-based NRIs',
      'Dedicated UK timezone support line'
    ]
  },
  'best-nri-investment-pune-singapore': {
    city: 'Singapore', flag: '🇸🇬', currency: 'SGD',
    headline: 'Pune\'s #1 NRI Investment Opportunity for Singapore Residents',
    subheadline: 'Diversify beyond Singapore REITs with direct ownership of ultra-premium Indian real estate.',
    benefits: [
      'Strong INR-SGD currency arbitrage advantage',
      'Seamless NRI loan processing via HDFC & SBI',
      'MahaRERA guarantee — complete legal protection',
      'Singapore NRI community site visits organized quarterly'
    ]
  },
  'pune-real-estate-investment-for-nri-usa': {
    city: 'United States', flag: '🇺🇸', currency: 'USD',
    headline: 'From Silicon Valley to K Raheja Vistas Mahalunge',
    subheadline: 'The smartest NRIs from the Bay Area and New York are already invested. Are you?',
    benefits: [
      'USD wire transfer support via NRE/NRO accounts',
      'Virtual property tours across all US time zones',
      'Capital gains repatriation fully compliant with IRS rules',
      'Hinjewadi IT corridor — familiar territory for US tech NRIs'
    ]
  }
};

export async function generateStaticParams() {
  return Object.keys(NRI_MARKETS).map(market => ({ market }));
}

export default function NriLandingPage({ params }: { params: { market: string } }) {
  const market = NRI_MARKETS[params.market as keyof typeof NRI_MARKETS] || NRI_MARKETS['invest-in-pune-real-estate-from-dubai'];

  const schema = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    "name": `K Raheja Vistas Mahalunge — NRI Investment from ${market.city}`,
    "description": `Ultra-luxury residences at K Raheja Vistas Mahalunge for NRI investors based in ${market.city}. MahaRERA Registered.`,
    "url": `https://www.krahejacorpvistas.com/nri/${params.market}`,
    "inLanguage": "en",
    "audience": { "@type": "Audience", "audienceType": `Non-Resident Indians in ${market.city}` },
    "offers": {
      "@type": "Offer",
      "price": "11000000",
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock"
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-luxury-charcoal)] pt-32 pb-20 px-6">
      <Script id="nri-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <div className="container mx-auto max-w-5xl">
        {/* Hero */}
        <div className="text-center mb-20">
          <span className="text-5xl block mb-6">{market.flag}</span>
          <span className="text-[var(--color-luxury-gold)] tracking-[0.4em] uppercase text-xs font-semibold block mb-4">NRI Investment — {market.city}</span>
          <h1 className="text-4xl md:text-6xl font-serif text-[var(--color-luxury-pearl)] font-light leading-tight mb-6 max-w-4xl mx-auto">
            {market.headline}
          </h1>
          <p className="text-white/60 text-xl max-w-2xl mx-auto leading-relaxed">{market.subheadline}</p>
        </div>

        {/* Project Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {[
            { label: 'Acres', value: '7.5' },
            { label: 'Premium Towers', value: '7' },
            { label: 'Residences', value: '650' },
            { label: 'MahaRERA', value: '✓' },
          ].map((stat, i) => (
            <div key={i} className="glass-panel p-6 rounded-2xl text-center border border-white/10">
              <p className="text-3xl md:text-4xl font-serif text-[var(--color-luxury-gold)]">{stat.value}</p>
              <p className="text-white/50 text-xs uppercase tracking-widest mt-2">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* NRI Benefits */}
        <div className="glass-panel p-10 md:p-16 rounded-3xl border border-white/10 mb-16">
          <h2 className="text-3xl font-serif text-[var(--color-luxury-pearl)] mb-8">
            Why NRIs from {market.city} Choose K Raheja Vistas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {market.benefits.map((benefit, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[var(--color-luxury-gold)]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-[var(--color-luxury-gold)] text-sm font-bold">{i + 1}</span>
                </div>
                <p className="text-white/80 leading-relaxed">{benefit}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center glass-panel p-12 rounded-3xl border border-[var(--color-luxury-gold)]/20 bg-[var(--color-luxury-gold)]/5">
          <h2 className="text-3xl font-serif text-[var(--color-luxury-pearl)] mb-4">Ready to Invest from {market.city}?</h2>
          <p className="text-white/60 mb-8">Our dedicated NRI desk is available across time zones. Let us guide your investment journey.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+911234567890" className="px-10 py-4 bg-[var(--color-luxury-gold)] text-[var(--color-luxury-charcoal)] font-bold uppercase tracking-widest text-sm hover:bg-white transition-colors">
              Call NRI Desk
            </a>
            <Link href="/" className="px-10 py-4 border border-white/30 text-white font-bold uppercase tracking-widest text-sm hover:border-[var(--color-luxury-gold)] hover:text-[var(--color-luxury-gold)] transition-colors">
              Explore Project
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
