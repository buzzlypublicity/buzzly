'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion, type Variants } from 'framer-motion';
import { Check, X, ShieldCheck, Building2, Sparkles } from 'lucide-react';
import { Link } from '@/i18n/navigation';

/* ============================================================
   ANIMATIONS
   ============================================================ */
const headerVariants: Variants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      delay: i * 0.15,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export function PricingComparison() {
  const t = useTranslations('PricingComparison');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  // Points for Typical Agency
  const typicalPoints = [
    t('typical.p1'),
    t('typical.p2'),
    t('typical.p3'),
    t('typical.p4'),
    t('typical.p5'),
  ];

  // Points for BUZZLY
  const buzzlyPoints = [
    t('buzzly.p1'),
    t('buzzly.p2'),
    t('buzzly.p3'),
    t('buzzly.p4'),
    t('buzzly.p5'),
    t('buzzly.p6'),
  ];

  return (
    <section className="relative overflow-hidden bg-background py-20 md:py-28">
      {/* Background Orbs */}
      <div className="pointer-events-none absolute -left-40 top-1/4 h-[400px] w-[400px] rounded-full orb-brand blur-3xl opacity-30" />
      <div className="pointer-events-none absolute -right-40 bottom-1/4 h-[400px] w-[400px] rounded-full orb-teal blur-3xl opacity-30" />

      <div className="relative mx-auto max-w-5xl px-5 md:px-8">
        
        {/* ============================================================
            HEADER
           ============================================================ */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="mx-auto mb-12 max-w-2xl text-center md:mb-16"
        >
          <div className="skeu-badge inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-500 md:text-[11px]">
            <Sparkles className="h-3 w-3" strokeWidth={2.5} />
            {t('badge')}
          </div>
          <h2 className="mt-4 font-display text-3xl font-black text-foreground md:text-4xl lg:text-5xl">
            {t('title')}
          </h2>
          <p className="mt-4 text-[14px] leading-relaxed text-muted md:text-[15px]">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* ============================================================
            COMPARISON CARDS
           ============================================================ */}
        <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
          
          {/* ---------- TYPICAL AGENCY CARD ---------- */}
          <motion.div
            custom={0}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="relative flex flex-col rounded-3xl border border-border/50 bg-foreground/[0.02] p-6 md:p-8 lg:p-10"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-foreground/5 text-muted md:h-12 md:w-12">
                <Building2 className="h-5 w-5 md:h-6 md:w-6" />
              </span>
              <h3 className="font-display text-xl font-black text-muted md:text-2xl">
                {t('typical.title')}
              </h3>
            </div>

            <ul className="mt-8 flex-1 space-y-4">
              {typicalPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-foreground/5 text-muted/60">
                    <X className="h-3 w-3" strokeWidth={3} />
                  </span>
                  <span className="text-[13.5px] font-medium text-muted md:text-[15px]">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ---------- BUZZLY CARD (HIGHLIGHTED) ---------- */}
          <motion.div
            custom={1}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="skeu-panel relative flex flex-col rounded-3xl border-2 border-brand-500 p-6 shadow-xl shadow-brand-500/20 md:p-8 lg:p-10"
          >
            {/* Badge */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-brand-500 px-4 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white shadow-lg">
              <ShieldCheck className="mr-1.5 inline-block h-3 w-3" />
              {t('buzzly.badge')}
            </div>

            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500 text-white md:h-12 md:w-12">
                <Sparkles className="h-5 w-5 md:h-6 md:w-6" />
              </span>
              <h3 className="font-display text-xl font-black text-foreground md:text-2xl">
                {t('buzzly.title')}
              </h3>
            </div>

            <ul className="mt-8 flex-1 space-y-4">
              {buzzlyPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-500/15 text-brand-500">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  <span className="text-[13.5px] font-bold text-foreground md:text-[15px]">
                    {point}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <Link
                href="#packages"
                className="skeu-btn flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[13px] font-bold transition-all duration-300 md:text-sm"
              >
                {t('buzzly.cta')}
              </Link>
            </div>
          </motion.div>

        </div>

        {/* ============================================================
            DISCLAIMER
           ============================================================ */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 text-center text-[10px] font-medium text-muted/70 md:mt-10 md:text-[11px]"
        >
          {t('disclaimer')}
        </motion.p>
      </div>
    </section>
  );
}