'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { motion, type Variants } from 'framer-motion';
import { Sparkles, ArrowRight, ArrowUpRight } from 'lucide-react';

/* ============================================================
   ANIMATIONS
   ============================================================ */
const headlineVariants: Variants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.75,
      delay: 0.15 + i * 0.1,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ============================================================
   MARQUEE — infinite scrolling text
   ============================================================ */
function Marquee({
  text,
  direction = 'left',
  duration = 45,
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
   SERVICES HERO — Editorial Manifesto
   ============================================================ */
export function ServicesHero() {
  const t = useTranslations('ServicesHero');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const headlineLines = [
    t('headline.line1'),
    t('headline.line2'),
    t('headline.line3'),
    t('headline.line4'),
  ];

  const marqueeText = t('marquee');

  const infoItems = [
    { value: t('info.servicesValue'), label: t('info.servicesLabel') },
    { value: t('info.locationValue'), label: t('info.locationLabel') },
    { value: t('info.langValue'),     label: t('info.langLabel') },
  ];

  return (
    <section
      id="services-hero"
      className="relative overflow-hidden bg-background"
    >
      {/* ============================================================
          BACKGROUND LAYERS
         ============================================================ */}

      {/* ---------- HUGE NOISE WORD (soft, blurred, atmospheric) ---------- */}
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

      {/* ---------- Orange orb ---------- */}
      <motion.div
        aria-hidden
        className="orb-brand pointer-events-none absolute -left-40 top-0 h-[320px] w-[320px] rounded-full blur-3xl md:h-[500px] md:w-[500px]"
        animate={{ x: [0, 25, -8, 0], y: [0, -18, 8, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* ---------- Teal orb ---------- */}
      <motion.div
        aria-hidden
        className="orb-teal pointer-events-none absolute -bottom-40 -right-40 h-[340px] w-[340px] rounded-full blur-3xl md:h-[520px] md:w-[520px]"
        animate={{ x: [0, -20, 12, 0], y: [0, 12, -20, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* ---------- Grid pattern ---------- */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 text-foreground opacity-[0.04] dark:opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage:
            'radial-gradient(ellipse 80% 70% at 50% 50%, black 40%, transparent 90%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 80% 70% at 50% 50%, black 40%, transparent 90%)',
        }}
      />

      {/* ---------- Vignette (top + bottom fade, smooth edges) ---------- */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, var(--background) 0%, transparent 12%, transparent 88%, var(--background) 100%)',
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
            duration={48}
          />
        </div>
      </div>

      {/* ============================================================
          MAIN CONTENT
         ============================================================ */}
      <div className="relative mx-auto flex max-w-5xl flex-col items-center px-5 py-16 text-center sm:py-20 md:px-8 md:py-24 lg:py-28 md:bottom-25">


        {/* ---------- HEADLINE (4 lines, editorial, big on mobile) ---------- */}
        <h1 className="mt-6 font-display text-[clamp(2.75rem,11.5vw,8.5rem)] font-black leading-[0.92] tracking-[-0.045em] text-foreground sm:leading-[0.9] md:mt-8 md:leading-[0.88] md:tracking-[-0.05em]">
          {headlineLines.map((line, i) => {
            const isLast = i === headlineLines.length - 1;
            return (
              <motion.span
                key={i}
                custom={i}
                variants={headlineVariants}
                initial="hidden"
                animate="visible"
                className="block"
              >
                {isLast ? (
                  <span className="text-gradient-animated inline-block">
                    {line}
                  </span>
                ) : (
                  line
                )}
              </motion.span>
            );
          })}
        </h1>

        {/* ---------- SUBTITLE ---------- */}
        <motion.p
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.7, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-6 max-w-2xl text-[13px] leading-relaxed text-muted sm:text-[14px] md:mt-8 md:text-base lg:text-lg"
        >
          {t('subtitle')}
        </motion.p>

        {/* ---------- CTA BUTTONS (compact, auto-width, centered) ---------- */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.85, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 flex flex-col items-center justify-center gap-2.5 sm:flex-row sm:gap-3.5 md:mt-11"
        >
          {/* Primary */}
          <Link
            href="#services-list"
            className="skeu-btn group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-5 py-2.5 text-[12px] font-bold md:px-6 md:py-3 md:text-sm"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-[600ms] ease-out group-hover:translate-x-[300%]"
            />
            <span className="relative">{t('ctaPrimary')}</span>
            <ArrowRight
              className={`relative h-3 w-3 transition-transform duration-200 ease-out md:h-3.5 md:w-3.5 ${
                isRTL
                  ? 'rotate-180 group-hover:-translate-x-0.5 group-hover:translate-x-0'
                  : 'group-hover:translate-x-0.5'
              }`}
              strokeWidth={2.75}
            />
          </Link>

          {/* Secondary */}
          <Link
            href="/contact"
            className="skeu-btn-secondary group inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-[12px] font-semibold md:px-6 md:py-3 md:text-sm"
          >
            <span>{t('ctaSecondary')}</span>
            <ArrowUpRight
              className={`h-3 w-3 transition-transform duration-200 ease-out md:h-3.5 md:w-3.5 ${
                isRTL ? 'rotate-[-90deg]' : ''
              }`}
              strokeWidth={2.75}
            />
          </Link>
        </motion.div>
      </div>

      {/* ============================================================
          BOTTOM MARQUEE (reverse direction)
         ============================================================ */}
      <div className="relative border-y border-border/50 bg-background/50 backdrop-blur-sm">
        <div className="py-2.5 md:py-4">
          <Marquee
            text={marqueeText}
            direction={isRTL ? 'left' : 'right'}
            duration={48}
          />
        </div>
      </div>

      {/* ============================================================
          INFO STRIP
         ============================================================ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto max-w-6xl px-4 py-7 md:px-8 md:py-10"
      >
        <div className="grid grid-cols-3 divide-x divide-border/40">
          {infoItems.map((item, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center px-2 text-center md:px-4"
            >
              <span className="font-display text-xl font-black leading-none tracking-tight text-foreground md:text-3xl">
                {item.value}
              </span>
              <span className="mt-1.5 text-[8px] font-bold uppercase tracking-[0.18em] text-muted md:mt-2 md:text-[10px] md:tracking-[0.2em]">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}