import { headers } from 'next/headers';
import { Metadata } from 'next';
import Hero from '@/components/home/Hero';
import ProjectHighlights from '@/components/home/ProjectHighlights';
import Amenities from '@/components/home/Amenities';
import AeoFaqBlock from '@/components/seo/AeoFaqBlock';

export const metadata: Metadata = {
  title: "Luxury Apartments in Pune | Premium 2, 3 & 4 BHK Deck Residences",
  description: "Experience ultra-luxury deck residences at K Raheja Vistas in Baner Annexe, Mahalunge. 7.5 acres of premium living with unparalleled connectivity in West Pune.",
  keywords: [
    "Luxury Apartments Pune", "Premium Deck Residences Mahalunge", "2 BHK Baner Annexe", 
    "3 BHK Baner Annexe", "Hinjewadi IT Park real estate"
  ],
  alternates: {
    canonical: 'https://krahejavistasmahalunge.com/',
  }
};

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
      <AeoFaqBlock />
    </>
  );
}
