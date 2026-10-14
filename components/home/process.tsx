'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import {
  Compass,
  LayoutGrid,
  Rocket,
  TrendingUp,
  Sparkles,
  Check,
} from 'lucide-react';

/* ============================================================
   PROCESS DATA — from your PDF (real)
   ============================================================ */
const STEPS = [
  { key: 'audit',    number: '01', icon: Compass,    accent: 'brand'  },
  { key: 'strategy', number: '02', icon: LayoutGrid, accent: 'accent' },
  { key: 'execute',  number: '03', icon: Rocket,     accent: 'brand'  },
  { key: 'optimize', number: '04', icon: TrendingUp, accent: 'accent' },
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

const railVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const nodeVariants: Variants = {
  hidden: { opacity: 0, scale: 0.6 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const detailVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.3 },
  },
};

/* ============================================================
   COMPONENT
   ============================================================ */
export function Process() {
  const t = useTranslations('Process');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const [active, setActive] = useState(0);

  const activeStep = STEPS[active];
  const ActiveIcon = activeStep.icon;
  const isAccent = activeStep.accent === 'accent';

  return (
    <section
      id="process"
      className="relative overflow-hidden bg-background py-20 md:py-28 lg:py-32"
    >
      {/* Ambient glows */}
      <div className="pointer-events-none absolute -left-40 top-1/4 h-[420px] w-[420px] rounded-full orb-brand blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-1/4 h-[420px] w-[420px] rounded-full orb-teal blur-3xl" />

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
            HORIZONTAL RAIL
           ============================================================ */}
        <motion.div
          variants={railVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="relative mt-14 md:mt-20"
        >
          {/* Rail container */}
          <div className="relative mx-auto max-w-4xl">

            {/* ---------- Connector line (behind nodes) ---------- */}
            <div
              aria-hidden
              className="absolute left-1/2 top-7 -z-0 h-[2px] w-[calc(100%-4rem)] -translate-x-1/2 md:top-8 md:w-[calc(100%-6rem)]"
            >
              {/* Base dashed line */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-border/40 via-border to-border/40" />

              {/* Progress fill (dashed, animated) */}
              <motion.div
                className={`absolute inset-y-0 ${
                  isRTL ? 'end-0' : 'start-0'
                } origin-left rounded-full ${
                  isAccent ? 'bg-accent-500' : 'bg-brand-500'
                }`}
                initial={false}
                animate={{
                  width: `${(active / (STEPS.length - 1)) * 100}%`,
                  backgroundColor: isAccent ? '#14B8A6' : '#E97A00',
                }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  transformOrigin: isRTL ? 'right center' : 'left center',
                }}
              />
            </div>

            {/* ---------- Nodes ---------- */}
            <div
              className="relative z-10 grid grid-cols-4 gap-2 md:gap-4"
              dir={isRTL ? 'rtl' : 'ltr'}
            >
              {STEPS.map(({ key, number, icon: Icon, accent }, i) => {
                const isActive = active === i;
                const isPast = i < active;
                const isFuture = i > active;
                const nodeAccent = accent === 'accent';
                const nodeColor = nodeAccent ? '#14B8A6' : '#E97A00';

                return (
                  <motion.button
                    key={key}
                    variants={nodeVariants}
                    type="button"
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    aria-label={t(`items.${key}.title`)}
                    aria-pressed={isActive}
                    className="group flex flex-col items-center gap-3 outline-none"
                  >
                    {/* ---------- Node circle ---------- */}
                    <div className="relative flex h-14 w-14 items-center justify-center md:h-16 md:w-16">

                      {/* Pulse rings (only for active) */}
                      {isActive && (
                        <>
                          <motion.span
                            aria-hidden
                            className={`absolute inset-0 rounded-full ${
                              nodeAccent ? 'bg-accent-500/20' : 'bg-brand-500/20'
                            }`}
                            animate={{ scale: [1, 1.55, 1], opacity: [0.6, 0, 0.6] }}
                            transition={{
                              duration: 2.4,
                              repeat: Infinity,
                              ease: 'easeInOut',
                            }}
                          />
                          <motion.span
                            aria-hidden
                            className={`absolute inset-0 rounded-full ${
                              nodeAccent ? 'bg-accent-500/15' : 'bg-brand-500/15'
                            }`}
                            animate={{ scale: [1, 1.9, 1], opacity: [0.4, 0, 0.4] }}
                            transition={{
                              duration: 2.4,
                              repeat: Infinity,
                              ease: 'easeInOut',
                              delay: 0.35,
                            }}
                          />
                        </>
                      )}

                      {/* Node background (neumorphic) */}
                      <motion.div
                        className={`relative flex h-full w-full items-center justify-center rounded-full transition-shadow duration-500 ${
                          isActive
                            ? 'neu-raised'
                            : 'neu-raised neu-raised-hover'
                        }`}
                        animate={{
                          scale: isActive ? 1.08 : 1,
                          boxShadow: isActive
                            ? `0 0 40px -8px ${nodeColor}, inset 0 0 0 1px ${nodeColor}40`
                            : undefined,
                        }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      >
                        {/* Icon */}
                        <AnimatePresence mode="wait" initial={false}>
                          <motion.div
                            key={`icon-${key}-${isActive}`}
                            initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            exit={{ opacity: 0, scale: 0.5, rotate: 20 }}
                            transition={{ duration: 0.3 }}
                          >
                            {isPast ? (
                              <Check
                                className="h-5 w-5 md:h-6 md:w-6"
                                strokeWidth={3}
                                style={{ color: nodeColor }}
                              />
                            ) : (
                              <Icon
                                className="h-5 w-5 md:h-6 md:w-6"
                                strokeWidth={2.25}
                                style={{
                                  color: isActive ? nodeColor : undefined,
                                }}
                              />
                            )}
                          </motion.div>
                        </AnimatePresence>
                      </motion.div>
                    </div>

                    {/* ---------- Label ---------- */}
                    <div className="flex flex-col items-center gap-1 text-center">
                      <span
                        className={`font-display text-[10px] font-bold tracking-[0.25em] transition-colors duration-300 md:text-[11px] ${
                          isActive
                            ? nodeAccent
                              ? 'text-accent-500'
                              : 'text-brand-500'
                            : 'text-muted/60'
                        }`}
                      >
                        {number}
                      </span>

                      <span
                        className={`hidden max-w-[120px] text-xs font-semibold leading-tight tracking-tight transition-colors duration-300 sm:block ${
                          isActive ? 'text-foreground' : 'text-muted'
                        }`}
                      >
                        {t(`items.${key}.title`)}
                      </span>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* ============================================================
            DETAIL CARD
           ============================================================ */}
        <div className="relative mx-auto mt-12 max-w-4xl md:mt-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep.key}
              variants={detailVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="neu-raised relative overflow-hidden rounded-[32px] p-6 md:p-10 lg:p-12"
              style={{
                boxShadow: `inset 0 0 0 1px color-mix(in oklab, var(--color-${
                  isAccent ? 'accent' : 'brand'
                }-500) 22%, transparent), 0 0 80px -16px color-mix(in oklab, var(--color-${
                  isAccent ? 'accent' : 'brand'
                }-500) 30%, transparent)`,
              }}
            >
              {/* Corner glow */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background: isAccent
                    ? 'radial-gradient(circle at 90% 10%, rgba(20,184,166,0.16), transparent 55%)'
                    : 'radial-gradient(circle at 90% 10%, rgba(233,122,0,0.16), transparent 55%)',
                }}
              />

              <div className="relative grid gap-8 md:grid-cols-12 md:gap-10">

                {/* ============================================================
                    LEFT — Number + Title + Description
                   ============================================================ */}
                <div className="md:col-span-7">
                  {/* Number + tag */}
                  <div className="flex items-center gap-3">
                    <span
                      className={`font-display text-xs font-bold tracking-[0.3em] ${
                        isAccent ? 'text-accent-500' : 'text-brand-500'
                      }`}
                    >
                      {activeStep.number}
                    </span>
                    <span className="h-1 w-1 rounded-full bg-muted/40" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted md:text-[11px]">
                      {t(`items.${activeStep.key}.tag`)}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="mt-4 font-display text-2xl font-black leading-[1.1] tracking-tight text-foreground sm:text-3xl md:mt-5 md:text-4xl">
                    {t(`items.${activeStep.key}.title`)}
                  </h3>

                  {/* Description */}
                  <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted md:mt-5 md:text-base">
                    {t(`items.${activeStep.key}.description`)}
                  </p>
                </div>

                {/* ============================================================
                    RIGHT — Sub-items list
                   ============================================================ */}
                <div className="md:col-span-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted md:text-[11px]">
                    {t('focusList')}
                  </p>

                  <ul className="mt-4 space-y-3">
                    {[0, 1, 2].map((idx) => (
                      <motion.li
                        key={`${activeStep.key}-${idx}`}
                        initial={{ opacity: 0, x: isRTL ? 12 : -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.35,
                          delay: 0.1 + idx * 0.08,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="group flex items-start gap-3"
                      >
                        <span
                          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                            isAccent
                              ? 'bg-accent-500/12 text-accent-500'
                              : 'bg-brand-500/12 text-brand-500'
                          }`}
                        >
                          <Check className="h-3 w-3" strokeWidth={3} />
                        </span>
                        <span className="text-sm leading-relaxed text-foreground/85">
                          {t(`items.${activeStep.key}.points.${idx}`)}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom step indicator */}
              <div className="relative mt-8 flex items-center justify-between border-t border-border/50 pt-6 md:mt-10">
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted md:text-[11px]">
                  {t('stepLabel')} {activeStep.number} / {String(STEPS.length).padStart(2, '0')}
                </span>

                {/* Big icon (bottom-right) */}
                <motion.div
                  key={`bottom-icon-${activeStep.key}`}
                  initial={{ opacity: 0, scale: 0.6, rotate: -15 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className={`flex h-11 w-11 items-center justify-center rounded-2xl ${
                    isAccent
                      ? 'bg-accent-500/12 text-accent-500'
                      : 'bg-brand-500/12 text-brand-500'
                  }`}
                >
                  <ActiveIcon className="h-5 w-5" strokeWidth={2.25} />
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}