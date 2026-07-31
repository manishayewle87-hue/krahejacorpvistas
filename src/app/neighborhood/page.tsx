'use client';

import { motion } from 'framer-motion';
import { MapPin, Train, BookOpen, HeartPulse, Building2, Car } from 'lucide-react';

const locations = [
  { category: 'IT Hubs', icon: Building2, name: 'Hinjewadi IT Park', distance: '1.5 km', time: '5 mins' },
  { category: 'Connectivity', icon: Train, name: 'Upcoming Metro Line 3', distance: '1.5 km', time: '5 mins' },
  { category: 'Lifestyle', icon: Car, name: 'Baner High Street', distance: '5.0 km', time: '10 mins' },
  { category: 'Healthcare', icon: HeartPulse, name: 'Ruby Hall Clinic / Jupiter Hospital', distance: '6.0 km', time: '15 mins' },
  { category: 'Education', icon: BookOpen, name: 'Top International Schools', distance: '2.0 km', time: '5 mins' },
  { category: 'Highways', icon: MapPin, name: 'Mumbai-Pune Expressway', distance: '8.0 km', time: '15 mins' },
];

export default function NeighborhoodPage() {
  return (
    <div className="bg-[var(--color-luxury-pearl)] min-h-screen pt-40 pb-20 px-6">
      <div className="container mx-auto">
        
        {/* Header Section */}
        <section className="text-center mb-24 max-w-4xl mx-auto">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[var(--color-luxury-gold)] tracking-[0.3em] uppercase text-sm font-semibold mb-6 block"
          >
            Unmatched Connectivity
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-serif text-[var(--color-luxury-charcoal)] mb-8"
          >
            The Center of Tomorrow.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-[var(--color-luxury-charcoal)]/70 leading-relaxed"
          >
            Positioned strategically in Mahalunge, the gateway to Hinjewadi, K Raheja Vistas offers unprecedented access to Pune&apos;s largest IT infrastructure, premium healthcare, and elite educational institutions, ensuring your daily commute is reduced to minutes.
          </motion.p>
        </section>

        {/* Matrix Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {locations.map((loc, index) => {
            const Icon = loc.icon;
            return (
              <motion.div
                key={loc.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, type: 'spring', stiffness: 100 }}
                className="bg-white p-10 rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.03)] border border-gray-100 group hover:border-[var(--color-luxury-gold)] transition-colors duration-500 relative overflow-hidden"
              >
                {/* Decorative background element */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-luxury-sand)] rounded-bl-full -mr-16 -mt-16 transition-transform duration-700 group-hover:scale-150" />
                
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-12">
                    <div className="w-14 h-14 rounded-full bg-[var(--color-luxury-pearl)] flex items-center justify-center text-[var(--color-luxury-gold)] group-hover:bg-[var(--color-luxury-gold)] group-hover:text-white transition-colors duration-500 shadow-sm">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs uppercase tracking-widest text-gray-400 font-semibold">{loc.category}</span>
                  </div>
                  
                  <h3 className="text-2xl font-serif text-[var(--color-luxury-charcoal)] mb-6 h-16">{loc.name}</h3>
                  
                  <div className="flex items-center gap-6 border-t border-gray-100 pt-6">
                    <div>
                      <span className="block text-xs uppercase text-gray-400 mb-1">Distance</span>
                      <span className="text-xl font-semibold text-[var(--color-luxury-charcoal)]">{loc.distance}</span>
                    </div>
                    <div className="w-px h-8 bg-gray-200" />
                    <div>
                      <span className="block text-xs uppercase text-gray-400 mb-1">Drive Time</span>
                      <span className="text-xl font-semibold text-[var(--color-luxury-gold)]">{loc.time}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
