'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSearchParams } from 'next/navigation';
import { submitLead } from '@/app/actions/submit-lead';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^\d{10}$/, 'Phone must be exactly 10 digits'),
  configuration: z.enum(['2BHK', '3BHK', 'Duplex', 'Undecided']),
});

type FormData = z.infer<typeof formSchema>;

export default function ContactFormInline() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{ success: boolean; message: string } | null>(null);
  const searchParams = useSearchParams();

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      configuration: 'Undecided'
    }
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitResult(null);
    
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    if (searchParams) {
      if (searchParams.get('utm_source')) formData.append('utm_source', searchParams.get('utm_source')!);
      if (searchParams.get('utm_medium')) formData.append('utm_medium', searchParams.get('utm_medium')!);
      if (searchParams.get('utm_campaign')) formData.append('utm_campaign', searchParams.get('utm_campaign')!);
    }

    const result = await submitLead(null, formData);
    setIsSubmitting(false);
    
    if (result.success) {
      setSubmitResult({ success: true, message: result.message || 'Success' });
    } else {
      setSubmitResult({ success: false, message: result.message || 'Validation failed' });
    }
  };

  if (submitResult?.success) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[var(--color-luxury-sand)] p-6 rounded-lg text-center border border-[var(--color-luxury-gold)]/30"
      >
        <h3 className="text-[var(--color-luxury-gold)] font-serif text-xl mb-2">Thank You</h3>
        <p className="text-gray-600 text-sm leading-relaxed">{submitResult.message}</p>
        <p className="text-xs text-gray-400 mt-4">A consultant will connect with you shortly.</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2 font-medium">Full Name</label>
        <input 
          {...register('name')} 
          className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-[var(--color-luxury-gold)] transition-colors text-[var(--color-luxury-charcoal)] placeholder-gray-300"
          placeholder="e.g. Anand Mahindra"
        />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2 font-medium">Email Address</label>
        <input 
          {...register('email')} 
          type="email"
          className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-[var(--color-luxury-gold)] transition-colors text-[var(--color-luxury-charcoal)] placeholder-gray-300"
          placeholder="anand@example.com"
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2 font-medium">Phone Number</label>
        <div className="flex gap-2">
          <span className="border-b border-gray-300 py-2 text-gray-500">+91</span>
          <input 
            {...register('phone')} 
            className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-[var(--color-luxury-gold)] transition-colors text-[var(--color-luxury-charcoal)] placeholder-gray-300"
            placeholder="9876543210"
          />
        </div>
        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
      </div>

      <div>
        <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2 font-medium">Interested Configuration</label>
        <select 
          {...register('configuration')}
          className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-[var(--color-luxury-gold)] transition-colors text-[var(--color-luxury-charcoal)] bg-transparent"
        >
          <option value="Undecided">Undecided / Exploring</option>
          <option value="2BHK">2 BHK Premium Deck</option>
          <option value="3BHK">3 BHK Ultra-Luxury</option>
          <option value="Duplex">Penthouse Duplex</option>
        </select>
      </div>

      {submitResult?.success === false && (
        <p className="text-red-500 text-sm mt-4">{submitResult.message}</p>
      )}

      <button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full py-4 mt-8 bg-[var(--color-luxury-gold)] text-white tracking-widest uppercase font-semibold text-sm hover:bg-[var(--color-luxury-charcoal)] transition-colors disabled:opacity-70 flex justify-center items-center gap-2 shadow-xl"
      >
        {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
        {isSubmitting ? 'Submitting...' : 'Download Brochure'}
      </button>
      <p className="text-[10px] text-gray-400 text-center mt-4 uppercase tracking-wider">
        Your details are securely encrypted. No spam.
      </p>
    </form>
  );
}
