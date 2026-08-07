import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Construction Updates | K Raheja Vistas Mahalunge',
  description: 'Latest construction progress, milestones, and development updates for K Raheja Vistas Mahalunge in West Pune.',
  alternates: {
    canonical: 'https://www.krahejacorpvistas.com/updates',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
