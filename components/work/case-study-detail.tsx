'use client';

import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { motion, type Variants } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle2, TrendingUp, Sparkles } from 'lucide-react';
import { Link } from '@/i18n/navigation';

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export function CaseStudyDetail({ study, locale }: { study: any; locale: string }) {
  const t = useTranslations('CaseStudyDetail');
  const isRTL = locale === 'ar';

  return (
    <main className="bg-background">
      {/* HERO */}
      <section className="relative py-20 md:py-28 lg:py-32 overflow-hidden">
        <div className="mx-auto max-w-4xl px-5 text-center md:px-8">
          <Link href="/work" className="inline-flex items-center gap-2 text-sm font-bold text-muted hover:text-brand-500 mb-8">
            <ArrowLeft className={`h-4 w-4 ${isRTL ? 'rotate-180' : ''}`} /> {t('back')}
          </Link>
          
          <div className="skeu-badge inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-500">
            <Sparkles className="h-3 w-3" /> {study.industry[locale]}
          </div>
          
          <h1 className="mt-6 font-display text-4xl font-black text-foreground md:text-6xl lg:text-7xl">
            {study.clientName[locale]}
          </h1>
          
          <p className="mt-6 text-lg font-medium text-muted md:text-xl">
            {study.service[locale]}
          </p>
        </div>

        {/* Hero Image */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative mx-auto mt-12 max-w-6xl px-5 md:mt-16 md:px-8"
        >
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[2rem] md:rounded-[3rem] skeu-panel border border-border/50">
            <Image src={study.heroImage} alt="Hero" fill className="object-cover" />
          </div>
        </motion.div>
      </section>

      {/* CHALLENGE & STRATEGY */}
      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-5xl px-5 md:px-8">
          <div className="grid gap-12 md:grid-cols-2 md:gap-16">
            
            {/* Challenge */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariants}>
              <div className="flex items-center gap-3 border-b border-border/50 pb-4 mb-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 text-red-500 font-bold">01</span>
                <h2 className="font-display text-2xl font-black text-foreground md:text-3xl">{t('challenge')}</h2>
              </div>
              <p className="text-[15px] leading-relaxed text-muted md:text-base">
                {study.challenge[locale]}
              </p>
            </motion.div>

            {/* Strategy */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariants}>
              <div className="flex items-center gap-3 border-b border-border/50 pb-4 mb-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/10 text-brand-500 font-bold">02</span>
                <h2 className="font-display text-2xl font-black text-foreground md:text-3xl">{t('strategy')}</h2>
              </div>
              <p className="text-[15px] leading-relaxed text-muted md:text-base">
                {study.strategy[locale]}
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* EXECUTION GALLERY */}
      <section className="py-16 bg-foreground/[0.02] border-y border-border/50">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <h2 className="text-center font-display text-2xl font-black text-foreground md:text-4xl mb-10">{t('execution')}</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {study.executionImages.map((img: string, i: number) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative aspect-square overflow-hidden rounded-2xl skeu-panel"
              >
                <Image src={img} alt={`Execution ${i+1}`} fill className="object-cover" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* RESULTS */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-5 md:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-brand-500/10 text-brand-500 mb-4">
              <TrendingUp className="h-8 w-8" />
            </div>
            <h2 className="font-display text-3xl font-black text-foreground md:text-5xl">{t('results')}</h2>
            <p className="mt-4 text-muted">{t('resultsSub')}</p>
          </div>

          <div className="grid gap-4 md:grid-cols-3 md:gap-6">
            {study.results.map((result: any, i: number) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="skeu-panel rounded-3xl p-6 text-center md:p-8"
              >
                <h3 className="font-display text-4xl font-black text-brand-500 md:text-5xl">{result.value}</h3>
                <p className="mt-2 text-[11px] font-bold uppercase tracking-wider text-muted md:text-xs">{result.label[locale]}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}