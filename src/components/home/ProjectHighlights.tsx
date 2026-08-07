'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import CinematicText from '@/components/ui/CinematicText';

const highlights = [
  { label: 'Total Land Parcel', value: '7.5 Acres' },
  { label: 'Premium Towers', value: '7 Towers' },
  { label: 'Elevation', value: 'G+2P+25 Floors' },
  { label: 'Open Green Space', value: '75%' },
];

export default function ProjectHighlights() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ['-15%', '15%']);

  return (
    <section ref={containerRef} className="py-24 md:py-40 bg-[var(--color-luxury-charcoal)] text-[var(--color-luxury-pearl)] relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--color-luxury-gold)]/50 to-transparent opacity-50" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          >
            <span className="text-[var(--color-luxury-gold)] tracking-[0.4em] uppercase text-xs md:text-sm font-semibold mb-8 block drop-shadow-md">
              The K Raheja Corp Legacy
            </span>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif leading-tight mb-12 tracking-tight">
              A Private Enclave,<br/> <span className="italic text-[var(--color-luxury-gold)]">Not a Mass Township.</span>
            </h2>
            
            <CinematicText 
              text="Unlike the densely packed 100+ acre townships in the vicinity, K Raheja Vistas Mahalunge is a masterclass in exclusivity. With only 7 towers spread across 7.5 premium acres, experience an unprecedented blend of ultra-luxury connectivity, absolute privacy, and true capital appreciation. Discover premium 2, 3 & 4 BHK deck residences located just minutes from the Hinjewadi IT Park and Balewadi High Street." 
              className="text-white/90 text-xl leading-relaxed mb-16 font-normal max-w-lg"
            />
            
            <div className="grid grid-cols-2 gap-10">
              {highlights.map((highlight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="border-l-2 border-[var(--color-luxury-gold)] pl-6"
                >
                  <p className="text-3xl md:text-4xl font-serif text-[var(--color-luxury-gold)] mb-3">{highlight.value}</p>
                  <p className="text-xs md:text-sm uppercase tracking-widest text-white/70 font-semibold">{highlight.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="relative h-[800px] w-full rounded-2xl overflow-hidden shadow-2xl group border border-white/10"
          >
            <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-all duration-1000 z-10" />
            <motion.img 
              style={{ y: imgY }}
              src="/assets/features.jpg" 
              alt="Luxury Amenities" 
              className="w-full h-[130%] object-cover group-hover:scale-105 transition-transform duration-1000 origin-top"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
