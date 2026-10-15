'use client';

import { useRef, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from 'framer-motion';
import {
  Sparkles,
  Lightbulb,
  Target,
  Eye,
  Rocket,
  Languages,
  ShieldCheck,
  ArrowUpRight,
} from 'lucide-react';

/* ============================================================
   REASONS DATA
   ============================================================ */
const REASONS = [
  { key: 'creative',     number: '01', icon: Lightbulb,   accent: 'brand'  },
  { key: 'customized',   number: '02', icon: Target,      accent: 'accent' },
  { key: 'transparent',  number: '03', icon: Eye,         accent: 'brand'  },
  { key: 'brandFocused', number: '04', icon: Rocket,      accent: 'accent' },
  { key: 'bilingual',    number: '05', icon: Languages,   accent: 'brand'  },
  { key: 'registered',   number: '06', icon: ShieldCheck, accent: 'accent' },
] as const;

type ReasonItem = (typeof REASONS)[number];

/* ============================================================
   MOBILE CARD SLIDE
   ============================================================ */
function MobileCardSlide({
  reason,
  index,
  total,
  progress,
  t,
}: {
  reason: ReasonItem;
  index: number;
  total: number;
  progress: ReturnType<typeof useScroll>['scrollYProgress'];
  t: ReturnType<typeof useTranslations>;
}) {
  const slot = 1 / total;
  const start = index * slot;
  const enterEnd = start + slot * 0.22;
  const exitStart = start + slot * 0.78;
  const end = start + slot;

  const x = useTransform(
    progress,
    [start, enterEnd, exitStart, end],
    ['-115%', '0%', '0%', '115%']
  );

  const opacity = useTransform(
    progress,
    [start, start + slot * 0.06, exitStart + slot * 0.06, end],
    [0, 1, 1, 0]
  );

  const scale = useTransform(
    progress,
    [start, enterEnd, exitStart, end],
    [0.94, 1, 1, 0.94]
  );

  const Icon = reason.icon;
  const isAccent = reason.accent === 'accent';

  return (
    <motion.div
      style={{ x, opacity, scale }}
      className="absolute inset-0 flex items-center justify-center px-5"
    >
      <div className="w-full max-w-md">
        <div
          className="skeu-panel relative overflow-hidden rounded-3xl p-6"
          style={{
            boxShadow: isAccent
              ? '0 24px 60px -20px rgba(20,184,166,0.45), 0 8px 20px -8px rgba(0,0,0,0.15)'
              : '0 24px 60px -20px rgba(233,122,0,0.45), 0 8px 20px -8px rgba(0,0,0,0.15)',
          }}
        >
          {/* Corner glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background: isAccent
                ? 'radial-gradient(circle at 90% 10%, rgba(20,184,166,0.16), transparent 60%)'
                : 'radial-gradient(circle at 90% 10%, rgba(233,122,0,0.16), transparent 60%)',
            }}
          />

          {/* Top row */}
          <div className="relative flex items-start justify-between gap-4">
            <span
              className={`font-display text-[11px] font-bold tracking-[0.3em] ${
                isAccent ? 'text-accent-500' : 'text-brand-500'
              }`}
            >
              {reason.number}
            </span>

            <span
              className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                isAccent
                  ? 'bg-accent-500 text-white'
                  : 'bg-brand-500 text-white'
              }`}
              style={{
                boxShadow: isAccent
                  ? '0 8px 20px -6px rgba(20,184,166,0.5)'
                  : '0 8px 20px -6px rgba(233,122,0,0.5)',
              }}
            >
              <Icon className="h-5 w-5" strokeWidth={2.25} />
            </span>
          </div>

          {/* Content */}
          <h3 className="relative mt-6 font-display text-[22px] font-black leading-tight tracking-tight text-foreground">
            {t(`reasons.${reason.key}.title`)}
          </h3>

          <p className="relative mt-3 text-[13.5px] leading-relaxed text-muted">
            {t(`reasons.${reason.key}.description`)}
          </p>

          {/* Accent bar */}
          <div
            className={`mt-5 h-1 w-12 rounded-full ${
              isAccent ? 'bg-accent-500' : 'bg-brand-500'
            }`}
          />
        </div>
      </div>
    </motion.div>
  );
}

/* ============================================================
   MOBILE BOTTOM BAR — Dots + CTA
   ============================================================ */
function MobileBottomBar({
  progress,
  total,
  t,
  isRTL,
}: {
  progress: ReturnType<typeof useScroll>['scrollYProgress'];
  total: number;
  t: ReturnType<typeof useTranslations>;
  isRTL: boolean;
}) {
  const [activeIdx, setActiveIdx] = useState(0);

  useMotionValueEvent(progress, 'change', (latest) => {
    const idx = Math.min(
      Math.max(0, Math.floor(latest * total + 0.1)),
      total - 1
    );
    setActiveIdx(idx);
  });

  const ctaOpacity = useTransform(
    progress,
    [(total - 1) / total + 0.06, 1],
    [0, 1]
  );
  const ctaY = useTransform(
    progress,
    [(total - 1) / total + 0.06, 1],
    [16, 0]
  );

  return (
    <div className="relative z-20 shrink-0 px-5 pb-8 pt-4">
      {/* Dots */}
      <div className="mb-5 flex items-center justify-center gap-1.5">
        {REASONS.map((_, i) => (
          <span
            key={i}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === activeIdx ? 'w-6 bg-brand-500' : 'w-1.5 bg-border'
            }`}
          />
        ))}
      </div>

      {/* CTA — fades in on last card */}
      <motion.div style={{ opacity: ctaOpacity, y: ctaY }}>
        <Link
          href="/contact"
          className="skeu-btn group flex w-full items-center justify-center gap-2 rounded-full px-5 py-3.5 text-[13px] font-bold"
        >
          <span>{t('cta')}</span>
          <ArrowUpRight
            className={`h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
              isRTL ? 'rotate-[-90deg]' : ''
            }`}
            strokeWidth={2.75}
          />
        </Link>
      </motion.div>
    </div>
  );
}

