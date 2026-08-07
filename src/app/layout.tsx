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
    default: "K Raheja Vistas Mahalunge | Ultra-Luxury Real Estate",
    template: "%s | K Raheja Vistas Mahalunge"
  },
  description: "Experience premium deck residences surrounded by panoramic foothills and thoughtfully designed luxury living at Baner Annex, Pune. A 7.5-acre masterpiece.",
  keywords: ["Luxury Apartments Baner", "K Raheja Vistas", "Premium Deck Residences Pune", "Mahalunge Real Estate", "2 BHK Baner", "3 BHK Baner"],
  alternates: {
    canonical: '/',
    languages: {
      'en-IN': '/',
      'x-default': '/',
    }
  },
  openGraph: {
    title: "K Raheja Vistas Mahalunge",
    description: "Ultra-luxury 2 & 3 BHK premium deck residences at Baner Annex.",
    url: DOMAIN,
    siteName: "K Raheja Vistas Mahalunge",
    images: [
      {
        url: "/assets/banner.jpg",
        width: 1200,
        height: 630,
        alt: "K Raheja Vistas Mahalunge Hero",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "K Raheja Vistas Mahalunge",
    description: "Ultra-luxury 2 & 3 BHK premium deck residences at Baner Annex.",
    images: ["/assets/banner.jpg"],
  },
};

export const viewport = {
  maximumScale: 5,
  userScalable: true,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["RealEstateAgent", "LocalBusiness", "Organization"],
  "name": "K Raheja Vistas Mahalunge Pune",
  "legalName": "K Raheja Corp",
  "image": `${DOMAIN}/assets/logo.png`,
  "@id": DOMAIN,
  "url": DOMAIN,
  "telephone": "+91-1234567890",
  "foundingDate": "1956",
  "description": "K Raheja Vistas Mahalunge is an ultra-luxury gated residential community by K Raheja Corp in Baner Annexe, Mahalunge, West Pune. It spans 7.5 acres with 7 towers, 650 premium deck residences, twin clubhouses and 75% open spaces. MahaRERA: PR1260002501530.",
  "hasMap": "https://www.google.com/maps/place/Raheja+Vistas,+Baner+Annex/data=!4m2!3m1!1s0x0:0x31853fa95ad0ea42?sa=X&ved=1t:2428&ictx=111",
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
    "capital appreciation Baner",
    "rental yields Hinjewadi"
  ],
  "parentOrganization": {
    "@type": "Organization",
    "name": "K Raheja Corp",
    "url": "https://www.krahejacorpvistas.com",
    "logo": "https://www.krahejacorpvistas.com/assets/logo.png",
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
    "latitude": 18.5721,
    "longitude": 73.7432
  },
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

const videoLd = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "K Raheja Vistas Mahalunge Tour",
  "description": "Virtual tour of the premium deck residences at K Raheja Vistas Mahalunge, Pune.",
  "thumbnailUrl": `${DOMAIN}/assets/video-thumb.jpg`,
  "uploadDate": "2024-01-01T08:00:00+08:00",
  "contentUrl": `${DOMAIN}/assets/video.mp4`
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
        {/* GA4 / GTM Integration */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX" strategy="afterInteractive" />
        <Script
          id="ga4-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX', { page_path: window.location.pathname });
            `,
          }}
        />
        {/* Behavioral Analytics / Heatmapping (PostHog) */}
        <Script
          id="posthog-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures getActiveMatchingSurveys getSurveys onSessionId".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
              posthog.init('phc_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',{api_host:'https://app.posthog.com', capture_pageview: false});
            `,
          }}
        />
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
