'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import {
  AlertTriangle,
  Globe,
  Server,
  Database,
  ChevronDown,
  Info,
  CheckCircle2,
  MessageCircle,
  ArrowUpRight,
} from 'lucide-react';

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
      delay: i * 0.12,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

/* ============================================================
   MAIN COMPONENT
   ============================================================ */
export function PricingNotice() {
  const t = useTranslations('PricingNotice');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const plans = ['standard', 'business'] as const;

  return (
    <section className="relative overflow-hidden bg-background py-16 md:py-20 lg:py-24">
      {/* Orbs */}
      <div className="pointer-events-none absolute -left-40 top-1/3 h-[380px] w-[380px] rounded-full orb-brand blur-3xl opacity-20" />
      <div className="pointer-events-none absolute -right-40 bottom-1/3 h-[380px] w-[380px] rounded-full orb-teal blur-3xl opacity-20" />

      <div className="relative mx-auto max-w-5xl px-5 md:px-8">

        {/* ============================================================
            HEADER
           ============================================================ */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mx-auto max-w-3xl text-center"
        >
          {/* Warning Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400 md:text-[11px]">
            <AlertTriangle className="h-3.5 w-3.5" strokeWidth={2.5} />
            {t('badge')}
          </div>

          <h2 className="mt-4 font-display text-2xl font-black leading-tight tracking-tight text-foreground md:text-3xl lg:text-4xl">
            {t('title')}
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-[13px] leading-relaxed text-muted md:mt-4 md:text-[14.5px]">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* ============================================================
            2 PLANS CARDS
           ============================================================ */}
        <div className="mt-10 grid gap-4 md:mt-12 md:grid-cols-2 md:gap-5">
          {plans.map((planKey, idx) => (
            <NoticeCard key={planKey} planKey={planKey} idx={idx} isRTL={isRTL} t={t} />
          ))}
        </div>

        {/* ============================================================
            FOOTER NOTE
           ============================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex flex-col items-center justify-center gap-3 rounded-2xl border border-border/50 bg-card/40 p-4 text-center md:mt-10 md:flex-row md:gap-4 md:p-5"
        >
          <div className="flex items-center gap-2.5">
            <Info className="h-4 w-4 shrink-0 text-brand-500 md:h-5 md:w-5" />
            <p className="text-[12px] font-medium text-foreground/80 md:text-[13px]">
              {t('footerNote')}
            </p>
          </div>
          <a
            href="https://wa.me/97366316733"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex shrink-0 items-center gap-1.5 rounded-full bg-brand-500 px-4 py-2 text-[11.5px] font-bold text-white transition-all duration-200 hover:bg-brand-600 active:scale-95 md:text-[12.5px]"
          >
            <MessageCircle className="h-3.5 w-3.5" strokeWidth={2.5} />
            {t('footerCta')}
            <ArrowUpRight
              className={`h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                isRTL ? 'rotate-[-90deg]' : ''
              }`}
              strokeWidth={2.75}
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================================
   NOTICE CARD
   ============================================================ */
function NoticeCard({
  planKey,
  idx,
  isRTL,
  t,
}: {
  planKey: 'standard' | 'business';
  idx: number;
  isRTL: boolean;
  t: ReturnType<typeof useTranslations>;
}) {
  const [showDb, setShowDb] = useState(false);

  const items: Array<{
  key: 'domain' | 'hosting' | 'database';
  icon: typeof Globe;
  expandable?: boolean;
}> = [
  { key: 'domain', icon: Globe },
  { key: 'hosting', icon: Server },
  { key: 'database', icon: Database, expandable: true },
];

  return (
    <motion.div
      custom={idx}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      className="skeu-panel relative overflow-hidden rounded-3xl p-5 md:p-6 lg:p-7"
    >
      {/* Corner glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-amber-500/10 blur-3xl"
      />

      {/* Header */}
      <div className="relative">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-500 md:text-[11px]">
          {t(`plans.${planKey}.badge`)}
        </p>
        <h3 className="mt-1 font-display text-lg font-black leading-tight tracking-tight text-foreground md:text-xl">
          {t(`plans.${planKey}.name`)}
        </h3>
        <p className="mt-1.5 text-[12px] leading-relaxed text-muted md:text-[13px]">
          {t(`plans.${planKey}.context`)}
        </p>
      </div>

      {/* Divider */}
      <div className="my-4 h-px w-full bg-gradient-to-r from-transparent via-border to-transparent md:my-5" />

      {/* Items List */}
      <ul className="relative space-y-3.5 md:space-y-4">
        {items.map((item) => {
          const Icon = item.icon;
          const isExpandable = item.expandable === true;

          return (
            <li key={item.key} className="flex items-start gap-3">
              {/* Icon */}
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 md:h-9 md:w-9 md:rounded-xl">
                <Icon className="h-4 w-4 md:h-[18px] md:w-[18px]" strokeWidth={2.25} />
              </span>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <span className="text-[13px] font-bold text-foreground md:text-[14px]">
                    {t(`items.${item.key}.title`)}
                  </span>
                  <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.1em] text-amber-600 dark:text-amber-400 md:text-[10px]">
                    {t('clientProvides')}
                  </span>
                </div>
                <p className="mt-1 text-[12px] leading-relaxed text-muted md:text-[13px]">
                  {t(`plans.${planKey}.${item.key}`)}
                </p>

                {/* Database expandable */}
                {isExpandable && (
                  <div className="mt-2">
                    <button
                      type="button"
                      onClick={() => setShowDb((v) => !v)}
                      className="group inline-flex items-center gap-1.5 text-[11.5px] font-bold text-brand-500 transition-colors hover:text-brand-600 md:text-[12.5px]"
                      aria-expanded={showDb}
                    >
                      <Info className="h-3 w-3" strokeWidth={2.5} />
                      {showDb ? t('seeLess') : t('seeMore')}
                      <ChevronDown
                        className={`h-3.5 w-3.5 transition-transform duration-300 ${
                          showDb ? 'rotate-180' : ''
                        }`}
                        strokeWidth={2.5}
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {showDb && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            duration: 0.4,
                            ease: [0.22, 1, 0.36, 1],
                            opacity: { duration: 0.25, delay: 0.05 },
                          }}
                          className="overflow-hidden"
                        >
                          <div className="mt-3 space-y-3 rounded-xl border border-border/50 bg-background/60 p-3.5 md:p-4">
                            <p className="text-[11.5px] leading-relaxed text-foreground/85 md:text-[12.5px]">
                              {t('databaseExplanation.intro')}
                            </p>

                            <div>
                              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-brand-500 md:text-[11px]">
                                {t('databaseExplanation.whatTitle')}
                              </p>
                              <p className="mt-1 text-[11.5px] leading-relaxed text-muted md:text-[12.5px]">
                                {t('databaseExplanation.what')}
                              </p>
                            </div>

                            <div>
                              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-brand-500 md:text-[11px]">
                                {t('databaseExplanation.providersTitle')}
                              </p>
                              <ul className="mt-1.5 space-y-1">
                                {[0, 1, 2].map((n) => (
                                  <li
                                    key={n}
                                    className="flex items-start gap-1.5 text-[11.5px] leading-relaxed text-muted md:text-[12.5px]"
                                  >
                                    <CheckCircle2
                                      className="mt-0.5 h-3 w-3 shrink-0 text-accent-500"
                                      strokeWidth={2.75}
                                    />
                                    <span>{t(`databaseExplanation.providers.${n}`)}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <p className="rounded-lg bg-brand-500/[0.06] px-3 py-2 text-[11px] leading-relaxed text-foreground/80 md:text-[12px]">
                              💡 {t('databaseExplanation.note')}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </motion.div>
  );
}