'use client';

import { useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { Sparkles } from 'lucide-react';

/* ============================================================
   HIGHLIGHT WORD — opacity animates as user scrolls
   ============================================================ */
function HighlightWord({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.12, 1]);

  return (
    <motion.span
      style={{ opacity }}
      className="inline-block"
      aria-hidden={false}
    >
      {children}
    </motion.span>
  );
}

/* ============================================================
   MAIN COMPONENT
   ============================================================ */
export function WhoWeAre() {
  const t = useTranslations('WhoWeAre');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  /* ---------- Paragraphs from translations ---------- */
  const paragraphs = [t('paragraphs.p1'), t('paragraphs.p2'), t('paragraphs.p3')];

  /* ---------- Split into words globally ---------- */
  const paragraphWords = paragraphs.map((p) => p.split(' '));
  const totalWords = paragraphWords.reduce((sum, w) => sum + w.length, 0);

  /* ---------- Padding at start/end so text settles ---------- */
  const startPad = 0.08;
  const endPad = 0.12;
  const usableRange = 1 - startPad - endPad;

  /* ---------- Section height: words × per-word scroll + base ---------- */
  const sectionHeight = `calc(120vh + ${totalWords * 6}vh)`;

  return (
    <section
      id="who-we-are"
      ref={containerRef}
      className="relative bg-background"
      style={{ height: sectionHeight }}
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">

        {/* Ambient orbs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-40 top-1/4 h-[380px] w-[380px] rounded-full orb-brand blur-3xl" />
          <div className="absolute -right-40 bottom-1/4 h-[380px] w-[380px] rounded-full orb-teal blur-3xl" />
        </div>

        {/* Grid pattern (very subtle) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 text-foreground opacity-[0.03] dark:opacity-[0.05]"
          style={{
            backgroundImage:
              'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
            backgroundSize: '56px 56px',
            maskImage:
              'radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 90%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 90%)',
          }}
        />

        {/* ---------- CONTENT ---------- */}
        <div className="relative mx-auto w-full max-w-4xl px-5 text-center md:px-8">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="skeu-badge inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-brand-500 md:text-[11px]"
          >
            <Sparkles className="h-3 w-3" strokeWidth={2.5} />
            {t('badge')}
          </motion.div>

          {/* ---------- REVEAL PARAGRAPHS ---------- */}
          <div className="mt-8 md:mt-10">
            {paragraphWords.map((words, pIdx) => {
              const prevWordCount = paragraphWords
                .slice(0, pIdx)
                .reduce((sum, w) => sum + w.length, 0);

              return (
                <p
                  key={pIdx}
                  className={`font-display font-black leading-[1.35] tracking-[-0.02em] text-foreground md:leading-[1.25] ${
                    pIdx === 0
                      ? 'text-[clamp(1.5rem,4vw,2.75rem)]'
                      : pIdx === 1
                      ? 'mt-6 text-[clamp(1.25rem,3vw,2rem)] md:mt-8'
                      : 'mt-6 text-[clamp(1.1rem,2.4vw,1.5rem)] md:mt-8'
                  }`}
                >
                  {words.map((word, wIdx) => {
                    const globalIdx = prevWordCount + wIdx;
                    const start =
                      startPad + (globalIdx / totalWords) * usableRange;
                    const end =
                      startPad +
                      ((globalIdx + 1) / totalWords) * usableRange;

                    return (
                      <span key={wIdx}>
                        <HighlightWord
                          progress={scrollYProgress}
                          range={[start, end]}
                        >
                          {word}
                        </HighlightWord>
                        {wIdx < words.length - 1 && ' '}
                      </span>
                    );
                  })}
                </p>
              );
            })}
          </div>

          {/* ---------- PROGRESS INDICATOR ---------- */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 flex items-center justify-center gap-3 md:mt-14"
          >
            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-muted md:text-[10px]">
              {t('progressLabel')}
            </span>
            <div className="relative h-[2px] w-24 overflow-hidden rounded-full bg-border/60 md:w-32">
              <motion.div
                className="absolute inset-y-0 start-0 rounded-full bg-gradient-to-r from-brand-500 to-accent-500"
                style={{ scaleX: scrollYProgress }}
                // scaleX origin depends on RTL
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}