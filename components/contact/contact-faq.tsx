'use client';

import { useState, useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  type Variants,
} from 'framer-motion';
import { Sparkles, Plus, MessageCircle } from 'lucide-react';
import { Link } from '@/i18n/navigation';

/* ============================================================
   FAQ CATEGORIES & DATA
   ============================================================ */
const CATEGORIES = [
  { key: 'general',  questions: ['q1', 'q2', 'q3', 'q4', 'q5'] },
  { key: 'services', questions: ['q1', 'q2', 'q3', 'q4', 'q5'] },
  { key: 'pricing',  questions: ['q1', 'q2', 'q3', 'q4', 'q5'] },
  { key: 'working',  questions: ['q1', 'q2', 'q3', 'q4', 'q5'] },
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

/* ============================================================
   MAIN COMPONENT
   ============================================================ */
export function ContactFAQ() {
  const t = useTranslations('ContactFAQ');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const [openIndex, setOpenIndex] = useState<string | null>('general-q1');
  const [activeCategory, setActiveCategory] = useState<string>('general');

  // Ref for the right-side container to track scroll progress
  const rightRef = useRef<HTMLDivElement>(null);
  
  // Framer Motion scroll hook
  const { scrollYProgress } = useScroll({
    target: rightRef,
    offset: ['start center', 'end center'],
  });

  // Auto-update active category based on scroll progress
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (latest < 0.25) setActiveCategory('general');
    else if (latest < 0.5) setActiveCategory('services');
    else if (latest < 0.75) setActiveCategory('pricing');
    else setActiveCategory('working');
  });

  const toggle = (id: string) => {
    setOpenIndex((prev) => (prev === id ? null : id));
  };

  const handleNavClick = (catKey: string) => {
    setActiveCategory(catKey);
    const el = document.getElementById(`faq-${catKey}`);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    // 🔥 Removed overflow-hidden from here. This was breaking the sticky!
    <section
      id="faq"
      className="relative bg-background py-20 md:py-24 lg:py-28"
    >
      {/* Orbs container now handles the overflow-hidden safely */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-1/4 h-[380px] w-[380px] rounded-full orb-brand blur-3xl" />
        <div className="absolute -right-40 bottom-1/4 h-[380px] w-[380px] rounded-full orb-teal blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 md:px-8">
        
        {/* 🔥 items-start ensures left column doesn't stretch to full height */}
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-16">

          {/* ============================================================
              LEFT — STICKY NAVIGATION + PROGRESS ANIMATION
             ============================================================ */}
          <motion.div
            variants={headerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start"
          >
            <div className="skeu-badge inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-brand-500 md:text-[11px]">
              <Sparkles className="h-3 w-3" strokeWidth={2.5} />
              {t('badge')}
            </div>

            <h2 className="mt-5 font-display text-[clamp(1.75rem,4.5vw,3rem)] font-black leading-[1.06] tracking-[-0.03em] text-foreground md:mt-6">
              {t('title.line1')}{' '}
              <span className="text-gradient-animated">
                {t('title.highlight')}
              </span>
            </h2>

            <p className="mt-4 max-w-sm text-[13.5px] leading-relaxed text-muted md:mt-5 md:text-[15px]">
              {t('subtitle')}
            </p>

            {/* Category Nav with Animated Progress Bar */}
            <div className="mt-8 hidden flex-col gap-2 lg:flex">
              <div className="relative ps-4">
                {/* Vertical Base Line */}
                <div className="absolute inset-y-0 start-0 w-[2px] rounded-full bg-border/60" />
                
                {/* Vertical Scroll Progress Line */}
                <motion.div
                  className="absolute start-0 top-0 w-[2px] origin-top rounded-full bg-brand-500"
                  style={{ height: '100%', scaleY: scrollYProgress }}
                />

                {/* Nav Items */}
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.key}
                    onClick={() => handleNavClick(cat.key)}
                    className={`group flex w-full items-center justify-between rounded-xl px-4 py-3 text-start text-[13px] font-bold transition-all duration-300 ${
                      activeCategory === cat.key
                        ? 'bg-brand-500/[0.08] text-brand-500'
                        : 'text-foreground/60 hover:bg-foreground/[0.03] hover:text-foreground'
                    }`}
                  >
                    {t(`categories.${cat.key}.title`)}
                    <span
                      className={`text-[10px] font-black transition-opacity duration-300 ${
                        activeCategory === cat.key ? 'opacity-100 text-brand-500' : 'opacity-20'
                      }`}
                    >
                      05
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Help CTA */}
            <div className="mt-8 hidden rounded-2xl border border-border/50 bg-card/40 p-5 lg:block">
              <p className="text-[13px] font-semibold text-foreground">
                {t('help.title')}
              </p>
              <p className="mt-1 text-[12px] text-muted">
                {t('help.subtitle')}
              </p>
              <Link
                href="#inquiry-form"
                className="mt-4 inline-flex items-center gap-1.5 text-[12px] font-bold text-brand-500 hover:text-brand-600"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                {t('help.cta')}
              </Link>
            </div>
          </motion.div>

          {/* ============================================================
              RIGHT — ACCORDION (Scrollable Content)
             ============================================================ */}
          <div ref={rightRef} className="lg:col-span-8 pb-12">
            <div className="space-y-10 md:space-y-14">
              {CATEGORIES.map((category) => (
                <div key={category.key} id={`faq-${category.key}`}>
                  {/* Category Title */}
                  <h3 className="mb-5 font-display text-lg font-black tracking-tight text-foreground md:text-xl">
                    {t(`categories.${category.key}.title`)}
                  </h3>

                  {/* Questions */}
                  <div className="space-y-3">
                    {category.questions.map((q) => {
                      const id = `${category.key}-${q}`;
                      const isOpen = openIndex === id;

                      return (
                        <motion.div
                          key={id}
                          initial={{ opacity: 0, y: 16 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: '-40px' }}
                          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                          className="skeu-panel overflow-hidden rounded-2xl transition-shadow duration-300"
                          style={{
                            boxShadow: isOpen
                              ? 'inset 0 0 0 1px color-mix(in oklab, var(--color-brand-500) 22%, transparent)'
                              : undefined,
                          }}
                        >
                          <button
                            type="button"
                            onClick={() => toggle(id)}
                            aria-expanded={isOpen}
                            className="flex w-full items-center gap-4 p-4 text-start md:p-5"
                          >
                            <span
                              className={`min-w-0 flex-1 font-display text-[14px] font-bold leading-snug tracking-tight transition-colors duration-300 md:text-[15px] ${
                                isOpen ? 'text-brand-500' : 'text-foreground'
                              }`}
                            >
                              {t(`questions.${category.key}.${q}.question`)}
                            </span>
                            <motion.span
                              animate={{ rotate: isOpen ? 45 : 0 }}
                              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
                                isOpen
                                  ? 'bg-brand-500 text-white'
                                  : 'bg-foreground/5 text-muted'
                              }`}
                            >
                              <Plus className="h-4 w-4" strokeWidth={2.5} />
                            </motion.span>
                          </button>

                          <AnimatePresence initial={false}>
                            {isOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{
                                  duration: 0.35,
                                  ease: [0.22, 1, 0.36, 1],
                                  opacity: { duration: 0.25, delay: 0.05 },
                                }}
                                className="overflow-hidden"
                              >
                                <div className="px-4 pb-5 md:px-5 md:pb-6">
                                  <p className="text-[13px] leading-relaxed text-muted md:text-[14px]">
                                    {t(`questions.${category.key}.${q}.answer`)}
                                  </p>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}