'use client';

import { motion } from 'framer-motion';

const locationHighlights = [
  { name: 'Hinjewadi IT Park', distance: 'Approx 1.5 km (5 mins drive)' },
  { name: 'Global Indian International School', distance: 'Close Proximity' },
  { name: 'Mumbai-Pune Expressway', distance: 'Direct Access' },
  { name: 'Proposed Metro Line 3', distance: 'Upcoming Seamless Connectivity' },
  { name: 'Balewadi High Street', distance: '12 Minutes Drive' },
];

export default function LocationPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ApartmentComplex",
    "name": "K Raheja Vistas Mahalunge",
    "description": "Ultra-luxury deck residences and apartments located at Baner Annexe, Mahalunge, West Pune.",
    "url": "https://www.krahejacorpvistas.com/project/location",
    "hasMap": "https://www.google.com/maps?cid=0xc3b8a1c865fcd5d0",
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "18.5678443",
      "longitude": "73.7380126"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "K Raheja Vistas, Mahalunge",
      "addressLocality": "Pune",
      "addressRegion": "Maharashtra",
      "postalCode": "411045",
      "addressCountry": "IN"
    },
    "areaServed": [
      { "@type": "City", "name": "Pune" },
      { "@type": "Place", "name": "Mahalunge" },
      { "@type": "Place", "name": "Baner Annexe" },
      { "@type": "Place", "name": "Hinjewadi IT Park" },
      { "@type": "Place", "name": "Balewadi High Street" },
      { "@type": "Place", "name": "Wakad" }
    ]
  };

  return (
    <div className="bg-[var(--color-luxury-pearl)] min-h-screen">
      <script
        id="location-apartmentcomplex-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Header */}
      <section className="pt-40 pb-20 px-6 text-center">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[var(--color-luxury-gold)] tracking-[0.3em] uppercase text-sm font-semibold mb-6 block"
        >
          Connectivity
        </motion.span>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-7xl font-serif text-[var(--color-luxury-charcoal)] mb-8"
        >
          The Heart of West Pune
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="max-w-2xl mx-auto text-lg text-[var(--color-luxury-charcoal)]/90 font-medium leading-relaxed"
        >
          Baner Annex and Mahalunge offer the perfect balance—away from the chaos, yet exceptionally connected to Pune&apos;s thriving IT hubs and social infrastructure.
        </motion.p>
      </section>

      {/* Connectivity Grid */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            <div className="lg:col-span-5 z-10">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white p-10 md:p-14 shadow-2xl rounded-2xl relative -mr-0 lg:-mr-20 border border-gray-100"
              >
                <span className="text-[var(--color-luxury-gold)] tracking-widest uppercase text-xs font-bold mb-4 block">Proximity Index</span>
                <h2 className="text-3xl md:text-4xl font-serif text-[var(--color-luxury-charcoal)] mb-6">Strategic Advantage</h2>
                <p className="text-gray-800 font-medium mb-8 leading-relaxed">
                  Positioned perfectly between the Baner business district and the Hinjewadi IT hub, K Raheja Vistas is the primary choice for IT professionals. The upcoming Metro Line 3 will exponentially increase the location&apos;s value over the next 5 years.
                </p>
                
                <div className="space-y-6">
                  {locationHighlights.map((item, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex justify-between items-center border-b border-gray-100 pb-4"
                    >
                      <span className="font-medium text-[var(--color-luxury-charcoal)]">{item.name}</span>
                      <span className="text-sm font-semibold text-[var(--color-luxury-gold)] text-right">{item.distance}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative rounded-2xl overflow-hidden shadow-2xl h-[500px] md:h-[700px] bg-gray-900 border border-gray-200"
              >
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15128.530737402927!2d73.7380126!3d18.5678443!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bec704383a15%3A0xc3b8a1c865fcd5d0!2sMahalunge%2C%20Pune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="K Raheja Vistas Mahalunge Pune Interactive Google Maps Location"
                ></iframe>
              </motion.div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
