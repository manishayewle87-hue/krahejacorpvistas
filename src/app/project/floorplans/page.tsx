'use client';
import Breadcrumbs from "@/components/ui/Breadcrumbs";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import EmiCalculator from '@/components/ui/EmiCalculator';
import Image from 'next/image';

const floorPlans = [
  { id: 1, type: '2bhk', name: '2 BHK Premium Deck', carpet: '750 sq.ft.', desc: 'Perfectly balanced spaces with expansive decks and premium fittings.' },
  { id: 2, type: '3bhk', name: '3 BHK Ultra Luxury', carpet: '1150 sq.ft.', desc: 'Spacious 3-bedroom residences offering panoramic foothill views.' },
  { id: 3, type: '4bhk', name: '3 & 4 BHK Duplex', carpet: '1850 sq.ft.', desc: 'The Crown Jewel. Double-height ceilings and bespoke luxury layouts.' },
];

// ItemList schema — shows individual configurations as rich results in Google
const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "K Raheja Vistas — Luxury Residence Configurations",
  "description": "Browse 2 BHK, 3 BHK, and 4 BHK duplex floor plans at K Raheja Vistas Mahalunge, West Pune.",
  "url": "https://www.krahejacorpvistas.com/project/floorplans",
  "numberOfItems": 3,
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "item": {
        "@type": "Product",
        "name": "2 BHK Premium Deck Residence — K Raheja Vistas Mahalunge",
        "description": "Perfectly balanced 2 BHK spaces with expansive private decks, premium marble finishes and smart home automation. Carpet area from 870 sq ft.",
        "image": "https://www.krahejacorpvistas.com/assets/actual_3bhk_floorplan.jpg",
        "sku": "KRV-2BHK",
        "brand": { "@type": "Brand", "name": "K Raheja Corp" },
        "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "reviewCount": "312", "bestRating": "5" },
        "offers": { "@type": "Offer", "price": "11000000", "priceCurrency": "INR", "availability": "https://schema.org/InStock", "url": "https://www.krahejacorpvistas.com/project/floorplans" }
      }
    },
    {
      "@type": "ListItem",
      "position": 2,
      "item": {
        "@type": "Product",
        "name": "3 BHK Ultra Luxury Deck Residence — K Raheja Vistas Mahalunge",
        "description": "Spacious 3 BHK premium deck residences offering panoramic foothill views and open-plan living. Carpet area from 1,290 sq ft.",
        "image": "https://www.krahejacorpvistas.com/assets/actual_3bhk_floorplan.jpg",
        "sku": "KRV-3BHK",
        "brand": { "@type": "Brand", "name": "K Raheja Corp" },
        "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "reviewCount": "312", "bestRating": "5" },
        "offers": { "@type": "Offer", "price": "14500000", "priceCurrency": "INR", "availability": "https://schema.org/InStock", "url": "https://www.krahejacorpvistas.com/project/floorplans" }
      }
    },
    {
      "@type": "ListItem",
      "position": 3,
      "item": {
        "@type": "Product",
        "name": "4 BHK Duplex Penthouse — K Raheja Vistas Mahalunge",
        "description": "The Crown Jewel. Double-height ceilings, private rooftop terrace and bespoke luxury layouts. Carpet area from 1,850 sq ft.",
        "image": "https://www.krahejacorpvistas.com/assets/actual_master_layout.jpg",
        "sku": "KRV-4BHK-DUPLEX",
        "brand": { "@type": "Brand", "name": "K Raheja Corp" },
        "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "89", "bestRating": "5" },
        "offers": { "@type": "Offer", "price": "22000000", "priceCurrency": "INR", "availability": "https://schema.org/InStock", "url": "https://www.krahejacorpvistas.com/project/floorplans" }
      }
    }
  ]
};

// HowTo schema — appears in Google as numbered steps for "how to buy flat in Pune"
const howToBuySchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Buy a Luxury Flat in Pune at K Raheja Vistas Mahalunge",
  "description": "A step-by-step guide to purchasing an ultra-luxury 2, 3 or 4 BHK deck residence at K Raheja Vistas Mahalunge, Pune.",
  "totalTime": "P30D",
  "tool": [{ "@type": "HowToTool", "name": "MahaRERA Verified Document" }],
  "supply": [{ "@type": "HowToSupply", "name": "PAN Card, Aadhaar, Income Proof" }],
  "step": [
    { "@type": "HowToStep", "position": 1, "name": "Book a Private Preview", "text": "Visit krahejacorpvistas.com or call the sales desk to schedule a private on-site preview at K Raheja Vistas Mahalunge." },
    { "@type": "HowToStep", "position": 2, "name": "Choose Your Configuration", "text": "Select from 2 BHK (from ₹1.1 Cr), 3 BHK (from ₹1.45 Cr) or 4 BHK Duplex (from ₹2.2 Cr) layouts to match your lifestyle." },
    { "@type": "HowToStep", "position": 3, "name": "Verify MahaRERA Registration", "text": "Confirm MahaRERA registration number PR1260002501530 on maharera.mahaonline.gov.in for full legal protection." },
    { "@type": "HowToStep", "position": 4, "name": "Submit KYC Documents", "text": "Submit PAN card, Aadhaar, income proof, and bank statements. NRIs may submit passport and OCI card remotely." },
    { "@type": "HowToStep", "position": 5, "name": "Execute Sale Agreement", "text": "Sign the registered Sale Agreement and pay the booking amount. The entire process can be completed remotely for NRI buyers." }
  ]
};

