'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { motion, type Variants } from 'framer-motion';
import * as Icons from 'lucide-react';
import { ArrowUpRight, Sparkles, Info } from 'lucide-react';
import { ALL_CONCEPTS } from '@/data/concepts';

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
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

function DynamicIcon({
  name,
  className,
  strokeWidth = 2,
}: {
  name: string;
  className?: string;
  strokeWidth?: number;
}) {
  const Icon = (Icons as any)[name] ?? Icons.Circle;
  return <Icon className={className} strokeWidth={strokeWidth} />;
}

export function WorkConcepts() {
  const t = useTranslations('WorkConcepts');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  return (
    <section
      id="concepts"
      className="relative overflow-hidden bg-background py-20 md:py-24 lg:py-28"
    >
      {/* Orbs */}
      <div className="pointer-events-none absolute -left-40 top-1/3 h-[400px] w-[400px] rounded-full orb-brand blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-1/3 h-[400px] w-[400px] rounded-full orb-teal blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-5 md:px-8">

        {/* HEADER */}
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

        {/* CONCEPT LIST */}
        <div className="mt-12 md:mt-16">
          {ALL_CONCEPTS.map((concept, i) => {
            const tr = concept.translations[locale as 'en' | 'ar'];
            const isAccent = concept.accent === 'accent';

            return (
              <motion.div
                key={concept.slug}
                custom={i}
                variants={rowVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
              >
                <Link
                  href={`/work/${concept.slug}`}
                  className="group relative block"
                >
                  <div className="relative grid grid-cols-[auto_1fr_auto] items-center gap-4 py-6 md:grid-cols-[80px_1fr_auto] md:gap-8 md:py-8 lg:gap-12 lg:py-9">

                    {/* Number */}
                    <div className="relative">
                      <span
                        className={`font-display text-2xl font-black leading-none tracking-tight transition-colors duration-300 md:text-3xl ${
                          isAccent
                            ? 'text-muted/40 group-hover:text-accent-500'
                            : 'text-muted/40 group-hover:text-brand-500'
                        }`}
                      >
                        {concept.number}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="min-w-0">
                      {/* Concept tag */}
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.15em] md:text-[10px] ${
                            isAccent
                              ? 'bg-accent-500/10 text-accent-500'
                              : 'bg-brand-500/10 text-brand-500'
                          }`}
                        >
                          <Info className="h-2.5 w-2.5" strokeWidth={2.5} />
                          {t('conceptTag')}
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted md:text-[11px]">
                          {tr.category}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="mt-2 font-display text-lg font-black leading-tight tracking-tight text-foreground transition-colors duration-300 md:text-2xl lg:text-[28px]">
                        {tr.title}
                      </h3>

                      {/* Brand + tagline */}
                      <p className="mt-1 text-[12px] leading-relaxed text-muted md:mt-1.5 md:text-[14px]">
                        <span className="font-semibold text-foreground/70">
                          {tr.brand}
                        </span>
                        <span className="mx-2 text-muted/40">·</span>
                        {tr.tagline}
                      </p>
                    </div>

                    {/* Arrow */}
                    <div className="flex items-center gap-3 md:gap-4">
                      <span className="hidden text-[10px] font-bold uppercase tracking-[0.2em] text-muted opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:inline-block md:text-[11px]">
                        {t('view')}
                      </span>
                      <span
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-300 ease-out md:h-11 md:w-11"
                        style={{
                          background:
                            'color-mix(in oklab, var(--color-foreground) 5%, transparent)',
                        }}
                      >
                        <ArrowUpRight
                          className={`h-4 w-4 text-muted transition-all duration-300 group-hover:text-white md:h-[18px] md:w-[18px] ${
                            isRTL ? 'rotate-[-90deg]' : ''
                          }`}
                          strokeWidth={2.5}
                        />
                      </span>
                    </div>

                    {/* Hover bg */}
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-x-[-16px] inset-y-0 -z-10 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:inset-x-[-24px]"
                      style={{
                        background:
                          'color-mix(in oklab, var(--color-foreground) 3%, transparent)',
                      }}
                    />

                    {/* Bottom divider */}
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
                      style={{
                        background:
                          'color-mix(in oklab, var(--color-border) 70%, transparent)',
                      }}
                    />
                  </div>
                </Link>
              </motion.div>
            );
          })}

          {/* Last divider */}
          <div
            aria-hidden
            className="h-px w-full"
            style={{
              background:
                'color-mix(in oklab, var(--color-border) 70%, transparent)',
            }}
          />
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 text-center text-[10px] font-semibold uppercase tracking-[0.18em] text-muted md:mt-12 md:text-[11px]"
        >
          {t('footnote')}
        </motion.p>
      </div>
    </section>
  );
}