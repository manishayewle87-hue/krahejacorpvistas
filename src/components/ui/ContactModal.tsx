'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, CheckCircle2, ShieldCheck, PhoneCall, Sparkles } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { submitLead } from '@/app/actions/submit-lead';

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

export default function ContactModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{ success: boolean; message: string } | null>(null);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormInput>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      configuration: 'Undecided',
    },
  });

  // Mount check for Portal
  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll and handle Escape key when modal is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      const timer = setTimeout(() => {
        reset();
        setSubmitResult(null);
        setIsSubmitting(false);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose, reset]);

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
        message: result.message || 'Thank you for registering. Our luxury property advisor will connect with you shortly.',
      });
    } else {
      setSubmitResult({
        success: false,
        message: result.message || 'Unable to submit enquiry. Please try again.',
      });
    }
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[999999] flex justify-end items-stretch overflow-hidden" style={{ zIndex: 999999 }}>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
            style={{ zIndex: 999998 }}
            aria-hidden="true"
          />

          {/* Sliding Drawer Container */}
          <motion.div
            initial={{ x: '100%', opacity: 0.5 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            className="relative w-full max-w-lg bg-[#141414] text-white border-l border-white/10 shadow-2xl flex flex-col h-full max-h-screen overflow-y-auto"
            style={{ zIndex: 999999 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            {/* Modal Header */}
            <div className="sticky top-0 z-20 bg-[#141414]/95 backdrop-blur-md px-8 py-6 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2 text-[var(--color-luxury-gold)]">
                <Sparkles className="w-4 h-4" />
                <span className="text-xs uppercase tracking-[0.25em] font-semibold">Private Preview</span>
              </div>
              <button
                onClick={onClose}
                aria-label="Close modal"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[var(--color-luxury-gold)] text-white/70 hover:text-white flex items-center justify-center transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-8 md:p-10 flex-1">
              <div className="mb-8">
                <h2 id="modal-headline" className="text-3xl font-serif text-[var(--color-luxury-pearl)] mb-3 leading-tight font-normal">
                  Experience K Raheja Vistas
                </h2>
                <p className="text-white/60 text-sm leading-relaxed">
                  Register your interest for priority floor plan previews, pricing sheets, and curated VIP site visits at Baner Annexe, Mahalunge.
                </p>
              </div>

              {submitResult?.success ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white/5 border border-[var(--color-luxury-gold)]/40 p-8 rounded-2xl text-center backdrop-blur-sm"
                >
                  <div className="w-14 h-14 bg-[var(--color-luxury-gold)]/20 text-[var(--color-luxury-gold)] rounded-full flex items-center justify-center mx-auto mb-5">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-serif text-[var(--color-luxury-pearl)] mb-3">Enquiry Received</h3>
                  <p className="text-white/70 text-sm leading-relaxed mb-6">
                    {submitResult.message}
                  </p>
                  <div className="bg-white/5 p-4 rounded-xl text-xs text-white/60 mb-6 flex items-center justify-center gap-2">
                    <PhoneCall className="w-4 h-4 text-[var(--color-luxury-gold)]" />
                    <span>Direct Desk: +91 77440 09295</span>
                  </div>
                  <button
                    onClick={onClose}
                    className="w-full py-4 bg-[var(--color-luxury-gold)] text-[#141414] text-xs uppercase tracking-[0.2em] font-bold rounded-lg hover:bg-white transition-all shadow-lg cursor-pointer"
                  >
                    Back to Project
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-white/70 mb-2 font-medium">
                      Full Name <span className="text-[var(--color-luxury-gold)]">*</span>
                    </label>
                    <input
                      {...register('name')}
                      type="text"
                      className="w-full bg-white/5 border border-white/15 focus:border-[var(--color-luxury-gold)] rounded-lg px-4 py-3.5 text-white placeholder-white/30 focus:outline-none transition-all text-sm"
                      placeholder="e.g. Rahul Sharma"
                    />
                    {errors.name && <p className="text-red-400 text-xs mt-1.5">{errors.name.message}</p>}
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-white/70 mb-2 font-medium">
                      Phone Number <span className="text-[var(--color-luxury-gold)]">*</span>
                    </label>
                    <div className="flex gap-2">
                      <span className="bg-white/5 border border-white/15 rounded-lg px-3.5 py-3.5 text-white/70 text-sm flex items-center font-medium">
                        +91
                      </span>
                      <input
                        {...register('phone')}
                        type="tel"
                        maxLength={10}
                        className="flex-1 bg-white/5 border border-white/15 focus:border-[var(--color-luxury-gold)] rounded-lg px-4 py-3.5 text-white placeholder-white/30 focus:outline-none transition-all text-sm"
                        placeholder="9876543210"
                      />
                    </div>
                    {errors.phone && <p className="text-red-400 text-xs mt-1.5">{errors.phone.message}</p>}
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-white/70 mb-2 font-medium">
                      Email Address (Optional)
                    </label>
                    <input
                      {...register('email')}
                      type="email"
                      className="w-full bg-white/5 border border-white/15 focus:border-[var(--color-luxury-gold)] rounded-lg px-4 py-3.5 text-white placeholder-white/30 focus:outline-none transition-all text-sm"
                      placeholder="rahul@example.com"
                    />
                    {errors.email && <p className="text-red-400 text-xs mt-1.5">{errors.email.message}</p>}
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-white/70 mb-2 font-medium">
                      Preferred Configuration
                    </label>
                    <select
                      {...register('configuration')}
                      className="w-full bg-[#1b1b1b] border border-white/15 focus:border-[var(--color-luxury-gold)] rounded-lg px-4 py-3.5 text-white focus:outline-none transition-all text-sm"
                    >
                      <option value="Undecided">Undecided / Exploring Options</option>
                      <option value="2BHK">2 BHK Premium Deck Residence (780 sq.ft.)</option>
                      <option value="3BHK">3 BHK Ultra-Luxury Residence (1,150 sq.ft.)</option>
                      <option value="4BHK">4 BHK Palatial Residence (1,650 sq.ft.)</option>
                      <option value="Duplex">Signature Sky Penthouse / Duplex (2,400+ sq.ft.)</option>
                    </select>
                  </div>

                  {submitResult?.success === false && (
                    <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-xs">
                      {submitResult.message}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-[var(--color-luxury-gold)] text-[#141414] uppercase tracking-[0.2em] font-bold text-sm rounded-lg hover:bg-white transition-all disabled:opacity-60 flex justify-center items-center gap-2 shadow-xl cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <span>Request Instant Callback</span>
                    )}
                  </button>

                  <div className="pt-4 flex items-center justify-center gap-2 text-white/40 text-[11px]">
                    <ShieldCheck className="w-4 h-4 text-[var(--color-luxury-gold)]" />
                    <span>MahaRERA PR1260002501530 • 100% Privacy Guaranteed</span>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
