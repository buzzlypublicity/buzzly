'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion, type Variants } from 'framer-motion';
import { Check, MessageCircle, Sparkles, Star } from 'lucide-react';
import { ALL_PRICING_CATEGORIES } from '@/data/pricing';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: (i: number) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function PricingCards() {
  const t = useTranslations('PricingCards');
  const locale = useLocale();

  return (
    <div className="relative overflow-hidden bg-background pb-16 md:pb-24">
      <div className="pointer-events-none absolute -left-40 top-1/4 h-[400px] w-[400px] rounded-full orb-brand blur-3xl opacity-40" />
      <div className="pointer-events-none absolute -right-40 bottom-1/4 h-[400px] w-[400px] rounded-full orb-teal blur-3xl opacity-40" />

      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        {ALL_PRICING_CATEGORIES.map((category) => (
          <section
            key={category.id}
            id={category.id}
            className="scroll-mt-32 py-12 md:py-20"
          >
            {/* HEADER */}
            <div className="mx-auto mb-8 max-w-2xl text-center md:mb-16">
              <div className="skeu-badge inline-flex items-center gap-2 rounded-full px-3 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-brand-500 md:px-3.5 md:py-1.5 md:text-[11px]">
                <Sparkles className="h-2.5 w-2.5 md:h-3 md:w-3" strokeWidth={2.5} />
                {t('badge')}
              </div>
              <h2 className="mt-3 font-display text-2xl font-black text-foreground md:mt-4 md:text-4xl lg:text-5xl">
                {category.title[locale as 'en' | 'ar']}
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-[12px] leading-relaxed text-muted md:mt-4 md:text-[15px]">
                {category.description[locale as 'en' | 'ar']}
              </p>
            </div>

            {/* CARDS GRID */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className={`mx-auto grid max-w-6xl gap-4 md:gap-6 lg:gap-8 ${
                category.packages.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'
              }`}
            >
              {category.packages.map((pkg, index) => (
                <motion.div
                  key={pkg.id}
                  custom={index}
                  variants={cardVariants}
                  className={`relative flex flex-col rounded-3xl p-5 md:rounded-[2rem] md:p-8 ${
                    pkg.isPopular
                      ? 'skeu-panel z-10 border-2 border-brand-500 shadow-xl shadow-brand-500/20 md:scale-105 lg:p-10'
                      : 'skeu-panel skeu-panel-hover'
                  }`}
                >
                  {/* Most Popular Badge */}
                  {pkg.isPopular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-brand-500 px-3 py-0.5 text-[8px] font-bold uppercase tracking-[0.2em] text-white shadow-lg md:-top-4 md:px-4 md:py-1 md:text-[11px]">
                      <Star className="mr-1 inline-block h-2.5 w-2.5 fill-white md:h-3 md:w-3" />
                      {t('mostPopular')}
                    </div>
                  )}

                  {/* Package Name & Price */}
                  <div className="text-center">
                    <h3 className="font-display text-base font-black text-foreground md:text-xl">
                      {pkg.name[locale as 'en' | 'ar']}
                    </h3>
                    
                    <div className="mt-2 flex items-baseline justify-center gap-1 md:mt-4 md:gap-1.5">
                      <span className="font-display text-3xl font-black text-foreground md:text-5xl">
                        {pkg.price}
                      </span>
                      {pkg.period && (
                        <span className="text-[10px] font-semibold text-muted md:text-sm">
                          {pkg.period[locale as 'en' | 'ar']}
                        </span>
                      )}
                    </div>
                    
                    <p className="mt-1 text-[9px] font-bold uppercase tracking-wider text-muted md:mt-3 md:text-xs">
                      {category.pricingType[locale as 'en' | 'ar']}
                    </p>
                  </div>

                  {/* Divider */}
                  <div className="my-4 h-px w-full bg-gradient-to-r from-transparent via-border to-transparent md:my-8" />

                  {/* Features List */}
                  <ul className="flex-1 space-y-2 md:space-y-4">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 md:gap-3">
                        <span
                          className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full md:h-5 md:w-5 ${
                            pkg.isPopular
                              ? 'bg-brand-500/15 text-brand-500'
                              : 'bg-foreground/5 text-muted'
                          }`}
                        >
                          <Check className="h-2.5 w-2.5 md:h-3 md:w-3" strokeWidth={3} />
                        </span>
                        <span className="text-[11px] leading-snug text-foreground/80 md:text-[14px] md:leading-relaxed">
                          {feature[locale as 'en' | 'ar']}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <div className="mt-6 md:mt-8">
                    <a
                      href={`https://wa.me/97366316733?text=Hi BUZZLY, I'm interested in the ${pkg.name.en} package (${category.title.en}).`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex w-full items-center justify-center gap-1.5 rounded-full px-4 py-2.5 text-[11px] font-bold transition-all duration-300 md:px-6 md:py-3.5 md:text-sm ${
                        pkg.isPopular
                          ? 'skeu-btn'
                          : 'border border-border/60 bg-transparent text-foreground hover:border-brand-500/50 hover:bg-brand-500/5 hover:text-brand-500'
                      }`}
                    >
                      {pkg.isPopular ? (
                        <>
                          <MessageCircle className="h-3 w-3 md:h-4 md:w-4" />
                          {t('getStarted')}
                        </>
                      ) : (
                        <>{t('inquire')}</>
                      )}
                    </a>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </section>
        ))}
      </div>
    </div>
  );
}