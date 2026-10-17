'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import {
  ChevronDown,
  Phone,
  MapPin,
  MessageCircle,
  ArrowUpRight,
  FileText,
  Heart,
  Plus,
  Minus,
} from 'lucide-react';

/* ---------------- Official Contact ---------------- */
const PHONE_DISPLAY = '+973 6631 6733';
const PHONE_TEL     = 'tel:+97366316733';
const WHATSAPP_URL  = 'https://wa.me/97366316733';
const MAPS_URL      =
  'https://maps.google.com/?q=Flat+13+Building+1435+Road+504+Block+205+Muharraq+Bahrain';

/* ---------------- Footer Sections ---------------- */
const SECTIONS = [
  {
    key: 'company',
    links: [
      { key: 'about',    href: '/about'    },
      { key: 'work',     href: '/work'     },
      { key: 'services', href: '/services' },
      { key: 'contact',  href: '/contact'  },
    ],
  },
  {
    key: 'services',
    links: [
      { key: 'marketing', href: '/services#marketing' },
      { key: 'video',     href: '/services#video'     },
      { key: 'branding',  href: '/services#branding'  },
      { key: 'web',       href: '/services#web'       },
    ],
  },
] as const;

export function Footer() {
  const t = useTranslations('Footer');
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-20 overflow-hidden bg-background md:mt-24">
      {/* Top brand glow line */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-500/60 to-transparent"
      />

      {/* Ambient orange glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[700px] -translate-x-1/2 rounded-full bg-brand-500/10 blur-[120px]"
      />

      <div className="relative mx-auto max-w-7xl px-4 md:px-8">

        {/* ============================================================
            TIER 1 — BRAND + CTA
           ============================================================ */}
        <div className="grid gap-10 py-14 md:grid-cols-12 md:gap-12 md:py-16">

          {/* ---------- Brand ---------- */}
          <div className="md:col-span-7">
            <Link
              href="/"
              aria-label="Buzzly Publicity — Home"
              className="group inline-flex items-center gap-3"
            >
              <span className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl transition-transform duration-300 ease-out group-hover:scale-[1.06]">
                <Image
                  src="/buzzly 2.jpeg"
                  alt="Buzzly Publicity"
                  width={44}
                  height={44}
                  className="h-full w-full object-contain"
                />
              </span>
              <span className="font-display text-xl font-black tracking-tight text-foreground">
                BUZZLY PUBLICITY<span className="text-brand-500">.</span>
              </span>
            </Link>

            <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-muted md:mt-6 md:text-base">
              {t('tagline')}
            </p>
          </div>

          {/* ---------- CTA Card (skeuomorphic) ---------- */}
          <div className="md:col-span-5">
            <div className="skeu-panel skeu-panel-hover relative overflow-hidden rounded-3xl p-6 md:p-7">

              {/* Inner glows */}
              <div
                aria-hidden
                className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-brand-500/20 blur-3xl"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-accent-500/10 blur-3xl"
              />

              <h3 className="relative font-display text-lg font-bold text-foreground md:text-xl">
                {t('cta.title')}
              </h3>
              <p className="relative mt-2 text-[13px] leading-relaxed text-muted md:text-sm">
                {t('cta.subtitle')}
              </p>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="skeu-btn group relative mt-5 inline-flex items-center gap-2 overflow-hidden rounded-full px-5 py-2.5 text-[13px] font-bold md:text-sm"
              >
                {/* Shine sweep */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-[600ms] ease-out group-hover:translate-x-[300%]"
                />

                <MessageCircle
                  className="relative h-4 w-4"
                  strokeWidth={2.5}
                />
                <span className="relative">{t('cta.button')}</span>
                <ArrowUpRight
                  className="relative h-3.5 w-3.5 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 flip-rtl"
                  strokeWidth={2.75}
                />
              </a>
            </div>
          </div>
        </div>

        {/* ============================================================
            TIER 2 — LINKS + CONTACT
           ============================================================ */}
        <div className="grid gap-0 border-t border-border/50 py-12 md:grid-cols-12 md:gap-10">

          {/* Column 1 — Company */}
          <div className="md:col-span-3">
            <CollapsibleSection title={t('sections.company.title')}>
              <LinkList
                namespace="sections.company.links"
                links={SECTIONS[0].links}
                t={t}
              />
            </CollapsibleSection>
          </div>

          {/* Column 2 — Services */}
          <div className="md:col-span-3">
            <CollapsibleSection title={t('sections.services.title')}>
              <LinkList
                namespace="sections.services.links"
                links={SECTIONS[1].links}
                t={t}
              />
            </CollapsibleSection>
          </div>

          {/* Column 3 — Contact */}
          <div className="md:col-span-6">
            <CollapsibleSection title={t('contact.title')}>
              <ul className="space-y-4">
                <ContactItem
                  icon={Phone}
                  label={t('contact.phone')}
                  value={PHONE_DISPLAY}
                  href={PHONE_TEL}
                />
                <ContactItem
                  icon={MessageCircle}
                  label={t('contact.whatsapp')}
                  value={PHONE_DISPLAY}
                  href={WHATSAPP_URL}
                />
                <ContactItem
                  icon={MapPin}
                  label={t('contact.address')}
                  value={t('contact.addressValue')}
                  href={MAPS_URL}
                  expandable
                />
                <ContactItem
                  icon={FileText}
                  label={t('contact.crNumber')}
                  value={t('contact.crNumberValue')}
                />
              </ul>
            </CollapsibleSection>
          </div>
        </div>

        {/* ============================================================
            TIER 3 — BOTTOM BAR
           ============================================================ */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-border/50 py-6 md:flex-row md:py-7">
          
          {/* Left — Copyright */}
          <p className="text-center text-[11px] text-muted md:text-start md:text-xs">
            © {year}{' '}
            <span className="font-semibold text-foreground/85">
              {t('companyLegalName')}
            </span>
            . {t('rights')}
          </p>

          {/* Center — Legal Links */}
          <div className="flex items-center gap-4 text-[11px] font-semibold text-muted md:text-xs">
            <Link 
              href="/privacy" 
              className="transition-colors duration-200 hover:text-brand-500"
            >
              {t('privacy')}
            </Link>
            <span className="h-3 w-px bg-border/60" />
            <Link 
              href="/terms" 
              className="transition-colors duration-200 hover:text-brand-500"
            >
              {t('terms')}
            </Link>
          </div>

          {/* Right — Made In */}
          <div className="flex items-center gap-1.5 text-[11px] text-muted md:text-xs">
            <span>{t('madeIn')}</span>
            <Heart
              className="h-3 w-3 fill-brand-500 text-brand-500 animate-pulse"
              strokeWidth={0}
            />
            <span>{t('country')}</span>
          </div>
        </div>

        {/* Mobile bottom tab spacer */}
        <div className="h-20 md:h-0" />
      </div>
    </footer>
  );
}

/* ============================================================
   Link List
   ============================================================ */
function LinkList({
  namespace,
  links,
  t,
}: {
  namespace: string;
  links: readonly { key: string; href: string }[];
  t: ReturnType<typeof useTranslations>;
}) {
  return (
    <ul className="space-y-3">
      {links.map((link) => (
        <li key={link.key}>
          <Link
            href={link.href}
            className="group inline-flex items-center gap-1.5 text-[13px] text-muted transition-colors duration-200 ease-out hover:text-brand-500 md:text-sm"
          >
            <span className="relative">
              {t(`${namespace}.${link.key}` as any)}
              <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-brand-500 transition-all duration-300 ease-out group-hover:w-full" />
            </span>
            <ArrowUpRight
              className="h-3 w-3 -translate-x-1 opacity-0 transition-all duration-200 ease-out group-hover:translate-x-0 group-hover:opacity-100 flip-rtl"
              strokeWidth={2.5}
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}

/* ============================================================
   Collapsible Section
   ============================================================ */
function CollapsibleSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-border/40 md:border-none">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between py-3.5 text-start md:cursor-default md:py-0 md:pb-4"
      >
        <h3 className="font-display text-[11px] font-bold uppercase tracking-[0.15em] text-foreground/90 md:text-xs">
          {title}
        </h3>
        <ChevronDown
          className={`h-4 w-4 text-muted transition-transform duration-300 ease-out md:hidden ${
            open ? 'rotate-180' : ''
          }`}
          strokeWidth={2.5}
        />
      </button>

      <div
        className={`grid overflow-hidden transition-all duration-400 ease-out md:grid-rows-[1fr] ${
          open
            ? 'grid-rows-[1fr] pb-5 opacity-100'
            : 'grid-rows-[0fr] opacity-0 md:pb-0 md:opacity-100'
        }`}
      >
        <div className="min-h-0">{children}</div>
      </div>
    </div>
  );
}

/* ============================================================
   Contact Item
   ============================================================ */
function ContactItem({
  icon: Icon,
  label,
  value,
  href,
  expandable = false,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  value: string;
  href?: string;
  expandable?: boolean;
}) {
  const [expanded, setExpanded] = useState(false);

  const inner = (
    <>
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-500/10 text-brand-500 transition-colors duration-200 ease-out group-hover:bg-brand-500 group-hover:text-white md:h-9 md:w-9 md:rounded-xl">
        <Icon className="h-3.5 w-3.5 md:h-4 md:w-4" strokeWidth={2.25} />
      </span>

      <span className="min-w-0 flex-1">
        <span className="block text-[9px] font-bold uppercase tracking-[0.15em] text-muted md:text-[10px]">
          {label}
        </span>
        <span
          className={`mt-0.5 block text-[13px] font-medium leading-relaxed text-foreground transition-colors duration-200 group-hover:text-brand-500 md:text-sm ${
            expandable && !expanded ? 'line-clamp-1' : ''
          }`}
        >
          {value}
        </span>

        {/* Show more/less */}
        {expandable && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setExpanded((v) => !v);
            }}
            className="mt-1.5 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-brand-500 transition-colors duration-200 hover:text-brand-600 md:text-[11px]"
          >
            {expanded ? (
              <>
                <Minus className="h-3 w-3" strokeWidth={2.75} />
                <span>Show less</span>
              </>
            ) : (
              <>
                <Plus className="h-3 w-3" strokeWidth={2.75} />
                <span>Show more</span>
              </>
            )}
          </button>
        )}
      </span>
    </>
  );

  const base =
    'group flex items-start gap-3 rounded-xl p-1 transition-colors duration-200';

  return (
    <li>
      {href ? (
        <a
          href={href}
          target={href.startsWith('http') ? '_blank' : undefined}
          rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
          className={base}
        >
          {inner}
        </a>
      ) : (
        <div className={base}>{inner}</div>
      )}
    </li>
  );
}