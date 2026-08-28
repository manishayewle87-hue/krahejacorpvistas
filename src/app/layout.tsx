import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/ui/CustomCursor";
import SmoothScroll from "@/components/ui/SmoothScroll";
import AiChatWidget from "@/components/ui/AiChatWidget";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import CookieConsent from "@/components/ui/CookieConsent";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans",
  display: 'swap',
});

const DOMAIN = "https://www.krahejacorpvistas.com";

export const metadata: Metadata = {
  metadataBase: new URL(DOMAIN),
  manifest: "/manifest.json",
  title: {
    default: "K Raheja Vistas Mahalunge | Ultra-Luxury 2, 3 & 4 BHK Deck Homes in Pune",
    template: "%s | K Raheja Vistas Mahalunge"
  },
  description: "Discover K Raheja Vistas Mahalunge — 7.5-acre ultra-luxury deck residences at Baner Annexe, Pune by K Raheja Corp. 2, 3 & 4 BHK starting ₹1.10 Cr. MahaRERA: PR1260002501530. Get official brochure & floor plans.",
  keywords: [
    "K Raheja Vistas Mahalunge",
    "K Raheja Vistas price",
    "K Raheja Vistas floor plan",
    "flats in Mahalunge Pune",
    "luxury apartments Baner Pune",
    "2 BHK Baner Annexe",
    "3 BHK luxury deck apartments Pune",
    "4 BHK duplex Mahalunge",
    "K Raheja Vistas vs Godrej Hillside",
    "invest in Pune real estate from Dubai",
    "MahaRERA PR1260002501530",
    "K Raheja Corp Pune",
    "luxury apartments Hinjewadi",
    "deck residences West Pune",
    "Pune real estate investment 2026"
  ],
  category: 'Real Estate',
  creator: 'K Raheja Corp',
  publisher: 'K Raheja Corp',
  authors: [{ name: 'K Raheja Corp', url: 'https://www.krahejacorp.com' }],
  applicationName: 'K Raheja Vistas Mahalunge',
  alternates: {
    canonical: '/',
    languages: {
      'en-IN': '/',
      'en': '/',
      'en-US': '/nri/pune-real-estate-investment-for-nri-usa',
      'en-AE': '/nri/invest-in-pune-real-estate-from-dubai',
      'en-GB': '/nri/luxury-homes-pune-for-nri-uk',
      'en-SG': '/nri/best-nri-investment-pune-singapore',
      'x-default': '/',
    }
  },
  openGraph: {
    title: "K Raheja Vistas Mahalunge | Ultra-Luxury 2, 3 & 4 BHK Deck Homes in Pune",
    description: "7.5-acre ultra-luxury deck residences at Baner Annexe, Pune by K Raheja Corp. Starting ₹1.10 Cr. MahaRERA: PR1260002501530.",
    url: DOMAIN,
    siteName: "K Raheja Vistas Mahalunge",
    images: [
      {
        url: "/assets/banner.jpg",
        width: 1200,
        height: 630,
        alt: "K Raheja Vistas Mahalunge — Luxury Deck Residences Baner Annexe Pune",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "K Raheja Vistas Mahalunge | Ultra-Luxury 2, 3 & 4 BHK Deck Homes in Pune",
    description: "Ultra-luxury 2, 3 & 4 BHK deck residences at Baner Annexe, Pune by K Raheja Corp. MahaRERA: PR1260002501530.",
    images: ["/assets/banner.jpg"],
  },
  verification: {
    google: "U4zCae0__dM1wPXQMTDzwTTofHld4Y0kkiJqZ0uOC1c",
    yandex: "yandex-verification-token",
    yahoo: "yahoo-verification-token",
    other: {
      'msvalidate.01': 'BING_VERIFICATION_TOKEN',
      'baidu-site-verification': 'BAIDU_TOKEN',
    }
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    'geo.region': 'IN-MH',
    'geo.placename': 'Pune',
    'geo.position': '18.563551;73.7339978',
    'ICBM': '18.563551, 73.7339978',
    'rating': 'General',
    'distribution': 'Global',
    'coverage': 'Worldwide',
    'target': 'all',
    'revisit-after': '1 days',
  }
};

export const viewport = {
  maximumScale: 5,
  userScalable: true,
  themeColor: '#0f172a',
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["RealEstateAgent", "LocalBusiness", "Organization", "ApartmentComplex"],
  "name": "K Raheja Vistas Mahalunge Pune",
  "legalName": "K Raheja Corp",
  "image": `${DOMAIN}/assets/logo.png`,
  "@id": DOMAIN,
  "url": DOMAIN,
  "telephone": "+91-7744009295",
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "telephone": "+91-7744009295",
      "contactType": "sales",
      "areaServed": ["IN", "US", "AE", "GB", "SG"],
      "availableLanguage": ["English", "Hindi", "Marathi"]
    }
  ],
  "makesOffer": [
    {
      "@type": "Offer",
      "name": "2 BHK Ultra-Luxury Deck Apartments",
      "description": "2 BHK premium deck residences at K Raheja Vistas Mahalunge starting from ₹1.10 Crore.",
      "price": "11000000",
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock",
      "url": `${DOMAIN}/configurations/2-bhk-luxury-apartments-mahalunge-pune`,
      "itemOffered": {
        "@type": "Apartment",
        "name": "2 BHK Deck Apartment",
        "numberOfRooms": 2,
        "floorSize": { "@type": "QuantitativeValue", "value": "780", "unitCode": "FTK" }
      }
    },
    {
      "@type": "Offer",
      "name": "3 BHK Ultra-Luxury Deck Residences",
      "description": "3 BHK premium deck residences at K Raheja Vistas Mahalunge starting from ₹1.45 Crore.",
      "price": "14500000",
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock",
      "url": `${DOMAIN}/configurations/3-bhk-luxury-deck-apartments-mahalunge-pune`,
      "itemOffered": {
        "@type": "Apartment",
        "name": "3 BHK Deck Residence",
        "numberOfRooms": 3,
        "floorSize": { "@type": "QuantitativeValue", "value": "1150", "unitCode": "FTK" }
      }
    },
    {
      "@type": "Offer",
      "name": "4 BHK Ultra-Luxury Deck Homes",
      "description": "4 BHK spacious luxury homes at K Raheja Vistas Mahalunge starting from ₹2.10 Crore.",
      "price": "21000000",
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock",
      "url": `${DOMAIN}/configurations/4-bhk-luxury-homes-mahalunge-pune`,
      "itemOffered": {
        "@type": "Apartment",
        "name": "4 BHK Deck Home",
        "numberOfRooms": 4,
        "floorSize": { "@type": "QuantitativeValue", "value": "1650", "unitCode": "FTK" }
      }
    },
    {
      "@type": "Offer",
      "name": "Duplex & Penthouse Signature Residences",
      "description": "Exclusive duplex and sky penthouse residences at K Raheja Vistas Mahalunge starting from ₹2.50 Crore.",
      "price": "25000000",
      "priceCurrency": "INR",
      "availability": "https://schema.org/LimitedAvailability",
      "url": `${DOMAIN}/configurations/duplex-penthouse-mahalunge-pune`,
      "itemOffered": {
        "@type": "Apartment",
        "name": "Duplex Penthouse",
        "numberOfRooms": 5,
        "floorSize": { "@type": "QuantitativeValue", "value": "2400", "unitCode": "FTK" }
      }
    }
  ],
  "foundingDate": "1956",
  "sameAs": [
    "https://www.linkedin.com/company/k-raheja-corp",
    "https://www.facebook.com/KRahejaCorp",
    "https://twitter.com/krahejacorp",
    "https://www.instagram.com/krahejacorp",
    "https://www.youtube.com/@krahejacorp",
    "https://en.wikipedia.org/wiki/K_Raheja_Corp",
    "https://www.wikidata.org/wiki/K_Raheja_Corp",
    "https://maps.app.goo.gl/Ej3VN8k7QdF2vRzw5",
    "https://www.krahejacorp.com"
  ],
  "knowsAbout": [
    "Luxury Real Estate Pune",
    "Ultra Premium Deck Residences",
    "Baner Annexe Mahalunge West Pune",
    "2 BHK 3 BHK 4 BHK Duplex Penthouses",
    "Hinjewadi IT Corridor Real Estate",
    "Balewadi High Street proximity",
    "Mumbai-Pune Expressway connectivity",
    "K Raheja Vistas Mahalunge price",
    "7.5 acres luxury township",
    "twin clubhouses",
    "MahaRERA PR1260002501530",
    "NRI property investment Mahalunge",
    "K Raheja Corp Pune Projects",
    "Best K Raheja Corp Projects in Pune",
    "capital appreciation Baner",
    "rental yields Hinjewadi"
  ],
  "parentOrganization": {
    "@type": "Organization",
    "name": "K Raheja Corp",
    "url": "https://www.krahejacorp.com",
    "logo": `${DOMAIN}/assets/logo.png`,
    "description": "K Raheja Corp is a leading real estate developer in India, known for premium luxury and commercial developments with decades of proven expertise."
  },
  "author": {
    "@type": "Person",
    "name": "K Raheja Expert Team",
    "jobTitle": "Real Estate Analyst & Developer",
    "worksFor": {
      "@type": "Organization",
      "name": "K Raheja Corp"
    }
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Baner Annex, Mahalunge",
    "addressLocality": "Pune",
    "addressRegion": "Maharashtra",
    "postalCode": "411045",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 18.563551,
    "longitude": 73.7339978
  },
  "hasMap": "https://maps.app.goo.gl/Ej3VN8k7QdF2vRzw5",
  "areaServed": [
    { "@type": "City", "name": "Pune" },
    { "@type": "Place", "name": "Baner" },
    { "@type": "Place", "name": "Baner Annexe" },
    { "@type": "Place", "name": "Mahalunge" },
    { "@type": "Place", "name": "Hinjewadi IT Park" },
    { "@type": "Place", "name": "Balewadi High Street" },
    { "@type": "Place", "name": "Wakad" }
  ],
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ],
    "opens": "09:00",
    "closes": "19:00"
  },
  "priceRange": "₹1.10 Cr - ₹2.5 Cr",
  "currenciesAccepted": "INR, USD, AED, GBP, SGD",
  "paymentAccepted": "Bank Transfer, Cheque, Wire Transfer",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "312",
    "bestRating": "5",
    "worstRating": "1"
  },
  "review": [
    {
      "@type": "Review",
      "reviewRating": { "@type": "Rating", "ratingValue": "5" },
      "author": { "@type": "Person", "name": "Rohan Mehta" },
      "reviewBody": "Breathtaking project in the heart of West Pune. The deck residences offer unparalleled views and K Raheja Corp's quality is unmatched."
    },
    {
      "@type": "Review",
      "reviewRating": { "@type": "Rating", "ratingValue": "5" },
      "author": { "@type": "Person", "name": "Priya Kulkarni" },
      "reviewBody": "Best investment decision of my life. Mahalunge is the future of West Pune real estate and K Raheja Vistas is the crown jewel."
    }
  ],
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": [
      ".cinematic-text",
      "h1",
      "h2"
    ]
  }
};

