'use client';

import { Link } from '@/i18n/navigation';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { ArrowUpRight, Check, Sparkles } from 'lucide-react';
import type { SectorContent, SectorTranslation, Locale } from '@/data/sectors';

function DynamicIcon({ name, className, strokeWidth = 2 }: {
  name: string;
  className?: string;
  strokeWidth?: number;
}) {
  const Icon = (Icons as any)[name] ?? Icons.Circle;
  return <Icon className={className} strokeWidth={strokeWidth} />;
}

export function SectorDetail({
  sector, content, locale,
}: {
  sector: SectorContent;
  content: SectorTranslation;
  locale: Locale;
}) {
  const isRTL = locale === 'ar';
  const isAccent = sector.accent === 'accent';

  return (
    <main className="relative">
      {/* HERO */}
      <section className="relative overflow-hidden bg-background py-20 md:py-28">
        <div className="orb-brand pointer-events-none absolute -left-40 top-0 h-[400px] w-[400px] rounded-full blur-3xl" />

        <div className="relative mx-auto max-w-5xl px-5 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-muted"
          >
            <Link href="/work" className="transition-colors hover:text-brand-500">
              Sectors
            </Link>
            <span className="text-muted/40">/</span>
            <span className="text-foreground/70">{content.name}</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 flex items-center gap-4"
          >
            <span
              className={`flex h-14 w-14 items-center justify-center rounded-2xl ${
                isAccent ? 'bg-accent-500/12 text-accent-500' : 'bg-brand-500/12 text-brand-500'
              }`}
            >
              <DynamicIcon name={sector.icon} className="h-6 w-6" />
            </span>
            <div className="skeu-badge inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-500 md:text-[11px]">
              <Sparkles className="h-3 w-3" strokeWidth={2.5} />
              {content.hero.eyebrow}
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.75, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 font-display text-4xl font-black leading-[1.02] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
          >
            {content.hero.headline}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-6 max-w-2xl text-[15px] leading-relaxed text-muted md:text-lg"
          >
            {content.hero.subheadline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-3.5"
          >
            <Link
              href="/contact"
              className="skeu-btn inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[13px] font-bold md:text-sm"
            >
              {content.cta.buttonPrimary}
              <ArrowUpRight
                className={`h-3.5 w-3.5 ${isRTL ? 'rotate-[-90deg]' : ''}`}
                strokeWidth={2.75}
              />
            </Link>
            <Link
              href="/work"
              className="skeu-btn-secondary inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[13px] font-semibold md:text-sm"
            >
              {content.cta.buttonSecondary}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* WHY */}
      <section className="relative border-t border-border/50 bg-background py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center text-lg leading-relaxed text-foreground/85 md:text-2xl"
          >
            {content.why}
          </motion.p>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="relative bg-background py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-black leading-tight tracking-tight text-foreground md:text-4xl">
              {content.whatWeDo.title}
            </h2>
            <p className="mt-3 text-[14px] text-muted md:text-base">
              {content.whatWeDo.subtitle}
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {content.whatWeDo.items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="skeu-panel skeu-panel-hover rounded-2xl p-5 md:p-6"
              >
                <span
                  className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl ${
                    isAccent ? 'bg-accent-500/12 text-accent-500' : 'bg-brand-500/12 text-brand-500'
                  }`}
                >
                  <Check className="h-4 w-4" strokeWidth={2.75} />
                </span>
                <h3 className="font-display text-base font-black tracking-tight text-foreground md:text-lg">
                  {item.title}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-muted md:text-sm">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* APPROACH */}
      <section className="relative border-t border-border/50 bg-background py-20 md:py-24">
        <div className="mx-auto max-w-5xl px-5 md:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-black leading-tight tracking-tight text-foreground md:text-4xl">
              {content.approach.title}
            </h2>
            <p className="mt-3 text-[14px] text-muted md:text-base">
              {content.approach.subtitle}
            </p>
          </div>

          <div className="mt-12 space-y-4">
            {content.approach.steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="skeu-panel grid grid-cols-[auto_1fr] gap-5 rounded-2xl p-5 md:grid-cols-[80px_1fr] md:gap-8 md:p-7"
              >
                <span
                  className={`font-display text-3xl font-black leading-none tracking-tight md:text-4xl ${
                    isAccent ? 'text-accent-500' : 'text-brand-500'
                  }`}
                >
                  {step.number}
                </span>
                <div>
                  <h3 className="font-display text-lg font-black tracking-tight text-foreground md:text-xl">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-muted md:text-sm">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* OFFERINGS */}
      <section className="relative border-t border-border/50 bg-background py-20 md:py-24">
        <div className="mx-auto max-w-4xl px-5 md:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-black leading-tight tracking-tight text-foreground md:text-4xl">
              {content.offerings.title}
            </h2>
            <p className="mt-3 text-[14px] text-muted md:text-base">
              {content.offerings.subtitle}
            </p>
          </div>

          <motion.ul
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-10 grid gap-3 sm:grid-cols-2"
          >
            {content.offerings.items.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-3 rounded-xl border border-border/50 bg-card/40 p-4"
              >
                <span
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                    isAccent ? 'bg-accent-500/12 text-accent-500' : 'bg-brand-500/12 text-brand-500'
                  }`}
                >
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                <span className="text-[13px] leading-relaxed text-foreground/90 md:text-sm">
                  {item}
                </span>
              </li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden border-t border-border/50 bg-background py-20 md:py-28">
        <div className="orb-teal pointer-events-none absolute -right-40 top-0 h-[400px] w-[400px] rounded-full blur-3xl" />
        <div className="relative mx-auto max-w-3xl px-5 text-center md:px-8">
          <h2 className="font-display text-3xl font-black leading-tight tracking-tight text-foreground md:text-5xl">
            {content.cta.title}
          </h2>
          <p className="mt-4 text-[14px] leading-relaxed text-muted md:text-base">
            {content.cta.subtitle}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="skeu-btn inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[13px] font-bold md:text-sm"
            >
              {content.cta.buttonPrimary}
              <ArrowUpRight
                className={`h-3.5 w-3.5 ${isRTL ? 'rotate-[-90deg]' : ''}`}
                strokeWidth={2.75}
              />
            </Link>
            <Link
              href="/work"
              className="skeu-btn-secondary inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[13px] font-semibold md:text-sm"
            >
              {content.cta.buttonSecondary}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}