import Link from 'next/link';

export default function KeywordMesh() {
  const keywordCategories = [
    {
      category: "K Raheja Vistas Mahalunge — Core Project & Developer Authority",
      keywords: [
        { text: "K Raheja Vistas Mahalunge", href: "/" },
        { text: "K Raheja Corp Pune Projects", href: "/" },
        { text: "K Raheja Vistas Baner Annexe", href: "/project/location" },
        { text: "Raheja Vistas Mahalunge Price List", href: "/project/floorplans" },
        { text: "K Raheja Vistas Brochure PDF", href: "/k-raheja-vistas-brochure" },
        { text: "K Raheja Vistas Floor Plans", href: "/project/floorplans" },
        { text: "K Raheja Vistas Sample Flat Walkthrough", href: "/project/gallery" },
        { text: "K Raheja Vistas Construction Status 2026", href: "/updates" },
        { text: "K Raheja Vistas MahaRERA PR1260002501530", href: "/project/masterplan" },
        { text: "K Raheja Vistas Possession Date", href: "/project/location" },
        { text: "Raheja Properties in Pune", href: "/directory" },
      ]
    },
    {
      category: "Luxury Configurations & Residences",
      keywords: [
        { text: "2 BHK Premium Deck Residences (780 sq.ft.)", href: "/project/floorplans?type=2bhk" },
        { text: "3 BHK Ultra-Luxury Apartments Mahalunge", href: "/project/floorplans?type=3bhk" },
        { text: "4 BHK Palatial Homes & Duplexes Pune", href: "/project/floorplans?type=4bhk" },
        { text: "Signature Sky Penthouses Baner Annexe", href: "/project/floorplans" },
        { text: "Private Deck Apartments in Pune", href: "/project/amenities" },
        { text: "Luxury Flats with Balcony Pune West", href: "/project/gallery" },
        { text: "Vastu Compliant Homes Mahalunge", href: "/project/floorplans" }
      ]
    },
    {
      category: "Pune West Micro-Markets & IT Corridor Connectivity",
      keywords: [
        { text: "Luxury Flats near Hinjewadi Phase 1 IT Park", href: "/neighborhood" },
        { text: "Flats near Balewadi High Street", href: "/neighborhood" },
        { text: "Residential Projects near Mumbai-Pune Expressway", href: "/project/location" },
        { text: "Properties in Baner-Mahalunge Smart City", href: "/neighborhood" },
        { text: "Luxury Apartments near Wakad Junction", href: "/neighborhood" },
        { text: "Gated Community Projects in West Pune", href: "/project/amenities" },
        { text: "Flats near Aundh & Baner Pune", href: "/neighborhood" },
        { text: "Metro Line 3 Hinjewadi Connectivity", href: "/project/location" }
      ]
    },
    {
      category: "Project Comparisons & High-Intent Investment Insights",
      keywords: [
        { text: "K Raheja Vistas vs Godrej Hillside Mahalunge", href: "/compare/k-raheja-vistas-vs-godrej-hillside-mahalunge" },
        { text: "K Raheja Vistas vs Rohan Harita Baner", href: "/compare/k-raheja-vistas-vs-rohan-harita-baner" },
        { text: "K Raheja Vistas vs Kolte Patil Baner", href: "/compare/k-raheja-vistas-vs-kolte-patil-baner" },
        { text: "Best Real Estate Investment in Pune 2026", href: "/insights" },
        { text: "NRI Real Estate Investment Pune", href: "/nri/invest-in-pune-real-estate-from-dubai" },
        { text: "Mahalunge High Rental Yield & Appreciation", href: "/insights" },
        { text: "Top Rated Luxury Projects in Pune", href: "/directory" }
      ]
    }
  ];

  return (
    <div className="w-full bg-[#0a0a0a] py-12 border-t border-white/10 text-white/80">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-white/10 pb-6">
          <div>
            <h4 className="text-[var(--color-luxury-gold)] text-sm uppercase tracking-[0.25em] font-semibold">
              K Raheja Corp Pune Ecosystem &amp; Micro-Market Index
            </h4>
            <p className="text-white/50 text-xs mt-1">
              Official authority directory for K Raheja Vistas Mahalunge, Baner Annexe &amp; Pune West premium real estate.
            </p>
          </div>
          <div className="text-xs text-white/40 font-mono">
            MahaRERA: <span className="text-[var(--color-luxury-gold)] font-bold">PR1260002501530</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {keywordCategories.map((group, gIdx) => (
            <div key={gIdx} className="space-y-3">
              <h5 className="text-[var(--color-luxury-pearl)] text-xs uppercase tracking-wider font-semibold border-b border-white/5 pb-2">
                {group.category}
              </h5>
              <ul className="space-y-2">
                {group.keywords.map((kw, kIdx) => (
                  <li key={kIdx}>
                    <Link
                      href={kw.href}
                      className="text-[11px] text-white/50 hover:text-[var(--color-luxury-gold)] transition-colors block leading-relaxed"
                      title={kw.text}
                    >
                      {kw.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-white/40">
          <p className="max-w-4xl leading-relaxed">
            <strong className="text-white/60">About K Raheja Vistas Mahalunge:</strong> Developed by India&apos;s premier luxury developer K Raheja Corp, K Raheja Vistas spans 7.5 pristine acres at Baner Annexe, Mahalunge, West Pune. Featuring 7 high-rise residential towers with 2, 3, and 4 BHK deck residences, 75% landscaped open spaces, twin grand clubhouses, and unmatched 5-minute connectivity to Hinjewadi Phase 1 and Balewadi High Street.
          </p>
          <div className="shrink-0">
            <Link 
              href="/directory" 
              className="text-[var(--color-luxury-gold)] hover:underline text-xs uppercase tracking-widest font-semibold inline-flex items-center gap-1"
            >
              Browse Full SEO Index →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
