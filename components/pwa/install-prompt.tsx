'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Download, X, WifiOff, Zap, Smartphone } from 'lucide-react';

export function PWAInstallPrompt() {
  const t = useTranslations('PWAInstall');
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // 1. Already installed? Don't show
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      return;
    }

    // 2. Dismissed in last 7 days?
    const dismissed = localStorage.getItem('pwa-install-dismissed');
    if (dismissed) {
      const hoursSince = (Date.now() - parseInt(dismissed)) / (1000 * 60 * 60);
      if (hoursSince < 168) return;
    }

    // 3. iOS detection
    const ios = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(ios);

    // 4. iOS pe native prompt nahi hota — manual show karo
    if (ios) {
      const timer = setTimeout(() => setShowPrompt(true), 3000);
      return () => clearTimeout(timer);
    }

    // 5. Android/Desktop — global deferredPrompt check karo
    // Agar event already fire ho chuka hai to foran use karo
    if ((window as any).deferredPrompt) {
      const timer = setTimeout(() => setShowPrompt(true), 3000);
      return () => clearTimeout(timer);
    }

    // 6. Listen for custom event (jab global script fire kare)
    const handler = () => {
      setTimeout(() => setShowPrompt(true), 3000);
    };

    window.addEventListener('pwa-installable', handler);

    return () => {
      window.removeEventListener('pwa-installable', handler);
    };
  }, []);

  // Don't render if already installed
  if (isInstalled) return null;

  const handleInstall = async () => {
    const prompt = (window as any).deferredPrompt;

    if (prompt) {
      prompt.prompt();
      const { outcome } = await prompt.userChoice;
      (window as any).deferredPrompt = null;
      if (outcome === 'accepted') {
        setShowPrompt(false);
      }
    } else if (isIOS) {
      alert('To install: Tap the Share icon → "Add to Home Screen"');
    } else {
      alert('Look for "Install App" in your browser menu (⋮)');
    }
  };

  const handleDismiss = () => {
    localStorage.setItem('pwa-install-dismissed', Date.now().toString());
    setShowPrompt(false);
  };

  return (
    <AnimatePresence>
      {showPrompt && (
        <>
          {/* Backdrop (mobile only) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleDismiss}
            className="fixed inset-0 z-[59] bg-black/40 backdrop-blur-sm md:hidden"
          />

          {/* Prompt */}
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-x-3 bottom-[88px] z-[60] md:inset-x-auto md:bottom-6 md:right-6 md:w-[380px]"
          >
            <div
              className="skeu-panel relative overflow-hidden rounded-3xl p-5 md:p-6"
              style={{
                boxShadow: '0 32px 64px -16px rgba(0,0,0,0.3), 0 8px 20px -6px rgba(0,0,0,0.15)',
              }}
            >
              {/* Corner glow */}
              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-brand-500/25 blur-3xl"
              />

              {/* Close */}
              <button
                onClick={handleDismiss}
                className="absolute end-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-foreground/5 text-muted transition-colors hover:bg-foreground/10 hover:text-foreground"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Content */}
              <div className="relative flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-gradient shadow-lg shadow-brand-500/30">
                  <Download className="h-6 w-6 text-white" strokeWidth={2.5} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-brand-500">
                    {t('badge')}
                  </p>
                  <h3 className="mt-1 font-display text-base font-black leading-tight text-foreground">
                    {t('title')}
                  </h3>
                  <p className="mt-1.5 text-[12.5px] leading-relaxed text-muted">
                    {t('subtitle')}
                  </p>
                </div>
              </div>

              {/* Benefits */}
              <ul className="relative mt-4 space-y-2 border-t border-border/40 pt-4">
                {[
                  { icon: Zap, text: t('benefit1') },
                  { icon: WifiOff, text: t('benefit2') },
                  { icon: Smartphone, text: t('benefit3') },
                ].map((benefit, i) => (
                  <li key={i} className="flex items-center gap-2.5">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-500/12 text-brand-500">
                      <benefit.icon className="h-3 w-3" strokeWidth={2.5} />
                    </span>
                    <span className="text-[12px] font-medium text-foreground/80">
                      {benefit.text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Buttons */}
              <div className="relative mt-5 flex gap-2">
                <button
                  onClick={handleDismiss}
                  className="flex-1 rounded-full border border-border/60 px-4 py-2.5 text-[12px] font-semibold text-muted transition-colors hover:bg-foreground/5 hover:text-foreground"
                >
                  {t('later')}
                </button>
                <button
                  onClick={handleInstall}
                  className="skeu-btn flex flex-[2] items-center justify-center gap-1.5 rounded-full px-4 py-2.5 text-[12px] font-bold"
                >
                  <Download className="h-3.5 w-3.5" />
                  {t('install')}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}