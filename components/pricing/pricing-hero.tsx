'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { motion, type Variants } from 'framer-motion';
import { ArrowDown, ArrowRight, ArrowUpRight } from 'lucide-react';

/* ============================================================
   MARQUEE COMPONENT
   ============================================================ */
function Marquee({
  text,
  direction = 'left',
  duration = 40,
}: {
  text: string;
  direction?: 'left' | 'right';
  duration?: number;
}) {
  const items = Array(8).fill(text);

  return (
    <div className="relative flex w-full overflow-hidden">
      <motion.div
        className="flex shrink-0 items-center gap-6 whitespace-nowrap md:gap-12"
        animate={{
          x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'],
        }}
        transition={{ duration, repeat: Infinity, ease: 'linear' }}
      >
        {items.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-6 md:gap-12"
            aria-hidden={i > 0}
          >
            <span className="font-display text-[9px] font-bold uppercase tracking-[0.3em] text-muted md:text-[11px] md:tracking-[0.35em]">
              {item}
            </span>
            <span className="h-1 w-1 shrink-0 rounded-full bg-brand-500" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* ============================================================
   ANIMATIONS
   ============================================================ */
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const headlineVariants: Variants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.7,
      delay: 0.2 + i * 0.1,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

/* ============================================================
   MAIN COMPONENT
   ============================================================ */
export function PricingHero() {
  const t = useTranslations('PricingHero');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const marqueeText = t('marquee');

  return (
    <section
      id="pricing-hero"
      className="relative overflow-hidden bg-background"
    >
      {/* ============================================================
          BACKGROUND LAYERS
         ============================================================ */}
      {/* Huge background word — PRICING */}
      <motion.div
        aria-hidden
        animate={{
          x: isRTL ? [0, -20, 0] : [0, 20, 0],
          y: [0, -10, 0],
        }}
        transition={{ duration: 36, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap font-display text-[19vw] font-black leading-none tracking-[-0.06em] text-brand-500/[0.045] blur-[2px] md:top-1/2 md:text-[22vw] md:text-brand-500/[0.055] md:blur-[3px] dark:text-brand-500/[0.065] dark:md:text-brand-500/[0.08]"
      >
        {t('noiseWord')}
      </motion.div>

      {/* Orange orb */}
      <motion.div
        aria-hidden
        className="orb-brand pointer-events-none absolute -left-32 top-10 h-[320px] w-[320px] rounded-full blur-3xl md:h-[500px] md:w-[500px]"
        animate={{ x: [0, 25, -8, 0], y: [0, -18, 8, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Teal orb */}
      <motion.div
        aria-hidden
        className="orb-teal pointer-events-none absolute -bottom-40 -right-32 h-[340px] w-[340px] rounded-full blur-3xl md:h-[520px] md:w-[520px]"
        animate={{ x: [0, -20, 12, 0], y: [0, 12, -20, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Grid pattern */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 text-foreground opacity-[0.04] dark:opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage:
            'radial-gradient(ellipse 80% 70% at 50% 50%, black 40%, transparent 90%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 80% 70% at 50% 50%, black 40%, transparent 90%)',
        }}
      />

      {/* ============================================================
          TOP MARQUEE
         ============================================================ */}
      <div className="relative border-y border-border/50 bg-background/50 backdrop-blur-sm">
        <div className="py-2.5 md:py-4">
          <Marquee
            text={marqueeText}
            direction={isRTL ? 'right' : 'left'}
            duration={45}
          />
        </div>
      </div>

      {/* ============================================================
          MAIN CONTENT
         ============================================================ */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative mx-auto flex max-w-5xl flex-col items-center px-5 py-16 text-center sm:py-20 md:px-8 md:py-24 lg:py-28"
      >
        {/* Badge */}
        <motion.div variants={itemVariants}>
          <div className="skeu-badge inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-500 md:text-[11px]">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-500 animate-pulse" />
            {t('badge')}
          </div>
        </motion.div>

        {/* Headline */}
        <h1 className="mt-6 font-display text-[clamp(2.25rem,7vw,4.5rem)] font-black leading-[1.05] tracking-[-0.04em] text-foreground md:mt-8">
          <motion.span
            custom={0}
            variants={headlineVariants}
            className="block"
          >
            {t('headline.line1')}
          </motion.span>
          <motion.span
            custom={1}
            variants={headlineVariants}
            className="mt-1 block"
          >
            {t('headline.line2')}
          </motion.span>
          <motion.span
            custom={2}
            variants={headlineVariants}
            className="text-gradient-animated mt-1 block"
          >
            {t('headline.line3')}
          </motion.span>
        </h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="mx-auto mt-6 max-w-xl text-[14px] leading-relaxed text-muted sm:text-[15px] md:mt-8 md:text-base"
        >
          {t('subtitle')}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row sm:gap-4 md:mt-10"
        >
          {/* Primary CTA */}
          <Link
            href="#packages"
            className="skeu-btn group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3 text-[13px] font-bold sm:w-auto md:px-7 md:py-3.5 md:text-sm"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-[600ms] ease-out group-hover:translate-x-[300%]"
            />
            <span className="relative">{t('ctaPrimary')}</span>
            <ArrowDown className="relative h-3.5 w-3.5 animate-bounce transition-transform duration-300" strokeWidth={2.75} />
          </Link>

          {/* Secondary CTA */}
          <Link
            href="/contact"
            className="skeu-btn-secondary group inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-[13px] font-semibold sm:w-auto md:px-7 md:py-3.5 md:text-sm"
          >
            <span>{t('ctaSecondary')}</span>
            <ArrowUpRight
              className={`h-3.5 w-3.5 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                isRTL ? 'rotate-[-90deg]' : ''
              }`}
              strokeWidth={2.75}
            />
          </Link>
        </motion.div>
      </motion.div>

      {/* ============================================================
          BOTTOM MARQUEE
         ============================================================ */}
      <div className="relative border-y border-border/50 bg-background/50 backdrop-blur-sm">
        <div className="py-2.5 md:py-4">
          <Marquee
            text={marqueeText}
            direction={isRTL ? 'left' : 'right'}
            duration={45}
          />
        </div>
      </div>
    </section>
  );
}