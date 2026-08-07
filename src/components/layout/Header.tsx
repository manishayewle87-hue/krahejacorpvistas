'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import MagneticButton from '@/components/ui/MagneticButton';
import ContactModal from '@/components/ui/ContactModal';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${
        isScrolled 
          ? 'bg-black/80 backdrop-blur-xl border-white/10 py-4 shadow-2xl' 
          : 'bg-black/40 backdrop-blur-md border-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="relative z-50">
          <Image src="/assets/logo.png" alt="K Raheja Corp" width={160} height={40} className="h-10 w-auto" />
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {[
            { label: 'Location', path: '/project/location', title: 'Location of Luxury Apartments in Pune' },
            { label: 'Neighborhood', path: '/neighborhood', title: 'Mahalunge Neighborhood & Connectivity' },
            { label: 'Master Plan', path: '/project/masterplan', title: 'K Raheja Vistas Master Plan' },
            { label: 'Floor Plans', path: '/project/floorplans', title: '2, 3 & 4 BHK Luxury Floor Plans in Pune' },
            { label: 'Amenities', path: '/project/amenities', title: 'World-Class Amenities at K Raheja Vistas' },
            { label: 'Gallery', path: '/project/gallery', title: 'Project Gallery & Show Flat' },
            { label: 'Updates', path: '/updates', title: 'Latest Construction Updates & News' }
          ].map((item) => (
            <Link
              key={item.label}
              href={item.path}
              title={item.title}
              className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--color-luxury-pearl)] hover:text-[var(--color-luxury-gold)] transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <MagneticButton>
            <button
              onClick={() => setContactModalOpen(true)}
              className="px-6 py-2 border border-[var(--color-luxury-gold)] text-[var(--color-luxury-gold)] hover:bg-[var(--color-luxury-gold)] hover:text-[var(--color-luxury-charcoal)] transition-all uppercase text-sm font-semibold tracking-wider block"
            >
              Enquire Now
            </button>
          </MagneticButton>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-[var(--color-luxury-pearl)]"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[var(--color-luxury-charcoal)] border-t border-white/10"
          >
            <nav className="flex flex-col px-6 py-8 gap-6">
              {[
                { label: 'Location', path: '/project/location', title: 'Location of Luxury Apartments in Pune' },
                { label: 'Neighborhood', path: '/neighborhood', title: 'Mahalunge Neighborhood & Connectivity' },
                { label: 'Master Plan', path: '/project/masterplan', title: 'K Raheja Vistas Master Plan' },
                { label: 'Floor Plans', path: '/project/floorplans', title: '2, 3 & 4 BHK Luxury Floor Plans in Pune' },
                { label: 'Amenities', path: '/project/amenities', title: 'World-Class Amenities at K Raheja Vistas' },
                { label: 'Gallery', path: '/project/gallery', title: 'Project Gallery & Show Flat' },
                { label: 'Updates', path: '/updates', title: 'Latest Construction Updates & News' }
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.path}
                  title={item.title}
                  className="text-lg text-[var(--color-luxury-pearl)] uppercase tracking-wider"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setContactModalOpen(true);
                }}
                className="px-6 py-4 mt-4 border border-[var(--color-luxury-gold)] text-[var(--color-luxury-gold)] uppercase text-center font-semibold tracking-wider"
              >
                Enquire Now
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <Suspense fallback={null}>
        <ContactModal isOpen={contactModalOpen} onClose={() => setContactModalOpen(false)} />
      </Suspense>
    </header>
  );
}
