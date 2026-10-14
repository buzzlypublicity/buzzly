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
    <footer className="relative mt-24 overflow-hidden bg-background">
      {/* Top brand glow line */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-500/60 to-transparent" />

      {/* Ambient orange glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[700px] -translate-x-1/2 rounded-full bg-brand-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 md:px-8">

        {/* ============================================================
            TIER 1 — BRAND SHOWCASE + CTA
           ============================================================ */}
        <div className="grid gap-10 py-16 md:grid-cols-12 md:gap-12 md:py-20">
          {/* ---------- Brand ---------- */}
          <div className="md:col-span-7">
            <Link href="/" className="group inline-flex items-center gap-3">
              <span className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-brand-gradient shadow-lg shadow-brand-500/25 ring-1 ring-white/10 transition-transform duration-500 group-hover:scale-105 group-hover:rotate-3">
                <Image
                  src="/buzzly 2.jpeg"
                  alt="Buzzly"
                  width={48}
                  height={48}
                  className="h-full w-full object-contain p-1.5"
                />
              </span>
              <span className="font-display text-2xl font-black tracking-tight">
                BUZZLY<span className="text-brand-500">.</span>
              </span>
            </Link>

            <p className="mt-6 max-w-lg text-base leading-relaxed text-muted md:text-lg">
              {t('tagline')}
            </p>
          </div>

          {/* ---------- CTA Card ---------- */}
          <div className="md:col-span-5">
            <div className="relative overflow-hidden rounded-3xl bg-card p-6 shadow-sm ring-1 ring-border/50 transition-all duration-500 hover:shadow-xl hover:shadow-brand-500/10 md:p-7">
              {/* Inner glow */}
              <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-brand-500/20 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-accent-500/10 blur-3xl" />

              <h3 className="relative font-display text-lg font-bold md:text-xl">
                {t('cta.title')}
              </h3>
              <p className="relative mt-2 text-sm leading-relaxed text-muted">
                {t('cta.subtitle')}
              </p>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative mt-6 inline-flex items-center gap-2 overflow-hidden rounded-full bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-500/25 transition-all duration-300 hover:bg-brand-600 hover:shadow-xl hover:shadow-brand-500/50 active:scale-95"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <MessageCircle className="relative h-4 w-4" strokeWidth={2.5} />
                <span className="relative">{t('cta.button')}</span>
                <ArrowUpRight
                  className="relative h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 flip-rtl"
                  strokeWidth={2.5}
                />
              </a>
            </div>
          </div>
        </div>

        {/* ============================================================
            TIER 2 — LINKS + CONTACT GRID
           ============================================================ */}
        <div className="grid gap-0 border-t border-border/50 py-12 md:grid-cols-12 md:gap-10">
          {/* Column 1 — Company */}
          <div className="md:col-span-3">
            <CollapsibleSection title={t('sections.company.title')}>
              <LinkList namespace="sections.company.links" links={SECTIONS[0].links} t={t} />
            </CollapsibleSection>
          </div>

          {/* Column 2 — Services */}
          <div className="md:col-span-3">
            <CollapsibleSection title={t('sections.services.title')}>
              <LinkList namespace="sections.services.links" links={SECTIONS[1].links} t={t} />
            </CollapsibleSection>
          </div>

          {/* Column 3 — Contact (spans wider) */}
          <div className="md:col-span-6">
            <CollapsibleSection title={t('contact.title')}>
              <ul className="space-y-5">
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
        <div className="flex flex-col items-center justify-between gap-4 border-t border-border/50 py-7 md:flex-row">
          <p className="text-center text-xs text-muted md:text-start">
            © {year} <span className="font-medium text-foreground/80">{t('companyLegalName')}</span>. {t('rights')}
          </p>

          <div className="flex items-center gap-1.5 text-xs text-muted">
            <span>{t('madeIn')}</span>
            <Heart className="h-3 w-3 fill-brand-500 text-brand-500 animate-pulse" />
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
   Link List (helper for columns)
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
    <ul className="space-y-3.5">
      {links.map((link) => (
        <li key={link.key}>
          <Link
            href={link.href}
            className="group inline-flex items-center gap-1.5 text-sm text-muted transition-all duration-300 hover:text-brand-500"
          >
            <span className="relative">
              {t(`${namespace}.${link.key}` as any)}
              <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-brand-500 transition-all duration-300 group-hover:w-full" />
            </span>
            <ArrowUpRight
              className="h-3 w-3 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 flip-rtl"
              strokeWidth={2.5}
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}

/* ============================================================
   Collapsible Section (mobile accordion · desktop plain)
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
        className="flex w-full items-center justify-between py-4 text-start md:cursor-default md:py-0 md:pb-5"
      >
        <h3 className="font-display text-xs font-bold uppercase tracking-[0.15em] text-foreground/90">
          {title}
        </h3>
        <ChevronDown
          className={`h-4 w-4 text-muted transition-transform duration-300 md:hidden ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      <div
        className={`grid overflow-hidden transition-all duration-500 ease-out md:grid-rows-[1fr] ${
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
   Contact Item (with expandable address)
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
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-500/10 text-brand-500 transition-colors duration-300 group-hover:bg-brand-500 group-hover:text-white">
        <Icon className="h-4 w-4" strokeWidth={2.25} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[10px] font-semibold uppercase tracking-[0.15em] text-muted">
          {label}
        </span>
        <span
          className={`mt-0.5 block text-sm font-medium leading-relaxed text-foreground transition-colors duration-200 group-hover:text-brand-500 ${
            expandable && !expanded ? 'line-clamp-1' : ''
          }`}
        >
          {value}
        </span>

        {/* Show more/less button */}
        {expandable && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setExpanded((v) => !v);
            }}
            className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-semibold text-brand-500 transition-colors hover:text-brand-600"
          >
            {expanded ? (
              <>
                <Minus className="h-3 w-3" strokeWidth={2.5} />
                <span>Show less</span>
              </>
            ) : (
              <>
                <Plus className="h-3 w-3" strokeWidth={2.5} />
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