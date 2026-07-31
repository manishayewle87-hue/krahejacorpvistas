import GalleryGrid from '@/components/gallery/GalleryGrid';

export const metadata = {
  title: 'Gallery | K Raheja Vistas Mahalunge',
  description: 'Explore the high-resolution architectural renders and lifestyle photography of the exclusive K Raheja Vistas Mahalunge.',
};

export default function GalleryPage() {
  return (
    <div className="bg-[var(--color-luxury-pearl)] min-h-screen pt-40 pb-20 px-6">
      <div className="container mx-auto">
        <section className="text-center mb-20 max-w-3xl mx-auto">
          <span className="text-[var(--color-luxury-gold)] tracking-[0.3em] uppercase text-sm font-semibold mb-6 block">
            Visual Experience
          </span>
          <h1 className="text-5xl md:text-7xl font-serif text-[var(--color-luxury-charcoal)] mb-8">
            Curated Lifestyle.
          </h1>
          <p className="text-lg text-[var(--color-luxury-charcoal)]/70 leading-relaxed font-light">
            Immerse yourself in the architectural brilliance and breathtaking landscapes of West Pune&apos;s most exclusive luxury enclave.
          </p>
        </section>

        <GalleryGrid />
      </div>
    </div>
  );
}
