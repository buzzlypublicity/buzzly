'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { motion, type Variants } from 'framer-motion';
import {
  Sparkles,
  ArrowRight,
  Play,
  Star,
  TrendingUp,
  Globe2,
  CheckCircle2,
} from 'lucide-react';

/* ============================================================
   ANIMATION VARIANTS
   ============================================================ */

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const statVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/* ============================================================
   HERO COMPONENT
   ============================================================ */

export function Hero() {
  const t = useTranslations('Hero');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const stats = [
    { icon: TrendingUp, value: '250+', label: t('stats.campaigns') },
    { icon: Star,       value: '4.9',  label: t('stats.rating')    },
    { icon: Globe2,     value: '12',   label: t('stats.countries') },
  ];

  return (
    <section
      id="home"
      className="relative flex min-h-[calc(100vh-72px)] items-center justify-center overflow-hidden bg-background"
    >
      {/* ============================================================
          BACKGROUND — orbs (with framer-motion infinite float)
         ============================================================ */}

      {/* Orange orb — top left */}
      <motion.div
        aria-hidden
        className="orb-brand pointer-events-none absolute -left-32 -top-32 h-[400px] w-[400px] rounded-full blur-3xl md:h-[520px] md:w-[520px]"
        animate={{
          x: [0, 30, -10, 0],
          y: [0, -20, 10, 0],
          scale: [1, 1.05, 0.98, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Teal orb — bottom right */}
      <motion.div
        aria-hidden
        className="orb-teal pointer-events-none absolute -bottom-40 -right-32 h-[420px] w-[420px] rounded-full blur-3xl md:h-[560px] md:w-[560px]"
        animate={{
          x: [0, -25, 15, 0],
          y: [0, 15, -25, 0],
          scale: [1, 0.95, 1.05, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Center glow pulse */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500/[0.07] blur-[120px] md:h-[600px] md:w-[900px]"
        animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.08, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Grid pattern */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 text-foreground opacity-[0.05] dark:opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage:
            'radial-gradient(ellipse 80% 60% at 50% 40%, black 30%, transparent 80%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 80% 60% at 50% 40%, black 30%, transparent 80%)',
        }}
      />

      {/* ============================================================
          CONTENT
         ============================================================ */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto w-full max-w-5xl px-5 py-16 text-center md:px-8 md:py-24"
      >

        {/* ---------- BADGE ---------- */}
        <motion.div variants={itemVariants} className="inline-block">
          <motion.div
            className="neu-inset inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-500 md:text-xs"
            animate={{
              boxShadow: [
                'inset 4px 4px 12px var(--neu-shadow-dark), inset -4px -4px 12px var(--neu-shadow-light)',
                'inset 3px 3px 10px var(--neu-shadow-dark), inset -3px -3px 10px var(--neu-shadow-light)',
                'inset 4px 4px 12px var(--neu-shadow-dark), inset -4px -4px 12px var(--neu-shadow-light)',
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <motion.span
              animate={{ rotate: [0, 15, -10, 0], scale: [1, 1.15, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Sparkles className="h-3.5 w-3.5" strokeWidth={2.5} />
            </motion.span>
            <span>{t('badge')}</span>
          </motion.div>
        </motion.div>

        {/* ---------- HEADLINE ---------- */}
        <motion.h1
          variants={itemVariants}
          className="mt-8 font-display text-4xl font-black leading-[1.05] tracking-tight text-foreground sm:text-5xl md:mt-10 md:text-6xl lg:text-7xl xl:text-[5.5rem]"
        >
          <span className="block">{t('titleLine1')}</span>
          <motion.span
            className="text-gradient-animated mt-1 block"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {t('titleLine2')}
          </motion.span>
        </motion.h1>

        {/* ---------- SUBTITLE ---------- */}
        <motion.p
          variants={itemVariants}
          className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-muted sm:text-base md:mt-8 md:text-lg lg:text-xl"
        >
          {t('subtitle')}
        </motion.p>

        {/* ---------- CTA BUTTONS ---------- */}
        <motion.div
          variants={itemVariants}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4 md:mt-12"
        >
          {/* Primary */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            className="w-full sm:w-auto"
          >
            <Link
              href="/contact"
              className="neu-brand neu-brand-hover group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl px-6 py-3.5 text-sm font-bold text-white sm:w-auto md:px-7 md:py-4 md:text-base"
            >
              {/* Shine sweep (infinite, subtle) */}
              <motion.span
                aria-hidden
                className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                animate={{ x: ['-100%', '300%'] }}
                transition={{
                  duration: 3.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  repeatDelay: 1.5,
                }}
              />
              <span className="relative">{t('ctaPrimary')}</span>
              <ArrowRight
                className={`relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 ${
                  isRTL ? 'rotate-180 group-hover:-translate-x-1 group-hover:translate-x-0' : ''
                }`}
                strokeWidth={2.75}
              />
            </Link>
          </motion.div>

          {/* Secondary */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            className="w-full sm:w-auto"
          >
            <button
              type="button"
              className="neu-raised neu-raised-hover group inline-flex w-full items-center justify-center gap-3 rounded-2xl px-6 py-3.5 text-sm font-semibold text-foreground sm:w-auto md:px-7 md:py-4 md:text-base"
            >
              <span className="relative flex h-7 w-7 items-center justify-center rounded-full bg-brand-500/15 ring-1 ring-brand-500/40 transition-all duration-300 group-hover:bg-brand-500 group-hover:ring-brand-500">
                <Play
                  className={`h-3 w-3 fill-brand-500 text-brand-500 transition-colors duration-300 group-hover:fill-white group-hover:text-white ${
                    isRTL ? 'rotate-180' : ''
                  }`}
                  strokeWidth={2.5}
                />
              </span>
              <span className="relative">{t('ctaSecondary')}</span>
            </button>
          </motion.div>
        </motion.div>

        {/* ---------- TRUST STATS ---------- */}
        <motion.div
          variants={containerVariants}
          className="mt-14 flex flex-wrap items-center justify-center gap-3 md:mt-16 md:gap-5"
        >
          {stats.map(({ icon: Icon, value, label }) => (
            <motion.div
              key={label}
              variants={statVariants}
              whileHover={{ y: -4, scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              className="neu-raised neu-raised-hover group flex items-center gap-3 rounded-2xl px-4 py-3 md:gap-4 md:px-5 md:py-4"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500/10 text-brand-500 transition-colors duration-300 group-hover:bg-brand-500 group-hover:text-white md:h-10 md:w-10">
                <Icon className="h-4 w-4 md:h-[18px] md:w-[18px]" strokeWidth={2.25} />
              </span>
              <span className="flex flex-col items-start text-start leading-none">
                <span className="font-display text-lg font-black text-foreground md:text-xl">
                  {value}
                </span>
                <span className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-muted md:text-[11px]">
                  {label}
                </span>
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* ---------- MICRO TRUST LINE ---------- */}
        <motion.div
          variants={itemVariants}
          className="mt-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11px] font-medium text-muted md:gap-x-6 md:text-xs"
        >
          {[
            t('trust.noContract'),
            t('trust.fastDelivery'),
            t('trust.bilingual'),
          ].map((item, i) => (
            <motion.span
              key={i}
              className="inline-flex items-center gap-1.5"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 + i * 0.1, duration: 0.5 }}
            >
              <CheckCircle2 className="h-3.5 w-3.5 text-accent-500" strokeWidth={2.5} />
              {item}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}