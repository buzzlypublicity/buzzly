'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { motion, type Variants } from 'framer-motion';
import {
  MessageCircle,
  Phone,
  MapPin,
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  Clock,
} from 'lucide-react';

/* ============================================================
   OFFICIAL CONTACT DATA
   ============================================================ */
const PHONE_DISPLAY = '+973 6631 6733';
const PHONE_TEL     = 'tel:+97366316733';
const WHATSAPP_URL  = 'https://wa.me/97366316733';
const MAPS_URL      =
  'https://maps.google.com/?q=Flat+13+Building+1435+Road+504+Block+205+Muharraq+Bahrain';

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

const visualVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9, x: -30 },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ============================================================
   COMPONENT
   ============================================================ */
export function ServicesFinalCTA() {
  const t = useTranslations('ServicesFinalCTA');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const contactItems = [
    {
      icon: MessageCircle,
      label: t('contact.whatsapp.label'),
      value: PHONE_DISPLAY,
      href: WHATSAPP_URL,
      external: true,
      accent: 'accent' as const,
    },
    {
      icon: Phone,
      label: t('contact.phone.label'),
      value: PHONE_DISPLAY,
      href: PHONE_TEL,
      external: false,
      accent: 'brand' as const,
    },
    {
      icon: MapPin,
      label: t('contact.address.label'),
      value: t('contact.address.value'),
      href: MAPS_URL,
      external: true,
      accent: 'accent' as const,
    },
  ];

  return (
    <section
      id="final-cta"
      className="relative overflow-hidden bg-background pt-16  md:py-28 lg:py-32"
    >
      {/* Ambient orbs */}
      <div className="pointer-events-none absolute -left-40 top-1/4 h-[400px] w-[400px] rounded-full orb-brand blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-1/4 h-[400px] w-[400px] rounded-full orb-teal blur-3xl" />

      {/* Grid pattern */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 text-foreground opacity-[0.04] dark:opacity-[0.06]"
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

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="relative mx-auto max-w-7xl px-5 md:px-8"
      >
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">

          {/* ============================================================
              LEFT — PREMIUM VISUAL
             ============================================================ */}
          <motion.div
  variants={visualVariants}
  className="relative hidden lg:order-1 lg:col-span-6 lg:block"
>
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* ---------- BIG VISUAL STAGE ---------- */}
              <div
                className="skeu-panel relative aspect-square w-full overflow-hidden rounded-[40px]"
                style={{
                  background:
                    'linear-gradient(135deg, #E97A00 0%, #B04E00 45%, #8C3E00 100%)',
                  boxShadow:
                    '0 1px 0 rgba(255,255,255,0.3) inset, 0 -2px 0 rgba(0,0,0,0.2) inset, 0 32px 80px -24px rgba(233,122,0,0.5), 0 12px 32px -12px rgba(0,0,0,0.2)',
                }}
              >
                {/* Grid overlay */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-[0.12]"
                  style={{
                    backgroundImage:
                      'linear-gradient(to right, #FFFFFF 1px, transparent 1px), linear-gradient(to bottom, #FFFFFF 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                    maskImage:
                      'radial-gradient(ellipse 90% 90% at 50% 50%, black 40%, transparent 100%)',
                    WebkitMaskImage:
                      'radial-gradient(ellipse 90% 90% at 50% 50%, black 40%, transparent 100%)',
                  }}
                />

                {/* Animated floating orb — top right */}
                <motion.div
                  aria-hidden
                  className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/20 blur-3xl"
                  animate={{
                    x: [0, 20, -10, 0],
                    y: [0, -15, 10, 0],
                    scale: [1, 1.08, 0.98, 1],
                  }}
                  transition={{
                    duration: 14,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />

                {/* Animated floating orb — bottom left */}
                <motion.div
                  aria-hidden
                  className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-black/25 blur-3xl"
                  animate={{
                    x: [0, -18, 12, 0],
                    y: [0, 12, -18, 0],
                    scale: [1, 0.95, 1.05, 1],
                  }}
                  transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />

                {/* Center content */}
                <div className="relative flex h-full flex-col items-center justify-center p-8 md:p-12">

                  {/* Layered 3D rings behind icon */}
                  <div className="relative flex h-32 w-32 items-center justify-center md:h-40 md:w-40">
                    {/* Outer pulse ring */}
                    <motion.span
                      aria-hidden
                      className="absolute inset-0 rounded-full border border-white/20"
                      animate={{
                        scale: [1, 1.25, 1],
                        opacity: [0.6, 0, 0.6],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />
                    {/* Middle ring */}
                    <motion.span
                      aria-hidden
                      className="absolute inset-3 rounded-full border border-white/30"
                      animate={{
                        scale: [1, 1.18, 1],
                        opacity: [0.7, 0, 0.7],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: 0.4,
                      }}
                    />
                    {/* Solid circle */}
                    <span
                      className="relative flex h-24 w-24 items-center justify-center rounded-full md:h-28 md:w-28"
                      style={{
                        background: 'rgba(255, 255, 255, 0.15)',
                        borderTop: '1px solid rgba(255, 255, 255, 0.4)',
                        borderBottom: '1px solid rgba(0, 0, 0, 0.15)',
                        backdropFilter: 'blur(12px)',
                        boxShadow:
                          '0 1px 0 rgba(255,255,255,0.3) inset, 0 8px 24px rgba(0,0,0,0.2)',
                      }}
                    >
                      {/* Megaphone-style icon — Sparkles as placeholder, can be swapped */}
                      <Sparkles
                        className="h-10 w-10 text-white md:h-12 md:w-12"
                        strokeWidth={1.75}
                      />
                    </span>
                  </div>

                  {/* Brand wordmark below */}
                  <div className="relative mt-8 text-center md:mt-10">
                    <p
                      className="font-display text-[11px] font-bold uppercase tracking-[0.4em] text-white/70 md:text-xs"
                    >
                      {t('visual.label')}
                    </p>
                    <h3 className="mt-3 font-display text-3xl font-black leading-none tracking-tight text-white md:text-5xl">
                      BUZZLY
                      <span className="text-white/60">.</span>
                    </h3>
                    <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.25em] text-white/60 md:text-xs">
                      {t('visual.subtitle')}
                    </p>
                  </div>
                </div>

                {/* Corner accent — top left badge */}
                <div
                  className="absolute start-5 top-5 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-white md:start-6 md:top-6 md:text-[10px]"
                  style={{
                    background: 'rgba(0,0,0,0.25)',
                    borderTop: '1px solid rgba(255,255,255,0.2)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                  {t('visual.status')}
                </div>

                {/* Corner accent — bottom right */}
                <div
                  className="absolute end-5 bottom-5 rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-white/80 md:end-6 md:bottom-6 md:text-[10px]"
                  style={{
                    background: 'rgba(0,0,0,0.2)',
                    borderTop: '1px solid rgba(255,255,255,0.15)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  {t('visual.location')}
                </div>
              </div>

              {/* ---------- FLOATING TRUST CARD ---------- */}
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="skeu-panel absolute -bottom-6 start-6 flex items-center gap-3 rounded-2xl p-3.5 md:-bottom-8 md:start-8 md:gap-4 md:p-4"
                style={{
                  boxShadow:
                    '0 1px 0 var(--skeu-bevel-top) inset, 0 -1px 0 var(--skeu-bevel-bottom) inset, 0 12px 32px -8px var(--skeu-drop-1), 0 4px 12px -4px var(--skeu-drop-2)',
                }}
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/12 text-brand-500 md:h-11 md:w-11">
                  <Clock className="h-4 w-4 md:h-5 md:w-5" strokeWidth={2.25} />
                </span>
                <div className="leading-tight">
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted md:text-[11px]">
                    {t('trust.label')}
                  </p>
                  <p className="mt-0.5 font-display text-[13px] font-black text-foreground md:text-sm">
                    {t('trust.value')}
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* ============================================================
              RIGHT — CONTENT + CTA
             ============================================================ */}
          <div className="order-1 lg:order-2 lg:col-span-6">

            {/* Badge */}
            <motion.div variants={itemVariants}>
              <div className="skeu-badge inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-500 md:text-[11px]">
                <Sparkles className="h-3 w-3" strokeWidth={2.5} />
                {t('badge')}
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h2
              variants={itemVariants}
              className="mt-5 font-display text-[clamp(2.25rem,5.5vw,3.75rem)] font-black leading-[1.02] tracking-[-0.035em] text-foreground md:mt-6"
            >
              <span className="block">{t('headline.line1')}</span>
              <span className="text-gradient-animated mt-1 block">
                {t('headline.line2')}
              </span>
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="mt-5 max-w-lg text-[14px] leading-relaxed text-muted md:mt-6 md:text-[15px]"
            >
              {t('subtitle')}
            </motion.p>

            {/* ============================================================
                CONTACT LIST
               ============================================================ */}
            <motion.div
              variants={itemVariants}
              className="mt-8 space-y-2.5 md:mt-10"
            >
              {contactItems.map(({ icon: Icon, label, value, href, external, accent }, i) => {
                const isAccent = accent === 'accent';
                return (
                  <motion.a
                    key={label}
                    href={href}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noopener noreferrer' : undefined}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: 0.3 + i * 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    whileHover={{ x: 4 }}
                    className="group flex items-center gap-3 rounded-2xl border border-border/60 bg-card/40 p-3 transition-colors duration-200 hover:border-brand-500/40 hover:bg-card md:gap-4 md:p-4"
                  >
                    {/* Icon */}
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all duration-300 md:h-11 md:w-11 ${
                        isAccent
                          ? 'bg-accent-500/12 text-accent-500 group-hover:bg-accent-500 group-hover:text-white'
                          : 'bg-brand-500/12 text-brand-500 group-hover:bg-brand-500 group-hover:text-white'
                      }`}
                    >
                      <Icon className="h-4 w-4 md:h-5 md:w-5" strokeWidth={2.25} />
                    </span>

                    {/* Text */}
                    <div className="min-w-0 flex-1">
                      <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-muted md:text-[10px]">
                        {label}
                      </p>
                      <p className="mt-0.5 truncate text-[13px] font-semibold text-foreground md:text-sm">
                        {value}
                      </p>
                    </div>

                    {/* Arrow */}
                    <ArrowUpRight
                      className={`h-4 w-4 shrink-0 text-muted/60 transition-all duration-300 group-hover:text-brand-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                        isRTL ? 'rotate-[-90deg]' : ''
                      }`}
                      strokeWidth={2.5}
                    />
                  </motion.a>
                );
              })}
            </motion.div>

            {/* ============================================================
                CTA BUTTONS
               ============================================================ */}
            <motion.div
              variants={itemVariants}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-3.5 md:mt-10"
            >
              {/* Primary — WhatsApp */}
              <motion.a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                className="skeu-btn group relative inline-flex flex-1 items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3.5 text-[13px] font-bold md:py-4 md:text-sm"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-[600ms] ease-out group-hover:translate-x-[300%]"
                />
                <MessageCircle className="relative h-4 w-4" strokeWidth={2.5} />
                <span className="relative">{t('ctaPrimary')}</span>
                <ArrowRight
                  className={`relative h-3.5 w-3.5 transition-transform duration-200 ease-out ${
                    isRTL
                      ? 'rotate-180 group-hover:-translate-x-0.5 group-hover:translate-x-0'
                      : 'group-hover:translate-x-0.5'
                  }`}
                  strokeWidth={2.75}
                />
              </motion.a>

              {/* Secondary — Inquiry */}
              <motion.div
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                className="flex-1"
              >
                <Link
                  href="/contact"
                  className="skeu-btn-secondary group inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[13px] font-semibold md:py-4 md:text-sm"
                >
                  <span>{t('ctaSecondary')}</span>
                  <ArrowUpRight
                    className={`h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                      isRTL ? 'rotate-[-90deg]' : ''
                    }`}
                    strokeWidth={2.75}
                  />
                </Link>
              </motion.div>
            </motion.div>

            {/* Trust line */}
            <motion.p
              variants={itemVariants}
              className="mt-6 text-[10px] font-semibold uppercase tracking-[0.15em] text-muted md:mt-8 md:text-[11px]"
            >
              {t('bottomNote')}
            </motion.p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}