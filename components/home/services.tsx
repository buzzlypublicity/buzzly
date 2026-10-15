'use client';

import { useState } from 'react';
import Image from 'next/image';
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
   SERVICES DATA — images in /public/services/
   ============================================================ */
const SERVICES = [
  {
    key: 'marketing',
    number: '01',
    icon: TrendingUp,
    featured: true,
    image: '/services/s4.jpg',
  },
  {
    key: 'video',
    number: '02',
    icon: Clapperboard,
    featured: false,
    image: '/services/s1.jpg',
  },
  {
    key: 'branding',
    number: '03',
    icon: Palette,
    featured: false,
    image: '/services/s3.jpg',
  },
  {
    key: 'web',
    number: '04',
    icon: Code,
    featured: true,
    image: '/services/s2.jpg',
  },
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
          <div className="skeu-badge inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-brand-500 md:text-[11px]">
            <Sparkles className="h-3 w-3" strokeWidth={2.5} />
            {t('badge')}
          </div>

          <h2 className="mt-5 font-display text-3xl font-black leading-[1.08] tracking-tight text-foreground sm:text-4xl md:mt-6 md:text-5xl">
            {t('title')}
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-[14px] leading-relaxed text-muted md:mt-5 md:text-base">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* ============================================================
            DESKTOP — BENTO GRID
           ============================================================ */}
        <div className="mt-14 hidden gap-5 md:mt-16 md:grid md:grid-cols-3 md:gap-6">
          {SERVICES.map(({ key, number, icon: Icon, featured, image }, i) => {
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
                className={`group relative flex flex-col overflow-hidden rounded-3xl skeu-panel skeu-panel-hover ${spanClass}`}
              >
                {/* ============================================================
                    IMAGE AREA — smooth fade into content
                   ============================================================ */}
                <div
  className={`relative w-full overflow-hidden select-none ${
    isBig
      ? 'h-[240px] lg:h-[280px]'
      : 'h-[200px] lg:h-[220px]'
  }`}
  onContextMenu={(e) => e.preventDefault()} // Right-click block trigger
>
  {/* Image */}
  <Image
    src={image}
    alt={t(`items.${key}.title`)}
    fill
    sizes={
      isBig
        ? '(min-width: 768px) 66vw, 100vw'
        : '(min-width: 768px) 33vw, 100vw'
    }
    className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105 pointer-events-none"
    priority={i === 0}
    draggable={false} // Prevents dragging the image
  />

  {/* Dark top overlay (badge legibility) */}
  <div
    aria-hidden
    className="pointer-events-none absolute inset-x-0 top-0 h-16"
    style={{
      background:
        'linear-gradient(180deg, rgba(0,0,0,0.32), transparent 100%)',
    }}
  />

  {/* 🔥 SMOOTH FADE — image melts into card bg */}
  <div
    aria-hidden
    className="pointer-events-none absolute inset-x-0 bottom-0 h-32 md:h-40"
    style={{
      background:
        'linear-gradient(180deg, transparent 0%, color-mix(in oklab, var(--skeu-surface-top) 30%, transparent) 40%, color-mix(in oklab, var(--skeu-surface-top) 75%, transparent) 75%, var(--skeu-surface-top) 100%)',
    }}
  />

  {/* Number badge (top-left) */}
  <span
    className="absolute start-4 top-4 inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-bold tracking-[0.2em] text-white backdrop-blur-md"
    style={{
      background: 'rgba(0,0,0,0.4)',
      borderTop: '1px solid rgba(255,255,255,0.2)',
      borderBottom: '1px solid rgba(0,0,0,0.2)',
      boxShadow:
        '0 1px 0 rgba(255,255,255,0.15) inset, 0 2px 4px rgba(0,0,0,0.2)',
    }}
  >
    {number}
  </span>

  {/* Icon badge (top-right) */}
  <motion.span
    whileHover={{ rotate: 10, scale: 1.08 }}
    transition={{ type: 'spring', stiffness: 300 }}
    className={`absolute end-4 top-4 flex items-center justify-center rounded-2xl text-white backdrop-blur-md ${
      isBig ? 'h-12 w-12 lg:h-14 lg:w-14' : 'h-11 w-11'
    }`}
    style={{
      background: 'rgba(233,122,0,0.88)',
      borderTop: '1px solid rgba(255,255,255,0.35)',
      borderBottom: '1px solid rgba(0,0,0,0.2)',
      boxShadow:
        '0 1px 0 rgba(255,255,255,0.3) inset, 0 3px 8px rgba(160,80,0,0.35)',
    }}
  >
    <Icon
      className={isBig ? 'h-5 w-5 lg:h-6 lg:w-6' : 'h-5 w-5'}
      strokeWidth={2.25}
    />
  </motion.span>
</div>


                {/* ============================================================
                    CONTENT AREA — flows from image fade
                   ============================================================ */}
                <div className="relative flex flex-1 flex-col px-5 pb-5 pt-2 md:px-6 md:pb-6 md:pt-3 lg:px-7 lg:pb-7 lg:pt-3">
                  {/* Title */}
                  <h3
                    className={`font-display font-black leading-tight tracking-tight text-foreground ${
                      isBig
                        ? 'text-xl md:text-2xl lg:text-[28px]'
                        : 'text-lg md:text-xl lg:text-[22px]'
                    }`}
                  >
                    {t(`items.${key}.title`)}
                  </h3>

                  {/* Description */}
                  <p
                    className={`mt-2.5 leading-relaxed text-muted ${
                      isBig
                        ? 'text-[13px] md:text-sm lg:text-[15px]'
                        : 'text-[13px] md:text-sm'
                    }`}
                  >
                    {t(`items.${key}.description`)}
                  </p>

                  {/* CTA */}
                  <Link
                    href="/services"
                    className="group/cta mt-4 inline-flex items-center gap-1.5 text-[13px] font-bold text-brand-500 transition-colors hover:text-brand-600 md:text-sm"
                  >
                    <span>{t(`items.${key}.cta`)}</span>
                    <ArrowUpRight
                      className={`h-3.5 w-3.5 transition-transform duration-200 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5 ${
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
   MOBILE CARD STACK — Image top, smooth fade, content bottom
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

  const goPrev = () => {
    if (activeIndex <= 0) return;
    setActiveIndex((i) => i - 1);
  };

  const handleDragEnd = (_: any, info: PanInfo) => {
    const threshold = 70;
    const velocity = 380;

    if (info.offset.x < -threshold || info.velocity.x < -velocity) {
      if (isRTL) goPrev();
      else goNext('left');
    } else if (info.offset.x > threshold || info.velocity.x > velocity) {
      if (isRTL) goNext('right');
      else goPrev();
    }
  };

  const getExitAnimation = () => {
    if (exitDir === 'left') {
      return { opacity: 0, x: -300, rotate: -8, scale: 0.9 };
    }
    if (exitDir === 'right') {
      return { opacity: 0, x: 300, rotate: 8, scale: 0.9 };
    }
    return { opacity: 0, scale: 0.9 };
  };

  return (
    <div className="relative select-none">
      {/* ============================================================
          STACK AREA
         ============================================================ */}
      <div className="relative mx-auto h-[440px] w-full max-w-[340px] sm:h-[460px]">
        {SERVICES.map(({ key, number, icon: Icon, image }, i) => {
          const offset = i - activeIndex;
          if (offset < 0 || offset > 2) return null;

          const isActive = offset === 0;

          return (
            <motion.article
              key={key}
              initial={
                isActive ? { opacity: 0, scale: 0.94, y: 16 } : { opacity: 0 }
              }
              animate={
                isActive
                  ? { opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 }
                  : {
                      opacity: 1,
                      x: 0,
                      y: offset * 14,
                      scale: 1 - offset * 0.05,
                      rotate: 0,
                    }
              }
              exit={isActive ? getExitAnimation() : { opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{
                zIndex: SERVICES.length - i,
                transformOrigin: 'center bottom',
                pointerEvents: isActive ? 'auto' : 'none',
              }}
              drag={isActive ? 'x' : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.5}
              onDragEnd={isActive ? handleDragEnd : undefined}
              whileDrag={{ cursor: 'grabbing' }}
              className="absolute inset-x-0 top-0 h-full cursor-grab touch-pan-y"
            >
              {/* ============================================================
                  CARD SURFACE
                 ============================================================ */}
              <div
                className="relative flex h-full flex-col overflow-hidden rounded-[28px]"
                style={{
                  background:
                    'linear-gradient(180deg, var(--skeu-surface-top) 0%, var(--skeu-surface-bottom) 100%)',
                  borderTop: '1px solid var(--skeu-bevel-top)',
                  borderBottom: '1px solid var(--skeu-bevel-bottom)',
                  boxShadow: isActive
                    ? `0 1px 0 var(--skeu-bevel-top) inset, 0 -1px 0 var(--skeu-bevel-bottom) inset, 0 3px 6px var(--skeu-drop-1), 0 8px 20px -4px var(--skeu-drop-2), 0 0 40px -12px rgba(233,122,0,0.15)`
                    : `0 1px 0 var(--skeu-bevel-top) inset, 0 -1px 0 var(--skeu-bevel-bottom) inset, 0 2px 4px var(--skeu-drop-1)`,
                }}
              >
                {/* ============================================================
                    IMAGE AREA — smooth fade
                   ============================================================ */}
                <div className="relative h-[240px] w-full shrink-0 overflow-hidden">
                  <Image
                    src={image}
                    alt={t(`items.${key}.title`)}
                    fill
                    sizes="340px"
                    className="object-cover"
                    priority={i === 0}
                  />

                  {/* Dark top overlay */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 top-0 h-16"
                    style={{
                      background:
                        'linear-gradient(180deg, rgba(0,0,0,0.35), transparent)',
                    }}
                  />

                  {/* 🔥 SMOOTH FADE */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-28"
                    style={{
                      background:
                        'linear-gradient(180deg, transparent 0%, color-mix(in oklab, var(--skeu-surface-top) 30%, transparent) 40%, color-mix(in oklab, var(--skeu-surface-top) 75%, transparent) 75%, var(--skeu-surface-top) 100%)',
                    }}
                  />

                  {/* Number badge */}
                  <span
                    className="absolute start-4 top-4 inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-bold tracking-[0.2em] text-white backdrop-blur-md"
                    style={{
                      background: 'rgba(0,0,0,0.4)',
                      borderTop: '1px solid rgba(255,255,255,0.2)',
                      borderBottom: '1px solid rgba(0,0,0,0.2)',
                      boxShadow:
                        '0 1px 0 rgba(255,255,255,0.15) inset, 0 2px 4px rgba(0,0,0,0.2)',
                    }}
                  >
                    {number}
                  </span>

                  {/* Icon badge */}
                  <span
                    className="absolute end-4 top-4 flex h-11 w-11 items-center justify-center rounded-2xl text-white backdrop-blur-md"
                    style={{
                      background: 'rgba(233,122,0,0.88)',
                      borderTop: '1px solid rgba(255,255,255,0.35)',
                      borderBottom: '1px solid rgba(0,0,0,0.2)',
                      boxShadow:
                        '0 1px 0 rgba(255,255,255,0.3) inset, 0 3px 8px rgba(160,80,0,0.35)',
                    }}
                  >
                    <Icon className="h-5 w-5" strokeWidth={2.25} />
                  </span>
                </div>

                {/* ============================================================
                    CONTENT AREA
                   ============================================================ */}
                <div className="relative flex flex-1 flex-col px-5 pb-5 pt-2 sm:px-6 sm:pb-6 sm:pt-2">
                  {isActive ? (
                    <>
                      {/* Spacer */}
                      <div className="flex-1" />

                      {/* Title */}
                      <h3 className="font-display text-[22px] font-black leading-tight tracking-tight text-foreground">
                        {t(`items.${key}.title`)}
                      </h3>

                      {/* Description */}
                      <p className="mt-2 text-[13px] leading-relaxed text-muted sm:text-sm">
                        {t(`items.${key}.description`)}
                      </p>

                      {/* CTA */}
                      <Link
                        href="/services"
                        className="group/cta mt-4 inline-flex items-center gap-1.5 text-[13px] font-bold text-brand-500 sm:text-sm"
                      >
                        <span>{t(`items.${key}.cta`)}</span>
                        <ArrowUpRight
                          className={`h-3.5 w-3.5 transition-transform duration-200 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5 ${
                            isRTL ? 'rotate-[-90deg]' : ''
                          }`}
                          strokeWidth={2.5}
                        />
                      </Link>
                    </>
                  ) : (
                    // Behind cards — empty content area (image is enough)
                    <div className="flex-1" />
                  )}
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>

      {/* ============================================================
          NAV — arrows + dots
         ============================================================ */}
      <div className="mt-7 flex items-center justify-center gap-5">
        {/* Left arrow */}
        <motion.button
          type="button"
          onClick={() => {
            if (!isRTL) goPrev();
            else goNext('right');
          }}
          disabled={
            !isRTL ? activeIndex === 0 : activeIndex === SERVICES.length - 1
          }
          aria-label="Previous"
          whileTap={{ scale: 0.92 }}
          className="skeu-btn-secondary flex h-10 w-10 items-center justify-center rounded-full text-foreground transition-opacity disabled:cursor-not-allowed disabled:opacity-30"
        >
          <svg
            className="h-3.5 w-3.5"
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
        <div className="flex items-center gap-1.5">
          {SERVICES.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveIndex(i)}
              aria-label={`Go to service ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ease-out ${
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
            if (!isRTL) goNext('left');
            else goPrev();
          }}
          disabled={
            !isRTL ? activeIndex === SERVICES.length - 1 : activeIndex === 0
          }
          aria-label="Next"
          whileTap={{ scale: 0.92 }}
          className="skeu-btn flex h-10 w-10 items-center justify-center rounded-full text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-30"
        >
          <svg
            className="h-3.5 w-3.5"
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

      {/* Swipe hint */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: activeIndex === 0 ? 1 : 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="mt-3 text-center text-[10px] font-bold uppercase tracking-[0.25em] text-muted"
      >
        {t('swipeHint')}
      </motion.p>
    </div>
  );
}