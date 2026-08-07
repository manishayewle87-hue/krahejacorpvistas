import Link from 'next/link';
import MagneticButton from '@/components/ui/MagneticButton';
import { Compass } from 'lucide-react';

export default function NotFound() {
  const pillars = [
    { title: "Property Directory Silo", href: "/directory" },
    { title: "Location & Connectivity", href: "/location/baner-annexe-pune" },
    { title: "Luxury Configurations", href: "/configurations/luxury-apartments-mahalunge" },
    { title: "Curated Lifestyle", href: "/lifestyle/ultra-luxury-living-pune" },
    { title: "Investment Potential", href: "/investment/real-estate-investment-baner-annexe" },
    { title: "Project Comparisons", href: "/compare/best-projects-in-mahalunge" }
  ];

  return (
    <div className="min-h-screen bg-[var(--color-luxury-charcoal)] flex flex-col items-center justify-center relative overflow-hidden text-center px-6">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--color-luxury-gold)] rounded-full mix-blend-screen filter blur-[100px] animate-pulse" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto">
        <Compass className="w-20 h-20 text-[var(--color-luxury-gold)] mx-auto mb-8 animate-spin-slow opacity-80" />
        
        <h1 className="text-4xl md:text-6xl font-serif text-[var(--color-luxury-pearl)] mb-6">
          The Path Not Found
        </h1>
        
        <p className="text-white/60 text-lg md:text-xl leading-relaxed mb-12">
          The exclusive page you are looking for has been moved or does not exist. However, the journey to unparalleled luxury continues. Explore our master collections below:
        </p>

        {/* Link Equity Recovery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16 text-left">
          {pillars.map((pillar, index) => (
            <Link
              key={index}
              href={pillar.href}
              className="group p-6 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[var(--color-luxury-gold)]/50 rounded-xl transition-all duration-300"
            >
              <h3 className="text-[var(--color-luxury-gold)] font-medium mb-1 group-hover:translate-x-2 transition-transform">
                Explore {pillar.title} →
              </h3>
            </Link>
          ))}
        </div>

        <MagneticButton>
          <Link
            href="/"
            className="px-10 py-4 bg-[var(--color-luxury-gold)] text-[var(--color-luxury-charcoal)] uppercase tracking-widest font-bold text-sm inline-block"
          >
            Return to Homepage
          </Link>
        </MagneticButton>

      </div>
    </div>
  );
}
