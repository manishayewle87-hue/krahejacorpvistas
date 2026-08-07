import Link from 'next/link';
import seoDatabase from '@/data/seo-database.json';

const db: Record<string, { h1: string; category: string }> = seoDatabase;

export default function InternalLinkingGrid({ currentSlug }: { currentSlug: string }) {
  const currentData = db[currentSlug];
  if (!currentData) return null;

  const currentCategory = currentData.category;
  
  // Define the master pillar pages for each Silo
  const pillarMap: Record<string, string> = {
    'location': 'location/baner-annexe-pune',
    'configurations': 'configurations/luxury-apartments-mahalunge',
    'lifestyle': 'lifestyle/ultra-luxury-living-pune',
    'investment': 'investment/real-estate-investment-baner-annexe',
    'compare': 'compare/best-projects-in-mahalunge'
  };

  const pillarSlug = pillarMap[currentCategory];

  // Strictly filter only pages within the exact same Silo
  let siloSlugs = Object.keys(db).filter(
    (s) => db[s].category === currentCategory && s !== currentSlug && s !== pillarSlug
  );

  // Fallback to random if not in a designated advanced silo
  if (siloSlugs.length === 0) {
    siloSlugs = Object.keys(db).filter(s => s !== currentSlug);
  }

  // Deterministic slice
  const seed = currentSlug.length;
  const startIndex = seed % Math.max(1, siloSlugs.length - 11);
  const selectedSlugs = siloSlugs.slice(startIndex, startIndex + 11);

  // Enforce Pillar Page at the very top of the internal links for PageRank consolidation
  if (pillarSlug && pillarSlug !== currentSlug && db[pillarSlug]) {
    selectedSlugs.unshift(pillarSlug);
  }

  return (
    <div className="mt-20 pt-16 border-t border-white/5">
      <h3 className="text-sm uppercase tracking-widest text-[var(--color-luxury-gold)] mb-8 font-semibold">
        Explore More in {currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1)}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-8">
        {selectedSlugs.map((slug, index) => {
          if (!db[slug]) return null;
          const isPillar = slug === pillarSlug;
          return (
            <Link 
              key={slug} 
              href={`/${slug}`}
              className={`transition-colors text-sm truncate ${
                isPillar 
                  ? 'text-white font-bold hover:text-[var(--color-luxury-gold)]' 
                  : 'text-white/60 hover:text-white'
              }`}
            >
              {isPillar ? '★ ' : ''}{db[slug].h1}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
