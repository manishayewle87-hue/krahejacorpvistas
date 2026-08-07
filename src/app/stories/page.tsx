import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'K Raheja Vistas — Visual Stories | Mahalunge Baner Pune',
  description: 'Explore immersive visual stories of K Raheja Vistas Mahalunge — luxury living, 3 BHK deck residences, investment insights and West Pune real estate market.',
};

const stories = [
  {
    id: 'lifestyle-day',
    title: 'A Day at K Raheja Vistas',
    category: 'LIFESTYLE',
    coverColor: 'from-amber-900 to-yellow-900',
    emoji: '☀️',
    slides: [
      { headline: 'Rise above the ordinary.', body: 'Mornings at K Raheja Vistas begin with panoramic views of the Baner Hills from your private deck.' },
      { headline: '75% Open Spaces.', body: 'Step out to 2.65 acres of curated gardens, water features and manicured lawns — all yours.' },
      { headline: 'Twin World-Class Clubhouses.', body: 'A temperature-controlled pool, gymnasium and wellness zones await within your gated community.' },
      { headline: 'Home by sunset.', body: 'Just 4.5km from Hinjewadi IT Park. Live where Pune\'s elite have chosen to call home.' },
    ]
  },
  {
    id: '3bhk-tour',
    title: '3 BHK Deck Residence — Full Tour',
    category: 'CONFIGURATION',
    coverColor: 'from-slate-900 to-zinc-800',
    emoji: '🏠',
    slides: [
      { headline: 'The 3 BHK Deck Residence.', body: 'Over 1,400 sq ft of thoughtfully designed ultra-luxury living space. Starting from ₹1.45 Cr.' },
      { headline: 'Private Deck Living.', body: 'Every 3 BHK features an expansive private deck — an extension of your living room into the open sky.' },
      { headline: 'Crafted Interiors.', body: 'Premium marble flooring, modular kitchens and smart home automation pre-installed.' },
      { headline: 'MahaRERA Registered.', body: 'PR1260002501530. Complete transparency and buyer protection guaranteed.' },
    ]
  },
  {
    id: 'investment-insight',
    title: 'Why Mahalunge is Pune\'s #1 Investment Zone',
    category: 'INVESTMENT',
    coverColor: 'from-emerald-900 to-teal-900',
    emoji: '📈',
    slides: [
      { headline: 'West Pune: India\'s fastest-growing micro-market.', body: 'Mahalunge has seen 18% YoY appreciation — 3x the national average for tier-1 cities.' },
      { headline: 'Hinjewadi IT Corridor.', body: 'Home to 300,000+ IT professionals and 200+ MNCs. Rental demand here never dips.' },
      { headline: 'Metro Line 3 is Coming.', body: 'The upcoming Pune Metro Phase 3 will connect Mahalunge to central Pune, multiplying property values.' },
      { headline: 'Buy Now. The Clock is Ticking.', body: 'Only 650 ultra-premium units available. Inventory is being absorbed rapidly. Enquire today.' },
    ]
  }
];

// Web Stories Schema for Google Discover
const webStoriesSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "K Raheja Vistas Mahalunge — Visual Stories",
  "description": "Immersive visual stories about luxury living, property configurations, and real estate investment insights at K Raheja Vistas Mahalunge, Baner Annexe, Pune.",
  "itemListElement": stories.map((s, i) => ({
    "@type": "ListItem",
    "position": i + 1,
    "name": s.title,
    "url": `https://www.krahejacorpvistas.com/stories#${s.id}`
  }))
};

export default function StoriesPage() {
  return (
    <div className="min-h-screen bg-[var(--color-luxury-charcoal)] pt-32 pb-20 px-6">
      <Script id="web-stories-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webStoriesSchema) }} />

      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <span className="text-[var(--color-luxury-gold)] tracking-[0.4em] uppercase text-xs font-semibold block mb-4">Visual Stories</span>
          <h1 className="text-5xl md:text-6xl font-serif text-[var(--color-luxury-pearl)] font-light mb-6">
            Discover Vistas
          </h1>
          <p className="text-white/60 max-w-xl mx-auto">
            Swipe through immersive stories about luxury living, investment potential, and the life that awaits you at K Raheja Vistas Mahalunge.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stories.map((story) => (
            <div key={story.id} id={story.id} className="group relative rounded-3xl overflow-hidden cursor-pointer shadow-2xl border border-white/10 hover:border-[var(--color-luxury-gold)]/40 transition-all duration-500 hover:scale-[1.02]">
              {/* Cover */}
              <div className={`relative h-[520px] bg-gradient-to-b ${story.coverColor} flex flex-col justify-between p-8`}>
                <div className="flex justify-between items-start">
                  <span className="text-[10px] text-white/60 tracking-[0.3em] uppercase font-bold bg-white/10 px-3 py-1 rounded-full">{story.category}</span>
                  <span className="text-3xl">{story.emoji}</span>
                </div>

                {/* Story Slides Preview */}
                <div className="space-y-4">
                  {story.slides.map((slide, i) => (
                    <div key={i} className={`transition-all duration-300 ${i === 0 ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'} ${i > 1 ? 'hidden' : ''}`}>
                      {i === 0 && (
                        <>
                          <h2 className="text-2xl font-serif text-white leading-tight">{slide.headline}</h2>
                          <p className="text-white/70 text-sm leading-relaxed mt-2">{slide.body}</p>
                        </>
                      )}
                    </div>
                  ))}
                </div>

                {/* Story title + progress dots */}
                <div>
                  <div className="flex gap-1 mb-4">
                    {story.slides.map((_, i) => (
                      <div key={i} className={`h-0.5 flex-1 rounded-full ${i === 0 ? 'bg-[var(--color-luxury-gold)]' : 'bg-white/30'}`} />
                    ))}
                  </div>
                  <h3 className="text-lg font-serif text-white font-medium">{story.title}</h3>
                  <p className="text-white/50 text-xs mt-1">{story.slides.length} slides · K Raheja Vistas</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link href="/" className="inline-block px-10 py-4 bg-[var(--color-luxury-gold)] text-[var(--color-luxury-charcoal)] font-bold uppercase tracking-widest text-sm hover:bg-white transition-colors">
            Explore the Project
          </Link>
        </div>
      </div>
    </div>
  );
}
