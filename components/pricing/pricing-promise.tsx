'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion, type Variants } from 'framer-motion';
import { Link } from '@/i18n/navigation';
import { ArrowUpRight, CheckCircle2, Sparkles, Star } from 'lucide-react';

/* ============================================================
   PROMISES DATA
   ============================================================ */
const PROMISES = [
  'clearScope',
  'budgetClarity',
  'qualityProcess',
  'accountability',
  'flexibility',
] as const;

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

const itemVariants: Variants = {
  hidden: { opacity: 0, x: 30, scale: 0.96 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      delay: i * 0.1,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

/* ============================================================
   MAIN COMPONENT
   ============================================================ */
export function PricingPromise() {
  const t = useTranslations('PricingPromise');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  return (
    // 🔥 Sticky fix: section pe overflow-hidden nahi lagana
    <section className="relative bg-background py-20 md:py-28 lg:py-32">
      {/* Background Orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-1/4 h-[400px] w-[400px] rounded-full orb-brand blur-3xl opacity-40" />
        <div className="absolute -right-40 bottom-1/4 h-[400px] w-[400px] rounded-full orb-teal blur-3xl opacity-40" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        {/* 🔥 items-start lagana zaroori hai taake sticky properly kaam kare */}
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-16">

          {/* ============================================================
              LEFT — STICKY CONTENT
             ============================================================ */}
          <motion.div
            variants={headerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start"
          >
            <div className="skeu-badge inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-brand-500 md:text-[11px]">
              <Sparkles className="h-3 w-3" strokeWidth={2.5} />
              {t('badge')}
            </div>

            <h2 className="mt-5 font-display text-[clamp(2rem,4.5vw,3.25rem)] font-black leading-[1.05] tracking-[-0.03em] text-foreground md:mt-6">
              <span className="block">{t('headline.line1')}</span>
              <span className="text-gradient-animated block">
                {t('headline.line2')}
              </span>
            </h2>

            <p className="mt-5 max-w-md text-[14px] leading-relaxed text-muted md:mt-6 md:text-[15px]">
              {t('subtitle')}
            </p>

            <div className="mt-8 hidden lg:block">
              <Link
                href="/contact"
                className="skeu-btn group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3 text-[13px] font-bold md:text-sm"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-[600ms] ease-out group-hover:translate-x-[300%]"
                />
                <span className="relative">{t('cta')}</span>
                <ArrowUpRight
                  className={`relative h-3.5 w-3.5 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                    isRTL ? 'rotate-[-90deg]' : ''
                  }`}
                  strokeWidth={2.75}
                />
              </Link>
            </div>
          </motion.div>

          {/* ============================================================
              RIGHT — SCROLLING COMMITMENTS
             ============================================================ */}
          <div className="lg:col-span-7 pb-10">
            <div className="space-y-4 md:space-y-6">
              {PROMISES.map((key, index) => (
                <motion.div
                  key={key}
                  custom={index}
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-100px' }}
                  className="skeu-panel skeu-panel-hover group relative overflow-hidden rounded-2xl p-5 md:rounded-3xl md:p-6 lg:p-8"
                >
                  {/* Corner glow (hover) */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background:
                        'radial-gradient(circle at 100% 0%, rgba(233,122,0,0.1), transparent 60%)',
                    }}
                  />

                  <div className="relative flex flex-col gap-4 md:flex-row md:items-start md:gap-6">
                    {/* Number / Icon Stage */}
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-500/10 text-brand-500 md:h-14 md:w-14 md:rounded-2xl">
                      <span className="font-display text-lg font-black tracking-tight md:text-xl">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>

                    {/* Content */}
                    <div>
                      <h3 className="flex items-center gap-2 font-display text-lg font-black leading-tight tracking-tight text-foreground md:text-xl">
                        <CheckCircle2 className="h-5 w-5 text-brand-500" strokeWidth={2.5} />
                        {t(`items.${key}.title`)}
                      </h3>
                      <p className="mt-2 text-[13px] leading-relaxed text-muted md:text-[14.5px]">
                        {t(`items.${key}.desc`)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Mobile CTA (Shows only on mobile) */}
            <div className="mt-8 lg:hidden">
              <Link
                href="/contact"
                className="skeu-btn flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[13px] font-bold"
              >
                <span>{t('cta')}</span>
                <ArrowUpRight
                  className={`h-3.5 w-3.5 ${isRTL ? 'rotate-[-90deg]' : ''}`}
                  strokeWidth={2.75}
                />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}