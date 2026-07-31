import { FileText, Building2, Receipt, Calendar } from 'lucide-react';
import Link from 'next/link';

export default function CustomerPortal() {
  return (
    <div className="min-h-screen bg-[var(--color-luxury-charcoal)] pt-32 pb-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="flex justify-between items-end mb-12 border-b border-white/10 pb-6">
          <div>
            <h1 className="text-4xl font-serif text-[var(--color-luxury-pearl)] mb-2">Welcome Back, Anand.</h1>
            <p className="text-white/60">Unit 1402, Tower A (The Crown) • 3 BHK Ultra-Luxury</p>
          </div>
          <button className="text-[var(--color-luxury-gold)] text-sm tracking-widest uppercase border border-[var(--color-luxury-gold)]/50 px-6 py-2 hover:bg-[var(--color-luxury-gold)] hover:text-black transition-colors">
            Sign Out
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Construction Progress */}
          <div className="md:col-span-2 glass-panel p-8 rounded-2xl">
            <div className="flex items-center gap-3 mb-6">
              <Building2 className="text-[var(--color-luxury-gold)]" />
              <h2 className="text-xl font-serif text-[var(--color-luxury-pearl)]">Construction Progress</h2>
            </div>
            
            <div className="relative pt-4">
              <div className="w-full bg-white/10 rounded-full h-2 mb-4">
                <div className="bg-[var(--color-luxury-gold)] h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
              <p className="text-sm text-white/80 flex justify-between">
                <span>Foundation & Plinth</span>
                <span className="text-[var(--color-luxury-gold)]">45% Completed</span>
              </p>
            </div>

            <div className="mt-8">
              <h3 className="text-sm uppercase tracking-widest text-white/50 mb-4">Latest Updates</h3>
              <div className="space-y-4">
                <div className="bg-white/5 p-4 rounded-lg flex justify-between items-center">
                  <div>
                    <p className="text-white font-medium">14th Floor Slab Casting Started</p>
                    <p className="text-xs text-white/50 mt-1">July 06, 2026</p>
                  </div>
                  <button className="text-xs bg-white/10 px-3 py-1 rounded hover:bg-white/20 text-white">View Images</button>
                </div>
                <div className="bg-white/5 p-4 rounded-lg flex justify-between items-center">
                  <div>
                    <p className="text-white font-medium">Clubhouse Excavation Completed</p>
                    <p className="text-xs text-white/50 mt-1">June 15, 2026</p>
                  </div>
                  <button className="text-xs bg-white/10 px-3 py-1 rounded hover:bg-white/20 text-white">View Images</button>
                </div>
              </div>
            </div>
          </div>

          {/* Document Vault */}
          <div className="space-y-8">
            <div className="glass-panel p-8 rounded-2xl">
              <div className="flex items-center gap-3 mb-6">
                <Receipt className="text-[var(--color-luxury-gold)]" />
                <h2 className="text-xl font-serif text-[var(--color-luxury-pearl)]">Financials</h2>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-white/10">
                  <span className="text-white/70">Total Consideration</span>
                  <span className="text-white font-serif">₹1.85 Cr</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-white/10">
                  <span className="text-white/70">Amount Paid</span>
                  <span className="text-green-400 font-serif">₹37.0 L</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Next Milestone</span>
                  <span className="text-[var(--color-luxury-gold)] font-serif">10% on Plinth</span>
                </div>
              </div>
              <button className="w-full mt-6 bg-[var(--color-luxury-gold)] text-black py-3 text-sm font-semibold tracking-widest uppercase hover:bg-white transition-colors">
                Make Payment
              </button>
            </div>

            <div className="glass-panel p-8 rounded-2xl">
              <div className="flex items-center gap-3 mb-6">
                <FileText className="text-[var(--color-luxury-gold)]" />
                <h2 className="text-xl font-serif text-[var(--color-luxury-pearl)]">Document Vault</h2>
              </div>
              <ul className="space-y-3">
                <li><Link href="#" className="text-sm text-white/80 hover:text-[var(--color-luxury-gold)] flex items-center justify-between">Allotment Letter <span className="text-xs bg-white/10 px-2 py-1 rounded">PDF</span></Link></li>
                <li><Link href="#" className="text-sm text-white/80 hover:text-[var(--color-luxury-gold)] flex items-center justify-between">Stamped Agreement <span className="text-xs bg-white/10 px-2 py-1 rounded">PDF</span></Link></li>
                <li><Link href="#" className="text-sm text-white/80 hover:text-[var(--color-luxury-gold)] flex items-center justify-between">Payment Receipt #1 <span className="text-xs bg-white/10 px-2 py-1 rounded">PDF</span></Link></li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
