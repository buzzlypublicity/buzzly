'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { motion, type Variants } from 'framer-motion';
import {
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  Info,
  Check,
} from 'lucide-react';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
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

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

export function WorkHero() {
  const t = useTranslations('WorkHero');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const trustBullets = [
    t('disclaimer.bullets.0'),
    t('disclaimer.bullets.1'),
    t('disclaimer.bullets.2'),
  ];

  return (
    <section
      id="work-hero"
      className="relative overflow-hidden bg-background py-16 md:py-24 lg:py-28"
    >
      {/* Orbs */}
      <div className="pointer-events-none absolute -left-40 top-10 h-[380px] w-[380px] rounded-full orb-brand blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-[380px] w-[380px] rounded-full orb-teal blur-3xl" />

      {/* Grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 text-foreground opacity-[0.04] dark:opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage:
            'radial-gradient(ellipse 80% 70% at 50% 40%, black 30%, transparent 90%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 80% 70% at 50% 40%, black 30%, transparent 90%)',
        }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative mx-auto max-w-7xl px-5 md:px-8"
      >
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">

          {/* ============================================================
              LEFT — HEADLINE
             ============================================================ */}
          <div className="lg:col-span-7">

            {/* Badge */}
            <motion.div variants={itemVariants} className="inline-flex">
              <div className="skeu-badge inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-500 md:text-[11px]">
                <Sparkles className="h-3 w-3" strokeWidth={2.5} />
                {t('badge')}
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="mt-6 font-display text-[clamp(2.25rem,7vw,4.5rem)] font-black leading-[1.02] tracking-[-0.04em] text-foreground md:mt-7"
            >
              <span className="block">{t('headline.line1')}</span>
              <span className="block">{t('headline.line2')}</span>
              <span className="text-gradient-animated mt-1 block">
                {t('headline.line3')}
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="mt-5 max-w-xl text-[14px] leading-relaxed text-muted md:mt-6 md:text-[15px]"
            >
              {t('subtitle')}
            </motion.p>

            {/* CTA */}
            <motion.div
              variants={itemVariants}
              className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center md:mt-10"
            >
              <Link
                href="#concepts"
                className="skeu-btn group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3 text-[13px] font-bold md:text-sm"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-[600ms] ease-out group-hover:translate-x-[300%]"
                />
                <span className="relative">{t('ctaPrimary')}</span>
                <ArrowRight
                  className={`relative h-3.5 w-3.5 transition-transform duration-200 ease-out ${
                    isRTL
                      ? 'rotate-180 group-hover:-translate-x-0.5 group-hover:translate-x-0'
                      : 'group-hover:translate-x-0.5'
                  }`}
                  strokeWidth={2.75}
                />
              </Link>

              <Link
                href="/contact"
                className="skeu-btn-secondary group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[13px] font-semibold md:text-sm"
              >
                <span>{t('ctaSecondary')}</span>
                <ArrowUpRight
                  className={`h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                    isRTL ? 'rotate-[-90deg]' : ''
                  }`}
                  strokeWidth={2.75}
                />
              </Link>
            </motion.div>
          </div>

          {/* ============================================================
              RIGHT — TRANSPARENCY CARD
             ============================================================ */}
          <motion.div variants={cardVariants} className="lg:col-span-5">
            <div className="skeu-panel relative overflow-hidden rounded-3xl p-6 md:p-7">

              {/* Corner glow */}
              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-brand-500/15 blur-3xl"
              />

              {/* Header */}
              <div className="relative flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/12 text-brand-500 md:h-11 md:w-11">
                  <Info className="h-5 w-5" strokeWidth={2.25} />
                </span>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-500 md:text-[11px]">
                    {t('disclaimer.label')}
                  </p>
                  <p className="mt-0.5 text-[11px] font-medium text-muted md:text-xs">
                    {t('disclaimer.subLabel')}
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="relative mt-5 text-[13px] leading-relaxed text-foreground/80 md:text-sm">
                {t('disclaimer.description')}
              </p>

              {/* Bullets */}
              <ul className="relative mt-5 space-y-2.5 border-t border-border/40 pt-5">
                {trustBullets.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brand-500/12 text-brand-500">
                      <Check className="h-2.5 w-2.5" strokeWidth={3.5} />
                    </span>
                    <span className="text-[12px] leading-relaxed text-muted md:text-[13px]">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}