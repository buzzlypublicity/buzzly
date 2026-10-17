'use client';

import { useEffect, useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Shield, FileText, ArrowUp } from 'lucide-react';
import { Link } from '@/i18n/navigation';

export interface LegalSection {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface LegalLayoutProps {
  type: 'privacy' | 'terms';
  title: string;
  lastUpdated: string;
  sections: LegalSection[];
}

export function LegalLayout({ type, title, lastUpdated, sections }: LegalLayoutProps) {
  const t = useTranslations('LegalLayout');
  const [activeId, setActiveId] = useState(sections[0]?.id);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Ref for the right content to track scroll progress
  const rightContentRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: rightContentRef,
    offset: ['start center', 'end center'],
  });

  // Auto-update active section based on scroll progress
  // (IntersectionObserver ki jagah isko use kar rahe hain taake smooth lage)
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const index = Math.min(
      Math.floor(latest * sections.length),
      sections.length - 1
    );
    // Ensure index is not negative
    const safeIndex = Math.max(0, index);
    setActiveId(sections[safeIndex].id);
  });

  // Show scroll-to-top button after scrolling down
  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const Icon = type === 'privacy' ? Shield : FileText;

  return (
    // 🔥 overflow-hidden hata diya yahan se
    <section className="relative bg-background pt-16 pb-20 md:pt-24 md:pb-28">
      
      {/* Orbs ab is alag div ke andar hain taake sticky break na ho */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-1/4 h-[380px] w-[380px] rounded-full orb-brand blur-3xl" />
        <div className="absolute -right-40 bottom-1/4 h-[380px] w-[380px] rounded-full orb-teal blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        {/* 🔥 lg:items-start lagaya taake left column stretch na ho */}
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-16">

          {/* ============================================================
              LEFT — STICKY SIDEBAR (Navigation)
             ============================================================ */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
            <div className="skeu-badge inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-brand-500 md:text-[11px]">
              <Icon className="h-3 w-3" strokeWidth={2.5} />
              {type === 'privacy' ? 'Privacy' : 'Terms'}
            </div>

            <h1 className="mt-5 font-display text-[clamp(2rem,5vw,3rem)] font-black leading-[1.06] tracking-[-0.03em] text-foreground md:mt-6">
              {title}
            </h1>

            <p className="mt-3 text-[13px] font-medium text-muted md:text-sm">
              {t('lastUpdated')}: {lastUpdated}
            </p>

            {/* 🔥 Table of Contents with Progress Line */}
            <div className="mt-8 hidden max-h-[60vh] flex-col gap-1 overflow-y-auto pr-2 lg:flex custom-scrollbar">
              <div className="relative ps-4">
                {/* Vertical Base Line */}
                <div className="absolute inset-y-0 start-0 w-[2px] rounded-full bg-border/60" />

                {/* Vertical Scroll Progress Line */}
                <motion.div
                  className="absolute start-0 top-0 w-[2px] origin-top rounded-full bg-brand-500"
                  style={{ height: '100%', scaleY: scrollYProgress }}
                />

                {/* Navigation Items */}
                {sections.map((section, i) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-start text-[13px] transition-all duration-300 ${
                      activeId === section.id
                        ? 'bg-brand-500/[0.08] font-bold text-brand-500'
                        : 'text-foreground/60 hover:bg-foreground/[0.03] hover:text-foreground'
                    }`}
                  >
                    <span
                      className={`font-mono text-[10px] transition-colors duration-300 ${
                        activeId === section.id ? 'text-brand-500' : 'text-muted/40'
                      }`}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="line-clamp-1">{section.title}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Help Box */}
            <div className="mt-8 hidden rounded-2xl border border-border/50 bg-card/40 p-5 lg:block">
              <p className="text-[13px] font-semibold text-foreground">
                {t('help.title')}
              </p>
              <p className="mt-1 text-[12px] text-muted">
                {t('help.subtitle')}
              </p>
              <Link
                href="/contact"
                className="mt-4 inline-flex items-center gap-1.5 text-[12px] font-bold text-brand-500 hover:text-brand-600"
              >
                {t('help.cta')} →
              </Link>
            </div>
          </div>

          {/* ============================================================
              RIGHT — CONTENT (Tracked for scroll)
             ============================================================ */}
          <div ref={rightContentRef} className="lg:col-span-8 pb-12">
            <div className="skeu-panel rounded-3xl p-6 md:p-10 lg:p-12">
              <div className="space-y-12 md:space-y-16">
                {sections.map((section, index) => (
                  <div key={section.id} id={section.id} className="scroll-mt-32">
                    {/* Section Header */}
                    <div className="flex items-center gap-4 border-b border-border/50 pb-4">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500/10 font-display text-sm font-bold text-brand-500">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <h2 className="font-display text-xl font-black tracking-tight text-foreground md:text-2xl">
                        {section.title}
                      </h2>
                    </div>

                    {/* Section Content */}
                    <div className="prose prose-sm mt-6 max-w-none text-muted dark:prose-invert md:prose-base prose-headings:font-display prose-headings:font-bold prose-headings:text-foreground prose-p:leading-relaxed prose-a:text-brand-500 prose-strong:text-foreground prose-ul:list-disc prose-ul:pl-5">
                      {section.content}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-24 right-5 z-40 flex h-10 w-10 items-center justify-center rounded-full bg-brand-500 text-white shadow-lg transition-transform hover:scale-110 md:bottom-8 md:right-8"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </section>
  );
}