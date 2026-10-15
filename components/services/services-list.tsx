'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { motion, type Variants } from 'framer-motion';
import { ArrowUpRight, Sparkles } from 'lucide-react';

/* ============================================================
   SERVICES DATA — slugs match /services/[slug] routes
   ============================================================ */
const SERVICES = [
  { key: 'publicRelations',    number: '01', slug: 'public-relations'    },
  { key: 'socialMedia',        number: '02', slug: 'social-media'        },
  { key: 'brandStrategy',      number: '03', slug: 'brand-strategy'      },
  { key: 'contentCreation',    number: '04', slug: 'content-creation'    },
  { key: 'influencerMarketing',number: '05', slug: 'influencer-marketing'},
  { key: 'digitalAdvertising', number: '06', slug: 'digital-advertising' },
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
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      delay: i * 0.06,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

/* ============================================================
   SERVICES LIST — Editorial Index
   ============================================================ */
export function ServicesList() {
  const t = useTranslations('ServicesList');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  return (
    <section
      id="services-list"
      className="relative overflow-hidden bg-background py-20 md:py-28 lg:py-32"
    >
      {/* Ambient orbs */}
      <div className="pointer-events-none absolute -left-40 top-1/4 h-[400px] w-[400px] rounded-full orb-brand blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-1/4 h-[400px] w-[400px] rounded-full orb-teal blur-3xl" />

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
          <div className="skeu-badge inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-500 md:px-3.5 md:text-[11px]">
            <Sparkles className="h-3 w-3" strokeWidth={2.5} />
            {t('badge')}
          </div>

          <h2 className="mt-5 font-display text-3xl font-black leading-[1.08] tracking-tight text-foreground sm:text-4xl md:mt-6 md:text-5xl">
            {t('title')}
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-[13px] leading-relaxed text-muted md:mt-5 md:text-[15px]">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* ============================================================
            EDITORIAL LIST
           ============================================================ */}
        <div className="mt-12 md:mt-16">
          {SERVICES.map(({ key, number, slug }, i) => (
            <motion.div
              key={key}
              custom={i}
              variants={rowVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
            >
              <Link
                href={`/services/${slug}`}
                className="group relative block"
              >
                {/* Row */}
                <div className="relative grid grid-cols-[auto_1fr_auto] items-center gap-4 py-6 transition-colors duration-300 ease-out md:grid-cols-[80px_1fr_auto] md:gap-8 md:py-8 lg:gap-12 lg:py-9">

                  {/* ---------- Number ---------- */}
                  <div className="relative">
                    <span
                      className={`font-display text-2xl font-black leading-none tracking-tight transition-colors duration-300 ease-out md:text-3xl ${
                        isRTL
                          ? 'text-muted/40 group-hover:text-brand-500'
                          : 'text-muted/40 group-hover:text-brand-500'
                      }`}
                    >
                      {number}
                    </span>
                  </div>

                  {/* ---------- Title + Description ---------- */}
                  <div className="min-w-0">
                    <h3 className="font-display text-lg font-black leading-tight tracking-tight text-foreground transition-transform duration-300 ease-out md:text-2xl lg:text-[28px]">
                      {t(`items.${key}.title`)}
                    </h3>
                    <p className="mt-1.5 text-[12px] leading-relaxed text-muted md:mt-2 md:text-[14px] lg:text-[15px]">
                      {t(`items.${key}.description`)}
                    </p>
                  </div>

                  {/* ---------- Arrow / Explore ---------- */}
                  <div className="flex items-center gap-3 md:gap-4">
                    <span className="hidden text-[10px] font-bold uppercase tracking-[0.2em] text-muted opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 md:inline-block md:text-[11px]">
                      {t('explore')}
                    </span>
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-300 ease-out md:h-11 md:w-11"
                      style={{
                        background:
                          'color-mix(in oklab, var(--color-foreground) 5%, transparent)',
                      }}
                    >
                      <ArrowUpRight
                        className={`h-4 w-4 text-muted transition-all duration-300 ease-out group-hover:text-white md:h-[18px] md:w-[18px] ${
                          isRTL ? 'rotate-[-90deg]' : ''
                        }`}
                        strokeWidth={2.5}
                      />
                    </span>
                  </div>

                  {/* Background fill on hover (extends full width) */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-x-[-16px] inset-y-0 -z-10 rounded-2xl opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 md:inset-x-[-24px]"
                    style={{
                      background:
                        'color-mix(in oklab, var(--color-foreground) 3%, transparent)',
                    }}
                  />

                  {/* Bottom divider */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-px transition-colors duration-300 ease-out"
                    style={{
                      background:
                        'color-mix(in oklab, var(--color-border) 70%, transparent)',
                    }}
                  />
                </div>
              </Link>

              {/* Last item — extra divider after list (optional) */}
              {i === SERVICES.length - 1 && (
                <div
                  aria-hidden
                  className="h-px w-full"
                  style={{
                    background:
                      'color-mix(in oklab, var(--color-border) 70%, transparent)',
                  }}
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* ============================================================
            BOTTOM CTA — Ask for custom scope
           ============================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 flex flex-col items-center gap-5 md:mt-20"
        >
          <p className="text-center text-[13px] leading-relaxed text-muted md:text-[15px]">
            {t('footerNote')}
          </p>

          <Link
            href="/contact"
            className="skeu-btn-secondary group inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-[12px] font-semibold md:px-6 md:py-3 md:text-sm"
          >
            <span>{t('footerCta')}</span>
            <ArrowUpRight
              className={`h-3 w-3 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 md:h-3.5 md:w-3.5 ${
                isRTL ? 'rotate-[-90deg]' : ''
              }`}
              strokeWidth={2.75}
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}