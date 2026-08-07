import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '2, 3 & 4 BHK Luxury Floor Plans | K Raheja Vistas Pune',
  description: 'View exclusive floor plans for premium 2 BHK, 3 BHK, and duplex deck residences at K Raheja Vistas Mahalunge.',
  alternates: {
    canonical: 'https://www.krahejacorpvistas.com/project/floorplans',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
