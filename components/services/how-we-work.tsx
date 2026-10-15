'use client';

import { useRef, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  type Variants,
} from 'framer-motion';
import {
  Search,
  Compass,
  Rocket,
  TrendingUp,
  Sparkles,
  ArrowRight,
  Check,
} from 'lucide-react';

/* ============================================================
   STEPS DATA
   ============================================================ */
const STEPS = [
  { key: 'discover',   number: '01', icon: Search    },
  { key: 'strategize', number: '02', icon: Compass   },
  { key: 'execute',    number: '03', icon: Rocket    },
  { key: 'measure',    number: '04', icon: TrendingUp },
] as const;

/* ============================================================
   ANIMATION VARIANTS
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
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      delay: i * 0.08,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

/* ============================================================
   HOW WE WORK — Horizontal Journey Line
   ============================================================ */
export function HowWeWork() {
  const t = useTranslations('HowWeWork');
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.85', 'end 0.4'],
  });

  const lineFill = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const idx = Math.min(
      Math.max(0, Math.floor(latest * STEPS.length + 0.25)),
      STEPS.length - 1
    );
    setActiveIndex(idx);
  });

  return (
    <section
      id="how-we-work"
      className="relative overflow-hidden bg-background py-20 md:py-28 lg:py-32"
    >
      {/* Ambient orbs */}
      <div className="pointer-events-none absolute -left-40 top-1/4 h-[400px] w-[400px] rounded-full orb-brand blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-1/4 h-[400px] w-[400px] rounded-full orb-teal blur-3xl" />

      <div ref={sectionRef} className="relative mx-auto max-w-6xl px-5 md:px-8">

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
          <div className="skeu-badge inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-500 md:text-[11px]">
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

        {/* ============================================================
            DESKTOP — Horizontal Journey
           ============================================================ */}
        <div className="relative mt-16 hidden md:mt-24 md:block">
          {/* ---------- Base line ---------- */}
          <div
            aria-hidden
            className="pointer-events-none absolute top-6 h-[2px] w-[75%] rounded-full bg-border/60"
            style={{ insetInlineStart: '12.5%' }}
          />

          {/* ---------- Progress fill (orange → teal) ---------- */}
          <div
            aria-hidden
            className="pointer-events-none absolute top-6 h-[2px] w-[75%]"
            style={{ insetInlineStart: '12.5%' }}
          >
            <motion.div
              className="absolute top-0 h-full rounded-full bg-gradient-to-r from-brand-500 via-brand-500 to-accent-500"
              style={{
                width: lineFill,
                insetInlineStart: 0,
              }}
            />
          </div>

          {/* ---------- Nodes + Cards Grid ---------- */}
          <div className="relative grid grid-cols-4 gap-6 lg:gap-8">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              const isActive = i <= activeIndex;
              const isCurrent = i === activeIndex;

              return (
                <div key={step.key} className="flex flex-col">

                  {/* ---------- NODE ---------- */}
                  <div className="relative z-10 flex justify-center">
                    <motion.div
                      className={`relative flex h-12 w-12 items-center justify-center rounded-full transition-colors duration-500 ${
                        isActive
                          ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/30'
                          : 'bg-background text-muted ring-2 ring-border'
                      }`}
                      animate={isCurrent ? { scale: [1, 1.06, 1] } : { scale: 1 }}
                      transition={
                        isCurrent
                          ? { duration: 1.4, repeat: Infinity, ease: 'easeInOut' }
                          : { duration: 0.3 }
                      }
                    >
                      <Icon className="h-5 w-5" strokeWidth={2.5} />

                      {/* Pulse ring (current only) */}
                      {isCurrent && (
                        <motion.span
                          aria-hidden
                          className="absolute inset-0 rounded-full bg-brand-500/30"
                          animate={{ scale: [1, 1.7, 1], opacity: [0.6, 0, 0.6] }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                        />
                      )}
                    </motion.div>
                  </div>

                  {/* ---------- CARD ---------- */}
                  <motion.div
                    custom={i}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-60px' }}
                    className="skeu-panel skeu-panel-hover relative mt-8 flex flex-1 flex-col rounded-2xl p-5 lg:p-6"
                  >
                    {/* Corner glow (active) */}
                    <div
                      aria-hidden
                      className={`pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-500 ${
                        isActive ? 'opacity-100' : 'opacity-0'
                      }`}
                      style={{
                        background:
                          'radial-gradient(circle at 85% 10%, rgba(233,122,0,0.1), transparent 55%)',
                      }}
                    />

                    {/* Number */}
                    <span
                      className={`relative font-display text-[10px] font-bold tracking-[0.3em] transition-colors duration-300 ${
                        isActive ? 'text-brand-500' : 'text-muted/60'
                      }`}
                    >
                      {step.number}
                    </span>

                    {/* Title */}
                    <h3 className="relative mt-2 font-display text-lg font-black leading-tight tracking-tight text-foreground md:text-xl">
                      {t(`steps.${step.key}.title`)}
                    </h3>

                    {/* Description */}
                    <p className="relative mt-2 text-[12px] leading-relaxed text-muted md:text-[13px]">
                      {t(`steps.${step.key}.description`)}
                    </p>

                    {/* Bullets */}
                    <ul className="relative mt-4 space-y-2 border-t border-border/40 pt-4">
                      {[0, 1, 2].map((idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span
                            className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
                              isActive
                                ? 'bg-brand-500/15 text-brand-500'
                                : 'bg-foreground/5 text-muted'
                            }`}
                          >
                            <Check
                              className="h-2.5 w-2.5"
                              strokeWidth={3.5}
                            />
                          </span>
                          <span className="text-[11px] leading-relaxed text-foreground/75 md:text-[12px]">
                            {t(`steps.${step.key}.bullets.${idx}`)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ============================================================
            MOBILE — Vertical Stacked Cards
           ============================================================ */}
        <div className="relative mt-12 md:hidden">
          <div className="space-y-4">
            {STEPS.map((step, i) => {
              const Icon = step.icon;

              return (
                <motion.div
                  key={step.key}
                  custom={i}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-60px' }}
                  className="skeu-panel relative overflow-hidden rounded-2xl p-5"
                >
                  {/* Corner glow */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        'radial-gradient(circle at 85% 10%, rgba(233,122,0,0.08), transparent 55%)',
                    }}
                  />

                  {/* Top row: number + icon */}
                  <div className="relative flex items-start justify-between gap-3">
                    <span className="font-display text-[10px] font-bold tracking-[0.3em] text-brand-500">
                      {step.number}
                    </span>

                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/12 text-brand-500">
                      <Icon className="h-4 w-4" strokeWidth={2.25} />
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="relative mt-3 font-display text-xl font-black leading-tight tracking-tight text-foreground">
                    {t(`steps.${step.key}.title`)}
                  </h3>

                  {/* Description */}
                  <p className="relative mt-2 text-[13px] leading-relaxed text-muted">
                    {t(`steps.${step.key}.description`)}
                  </p>

                  {/* Bullets */}
                  <ul className="relative mt-4 space-y-2 border-t border-border/40 pt-4">
                    {[0, 1, 2].map((idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brand-500/12 text-brand-500">
                          <Check className="h-2.5 w-2.5" strokeWidth={3.5} />
                        </span>
                        <span className="text-[12px] leading-relaxed text-foreground/80">
                          {t(`steps.${step.key}.bullets.${idx}`)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ============================================================
            BOTTOM CTA
           ============================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 flex flex-col items-center justify-center gap-4 md:mt-20"
        >
          <p className="text-center text-[13px] text-muted md:text-[14px]">
            {t('footerNote')}
          </p>

          <Link
            href="/contact"
            className="skeu-btn group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3 text-[13px] font-bold md:text-sm"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-[600ms] ease-out group-hover:translate-x-[300%]"
            />
            <span className="relative">{t('cta')}</span>
            <ArrowRight
              className={`relative h-3.5 w-3.5 transition-transform duration-200 ease-out ${
                isRTL
                  ? 'rotate-180 group-hover:-translate-x-0.5 group-hover:translate-x-0'
                  : 'group-hover:translate-x-0.5'
              }`}
              strokeWidth={2.75}
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}