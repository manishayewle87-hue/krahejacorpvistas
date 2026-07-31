import Image from 'next/image';

interface DynamicGalleryProps {
  slug: string;
  title: string;
}

export default function DynamicGallery({ slug, title }: DynamicGalleryProps) {
  // Determine which images to load based on URL intent
  let images = [];
  const lowerSlug = slug.toLowerCase();

  if (lowerSlug.includes('bhk') || lowerSlug.includes('duplex') || lowerSlug.includes('simplex') || lowerSlug.includes('penthouse') || lowerSlug.includes('apartment') || lowerSlug.includes('configuration')) {
    images = [
      { src: '/assets/actual_3bhk_floorplan.jpg', alt: `Actual Floorplan layout for ${title}` },
      { src: '/assets/living_room.jpg', alt: `Ultra-Premium Living Room interior for ${title}` }
    ];
  } else if (lowerSlug.includes('clubhouse') || lowerSlug.includes('lifestyle') || lowerSlug.includes('amenities')) {
    images = [
      { src: '/assets/actual_clubhouse.jpg', alt: `Grand Clubhouse and Amenities for ${title}` },
      { src: '/assets/actual_master_layout.jpg', alt: `7.5 Acre Master Layout for ${title}` }
    ];
  } else if (lowerSlug.includes('location') || lowerSlug.includes('hinjewadi') || lowerSlug.includes('baner')) {
    images = [
      { src: '/assets/actual_master_layout.jpg', alt: `Strategic Location Map and Layout for ${title}` },
      { src: '/assets/actual_clubhouse.jpg', alt: `Resort-style Living at ${title}` }
    ];
  } else {
    // Fallback default gallery
    images = [
      { src: '/assets/actual_master_layout.jpg', alt: `Masterpiece Layout for ${title}` },
      { src: '/assets/living_room.jpg', alt: `Premium Residences at ${title}` }
    ];
  }

  return (
    <div className="my-16">
      <h3 className="text-3xl font-serif text-[var(--color-luxury-pearl)] mb-8 text-center">
        Curated Gallery
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {images.map((img, idx) => (
          <div key={idx} className="relative w-full aspect-[4/3] rounded-xl overflow-hidden group border border-white/10 shadow-2xl">
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Elegant hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-luxury-charcoal)] via-transparent to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-500" />
            <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
              <p className="text-[var(--color-luxury-gold)] text-sm tracking-widest uppercase font-bold drop-shadow-md">
                K Raheja Vistas
              </p>
              <p className="text-white text-lg font-serif drop-shadow-md">
                {img.alt.split(' for')[0]}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
