'use client';
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { motion } from 'framer-motion';
import Masterplan3D from '@/components/ui/Masterplan3D';



export default function MasterPlanPage() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Master Plan", href: "/project/masterplan" }
  ];

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
        <Breadcrumbs items={breadcrumbs} />

          <Masterplan3D />
        </div>
      </section>
    </div>
  );
}
