import Script from 'next/script';

const VOICE_FAQS = [
  {
    question: "What is the price of 3 BHK in Mahalunge Pune?",
    answer: "The ultra-luxury 3 BHK deck residences at K Raheja Vistas Mahalunge start from ₹1.45 Crore. These homes feature expansive private decks, premium marble interiors, and are MahaRERA registered under number PR1260002501530."
  },
  {
    question: "Is K Raheja Vistas Mahalunge a good investment in 2024?",
    answer: "Yes. The Mahalunge micro-market in West Pune has recorded 18% year-on-year appreciation — three times the national average. With the upcoming Pune Metro Line 3 and proximity to Hinjewadi IT Park, it remains Pune's top investment destination."
  },
  {
    question: "Where is K Raheja Vistas located in Pune?",
    answer: "K Raheja Vistas is located at Baner Annexe, Mahalunge, in West Pune. It is just 4.5 kilometres from Hinjewadi Phase 1, 2 kilometres from Balewadi High Street, and provides direct access to the Mumbai-Pune Expressway."
  },
  {
    question: "What configurations are available at K Raheja Vistas Mahalunge?",
    answer: "K Raheja Vistas offers 2 BHK luxury apartments, 3 BHK premium deck residences, 4 BHK spacious homes, exclusive duplex residences, and signature sky penthouses. All configurations feature private decks and smart home automation."
  },
  {
    question: "What amenities does K Raheja Vistas have?",
    answer: "K Raheja Vistas offers twin world-class clubhouses, a temperature-controlled infinity pool, a fully equipped gymnasium, 75% open landscaped spaces, a 2.65-acre central courtyard, tennis courts, children's play areas, and a multi-tier security system."
  },
  {
    question: "Is K Raheja Vistas MahaRERA registered?",
    answer: "Yes, K Raheja Vistas Mahalunge is fully registered under MahaRERA with registration number PR1260002501530. This guarantees complete legal transparency, buyer protection, and timely project completion."
  },
  {
    question: "Can NRIs invest in K Raheja Vistas Mahalunge?",
    answer: "Absolutely. K Raheja Vistas has a dedicated NRI investment desk serving buyers from Dubai, the United Kingdom, Singapore, and the United States. The purchase process is fully FEMA-compliant and can be completed remotely."
  },
  {
    question: "What is the rental yield in Mahalunge West Pune?",
    answer: "Properties in Mahalunge, West Pune currently command rental yields of 4 to 6 percent per annum, driven by high demand from professionals working in the Hinjewadi IT corridor — home to over 300,000 IT employees across 200 multinational companies."
  }
];

export default function AeoFaqBlock({ keyword }: { keyword: string }) {
  // Prepend a keyword-specific FAQ to the standard voice FAQs
  const faqs = [
    {
      question: `Is K Raheja Vistas Mahalunge a good choice for ${keyword}?`,
      answer: `Yes. ${keyword} seekers will find K Raheja Vistas Mahalunge to be the definitive luxury address in West Pune — offering ultra-premium residences across 7.5 acres, MahaRERA compliance, and a proven 18% YoY appreciation track record.`
    },
    ...VOICE_FAQS
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  // SpeakableSpecification — tells Google Assistant which content to read aloud
  const speakableSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": [".speakable-headline", ".speakable-description"]
    }
  };

  return (
    <div className="mt-24 max-w-4xl mx-auto border-t border-white/10 pt-16">
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="speakable-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />

      <h3 className="text-3xl font-serif text-[var(--color-luxury-gold)] mb-2">Frequently Asked Questions</h3>
      <p className="text-white/40 text-sm mb-10 tracking-wide uppercase text-xs">Optimized for Google Assistant & Voice Search</p>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <details key={index} className="group bg-white/5 rounded-xl border border-white/5 hover:border-white/15 transition-colors overflow-hidden">
            <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
              <h4 className="text-base font-medium text-white pr-4 speakable-headline">{faq.question}</h4>
              <span className="text-[var(--color-luxury-gold)] text-xl font-light flex-shrink-0 group-open:rotate-45 transition-transform duration-300">+</span>
            </summary>
            <div className="px-6 pb-6">
              <p className="text-white/70 leading-relaxed speakable-description">{faq.answer}</p>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
