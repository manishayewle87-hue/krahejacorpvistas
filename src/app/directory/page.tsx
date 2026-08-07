import Link from 'next/link';
import { Metadata } from 'next';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Real Estate Directory | K Raheja Vistas Mahalunge',
  description: 'Explore our comprehensive directory of premium real estate, luxury apartments, and configurations in West Pune.',
  alternates: {
    canonical: 'https://www.krahejacorpvistas.com/directory',
  },
};

export default function DirectoryHubPage() {
  const alphabet = Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i));
  const numbers = ['0-9'];
  const groups = [...numbers, ...alphabet];

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Directory', href: '/directory' }
  ];

  return (
    <div className="min-h-screen bg-[var(--color-luxury-charcoal)] pt-32 pb-24">
      <div className="container mx-auto px-6 max-w-7xl">
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="mb-16">
          <h1 className="text-4xl md:text-6xl font-serif text-[var(--color-luxury-pearl)] mb-6 font-light">
            Property Directory
          </h1>
          <p className="text-lg text-white/70 max-w-3xl">
            Explore our comprehensive index of real estate configurations, micro-markets, and luxury insights in West Pune. Select a category below to browse available properties and insights.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-4">
          {groups.map((group) => (
            <Link
              key={group}
              href={`/directory/${group}`}
              className="flex items-center justify-center h-20 bg-black/40 border border-white/10 rounded-xl hover:border-[var(--color-luxury-gold)] hover:bg-white/5 transition-all duration-300 group"
            >
              <span className="text-2xl font-serif text-white/80 group-hover:text-[var(--color-luxury-gold)] uppercase">
                {group}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
