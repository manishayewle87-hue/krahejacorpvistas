'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, Clock } from 'lucide-react';

const updates = [
  {
    id: 1,
    phase: 'Phase 1: Foundation',
    status: 'Completed',
    date: 'January 2024',
    desc: 'Excavation and foundation work completed for Towers A, B, and C. Raft foundation poured.',
    completed: true,
  },
  {
    id: 2,
    phase: 'Phase 2: Plinth Level',
    status: 'Completed',
    date: 'April 2024',
    desc: 'Plinth level construction and basement parking slabs successfully completed for all 7 towers.',
    completed: true,
  },
  {
    id: 3,
    phase: 'Phase 3: Superstructure (Up to 10th Floor)',
    status: 'In Progress',
    date: 'Current',
    desc: 'Slab casting in progress for Towers A & B. Core wall construction reached the 12th floor.',
    completed: false,
  },
  {
    id: 4,
    phase: 'Phase 4: Twin Clubhouses',
    status: 'Upcoming',
    date: 'August 2024',
    desc: 'Initiation of structural work for the 28,000 sq ft twin clubhouses and central courtyard.',
    completed: false,
  },
  {
    id: 5,
    phase: 'Phase 5: MEP & Finishing',
    status: 'Upcoming',
    date: 'March 2025',
    desc: 'Mechanical, Electrical, and Plumbing (MEP) installations along with premium interior finishing.',
    completed: false,
  },
];

export default function UpdatesPage() {
  return (
    <div className="bg-[var(--color-luxury-pearl)] min-h-screen pt-40 pb-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <section className="text-center mb-20">
          <span className="text-[var(--color-luxury-gold)] tracking-[0.3em] uppercase text-sm font-semibold mb-6 block">
            Project Transparency
          </span>
          <h1 className="text-5xl md:text-7xl font-serif text-[var(--color-luxury-charcoal)] mb-8">
            Construction Updates.
          </h1>
          <p className="text-lg text-[var(--color-luxury-charcoal)]/70 leading-relaxed font-light">
            Stay informed on the rapid development of West Pune&apos;s most exclusive enclave. We believe in absolute transparency and timely delivery.
          </p>
        </section>

        <div className="relative border-l border-[var(--color-luxury-gold)]/30 ml-4 md:ml-8 py-10">
          {updates.map((update, index) => (
            <motion.div
              key={update.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="mb-16 ml-10 relative"
            >
              {/* Timeline dot */}
              <div className={`absolute -left-[49px] w-6 h-6 rounded-full border-4 border-[var(--color-luxury-pearl)] ${update.completed ? 'bg-[var(--color-luxury-gold)]' : 'bg-gray-300'}`} />
              
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 relative group hover:-translate-y-1 transition-transform duration-300">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-4">
                  <h3 className="text-2xl font-serif text-[var(--color-luxury-charcoal)]">{update.phase}</h3>
                  <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase ${update.completed ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                    {update.completed ? <CheckCircle2 className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                    {update.status}
                  </div>
                </div>
                <div className="text-[var(--color-luxury-gold)] text-sm font-semibold tracking-widest uppercase mb-4">
                  {update.date}
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {update.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
