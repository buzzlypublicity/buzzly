'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import {
  Languages,
  Layers,
  MapPin,
  Compass,
  BarChart3,
  ShieldCheck,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

/* ============================================================
   REASONS DATA — real strengths, no fake info
   ============================================================ */
const REASONS = [
  { key: 'bilingual',   number: '01', icon: Languages,   accent: 'brand'  },
  { key: 'fullservice', number: '02', icon: Layers,      accent: 'accent' },
  { key: 'bahrain',     number: '03', icon: MapPin,      accent: 'brand'  },
  { key: 'transparent', number: '04', icon: Compass,     accent: 'accent' },
  { key: 'data',        number: '05', icon: BarChart3,   accent: 'brand'  },
  { key: 'wll',         number: '06', icon: ShieldCheck, accent: 'accent' },
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

const rowVariants: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.08,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

/* ============================================================
   COMPONENT
   ============================================================ */
export function WhyChoose() {
  const t = useTranslations('WhyChoose');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const [active, setActive] = useState(0);

  const activeReason = REASONS[active];
  const ActiveIcon = activeReason.icon;
  const isAccent = activeReason.accent === 'accent';

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-background py-20 md:py-28 lg:py-32"
    >
      {/* Ambient glows */}
      <div className="pointer-events-none absolute -left-40 top-1/3 h-[420px] w-[420px] rounded-full orb-brand blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-1/4 h-[420px] w-[420px] rounded-full orb-teal blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">

          {/* ============================================================
              LEFT — STICKY HEADING + DYNAMIC VISUAL
             ============================================================ */}
          <motion.div
            variants={headerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start"
          >
            {/* Badge */}
            <div className="neu-inset inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-500 md:text-[11px]">
              <Sparkles className="h-3 w-3" strokeWidth={2.5} />
              {t('badge')}
            </div>

            {/* Title */}
            <h2 className="mt-5 font-display text-4xl font-black leading-[1.05] tracking-tight text-foreground sm:text-5xl md:mt-6 md:text-6xl">
              {t('title')}
            </h2>

            {/* Subtitle */}
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-muted md:mt-6 md:text-base">
              {t('subtitle')}
            </p>

            {/* Divider accent */}
            <div className="mt-7 flex items-center gap-3">
              <span className="h-px w-12 bg-brand-500/40" />
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted">
                {t('miniLabel')}
              </span>
            </div>

            {/* ---------- DESKTOP DYNAMIC VISUAL ---------- */}
            <div className="mt-8 hidden lg:block">
              <div className="neu-raised relative aspect-square max-w-md overflow-hidden rounded-[32px]">

                {/* Glow overlay (per active row) */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`glow-${activeReason.key}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background: isAccent
                        ? 'radial-gradient(circle at 50% 50%, rgba(20,184,166,0.22), transparent 65%)'
                        : 'radial-gradient(circle at 50% 50%, rgba(233,122,0,0.22), transparent 65%)',
                    }}
                  />
                </AnimatePresence>

                {/* Number badge (start) */}
                <span
                  className={`absolute start-6 top-6 font-display text-xs font-bold tracking-[0.3em] transition-colors duration-500 ${
                    isAccent ? 'text-accent-500' : 'text-brand-500'
                  }`}
                >
                  {activeReason.number}
                </span>

                {/* Tag badge (end) */}
                <AnimatePresence mode="wait">
                  <motion.span
                    key={`tag-${activeReason.key}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className={`absolute end-6 top-6 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] ${
                      isAccent
                        ? 'bg-accent-500/10 text-accent-500'
                        : 'bg-brand-500/10 text-brand-500'
                    }`}
                  >
                    {t(`items.${activeReason.key}.tag`)}
                  </motion.span>
                </AnimatePresence>

                {/* Center — pulsing icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative flex h-40 w-40 items-center justify-center">
                    {/* Pulse rings */}
                    <motion.span
                      className={`absolute h-28 w-28 rounded-full ${
                        isAccent ? 'bg-accent-500/15' : 'bg-brand-500/15'
                      }`}
                      animate={{ scale: [1, 1.7, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <motion.span
                      className={`absolute h-28 w-28 rounded-full ${
                        isAccent ? 'bg-accent-500/15' : 'bg-brand-500/15'
                      }`}
                      animate={{ scale: [1, 2.2, 1], opacity: [0.3, 0, 0.3] }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: 0.4,
                      }}
                    />

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`icon-${activeReason.key}`}
                        initial={{ opacity: 0, scale: 0.7, rotate: -8 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        exit={{ opacity: 0, scale: 0.7, rotate: 8 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <ActiveIcon
                          className={`h-16 w-16 ${
                            isAccent ? 'text-accent-500' : 'text-brand-500'
                          }`}
                          strokeWidth={1.5}
                        />
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

                {/* Bottom label */}
                <div className="absolute inset-x-6 bottom-6">
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted">
                    {t('focusLabel')}
                  </p>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={`label-${activeReason.key}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="mt-1 truncate font-display text-base font-black tracking-tight text-foreground"
                    >
                      {t(`items.${activeReason.key}.title`)}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ============================================================
              RIGHT — REASON ROWS
             ============================================================ */}
          <div className="space-y-3 lg:col-span-7">
            {REASONS.map(({ key, number, icon: Icon, accent }, i) => {
              const isActive = active === i;
              const rowAccent = accent === 'accent';

              return (
                <motion.button
                  key={key}
                  type="button"
                  custom={i}
                  variants={rowVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-60px' }}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  aria-pressed={isActive}
                  className="neu-raised group relative w-full overflow-hidden rounded-3xl p-5 text-start transition-transform duration-500 md:p-6 lg:p-7"
                  style={{
                    boxShadow: isActive
                      ? `inset 0 0 0 1px color-mix(in oklab, var(--color-${
                          rowAccent ? 'accent' : 'brand'
                        }-500) 25%, transparent), 0 0 60px -12px color-mix(in oklab, var(--color-${
                          rowAccent ? 'accent' : 'brand'
                        }-500) 35%, transparent)`
                      : undefined,
                  }}
                >
                  {/* Accent bar — left/right depending on RTL */}
                  <motion.span
                    className={`absolute inset-y-4 start-0 rounded-e-full ${
                      rowAccent ? 'bg-accent-500' : 'bg-brand-500'
                    }`}
                    initial={false}
                    animate={{
                      width: isActive ? 4 : 0,
                      opacity: isActive ? 1 : 0,
                    }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  />

                  <div className="relative flex items-start gap-4 md:gap-5">

                    {/* Number */}
                    <span
                      className={`mt-1 font-display text-xs font-bold tracking-[0.3em] transition-colors duration-300 ${
                        isActive
                          ? rowAccent
                            ? 'text-accent-500'
                            : 'text-brand-500'
                          : 'text-muted/60'
                      }`}
                    >
                      {number}
                    </span>

                    {/* Icon */}
                    <span
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl transition-all duration-300 md:h-12 md:w-12 ${
                        isActive
                          ? rowAccent
                            ? 'bg-accent-500 text-white'
                            : 'bg-brand-500 text-white'
                          : 'bg-foreground/5 text-muted'
                      }`}
                    >
                      <Icon className="h-5 w-5" strokeWidth={2.25} />
                    </span>

                    {/* Content */}
                    <div className="min-w-0 flex-1">
                      <h3 className="font-display text-base font-black leading-tight tracking-tight text-foreground sm:text-lg md:text-xl">
                        {t(`items.${key}.title`)}
                      </h3>

                      <p className="mt-1.5 text-[13px] leading-relaxed text-muted sm:text-sm md:mt-2">
                        {t(`items.${key}.description`)}
                      </p>
                    </div>

                    {/* Arrow indicator */}
                    <span
                      className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                        isActive
                          ? rowAccent
                            ? 'bg-accent-500/10 text-accent-500'
                            : 'bg-brand-500/10 text-brand-500'
                          : 'text-muted/40'
                      }`}
                    >
                      <ArrowRight
                        className={`h-4 w-4 transition-transform duration-300 ${
                          isRTL ? 'rotate-180' : ''
                        } ${
                          isActive
                            ? isRTL
                              ? '-translate-x-0.5'
                              : 'translate-x-0.5'
                            : isRTL
                            ? 'translate-x-1 opacity-60'
                            : '-translate-x-1 opacity-60'
                        }`}
                        strokeWidth={2.5}
                      />
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* ============================================================
            MOBILE DYNAMIC BAR (below rows)
           ============================================================ */}
        <div className="mt-8 lg:hidden">
          <div className="neu-raised relative flex items-center gap-4 overflow-hidden rounded-3xl p-4 sm:gap-5 sm:p-5">
            {/* Glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 transition-opacity duration-500"
              style={{
                background: isAccent
                  ? 'radial-gradient(circle at 0% 50%, rgba(20,184,166,0.16), transparent 60%)'
                  : 'radial-gradient(circle at 0% 50%, rgba(233,122,0,0.16), transparent 60%)',
              }}
            />

            {/* Icon with pulse */}
            <div className="relative flex h-14 w-14 shrink-0 items-center justify-center">
              <motion.span
                className={`absolute h-10 w-10 rounded-full ${
                  isAccent ? 'bg-accent-500/20' : 'bg-brand-500/20'
                }`}
                animate={{ scale: [1, 1.6, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              />
              <AnimatePresence mode="wait">
                <motion.div
                  key={`m-icon-${activeReason.key}`}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  transition={{ duration: 0.3 }}
                >
                  <ActiveIcon
                    className={`h-7 w-7 ${
                      isAccent ? 'text-accent-500' : 'text-brand-500'
                    }`}
                    strokeWidth={2}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Label */}
            <div className="relative min-w-0 flex-1">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted">
                {t('focusLabel')}
              </p>
              <AnimatePresence mode="wait">
                <motion.p
                  key={`m-label-${activeReason.key}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="mt-0.5 truncate font-display text-sm font-black tracking-tight text-foreground"
                >
                  {t(`items.${activeReason.key}.title`)}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}