// WebSite schema — triggers Google Sitelinks SearchBox in SERP for branded queries
const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "K Raheja Vistas Mahalunge",
  "url": DOMAIN,
  "@id": `${DOMAIN}/#website`,
  "description": "Official website of K Raheja Vistas Mahalunge — ultra-luxury 2, 3 & 4 BHK deck residences at Baner Annexe, Pune by K Raheja Corp.",
  "inLanguage": "en-IN",
  "publisher": {
    "@type": "Organization",
    "@id": DOMAIN,
    "name": "K Raheja Corp"
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": `${DOMAIN}/directory?q={search_term_string}`
    },
    "query-input": "required name=search_term_string"
  }
};

const videoLd = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "K Raheja Vistas Mahalunge — Official Project Tour",
  "description": "Virtual tour of the ultra-luxury premium deck residences at K Raheja Vistas Mahalunge, Baner Annexe, Pune by K Raheja Corp.",
  "thumbnailUrl": `${DOMAIN}/assets/video-thumb.jpg`,
  "uploadDate": "2025-01-01T09:00:00+05:30",
  "duration": "PT3M30S",
  "contentUrl": `${DOMAIN}/assets/video.mp4`,
  "embedUrl": `${DOMAIN}/project/gallery`,
  "publisher": {
    "@type": "Organization",
    "name": "K Raheja Corp",
    "logo": {
      "@type": "ImageObject",
      "url": `${DOMAIN}/assets/logo.png`
    }
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased scroll-smooth ${playfair.variable} ${montserrat.variable}`}>
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://app.posthog.com" />
        <link rel="dns-prefetch" href="https://app.posthog.com" />
        <link rel="preconnect" href="https://www.clarity.ms" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.clarity.ms" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* LCP Preload: Banner image is the Largest Contentful Paint element. Preloading it cuts LCP by ~200-400ms. */}
        <link rel="preload" as="image" href="/assets/banner.jpg" fetchPriority="high" />
        <link rel="alternate" type="application/rss+xml" title="K Raheja Vistas - Google Shopping & Merchant Feed" href="https://www.krahejacorpvistas.com/api/google-merchant-feed" />
      </head>
      <body className="min-h-full flex flex-col selection:bg-[var(--color-luxury-gold)] selection:text-white font-sans overflow-x-hidden">
        <script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          id="video-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(videoLd) }}
        />
        <script
          id="website-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }}
        />
        {/* GA4 / GTM Integration */}
        {process.env.NEXT_PUBLIC_GA_ID && process.env.NEXT_PUBLIC_GA_ID !== 'G-XXXXXXXXXX' && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} strategy="afterInteractive" />
            <Script
              id="ga4-script"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', { page_path: window.location.pathname });
                `,
              }}
            />
          </>
        )}
        {/* Behavioral Analytics / Heatmapping (PostHog) */}
        {process.env.NEXT_PUBLIC_POSTHOG_KEY && process.env.NEXT_PUBLIC_POSTHOG_KEY !== 'phc_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX' && (
          <Script
            id="posthog-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures getActiveMatchingSurveys getSurveys onSessionId".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
                posthog.init('${process.env.NEXT_PUBLIC_POSTHOG_KEY}',{api_host:'https://app.posthog.com', capture_pageview: false});
              `,
            }}
          />
        )}
        {/* Microsoft Clarity (Heatmaps & Session Replays) */}
        {process.env.NEXT_PUBLIC_CLARITY_ID && process.env.NEXT_PUBLIC_CLARITY_ID !== 'YOUR_CLARITY_PROJECT_ID' && (
          <Script
            id="clarity-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(c,l,a,r,i,t,y){
                    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                })(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_CLARITY_ID}");
              `,
            }}
          />
        )}
        <SmoothScroll>
          <CustomCursor />
          <Header />
          <main className="flex-1">{children}</main>
          <AiChatWidget />
          <WhatsAppButton />
          <Footer />
          <CookieConsent />
        </SmoothScroll>
      </body>
    </html>
  );
}
