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

  /* ---- scroll → navbar elevated ---- */
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
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-out ${
          scrolled ? 'bg-background/70 backdrop-blur-2xl' : 'bg-transparent'
        }`}
        style={{
          boxShadow: scrolled
            ? '0 1px 0 var(--skeu-bevel-top) inset, 0 -1px 0 var(--skeu-bevel-bottom) inset, 0 4px 12px -4px var(--skeu-drop-1)'
            : 'none',
        }}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 md:h-[72px] md:px-8">

          {/* ---------- LOGO (border-free, clean) ---------- */}
          <Link
            href="/"
            aria-label="Buzzly Publicity — Home"
            className="group flex shrink-0 items-center gap-2.5"
          >
            <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl transition-transform duration-300 ease-out group-hover:scale-[1.06] md:h-10 md:w-10">
              <Image
                src="/buzzly 2.jpeg"
                alt="Buzzly Publicity"
                width={40}
                height={40}
                priority
                className="h-full w-full object-contain"
              />
            </span>
            <span className="hidden font-display text-[15px] font-black tracking-tight sm:block md:text-base">
              BUZZLY PUBLICITY
              <span className="text-brand-500">.</span>
            </span>
          </Link>

          {/* ---------- DESKTOP LINKS ---------- */}
          <nav className="hidden items-center gap-0.5 md:flex">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  className={`group relative rounded-full px-3.5 py-2 text-[13px] font-medium transition-colors duration-200 ease-out ${
                    active
                      ? 'text-brand-500'
                      : 'text-foreground/70 hover:text-foreground'
                  }`}
                >
                  <span className="relative z-10">{t(item.key)}</span>

                  {/* Soft pill bg on hover */}
                  <span className="pointer-events-none absolute inset-0 rounded-full bg-brand-500/0 transition-colors duration-200 group-hover:bg-brand-500/[0.07]" />

                  {/* Animated underline */}
                  <span
                    className={`pointer-events-none absolute bottom-1 left-1/2 h-[2px] -translate-x-1/2 rounded-full bg-brand-500 transition-all duration-300 ease-out ${
                      active
                        ? 'w-5 opacity-100'
                        : 'w-0 opacity-0 group-hover:w-3.5 group-hover:opacity-60'
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

            {/* ---------- BOOK CALL CTA (skeuomorphic) ---------- */}
            <Link
              href="/contact"
              className="skeu-btn group relative ms-1 hidden items-center gap-2 overflow-hidden rounded-full px-4.5 py-2 text-[13px] font-bold transition-all duration-150 md:inline-flex"
              style={{
                paddingInline: '1.125rem',
                paddingBlock: '0.5rem',
              }}
            >
              {/* Shine sweep */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-[600ms] ease-out group-hover:translate-x-[300%]"
              />

              <PhoneCall
                className="relative h-3.5 w-3.5"
                strokeWidth={2.5}
              />
              <span className="relative">{t('bookCall')}</span>
              <ArrowUpRight
                className="relative h-3 w-3 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={2.75}
              />
            </Link>
          </div>
        </div>
      </header>

      {/* ============================================================
          MOBILE BOTTOM TAB BAR (Skeuomorphic surface)
         ============================================================ */}
      <nav className="fixed inset-x-0 bottom-0 z-50 md:hidden">
        <div
          className="relative bg-background/85 backdrop-blur-2xl"
          style={{
            borderTop: '1px solid var(--skeu-bevel-top)',
            boxShadow:
              '0 -1px 0 var(--skeu-bevel-top) inset, 0 1px 0 var(--skeu-bevel-bottom) inset, 0 -6px 20px -8px var(--skeu-drop-1)',
          }}
        >
          <div className="grid grid-cols-5">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  aria-label={t(item.key)}
                  className={`group relative flex flex-col items-center justify-center gap-1 py-2.5 transition-colors duration-200 ease-out ${
                    active
                      ? 'text-brand-500'
                      : 'text-foreground/60 active:text-foreground'
                  }`}
                >
                  {/* Top glow line (active) */}
                  <span
                    aria-hidden
                    className={`pointer-events-none absolute -top-px left-1/2 h-[2px] -translate-x-1/2 rounded-full bg-brand-500 transition-all duration-300 ease-out ${
                      active ? 'w-9 opacity-100' : 'w-0 opacity-0'
                    }`}
                    style={{
                      boxShadow: active
                        ? '0 0 14px var(--color-brand-500)'
                        : 'none',
                    }}
                  />

                  {/* Soft glow bg (active) */}
                  <span
                    aria-hidden
                    className={`pointer-events-none absolute inset-x-3 inset-y-1 rounded-2xl transition-opacity duration-300 ease-out ${
                      active ? 'opacity-100' : 'opacity-0'
                    }`}
                    style={{
                      background:
                        'radial-gradient(circle at 50% 40%, rgba(233,122,0,0.14), transparent 70%)',
                    }}
                  />

                  <Icon
                    className={`relative h-[18px] w-[18px] transition-transform duration-200 ease-out ${
                      active ? 'scale-[1.08]' : 'group-active:scale-90'
                    }`}
                    strokeWidth={active ? 2.5 : 1.8}
                  />

                  <span
                    className={`relative text-[10px] font-semibold leading-none transition-opacity duration-200 ${
                      active ? 'opacity-100' : 'opacity-70'
                    }`}
                  >
                    {t(item.key)}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* iOS safe area */}
          <div className="h-[env(safe-area-inset-bottom)]" />
        </div>
      </nav>
    </>
  );
}