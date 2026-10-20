'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Download, X, Smartphone } from 'lucide-react';

export function PWAInstallPrompt() {
  const t = useTranslations('PWAInstall');
  const [showPrompt, setShowPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // 1. Already installed? Don't show
    if (window.matchMedia('(display-mode: standalone)').matches) return;

    // 2. Dismissed in last 3 days? Don't show
    const dismissed = localStorage.getItem('pwa-install-dismissed');
    if (dismissed) {
      const hoursSince = (Date.now() - parseInt(dismissed)) / (1000 * 60 * 60);
      if (hoursSince < 72) return;
    }

    // 3. iOS detection
    const ios = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(ios);

    // 4. Android/Desktop — check deferredPrompt
    if ((window as any).deferredPrompt) {
      setDeferredPrompt((window as any).deferredPrompt);
      const timer = setTimeout(() => setShowPrompt(true), 3000);
      return () => clearTimeout(timer);
    }

    // 5. Listen for custom event from global script
    const handler = () => {
      setDeferredPrompt((window as any).deferredPrompt);
      setTimeout(() => setShowPrompt(true), 3000);
    };

    window.addEventListener('pwa-installable', handler);

    // 6. iOS pe manual show (native prompt nahi hota)
    if (ios) {
      const timer = setTimeout(() => setShowPrompt(true), 3000);
      return () => {
        clearTimeout(timer);
        window.removeEventListener('pwa-installable', handler);
      };
    }

    return () => window.removeEventListener('pwa-installable', handler);
  }, []);

  const handleInstall = async () => {
    const prompt = deferredPrompt || (window as any).deferredPrompt;

    if (prompt) {
      prompt.prompt();
      const { outcome } = await prompt.userChoice;
      (window as any).deferredPrompt = null;
      if (outcome === 'accepted') {
        setShowPrompt(false);
      }
    } else if (isIOS) {
      alert(t('iosInstructions'));
    } else {
      alert(t('browserInstructions'));
    }
  };

  const handleDismiss = () => {
    localStorage.setItem('pwa-install-dismissed', Date.now().toString());
    setShowPrompt(false);
  };

  return (
    <AnimatePresence>
      {showPrompt && (
        <motion.div
          initial={{ y: -120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -120, opacity: 0 }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 30,
            mass: 0.8,
          }}
          className="fixed inset-x-0 top-0 z-[9999] px-3 pt-3 md:px-4 md:pt-4"
          style={{
            paddingTop: 'max(0.75rem, env(safe-area-inset-top))',
          }}
        >
          <div
            className="relative mx-auto max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-ink-950/95 shadow-2xl backdrop-blur-xl"
            style={{
              boxShadow:
                '0 20px 40px -12px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05) inset',
            }}
          >
            {/* Brand Glow Line Top */}
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-brand-500 to-transparent"
            />

            {/* Corner glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-brand-500/30 blur-3xl"
            />

            {/* Content */}
            <div className="relative flex items-center gap-3 p-3 md:gap-4 md:p-4">

              {/* App Icon */}
              <div className="relative shrink-0">
                <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/5 md:h-12 md:w-12">
                  <Image
                    src="/buzzly 2.jpeg"
                    alt="BUZZLY"
                    width={48}
                    height={48}
                    className="h-full w-full object-contain p-1"
                  />
                </div>
                {/* Small badge */}
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand-500 ring-2 ring-ink-950">
                  <Download className="h-2 w-2 text-white" strokeWidth={3} />
                </span>
              </div>

              {/* Text */}
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-brand-500">
                  {t('badge')}
                </p>
                <h3 className="mt-0.5 truncate font-display text-[13px] font-black leading-tight text-white md:text-sm">
                  {t('title')}
                </h3>
                <p className="mt-0.5 hidden truncate text-[11px] text-white/60 sm:block">
                  {t('subtitle')}
                </p>
              </div>

              {/* Install Button */}
              <button
                onClick={handleInstall}
                className="group relative shrink-0 overflow-hidden rounded-full bg-brand-500 px-4 py-2 text-[11px] font-bold text-white shadow-lg shadow-brand-500/30 transition-all duration-200 hover:bg-brand-600 hover:shadow-xl hover:shadow-brand-500/50 active:scale-95 md:px-5 md:py-2.5 md:text-[12px]"
              >
                {/* Shine sweep */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-[300%]"
                />

                <span className="relative flex items-center gap-1.5">
                  <Download className="h-3 w-3" strokeWidth={2.5} />
                  <span className="hidden sm:inline">{t('install')}</span>
                  <span className="sm:hidden">{t('installShort')}</span>
                </span>
              </button>

              {/* Close Button */}
              <button
                onClick={handleDismiss}
                aria-label="Dismiss"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white/50 transition-all duration-200 hover:bg-white/10 hover:text-white active:scale-90"
              >
                <X className="h-4 w-4" strokeWidth={2.5} />
              </button>
            </div>

            {/* Bottom Progress Bar (subtle) */}
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 15, ease: 'linear' }}
              className="h-[2px] bg-gradient-to-r from-brand-500/60 to-accent-500/60"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}