'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    // Check if consent has already been given
    const hasConsented = localStorage.getItem('google-consent-mode');
    if (!hasConsented) {
      // Delay showing the banner slightly for better UX and LCP
      const timer = setTimeout(() => setShowConsent(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('google-consent-mode', 'granted');
    setShowConsent(false);
    
    // In a real implementation, you would trigger the GA4 consent update here
    // window.gtag('consent', 'update', {
    //   'analytics_storage': 'granted'
    // });
  };

  if (!showConsent) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full z-[9999] bg-black/95 backdrop-blur-xl border-t border-[var(--color-luxury-gold)] p-4 md:p-6 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] transform translate-y-0 transition-transform duration-500">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-white/80 text-sm md:text-base max-w-4xl font-sans">
          <p>
            <strong className="text-[var(--color-luxury-gold)]">Privacy & Cookie Notice:</strong> We use cookies to personalize content, analyze our traffic, and provide you with a premium browsing experience in compliance with global data privacy regulations. By clicking &quot;Accept All&quot;, you consent to our use of cookies as described in our <Link href="/privacy-policy" className="text-white underline hover:text-[var(--color-luxury-gold)]">Privacy Policy</Link>.
          </p>
        </div>
        <div className="flex gap-4 w-full md:w-auto justify-end shrink-0">
          <button 
            onClick={() => setShowConsent(false)}
            className="px-6 py-2 border border-white/20 text-white/70 hover:bg-white/10 transition-colors uppercase tracking-widest text-xs font-semibold whitespace-nowrap"
          >
            Decline
          </button>
          <button 
            onClick={acceptCookies}
            className="px-6 py-2 bg-[var(--color-luxury-gold)] text-[var(--color-luxury-charcoal)] hover:bg-white transition-colors uppercase tracking-widest text-xs font-bold whitespace-nowrap"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}
