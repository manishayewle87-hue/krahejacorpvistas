import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Market Insights & Research | K Raheja Vistas Mahalunge Pune',
  description: 'Expert real estate insights, market reports, and investment guides for Pune\'s luxury property market. Authoritative analysis on Mahalunge, Baner Annexe, and West Pune.',
  alternates: { canonical: 'https://www.krahejacorpvistas.com/insights' }
};

const FEATURED_ARTICLES = [
  {
    slug: 'insights/mahalunge-real-estate-market-report-2026',
    title: 'Mahalunge Real Estate Market Report 2026',
    excerpt: 'Comprehensive data on price trends, 18% YoY appreciation, rental yields, and the 2026–2031 investment outlook for West Pune.',
    category: 'Market Report', readTime: '8 min', badge: '🔥 Trending'
  },
  {
    slug: 'insights/nri-guide-buying-property-pune-2026',
    title: 'Complete NRI Guide to Buying Property in Pune 2026',
    excerpt: 'Step-by-step legal and financial guide: FEMA compliance, NRE/NRO accounts, home loans, TDS, and DTAA tax benefits for NRI buyers.',
    category: 'NRI Guide', readTime: '12 min', badge: '🌍 NRI Special'
  },
  {
    slug: 'insights/why-west-pune-fastest-growing-luxury-market',
    title: "Why West Pune is India's Fastest Growing Luxury Market",
    excerpt: 'Data-driven analysis of how the Hinjewadi IT engine and Metro Phase 3 are driving unprecedented appreciation in Mahalunge.',
    category: 'Market Analysis', readTime: '6 min', badge: '📊 Data Report'
  },
  {
    slug: 'insights/k-raheja-corp-5-decades-excellence',
    title: 'K Raheja Corp: 5 Decades of Delivering Excellence',
    excerpt: "50 million sqft delivered. 94% on-time delivery rate. India's most trusted developer and the story behind K Raheja Vistas.",
    category: 'Developer Profile', readTime: '5 min', badge: '🏆 Heritage'
  },
  {
    slug: 'insights/7-reasons-buy-3bhk-mahalunge-2027',
    title: '7 Reasons to Buy a 3 BHK in Mahalunge Before 2027',
    excerpt: 'Metro impact, Hinjewadi Phase 3 expansion, rental yield analysis and why the 2026 window is your last chance at current pricing.',
    category: 'Investment Guide', readTime: '7 min', badge: '⏰ Time-Sensitive'
  }
];

const insightsSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "name": "K Raheja Vistas Market Insights",
  "description": "Expert real estate market analysis, investment guides, and property insights for West Pune and Mahalunge.",
  "url": "https://www.krahejacorpvistas.com/insights",
  "publisher": {
    "@type": "Organization",
    "name": "K Raheja Corp",
    "logo": { "@type": "ImageObject", "url": "https://www.krahejacorpvistas.com/assets/logo.png" }
  }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Why is Mahalunge considered a top real estate investment in Pune?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Mahalunge is strategically located adjacent to Hinjewadi IT Park and Baner. The upcoming Metro Line 3 and infrastructure development are driving 15-18% YoY appreciation, making it West Pune's fastest-growing luxury micro-market."
      }
    },
    {
      "@type": "Question",
      "name": "Can NRIs invest in K Raheja Vistas Mahalunge?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, NRIs from Dubai, UK, USA, Singapore, and globally can seamlessly invest in K Raheja Vistas via NRE/NRO accounts in full compliance with FEMA regulations."
      }
    }
  ]
};

export default function InsightsPage() {
  return (
    <div className="min-h-screen bg-[var(--color-luxury-charcoal)] pt-32 pb-20 px-6">
      <script id="insights-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(insightsSchema) }} />
      <script id="insights-faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="text-[var(--color-luxury-gold)] tracking-[0.4em] uppercase text-xs font-semibold block mb-4">Research & Intelligence</span>
          <h1 className="text-5xl md:text-6xl font-serif text-[var(--color-luxury-pearl)] font-light mb-6">Market Insights</h1>
          <p className="text-white/60 max-w-xl mx-auto">Expert analysis, investment data, and authoritative guides on West Pune&apos;s ultra-luxury real estate market.</p>
        </div>

        {/* Featured Article */}
        <div className="mb-16">
          <Link href={`/${FEATURED_ARTICLES[0].slug}`} className="group block glass-panel rounded-3xl overflow-hidden border border-white/10 hover:border-[var(--color-luxury-gold)]/40 transition-all duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="relative h-64 md:h-auto bg-gradient-to-br from-amber-900/60 to-yellow-900/40 flex items-center justify-center overflow-hidden">
                <Image src="/assets/actual_master_layout.jpg" alt={FEATURED_ARTICLES[0].title} fill className="object-cover opacity-50 group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[var(--color-luxury-charcoal)] hidden md:block" />
              </div>
              <div className="p-10 md:p-14 flex flex-col justify-center">
                <span className="text-[var(--color-luxury-gold)] text-xs tracking-widest uppercase mb-3 font-bold">{FEATURED_ARTICLES[0].badge} · Featured</span>
                <h2 className="text-2xl md:text-3xl font-serif text-[var(--color-luxury-pearl)] mb-4 group-hover:text-[var(--color-luxury-gold)] transition-colors">{FEATURED_ARTICLES[0].title}</h2>
                <p className="text-white/60 leading-relaxed mb-6">{FEATURED_ARTICLES[0].excerpt}</p>
                <span className="text-xs text-white/40 uppercase tracking-wider">{FEATURED_ARTICLES[0].readTime} read · {FEATURED_ARTICLES[0].category}</span>
              </div>
            </div>
          </Link>
        </div>

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {FEATURED_ARTICLES.slice(1).map((article, i) => (
            <Link key={i} href={`/${article.slug}`} className="group glass-panel p-8 rounded-2xl border border-white/10 hover:border-[var(--color-luxury-gold)]/40 transition-all duration-300 hover:bg-white/5 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[var(--color-luxury-gold)] text-xs tracking-widest uppercase font-bold">{article.badge}</span>
                <span className="text-white/30 text-xs">{article.readTime} read</span>
              </div>
              <h2 className="text-xl font-serif text-[var(--color-luxury-pearl)] mb-3 group-hover:text-[var(--color-luxury-gold)] transition-colors flex-1">{article.title}</h2>
              <p className="text-white/55 text-sm leading-relaxed mb-4">{article.excerpt}</p>
              <span className="text-xs text-white/30 uppercase tracking-wider mt-auto">{article.category}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
