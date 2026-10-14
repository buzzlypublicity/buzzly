'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import {
  Plus,
  Sparkles,
  MessageCircleQuestion,
  ArrowUpRight,
} from 'lucide-react';

/* ============================================================
   FAQS DATA
   ============================================================ */
const FAQS = [
  { key: 'services',  number: '01', accent: 'brand'  },
  { key: 'global',    number: '02', accent: 'accent' },
  { key: 'bilingual', number: '03', accent: 'brand'  },
  { key: 'pricing',   number: '04', accent: 'accent' },
  { key: 'revisions', number: '05', accent: 'brand'  },
  { key: 'start',     number: '06', accent: 'accent' },
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

const rowVariants: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.07,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

/* ============================================================
   COMPONENT
   ============================================================ */
export function FAQs() {
  const t = useTranslations('FAQs');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const [openIndex, setOpenIndex] = useState<number>(0);

  const toggle = (i: number) => {
    setOpenIndex((prev) => (prev === i ? -1 : i));
  };

  return (
    <section
      id="faq"
      className="relative overflow-hidden bg-background py-20 md:py-28 lg:py-32"
    >
      {/* Ambient glows */}
      <div className="pointer-events-none absolute -left-40 top-1/3 h-[420px] w-[420px] rounded-full orb-brand blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-1/3 h-[420px] w-[420px] rounded-full orb-teal blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">

          {/* ============================================================
              LEFT — STICKY HEADING + VISUAL
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

            {/* Divider */}
            <div className="mt-7 flex items-center gap-3">
              <span className="h-px w-12 bg-brand-500/40" />
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted">
                {t('miniLabel')}
              </span>
            </div>

            {/* ---------- VISUAL CARD — "Still curious?" ---------- */}
            <div className="mt-8 hidden lg:block">
              <div className="neu-raised relative overflow-hidden rounded-[32px] p-8">

                {/* Corner glow */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      'radial-gradient(circle at 100% 0%, rgba(233,122,0,0.16), transparent 60%)',
                  }}
                />

                {/* Icon stage */}
                <div className="relative flex h-32 w-32 items-center justify-center">
                  {/* Pulse rings */}
                  <motion.span
                    aria-hidden
                    className="absolute h-20 w-20 rounded-full bg-brand-500/15"
                    animate={{ scale: [1, 1.7, 1], opacity: [0.6, 0, 0.6] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  <motion.span
                    aria-hidden
                    className="absolute h-20 w-20 rounded-full bg-brand-500/15"
                    animate={{ scale: [1, 2.2, 1], opacity: [0.4, 0, 0.4] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: 0.4,
                    }}
                  />

                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    className="relative flex h-20 w-20 items-center justify-center rounded-[24px] bg-brand-500/12 text-brand-500"
                  >
                    <MessageCircleQuestion
                      className="h-9 w-9"
                      strokeWidth={1.75}
                    />
                  </motion.div>
                </div>

                {/* Content */}
                <h3 className="relative mt-6 font-display text-2xl font-black leading-tight tracking-tight text-foreground">
                  {t('visual.title')}
                </h3>

                <p className="relative mt-3 text-sm leading-relaxed text-muted">
                  {t('visual.description')}
                </p>

                {/* CTA */}
                <Link
                  href="/contact"
                  className="group/cta relative mt-6 inline-flex items-center gap-2 rounded-full bg-brand-500 px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-brand-600"
                  style={{
                    boxShadow: '0 4px 14px 0 rgba(233,122,0,0.28)',
                  }}
                >
                  <span>{t('visual.cta')}</span>
                  <ArrowUpRight
                    className={`h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5 ${
                      isRTL ? 'rotate-[-90deg]' : ''
                    }`}
                    strokeWidth={2.5}
                  />
                </Link>
              </div>
            </div>
          </motion.div>

          {/* ============================================================
              RIGHT — FAQ ACCORDION
             ============================================================ */}
          <div className="space-y-3 lg:col-span-7">
            {FAQS.map(({ key, number, accent }, i) => {
              const isOpen = openIndex === i;
              const isAccent = accent === 'accent';

              return (
                <motion.div
                  key={key}
                  custom={i}
                  variants={rowVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-40px' }}
                  className="neu-raised group relative overflow-hidden rounded-3xl transition-shadow duration-500"
                  style={{
                    boxShadow: isOpen
                      ? `inset 0 0 0 1px color-mix(in oklab, var(--color-${
                          isAccent ? 'accent' : 'brand'
                        }-500) 25%, transparent), 0 0 60px -12px color-mix(in oklab, var(--color-${
                          isAccent ? 'accent' : 'brand'
                        }-500) 30%, transparent)`
                      : undefined,
                  }}
                >
                  {/* Accent bar (start side) */}
                  <motion.span
                    aria-hidden
                    className={`absolute inset-y-4 start-0 rounded-e-full ${
                      isAccent ? 'bg-accent-500' : 'bg-brand-500'
                    }`}
                    initial={false}
                    animate={{
                      width: isOpen ? 3 : 0,
                      opacity: isOpen ? 1 : 0,
                    }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  />

                  {/* ============================================================
                      HEADER (clickable)
                     ============================================================ */}
                  <button
                    type="button"
                    onClick={() => toggle(i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    className="group/btn flex w-full items-center gap-4 p-5 text-start md:gap-5 md:p-6"
                  >
                    {/* Number badge */}
                    <span
                      className={`font-display text-xs font-bold tracking-[0.25em] transition-colors duration-300 ${
                        isOpen
                          ? isAccent
                            ? 'text-accent-500'
                            : 'text-brand-500'
                          : 'text-muted/60'
                      }`}
                    >
                      {number}
                    </span>

                    {/* Question */}
                    <span
                      className={`min-w-0 flex-1 font-display text-base font-black leading-snug tracking-tight transition-colors duration-300 sm:text-lg md:text-xl ${
                        isOpen ? 'text-foreground' : 'text-foreground/80'
                      }`}
                    >
                      {t(`items.${key}.question`)}
                    </span>

                    {/* Plus / X icon */}
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
                        isOpen
                          ? isAccent
                            ? 'bg-accent-500 text-white'
                            : 'bg-brand-500 text-white'
                          : 'bg-foreground/5 text-muted group-hover/btn:bg-foreground/10'
                      }`}
                    >
                      <Plus className="h-4 w-4" strokeWidth={2.5} />
                    </motion.span>
                  </button>

                  {/* ============================================================
                      ANSWER (expandable)
                     ============================================================ */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-panel-${i}`}
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          duration: 0.45,
                          ease: [0.22, 1, 0.36, 1],
                          opacity: { duration: 0.25, delay: 0.1 },
                        }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-6 md:px-6 md:pb-7">
                          {/* Divider */}
                          <div className="mb-5 h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />

                          {/* Answer */}
                          <p className="text-sm leading-relaxed text-muted md:text-[15px]">
                            {t(`items.${key}.answer`)}
                          </p>

                          {/* Optional meta line */}
                          <div className="mt-4 flex items-center gap-2">
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${
                                isAccent ? 'bg-accent-500' : 'bg-brand-500'
                              }`}
                            />
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted">
                              {t(`items.${key}.tag`)}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}

            {/* ============================================================
                MOBILE — Visual CTA (below rows)
               ============================================================ */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:hidden"
            >
              <div className="neu-raised relative mt-4 overflow-hidden rounded-3xl p-6">
                {/* Corner glow */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      'radial-gradient(circle at 100% 0%, rgba(233,122,0,0.14), transparent 60%)',
                  }}
                />

                <div className="relative flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-500/12 text-brand-500">
                    <MessageCircleQuestion className="h-5 w-5" strokeWidth={2.25} />
                  </span>

                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-base font-black leading-tight tracking-tight text-foreground">
                      {t('visual.title')}
                    </h3>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-muted">
                      {t('visual.description')}
                    </p>

                    <Link
                      href="/contact"
                      className={`group/cta mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-500 transition-colors hover:text-brand-600`}
                    >
                      <span>{t('visual.cta')}</span>
                      <ArrowUpRight
                        className={`h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5 ${
                          isRTL ? 'rotate-[-90deg]' : ''
                        }`}
                        strokeWidth={2.5}
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}