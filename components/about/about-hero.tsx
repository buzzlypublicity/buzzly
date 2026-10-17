'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { motion, type Variants } from 'framer-motion';
import {
  Play,
  Megaphone,
  Share2,
  Palette,
  PenTool,
  Users,
  Target,
  Video,
  Code,
  Sparkles,
} from 'lucide-react';

/* ============================================================
   8 SERVICES — order matters for visual rhythm
   ============================================================ */
const SERVICES = [
  { key: 'pr',         number: '01', icon: Megaphone, accent: 'brand'  as const },
  { key: 'social',     number: '02', icon: Share2,    accent: 'accent' as const },
  { key: 'brand',      number: '03', icon: Palette,   accent: 'brand'  as const },
  { key: 'content',    number: '04', icon: PenTool,   accent: 'accent' as const },
  { key: 'influencer', number: '05', icon: Users,     accent: 'accent' as const },
  { key: 'ads',        number: '06', icon: Target,    accent: 'brand'  as const },
  { key: 'video',      number: '07', icon: Video,     accent: 'brand'  as const },
  { key: 'web',        number: '08', icon: Code,      accent: 'accent' as const },
];

/* ============================================================
   ANIMATIONS
   ============================================================ */
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.08 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.94 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      delay: 0.2 + i * 0.05,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

/* ============================================================
   MAIN COMPONENT
   ============================================================ */
