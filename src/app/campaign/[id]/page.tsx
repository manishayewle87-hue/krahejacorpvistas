import Image from 'next/image';
import { Suspense } from 'react';
import ContactForm from '@/components/ui/ContactFormInline'; // I will create an inline version of the form

export default function CampaignPage({ params }: { params: { id: string } }) {

  // Typical campaigns: "google-search-baner", "meta-remarketing-pune"
  const campaignName = params.id.replace(/-/g, ' ');

  return (
    <div className="is-campaign min-h-screen bg-[var(--color-luxury-charcoal)] flex flex-col md:flex-row">
      
      {/* Left Split: Hero Visual & Copy */}
      <div className="w-full md:w-1/2 h-[50vh] md:h-screen relative overflow-hidden flex flex-col justify-between p-10 z-10">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/assets/hero-masterpiece.jpg" 
            alt="K Raheja Vistas Mahalunge" 
            fill
            priority
            className="object-cover opacity-60 mix-blend-overlay"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
        </div>
        
        <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-serif text-[var(--color-luxury-pearl)] mb-4">
            VISTAS<span className="text-[var(--color-luxury-gold)] block italic text-3xl md:text-5xl">Mahalunge</span>
          </h1>
          <span className="text-white/60 uppercase tracking-widest text-xs font-semibold">Special Preview: {campaignName}</span>
        </div>

        <div className="relative z-10">
          <h2 className="text-2xl md:text-4xl text-white font-light leading-tight mb-6">
            The Last 7.5-Acre Masterpiece at Baner Annex.
          </h2>
          <ul className="space-y-4 mb-8">
            <li className="flex items-center text-white/80 gap-3">
              <span className="w-2 h-2 rounded-full bg-[var(--color-luxury-gold)]" /> 75% Open Landscaped Spaces
            </li>
            <li className="flex items-center text-white/80 gap-3">
              <span className="w-2 h-2 rounded-full bg-[var(--color-luxury-gold)]" /> Ultra-Premium Deck Residences
            </li>
            <li className="flex items-center text-white/80 gap-3">
              <span className="w-2 h-2 rounded-full bg-[var(--color-luxury-gold)]" /> Expected 15-20% YoY Appreciation
            </li>
          </ul>
        </div>
      </div>

      {/* Right Split: Hard Conversion Form */}
      <div className="w-full md:w-1/2 bg-[var(--color-luxury-pearl)] h-auto md:h-screen flex items-center justify-center p-8 md:p-16">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl">
          <div className="mb-8">
            <h3 className="text-2xl font-serif text-[var(--color-luxury-charcoal)] mb-2">Download Brochure & Pricing</h3>
            <p className="text-sm text-gray-500">Register to instantly receive floor plans, RERA details, and launch offers.</p>
          </div>
          <Suspense fallback={<div className="h-40 w-full animate-pulse bg-gray-200 rounded"></div>}>
            <ContactForm />
          </Suspense>
        </div>
      </div>

    </div>
  );
}
