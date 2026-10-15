'use client';

import { Link } from '@/i18n/navigation';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { ArrowUpRight, ArrowRight, Info, Sparkles } from 'lucide-react';
import type {
  ConceptContent,
  ConceptTranslation,
  Locale,
} from '@/data/concepts';
import { getNextConcept } from '@/data/concepts';
import { useTranslations } from 'next-intl';

function DynamicIcon({
  name,
  className,
  strokeWidth = 2,
}: {
  name: string;
  className?: string;
  strokeWidth?: number;
}) {
  const Icon = (Icons as any)[name] ?? Icons.Circle;
  return <Icon className={className} strokeWidth={strokeWidth} />;
}

const sectionLabels = ['brief', 'idea', 'execution', 'objective'] as const;

export function ConceptDetail({
  concept,
  content,
  locale,
}: {
  concept: ConceptContent;
  content: ConceptTranslation;
  locale: Locale;
}) {
  const t = useTranslations('WorkConceptDetail');
  const isRTL = locale === 'ar';
  const isAccent = concept.accent === 'accent';
  const next = getNextConcept(concept.slug);
  const nextTr = next.translations[locale];

  return (
    <main className="relative">

      {/* ============================================================
          HERO
         ============================================================ */}
      <section className="relative overflow-hidden bg-background py-16 md:py-24 lg:py-28">
        <div className="pointer-events-none absolute -left-40 top-0 h-[400px] w-[400px] rounded-full orb-brand blur-3xl" />

        <div className="relative mx-auto max-w-4xl px-5 md:px-8">

          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-muted"
          >
            <Link href="/work" className="transition-colors hover:text-brand-500">
              {t('breadcrumb')}
            </Link>
            <span className="text-muted/40">/</span>
            <span className="text-foreground/70">{content.category}</span>
          </motion.div>

          {/* Top row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 flex items-center gap-4"
          >
            <span
              className={`flex h-14 w-14 items-center justify-center rounded-2xl ${
                isAccent
                  ? 'bg-accent-500/12 text-accent-500'
                  : 'bg-brand-500/12 text-brand-500'
              }`}
            >
              <DynamicIcon name={concept.icon} className="h-6 w-6" />
            </span>

            <div>
              <div
                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.2em] md:text-[10px] ${
                  isAccent
                    ? 'bg-accent-500/10 text-accent-500'
                    : 'bg-brand-500/10 text-brand-500'
                }`}
              >
                <Info className="h-2.5 w-2.5" strokeWidth={2.5} />
                {t('conceptTag')}
              </div>
              <p className="mt-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-muted md:text-xs">
                {content.hero.eyebrow}
              </p>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.75, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 font-display text-[clamp(2.25rem,7vw,4.5rem)] font-black leading-[1.02] tracking-[-0.04em] text-foreground md:mt-7"
          >
            {content.hero.headline}
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-5 max-w-2xl text-[15px] leading-relaxed text-muted md:mt-6 md:text-lg"
          >
            {content.hero.subheadline}
          </motion.p>

          {/* Quick info row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 grid grid-cols-2 gap-3 border-t border-border/50 pt-6 sm:grid-cols-3 md:mt-10 md:gap-4"
          >
            <InfoBlock
              label={t('labels.brand')}
              value={content.brand}
            />
            <InfoBlock
              label={t('labels.category')}
              value={content.category}
            />
            <InfoBlock
              label={t('labels.type')}
              value={t('conceptOnly')}
              className="col-span-2 sm:col-span-1"
            />
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          SECTIONS (Brief, Idea, Execution, Objective)
         ============================================================ */}
      <section className="relative border-t border-border/50 bg-background py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-5xl px-5 md:px-8">
          <div className="space-y-16 md:space-y-20">

            {sectionLabels.map((sectionKey, i) => {
              const section = content.sections[sectionKey];

              return (
                <motion.div
                  key={sectionKey}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="grid gap-8 md:grid-cols-12 md:gap-12"
                >
                  {/* Left — number + label (sticky feeling on desktop) */}
                  <div className="md:col-span-4">
                    <div className="md:sticky md:top-28">
                      <span
                        className={`font-display text-5xl font-black leading-none tracking-tight md:text-6xl lg:text-7xl ${
                          isAccent ? 'text-accent-500' : 'text-brand-500'
                        }`}
                      >
                        {section.number}
                      </span>
                      <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.25em] text-muted md:mt-4 md:text-[11px]">
                        {section.label}
                      </p>
                    </div>
                  </div>

                  {/* Right — content */}
                  <div className="md:col-span-8">
                    <h2 className="font-display text-2xl font-black leading-tight tracking-tight text-foreground md:text-3xl lg:text-4xl">
                      {section.title}
                    </h2>

                    <p className="mt-4 text-[14px] leading-relaxed text-muted md:mt-5 md:text-[15px]">
                      {section.content}
                    </p>

                    {/* Bullets (if any) */}
                    {section.bullets && section.bullets.length > 0 && (
                      <ul className="mt-6 space-y-2.5 md:mt-7">
                        {section.bullets.map((bullet, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2.5"
                          >
                            <span
                              className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${
                                isAccent ? 'bg-accent-500' : 'bg-brand-500'
                              }`}
                            />
                            <span className="text-[13px] leading-relaxed text-foreground/85 md:text-sm">
                              {bullet}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Gallery placeholder for Execution section */}
                    {sectionKey === 'execution' && concept.gallery.length > 0 && (
                      <div className="mt-8 grid grid-cols-2 gap-3 md:mt-10 md:gap-4">
                        {concept.gallery.map((img, idx) => (
                          <div
                            key={idx}
                            className="skeu-panel relative aspect-[4/3] overflow-hidden rounded-2xl"
                          >
                            {/* Image placeholder — replace with actual images */}
                            <div className="flex h-full w-full items-center justify-center">
                              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted/60">
                                {t('imagePending')}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Concept-only note in objective */}
                    {sectionKey === 'objective' && (
                      <div
                        className="mt-6 flex items-start gap-3 rounded-2xl p-4 md:mt-8"
                        style={{
                          background:
                            'color-mix(in oklab, var(--color-brand-500) 6%, transparent)',
                          border: '1px solid color-mix(in oklab, var(--color-brand-500) 20%, transparent)',
                        }}
                      >
                        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-brand-500/15 text-brand-500">
                          <Info className="h-3.5 w-3.5" strokeWidth={2.5} />
                        </span>
                        <p className="text-[12px] leading-relaxed text-foreground/80 md:text-[13px]">
                          {t('objectiveNote')}
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================
          NEXT CONCEPT
         ============================================================ */}
      <section className="relative overflow-hidden border-t border-border/50 bg-background py-16 md:py-20">
        <div className="pointer-events-none absolute -right-40 top-0 h-[380px] w-[380px] rounded-full orb-teal blur-3xl" />

        <div className="relative mx-auto max-w-4xl px-5 md:px-8">
          <Link
            href={`/work/${next.slug}`}
            className="group block"
          >
            <div className="skeu-panel skeu-panel-hover relative overflow-hidden rounded-3xl p-6 md:p-8">

              {/* Corner glow */}
              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-brand-500/15 blur-3xl"
              />

              <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:gap-8">

                {/* Left — Next label + title */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-brand-500 md:text-[11px]">
                    <Sparkles className="h-3 w-3" strokeWidth={2.5} />
                    {content.nextLabel}
                  </div>

                  <p className="mt-3 font-display text-[10px] font-bold uppercase tracking-[0.2em] text-muted md:text-[11px]">
                    {next.number} · {nextTr.category}
                  </p>

                  <h3 className="mt-2 font-display text-2xl font-black leading-tight tracking-tight text-foreground md:text-3xl">
                    {nextTr.title}
                  </h3>

                  <p className="mt-2 text-[13px] leading-relaxed text-muted md:text-sm">
                    {nextTr.brand}
                  </p>
                </div>

                {/* Right — Arrow */}
                <div className="flex items-center gap-3 md:gap-4">
                  <span className="hidden text-[10px] font-bold uppercase tracking-[0.2em] text-muted opacity-60 transition-opacity duration-300 group-hover:opacity-100 md:inline-block md:text-[11px]">
                    {t('viewNext')}
                  </span>
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300 md:h-14 md:w-14 ${
                      next.accent === 'accent'
                        ? 'bg-accent-500 text-white group-hover:bg-accent-600'
                        : 'bg-brand-500 text-white group-hover:bg-brand-600'
                    }`}
                  >
                    <ArrowRight
                      className={`h-5 w-5 transition-transform duration-300 ${
                        isRTL
                          ? 'rotate-180 group-hover:-translate-x-1'
                          : 'group-hover:translate-x-1'
                      }`}
                      strokeWidth={2.5}
                    />
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* Back to all concepts */}
          <div className="mt-8 text-center">
            <Link
              href="/work"
              className="inline-flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-[0.15em] text-muted transition-colors hover:text-brand-500 md:text-[13px]"
            >
              <ArrowUpRight
                className={`h-3.5 w-3.5 ${isRTL ? 'rotate-[-90deg]' : ''}`}
                strokeWidth={2.5}
              />
              {t('backToConcepts')}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ============================================================
   INFO BLOCK
   ============================================================ */
function InfoBlock({
  label,
  value,
  className = '',
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted md:text-[10px]">
        {label}
      </p>
      <p className="mt-1 text-[13px] font-semibold leading-snug text-foreground md:text-sm">
        {value}
      </p>
    </div>
  );
}