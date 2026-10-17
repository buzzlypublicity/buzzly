'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { motion, type Variants } from 'framer-motion';
import {
  MessageCircle,
  Phone,
  MapPin,
  Sparkles,
  ArrowRight,
  ArrowUpRight,
} from 'lucide-react';

/* ============================================================
   OFFICIAL CONTACT DATA
   ============================================================ */
const PHONE_DISPLAY = '+973 6631 6733';
const PHONE_TEL     = 'tel:+97366316733';
const WHATSAPP_URL  = 'https://wa.me/97366316733';
const MAPS_URL      =
  'https://maps.google.com/?q=Flat+13+Building+1435+Road+504+Block+205+Muharraq+Bahrain';

/* ============================================================
   ANIMATIONS
   ============================================================ */
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
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

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.7,
      delay: 0.15 + i * 0.08,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const contactItemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.7 + i * 0.08,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

/* ============================================================
   MAIN COMPONENT
   ============================================================ */
export function AboutFinalCTA() {
  const t = useTranslations('AboutFinalCTA');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  /* Headline split for stagger */
  const headlineLines = [
    t('headline.line1'),
    t('headline.line2'),
    t('headline.line3'),
  ];

  return (
    <section
      id="about-final-cta"
      className="relative overflow-hidden"
    >
      {/* ============================================================
          FULL-BLEED ORANGE BACKGROUND
         ============================================================ */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, #E97A00 0%, #B04E00 50%, #8C3E00 100%)',
        }}
      />

      {/* Grid overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #FFFFFF 1px, transparent 1px), linear-gradient(to bottom, #FFFFFF 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage:
            'radial-gradient(ellipse 80% 70% at 50% 50%, black 40%, transparent 90%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 80% 70% at 50% 50%, black 40%, transparent 90%)',
        }}
      />

      {/* Floating orbs */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-10 h-[380px] w-[380px] rounded-full bg-white/10 blur-3xl md:h-[500px] md:w-[500px]"
        animate={{
          x: [0, 25, -10, 0],
          y: [0, -18, 10, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -right-32 h-[420px] w-[420px] rounded-full bg-black/20 blur-3xl md:h-[560px] md:w-[560px]"
        animate={{
          x: [0, -22, 14, 0],
          y: [0, 14, -22, 0],
        }}
        transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Center radial glow */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.08] blur-[120px]"
        animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.05, 1] }}
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
        className="relative z-10 mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28 lg:py-32"
      >

        {/* ---------- BADGE ---------- */}
        <motion.div variants={itemVariants} className="flex justify-center">
          <div
            className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white md:text-[11px]"
            style={{
              background: 'rgba(255, 255, 255, 0.12)',
              borderTop: '1px solid rgba(255, 255, 255, 0.25)',
              borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
              backdropFilter: 'blur(12px)',
              boxShadow:
                '0 1px 0 rgba(255,255,255,0.15) inset, 0 4px 12px rgba(0,0,0,0.1)',
            }}
          >
            <motion.span
              animate={{ rotate: [0, 12, -8, 0], scale: [1, 1.12, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Sparkles className="h-3 w-3" strokeWidth={2.5} />
            </motion.span>
            {t('badge')}
          </div>
        </motion.div>

        {/* ---------- HEADLINE ---------- */}
        <h2 className="mt-8 text-center font-display text-[clamp(2.5rem,8vw,7rem)] font-black leading-[0.95] tracking-[-0.045em] text-white md:mt-10">
          {headlineLines.map((line, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={wordVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="block"
            >
              {line}
            </motion.span>
          ))}
        </h2>

        {/* ---------- SUBTITLE ---------- */}
        <motion.p
          variants={itemVariants}
          className="mx-auto mt-7 max-w-2xl text-center text-[14px] leading-relaxed text-white/90 sm:text-[15px] md:mt-9 md:text-base lg:text-lg"
        >
          {t('subtitle')}
        </motion.p>

        {/* ---------- CTA BUTTONS ---------- */}
        <motion.div
          variants={itemVariants}
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4 md:mt-12"
        >
          {/* Primary — WhatsApp (white button) */}
          <motion.a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-white px-6 py-3.5 text-[13px] font-bold text-brand-600 transition-shadow duration-300 sm:w-auto md:px-7 md:py-4 md:text-sm"
            style={{
              boxShadow:
                '0 1px 0 rgba(255,255,255,0.9) inset, 0 8px 24px -6px rgba(0,0,0,0.35), 0 2px 6px rgba(0,0,0,0.15)',
            }}
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -translate-x-full bg-gradient-to-r from-transparent via-brand-500/20 to-transparent transition-transform duration-[600ms] ease-out group-hover:translate-x-[300%]"
            />
            <MessageCircle className="relative h-4 w-4" strokeWidth={2.5} />
            <span className="relative">{t('ctaPrimary')}</span>
            <ArrowRight
              className={`relative h-3.5 w-3.5 transition-transform duration-200 ease-out ${
                isRTL
                  ? 'rotate-180 group-hover:-translate-x-0.5 group-hover:translate-x-0'
                  : 'group-hover:translate-x-0.5'
              }`}
              strokeWidth={2.75}
            />
          </motion.a>

          {/* Secondary — Inquiry (glass outline) */}
          <motion.div
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            className="w-full sm:w-auto"
          >
            <Link
              href="/contact"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[13px] font-semibold text-white transition-colors duration-200 sm:w-auto md:px-7 md:py-4 md:text-sm"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                borderTop: '1px solid rgba(255, 255, 255, 0.3)',
                borderBottom: '1px solid rgba(0, 0, 0, 0.15)',
                backdropFilter: 'blur(12px)',
                boxShadow: '0 1px 0 rgba(255,255,255,0.15) inset',
              }}
            >
              <span>{t('ctaSecondary')}</span>
              <ArrowUpRight
                className={`h-3.5 w-3.5 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                  isRTL ? 'rotate-[-90deg]' : ''
                }`}
                strokeWidth={2.75}
              />
            </Link>
          </motion.div>
        </motion.div>

        {/* ---------- DIVIDER ---------- */}
        <motion.div
          variants={itemVariants}
          className="mx-auto mt-14 flex items-center justify-center gap-3 md:mt-16"
        >
          <span className="h-px w-10 bg-white/30 md:w-16" />
          <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-white/70 md:text-[11px]">
            {t('dividerLabel')}
          </span>
          <span className="h-px w-10 bg-white/30 md:w-16" />
        </motion.div>

        {/* ---------- CONTACT STRIP ---------- */}
        <div className="mt-8 grid gap-3 sm:grid-cols-2 md:mt-10 md:gap-4 lg:mx-auto lg:max-w-2xl">
          {/* Phone */}
          <motion.a
            href={PHONE_TEL}
            custom={0}
            variants={contactItemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ y: -3 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            className="group relative flex items-center gap-3.5 rounded-2xl p-4 text-start transition-colors duration-300"
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              borderTop: '1px solid rgba(255, 255, 255, 0.2)',
              borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
              backdropFilter: 'blur(12px)',
              boxShadow: '0 1px 0 rgba(255,255,255,0.1) inset',
            }}
          >
            {/* Icon */}
            <span
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white"
              style={{
                background: 'rgba(255, 255, 255, 0.15)',
                borderTop: '1px solid rgba(255, 255, 255, 0.25)',
              }}
            >
              <Phone className="h-4 w-4" strokeWidth={2.25} />
            </span>

            {/* Text */}
            <div className="min-w-0 flex-1">
              <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/70 md:text-[10px]">
                {t('contact.phoneLabel')}
              </p>
              <p className="mt-0.5 text-[13px] font-semibold text-white md:text-sm">
                {PHONE_DISPLAY}
              </p>
            </div>

            {/* Arrow */}
            <ArrowUpRight
              className={`h-3.5 w-3.5 shrink-0 text-white/40 transition-all duration-300 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                isRTL ? 'rotate-[-90deg]' : ''
              }`}
              strokeWidth={2.5}
            />
          </motion.a>

          {/* Address */}
          <motion.a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            custom={1}
            variants={contactItemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ y: -3 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            className="group relative flex items-center gap-3.5 rounded-2xl p-4 text-start transition-colors duration-300"
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              borderTop: '1px solid rgba(255, 255, 255, 0.2)',
              borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
              backdropFilter: 'blur(12px)',
              boxShadow: '0 1px 0 rgba(255,255,255,0.1) inset',
            }}
          >
            {/* Icon */}
            <span
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white"
              style={{
                background: 'rgba(255, 255, 255, 0.15)',
                borderTop: '1px solid rgba(255, 255, 255, 0.25)',
              }}
            >
              <MapPin className="h-4 w-4" strokeWidth={2.25} />
            </span>

            {/* Text */}
            <div className="min-w-0 flex-1">
              <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/70 md:text-[10px]">
                {t('contact.addressLabel')}
              </p>
              <p className="mt-0.5 text-[13px] font-semibold text-white md:text-sm">
                {t('contact.addressValue')}
              </p>
            </div>

            {/* Arrow */}
            <ArrowUpRight
              className={`h-3.5 w-3.5 shrink-0 text-white/40 transition-all duration-300 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                isRTL ? 'rotate-[-90deg]' : ''
              }`}
              strokeWidth={2.5}
            />
          </motion.a>
        </div>

        {/* ---------- BOTTOM NOTE ---------- */}
        <motion.p
          variants={itemVariants}
          className="mt-10 text-center text-[10px] font-semibold uppercase tracking-[0.18em] text-white/60 md:mt-12 md:text-[11px]"
        >
          {t('bottomNote')}
        </motion.p>
      </motion.div>
    </section>
  );
}