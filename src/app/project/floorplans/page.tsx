'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BedDouble, Bath, Maximize } from 'lucide-react';
import EmiCalculator from '@/components/ui/EmiCalculator';
import Image from 'next/image';

const floorPlans = [
  { id: 1, type: '2bhk', name: '2 BHK Premium Deck', carpet: '750 sq.ft.', desc: 'Perfectly balanced spaces with expansive decks and premium fittings.' },
  { id: 2, type: '3bhk', name: '3 BHK Ultra Luxury', carpet: '1150 sq.ft.', desc: 'Spacious 3-bedroom residences offering panoramic foothill views.' },
  { id: 3, type: '4bhk', name: '3 & 4 BHK Duplex', carpet: '1850 sq.ft.', desc: 'The Crown Jewel. Double-height ceilings and bespoke luxury layouts.' },
];

const floorplanSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "K Raheja Vistas Luxury Residences",
  "image": "https://krahejavistasmahalunge.com/assets/banner.jpg",
  "description": "Ultra-luxury 2, 3, and 4 BHK premium deck residences in Mahalunge, West Pune.",
  "sku": "KRV-PUNE-RES",
  "offers": {
    "@type": "AggregateOffer",
    "url": "https://krahejavistasmahalunge.com/project/floorplans",
    "priceCurrency": "INR",
    "lowPrice": "11000000",
    "highPrice": "25000000",
    "offerCount": "3"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "312"
  }
};

export default function FloorPlansPage() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredPlans = floorPlans.filter(plan => activeFilter === 'all' || plan.type === activeFilter);

  return (
    <div className="bg-[var(--color-luxury-pearl)] min-h-screen">
      <script id="floorplan-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(floorplanSchema) }} />
      <section className="pt-40 pb-20 px-6 text-center">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[var(--color-luxury-gold)] tracking-[0.3em] uppercase text-sm font-semibold mb-6 block"
        >
          Residences
        </motion.span>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-7xl font-serif text-[var(--color-luxury-charcoal)] mb-8"
        >
          Exclusive Floor Plans
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="max-w-2xl mx-auto text-lg text-[var(--color-luxury-charcoal)]/70 leading-relaxed mb-12"
        >
          Explore bespoke 2, 3, and 4 BHK configurations tailored for the global elite. Each residence maximizes natural light, cross-ventilation, and privacy.
        </motion.p>

        {/* Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {[
            { label: 'All Configurations', value: 'all' },
            { label: '2 BHK', value: '2bhk' },
            { label: '3 BHK', value: '3bhk' },
            { label: '3 & 4 BHK Duplex', value: '4bhk' },
          ].map((filter) => (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className={`px-6 py-2 rounded-full border transition-all ${
                activeFilter === filter.value 
                  ? 'bg-[var(--color-luxury-gold)] border-[var(--color-luxury-gold)] text-white' 
                  : 'bg-transparent border-gray-300 text-[var(--color-luxury-charcoal)] hover:border-[var(--color-luxury-gold)] hover:text-[var(--color-luxury-gold)]'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </motion.div>

        {/* Layout Grid */}
        <div className="container mx-auto">
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <AnimatePresence>
              {filteredPlans.map((plan) => (
                <motion.div
                  key={plan.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden text-left border border-gray-100 group"
                >
                  <div className="h-64 bg-gray-100 overflow-hidden relative">
                    <Image 
                      src="/assets/actual-floorplan.jpg" 
                      alt={plan.name} 
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 mix-blend-multiply" 
                    />
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-serif text-[var(--color-luxury-charcoal)] mb-2">{plan.name}</h3>
                    <p className="text-[var(--color-luxury-gold)] font-semibold text-sm tracking-widest uppercase mb-4">{plan.carpet}</p>
                    <p className="text-gray-600 leading-relaxed mb-8">{plan.desc}</p>
                    <button className="w-full py-3 border border-[var(--color-luxury-gold)] text-[var(--color-luxury-charcoal)] hover:bg-[var(--color-luxury-gold)] hover:text-white transition-colors uppercase text-xs font-bold tracking-widest">
                      Request Pricing
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* EMI Calculator Widget */}
      <EmiCalculator />
    </div>
  );
}
