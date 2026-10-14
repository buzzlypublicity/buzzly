'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import {
  motion,
  AnimatePresence,
  type Variants,
  type PanInfo,
} from 'framer-motion';
import {
  TrendingUp,
  Clapperboard,
  Palette,
  Code,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';

/* ============================================================
   SERVICES DATA — no fake info
   ============================================================ */
const SERVICES = [
  { key: 'marketing', number: '01', icon: TrendingUp,   featured: true  },
  { key: 'video',     number: '02', icon: Clapperboard, featured: false },
  { key: 'branding',  number: '03', icon: Palette,      featured: false },
  { key: 'web',       number: '04', icon: Code,         featured: true  },
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

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.65,
      delay: i * 0.1,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

/* ============================================================
   MAIN SECTION
   ============================================================ */
export function Services() {
  const t = useTranslations('Services');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-background py-20 md:py-28 lg:py-32"
    >
      {/* Ambient glows */}
      <div className="pointer-events-none absolute -left-40 top-20 h-[400px] w-[400px] rounded-full orb-brand blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-20 h-[400px] w-[400px] rounded-full orb-teal blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">

        {/* ============================================================
            HEADER
           ============================================================ */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="neu-inset inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-500 md:text-[11px]">
            <Sparkles className="h-3 w-3" strokeWidth={2.5} />
            {t('badge')}
          </div>

          <h2 className="mt-5 font-display text-4xl font-black leading-[1.05] tracking-tight text-foreground sm:text-5xl md:mt-6 md:text-6xl">
            {t('title')}
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-muted md:mt-6 md:text-base">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* ============================================================
            DESKTOP — BENTO GRID
           ============================================================ */}
        <div className="mt-14 hidden gap-5 md:mt-20 md:grid md:grid-cols-3 md:gap-6">
          {SERVICES.map(({ key, number, icon: Icon, featured }, i) => {
            const isBig = featured;
            const spanClass = isBig ? 'md:col-span-2' : 'md:col-span-1';

            return (
              <motion.article
                key={key}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                className={`group relative flex flex-col overflow-hidden rounded-3xl p-7 lg:p-9 ${spanClass} ${
                  isBig
                    ? 'neu-raised neu-raised-hover min-h-[280px] lg:min-h-[320px]'
                    : 'neu-raised neu-raised-hover min-h-[280px] lg:min-h-[320px]'
                }`}
              >
                {/* Hover glow overlay */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      'radial-gradient(circle at 80% 20%, rgba(233,122,0,0.12), transparent 60%)',
                  }}
                />

                {/* ---------- Top row ---------- */}
                <div className="relative flex items-start justify-between">
                  <span className="font-display text-xs font-bold tracking-[0.25em] text-muted">
                    {number}
                  </span>

                  <motion.span
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className={`flex items-center justify-center rounded-2xl bg-brand-500/10 text-brand-500 transition-colors duration-300 group-hover:bg-brand-500 group-hover:text-white ${
                      isBig ? 'h-14 w-14 lg:h-16 lg:w-16' : 'h-12 w-12'
                    }`}
                  >
                    <Icon
                      className={isBig ? 'h-6 w-6 lg:h-7 lg:w-7' : 'h-5 w-5'}
                      strokeWidth={2.25}
                    />
                  </motion.span>
                </div>

                {/* ---------- Content (bottom) ---------- */}
                <div className="relative mt-auto pt-8">
                  <h3
                    className={`font-display font-black leading-tight tracking-tight text-foreground ${
                      isBig
                        ? 'text-2xl md:text-3xl lg:text-4xl'
                        : 'text-xl md:text-2xl'
                    }`}
                  >
                    {t(`items.${key}.title`)}
                  </h3>

                  <p
                    className={`mt-3 leading-relaxed text-muted ${
                      isBig ? 'text-sm md:text-base' : 'text-sm'
                    }`}
                  >
                    {t(`items.${key}.description`)}
                  </p>

                  <Link
                    href="/services"
                    className="group/cta mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-500"
                  >
                    <span>{t(`items.${key}.cta`)}</span>
                    <ArrowUpRight
                      className={`h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5 ${
                        isRTL ? 'rotate-[-90deg]' : ''
                      }`}
                      strokeWidth={2.5}
                    />
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* ============================================================
            MOBILE — SWIPEABLE CARD STACK
           ============================================================ */}
        <div className="mt-12 md:hidden">
          <MobileCardStack isRTL={isRTL} t={t} />
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   MOBILE CARD STACK (Tinder-style swipe)
   ============================================================ */
/* ============================================================
   MOBILE CARD STACK (Left/Right swipe · Tinder-style)
   ============================================================ */
function MobileCardStack({
  isRTL,
  t,
}: {
  isRTL: boolean;
  t: ReturnType<typeof useTranslations>;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [exitDir, setExitDir] = useState<'left' | 'right' | null>(null);

  const goNext = (dir: 'left' | 'right') => {
    if (activeIndex >= SERVICES.length - 1) return;
    setExitDir(dir);
    setActiveIndex((i) => i + 1);
    setTimeout(() => setExitDir(null), 500);
  };

  const handleDragEnd = (_: any, info: PanInfo) => {
    const threshold = 80;
    const velocity = 400;

    if (info.offset.x < -threshold || info.velocity.x < -velocity) {
      if (isRTL) {
        if (activeIndex > 0) setActiveIndex((i) => i - 1);
      } else {
        goNext('left');
      }
    } else if (info.offset.x > threshold || info.velocity.x > velocity) {
      if (isRTL) {
        goNext('right');
      } else {
        if (activeIndex > 0) setActiveIndex((i) => i - 1);
      }
    }
  };

  const getExitAnimation = () => {
    if (exitDir === 'left') {
      return { opacity: 0, x: -320, rotate: -10, scale: 0.9 };
    }
    if (exitDir === 'right') {
      return { opacity: 0, x: 320, rotate: 10, scale: 0.9 };
    }
    return { opacity: 0, scale: 0.9 };
  };

  return (
    <div className="relative select-none">

      {/* ============================================================
          CARD STACK
         ============================================================ */}
      <div className="relative mx-auto h-[380px] w-full max-w-sm sm:h-[400px]">

        <AnimatePresence initial={false}>
          {SERVICES.map(({ key, number, icon: Icon }, i) => {
            const offset = i - activeIndex;
            if (offset > 2) return null;
            if (offset < 0) return null;

            const isActive = offset === 0;

            return (
              <motion.article
                key={key}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  y: offset * -10,
                  scale: 1 - offset * 0.06,
                  rotate: 0,
                }}
                exit={getExitAnimation()}
                transition={{
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                  zIndex: SERVICES.length - i,
                  transformOrigin: 'center bottom',
                }}
                drag={isActive ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.55}
                onDragEnd={isActive ? handleDragEnd : undefined}
                whileDrag={{
                  cursor: 'grabbing',
                }}
                /* 👇 SAME AS DESKTOP — all cards neu-raised */
                className="neu-raised absolute inset-0 flex cursor-grab flex-col overflow-hidden rounded-[28px] touch-pan-y"
              >
                {/* Active card: subtle orange glow overlay (matches desktop hover) */}
                <div
                  aria-hidden
                  className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ${
                    isActive ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{
                    background:
                      'radial-gradient(circle at 85% 15%, rgba(233,122,0,0.14), transparent 60%)',
                  }}
                />

                {/* Active card: subtle border glow */}
                {isActive && (
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-[28px]"
                    style={{
                      boxShadow:
                        'inset 0 0 0 1px rgba(233,122,0,0.18), 0 0 40px -8px rgba(233,122,0,0.25)',
                    }}
                  />
                )}

                {/* ============================================================
                    CARD CONTENT (professional padding)
                   ============================================================ */}
                <div className="relative flex h-full flex-col p-6 sm:p-7">

                  {/* Top row: number + icon */}
                  <div className="flex items-start justify-between">
                    <span className="font-display text-[11px] font-bold tracking-[0.3em] text-muted">
                      {number}
                    </span>

                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-500/10 text-brand-500">
                      <Icon className="h-5 w-5" strokeWidth={2.25} />
                    </span>
                  </div>

                  {/* Spacer */}
                  <div className="flex-1" />

                  {/* Title + description */}
                  <div className="space-y-3">
                    <h3 className="font-display text-2xl font-black leading-tight tracking-tight text-foreground">
                      {t(`items.${key}.title`)}
                    </h3>

                    <p className="text-sm leading-relaxed text-muted">
                      {t(`items.${key}.description`)}
                    </p>
                  </div>

                  {/* CTA */}
                  <Link
                    href="/services"
                    className="group/cta mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-500"
                  >
                    <span>{t(`items.${key}.cta`)}</span>
                    <ArrowUpRight
                      className={`h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5 ${
                        isRTL ? 'rotate-[-90deg]' : ''
                      }`}
                      strokeWidth={2.5}
                    />
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </div>

      {/* ============================================================
          NAV — arrows + dots
         ============================================================ */}
      <div className="mt-8 flex items-center justify-center gap-5">
        {/* Left arrow */}
        <motion.button
          type="button"
          onClick={() => {
            if (!isRTL && activeIndex > 0) setActiveIndex((i) => i - 1);
            if (isRTL && activeIndex < SERVICES.length - 1) {
              setExitDir('right');
              setActiveIndex((i) => i + 1);
              setTimeout(() => setExitDir(null), 500);
            }
          }}
          disabled={!isRTL ? activeIndex === 0 : activeIndex === SERVICES.length - 1}
          aria-label="Previous"
          whileTap={{ scale: 0.9 }}
          className="neu-raised neu-raised-hover flex h-10 w-10 items-center justify-center rounded-full text-foreground transition-opacity disabled:cursor-not-allowed disabled:opacity-30"
        >
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </motion.button>

        {/* Dots */}
        <div className="flex items-center gap-2">
          {SERVICES.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveIndex(i)}
              aria-label={`Go to service ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === activeIndex
                  ? 'w-7 bg-brand-500'
                  : 'w-1.5 bg-border hover:bg-muted'
              }`}
            />
          ))}
        </div>

        {/* Right arrow */}
        <motion.button
          type="button"
          onClick={() => {
            if (!isRTL && activeIndex < SERVICES.length - 1) {
              setExitDir('left');
              setActiveIndex((i) => i + 1);
              setTimeout(() => setExitDir(null), 500);
            }
            if (isRTL && activeIndex > 0) setActiveIndex((i) => i - 1);
          }}
          disabled={!isRTL ? activeIndex === SERVICES.length - 1 : activeIndex === 0}
          aria-label="Next"
          whileTap={{ scale: 0.9 }}
          className="neu-brand neu-brand-hover flex h-10 w-10 items-center justify-center rounded-full text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-30"
        >
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </motion.button>
      </div>

      {/* Subtle swipe hint */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: activeIndex === 0 ? 1 : 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="mt-4 text-center text-[10px] font-semibold uppercase tracking-[0.25em] text-muted"
      >
        {t('swipeHint')}
      </motion.p>
    </div>
  );
}