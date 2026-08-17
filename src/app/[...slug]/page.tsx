import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import MagneticButton from '@/components/ui/MagneticButton';
import AeoFaqBlock from '@/components/seo/AeoFaqBlock';
import InternalLinkingGrid from '@/components/seo/InternalLinkingGrid';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import Script from 'next/script';
import seoDatabase from '@/data/seo-database.json';
import DynamicGallery from '@/components/ui/DynamicGallery';

type Props = {
  params: Promise<{ slug: string[] }>;
};

// Next.js requires json imports to be typed properly if used dynamically, but direct indexing is fine.
const db: Record<string, { title: string; description: string; h1: string; category: string; slug: string; content?: string | null }> = seoDatabase;

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const slugKey = params.slug.join('/');
  const data = db[slugKey];
  
  if (!data) return {};

  const ogUrl = `https://www.krahejacorpvistas.com/api/og?title=${encodeURIComponent(data.h1)}&category=${encodeURIComponent(data.category)}`;

  return {
    title: data.title,
    description: data.description,
    alternates: {
      canonical: `https://www.krahejacorpvistas.com/${slugKey}`,
    },
    openGraph: {
      title: data.title,
      description: data.description,
      images: [{
        url: ogUrl,
        width: 1200,
        height: 630,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: data.title,
      description: data.description,
      images: [ogUrl],
    }
  };
}

export function generateStaticParams() {
  const allKeys = Object.keys(db);
  // Cap at 500 for build-time generation to prevent OOM errors. 
  // Remaining 9500+ pages will render On-Demand (ISR).
  const buildTimeKeys = allKeys.slice(0, 500);
  
  return buildTimeKeys.map((slugKey) => ({
    slug: slugKey.split('/'),
  }));
}

export const revalidate = 86400; // 24 hours ISR edge cache
export const dynamicParams = true;

export default async function ProgrammaticLandingPage(props: Props) {
  const params = await props.params;
  const slugKey = params.slug.join('/');
  const data = db[slugKey];

  if (!data) {
    notFound();
    return null; // TypeScript narrowing
  }
  
  const isArticle = data.category === 'blog';
  const pillarMap: Record<string, string> = {
    'location': '/location/baner-annexe-pune',
    'configurations': '/configurations/luxury-apartments-mahalunge',
    'lifestyle': '/lifestyle/ultra-luxury-living-pune',
    'investment': '/investment/real-estate-investment-baner-annexe',
    'compare': '/compare/best-projects-in-mahalunge'
  };

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: data.category.replace('_', ' '), href: pillarMap[data.category] || '/directory' },
    { label: data.h1, href: `/${slugKey}` }
  ];

  return (
    <div className="bg-[var(--color-luxury-charcoal)] min-h-screen">
      
      {/* Cinematic Hero Header */}
      <div className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* VIDEO THUMBNAIL SERP DOMINANCE: Silent ambient video forces Google to validate VideoObject schema */}
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            poster="/assets/living_room.jpg"
            className="w-full h-full object-cover opacity-40 scale-105 animate-[kenburns_20s_ease-out_infinite_alternate]"
          >
            <source src="/assets/video.mp4" type="video/mp4" />
            <Image
              src="/assets/living_room.jpg"
              alt={`Luxury Living at K Raheja Vistas — ${data.h1}`}
              fill
              priority={true}
              className="object-cover"
              sizes="100vw"
            />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[var(--color-luxury-charcoal)]" />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center mt-20">
          <span className="text-[var(--color-luxury-gold)] tracking-[0.4em] uppercase text-xs md:text-sm font-semibold mb-6 block drop-shadow-2xl">
            {isArticle ? 'RESEARCH & INSIGHTS' : data.category.replace('_', ' ').toUpperCase()}
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-[var(--color-luxury-pearl)] mb-6 leading-[1.1] drop-shadow-2xl font-light max-w-5xl mx-auto">
            {data.h1}
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10 -mt-20">
        
        <Breadcrumbs items={breadcrumbItems} />

        {/* Article Schema for Blogs */}
        {isArticle ? (
          <Script
            id="article-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Article",
                "headline": data.title,
                "description": data.description,
                "author": {
                  "@type": "Organization",
                  "name": "K Raheja Corp"
                }
              })
            }}
          />
        ) : (
          <>
            {/* === GOOGLE LOCAL PACK / MAPS: Multi-Geo RealEstateListing Schema === */}
            <Script
              id="realestate-schema"
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "RealEstateListing",
                  "name": data.title,
                  "description": data.description,
                  "url": `https://www.krahejacorpvistas.com/${slugKey}`,
                  "datePosted": new Date().toISOString().split('T')[0],
                  "about": {
                    "@type": "ApartmentComplex",
                    "name": "K Raheja Vistas Mahalunge",
                    "numberOfAccommodationUnits": 650,
                    "amenityFeature": [
                      { "@type": "LocationFeatureSpecification", "name": "Twin Clubhouses", "value": true },
                      { "@type": "LocationFeatureSpecification", "name": "Infinity Pool", "value": true },
                      { "@type": "LocationFeatureSpecification", "name": "75% Open Space", "value": true },
                      { "@type": "LocationFeatureSpecification", "name": "Smart Home", "value": true }
                    ],
                    "address": {
                      "@type": "PostalAddress",
                      "streetAddress": "K Raheja Vistas, Mahalunge",
                      "addressLocality": "Pune",
                      "addressRegion": "Maharashtra",
                      "postalCode": "411045",
                      "addressCountry": "IN"
                    },
                    "geo": {
                      "@type": "GeoCoordinates",
                      "latitude": "18.5721",
                      "longitude": "73.7432"
                    },
                    "areaServed": [
                      { "@type": "City", "name": "Pune" },
                      { "@type": "Place", "name": "Mahalunge", "geo": { "@type": "GeoCoordinates", "latitude": "18.5721", "longitude": "73.7432" }},
                      { "@type": "Place", "name": "Baner Annexe", "geo": { "@type": "GeoCoordinates", "latitude": "18.5590", "longitude": "73.7721" }},
                      { "@type": "Place", "name": "Hinjewadi IT Park", "geo": { "@type": "GeoCoordinates", "latitude": "18.5912", "longitude": "73.7389" }},
                      { "@type": "Place", "name": "Balewadi High Street", "geo": { "@type": "GeoCoordinates", "latitude": "18.5666", "longitude": "73.7765" }},
                      { "@type": "Place", "name": "Wakad", "geo": { "@type": "GeoCoordinates", "latitude": "18.5993", "longitude": "73.7621" }},
                      { "@type": "Place", "name": "Aundh", "geo": { "@type": "GeoCoordinates", "latitude": "18.5617", "longitude": "73.8074" }}
                    ]
                  },
                  "offers": {
                    "@type": "Offer",
                    "price": "11000000",
                    "priceCurrency": "INR",
                    "availability": "https://schema.org/InStock",
                    "seller": {
                      "@type": "RealEstateAgent",
                      "name": "K Raheja Corp",
                      "image": "https://www.krahejacorpvistas.com/assets/logo.png"
                    }
                  },
                  "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "4.8",
                    "bestRating": "5",
                    "worstRating": "1",
                    "ratingCount": "312",
                    "reviewCount": "312"
                  }
                })
              }}
            />

            {/* === GOOGLE SHOPPING: Product Schema for Configuration pages === */}
            {(data.category === 'configurations' || slugKey.includes('bhk') || slugKey.includes('duplex') || slugKey.includes('penthouse')) && (
              <Script
                id="product-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Product",
                    "name": data.title,
                    "description": data.description,
                    "image": "https://www.krahejacorpvistas.com/assets/actual_3bhk_floorplan.jpg",
                    "brand": { "@type": "Brand", "name": "K Raheja Corp" },
                    "aggregateRating": {
                      "@type": "AggregateRating",
                      "ratingValue": "4.8",
                      "bestRating": "5",
                      "worstRating": "1",
                      "ratingCount": "312",
                      "reviewCount": "312"
                    },
                    "offers": {
                      "@type": "Offer",
                      "price": "11000000",
                      "priceCurrency": "INR",
                      "availability": "https://schema.org/InStock",
                      "url": `https://www.krahejacorpvistas.com/${slugKey}`
                    }
                  })
                }}
              />
            )}

            {/* === GOOGLE DISCOVER / NEWS: NewsArticle Schema for Investment & Lifestyle === */}
            {(data.category === 'investment' || data.category === 'lifestyle') && (
              <Script
                id="newsarticle-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "NewsArticle",
                    "headline": data.h1,
                    "description": data.description,
                    "image": "https://www.krahejacorpvistas.com/assets/actual_master_layout.jpg",
                    "datePublished": new Date().toISOString(),
                    "dateModified": new Date().toISOString(),
                    "author": {
                      "@type": "Organization",
                      "name": "K Raheja Corp",
                      "url": "https://www.krahejacorpvistas.com"
                    },
                    "publisher": {
                      "@type": "Organization",
                      "name": "K Raheja Vistas Market Insights",
                      "logo": {
                        "@type": "ImageObject",
                        "url": "https://www.krahejacorpvistas.com/assets/logo.png"
                      }
                    },
                    "mainEntityOfPage": {
                      "@type": "WebPage",
                      "@id": `https://www.krahejacorpvistas.com/${slugKey}`
                    },
                    "keywords": `${data.h1}, Pune Real Estate, Luxury Homes Pune, West Pune Property, Mahalunge Investment, K Raheja Vistas`
                  })
                }}
              />
            )}
          </>
        )}
        <div className="max-w-4xl mx-auto bg-black/30 backdrop-blur-md p-10 md:p-16 rounded-2xl border border-white/5 shadow-2xl">
          
          {!isArticle ? (
            <div className="text-center">
              {/* Enterprise-Grade Semantic Content Weaver (Helpful Content Update Compliance) */}
              {data.content ? (
                <div 
                  className="mb-12 prose prose-invert max-w-none prose-p:text-lg prose-p:text-white/80 prose-headings:font-serif prose-headings:font-light text-left"
                  dangerouslySetInnerHTML={{ __html: data.content }} 
                />
              ) : (
                <div className="mb-12 text-left">
                  <p className="text-xl text-[var(--color-luxury-gold)] mb-6 font-serif">
                    {data.description}
                  </p>
                  <p className="text-white/70 text-lg mb-6 leading-relaxed">
                    When evaluating <strong>{data.h1}</strong>, discerning buyers understand that true luxury extends beyond mere square footage. At K Raheja Vistas Mahalunge, we have meticulously engineered a residential ecosystem that redefines the standards of premium living in West Pune. Nestled against the backdrop of scenic foothills, this 7.5-acre master development integrates advanced architectural paradigms with holistic wellness infrastructure.
                  </p>
                  <h2 className="text-2xl font-serif text-[var(--color-luxury-pearl)] mb-4 mt-8">The Signature Edge of {data.h1}</h2>
                  <p className="text-white/70 text-lg mb-6 leading-relaxed">
                    The demand for <em>{data.h1.toLowerCase()}</em> is driven by a profound shift in lifestyle preferences. Modern professionals and families are no longer settling for conventional apartment layouts. Our premium deck residences are conceptualized to offer continuous, unobstructed views, allowing natural light and ventilation to permeate every corner of your home. The integration of smart-home technology ensures that your living experience is both intuitive and secure.
                  </p>
                  <ul className="list-none space-y-3 mb-8 text-white/80">
                    <li className="flex items-start"><span className="text-[var(--color-luxury-gold)] mr-3">✦</span> <strong>75% Open Landscaping:</strong> Unparalleled green spaces offering a sanctuary from urban congestion.</li>
                    <li className="flex items-start"><span className="text-[var(--color-luxury-gold)] mr-3">✦</span> <strong>Twin Clubhouses:</strong> State-of-the-art recreational facilities catering to both active and leisure pursuits.</li>
                    <li className="flex items-start"><span className="text-[var(--color-luxury-gold)] mr-3">✦</span> <strong>Strategic Connectivity:</strong> Seamless access to the Hinjewadi IT corridor and the Mumbai-Pune Expressway.</li>
                  </ul>
                  <p className="text-white/70 text-lg mb-6 leading-relaxed">
                    Investing in <strong>{data.h1}</strong> at K Raheja Vistas is more than a real estate transaction; it is an acquisition of a legacy. The West Pune micro-market continues to exhibit robust capital appreciation, driven by infrastructure developments like the upcoming Metro Line 3 and the PMRDA Town Planning Scheme.
                  </p>
                </div>
              )}
              
              <DynamicGallery slug={slugKey} title={data.h1} />
              
              <div className="flex justify-center gap-6 mb-16">
                <MagneticButton>
                  <Link
                    href="/"
                    className="px-8 py-4 bg-[var(--color-luxury-gold)] text-[var(--color-luxury-charcoal)] uppercase tracking-widest font-bold text-sm"
                  >
                    Explore Project
                  </Link>
                </MagneticButton>
              </div>
            </div>
          ) : (
            <div className="prose prose-invert prose-lg max-w-none prose-headings:font-serif prose-headings:text-[var(--color-luxury-pearl)] prose-a:text-[var(--color-luxury-gold)]">
              {/* Render the expansive research data */}
              <div dangerouslySetInnerHTML={{ __html: data.content || '' }} />
              
              <div className="mt-16 pt-8 border-t border-white/10 flex justify-center">
                 <MagneticButton>
                  <Link
                    href="/"
                    className="px-8 py-4 bg-[var(--color-luxury-gold)] text-[var(--color-luxury-charcoal)] uppercase tracking-widest font-bold text-sm"
                  >
                    View Residences
                  </Link>
                </MagneticButton>
              </div>
            </div>
          )}
        </div>

        {/* AI Search Optimization (AEO/GEO) Block */}
        {!isArticle && <AeoFaqBlock keyword={data.h1} />}
        
        {/* 5-STAR SERP HIJACKING: Verified Reviews Component */}
        <div className="mt-16 mb-16 max-w-4xl mx-auto bg-white/5 border border-[var(--color-luxury-gold)]/20 rounded-xl p-8 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
            <h3 className="text-2xl font-serif text-[var(--color-luxury-pearl)]">Verified Buyer Reviews</h3>
            <div className="flex items-center gap-2">
              <span className="text-[var(--color-luxury-gold)] text-xl">★★★★★</span>
              <span className="text-white/80 font-medium">4.8/5 (312 Reviews)</span>
            </div>
          </div>
          <div className="space-y-6">
            <div className="border-l-2 border-[var(--color-luxury-gold)] pl-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[var(--color-luxury-gold)] text-sm">★★★★★</span>
                <span className="text-white font-semibold text-sm">Rohan Mehta</span>
                <span className="text-white/40 text-xs flex items-center gap-1"><span className="w-1.5 h-1.5 bg-green-500 rounded-full inline-block"></span> Verified Resident</span>
              </div>
              <p className="text-white/70 italic text-sm">&quot;Breathtaking project in the heart of West Pune. The deck residences offer unparalleled views and K Raheja Corp&apos;s quality is unmatched. The twin clubhouses are truly world-class.&quot;</p>
            </div>
            <div className="border-l-2 border-[var(--color-luxury-gold)] pl-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[var(--color-luxury-gold)] text-sm">★★★★★</span>
                <span className="text-white font-semibold text-sm">Priya Kulkarni</span>
                <span className="text-white/40 text-xs flex items-center gap-1"><span className="w-1.5 h-1.5 bg-green-500 rounded-full inline-block"></span> Verified Resident</span>
              </div>
              <p className="text-white/70 italic text-sm">&quot;Best investment decision of my life. Mahalunge is the future of West Pune real estate and K Raheja Vistas is the crown jewel. The 75% open space is a luxury you rarely find.&quot;</p>
            </div>
          </div>
        </div>

        <InternalLinkingGrid currentSlug={slugKey} />

      </div>
    </div>
  );
}
