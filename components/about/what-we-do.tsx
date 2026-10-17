'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { motion, type Variants } from 'framer-motion';
import {
  Megaphone,
  Share2,
  Palette,
  PenTool,
  Users,
  Target,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

/* ============================================================
   SERVICES DATA
   ============================================================ */
const SERVICES = [
  { key: 'pr',         number: '01', icon: Megaphone, accent: 'brand'  as const },
  { key: 'social',     number: '02', icon: Share2,    accent: 'accent' as const },
  { key: 'brand',      number: '03', icon: Palette,   accent: 'brand'  as const },
  { key: 'content',    number: '04', icon: PenTool,   accent: 'accent' as const },
  { key: 'influencer', number: '05', icon: Users,     accent: 'brand'  as const },
  { key: 'ads',        number: '06', icon: Target,    accent: 'accent' as const },
];

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
  hidden: { opacity: 0, y: 24, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      delay: 0.15 + i * 0.06,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

/* ============================================================
   MAIN COMPONENT
   ============================================================ */
export function WhatWeDo() {
  const t = useTranslations('WhatWeDo');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  return (
    <section
      id="what-we-do"
      className="relative overflow-hidden bg-background py-20 md:py-24 lg:py-28"
    >
      {/* Orbs */}
      <div className="pointer-events-none absolute -left-40 top-1/4 h-[380px] w-[380px] rounded-full orb-brand blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-1/4 h-[380px] w-[380px] rounded-full orb-teal blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-5 md:px-8">

        {/* ============================================================
            HEADER
           ============================================================ */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="skeu-badge inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-brand-500 md:text-[11px]">
            <Sparkles className="h-3 w-3" strokeWidth={2.5} />
            {t('badge')}
          </div>

          <h2 className="mt-5 font-display text-[clamp(1.75rem,4.5vw,3rem)] font-black leading-[1.06] tracking-[-0.03em] text-foreground md:mt-6">
            {t('title.line1')}{' '}
            <span className="text-gradient-animated">
              {t('title.highlight')}
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-lg text-[13.5px] leading-relaxed text-muted md:mt-5 md:text-[15px]">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* ============================================================
            SERVICES GRID
           ============================================================ */}
        <div className="mt-12 grid grid-cols-2 gap-3 md:mt-16 md:grid-cols-3 md:gap-4 lg:gap-5">
          {SERVICES.map(({ key, number, icon: Icon, accent }, i) => {
            const isAccent = accent === 'accent';

            return (
              <motion.div
                key={key}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                whileHover={{ y: -5 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                className="skeu-panel skeu-panel-hover group relative flex flex-col overflow-hidden rounded-2xl p-4 md:rounded-3xl md:p-5 lg:p-6"
              >
                {/* Corner glow (hover) */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: isAccent
                      ? 'radial-gradient(circle at 100% 0%, rgba(20,184,166,0.14), transparent 60%)'
                      : 'radial-gradient(circle at 100% 0%, rgba(233,122,0,0.14), transparent 60%)',
                  }}
                />

                {/* Top row — number + icon */}
                <div className="relative flex items-start justify-between gap-3">
                  <span
                    className={`font-display text-[10px] font-bold tracking-[0.25em] transition-colors duration-300 md:text-[11px] ${
                      isAccent
                        ? 'text-muted/50 group-hover:text-accent-500'
                        : 'text-muted/50 group-hover:text-brand-500'
                    }`}
                  >
                    {number}
                  </span>

                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-300 md:h-10 md:w-10 ${
                      isAccent
                        ? 'bg-accent-500/12 text-accent-500 group-hover:bg-accent-500 group-hover:text-white'
                        : 'bg-brand-500/12 text-brand-500 group-hover:bg-brand-500 group-hover:text-white'
                    }`}
                  >
                    <Icon
                      className="h-4 w-4 md:h-[18px] md:w-[18px]"
                      strokeWidth={2.25}
                    />
                  </span>
                </div>

                {/* Content */}
                <div className="relative mt-4 md:mt-5">
                  <h3 className="font-display text-[13.5px] font-black leading-tight tracking-tight text-foreground md:text-base lg:text-lg">
                    {t(`services.${key}.name`)}
                  </h3>

                  <p className="mt-1.5 text-[11px] leading-snug text-muted md:mt-2 md:text-[12.5px] lg:text-[13px]">
                    {t(`services.${key}.description`)}
                  </p>
                </div>

                {/* Bottom accent line (hover reveal) */}
                <div
                  className={`relative mt-4 h-[3px] w-0 rounded-full transition-all duration-500 ease-out group-hover:w-10 md:mt-5 ${
                    isAccent ? 'bg-accent-500' : 'bg-brand-500'
                  }`}
                />
              </motion.div>
            );
          })}
        </div>

        {/* ============================================================
            BOTTOM CTA
           ============================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 flex flex-col items-center gap-4 md:mt-16"
        >
          <p className="text-center text-[12px] font-medium text-muted md:text-[13px]">
            {t('footerNote')}
          </p>

          <Link
            href="/services"
            className="skeu-btn group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3 text-[13px] font-bold md:text-sm"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-[600ms] ease-out group-hover:translate-x-[300%]"
            />
            <span className="relative">{t('cta')}</span>
            <ArrowRight
              className={`relative h-3.5 w-3.5 transition-transform duration-200 ease-out ${
                isRTL
                  ? 'rotate-180 group-hover:-translate-x-0.5 group-hover:translate-x-0'
                  : 'group-hover:translate-x-0.5'
              }`}
              strokeWidth={2.75}
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}