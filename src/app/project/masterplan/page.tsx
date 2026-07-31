'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Masterplan3D from '@/components/ui/Masterplan3D';

const zones = [
  {
    id: 'tower-a',
    points: '15,20 30,20 30,45 15,45',
    title: 'Tower A: The Crown',
    desc: 'Ultra-luxury 4BHK Duplexes with sweeping views of the Baner Annex skyline.',
  },
  {
    id: 'courtyard',
    points: '35,35 65,35 65,70 35,70',
    title: '2.65-Acre Central Courtyard',
    desc: 'A massive, vehicular-free green lung featuring tropical landscaping and reflexology paths.',
  },
  {
    id: 'clubhouse',
    points: '70,50 85,50 85,80 70,80',
    title: 'The Grand Clubhouse',
    desc: 'A multi-level recreational hub with an infinity pool, fully equipped gymnasium, and alfresco lounge.',
  }
];

export default function MasterPlanPage() {
  const [activeZone, setActiveZone] = useState<string | null>(null);

  const activeZoneData = zones.find(z => z.id === activeZone);

  return (
    <div className="bg-[var(--color-luxury-pearl)] min-h-screen">
      {/* Header */}
      <section className="pt-40 pb-20 px-6 text-center">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[var(--color-luxury-gold)] tracking-[0.3em] uppercase text-sm font-semibold mb-6 block"
        >
          Architecture
        </motion.span>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-7xl font-serif text-[var(--color-luxury-charcoal)] mb-8"
        >
          The Master Layout
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="max-w-2xl mx-auto text-lg text-[var(--color-luxury-charcoal)]/70 leading-relaxed"
        >
          Sprawling across a premium 7.5-acre land parcel, the layout features 7 high-rise towers meticulously arranged to offer 75% open space and unobstructed views.
        </motion.p>
      </section>

      {/* Interactive Map */}
      <section className="py-10 px-6 mb-20">
        <div className="container mx-auto max-w-5xl relative">
          <Masterplan3D />
        </div>
      </section>
    </div>
  );
}
