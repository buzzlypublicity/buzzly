'use client';

import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { motion, type Variants } from 'framer-motion';
import { Sparkles, ArrowUpRight, GraduationCap, Building2, UtensilsCrossed, ShoppingBag } from 'lucide-react';
import { CLIENT_WORK } from '@/data/client-work';
import { Link } from '@/i18n/navigation';

const ICON_MAP: Record<string, React.ElementType> = {
  GraduationCap,
  Building2,
  UtensilsCrossed,
  ShoppingBag,
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: (i: number) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function ClientWork() {
  const t = useTranslations('ClientWork');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  return (
    <section className="relative overflow-hidden bg-background py-20 md:py-28">
      {/* Background Orbs */}
      <div className="pointer-events-none absolute -right-40 top-1/4 h-[400px] w-[400px] rounded-full orb-brand blur-3xl opacity-30" />
      <div className="pointer-events-none absolute -left-40 bottom-1/4 h-[400px] w-[400px] rounded-full orb-teal blur-3xl opacity-30" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        
        {/* Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
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
        </div>

        {/* Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6"
        >
          {CLIENT_WORK.map((work, index) => {
            const Icon = ICON_MAP[work.icon] || Building2;

            return (
              // 👇 POORA CARD AB LINK HAI 👇
              <Link 
                key={work.id} 
                href={`/case-studies/${work.slug}`}
                className="block h-full"
              >
                <motion.div
                  custom={index}
                  variants={cardVariants}
                  className={`group relative flex h-full min-h-[280px] flex-col overflow-hidden rounded-3xl skeu-panel skeu-panel-hover ${work.className}`}
                >
                  {/* Background Image */}
                  <div className="absolute inset-0 z-0">
                    <Image
                      src={work.image}
                      alt={work.industry[locale as 'en' | 'ar']}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                    {/* Fallback Gradient & Icon */}
                    <div className="absolute inset-0 -z-10 flex items-center justify-center bg-gradient-to-br from-brand-500/20 via-background to-background dark:from-brand-500/10">
                      <Icon className="h-32 w-32 text-brand-500/10" />
                    </div>
                  </div>

                  {/* Dark Gradient Overlay */}
                  <div className="absolute inset-0 z-10 bg-gradient-to-t from-ink-950/95 via-ink-950/40 to-transparent" />

                  {/* Content */}
                  <div className="relative z-20 flex h-full flex-col justify-end p-6 md:p-8">
                    
                    {/* Top Tag */}
                    <div className="absolute start-6 top-6 md:start-8 md:top-8">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.15em] text-white backdrop-blur-md md:text-[10px]">
                        <Icon className="h-3 w-3" />
                        {work.industry[locale as 'en' | 'ar']}
                      </span>
                    </div>

                    {/* Bottom Content */}
                    <div className="mt-auto">
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-300 md:text-[11px]">
                        {work.scope[locale as 'en' | 'ar']}
                      </p>
                      <h3 className="mt-2 font-display text-xl font-black leading-tight text-white md:text-2xl">
                        {work.tagline[locale as 'en' | 'ar']}
                      </h3>
                      
                      {/* Hover Arrow */}
                      <div className="mt-4 flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-white/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <span>{t('viewCase')}</span>
                        <ArrowUpRight className={`h-3 w-3 ${isRTL ? 'rotate-[-90deg]' : ''}`} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </motion.div>

        {/* CTA Link */}
        <div className="mt-10 text-center md:mt-12">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-[13px] font-bold text-brand-500 transition-colors hover:text-brand-600 md:text-sm"
          >
            {t('cta')}
            <ArrowUpRight className={`h-4 w-4 ${isRTL ? 'rotate-[-90deg]' : ''}`} />
          </Link>
        </div>

      </div>
    </section>
  );
}