'use client';

import { useTranslations } from 'next-intl';
import { motion, type Variants } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const STEPS = [
  { key: 'research',   number: '01' },
  { key: 'direction',  number: '02' },
  { key: 'execution',  number: '03' },
  { key: 'reflection', number: '04' },
] as const;

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
    transition: { duration: 0.55, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function WorkApproach() {
  const t = useTranslations('WorkApproach');

  return (
    <section
      id="approach"
      className="relative overflow-hidden bg-background py-20 md:py-24 lg:py-28"
    >
      {/* Orbs */}
      <div className="pointer-events-none absolute -left-40 top-1/4 h-[380px] w-[380px] rounded-full orb-brand blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-1/4 h-[380px] w-[380px] rounded-full orb-teal blur-3xl" />

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

        {/* STEPS */}
        <div className="mt-12 md:mt-16">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.key}
              custom={i}
              variants={rowVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              className="group relative grid grid-cols-[auto_1fr] items-start gap-5 border-b border-border/50 py-7 md:grid-cols-[100px_1fr] md:gap-10 md:py-9"
            >
              {/* Number */}
              <span className="font-display text-3xl font-black leading-none tracking-tight text-brand-500/60 transition-colors duration-300 group-hover:text-brand-500 md:text-4xl">
                {step.number}
              </span>

              {/* Content */}
              <div className="min-w-0">
                <h3 className="font-display text-lg font-black leading-tight tracking-tight text-foreground md:text-xl lg:text-2xl">
                  {t(`steps.${step.key}.title`)}
                </h3>
                <p className="mt-2 max-w-2xl text-[13px] leading-relaxed text-muted md:mt-2.5 md:text-[15px]">
                  {t(`steps.${step.key}.description`)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}