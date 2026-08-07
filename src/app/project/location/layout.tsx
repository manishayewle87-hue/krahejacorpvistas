import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Prime Location Map | K Raheja Vistas Baner Annexe',
  description: 'Strategically located in Mahalunge, Baner Annexe. Explore the location map, connectivity, and nearby infrastructure for K Raheja Vistas.',
  alternates: {
    canonical: 'https://www.krahejacorpvistas.com/project/location',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
