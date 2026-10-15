'use client';

import { useRef, useEffect, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import {
  Sparkles,
  ArrowRight,
  Play,
  Star,
  TrendingUp,
  Globe2,
  CheckCircle2,
  BarChart3,
} from 'lucide-react';

/* ============================================================
   ANIMATION VARIANTS
   ============================================================ */
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      delay: 0.3 + i * 0.12,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

/* ============================================================
   SUBTLE MAGNETIC WRAPPER (light 2-4px shift only)
   ============================================================ */
function Magnetic({
  children,
  strength = 0.06,
}: {
  children: React.ReactNode;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const isTouch =
      typeof window !== 'undefined' &&
      window.matchMedia('(hover: none)').matches;
    if (isTouch) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      const maxDist = Math.max(rect.width, rect.height) * 0.9;

      if (dist < maxDist) {
        const falloff = 1 - dist / maxDist;
        setPosition({
          x: dx * strength * falloff,
          y: dy * strength * falloff,
        });
      } else {
        setPosition({ x: 0, y: 0 });
      }
    };

    const onLeave = () => setPosition({ x: 0, y: 0 });

    window.addEventListener('mousemove', onMove, { passive: true });
    el.addEventListener('mouseleave', onLeave);

    return () => {
      window.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [strength]);

  return (
    <motion.div
      ref={ref}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 20, mass: 0.6 }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}

/* ============================================================
   ROTATING WORD (headline keyword loop)
   ============================================================ */
function RotatingWord({
  words,
  interval = 2600,
}: {
  words: string[];
  interval?: number;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
    }, interval);
    return () => clearInterval(id);
  }, [words.length, interval]);

  return (
    <span className="relative inline-block">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={index}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="text-gradient-animated inline-block"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/* ============================================================
   HERO COMPONENT
   ============================================================ */
export function Hero() {
  const t = useTranslations('Hero');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const rotatingWords = [t('rotate.0'), t('rotate.1'), t('rotate.2')];

  const trustItems = [
    t('trust.noContract'),
    t('trust.fastDelivery'),
    t('trust.bilingual'),
  ];

  return (
    <section
      id="home"
      className="relative flex min-h-[calc(100vh-72px)] items-center overflow-hidden bg-background py-16 md:py-20 lg:py-24"
    >
      {/* ============================================================
          BACKGROUND LAYERS
         ============================================================ */}

      {/* Orange orb — top-left */}
      <motion.div
        aria-hidden
        className="orb-brand pointer-events-none absolute -left-40 -top-40 h-[400px] w-[400px] rounded-full blur-3xl md:h-[520px] md:w-[520px]"
        animate={{ x: [0, 30, -10, 0], y: [0, -20, 10, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Teal orb — bottom-right */}
      <motion.div
        aria-hidden
        className="orb-teal pointer-events-none absolute -bottom-40 -right-40 h-[420px] w-[420px] rounded-full blur-3xl md:h-[560px] md:w-[560px]"
        animate={{ x: [0, -25, 15, 0], y: [0, 15, -25, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
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
            'radial-gradient(ellipse 80% 60% at 50% 40%, black 30%, transparent 80%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 80% 60% at 50% 40%, black 30%, transparent 80%)',
        }}
      />

      {/* ============================================================
          CONTENT
         ============================================================ */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 md:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14 xl:gap-20">

          {/* ============================================================
              LEFT — TEXT CONTENT
             ============================================================ */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-6"
          >
            {/* ---------- BADGE ---------- */}
            <motion.div variants={itemVariants} className="inline-block">
              <div className="skeu-badge inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-brand-500 md:text-[11px]">
                <motion.span
                  animate={{ rotate: [0, 12, -8, 0], scale: [1, 1.12, 1] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <Sparkles className="h-3 w-3" strokeWidth={2.5} />
                </motion.span>
                <span>{t('badge')}</span>
              </div>
            </motion.div>

            {/* ---------- HEADLINE with ROTATING WORD ---------- */}
            <motion.h1
              variants={itemVariants}
              className="mt-6 font-display text-4xl font-black leading-[1.06] tracking-tight text-foreground sm:text-5xl md:mt-7 md:text-6xl lg:text-[4.25rem] xl:text-[4.75rem]"
            >
              <span className="block">{t('titleLine1')}</span>
              <span className="mt-1 block">
                <RotatingWord words={rotatingWords} interval={2400} />
              </span>
            </motion.h1>

            {/* ---------- SUBTITLE ---------- */}
            <motion.p
              variants={itemVariants}
              className="mt-6 max-w-lg text-[14px] leading-relaxed text-muted sm:text-[15px] md:mt-7 md:text-base lg:text-[17px]"
            >
              {t('subtitle')}
            </motion.p>

            {/* ---------- CTA BUTTONS (compact, subtle magnetic) ---------- */}
            <motion.div
              variants={itemVariants}
              className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-3.5 md:mt-10"
            >
              {/* Primary */}
              <Magnetic strength={0.06}>
                <Link
                  href="/contact"
                  className="skeu-btn group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full px-5 py-2.5 text-[13px] font-bold sm:w-auto md:px-6 md:py-3 md:text-sm"
                >
                  {/* Shine sweep */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-[600ms] ease-out group-hover:translate-x-[300%]"
                  />
                  <span className="relative">{t('ctaPrimary')}</span>
                  <ArrowRight
                    className={`relative h-3.5 w-3.5 transition-transform duration-200 ease-out ${
                      isRTL
                        ? 'rotate-180 group-hover:-translate-x-0.5 group-hover:translate-x-0'
                        : 'group-hover:translate-x-0.5'
                    }`}
                    strokeWidth={2.75}
                  />
                </Link>
              </Magnetic>

              {/* Secondary */}
              <Magnetic strength={0.06}>
                <button
                  type="button"
                  className="skeu-btn-secondary group inline-flex w-full items-center justify-center gap-2.5 rounded-full px-5 py-2.5 text-[13px] font-semibold sm:w-auto md:px-6 md:py-3 md:text-sm"
                >
                  <span className="relative flex h-6 w-6 items-center justify-center rounded-full bg-brand-500/15 transition-colors duration-200 group-hover:bg-brand-500">
                    <Play
                      className={`h-2.5 w-2.5 fill-brand-500 text-brand-500 transition-colors duration-200 group-hover:fill-white group-hover:text-white ${
                        isRTL ? 'rotate-180' : ''
                      }`}
                      strokeWidth={2.5}
                    />
                  </span>
                  <span className="relative">{t('ctaSecondary')}</span>
                </button>
              </Magnetic>
            </motion.div>

            {/* ---------- TRUST LINE ---------- */}
            <motion.div
              variants={itemVariants}
              className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-[10px] font-semibold uppercase tracking-wider text-muted md:mt-10 md:gap-x-6 md:text-[11px]"
            >
              {trustItems.map((item, i) => (
                <motion.span
                  key={i}
                  className="inline-flex items-center gap-1.5"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + i * 0.1, duration: 0.5 }}
                >
                  <CheckCircle2
                    className="h-3 w-3 text-accent-500"
                    strokeWidth={2.75}
                  />
                  {item}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          {/* ============================================================
              RIGHT — FLOATING CARD STACK
             ============================================================ */}
          <div className="lg:col-span-6">
            <div className="grid grid-cols-2 gap-3.5 md:gap-4 lg:gap-5">

              {/* ---------- BIG FEATURED CARD ---------- */}
              <motion.div
                custom={0}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                className="col-span-2"
              >
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="skeu-panel skeu-panel-hover relative overflow-hidden rounded-[28px] p-6 md:p-7"
                >
                  {/* Corner glow */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-brand-500/15 blur-3xl"
                  />

                  <div className="relative flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted">
                        {t('stats.primaryLabel')}
                      </span>
                      <p className="mt-2 font-display text-5xl font-black leading-none tracking-tight text-foreground md:text-6xl">
                        {t('stats.primaryValue')}
                      </p>
                      <p className="mt-2.5 text-[13px] font-medium text-muted md:text-sm">
                        {t('stats.primaryDesc')}
                      </p>
                    </div>

                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-500/12 text-brand-500 md:h-14 md:w-14">
                      <BarChart3
                        className="h-5 w-5 md:h-6 md:w-6"
                        strokeWidth={2.25}
                      />
                    </span>
                  </div>

                  {/* Mini trend bars (decorative) */}
                  <div className="relative mt-5 flex items-end gap-1.5 md:mt-6">
                    {[30, 45, 38, 62, 55, 78, 92].map((h, i) => (
                      <motion.span
                        key={i}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: `${h}%`, opacity: 1 }}
                        transition={{
                          delay: 0.7 + i * 0.05,
                          duration: 0.5,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className={`flex-1 rounded-t-md ${
                          i === 6
                            ? 'bg-brand-500'
                            : 'bg-brand-500/25'
                        }`}
                        style={{ height: `${h}%`, minHeight: '8px' }}
                      />
                    ))}
                  </div>
                </motion.div>
              </motion.div>

              {/* ---------- SMALL CARD 1 — Rating ---------- */}
              <motion.div
                custom={1}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 0.3,
                  }}
                  className="skeu-panel skeu-panel-hover relative h-full overflow-hidden rounded-[24px] p-5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/12 text-brand-500">
                      <Star className="h-4 w-4 fill-brand-500" strokeWidth={0} />
                    </span>
                  </div>
                  <p className="mt-4 font-display text-3xl font-black leading-none tracking-tight text-foreground md:text-4xl">
                    4.9
                  </p>
                  <p className="mt-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted">
                    {t('stats.rating')}
                  </p>
                </motion.div>
              </motion.div>

              {/* ---------- SMALL CARD 2 — Countries ---------- */}
              <motion.div
                custom={2}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 0.6,
                  }}
                  className="skeu-panel skeu-panel-hover relative h-full overflow-hidden rounded-[24px] p-5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-500/12 text-accent-500">
                      <Globe2 className="h-4 w-4" strokeWidth={2.25} />
                    </span>
                  </div>
                  <p className="mt-4 font-display text-3xl font-black leading-none tracking-tight text-foreground md:text-4xl">
                    12
                  </p>
                  <p className="mt-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted">
                    {t('stats.countries')}
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent md:h-32" />
    </section>
  );
}