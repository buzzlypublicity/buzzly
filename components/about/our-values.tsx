'use client';

import { useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import {
  motion,
  useScroll,
  useTransform,
  type Variants,
} from 'framer-motion';
import { Sparkles } from 'lucide-react';

/* ============================================================
   6 VALUES
   ============================================================ */
const VALUES = [
  { key: 'creativity',    number: '01', accent: 'brand'  as const },
  { key: 'honest',        number: '02', accent: 'accent' as const },
  { key: 'strategic',     number: '03', accent: 'brand'  as const },
  { key: 'detail',        number: '04', accent: 'accent' as const },
  { key: 'collaboration', number: '05', accent: 'brand'  as const },
  { key: 'improvement',   number: '06', accent: 'accent' as const },
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

const rowVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.06,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

/* ============================================================
   MAIN COMPONENT
   ============================================================ */
export function OurValues() {
  const t = useTranslations('OurValues');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.85', 'end 0.4'],
  });

  const lineProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      id="our-values"
      className="relative overflow-hidden bg-background py-20 md:py-24 lg:py-28"
    >
      {/* Orbs */}
      <div className="pointer-events-none absolute -left-40 top-1/4 h-[380px] w-[380px] rounded-full orb-brand blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-1/4 h-[380px] w-[380px] rounded-full orb-teal blur-3xl" />

      <div className="relative mx-auto max-w-4xl px-5 md:px-8">

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
            EDITORIAL ROWS
           ============================================================ */}
        <div ref={containerRef} className="relative mt-14 md:mt-20">

          {/* Left vertical progress line (desktop) */}
          <div className="pointer-events-none absolute inset-y-0 start-0 hidden w-px md:block">
            <div className="absolute inset-y-0 w-px bg-border/60" />
            <motion.div
              className="absolute top-0 w-px origin-top bg-gradient-to-b from-brand-500 to-accent-500"
              style={{ height: '100%', scaleY: lineProgress }}
            />
          </div>

          <div className="md:ps-12 lg:ps-16">
            {VALUES.map((value, i) => {
              const isAccent = value.accent === 'accent';
              const isLast = i === VALUES.length - 1;

              return (
                <motion.div
                  key={value.key}
                  custom={i}
                  variants={rowVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-40px' }}
                  className={`group relative grid grid-cols-[auto_1fr] gap-5 md:grid-cols-[88px_1fr] md:gap-8 lg:gap-10 ${
                    isLast ? 'pb-0' : 'pb-10 md:pb-14'
                  }`}
                >
                  {/* Number */}
                  <div className="relative">
                    <span
                      className={`font-display text-3xl font-black leading-none tracking-tight transition-colors duration-500 md:text-4xl lg:text-5xl ${
                        isAccent
                          ? 'text-accent-500/30 group-hover:text-accent-500'
                          : 'text-brand-500/30 group-hover:text-brand-500'
                      }`}
                    >
                      {value.number}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="min-w-0">
                    <p
                      className={`text-[10px] font-bold uppercase tracking-[0.3em] transition-colors duration-300 md:text-[11px] ${
                        isAccent ? 'text-accent-500' : 'text-brand-500'
                      }`}
                    >
                      {t(`values.${value.key}.label`)}
                    </p>

                    <h3 className="mt-2 font-display text-xl font-black leading-tight tracking-tight text-foreground md:mt-3 md:text-2xl lg:text-[28px]">
                      {t(`values.${value.key}.title`)}
                    </h3>

                    <p className="mt-3 max-w-2xl text-[13.5px] leading-relaxed text-muted md:mt-4 md:text-[15px]">
                      {t(`values.${value.key}.description`)}
                    </p>

                    {/* Accent bar (grows on hover) */}
                    <div
                      className={`mt-5 h-[2px] w-0 rounded-full transition-all duration-500 ease-out group-hover:w-16 md:mt-6 ${
                        isAccent ? 'bg-accent-500' : 'bg-brand-500'
                      }`}
                    />

                    {/* Divider (except last) */}
                    {!isLast && (
                      <div
                        aria-hidden
                        className="mt-10 h-px w-full md:mt-14"
                        style={{
                          background:
                            'linear-gradient(to right, var(--color-border) 0%, transparent 100%)',
                        }}
                      />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}