'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { LanguageSwitcher } from '@/components/language-switcher';
import { ThemeToggle } from '@/components/theme-toggle';
import {
  Home,
  Sparkles,
  Briefcase,
  Users,
  Mail,
  PhoneCall,
  ArrowUpRight,
} from 'lucide-react';

const NAV_ITEMS = [
  { key: 'home',     href: '/',         icon: Home },
  { key: 'services', href: '/services', icon: Sparkles },
  { key: 'work',     href: '/work',     icon: Briefcase },
  { key: 'about',    href: '/about',    icon: Users },
  { key: 'contact',  href: '/contact',  icon: Mail },
] as const;

export function Navbar() {
  const t = useTranslations('Nav');
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  /* ---- scroll → navbar blur ---- */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <>
      {/* ============================================================
          TOP NAVBAR
         ============================================================ */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-out ${
          scrolled
            ? 'bg-background/70 backdrop-blur-2xl shadow-[0_8px_32px_-12px_rgba(0,0,0,0.08)]'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 md:h-[76px] md:px-8">

          {/* ---------- LOGO ---------- */}
          <Link
            href="/"
            aria-label="Buzzly Home"
            className="group flex shrink-0 items-center gap-3"
          >
            <span className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-2xl bg-brand-gradient shadow-lg shadow-brand-500/25 ring-1 ring-white/10 transition-all duration-500 group-hover:scale-105 group-hover:shadow-xl group-hover:shadow-brand-500/40">
              {/* 👇 apni logo file public/buzzly 2.jpeg me daalo */}
              <Image
                src="/buzzly 2.jpeg"
                alt="Buzzly"
                width={40}
                height={40}
                priority
                className="h-full w-full object-contain p-1.5"
              />
            </span>
            <span className="hidden font-display text-lg font-black tracking-tight sm:block">
              BUZZLY PUBLICITY<span className="text-brand-500">.</span>
            </span>
          </Link>

          {/* ---------- DESKTOP LINKS ---------- */}
          <nav className="hidden items-center gap-1 md:flex">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  className={`group relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                    active
                      ? 'text-brand-500'
                      : 'text-foreground/70 hover:text-foreground'
                  }`}
                >
                  <span className="relative z-10">{t(item.key)}</span>

                  {/* Soft pill bg on hover */}
                  <span className="pointer-events-none absolute inset-0 rounded-full bg-brand-500/0 transition-colors duration-300 group-hover:bg-brand-500/[0.08]" />

                  {/* Animated underline */}
                  <span
                    className={`pointer-events-none absolute bottom-1 left-1/2 h-[2px] -translate-x-1/2 rounded-full bg-brand-500 transition-all duration-500 ease-out ${
                      active
                        ? 'w-6 opacity-100'
                        : 'w-0 opacity-0 group-hover:w-4 group-hover:opacity-60'
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* ---------- RIGHT CONTROLS ---------- */}
          <div className="flex shrink-0 items-center gap-1.5 md:gap-2">
            <LanguageSwitcher />
            <ThemeToggle />

            {/* Book Call CTA */}
            <Link
              href="/contact"
              className="group relative ms-1 hidden items-center gap-2 overflow-hidden rounded-full bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-brand-500/50 active:scale-95 md:inline-flex"
            >
              {/* Shine sweep */}
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

              <PhoneCall className="relative h-4 w-4" strokeWidth={2.5} />
              <span className="relative">{t('bookCall')}</span>
              <ArrowUpRight
                className="relative h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={2.5}
              />
            </Link>
          </div>
        </div>
      </header>

      {/* ============================================================
          MOBILE BOTTOM TAB BAR
         ============================================================ */}
      <nav className="fixed inset-x-0 bottom-0 z-50 md:hidden">
        <div className="relative bg-background/85 backdrop-blur-2xl shadow-[0_-8px_32px_-12px_rgba(0,0,0,0.12)]">
          <div className="grid grid-cols-5">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  aria-label={t(item.key)}
                  className={`group relative flex flex-col items-center justify-center gap-1 py-3 transition-colors duration-300 ${
                    active
                      ? 'text-brand-500'
                      : 'text-foreground/60 active:text-foreground'
                  }`}
                >
                  {/* Top glow dot */}
                  <span
                    className={`pointer-events-none absolute -top-px left-1/2 h-1 -translate-x-1/2 rounded-full bg-brand-500 shadow-[0_0_16px_var(--color-brand-500)] transition-all duration-500 ease-out ${
                      active ? 'w-10 opacity-100' : 'w-0 opacity-0'
                    }`}
                  />

                  {/* Soft glow behind active icon */}
                  <span
                    className={`pointer-events-none absolute inset-x-3 inset-y-1 rounded-2xl bg-brand-500/10 transition-opacity duration-500 ${
                      active ? 'opacity-100' : 'opacity-0'
                    }`}
                  />

                  <Icon
                    className={`relative h-5 w-5 transition-all duration-300 ${
                      active ? 'scale-110' : 'group-active:scale-90'
                    }`}
                    strokeWidth={active ? 2.5 : 1.8}
                  />

                  <span
                    className={`relative text-[10px] font-semibold leading-none transition-all duration-300 ${
                      active ? 'opacity-100' : 'opacity-70'
                    }`}
                  >
                    {t(item.key)}
                  </span>
                </Link>
              );
            })}
          </div>

          <div className="h-[env(safe-area-inset-bottom)]" />
        </div>
      </nav>
    </>
  );
}