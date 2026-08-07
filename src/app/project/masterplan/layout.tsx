import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '7.5-Acre Master Plan | K Raheja Vistas Mahalunge',
  description: 'Explore the 7.5-acre master layout of K Raheja Vistas. 75% open spaces, manicured landscapes, and premium residential towers.',
  alternates: {
    canonical: 'https://www.krahejacorpvistas.com/project/masterplan',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