// Event schema — site visit drives direct appointment bookings from SERP
const siteVisitEventSchema = {
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "K Raheja Vistas Mahalunge — Exclusive Site Visit & Private Preview",
  "description": "Book a private, guided site visit to experience the ultra-luxury deck residences at K Raheja Vistas Mahalunge, Baner Annexe, Pune.",
  "eventStatus": "https://schema.org/EventScheduled",
  "eventAttendanceMode": "https://schema.org/MixedEventAttendanceMode",
  "startDate": "2025-09-01T10:00:00+05:30",
  "endDate": "2025-12-31T18:00:00+05:30",
  "location": {
    "@type": "Place",
    "name": "K Raheja Vistas Mahalunge Sales Gallery",
    "address": { "@type": "PostalAddress", "streetAddress": "Baner Annexe, Mahalunge", "addressLocality": "Pune", "addressRegion": "Maharashtra", "postalCode": "411045", "addressCountry": "IN" },
    "geo": { "@type": "GeoCoordinates", "latitude": "18.563551", "longitude": "73.7339978" }
  },
  "organizer": { "@type": "Organization", "name": "K Raheja Corp", "url": "https://www.krahejacorpvistas.com" },
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR", "availability": "https://schema.org/InStock", "url": "https://www.krahejacorpvistas.com/project/floorplans" },
  "isAccessibleForFree": true
};

export default function FloorPlansPage() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Luxury Floor Plans", href: "/project/floorplans" }
  ];


  const [activeFilter, setActiveFilter] = useState('all');

  const filteredPlans = floorPlans.filter(plan => activeFilter === 'all' || plan.type === activeFilter);

  return (
    <div className="bg-[var(--color-luxury-pearl)] min-h-screen">
      <script id="itemlist-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script id="howtobuy-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToBuySchema) }} />
      <script id="sitevisit-event-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteVisitEventSchema) }} />
      <section className="pt-40 pb-20 px-6 text-center">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[var(--color-luxury-gold)] tracking-[0.3em] uppercase text-sm font-semibold mb-6 block"
        >
          Residences
        </motion.span>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-7xl font-serif text-[var(--color-luxury-charcoal)] mb-8"
        >
          Exclusive Floor Plans
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="max-w-2xl mx-auto text-lg text-[var(--color-luxury-charcoal)]/70 leading-relaxed mb-12"
        >
          Explore bespoke 2, 3, and 4 BHK configurations tailored for the global elite. Each residence maximizes natural light, cross-ventilation, and privacy.
        </motion.p>

        {/* Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {[
            { label: 'All Configurations', value: 'all' },
            { label: '2 BHK', value: '2bhk' },
            { label: '3 BHK', value: '3bhk' },
            { label: '3 & 4 BHK Duplex', value: '4bhk' },
          ].map((filter) => (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className={`px-6 py-2 rounded-full border transition-all ${
                activeFilter === filter.value 
                  ? 'bg-[var(--color-luxury-gold)] border-[var(--color-luxury-gold)] text-white' 
                  : 'bg-transparent border-gray-300 text-[var(--color-luxury-charcoal)] hover:border-[var(--color-luxury-gold)] hover:text-[var(--color-luxury-gold)]'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </motion.div>

        {/* Layout Grid */}
        <div className="container mx-auto">
        <Breadcrumbs items={breadcrumbs} />

          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <AnimatePresence>
              {filteredPlans.map((plan) => (
                <motion.div
                  key={plan.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden text-left border border-gray-100 group"
                >
                  <div className="h-64 bg-gray-100 overflow-hidden relative">
                    <Image 
                      src="/assets/actual-floorplan.jpg" 
                      alt={plan.name} 
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 mix-blend-multiply" 
                    />
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-serif text-[var(--color-luxury-charcoal)] mb-2">{plan.name}</h3>
                    <p className="text-[var(--color-luxury-gold)] font-semibold text-sm tracking-widest uppercase mb-4">{plan.carpet}</p>
                    <p className="text-gray-600 leading-relaxed mb-8">{plan.desc}</p>
                    <button className="w-full py-3 border border-[var(--color-luxury-gold)] text-[var(--color-luxury-charcoal)] hover:bg-[var(--color-luxury-gold)] hover:text-white transition-colors uppercase text-xs font-bold tracking-widest">
                      Request Pricing
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* EMI Calculator Widget */}
      <EmiCalculator />
    </div>
  );
}
