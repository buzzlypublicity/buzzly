'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { LanguageSwitcher } from '@/components/language-switcher';
import { ThemeToggle } from '@/components/theme-toggle';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  Sparkles,
  Briefcase,
  Users,
  Mail,
  PhoneCall,
  ArrowUpRight,
  Coins,
  MoreHorizontal,
  X,
} from 'lucide-react';

const NAV_ITEMS = [
  { key: 'home',     href: '/',         icon: Home },
  { key: 'about',    href: '/about',    icon: Users },
  { key: 'services', href: '/services', icon: Sparkles },
  { key: 'work',     href: '/work',     icon: Briefcase },
  { key: 'pricing',  href: '/pricing',  icon: Coins },
  { key: 'contact',  href: '/contact',  icon: Mail },
] as const;

// 4 primary items for mobile bottom bar
const MOBILE_PRIMARY_KEYS = ['home', 'services', 'work', 'contact'];
// Remaining items for "More" popup
const MOBILE_MORE_KEYS = ['about', 'pricing'];

export function Navbar() {
  const t = useTranslations('Nav');
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  // Close More menu on route change
  useEffect(() => {
    setMoreOpen(false);
  }, [pathname]);

  // Prevent body scroll when more menu open
  useEffect(() => {
    if (moreOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [moreOpen]);

  /* ---- scroll → navbar elevated ---- */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  // Split items
  const primaryItems = NAV_ITEMS.filter((item) =>
    MOBILE_PRIMARY_KEYS.includes(item.key)
  );
  const moreItems = NAV_ITEMS.filter((item) =>
    MOBILE_MORE_KEYS.includes(item.key)
  );

  // Check if any "more" item is active
  const hasMoreActive = moreItems.some((item) => isActive(item.href));

  return (
    <>
      {/* ============================================================
          TOP NAVBAR (Desktop)
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
          {/* ---------- LOGO ---------- */}
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
              BUZZLY PUBLICITY<span className="text-brand-500">.</span>
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

            {/* Book Call CTA */}
            <Link
              href="/contact"
              className="skeu-btn group relative ms-1 hidden items-center gap-2 overflow-hidden rounded-full px-4.5 py-2 text-[13px] font-bold transition-all duration-150 md:inline-flex"
              style={{
                paddingInline: '1.125rem',
                paddingBlock: '0.5rem',
              }}
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-[600ms] ease-out group-hover:translate-x-[300%]"
              />
              <PhoneCall className="relative h-3.5 w-3.5" strokeWidth={2.5} />
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
          MOBILE BOTTOM TAB BAR (4 + More)
         ============================================================ */}
      <nav className="fixed inset-x-0 bottom-0 z-50 md:hidden">
        
        {/* ---------- BACKDROP ---------- */}
        <AnimatePresence>
          {moreOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMoreOpen(false)}
              className="fixed inset-0 -z-10 bg-black/40 backdrop-blur-sm"
            />
          )}
        </AnimatePresence>

        {/* ---------- MORE POPUP (Bottom Sheet) ---------- */}
        <AnimatePresence>
          {moreOpen && (
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="absolute inset-x-3 bottom-full mb-3 overflow-hidden rounded-3xl border border-border/50 bg-background p-4"
              style={{
                boxShadow:
                  '0 -12px 48px -8px rgba(0, 0, 0, 0.25), 0 8px 24px -6px rgba(0, 0, 0, 0.15)',
              }}
            >
              {/* Header */}
              <div className="mb-3 flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted">
                  {t('more')}
                </span>
                <button
                  onClick={() => setMoreOpen(false)}
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-foreground/5 text-muted transition-colors hover:bg-foreground/10 hover:text-foreground"
                  aria-label="Close"
                >
                  <X className="h-3.5 w-3.5" strokeWidth={2.5} />
                </button>
              </div>

              {/* Items */}
              <div className="grid grid-cols-2 gap-2.5">
                {moreItems.map((item) => {
                  const active = isActive(item.href);
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.key}
                      href={item.href}
                      onClick={() => setMoreOpen(false)}
                      className={`group flex flex-col items-center justify-center gap-2 rounded-2xl border p-4 transition-all duration-300 ${
                        active
                          ? 'border-brand-500 bg-brand-500/10 text-brand-500'
                          : 'border-border/60 bg-card text-foreground hover:border-brand-500/40 hover:bg-brand-500/[0.04]'
                      }`}
                    >
                      <span
                        className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors ${
                          active
                            ? 'bg-brand-500 text-white'
                            : 'bg-brand-500/10 text-brand-500 group-hover:bg-brand-500 group-hover:text-white'
                        }`}
                      >
                        <Icon className="h-5 w-5" strokeWidth={2.25} />
                      </span>
                      <span className="text-[12px] font-bold">{t(item.key)}</span>
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ---------- MAIN TAB BAR ---------- */}
        <div
          className="relative bg-background/85 backdrop-blur-2xl"
          style={{
            borderTop: '1px solid var(--skeu-bevel-top)',
            boxShadow:
              '0 -1px 0 var(--skeu-bevel-top) inset, 0 1px 0 var(--skeu-bevel-bottom) inset, 0 -6px 20px -8px var(--skeu-drop-1)',
          }}
        >
          <div className="grid grid-cols-5">
            {/* 4 Primary Items */}
            {primaryItems.map((item) => {
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

            {/* More Button (5th slot) */}
            <button
              onClick={() => setMoreOpen((v) => !v)}
              aria-label={t('more')}
              className={`group relative flex flex-col items-center justify-center gap-1 py-2.5 transition-colors duration-200 ease-out ${
                hasMoreActive || moreOpen
                  ? 'text-brand-500'
                  : 'text-foreground/60 active:text-foreground'
              }`}
            >
              {/* Top glow line (active) */}
              <span
                aria-hidden
                className={`pointer-events-none absolute -top-px left-1/2 h-[2px] -translate-x-1/2 rounded-full bg-brand-500 transition-all duration-300 ease-out ${
                  hasMoreActive || moreOpen ? 'w-9 opacity-100' : 'w-0 opacity-0'
                }`}
                style={{
                  boxShadow:
                    hasMoreActive || moreOpen
                      ? '0 0 14px var(--color-brand-500)'
                      : 'none',
                }}
              />

              {/* Soft glow bg */}
              <span
                aria-hidden
                className={`pointer-events-none absolute inset-x-3 inset-y-1 rounded-2xl transition-opacity duration-300 ease-out ${
                  hasMoreActive || moreOpen ? 'opacity-100' : 'opacity-0'
                }`}
                style={{
                  background:
                    'radial-gradient(circle at 50% 40%, rgba(233,122,0,0.14), transparent 70%)',
                }}
              />

              <MoreHorizontal
                className={`relative h-[18px] w-[18px] transition-transform duration-200 ease-out ${
                  moreOpen ? 'rotate-90' : ''
                } ${
                  hasMoreActive || moreOpen ? 'scale-[1.08]' : 'group-active:scale-90'
                }`}
                strokeWidth={hasMoreActive || moreOpen ? 2.5 : 1.8}
              />

              <span
                className={`relative text-[10px] font-semibold leading-none transition-opacity duration-200 ${
                  hasMoreActive || moreOpen ? 'opacity-100' : 'opacity-70'
                }`}
              >
                {t('more')}
              </span>
            </button>
          </div>

          {/* iOS safe area */}
          <div className="h-[env(safe-area-inset-bottom)]" />
        </div>
      </nav>
    </>
  );
}