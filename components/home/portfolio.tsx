'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import {
  TrendingUp,
  Clapperboard,
  Palette,
  Code,
  ArrowRight,
  ArrowLeft,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';

/* ============================================================
   PORTFOLIO DATA — categories (no fake clients)
   ============================================================ */
const PROJECTS = [
  { key: 'marketing', number: '01', icon: TrendingUp,   accent: 'brand'  },
  { key: 'video',     number: '02', icon: Clapperboard, accent: 'accent' },
  { key: 'branding',  number: '03', icon: Palette,      accent: 'brand'  },
  { key: 'web',       number: '04', icon: Code,         accent: 'accent' },
] as const;

/* ============================================================
   ANIMATIONS
   ============================================================ */
const headerVariants: Variants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ============================================================
   COMPONENT
   ============================================================ */
export function Portfolio() {
  const t = useTranslations('Portfolio');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');

  const goNext = () => {
    if (activeIndex >= PROJECTS.length - 1) return;
    setDirection('next');
    setActiveIndex((i) => i + 1);
  };

  const goPrev = () => {
    if (activeIndex <= 0) return;
    setDirection('prev');
    setActiveIndex((i) => i - 1);
  };

  const goTo = (i: number) => {
    setDirection(i > activeIndex ? 'next' : 'prev');
    setActiveIndex(i);
  };

  const active = PROJECTS[activeIndex];
  const ActiveIcon = active.icon;
  const isAccent = active.accent === 'accent';

  return (
    <section
      id="work"
      className="relative overflow-hidden bg-background py-20 md:py-28 lg:py-32"
    >
      {/* Ambient glows */}
      <div className="pointer-events-none absolute -left-40 top-1/4 h-[420px] w-[420px] rounded-full orb-brand blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-1/4 h-[420px] w-[420px] rounded-full orb-teal blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">

        {/* ============================================================
            HEADER
           ============================================================ */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between"
        >
          {/* Left — title */}
          <div className="max-w-2xl">
            <div className="neu-inset inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-500 md:text-[11px]">
              <Sparkles className="h-3 w-3" strokeWidth={2.5} />
              {t('badge')}
            </div>

            <h2 className="mt-5 font-display text-4xl font-black leading-[1.05] tracking-tight text-foreground sm:text-5xl md:mt-6 md:text-6xl">
              {t('title')}
            </h2>

            <p className="mt-5 max-w-lg text-sm leading-relaxed text-muted md:mt-6 md:text-base">
              {t('subtitle')}
            </p>
          </div>

          {/* Right — counter + progress */}
          <div className="flex w-full max-w-xs flex-col gap-4 md:w-auto md:min-w-[220px]">
            {/* Counter */}
            <div className="flex items-baseline gap-2 font-display">
              <AnimatePresence mode="wait">
                <motion.span
                  key={activeIndex}
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="text-4xl font-black text-brand-500 md:text-5xl"
                >
                  {String(activeIndex + 1).padStart(2, '0')}
                </motion.span>
              </AnimatePresence>
              <span className="text-base font-bold text-muted md:text-lg">
                / {String(PROJECTS.length).padStart(2, '0')}
              </span>
            </div>

            {/* Progress bar */}
            <div className="relative h-[3px] w-full overflow-hidden rounded-full bg-border/60">
              <motion.div
                className="absolute inset-y-0 start-0 rounded-full bg-brand-500"
                animate={{
                  width: `${((activeIndex + 1) / PROJECTS.length) * 100}%`,
                }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>

            {/* Nav buttons (desktop) */}
            <div className="hidden items-center gap-2 md:flex">
              <button
                type="button"
                onClick={isRTL ? goNext : goPrev}
                disabled={isRTL ? activeIndex === PROJECTS.length - 1 : activeIndex === 0}
                aria-label={t('nav.prev')}
                className="neu-raised neu-raised-hover flex h-11 w-11 items-center justify-center rounded-full text-foreground transition-opacity disabled:cursor-not-allowed disabled:opacity-30"
              >
                <ArrowLeft className="h-4 w-4" strokeWidth={2.5} />
              </button>

              <button
                type="button"
                onClick={isRTL ? goPrev : goNext}
                disabled={isRTL ? activeIndex === 0 : activeIndex === PROJECTS.length - 1}
                aria-label={t('nav.next')}
                className="neu-brand neu-brand-hover flex h-11 w-11 items-center justify-center rounded-full text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-30"
              >
                <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* ============================================================
            MAIN CARD STAGE — Reel
           ============================================================ */}
        <div className="relative mt-12 md:mt-16">

          {/* Peek cards behind (decorative, desktop only) */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-12 top-6 hidden h-full opacity-40 md:block lg:inset-x-20"
          >
            <div className="neu-raised h-[440px] rounded-[36px] lg:h-[480px]" />
          </div>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-6 top-3 hidden h-full opacity-60 md:block lg:inset-x-12"
          >
            <div className="neu-raised h-[440px] rounded-[36px] lg:h-[480px]" />
          </div>

          {/* Active card stage */}
          <div className="relative">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.article
                key={active.key}
                custom={direction}
                initial={{
                  opacity: 0,
                  x: direction === 'next' ? (isRTL ? -80 : 80) : (isRTL ? 80 : -80),
                  scale: 0.95,
                }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{
                  opacity: 0,
                  x: direction === 'next' ? (isRTL ? 80 : -80) : (isRTL ? -80 : 80),
                  scale: 0.95,
                }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="neu-raised relative overflow-hidden rounded-[36px]"
              >
                {/* Glow overlay */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background: isAccent
                      ? 'radial-gradient(circle at 85% 15%, rgba(20,184,166,0.16), transparent 55%)'
                      : 'radial-gradient(circle at 85% 15%, rgba(233,122,0,0.16), transparent 55%)',
                  }}
                />

                {/* Grid inside card */}
                <div className="relative grid min-h-[440px] gap-8 p-6 sm:p-8 md:min-h-[480px] md:grid-cols-12 md:gap-10 md:p-10 lg:p-14">

                  {/* ============================================================
                      LEFT (Desktop) / TOP (Mobile) — Meta
                     ============================================================ */}
                  <div className="flex flex-col justify-between md:col-span-5">
                    <div>
                      {/* Number + category tag */}
                      <div className="flex items-center gap-3">
                        <span
                          className={`font-display text-xs font-bold tracking-[0.3em] ${
                            isAccent ? 'text-accent-500' : 'text-brand-500'
                          }`}
                        >
                          {active.number}
                        </span>
                        <span className="h-1 w-1 rounded-full bg-muted/40" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted md:text-[11px]">
                          {t(`items.${active.key}.tag`)}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="mt-5 font-display text-3xl font-black leading-[1.05] tracking-tight text-foreground sm:text-4xl md:mt-6 md:text-5xl lg:text-6xl">
                        {t(`items.${active.key}.title`)}
                      </h3>

                      {/* Description */}
                      <p className="mt-5 max-w-md text-sm leading-relaxed text-muted md:mt-6 md:text-base">
                        {t(`items.${active.key}.description`)}
                      </p>
                    </div>

                    {/* CTA (desktop — inside left column) */}
                    <div className="mt-8 hidden md:block">
                      <Link
                        href="/work"
                        className={`group/cta inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white transition-all duration-300 ${
                          isAccent
                            ? 'bg-accent-500 hover:bg-accent-600'
                            : 'bg-brand-500 hover:bg-brand-600'
                        }`}
                        style={{
                          boxShadow: isAccent
                            ? '0 4px 14px 0 rgba(20,184,166,0.25)'
                            : '0 4px 14px 0 rgba(233,122,0,0.25)',
                        }}
                      >
                        <span>{t('viewProject')}</span>
                        <ArrowUpRight
                          className={`h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5 ${
                            isRTL ? 'rotate-[-90deg]' : ''
                          }`}
                          strokeWidth={2.5}
                        />
                      </Link>
                    </div>
                  </div>

                  {/* ============================================================
                      RIGHT — Visual / Icon Showcase
                     ============================================================ */}
                  <div className="flex items-center justify-center md:col-span-7 md:justify-end">
                    <div className="relative w-full max-w-md">
                      {/* Big icon stage */}
                      <motion.div
                        initial={{ rotate: -4 }}
                        animate={{ rotate: 0 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className={`neu-raised relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-[32px] ${
                          isAccent ? 'text-accent-500' : 'text-brand-500'
                        }`}
                      >
                        {/* Icon background glow */}
                        <div
                          aria-hidden
                          className="pointer-events-none absolute inset-0"
                          style={{
                            background: isAccent
                              ? 'radial-gradient(circle at 50% 50%, rgba(20,184,166,0.22), transparent 65%)'
                              : 'radial-gradient(circle at 50% 50%, rgba(233,122,0,0.22), transparent 65%)',
                          }}
                        />

                        {/* Pulse rings */}
                        <motion.span
                          aria-hidden
                          className={`absolute h-32 w-32 rounded-full ${
                            isAccent ? 'bg-accent-500/10' : 'bg-brand-500/10'
                          }`}
                          animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
                          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                        />
                        <motion.span
                          aria-hidden
                          className={`absolute h-32 w-32 rounded-full ${
                            isAccent ? 'bg-accent-500/10' : 'bg-brand-500/10'
                          }`}
                          animate={{ scale: [1, 2.4, 1], opacity: [0.3, 0, 0.3] }}
                          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
                        />

                        {/* Icon */}
                        <motion.div
                          initial={{ scale: 0.7, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                          className="relative"
                        >
                          <ActiveIcon
                            className="h-20 w-20 md:h-24 md:w-24 lg:h-28 lg:w-28"
                            strokeWidth={1.5}
                          />
                        </motion.div>

                        {/* Category badge — top corner */}
                        <span
                          className={`absolute end-5 top-5 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] ${
                            isAccent
                              ? 'bg-accent-500/10 text-accent-500'
                              : 'bg-brand-500/10 text-brand-500'
                          }`}
                        >
                          {t(`items.${active.key}.type`)}
                        </span>
                      </motion.div>
                    </div>
                  </div>

                  {/* CTA (mobile — below) */}
                  <div className="md:hidden">
                    <Link
                      href="/work"
                      className={`group/cta inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3.5 text-sm font-semibold text-white transition-all duration-300 ${
                        isAccent
                          ? 'bg-accent-500 hover:bg-accent-600'
                          : 'bg-brand-500 hover:bg-brand-600'
                      }`}
                    >
                      <span>{t('viewProject')}</span>
                      <ArrowUpRight
                        className={`h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5 ${
                          isRTL ? 'rotate-[-90deg]' : ''
                        }`}
                        strokeWidth={2.5}
                      />
                    </Link>
                  </div>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>
        </div>

        {/* ============================================================
            MOBILE CONTROLS — dots + arrows
           ============================================================ */}
        <div className="mt-8 flex items-center justify-between gap-6 md:hidden">
          {/* Prev */}
          <button
            type="button"
            onClick={isRTL ? goNext : goPrev}
            disabled={isRTL ? activeIndex === PROJECTS.length - 1 : activeIndex === 0}
            aria-label={t('nav.prev')}
            className="neu-raised neu-raised-hover flex h-11 w-11 items-center justify-center rounded-full text-foreground transition-opacity disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={2.5} />
          </button>

          {/* Dots */}
          <div className="flex items-center gap-2">
            {PROJECTS.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to project ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === activeIndex
                    ? 'w-7 bg-brand-500'
                    : 'w-1.5 bg-border hover:bg-muted'
                }`}
              />
            ))}
          </div>

          {/* Next */}
          <button
            type="button"
            onClick={isRTL ? goPrev : goNext}
            disabled={isRTL ? activeIndex === 0 : activeIndex === PROJECTS.length - 1}
            aria-label={t('nav.next')}
            className="neu-brand neu-brand-hover flex h-11 w-11 items-center justify-center rounded-full text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
          </button>
        </div>

        {/* ============================================================
            FOOTER — View all link
           ============================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-12 flex justify-center md:mt-16"
        >
          <Link
            href="/work"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-muted transition-colors hover:text-brand-500"
          >
            <span>{t('viewAll')}</span>
            <ArrowUpRight
              className={`h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                isRTL ? 'rotate-[-90deg]' : ''
              }`}
              strokeWidth={2.5}
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}