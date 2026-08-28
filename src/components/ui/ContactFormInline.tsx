'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { submitLead } from '@/app/actions/submit-lead';
import { Loader2, CheckCircle2, ShieldCheck, PhoneCall } from 'lucide-react';
import { motion } from 'framer-motion';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address').or(z.literal('')).optional(),
  phone: z.string().regex(/^\d{10}$/, 'Phone must be exactly 10 digits'),
  configuration: z.enum(['2BHK', '3BHK', '4BHK', 'Duplex', 'Undecided']),
});

type FormInput = {
  name: string;
  email?: string;
  phone: string;
  configuration: '2BHK' | '3BHK' | '4BHK' | 'Duplex' | 'Undecided';
};

export default function ContactFormInline() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{ success: boolean; message: string } | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<FormInput>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      configuration: 'Undecided'
    }
  });

  const onSubmit = async (data: FormInput) => {
    setIsSubmitting(true);
    setSubmitResult(null);

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email || '');
    formData.append('phone', data.phone);
    formData.append('configuration', data.configuration);

    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('utm_source')) formData.append('utm_source', params.get('utm_source')!);
      if (params.get('utm_medium')) formData.append('utm_medium', params.get('utm_medium')!);
      if (params.get('utm_campaign')) formData.append('utm_campaign', params.get('utm_campaign')!);
    }

    const result = await submitLead(null, formData);
    setIsSubmitting(false);

    if (result.success) {
      setSubmitResult({
        success: true,
        message: result.message || 'Thank you for your enquiry. A luxury property advisor will contact you shortly.',
      });
    } else {
      setSubmitResult({
        success: false,
        message: result.message || 'Unable to process enquiry. Please try again.',
      });
    }
  };

  if (submitResult?.success) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/5 border border-[var(--color-luxury-gold)]/40 p-8 rounded-2xl text-center backdrop-blur-sm"
      >
        <div className="w-14 h-14 bg-[var(--color-luxury-gold)]/20 text-[var(--color-luxury-gold)] rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-serif text-[var(--color-luxury-pearl)] mb-2">Brochure &amp; Pricing Reserved</h3>
        <p className="text-white/70 text-sm leading-relaxed mb-4">{submitResult.message}</p>
        <div className="bg-white/5 p-3 rounded-xl text-xs text-white/60 flex items-center justify-center gap-2">
          <PhoneCall className="w-4 h-4 text-[var(--color-luxury-gold)]" />
          <span>Priority Desk: +91 77440 09295</span>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label className="block text-xs uppercase tracking-wider text-gray-700 dark:text-white/70 mb-1.5 font-medium">
          Full Name <span className="text-[var(--color-luxury-gold)]">*</span>
        </label>
        <input 
          {...register('name')} 
          type="text"
          className="w-full bg-black/5 dark:bg-white/5 border border-gray-300 dark:border-white/15 focus:border-[var(--color-luxury-gold)] rounded-lg px-4 py-3 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none transition-all text-sm"
          placeholder="e.g. Anand Mahindra"
        />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block text-xs uppercase tracking-wider text-gray-700 dark:text-white/70 mb-1.5 font-medium">
          Phone Number <span className="text-[var(--color-luxury-gold)]">*</span>
        </label>
        <div className="flex gap-2">
          <span className="bg-black/5 dark:bg-white/5 border border-gray-300 dark:border-white/15 rounded-lg px-3.5 py-3 text-gray-700 dark:text-white/70 text-sm flex items-center font-medium">
            +91
          </span>
          <input 
            {...register('phone')} 
            type="tel"
            maxLength={10}
            className="flex-1 bg-black/5 dark:bg-white/5 border border-gray-300 dark:border-white/15 focus:border-[var(--color-luxury-gold)] rounded-lg px-4 py-3 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none transition-all text-sm"
            placeholder="9876543210"
          />
        </div>
        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
      </div>

      <div>
        <label className="block text-xs uppercase tracking-wider text-gray-700 dark:text-white/70 mb-1.5 font-medium">
          Email Address (Optional)
        </label>
        <input 
          {...register('email')} 
          type="email"
          className="w-full bg-black/5 dark:bg-white/5 border border-gray-300 dark:border-white/15 focus:border-[var(--color-luxury-gold)] rounded-lg px-4 py-3 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none transition-all text-sm"
          placeholder="anand@example.com"
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-xs uppercase tracking-wider text-gray-700 dark:text-white/70 mb-1.5 font-medium">
          Interested Configuration
        </label>
        <select 
          {...register('configuration')}
          className="w-full bg-white dark:bg-[#1b1b1b] border border-gray-300 dark:border-white/15 focus:border-[var(--color-luxury-gold)] rounded-lg px-4 py-3 text-gray-900 dark:text-white focus:outline-none transition-all text-sm"
        >
          <option value="Undecided">Undecided / Exploring Options</option>
          <option value="2BHK">2 BHK Premium Deck (780 sq.ft.)</option>
          <option value="3BHK">3 BHK Ultra-Luxury (1,150 sq.ft.)</option>
          <option value="4BHK">4 BHK Palatial (1,650 sq.ft.)</option>
          <option value="Duplex">Penthouse Duplex (2,400+ sq.ft.)</option>
        </select>
      </div>

      {submitResult?.success === false && (
        <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-500 text-xs">
          {submitResult.message}
        </div>
      )}

      <button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full py-4 bg-[var(--color-luxury-gold)] text-[#141414] uppercase tracking-[0.2em] font-bold text-sm rounded-lg hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-[#141414] transition-all disabled:opacity-70 flex justify-center items-center gap-2 shadow-xl cursor-pointer"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Processing...</span>
          </>
        ) : (
          <span>Download Instant Brochure</span>
        )}
      </button>

      <div className="flex items-center justify-center gap-2 text-gray-400 dark:text-white/40 text-[11px] pt-2">
        <ShieldCheck className="w-4 h-4 text-[var(--color-luxury-gold)]" />
        <span>MahaRERA: PR1260002501530 • 100% Privacy</span>
      </div>
    </form>
  );
}
