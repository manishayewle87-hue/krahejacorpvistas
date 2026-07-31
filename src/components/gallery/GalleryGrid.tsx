'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import Image from 'next/image';

const categories = ['All', 'Exteriors', 'Interiors', 'Amenities'];

const galleryData = [
  { id: 1, category: 'Interiors', src: '/assets/living_room.jpg', alt: 'Luxury Living Room' },
  { id: 2, category: 'Exteriors', src: '/assets/banner.jpg', alt: 'Project Elevation' },
  { id: 3, category: 'Amenities', src: '/assets/actual-clubhouse.jpg', alt: 'Twin Clubhouses' },
  { id: 4, category: 'Exteriors', src: '/assets/actual-master-layout.jpg', alt: 'Master Layout' },
  { id: 5, category: 'Amenities', src: '/assets/features.jpg', alt: 'Lifestyle Amenities' },
  { id: 6, category: 'Amenities', src: '/assets/clubhouse.jpg', alt: 'Swimming Pool' },
];

export default function GalleryGrid() {
  const [filter, setFilter] = useState('All');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const filteredImages = filter === 'All' 
    ? galleryData 
    : galleryData.filter(img => img.category === filter);

  return (
    <>
      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-4 mb-16">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-6 py-2 rounded-full text-sm font-semibold tracking-wider transition-all duration-300 ${
              filter === cat 
                ? 'bg-[var(--color-luxury-gold)] text-white' 
                : 'bg-transparent border border-gray-300 text-[var(--color-luxury-charcoal)] hover:border-[var(--color-luxury-gold)]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Editorial Asymmetric Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 px-2 md:px-10">
        <AnimatePresence>
          {filteredImages.map((img, index) => {
            // Asymmetric sizing logic
            let spanClass = 'md:col-span-4 aspect-[4/5]';
            if (index % 4 === 0) spanClass = 'md:col-span-8 aspect-[16/9]';
            else if (index % 4 === 3) spanClass = 'md:col-span-6 aspect-square';

            return (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                key={img.id}
                onClick={() => setSelectedImage(img.src)}
                className={`relative overflow-hidden cursor-pointer group ${spanClass}`}
              >
                <Image 
                  src={img.src} 
                  alt={img.alt} 
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <span className="text-white tracking-[0.2em] uppercase text-xs font-semibold">Enlarge</span>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99999] bg-black/95 flex items-center justify-center p-4 md:p-12"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-8 h-8" />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={selectedImage}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              alt="Expanded Gallery View"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
