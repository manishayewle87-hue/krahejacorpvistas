'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const amenities = [
  {
    title: 'Twin Clubhouses',
    description: 'An architectural marvel featuring a temperature-controlled infinity pool, private theater, and a holistic spa.',
    image: '/assets/clubhouse.jpg'
  },
  {
    title: 'Sky Lounges',
    description: 'Exclusive 25th-floor observatory decks offering panoramic views of the Baner hills and city skyline.',
    image: '/assets/features.jpg'
  },
  {
    title: 'Sports Arena',
    description: 'Championship-grade tennis courts, indoor squash, and a fully equipped gymnasium.',
    image: '/assets/actual-clubhouse.jpg'
  },
  {
    title: 'Zen Wellness Zone',
    description: 'Dedicated yoga pavilions, reflexology paths, and lush meditation gardens spread across acres.',
    image: '/assets/living_room.jpg'
  }
];

const specifications = [
  'Imported Italian Marble Flooring in Living & Dining',
  'Advanced Smart Home Automation (Lighting & Climate)',
  'Floor-to-Ceiling Soundproof Double-Glazed Windows',
  'Designer Modular Kitchen with Hob & Chimney',
  '5-Tier Security System with Biometric Access',
  'Premium Grohe/Kohler CP Fittings & Sanitaryware',
  'VRV Air Conditioning Pre-installed',
  'Private Expansive Decks with Glass Railings'
];

export default function Amenities() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'end start'],
  });

  // Horizontal scroll transform based on vertical scroll
  const x = useTransform(scrollYProgress, [0.2, 0.8], ['10%', '-50%']);

  return (
    <section className="bg-black py-32 overflow-hidden border-t border-white/5">
      {/* Amenities Horizontal Scroll */}
      <div ref={targetRef} className="h-[200vh] relative">
        <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
          <div className="container mx-auto px-6 mb-12">
             <span className="text-[var(--color-luxury-gold)] tracking-[0.4em] uppercase text-xs md:text-sm font-semibold mb-4 block">
              Curated Lifestyle
            </span>
            <h2 className="text-4xl md:text-6xl font-serif text-[var(--color-luxury-pearl)] mb-6">
              World-Class Amenities
            </h2>
          </div>
          
          <motion.div style={{ x }} className="flex gap-8 px-6 w-max">
            {amenities.map((item, i) => (
              <div 
                key={i} 
                className="w-[85vw] md:w-[600px] h-[500px] relative group overflow-hidden rounded-xl border border-white/10 shrink-0"
              >
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-700 z-10" />
                <motion.img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute bottom-0 left-0 w-full p-10 z-20 bg-gradient-to-t from-black via-black/80 to-transparent">
                  <h3 className="text-2xl font-serif text-white mb-3">{item.title}</h3>
                  <p className="text-white/70 leading-relaxed max-w-md">{item.description}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Specifications Grid */}
      <div className="container mx-auto px-6 pt-32 mt-32 border-t border-white/10">
        <div className="text-center mb-20">
          <span className="text-[var(--color-luxury-gold)] tracking-[0.4em] uppercase text-xs md:text-sm font-semibold mb-4 block">
            The Finer Details
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-[var(--color-luxury-pearl)]">
            Ultra-Luxury Specifications
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {specifications.map((spec, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ scale: 1.05, borderColor: 'rgba(212, 175, 55, 0.5)' }}
              className="bg-white/5 border border-white/10 p-8 rounded-xl flex items-start gap-4 transition-all cursor-default"
            >
              <CheckCircle2 className="w-6 h-6 text-[var(--color-luxury-gold)] shrink-0 mt-1" />
              <p className="text-white/80 leading-relaxed font-medium">{spec}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
