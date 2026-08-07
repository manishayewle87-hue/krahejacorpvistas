import Link from 'next/link';

export default function KeywordMesh() {
  const majorKeywords = [
    { text: "K Raheja Vistas Mahalunge", href: "/" },
    { text: "Luxury Flats in Pune", href: "/project/gallery" },
    { text: "2 BHK Flats in Pune West", href: "/project/floorplans?type=2bhk" },
    { text: "3 BHK Premium Apartments Baner", href: "/project/floorplans?type=3bhk" },
    { text: "4 BHK Duplex Mahalunge", href: "/project/floorplans?type=4bhk" },
    { text: "Deck Residences Pune", href: "/project/amenities" },
    { text: "New Launch Projects in Hinjewadi", href: "/neighborhood" },
    { text: "K Raheja Corp Pune", href: "/" },
    { text: "Properties near Wakad", href: "/neighborhood" },
    { text: "Flats for Sale in Balewadi High Street", href: "/neighborhood" },
    { text: "Luxury Real Estate Pune", href: "/project/gallery" },
    { text: "Under Construction Projects Baner Annex", href: "/updates" },
    { text: "Ready Possession Flats Pune", href: "/project/location" },
    { text: "Investment Properties in Pune", href: "/directory" },
    { text: "Gated Community Flats Pune", href: "/project/amenities" }
  ];

  return (
    <div className="w-full bg-black py-8 border-t border-white/5">
      <div className="container mx-auto px-6">
        <h5 className="text-[var(--color-luxury-gold)] text-xs uppercase tracking-widest font-semibold mb-4 opacity-70">
          Top Searched Micro-Markets
        </h5>
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          {majorKeywords.map((kw, index) => (
            <div key={index} className="flex items-center">
              <Link 
                href={kw.href}
                className="text-[10px] md:text-xs text-white/40 hover:text-[var(--color-luxury-pearl)] transition-colors"
                title={kw.text}
              >
                {kw.text}
              </Link>
              {index !== majorKeywords.length - 1 && (
                <span className="text-white/10 ml-4 text-[10px]">|</span>
              )}
            </div>
          ))}
        </div>
        <p className="text-[9px] text-white/20 mt-6 max-w-4xl leading-relaxed">
          K Raheja Vistas Mahalunge represents the pinnacle of luxury real estate in West Pune. Strategically located near Baner Annex and the Hinjewadi IT Park, this premium residential project offers exquisite 2, 3, and 4 BHK deck residences and duplexes. Experience world-class amenities including twin clubhouses, infinity pools, and 75% open green spaces in Pune&apos;s most sought-after neighborhood.
        </p>
      </div>
    </div>
  );
}