/* ============================================================
   MAIN — WHY BUZZLY
   ============================================================ */
export function WhyBuzzly() {
  const t = useTranslations('WhyBuzzly');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  /* ---------- DESKTOP ---------- */
  const desktopRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: desktopProgress } = useScroll({
    target: desktopRef,
    offset: ['start start', 'end end'],
  });

  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(desktopProgress, 'change', (latest) => {
    const idx = Math.min(
      Math.floor(latest * REASONS.length),
      REASONS.length - 1
    );
    setActiveIndex(Math.max(0, idx));
  });

  /* ---------- MOBILE ---------- */
  const mobileRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: mobileProgress } = useScroll({
    target: mobileRef,
    offset: ['start start', 'end end'],
  });

  return (
    <>
      {/* ============================================================
          DESKTOP
         ============================================================ */}
      <section
        ref={desktopRef}
        className="relative hidden bg-background lg:block"
        style={{ height: `${REASONS.length * 85}vh` }}
      >
        <div className="sticky top-0 flex h-screen items-center">
          {/* Orbs */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -left-40 top-1/4 h-[400px] w-[400px] rounded-full orb-brand blur-3xl" />
            <div className="absolute -right-40 bottom-1/4 h-[400px] w-[400px] rounded-full orb-teal blur-3xl" />
          </div>

          <div className="relative mx-auto w-full max-w-6xl px-8">
            <div className="grid grid-cols-12 items-center gap-16">

              {/* LEFT — Manifesto */}
              <div className="col-span-5">
                <div className="skeu-badge inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-500">
                  <Sparkles className="h-3 w-3" strokeWidth={2.5} />
                  {t('badge')}
                </div>

                <h2 className="mt-6 font-display text-[clamp(2.5rem,4vw,4rem)] font-black leading-[0.98] tracking-[-0.04em] text-foreground">
                  <span className="block">{t('headline.line1')}</span>
                  <span className="block">{t('headline.line2')}</span>
                  <span className="text-gradient-animated mt-1 block">
                    {t('headline.line3')}
                  </span>
                </h2>

                <p className="mt-6 max-w-md text-[15px] leading-relaxed text-muted">
                  {t('subtitle')}
                </p>

                <div className="mt-8 flex items-center gap-3">
                  <span className="h-px w-12 bg-brand-500/40" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted">
                    {t('miniLabel')}
                  </span>
                </div>

                {/* Counter + Progress */}
                <div className="mt-8 flex items-center gap-4">
                  <div className="flex items-baseline gap-2 font-display">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={activeIndex}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.3 }}
                        className="text-4xl font-black text-brand-500"
                      >
                        {String(activeIndex + 1).padStart(2, '0')}
                      </motion.span>
                    </AnimatePresence>
                    <span className="text-base font-bold text-muted">
                      / {String(REASONS.length).padStart(2, '0')}
                    </span>
                  </div>

                  <div className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-border/60">
                    <motion.div
                      className="absolute inset-y-0 start-0 rounded-full bg-gradient-to-r from-brand-500 to-accent-500"
                      style={{
                        width: `${
                          ((activeIndex + 1) / REASONS.length) * 100
                        }%`,
                      }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                </div>

                <Link
                  href="/contact"
                  className="skeu-btn-secondary group mt-10 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-semibold"
                >
                  <span>{t('cta')}</span>
                  <ArrowUpRight
                    className={`h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                      isRTL ? 'rotate-[-90deg]' : ''
                    }`}
                    strokeWidth={2.75}
                  />
                </Link>
              </div>

              {/* RIGHT — Active Card */}
              <div className="col-span-7">
                <div className="relative min-h-[440px]">
                  <AnimatePresence mode="wait">
                    {(() => {
                      const { key, number, icon: Icon, accent } =
                        REASONS[activeIndex];
                      const isAccent = accent === 'accent';

                      return (
                        <motion.div
                          key={key}
                          initial={{ opacity: 0, y: 40, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -40, scale: 0.96 }}
                          transition={{
                            duration: 0.5,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="skeu-panel absolute inset-0 overflow-hidden rounded-[28px] p-8 lg:p-10"
                        >
                          <div
                            aria-hidden
                            className="pointer-events-none absolute inset-0"
                            style={{
                              background: isAccent
                                ? 'radial-gradient(circle at 90% 10%, rgba(20,184,166,0.14), transparent 55%)'
                                : 'radial-gradient(circle at 90% 10%, rgba(233,122,0,0.14), transparent 55%)',
                            }}
                          />

                          <div className="relative flex h-full flex-col">
                            <div className="flex items-start justify-between gap-4">
                              <span
                                className={`font-display text-xs font-bold tracking-[0.3em] ${
                                  isAccent
                                    ? 'text-accent-500'
                                    : 'text-brand-500'
                                }`}
                              >
                                {number}
                              </span>

                              <span
                                className={`flex h-14 w-14 items-center justify-center rounded-2xl ${
                                  isAccent
                                    ? 'bg-accent-500 text-white'
                                    : 'bg-brand-500 text-white'
                                }`}
                                style={{
                                  boxShadow: isAccent
                                    ? '0 8px 24px -6px rgba(20,184,166,0.4)'
                                    : '0 8px 24px -6px rgba(233,122,0,0.4)',
                                }}
                              >
                                <Icon className="h-6 w-6" strokeWidth={2.25} />
                              </span>
                            </div>

                            <div className="mt-auto pt-8">
                              <h3 className="font-display text-3xl font-black leading-tight tracking-tight text-foreground lg:text-4xl">
                                {t(`reasons.${key}.title`)}
                              </h3>
                              <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-muted">
                                {t(`reasons.${key}.description`)}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })()}
                  </AnimatePresence>
                </div>

                {/* Dots */}
                <div className="mt-8 flex items-center justify-center gap-2">
                  {REASONS.map((r, i) => (
                    <button
                      key={r.key}
                      type="button"
                      onClick={() => {
                        if (!desktopRef.current) return;
                        const rect =
                          desktopRef.current.getBoundingClientRect();
                        const targetY =
                          window.scrollY +
                          rect.top +
                          (rect.height - window.innerHeight) *
                            (i / REASONS.length);
                        window.scrollTo({ top: targetY, behavior: 'smooth' });
                      }}
                      aria-label={`Go to reason ${i + 1}`}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i === activeIndex
                          ? 'w-8 bg-brand-500'
                          : 'w-1.5 bg-border hover:bg-muted'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          MOBILE
         ============================================================ */}
      <section className="relative bg-background lg:hidden">
        {/* Orbs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-40 top-1/4 h-[300px] w-[300px] rounded-full orb-brand blur-3xl" />
          <div className="absolute -right-40 bottom-1/4 h-[300px] w-[300px] rounded-full orb-teal blur-3xl" />
        </div>

        {/* Tall scroll container — drives the animation */}
        <div
          ref={mobileRef}
          className="relative"
          style={{ height: `${REASONS.length * 100}vh` }}
        >
          {/* Sticky viewport */}
          <div className="sticky top-0 flex h-screen flex-col">

            {/* ---------- STICKY HEADER ---------- */}
            <div className="relative z-20 shrink-0 px-5 pt-20 pb-6">
              <div className="relative mx-auto max-w-2xl text-center">
                <div className="skeu-badge inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-500">
                  <Sparkles className="h-3 w-3" strokeWidth={2.5} />
                  {t('badge')}
                </div>

                <h2 className="mt-4 font-display text-[clamp(1.85rem,8vw,2.75rem)] font-black leading-[1.02] tracking-[-0.04em] text-foreground">
                  <span className="block">{t('headline.line1')}</span>
                  <span className="block">{t('headline.line2')}</span>
                  <span className="text-gradient-animated mt-0.5 block">
                    {t('headline.line3')}
                  </span>
                </h2>

                <p className="mx-auto mt-3 max-w-md text-[12.5px] leading-relaxed text-muted">
                  {t('subtitle')}
                </p>

                {/* Bottom fade — cards gracefully disappear behind header */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 -bottom-10 h-10"
                  style={{
                    background:
                      'linear-gradient(180deg, var(--background) 0%, transparent 100%)',
                  }}
                />
              </div>
            </div>

            {/* ---------- CARD STAGE ---------- */}
            <div className="relative flex-1 overflow-hidden">
              {REASONS.map((reason, i) => (
                <MobileCardSlide
                  key={reason.key}
                  reason={reason}
                  index={i}
                  total={REASONS.length}
                  progress={mobileProgress}
                  t={t}
                />
              ))}
            </div>

            {/* ---------- DOTS + CTA ---------- */}
            <MobileBottomBar
              progress={mobileProgress}
              total={REASONS.length}
              t={t}
              isRTL={isRTL}
            />
          </div>
        </div>
      </section>
    </>
  );
}