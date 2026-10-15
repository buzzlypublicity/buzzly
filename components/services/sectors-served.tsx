'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { motion, type Variants } from 'framer-motion';
import * as Icons from 'lucide-react';
import { ArrowUpRight, Sparkles, Star } from 'lucide-react';
import { ALL_SECTORS } from '@/data/sectors';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: (i: number) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.6, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] },
  }),
};

function DynamicIcon({ name, className }: { name: string; className?: string }) {
  const Icon = (Icons as any)[name] ?? Icons.Circle;
  return <Icon className={className} strokeWidth={2} />;
}

export function SectorsServed() {
  const t = useTranslations('SectorsServed');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const [featured, ...rest] = ALL_SECTORS;

  return (
    <section
      id="sectors"
      className="relative overflow-hidden bg-background py-20 md:py-28 lg:py-32"
    >
      <div className="pointer-events-none absolute -left-40 top-1/4 h-[400px] w-[400px] rounded-full orb-brand blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-1/4 h-[400px] w-[400px] rounded-full orb-teal blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-5 md:px-8">
        {/* HEADER */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="skeu-badge inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-500 md:text-[11px]">
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

        {/* BENTO GRID */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-12 grid gap-4 md:mt-16 md:gap-5"
        >
          {/* FEATURED CARD */}
          <motion.div
            custom={0}
            variants={cardVariants}
            className="md:col-span-3"
          >
            <Link href={`/sectors/${featured.slug}`} className="group block h-full">
              <div className="skeu-panel skeu-panel-hover relative flex h-full flex-col overflow-hidden rounded-3xl p-6 md:p-8 lg:p-10">
                {/* Featured badge */}
                <div className="absolute end-5 top-5 z-10">
                  <span className="skeu-badge inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.15em] text-brand-500 md:text-[10px]">
                    <Star className="h-2.5 w-2.5 fill-brand-500" strokeWidth={0} />
                    {t('featured')}
                  </span>
                </div>

                {/* Corner glow */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      'radial-gradient(circle at 85% 15%, rgba(233,122,0,0.14), transparent 60%)',
                  }}
                />

                <div className="relative flex flex-1 flex-col gap-6 md:flex-row md:items-center md:gap-10">
                  {/* Icon */}
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-brand-500/12 text-brand-500 md:h-20 md:w-20">
                    <DynamicIcon
                      name={featured.icon}
                      className="h-7 w-7 md:h-9 md:w-9"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <span className="font-display text-[10px] font-bold tracking-[0.25em] text-brand-500 md:text-[11px]">
                        {featured.number}
                      </span>
                      <span className="h-1 w-1 rounded-full bg-muted/40" />
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted md:text-[11px]">
                        {t('featuredLabel')}
                      </span>
                    </div>

                    <h3 className="mt-2 font-display text-2xl font-black leading-tight tracking-tight text-foreground md:text-3xl lg:text-4xl">
                      {featured.translations[locale as 'en' | 'ar'].name}
                    </h3>

                    <p className="mt-3 max-w-2xl text-[13px] leading-relaxed text-muted md:text-[15px]">
                      {featured.translations[locale as 'en' | 'ar'].tagline}
                    </p>

                    <div className="mt-5 inline-flex items-center gap-1.5 text-[12px] font-bold text-brand-500 md:text-sm">
                      <span>{t('explore')}</span>
                      <ArrowUpRight
                        className={`h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                          isRTL ? 'rotate-[-90deg]' : ''
                        }`}
                        strokeWidth={2.75}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* SUPPORTING CARDS (5 remaining) */}
          {rest.map((sector, i) => {
            const tr = sector.translations[locale as 'en' | 'ar'];
            const isAccent = sector.accent === 'accent';

            return (
              <motion.div
                key={sector.slug}
                custom={i + 1}
                variants={cardVariants}
                className="md:col-span-1"
              >
                <Link href={`/sectors/${sector.slug}`} className="group block h-full">
                  <div className="skeu-panel skeu-panel-hover relative flex h-full flex-col overflow-hidden rounded-3xl p-5 md:p-6">
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      style={{
                        background: isAccent
                          ? 'radial-gradient(circle at 85% 15%, rgba(20,184,166,0.14), transparent 60%)'
                          : 'radial-gradient(circle at 85% 15%, rgba(233,122,0,0.14), transparent 60%)',
                      }}
                    />

                    <div className="relative flex items-start justify-between gap-3">
                      <span
                        className={`font-display text-[10px] font-bold tracking-[0.25em] ${
                          isAccent ? 'text-accent-500' : 'text-brand-500'
                        }`}
                      >
                        {sector.number}
                      </span>

                      <span
                        className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors duration-300 ${
                          isAccent
                            ? 'bg-accent-500/12 text-accent-500 group-hover:bg-accent-500 group-hover:text-white'
                            : 'bg-brand-500/12 text-brand-500 group-hover:bg-brand-500 group-hover:text-white'
                        }`}
                      >
                        <DynamicIcon name={sector.icon} className="h-4 w-4" />
                      </span>
                    </div>

                    <h3 className="relative mt-5 font-display text-lg font-black leading-tight tracking-tight text-foreground md:mt-6 md:text-xl">
                      {tr.name}
                    </h3>

                    <p className="relative mt-2 text-[12px] leading-relaxed text-muted md:text-[13px]">
                      {tr.tagline}
                    </p>

                    <div className="relative mt-auto pt-5">
                      <span
                        className={`inline-flex items-center gap-1.5 text-[11px] font-bold md:text-xs ${
                          isAccent ? 'text-accent-500' : 'text-brand-500'
                        }`}
                      >
                        <span>{t('explore')}</span>
                        <ArrowUpRight
                          className={`h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                            isRTL ? 'rotate-[-90deg]' : ''
                          }`}
                          strokeWidth={2.75}
                        />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* BOTTOM NOTE */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center text-[11px] font-bold uppercase tracking-[0.2em] text-muted md:mt-16 md:text-xs"
        >
          {t('footnote')}
        </motion.p>
      </div>
    </section>
  );
}