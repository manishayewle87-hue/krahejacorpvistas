import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mahalunge Neighborhood & Connectivity | K Raheja Vistas',
  description: 'Explore the strategic location of K Raheja Vistas in Mahalunge. Unprecedented access to Hinjewadi IT Park, premium healthcare, and Metro Line 3.',
  alternates: {
    canonical: 'https://www.krahejacorpvistas.com/neighborhood',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
