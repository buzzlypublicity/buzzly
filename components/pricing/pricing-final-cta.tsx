'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion, type Variants } from 'framer-motion';
import { Link } from '@/i18n/navigation';
import {
  MessageCircle,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Clock,
  CheckCircle2,
} from 'lucide-react';

/* ============================================================
   ANIMATIONS
   ============================================================ */
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export function PricingFinalCTA() {
  const t = useTranslations('PricingFinalCTA');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  return (
    <section className="relative overflow-hidden bg-ink-950 py-20 md:py-28 lg:py-32">
      
      {/* ============================================================
          BACKGROUND ELEMENTS (Dark Cinematic)
         ============================================================ */}
      
      {/* Orange Orb - Top Left */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-0 h-[400px] w-[400px] rounded-full bg-brand-500/20 blur-3xl md:h-[600px] md:w-[600px]"
        animate={{
          x: [0, 30, -10, 0],
          y: [0, -20, 10, 0],
          scale: [1, 1.05, 0.98, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Teal Orb - Bottom Right */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -right-40 h-[400px] w-[400px] rounded-full bg-accent-500/15 blur-3xl md:h-[600px] md:w-[600px]"
        animate={{
          x: [0, -25, 15, 0],
          y: [0, 15, -25, 0],
          scale: [1, 0.95, 1.05, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Grid Pattern */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #FFFFFF 1px, transparent 1px), linear-gradient(to bottom, #FFFFFF 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage:
            'radial-gradient(ellipse 80% 70% at 50% 50%, black 40%, transparent 90%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 80% 70% at 50% 50%, black 40%, transparent 90%)',
        }}
      />

      {/* Center Glow */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500/10 blur-[120px]"
        animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* ============================================================
          CONTENT
         ============================================================ */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="relative z-10 mx-auto max-w-4xl px-5 text-center md:px-8"
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white/80 backdrop-blur-md md:text-[11px]">
            <Sparkles className="h-3 w-3 text-brand-500" strokeWidth={2.5} />
            {t('badge')}
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h2
          variants={itemVariants}
          className="mt-6 font-display text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl md:mt-8 md:text-6xl lg:text-7xl"
        >
          <span className="block">{t('headline.line1')}</span>
          <span className="mt-1 block bg-gradient-to-r from-brand-300 via-brand-500 to-brand-300 bg-clip-text text-transparent">
            {t('headline.line2')}
          </span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="mx-auto mt-6 max-w-2xl text-[14px] leading-relaxed text-ink-300 sm:text-[15px] md:mt-8 md:text-lg"
        >
          {t('subtitle')}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4 md:mt-12"
        >
          {/* Primary — WhatsApp */}
          <motion.a
            href="https://wa.me/97366316733"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-brand-500 px-8 py-4 text-[14px] font-bold text-white shadow-lg shadow-brand-500/25 transition-all duration-300 hover:bg-brand-600 hover:shadow-xl hover:shadow-brand-500/40 sm:w-auto md:text-base"
          >
            {/* Shine sweep */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-[600ms] ease-out group-hover:translate-x-[300%]"
            />
            <MessageCircle className="relative h-5 w-5" strokeWidth={2.5} />
            <span className="relative">{t('ctaPrimary')}</span>
            <ArrowRight
              className={`relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 ${
                isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''
              }`}
              strokeWidth={2.5}
            />
          </motion.a>

          {/* Secondary — Inquiry Form */}
          <motion.div
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="w-full sm:w-auto"
          >
            <Link
              href="/contact"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-[14px] font-semibold text-white backdrop-blur-md transition-all duration-300 hover:border-brand-500/50 hover:bg-white/10 sm:w-auto md:text-base"
            >
              <span>{t('ctaSecondary')}</span>
              <ArrowRight
                className={`h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 ${
                  isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''
                }`}
                strokeWidth={2.5}
              />
            </Link>
          </motion.div>
        </motion.div>

        {/* Trust Bar */}
        <motion.div
          variants={itemVariants}
          className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 border-t border-white/10 pt-8 md:mt-16 md:gap-x-12"
        >
          {[
            { icon: ShieldCheck, text: t('trust.noHidden') },
            { icon: CheckCircle2, text: t('trust.noLockIn') },
            { icon: Clock, text: t('trust.response') },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <item.icon className="h-4 w-4 text-brand-500 md:h-5 md:w-5" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-white/70 md:text-[12px]">
                {item.text}
              </span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}