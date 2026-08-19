import { headers } from 'next/headers';
import { Metadata } from 'next';
import Hero from '@/components/home/Hero';
import ProjectHighlights from '@/components/home/ProjectHighlights';
import Amenities from '@/components/home/Amenities';
import AeoFaqBlock from '@/components/seo/AeoFaqBlock';

export const metadata: Metadata = {
  title: "K Raheja Vistas Mahalunge | Ultra-Luxury 2, 3 & 4 BHK Deck Homes in Pune",
  description: "Discover K Raheja Vistas Mahalunge — 7.5-acre ultra-luxury deck residences at Baner Annexe, Pune by K Raheja Corp. 2, 3 & 4 BHK starting ₹1.10 Cr. MahaRERA: PR1260002501530. Get official price & brochure.",
  keywords: [
    "K Raheja Vistas Mahalunge",
    "K Raheja Vistas price",
    "K Raheja Vistas floor plan",
    "flats in Mahalunge Pune",
    "luxury apartments Baner Pune",
    "2 BHK Baner Annex",
    "3 BHK luxury deck apartments Pune",
    "4 BHK duplex Mahalunge",
    "K Raheja Vistas vs Godrej Hillside",
    "invest in Pune real estate from Dubai",
    "MahaRERA PR1260002501530",
    "K Raheja Corp Pune",
    "luxury apartments Hinjewadi",
    "deck residences West Pune"
  ],
  alternates: {
    canonical: 'https://www.krahejacorpvistas.com/',
    languages: {
      'en-IN': 'https://www.krahejacorpvistas.com/',
      'en': 'https://www.krahejacorpvistas.com/',
      'en-AE': 'https://www.krahejacorpvistas.com/nri/invest-in-pune-real-estate-from-dubai',
      'en-GB': 'https://www.krahejacorpvistas.com/nri/luxury-homes-pune-for-nri-uk',
      'en-SG': 'https://www.krahejacorpvistas.com/nri/best-nri-investment-pune-singapore',
      'en-US': 'https://www.krahejacorpvistas.com/nri/pune-real-estate-investment-for-nri-usa',
      'x-default': 'https://www.krahejacorpvistas.com/',
    },
  },
  openGraph: {
    title: "K Raheja Vistas Mahalunge | Ultra-Luxury 2, 3 & 4 BHK Deck Homes in Pune",
    description: "Discover K Raheja Vistas Mahalunge — 7.5-acre ultra-luxury deck residences at Baner Annex, Pune by K Raheja Corp. MahaRERA: PR1260002501530.",
    url: 'https://www.krahejacorpvistas.com/',
    siteName: "K Raheja Vistas Mahalunge",
    images: [
      {
        url: "/assets/banner.jpg",
        width: 1200,
        height: 630,
        alt: "K Raheja Vistas Mahalunge — Luxury Deck Residences Baner Annex Pune",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "K Raheja Vistas Mahalunge | Ultra-Luxury 2, 3 & 4 BHK Deck Homes in Pune",
    description: "Discover K Raheja Vistas Mahalunge — 7.5-acre ultra-luxury deck residences at Baner Annex, Pune by K Raheja Corp. MahaRERA: PR1260002501530.",
    images: ["/assets/banner.jpg"],
  },
};

export const revalidate = 86400; // 24 hours ISR edge cache

export default async function Home() {
  const headersList = await headers();
  const city = headersList.get('x-user-city') || 'Unknown';
  
  // Edge Personalization Logic
  let headline = "A 7.5-acre masterpiece at Baner Annex. Discover ultra-premium deck residences designed for those who command the extraordinary.";
  
  if (city.toLowerCase() === 'mumbai') {
    headline = "Mumbai's smartest investment: A 7.5-acre masterpiece at Baner Annex. Secure elite capital appreciation with ultra-premium deck residences.";
  } else if (city.toLowerCase() === 'pune') {
    headline = "Upgrade your Pune lifestyle: A 7.5-acre masterpiece at Baner Annex. Discover ultra-premium deck residences right next to the IT hub.";
  }

  return (
    <>
      <Hero personalizedHeadline={headline} />
      <ProjectHighlights />
      <Amenities />
      <AeoFaqBlock keyword="K Raheja Vistas Mahalunge" />
    </>
  );
}
