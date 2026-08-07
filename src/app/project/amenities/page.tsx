'use client';
import Breadcrumbs from "@/components/ui/Breadcrumbs";

import { motion } from 'framer-motion';
import { Activity, Sunrise, Footprints, Trophy, Waves, Users } from 'lucide-react';

const amenities = [
  {
    category: 'Health & Wellness',
    items: [
      { icon: Activity, name: 'Fully Equipped Gymnasium', desc: 'State-of-the-art cardio and weight training equipment with expert trainers.' },
      { icon: Sunrise, name: 'Yoga & Meditation Zone', desc: 'A tranquil, open-air pavilion designed for spiritual and mental well-being.' },
      { icon: Footprints, name: 'Reflexology Path', desc: 'Acu-pressure designed stone pathways nestled within tropical landscaping.' },
    ]
  },
  {
    category: 'Sports & Recreation',
    items: [
      { icon: Waves, name: 'Infinity Edge Pool', desc: 'Temperature-controlled lap pool overlooking the sprawling central courtyard.' },
      { icon: Trophy, name: 'Multi-Purpose Court', desc: 'Professional-grade courts for tennis, basketball, and badminton.' },
      { icon: Users, name: 'Twin Clubhouses', desc: '28,000 sq ft of indoor recreation, lounging, and social event spaces.' },
    ]
  }
];

export default function AmenitiesPage() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "World-Class Amenities", href: "/project/amenities" }
  ];


  return (
    <div className="bg-[var(--color-luxury-pearl)] min-h-screen">
      <section className="pt-40 pb-20 px-6 text-center">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[var(--color-luxury-gold)] tracking-[0.3em] uppercase text-sm font-semibold mb-6 block"
        >
          40+ World-Class Amenities
        </motion.span>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-7xl font-serif text-[var(--color-luxury-charcoal)] mb-8"
        >
          Curated Lifestyle
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="max-w-2xl mx-auto text-lg text-[var(--color-luxury-charcoal)]/70 leading-relaxed mb-12"
        >
          A lifestyle curated beyond imagination. Explore the sprawling 7.5-acre development offering 40+ luxury amenities and twin clubhouses spanning over 28,000 sq ft.
        </motion.p>
      </section>

      <section className="py-20 px-6">
        <div className="container mx-auto">
        <Breadcrumbs items={breadcrumbs} />

          {amenities.map((category) => (
            <div key={category.category} className="mb-24">
              <motion.h3 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-3xl font-serif text-[var(--color-luxury-charcoal)] mb-10 border-b border-gray-200 pb-4 inline-block pr-10"
              >
                {category.category}
              </motion.h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {category.items.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white p-10 rounded-2xl shadow-lg border border-gray-100 group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                    >
                      <div className="w-16 h-16 rounded-full bg-[var(--color-luxury-sand)] flex items-center justify-center mb-6 group-hover:bg-[var(--color-luxury-gold)] transition-colors duration-500">
                        <Icon className="w-8 h-8 text-[var(--color-luxury-charcoal)] group-hover:text-white transition-colors duration-500" />
                      </div>
                      <h4 className="text-xl font-serif text-[var(--color-luxury-charcoal)] mb-4">{item.name}</h4>
                      <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
