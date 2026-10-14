'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import {
  Compass,
  Video,
  Palette,
  Zap,
  ChevronDown,
  ArrowUpRight,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from 'lucide-react';

/* ============================================================
   PROBLEMS DATA
   ============================================================ */
const PROBLEMS = [
  {
    key: 'reach',
    number: '01',
    icon: Compass,
    accent: 'brand',
  },
  {
    key: 'engagement',
    number: '02',
    icon: Video,
    accent: 'accent',
  },
  {
    key: 'branding',
    number: '03',
    icon: Palette,
    accent: 'brand',
  },
  {
    key: 'funnels',
    number: '04',
    icon: Zap,
    accent: 'accent',
  },
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

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.1,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

/* ============================================================
   COMPONENT
   ============================================================ */
export function Problems() {
  const t = useTranslations('Problems');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const [openIndex, setOpenIndex] = useState<number>(0);

  const toggle = (i: number) => {
    setOpenIndex((prev) => (prev === i ? -1 : i));
  };

  return (
    <section
      id="problems"
      className="relative overflow-hidden bg-background py-20 md:py-28 lg:py-32"
    >
      {/* Ambient glows */}
      <div className="pointer-events-none absolute -right-40 top-20 h-[420px] w-[420px] rounded-full orb-teal blur-3xl" />
      <div className="pointer-events-none absolute -left-40 bottom-20 h-[420px] w-[420px] rounded-full orb-brand blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">

          {/* ============================================================
              LEFT — HEADING (sticky)
             ============================================================ */}
          <motion.div
            variants={headerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start"
          >
            {/* Badge */}
            <div className="neu-inset inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-500 md:text-[11px]">
              <Sparkles className="h-3 w-3" strokeWidth={2.5} />
              {t('badge')}
            </div>

            {/* Title */}
            <h2 className="mt-5 font-display text-4xl font-black leading-[1.05] tracking-tight text-foreground sm:text-5xl md:mt-6 md:text-6xl">
              {t('title')}
            </h2>

            {/* Subtitle */}
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-muted md:mt-6 md:text-base">
              {t('subtitle')}
            </p>

            {/* Divider accent */}
            <div className="mt-7 flex items-center gap-3">
              <span className="h-px w-12 bg-brand-500/40" />
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted">
                {t('miniLabel')}
              </span>
            </div>

            {/* Helper text */}
            <p className="mt-4 max-w-md text-xs leading-relaxed text-muted/80 md:text-sm">
              {t('helper')}
            </p>

            {/* CTA */}
            <Link
              href="/contact"
              className="group/cta mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand-500 transition-colors hover:text-brand-600"
            >
              <span>{t('cta')}</span>
              <ArrowUpRight
                className={`h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5 ${
                  isRTL ? 'rotate-[-90deg]' : ''
                }`}
                strokeWidth={2.5}
              />
            </Link>
          </motion.div>

          {/* ============================================================
              RIGHT — ACCORDION CARDS
             ============================================================ */}
          <div className="space-y-4 lg:col-span-7">
            {PROBLEMS.map(({ key, number, icon: Icon, accent }, i) => {
              const isOpen = openIndex === i;
              const isAccent = accent === 'accent';

              return (
                <motion.div
                  key={key}
                  custom={i}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-60px' }}
                  className="neu-raised overflow-hidden rounded-3xl transition-shadow duration-500"
                  style={{
                    boxShadow: isOpen
                      ? `inset 0 0 0 1px color-mix(in oklab, var(--color-${
                          isAccent ? 'accent' : 'brand'
                        }-500) 22%, transparent), 0 0 60px -12px color-mix(in oklab, var(--color-${
                          isAccent ? 'accent' : 'brand'
                        }-500) 30%, transparent)`
                      : undefined,
                  }}
                >
                  {/* ============================================================
                      HEADER (always visible — click to toggle)
                     ============================================================ */}
                  <button
                    type="button"
                    onClick={() => toggle(i)}
                    aria-expanded={isOpen}
                    className="group flex w-full items-center gap-4 p-5 text-start md:gap-5 md:p-6 lg:p-7"
                  >
                    {/* Icon */}
                    <span
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl transition-all duration-300 md:h-12 md:w-12 ${
                        isOpen
                          ? isAccent
                            ? 'bg-accent-500 text-white'
                            : 'bg-brand-500 text-white'
                          : isAccent
                          ? 'bg-accent-500/10 text-accent-500'
                          : 'bg-brand-500/10 text-brand-500'
                      }`}
                    >
                      <Icon className="h-5 w-5" strokeWidth={2.25} />
                    </span>

                    {/* Number + Title */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-display text-[10px] font-bold tracking-[0.25em] ${
                            isAccent ? 'text-accent-500' : 'text-brand-500'
                          }`}
                        >
                          {number}
                        </span>
                        <span className="h-1 w-1 rounded-full bg-muted/40" />
                        <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted">
                          {t(`items.${key}.tag`)}
                        </span>
                      </div>

                      <h3 className="mt-1 font-display text-lg font-black leading-tight tracking-tight text-foreground md:text-xl">
                        {t(`items.${key}.title`)}
                      </h3>
                    </div>

                    {/* Chevron */}
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
                        isOpen
                          ? isAccent
                            ? 'bg-accent-500/15 text-accent-500'
                            : 'bg-brand-500/15 text-brand-500'
                          : 'bg-foreground/5 text-muted'
                      }`}
                    >
                      <ChevronDown className="h-4 w-4" strokeWidth={2.5} />
                    </motion.span>
                  </button>

                  {/* ============================================================
                      EXPANDABLE CONTENT
                     ============================================================ */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          duration: 0.5,
                          ease: [0.22, 1, 0.36, 1],
                          opacity: { duration: 0.3, delay: 0.1 },
                        }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-6 md:px-6 md:pb-7 lg:px-7">

                          {/* Divider */}
                          <div className="mb-5 h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />

                          {/* Problem statement */}
                          <div className="flex items-start gap-3">
                            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-red-500/10 text-red-500">
                              <AlertCircle className="h-3.5 w-3.5" strokeWidth={2.5} />
                            </span>
                            <div className="min-w-0 flex-1">
                              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-500/80">
                                {t('labels.problem')}
                              </p>
                              <p className="mt-1.5 text-sm leading-relaxed text-muted">
                                {t(`items.${key}.problem`)}
                              </p>
                            </div>
                          </div>

                          {/* Solution */}
                          <div className="mt-5 flex items-start gap-3">
                            <span
                              className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg ${
                                isAccent
                                  ? 'bg-accent-500/10 text-accent-500'
                                  : 'bg-brand-500/10 text-brand-500'
                              }`}
                            >
                              <CheckCircle2 className="h-3.5 w-3.5" strokeWidth={2.5} />
                            </span>
                            <div className="min-w-0 flex-1">
                              <p
                                className={`text-[10px] font-bold uppercase tracking-[0.2em] ${
                                  isAccent ? 'text-accent-500' : 'text-brand-500'
                                }`}
                              >
                                {t('labels.solution')}
                              </p>
                              <p className="mt-1.5 text-sm leading-relaxed text-foreground">
                                {t(`items.${key}.solution`)}
                              </p>
                            </div>
                          </div>

                          {/* Outcome badge */}
                          <div className="mt-5 flex flex-wrap items-center gap-2">
                            <span
                              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wider ${
                                isAccent
                                  ? 'bg-accent-500/10 text-accent-600 dark:text-accent-400'
                                  : 'bg-brand-500/10 text-brand-600 dark:text-brand-400'
                              }`}
                            >
                              <span
                                className={`h-1.5 w-1.5 rounded-full ${
                                  isAccent ? 'bg-accent-500' : 'bg-brand-500'
                                }`}
                              />
                              {t(`items.${key}.outcome`)}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}