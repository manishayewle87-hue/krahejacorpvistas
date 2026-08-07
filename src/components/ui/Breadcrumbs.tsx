import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href: string;
}

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  // Generate JSON-LD for Google Rich Snippets
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": item.href === '/' ? "https://www.krahejacorpvistas.com/" : `https://www.krahejacorpvistas.com${item.href}`
    }))
  };

  return (
    <>
      <script
        id={`breadcrumb-schema-${items[items.length - 1]?.label || 'home'}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className="py-4">
        <ol className="flex items-center space-x-2 text-xs md:text-sm text-white/50 flex-wrap gap-y-2">
          {items.map((item, index) => (
            <li key={item.href} className="flex items-center space-x-2">
              {index > 0 && <ChevronRight className="w-3 h-3 text-white/30" />}
              {index === items.length - 1 ? (
                <span className="text-white/80 font-medium" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className="hover:text-[var(--color-luxury-gold)] transition-colors">
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