export function AboutHero() {
  const t = useTranslations('AboutHero');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const sectors = [
    t('sectors.0'),
    t('sectors.1'),
    t('sectors.2'),
    t('sectors.3'),
    t('sectors.4'),
    t('sectors.5'),
  ];

  return (
    <section
      id="about-hero"
      className="relative overflow-hidden bg-background pt-12 pb-14 md:pt-16 md:pb-18 lg:pt-20 lg:pb-20"
    >
      {/* Orbs */}
      <div className="pointer-events-none absolute -left-40 top-20 h-[380px] w-[380px] rounded-full orb-brand blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-20 h-[380px] w-[380px] rounded-full orb-teal blur-3xl" />

      {/* Grid pattern */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 text-foreground opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage:
            'radial-gradient(ellipse 80% 60% at 50% 40%, black 30%, transparent 85%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 80% 60% at 50% 40%, black 30%, transparent 85%)',
        }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative mx-auto max-w-7xl px-5 md:px-8"
      >
        {/* ============================================================
            TOP — HEADLINE
           ============================================================ */}
        <div className="mx-auto max-w-3xl text-center">

          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-2"
          >
            <Sparkles className="h-3.5 w-3.5 text-brand-500" strokeWidth={2.5} />
            <span className="font-display text-[10px] font-bold uppercase tracking-[0.3em] text-brand-500 md:text-[11px]">
              {t('eyebrow')}
            </span>
            <Sparkles className="h-3.5 w-3.5 text-brand-500" strokeWidth={2.5} />
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="mt-4 font-display text-[clamp(2.25rem,6.5vw,4.5rem)] font-black leading-[1.02] tracking-[-0.04em] text-foreground md:mt-5"
          >
            {t('headline.part1')}
            <span className="text-gradient-animated">
              {t('headline.highlight')}
            </span>
            <span className="text-brand-500">.</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mx-auto mt-4 max-w-xl text-[13.5px] leading-relaxed text-muted md:mt-5 md:text-[15px]"
          >
            {t('subtitle')}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-6 flex justify-center md:mt-7"
          >
            <Link
              href="#who-we-are"
              className="group inline-flex items-center gap-2.5 rounded-full bg-foreground px-5 py-2.5 text-[12.5px] font-bold text-background transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] md:px-6 md:py-3 md:text-sm"
              style={{
                boxShadow: '0 8px 24px -6px rgba(0,0,0,0.25)',
              }}
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-background/15">
                <Play
                  className={`h-2.5 w-2.5 fill-background text-background ${
                    isRTL ? 'rotate-180' : ''
                  }`}
                  strokeWidth={2.5}
                />
              </span>
              {t('cta')}
            </Link>
          </motion.div>
        </div>

        {/* ============================================================
            MARQUEE STRIP — Services names scrolling
           ============================================================ */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="relative mt-10 overflow-hidden md:mt-14"
        >
          {/* Edge fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent md:w-24" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent md:w-24" />

          <div className="border-y border-border/50 py-3 md:py-4">
            <motion.div
              className="flex shrink-0 items-center gap-6 whitespace-nowrap md:gap-10"
              animate={{
                x: isRTL ? ['-50%', '0%'] : ['0%', '-50%'],
              }}
              transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
            >
              {[...SERVICES, ...SERVICES].map((service, i) => {
                const Icon = service.icon;
                const isBrand = service.accent === 'brand';
                return (
                  <div
                    key={i}
                    className="flex items-center gap-6 md:gap-10"
                    aria-hidden={i >= SERVICES.length}
                  >
                    <div className="flex items-center gap-2.5 md:gap-3">
                      <Icon
                        className={`h-3.5 w-3.5 md:h-4 md:w-4 ${
                          isBrand ? 'text-brand-500' : 'text-accent-500'
                        }`}
                        strokeWidth={2.25}
                      />
                      <span className="font-display text-[11px] font-bold uppercase tracking-[0.2em] text-foreground/70 md:text-[12px]">
                        {t(`services.${service.key}.name`)}
                      </span>
                    </div>
                    <span className="h-1 w-1 rounded-full bg-brand-500/60 md:h-1.5 md:w-1.5" />
                  </div>
                );
              })}
            </motion.div>
          </div>
        </motion.div>

        {/* ============================================================
            SERVICES GRID — 4×2 desktop, 2×4 mobile
           ============================================================ */}
        <div className="mt-10 md:mt-14">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4 lg:gap-5">
            {SERVICES.map((service, i) => (
              <ServiceCard
                key={service.key}
                data={service}
                index={i}
                t={t}
              />
            ))}
          </div>
        </div>

        {/* ============================================================
            SECTORS BAR
           ============================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-12 md:mt-16"
        >
          <div className="flex flex-col items-center gap-3 md:flex-row md:justify-center md:gap-6">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted md:text-[11px]">
              {t('sectorsLabel')}
            </span>

            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 md:gap-x-5">
              {sectors.map((sector, i) => (
                <span
                  key={i}
                  className="relative text-[11px] font-bold uppercase tracking-[0.2em] text-foreground/50 transition-colors duration-300 hover:text-brand-500 md:text-[12px]"
                >
                  {sector}
                  {i < sectors.length - 1 && (
                    <span className="absolute -end-2 top-1/2 -translate-y-1/2 text-muted/40 md:-end-3">
                      ·
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ============================================================
   SERVICE CARD — with number, icon, name, description
   ============================================================ */
function ServiceCard({
  data,
  index,
  t,
}: {
  data: {
    key: string;
    number: string;
    icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
    accent: 'brand' | 'accent';
  };
  index: number;
  t: ReturnType<typeof useTranslations>;
}) {
  const { key, number, icon: Icon, accent } = data;
  const isBrand = accent === 'brand';

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className={`group relative flex aspect-[4/3] flex-col justify-between overflow-hidden rounded-2xl border p-3.5 transition-all duration-300 md:aspect-auto md:min-h-[152px] md:rounded-3xl md:p-4 lg:p-5 ${
        isBrand
          ? 'border-brand-500/[0.12] bg-brand-500/[0.04] hover:border-brand-500/30 hover:bg-brand-500/[0.08]'
          : 'border-accent-500/[0.12] bg-accent-500/[0.04] hover:border-accent-500/30 hover:bg-accent-500/[0.08]'
      } dark:border-white/[0.06]`}
      style={{
        boxShadow:
          '0 1px 0 rgba(255,255,255,0.5) inset, 0 4px 12px -6px rgba(0,0,0,0.04)',
      }}
    >
      {/* Corner glow */}
      <div
        aria-hidden
        className={`pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full opacity-60 blur-2xl transition-opacity duration-300 group-hover:opacity-100 ${
          isBrand ? 'bg-brand-500/25' : 'bg-accent-500/25'
        }`}
      />

      {/* Top row — number + icon */}
      <div className="relative flex items-start justify-between gap-2">
        <span
          className={`font-display text-[10px] font-bold tracking-[0.25em] transition-colors duration-300 md:text-[11px] ${
            isBrand
              ? 'text-brand-500/50 group-hover:text-brand-500'
              : 'text-accent-500/50 group-hover:text-accent-500'
          }`}
        >
          {number}
        </span>

        <span
          className={`flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-300 md:h-9 md:w-9 ${
            isBrand
              ? 'bg-brand-500/12 text-brand-500 group-hover:bg-brand-500 group-hover:text-white'
              : 'bg-accent-500/12 text-accent-500 group-hover:bg-accent-500 group-hover:text-white'
          }`}
        >
          <Icon
            className="h-3.5 w-3.5 md:h-4 md:w-4"
            strokeWidth={2.25}
          />
        </span>
      </div>

      {/* Text block */}
      <div className="relative mt-3">
        <p
          className={`font-display font-black leading-[1.15] tracking-tight text-foreground text-[12px] md:text-[13.5px] lg:text-[14.5px]`}
        >
          {t(`services.${key}.name`)}
        </p>
        <p
          className={`mt-1 line-clamp-2 leading-snug text-muted text-[10px] md:text-[11px] lg:text-[11.5px]`}
        >
          {t(`services.${key}.description`)}
        </p>
      </div>

      {/* Bottom accent bar */}
      <div
        className={`relative mt-3 h-[3px] w-0 rounded-full transition-all duration-500 ease-out group-hover:w-10 ${
          isBrand ? 'bg-brand-500' : 'bg-accent-500'
        }`}
      />
    </motion.div>
  );
}