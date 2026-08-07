import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import seoDatabase from '@/data/seo-database.json';

type Props = {
  params: Promise<{ group: string }>;
};

const db: Record<string, { h1: string }> = seoDatabase;

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const group = params.group.toLowerCase();
  
  return {
    title: `Directory Category: ${group.toUpperCase()} | K Raheja Vistas`,
    description: `Browse all K Raheja Vistas real estate listings and insights starting with ${group.toUpperCase()}`,
    alternates: {
      canonical: `https://www.krahejacorpvistas.com/directory/${group}`,
    }
  };
}

export function generateStaticParams() {
  const alphabet = Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i));
  const groups = ['0-9', ...alphabet];
  
  return groups.map((group) => ({
    group,
  }));
}

export default async function DirectoryGroupPage(props: Props) {
  const params = await props.params;
  const group = params.group.toLowerCase();
  
  // Validate group
  const isValidGroup = group === '0-9' || /^[a-z]$/.test(group);
  if (!isValidGroup) {
    notFound();
  }

  // Filter links for this group and strictly cap at 3000 to prevent Vercel ISR limit crashes
  const allKeys = Object.keys(db);
  const links = allKeys.filter((key) => {
    if (group === '0-9') {
      return /^[0-9]/.test(key);
    }
    return key.startsWith(group);
  }).slice(0, 3000);

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Directory', href: '/directory' },
    { label: group.toUpperCase(), href: `/directory/${group}` }
  ];

  return (
    <div className="min-h-screen bg-[var(--color-luxury-charcoal)] pt-32 pb-24">
      <div className="container mx-auto px-6 max-w-7xl">
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="mb-16">
          <h1 className="text-4xl md:text-6xl font-serif text-[var(--color-luxury-pearl)] mb-6 font-light">
            Category: {group.toUpperCase()}
          </h1>
          <p className="text-lg text-white/70">
            Showing {links.length} properties and insights.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {links.map((slug) => (
            <Link
              key={slug}
              href={`/${slug}`}
              className="p-4 bg-black/40 border border-white/5 rounded-lg hover:border-[var(--color-luxury-gold)] hover:bg-white/5 transition-all duration-300"
            >
              <h3 className="text-[var(--color-luxury-pearl)] text-sm font-medium line-clamp-2">
                {db[slug]?.h1 || slug}
              </h3>
              <p className="text-xs text-[var(--color-luxury-gold)] mt-2 font-semibold tracking-widest uppercase">
                View Details →
              </p>
            </Link>
          ))}
          
          {links.length === 0 && (
            <p className="text-white/50 col-span-full">No listings found in this category.</p>
          )}
        </div>
      </div>
    </div>
  );
}
