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

  const ogUrl = `https://krahejavistasmahalunge.com/api/og?title=${encodeURIComponent(data.h1)}&category=${encodeURIComponent(data.category)}`;

  return {
    title: data.title,
    description: data.description,
    alternates: {
      canonical: `https://krahejavistasmahalunge.com/${slugKey}`,
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

export default async function ProgrammaticLandingPage(props: Props) {
  const params = await props.params;
  const slugKey = params.slug.join('/');
  const data = db[slugKey];

  if (!data) {
    notFound();
    return null; // TypeScript narrowing
  }
  
  const isArticle = data.category === 'blog';
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: data.category.replace('_', ' '), href: '#' },
    { label: data.h1, href: `/${slugKey}` }
  ];

  return (
    <div className="bg-[var(--color-luxury-charcoal)] min-h-screen">
      
      {/* Cinematic Hero Header */}
      <div className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/living_room.jpg"
            alt={`Luxury Living at K Raheja Vistas — ${data.h1}`}
            fill
            priority={true}
            className="object-cover opacity-40 scale-105 animate-[kenburns_20s_ease-out_infinite_alternate]"
            sizes="100vw"
          />
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
                  "url": `https://krahejavistasmahalunge.com/${slugKey}`,
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
                      "image": "https://krahejavistasmahalunge.com/assets/logo.png"
                    }
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
                    "image": "https://krahejavistasmahalunge.com/assets/actual_3bhk_floorplan.jpg",
                    "brand": { "@type": "Brand", "name": "K Raheja Corp" },
                    "offers": {
                      "@type": "Offer",
                      "price": "11000000",
                      "priceCurrency": "INR",
                      "availability": "https://schema.org/InStock",
                      "url": `https://krahejavistasmahalunge.com/${slugKey}`
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
                    "image": "https://krahejavistasmahalunge.com/assets/actual_master_layout.jpg",
                    "datePublished": new Date().toISOString(),
                    "dateModified": new Date().toISOString(),
                    "author": {
                      "@type": "Organization",
                      "name": "K Raheja Corp",
                      "url": "https://krahejavistasmahalunge.com"
                    },
                    "publisher": {
                      "@type": "Organization",
                      "name": "K Raheja Vistas Market Insights",
                      "logo": {
                        "@type": "ImageObject",
                        "url": "https://krahejavistasmahalunge.com/assets/logo.png"
                      }
                    },
                    "mainEntityOfPage": {
                      "@type": "WebPage",
                      "@id": `https://krahejavistasmahalunge.com/${slugKey}`
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
              {/* Semantic LSI Content Injection */}
              <div 
                className="mb-12 prose prose-invert max-w-none prose-p:text-lg prose-p:text-white/80 prose-headings:font-serif prose-headings:font-light"
                dangerouslySetInnerHTML={{ __html: data.content || `<p>${data.description}</p>` }} 
              />
              
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
        
        <InternalLinkingGrid currentSlug={slugKey} />

      </div>
    </div>
  );
}
