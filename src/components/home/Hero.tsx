'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';

import MagneticButton from '@/components/ui/MagneticButton';
import ContactModal from '@/components/ui/ContactModal';
import Image from 'next/image';

export default function Hero({ personalizedHeadline = "A 7.5-acre masterpiece at Baner Annex. Discover ultra-premium deck residences designed for those who command the extraordinary." }: { personalizedHeadline?: string }) {
  const ref = useRef(null);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1.3]); // Ken Burns continuous scale

  return (
    <section ref={ref} className="relative h-screen flex items-center justify-center overflow-hidden bg-[var(--color-luxury-charcoal)]">
      {/* Background Parallax & Ken Burns */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div style={{ y, opacity, scale }} className="w-full h-full origin-center relative">
          <Image 
            src="/assets/hero-masterpiece.jpg" 
            alt="K Raheja Vistas Mahalunge" 
            fill
            priority
            fetchPriority="high"
            quality={90}
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>
        {/* Dark Overlay for Text Contrast */}
        <div className="absolute inset-0 bg-black/40 mix-blend-multiply pointer-events-none" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10 text-center flex flex-col items-center pt-20">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 flex flex-col items-center"
        >
          <span className="text-[var(--color-luxury-gold)] tracking-[0.4em] uppercase text-xs md:text-sm font-semibold mb-6 block drop-shadow-lg">
            K Raheja Corp Presents
          </span>
          <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-serif text-[var(--color-luxury-pearl)] leading-[0.9] tracking-tight drop-shadow-2xl font-light">
            VISTAS<span className="text-[var(--color-luxury-gold)] block text-5xl md:text-7xl lg:text-8xl italic mt-2 tracking-normal drop-shadow-xl">Mahalunge</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
          className="text-lg md:text-2xl text-white/90 mb-16 max-w-3xl font-medium tracking-wider leading-relaxed drop-shadow-lg"
        >
          {personalizedHeadline}
          <br /><span className="text-xs text-white/70 uppercase tracking-[0.3em] mt-8 block drop-shadow-md">MahaRERA: PR1260002501530</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto px-4"
        >
          <MagneticButton>
            <button
              onClick={() => setContactModalOpen(true)}
              className="px-10 py-4 bg-[var(--color-luxury-gold)] text-[var(--color-luxury-charcoal)] hover:bg-white transition-all duration-300 tracking-[0.2em] uppercase text-sm font-bold shadow-2xl w-full sm:w-auto"
            >
              Book Private Preview
            </button>
          </MagneticButton>
        </motion.div>
      </div>


      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-white/50 uppercase tracking-widest text-xs">Scroll</span>
        <div className="w-[1px] h-12 bg-white/30 overflow-hidden relative">
          <motion.div
            animate={{ y: [0, 48] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
            className="absolute top-0 left-0 w-full h-1/2 bg-[var(--color-luxury-gold)]"
          />
        </div>
      </motion.div>

      <ContactModal isOpen={contactModalOpen} onClose={() => setContactModalOpen(false)} />
    </section>
  );
}
