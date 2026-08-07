'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function EmiCalculator() {
  const [propertyValue, setPropertyValue] = useState(15000000); // 1.5 Cr
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenureYears, setTenureYears] = useState(20);
  const principal = propertyValue - (propertyValue * (downPaymentPercent / 100));
  const r = (interestRate / 12) / 100;
  const n = tenureYears * 12;
  
  let emi = 0;
  if (principal > 0 && r > 0 && n > 0) {
    const calculatedEmi = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    emi = Math.round(calculatedEmi);
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100 max-w-5xl mx-auto my-20">
      <div className="text-center mb-10">
        <h3 className="text-3xl font-serif text-[var(--color-luxury-charcoal)] mb-4">Financial Calculator</h3>
        <p className="text-gray-500 font-light">Estimate your monthly investment for premium deck residences.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Controls */}
        <div className="space-y-8">
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-semibold tracking-wider text-gray-500 uppercase">Property Value</label>
              <span className="text-[var(--color-luxury-charcoal)] font-semibold">{formatCurrency(propertyValue)}</span>
            </div>
            <input 
              type="range" 
              min="10000000" 
              max="50000000" 
              step="1000000"
              value={propertyValue}
              onChange={(e) => setPropertyValue(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[var(--color-luxury-gold)]"
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-semibold tracking-wider text-gray-500 uppercase">Down Payment ({downPaymentPercent}%)</label>
              <span className="text-[var(--color-luxury-charcoal)] font-semibold">{formatCurrency(propertyValue * (downPaymentPercent / 100))}</span>
            </div>
            <input 
              type="range" 
              min="10" 
              max="50" 
              step="5"
              value={downPaymentPercent}
              onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[var(--color-luxury-gold)]"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-semibold tracking-wider text-gray-500 uppercase">Interest</label>
                <span className="text-[var(--color-luxury-charcoal)] font-semibold">{interestRate}%</span>
              </div>
              <input 
                type="range" 
                min="6" 
                max="12" 
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[var(--color-luxury-gold)]"
              />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-semibold tracking-wider text-gray-500 uppercase">Tenure</label>
                <span className="text-[var(--color-luxury-charcoal)] font-semibold">{tenureYears} Years</span>
              </div>
              <input 
                type="range" 
                min="5" 
                max="30" 
                step="1"
                value={tenureYears}
                onChange={(e) => setTenureYears(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[var(--color-luxury-gold)]"
              />
            </div>
          </div>
        </div>

        {/* Output */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-[var(--color-luxury-charcoal)] rounded-2xl p-10 text-white relative overflow-hidden shadow-2xl"
        >
          {/* Decorative element */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-[var(--color-luxury-gold)] rounded-full opacity-10 blur-3xl" />
          
          <div className="relative z-10">
            <span className="text-[var(--color-luxury-gold)] tracking-[0.2em] uppercase text-xs font-semibold mb-2 block">
              Estimated Monthly EMI
            </span>
            <div className="text-5xl font-serif mb-8 text-[var(--color-luxury-pearl)]">
              {formatCurrency(emi)}
            </div>

            <div className="space-y-4 pt-8 border-t border-white/10">
              <div className="flex justify-between">
                <span className="text-white/60 font-light text-sm">Principal Amount</span>
                <span className="font-semibold text-white">{formatCurrency(propertyValue - (propertyValue * (downPaymentPercent / 100)))}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60 font-light text-sm">Total Interest Payable</span>
                <span className="font-semibold text-white">{formatCurrency((emi * tenureYears * 12) - (propertyValue - (propertyValue * (downPaymentPercent / 100))))}</span>
              </div>
            </div>
            
            <button className="w-full mt-10 py-4 bg-[var(--color-luxury-gold)] text-[var(--color-luxury-charcoal)] tracking-widest uppercase font-semibold text-sm hover:bg-white transition-colors">
              Apply For Pre-Approval
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
