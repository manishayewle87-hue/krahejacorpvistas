import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '40+ World-Class Amenities | K Raheja Vistas Mahalunge',
  description: 'Discover a curated lifestyle with 40+ luxury amenities and 28,000 sq ft of twin clubhouses at K Raheja Vistas, Baner Annexe.',
  alternates: {
    canonical: 'https://www.krahejacorpvistas.com/project/amenities',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
