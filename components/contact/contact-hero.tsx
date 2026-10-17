'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion, type Variants } from 'framer-motion';
import {
  MessageCircle,
  Mail,
  FileText,
  Sparkles,
  CheckCircle2,
  ArrowUpRight,
} from 'lucide-react';

/* ============================================================
   OFFICIAL CONTACT DATA
   ============================================================ */
const WHATSAPP_URL = 'https://wa.me/97366316733';
const EMAIL_ADDRESS = 'buzzlypublicityandadvertising@gmail.com';

/* ============================================================
   ACTION CARDS DATA
   ============================================================ */
const ACTIONS = [
  {
    key: 'whatsapp',
    icon: MessageCircle,
    href: WHATSAPP_URL,
    external: true,
    accent: 'brand' as const,
  },
  {
    key: 'email',
    icon: Mail,
    href: `mailto:${EMAIL_ADDRESS}`,
    external: false,
    accent: 'accent' as const,
  },
  {
    key: 'form',
    icon: FileText,
    href: '#inquiry-form',
    external: false,
    accent: 'brand' as const,
  },
];

/* ============================================================
   ANIMATIONS
   ============================================================ */
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, x: 30, scale: 0.96 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      delay: 0.2 + i * 0.1,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

/* ============================================================
   MAIN COMPONENT
   ============================================================ */
export function ContactHero() {
  const t = useTranslations('ContactHero');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  return (
    <section
      id="contact-hero"
      className="relative overflow-hidden bg-background py-16 md:py-24 lg:py-28"
    >
      {/* Orbs */}
      <div className="pointer-events-none absolute -left-40 top-20 h-[380px] w-[380px] rounded-full orb-brand blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-20 h-[380px] w-[380px] rounded-full orb-teal blur-3xl" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative mx-auto max-w-6xl px-5 md:px-8"
      >
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">

          {/* ============================================================
              LEFT — CONTENT
             ============================================================ */}
          <div className="lg:col-span-6">

            {/* Badge */}
            <motion.div variants={itemVariants} className="inline-flex">
              <div className="skeu-badge inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-brand-500 md:text-[11px]">
                <Sparkles className="h-3 w-3" strokeWidth={2.5} />
                {t('badge')}
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="mt-5 font-display text-[clamp(2.25rem,6vw,4rem)] font-black leading-[1.02] tracking-[-0.04em] text-foreground md:mt-6"
            >
              <span className="block">{t('headline.line1')}</span>
              <span className="block">{t('headline.line2')}</span>
              <span className="text-gradient-animated block">
                {t('headline.line3')}
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="mt-5 max-w-lg text-[14px] leading-relaxed text-muted md:mt-6 md:text-[15px]"
            >
              {t('subtitle')}
            </motion.p>

            {/* Trust bullets */}
            <motion.ul
              variants={itemVariants}
              className="mt-7 space-y-2.5 md:mt-8"
            >
              {[
                t('trust.response'),
                t('trust.bilingual'),
                t('trust.noCommitment'),
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2.5">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-500/12 text-brand-500">
                    <CheckCircle2 className="h-3 w-3" strokeWidth={3} />
                  </span>
                  <span className="text-[13px] font-medium text-foreground/80 md:text-sm">
                    {item}
                  </span>
                </li>
              ))}
            </motion.ul>
          </div>

          {/* ============================================================
              RIGHT — ACTION CARDS
             ============================================================ */}
          <div className="space-y-3 md:space-y-4 lg:col-span-6">
            {ACTIONS.map((action, i) => {
              const Icon = action.icon;
              const isAccent = action.accent === 'accent';

              const inner = (
                <motion.div
                  custom={i}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ x: isRTL ? -4 : 4 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                  className="skeu-panel skeu-panel-hover group relative flex items-center gap-4 overflow-hidden rounded-2xl p-4 transition-colors duration-300 md:gap-5 md:rounded-3xl md:p-5"
                >
                  {/* Corner glow */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background: isAccent
                        ? 'radial-gradient(circle at 100% 0%, rgba(20,184,166,0.14), transparent 60%)'
                        : 'radial-gradient(circle at 100% 0%, rgba(233,122,0,0.14), transparent 60%)',
                    }}
                  />

                  {/* Icon */}
                  <span
                    className={`relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-all duration-300 md:h-14 md:w-14 md:rounded-2xl ${
                      isAccent
                        ? 'bg-accent-500/12 text-accent-500 group-hover:bg-accent-500 group-hover:text-white'
                        : 'bg-brand-500/12 text-brand-500 group-hover:bg-brand-500 group-hover:text-white'
                    }`}
                    style={{
                      boxShadow: isAccent
                        ? '0 4px 12px -6px rgba(20,184,166,0.3)'
                        : '0 4px 12px -6px rgba(233,122,0,0.3)',
                    }}
                  >
                    <Icon className="h-5 w-5 md:h-6 md:w-6" strokeWidth={2.25} />
                  </span>

                  {/* Text */}
                  <div className="min-w-0 flex-1">
                    <p className="font-display text-[13px] font-black uppercase tracking-[0.15em] text-muted md:text-[11px]">
                      {t(`actions.${action.key}.title`)}
                    </p>
                    <p className="mt-0.5 truncate text-[14px] font-semibold text-foreground md:text-[15px]">
                      {t(`actions.${action.key}.desc`)}
                    </p>
                  </div>

                  {/* Arrow */}
                  <span
                    className={`relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-300 md:h-10 md:w-10 ${
                      isAccent
                        ? 'bg-accent-500/10 text-accent-500 group-hover:bg-accent-500 group-hover:text-white'
                        : 'bg-brand-500/10 text-brand-500 group-hover:bg-brand-500 group-hover:text-white'
                    }`}
                  >
                    <ArrowUpRight
                      className={`h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                        isRTL ? 'rotate-[-90deg]' : ''
                      }`}
                      strokeWidth={2.5}
                    />
                  </span>
                </motion.div>
              );

              return action.external ? (
                <a
                  key={action.key}
                  href={action.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  {inner}
                </a>
              ) : (
                <a key={action.key} href={action.href} className="block">
                  {inner}
                </a>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
}