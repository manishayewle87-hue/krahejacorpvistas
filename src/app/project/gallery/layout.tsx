import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Project Gallery & Show Flat | K Raheja Vistas Mahalunge',
  description: 'Take a visual tour of K Raheja Vistas. View high-resolution images of the show flat, amenities, and architectural elevations.',
  alternates: {
    canonical: 'https://www.krahejacorpvistas.com/project/gallery',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
