'use client';

import { useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import {
  motion,
  useScroll,
  useTransform,
  type Variants,
} from 'framer-motion';
import { Sparkles, Flag, Lightbulb, Rocket, ArrowRight } from 'lucide-react';

/* ============================================================
   TIMELINE DATA
   ============================================================ */
const TIMELINE = [
  { key: 'founded',  icon: Flag,      accent: 'brand'  as const },
  { key: 'concepts', icon: Lightbulb, accent: 'accent' as const },
  { key: 'today',    icon: Rocket,    accent: 'brand'  as const },
] as const;

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

const paragraphVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: 0.1 + i * 0.1,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const timelineItemVariants: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      delay: 0.2 + i * 0.15,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

/* ============================================================
   MAIN COMPONENT
   ============================================================ */
export function OurStory() {
  const t = useTranslations('OurStory');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 0.8', 'end 0.3'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  /* ---------- Story paragraphs ---------- */
  const paragraphs = [
    t('story.p1'),
    t('story.p2'),
    t('story.p3'),
  ];

  return (
    <section
      id="our-story"
      className="relative overflow-hidden bg-background py-20 md:py-24 lg:py-28"
    >
      {/* Orbs */}
      <div className="pointer-events-none absolute -left-40 top-1/4 h-[380px] w-[380px] rounded-full orb-brand blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-1/4 h-[380px] w-[380px] rounded-full orb-teal blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">

          {/* ============================================================
              LEFT — STORY TEXT
             ============================================================ */}
          <div className="lg:col-span-7">

            {/* Badge */}
            <motion.div
              variants={headerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
            >
              <div className="skeu-badge inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-brand-500 md:text-[11px]">
                <Sparkles className="h-3 w-3" strokeWidth={2.5} />
                {t('badge')}
              </div>
            </motion.div>

            {/* Title */}
            <motion.h2
              variants={headerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="mt-5 font-display text-[clamp(2rem,5vw,3.5rem)] font-black leading-[1.05] tracking-[-0.035em] text-foreground md:mt-6"
            >
              <span className="block">{t('title.line1')}</span>
              <span className="text-gradient-animated block">
                {t('title.line2')}
              </span>
            </motion.h2>

            {/* Paragraphs */}
            <div className="mt-8 space-y-5 md:mt-10 md:space-y-6">
              {paragraphs.map((text, i) => (
                <motion.p
                  key={i}
                  custom={i}
                  variants={paragraphVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-60px' }}
                  className="text-[14px] leading-relaxed text-muted md:text-[15.5px] lg:text-base"
                >
                  {text}
                </motion.p>
              ))}
            </div>

            {/* Pull quote */}
            <motion.blockquote
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative mt-8 overflow-hidden rounded-2xl p-5 md:mt-10 md:p-6"
              style={{
                background:
                  'color-mix(in oklab, var(--color-brand-500) 6%, transparent)',
                borderInlineStart: '3px solid var(--color-brand-500)',
              }}
            >
              <p className="font-display text-[15px] font-bold leading-snug tracking-tight text-foreground md:text-lg">
                {t('quote.text')}
              </p>
              <footer className="mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-500 md:text-[11px]">
                {t('quote.author')}
              </footer>
            </motion.blockquote>
          </div>

          {/* ============================================================
              RIGHT — TIMELINE
             ============================================================ */}
          <div className="lg:col-span-5">
            <div
              ref={timelineRef}
              className="relative lg:sticky lg:top-28"
            >
              {/* Timeline label */}
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted md:text-[11px]"
              >
                {t('timelineLabel')}
              </motion.p>

              {/* Timeline container */}
              <div className="relative mt-6 ps-8 md:mt-8 md:ps-10">

                {/* Base line */}
                <div
                  aria-hidden
                  className="absolute bottom-2 top-2 w-[2px] rounded-full bg-border/60"
                  style={{ insetInlineStart: '11px' }}
                />

                {/* Progress fill line */}
                <motion.div
                  aria-hidden
                  className="absolute top-2 w-[2px] rounded-full bg-gradient-to-b from-brand-500 to-accent-500"
                  style={{
                    insetInlineStart: '11px',
                    height: lineHeight,
                  }}
                />

                {/* Timeline items */}
                <div className="space-y-8 md:space-y-10">
                  {TIMELINE.map((item, i) => {
                    const Icon = item.icon;
                    const isAccent = item.accent === 'accent';
                    const isLast = i === TIMELINE.length - 1;

                    return (
                      <motion.div
                        key={item.key}
                        custom={i}
                        variants={timelineItemVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-40px' }}
                        className="relative"
                      >
                        {/* Node — positioned on the line */}
                        <span
                          className={`absolute top-0 flex h-6 w-6 items-center justify-center rounded-full ring-4 ring-background ${
                            isAccent
                              ? 'bg-accent-500 text-white'
                              : 'bg-brand-500 text-white'
                          }`}
                          style={{
                            insetInlineStart: '-32px',
                            boxShadow: isAccent
                              ? '0 0 0 4px color-mix(in oklab, var(--color-accent-500) 15%, transparent)'
                              : '0 0 0 4px color-mix(in oklab, var(--color-brand-500) 15%, transparent)',
                          }}
                        >
                          <Icon className="h-3 w-3" strokeWidth={2.75} />
                        </span>

                        {/* Content */}
                        <div className="ps-1">
                          <p
                            className={`text-[10px] font-bold uppercase tracking-[0.2em] md:text-[11px] ${
                              isAccent ? 'text-accent-500' : 'text-brand-500'
                            }`}
                          >
                            {t(`timeline.${item.key}.date`)}
                          </p>

                          <h3 className="mt-1 font-display text-base font-black leading-tight tracking-tight text-foreground md:text-lg">
                            {t(`timeline.${item.key}.title`)}
                          </h3>

                          <p className="mt-1.5 text-[12.5px] leading-relaxed text-muted md:text-[13.5px]">
                            {t(`timeline.${item.key}.description`)}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom caption */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-8 flex items-center gap-2 ps-8 text-[10px] font-bold uppercase tracking-[0.2em] text-muted md:mt-10 md:ps-10 md:text-[11px]"
              >
                <ArrowRight
                  className={`h-3 w-3 ${isRTL ? 'rotate-180' : ''}`}
                  strokeWidth={2.5}
                />
                {t('timelineFooter')}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}