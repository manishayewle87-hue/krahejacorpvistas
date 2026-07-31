import Image from 'next/image';
import ContactForm from '@/components/ui/ContactFormInline';

const dictionaries = {
  en: {
    title: "Premium Deck Residences at Baner Annex",
    subtitle: "A 7.5-acre masterpiece.",
    formTitle: "Download Brochure"
  },
  mr: {
    title: "बाणेर ॲनेक्स येथे प्रीमियम डेक रेसिडेन्सेस",
    subtitle: "एक ७.५ एकरचा मास्टरपीस.",
    formTitle: "माहितीपत्रक डाउनलोड करा"
  },
  hi: {
    title: "बानेर एनेक्स में प्रीमियम डेक रेसिडेंसीज",
    subtitle: "एक 7.5 एकड़ का मास्टरपीस।",
    formTitle: "ब्रोशर डाउनलोड करें"
  }
};

export default function LocalizedLandingPage({ params }: { params: { lang: 'en' | 'mr' | 'hi' } }) {
  const dict = dictionaries[params.lang] || dictionaries.en;

  return (
    <div className="is-campaign min-h-screen bg-[var(--color-luxury-charcoal)] flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 h-[50vh] md:h-screen relative overflow-hidden flex flex-col justify-center p-10 z-10">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/assets/hero-masterpiece.jpg" 
            alt="K Raheja Vistas Mahalunge" 
            fill
            priority
            className="object-cover opacity-60 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        
        <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-serif text-[var(--color-luxury-pearl)] mb-4 leading-tight">
            {dict.title}
          </h1>
          <h2 className="text-xl md:text-2xl text-[var(--color-luxury-gold)] font-light mb-6 italic">
            {dict.subtitle}
          </h2>
        </div>
      </div>

      <div className="w-full md:w-1/2 bg-[var(--color-luxury-pearl)] h-auto md:h-screen flex items-center justify-center p-8 md:p-16">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl">
          <h3 className="text-2xl font-serif text-[var(--color-luxury-charcoal)] mb-6 text-center">{dict.formTitle}</h3>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
