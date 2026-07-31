'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const locationHighlights = [
  { name: 'Hinjewadi IT Park', distance: 'Approx 1.5 km (5 mins drive)' },
  { name: 'Global Indian International School', distance: 'Close Proximity' },
  { name: 'Mumbai-Pune Expressway', distance: 'Direct Access' },
  { name: 'Proposed Metro Line 3', distance: 'Upcoming Seamless Connectivity' },
  { name: 'Balewadi High Street', distance: '12 Minutes Drive' },
];

export default function LocationPage() {
  return (
    <div className="bg-[var(--color-luxury-pearl)] min-h-screen">
      {/* Header */}
      <section className="pt-40 pb-20 px-6 text-center">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[var(--color-luxury-gold)] tracking-[0.3em] uppercase text-sm font-semibold mb-6 block"
        >
          Connectivity
        </motion.span>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-7xl font-serif text-[var(--color-luxury-charcoal)] mb-8"
        >
          The Heart of West Pune
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="max-w-2xl mx-auto text-lg text-[var(--color-luxury-charcoal)]/90 font-medium leading-relaxed"
        >
          Baner Annex and Mahalunge offer the perfect balance—away from the chaos, yet exceptionally connected to Pune&apos;s thriving IT hubs and social infrastructure.
        </motion.p>
      </section>

      {/* Connectivity Grid */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            <div className="lg:col-span-5 z-10">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white p-10 md:p-14 shadow-2xl rounded-2xl relative -mr-0 lg:-mr-20 border border-gray-100"
              >
                <span className="text-[var(--color-luxury-gold)] tracking-widest uppercase text-xs font-bold mb-4 block">Proximity Index</span>
                <h2 className="text-3xl md:text-4xl font-serif text-[var(--color-luxury-charcoal)] mb-6">Strategic Advantage</h2>
                <p className="text-gray-800 font-medium mb-8 leading-relaxed">
                  Positioned perfectly between the Baner business district and the Hinjewadi IT hub, K Raheja Vistas is the primary choice for IT professionals. The upcoming Metro Line 3 will exponentially increase the location&apos;s value over the next 5 years.
                </p>
                
                <div className="space-y-6">
                  {locationHighlights.map((item, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex justify-between items-center border-b border-gray-100 pb-4"
                    >
                      <span className="font-medium text-[var(--color-luxury-charcoal)]">{item.name}</span>
                      <span className="text-sm font-semibold text-[var(--color-luxury-gold)] text-right">{item.distance}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative rounded-2xl overflow-hidden shadow-2xl h-[500px] md:h-[700px]"
              >
                <Image 
                  src="/assets/map.jpg" 
                  alt="Connectivity Map Mahalunge" 
                  fill
                  className="object-cover"
                />
              </motion.div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
