'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { KeyRound, ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function PortalLogin() {
  const [crn, setCrn] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate secure auth handshake
    setTimeout(() => {
      router.push('/portal/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[var(--color-luxury-charcoal)] flex flex-col items-center justify-center px-6 relative overflow-hidden">
      
      {/* Ambience */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/assets/living_room.jpg" 
          alt="Luxury Living" 
          fill
          className="object-cover opacity-20 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-[var(--color-luxury-charcoal)]" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-10">
          <KeyRound className="w-12 h-12 text-[var(--color-luxury-gold)] mx-auto mb-6" />
          <h1 className="text-3xl font-serif text-[var(--color-luxury-pearl)] mb-2 tracking-wide">
            Resident Portal
          </h1>
          <p className="text-white/60 text-sm tracking-widest uppercase">Secure Authentication</p>
        </div>

        <form onSubmit={handleLogin} className="glass-panel p-8 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-xl">
          <div className="mb-6">
            <label className="block text-xs text-white/50 uppercase tracking-widest mb-3">
              Customer Reference Number (CRN)
            </label>
            <input
              type="text"
              value={crn}
              onChange={(e) => setCrn(e.target.value)}
              placeholder="e.g. KRV-2026-A104"
              className="w-full bg-black/40 border border-white/20 rounded-lg p-4 text-white focus:outline-none focus:border-[var(--color-luxury-gold)] transition-colors"
              required
            />
          </div>
          
          <div className="mb-8">
            <label className="block text-xs text-white/50 uppercase tracking-widest mb-3">
              Secure PIN
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full bg-black/40 border border-white/20 rounded-lg p-4 text-white focus:outline-none focus:border-[var(--color-luxury-gold)] transition-colors"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[var(--color-luxury-gold)] text-[var(--color-luxury-charcoal)] font-bold uppercase tracking-widest py-4 rounded-lg flex items-center justify-center gap-2 hover:bg-white transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Authenticating...' : 'Access Dashboard'}
            {!isLoading && <ArrowRight className="w-4 h-4" />}
          </button>
        </form>

        <p className="text-center text-white/40 text-xs mt-8">
          Having trouble logging in? Contact your dedicated Relationship Manager.
        </p>
      </div>
    </div>
  );
}
