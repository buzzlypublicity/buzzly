'use client';

import { useRef, useEffect, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { motion, type Variants } from 'framer-motion';
import {
  MessageCircle,
  Phone,
  MapPin,
  FileText,
  ArrowUpRight,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

/* ============================================================
   OFFICIAL CONTACT DATA
   ============================================================ */
const PHONE_DISPLAY = '+973 6631 6733';
const PHONE_TEL     = 'tel:+97366316733';
const WHATSAPP_URL  = 'https://wa.me/97366316733';
const MAPS_URL      =
  'https://maps.google.com/?q=Flat+13+Building+1435+Road+504+Block+205+Muharraq+Bahrain';
const CR_NUMBER     = '182173-03';

/* ============================================================
   ANIMATION VARIANTS
   ============================================================ */
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.12 },
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
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      delay: i * 0.07,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

/* ============================================================
   SUBTLE MAGNETIC (light 2-4px shift only)
   ============================================================ */
function Magnetic({
  children,
  strength = 0.06,
}: {
  children: React.ReactNode;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const isTouch =
      typeof window !== 'undefined' &&
      window.matchMedia('(hover: none)').matches;
    if (isTouch) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      const maxDist = Math.max(rect.width, rect.height) * 0.9;

      if (dist < maxDist) {
        const falloff = 1 - dist / maxDist;
        setPosition({
          x: dx * strength * falloff,
          y: dy * strength * falloff,
        });
      } else {
        setPosition({ x: 0, y: 0 });
      }
    };

    const onLeave = () => setPosition({ x: 0, y: 0 });

    window.addEventListener('mousemove', onMove, { passive: true });
    el.addEventListener('mouseleave', onLeave);

    return () => {
      window.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [strength]);

  return (
    <motion.div
      ref={ref}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 20, mass: 0.6 }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}

/* ============================================================
   COMPONENT
   ============================================================ */
export function FinalCTA() {
  const t = useTranslations('FinalCTA');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const contactCards = [
    {
      icon: Phone,
      label: t('cards.phone.label'),
      value: PHONE_DISPLAY,
      href: PHONE_TEL,
      accent: 'brand',
    },
    {
      icon: MessageCircle,
      label: t('cards.whatsapp.label'),
      value: PHONE_DISPLAY,
      href: WHATSAPP_URL,
      accent: 'accent',
    },
    {
      icon: MapPin,
      label: t('cards.address.label'),
      value: t('cards.address.value'),
      href: MAPS_URL,
      accent: 'brand',
    },
    {
      icon: FileText,
      label: t('cards.cr.label'),
      value: CR_NUMBER,
      href: undefined,
      accent: 'accent',
    },
  ];

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-background py-20 md:py-24 lg:py-28"
    >
      {/* ============================================================
          BACKGROUND LAYERS
         ============================================================ */}

      {/* Top orange gradient band */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[60%]"
        style={{
          background:
            'radial-gradient(ellipse 100% 80% at 50% 0%, rgba(233,122,0,0.10), transparent 70%)',
        }}
      />

      {/* Big center glow (subtle pulse) */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500/[0.06] blur-[120px] md:h-[600px] md:w-[900px]"
        animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.05, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Orange orb — top left */}
      <motion.div
        aria-hidden
        className="orb-brand pointer-events-none absolute -left-32 top-10 h-[380px] w-[380px] rounded-full blur-3xl md:h-[500px] md:w-[500px]"
        animate={{
          x: [0, 25, -8, 0],
          y: [0, -18, 8, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Teal orb — bottom right */}
      <motion.div
        aria-hidden
        className="orb-teal pointer-events-none absolute -bottom-40 -right-32 h-[400px] w-[400px] rounded-full blur-3xl md:h-[540px] md:w-[540px]"
        animate={{
          x: [0, -20, 12, 0],
          y: [0, 12, -20, 0],
        }}
        transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Grid pattern */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 text-foreground opacity-[0.04] dark:opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage:
            'radial-gradient(ellipse 80% 60% at 50% 40%, black 30%, transparent 80%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 80% 60% at 50% 40%, black 30%, transparent 80%)',
        }}
      />

      {/* ============================================================
          CONTENT
         ============================================================ */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="relative z-10 mx-auto w-full max-w-6xl px-5 md:px-8"
      >

        {/* ============================================================
            BADGE
           ============================================================ */}
        <motion.div variants={itemVariants} className="flex justify-center">
          <div className="skeu-badge inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-brand-500 md:text-[11px]">
            <Sparkles className="h-3 w-3" strokeWidth={2.5} />
            {t('badge')}
          </div>
        </motion.div>

        {/* ============================================================
            HEADLINE — Cinematic but refined
           ============================================================ */}
        <motion.h2
          variants={itemVariants}
          className="mt-6 text-center font-display text-4xl font-black leading-[1.02] tracking-tight text-foreground sm:text-5xl md:mt-7 md:text-6xl lg:text-[4.5rem] xl:text-[5rem]"
        >
          <span className="block">{t('titleLine1')}</span>
          <motion.span
            className="text-gradient-animated mt-1 block"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {t('titleLine2')}
          </motion.span>
        </motion.h2>

        {/* ============================================================
            SUBTITLE
           ============================================================ */}
        <motion.p
          variants={itemVariants}
          className="mx-auto mt-5 max-w-xl text-center text-[14px] leading-relaxed text-muted sm:text-[15px] md:mt-6 md:text-base"
        >
          {t('subtitle')}
        </motion.p>

        {/* ============================================================
            CTA BUTTONS — Compact + subtle magnetic
           ============================================================ */}
        <motion.div
          variants={itemVariants}
          className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-3.5 md:mt-10"
        >
          {/* Primary — WhatsApp */}
          <Magnetic strength={0.06}>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="skeu-btn group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full px-5 py-2.5 text-[13px] font-bold sm:w-auto md:px-6 md:py-3 md:text-sm"
            >
              {/* Shine sweep */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-[600ms] ease-out group-hover:translate-x-[300%]"
              />
              <MessageCircle className="relative h-4 w-4" strokeWidth={2.5} />
              <span className="relative">{t('ctaPrimary')}</span>
              <ArrowUpRight
                className={`relative h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                  isRTL ? 'rotate-[-90deg]' : ''
                }`}
                strokeWidth={2.75}
              />
            </a>
          </Magnetic>

          {/* Secondary — Send Inquiry */}
          <Magnetic strength={0.06}>
            <Link
              href="/contact"
              className="skeu-btn-secondary group inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-semibold sm:w-auto md:px-6 md:py-3 md:text-sm"
            >
              <span>{t('ctaSecondary')}</span>
              <ArrowRight
                className={`h-3.5 w-3.5 transition-transform duration-200 ease-out ${
                  isRTL
                    ? 'rotate-180 group-hover:-translate-x-0.5 group-hover:translate-x-0'
                    : 'group-hover:translate-x-0.5'
                }`}
                strokeWidth={2.75}
              />
            </Link>
          </Magnetic>
        </motion.div>

        {/* ============================================================
            DIVIDER
           ============================================================ */}
        <motion.div
          variants={itemVariants}
          className="mx-auto mt-12 flex items-center justify-center gap-3 md:mt-14"
        >
          <span className="h-px w-10 bg-border md:w-16" />
          <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-muted md:text-[11px]">
            {t('dividerLabel')}
          </span>
          <span className="h-px w-10 bg-border md:w-16" />
        </motion.div>

        {/* ============================================================
            CONTACT CARDS
           ============================================================ */}
        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 md:mt-10 md:gap-4 lg:grid-cols-4">
          {contactCards.map(({ icon: Icon, label, value, href, accent }, i) => {
            const isAccent = accent === 'accent';

            const inner = (
              <motion.div
                custom={i}
                variants={cardVariants}
                whileHover={{ y: -3 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                className="skeu-panel skeu-panel-hover group relative flex h-full flex-col gap-3 overflow-hidden rounded-2xl p-4 text-start md:rounded-3xl md:p-5"
              >
                {/* Corner glow (on hover) */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-400 group-hover:opacity-100"
                  style={{
                    background: isAccent
                      ? 'radial-gradient(circle at 100% 0%, rgba(20,184,166,0.14), transparent 60%)'
                      : 'radial-gradient(circle at 100% 0%, rgba(233,122,0,0.14), transparent 60%)',
                  }}
                />

                {/* Icon */}
                <span
                  className={`relative flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-200 ${
                    isAccent
                      ? 'bg-accent-500/12 text-accent-500 group-hover:bg-accent-500 group-hover:text-white'
                      : 'bg-brand-500/12 text-brand-500 group-hover:bg-brand-500 group-hover:text-white'
                  }`}
                >
                  <Icon className="h-4 w-4" strokeWidth={2.25} />
                </span>

                {/* Label */}
                <span className="relative text-[9px] font-bold uppercase tracking-[0.18em] text-muted md:text-[10px]">
                  {label}
                </span>

                {/* Value */}
                <span className="relative text-[13px] font-semibold leading-snug text-foreground md:text-sm">
                  {value}
                </span>

                {/* Arrow (if link) */}
                {href && (
                  <span
                    className={`relative mt-auto flex h-6 w-6 items-center justify-center self-end rounded-full transition-all duration-200 ${
                      isAccent
                        ? 'bg-accent-500/10 text-accent-500 group-hover:bg-accent-500 group-hover:text-white'
                        : 'bg-brand-500/10 text-brand-500 group-hover:bg-brand-500 group-hover:text-white'
                    }`}
                  >
                    <ArrowUpRight
                      className={`h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                        isRTL ? 'rotate-[-90deg]' : ''
                      }`}
                      strokeWidth={2.75}
                    />
                  </span>
                )}
              </motion.div>
            );

            return href ? (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="block h-full"
              >
                {inner}
              </a>
            ) : (
              <div key={label} className="h-full">
                {inner}
              </div>
            );
          })}
        </div>

        {/* ============================================================
            BOTTOM TRUST LINE
           ============================================================ */}
        <motion.p
          variants={itemVariants}
          className="mt-10 text-center text-[10px] font-semibold uppercase tracking-[0.15em] text-muted md:mt-12 md:text-[11px]"
        >
          {t('trustLine')}
        </motion.p>
      </motion.div>
    </section>
  );
}