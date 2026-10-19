'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export function SplashScreen() {
  const [showSplash, setShowSplash] = useState(false);

  useEffect(() => {
  // Only show splash in standalone mode (installed PWA)
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches;

  if (isStandalone) {
    setShowSplash(true);

    // Hide after 1.8 seconds — HAR BAAR
    const timer = setTimeout(() => setShowSplash(false), 1800);
    return () => clearTimeout(timer);
  }
}, []);

  return (
    <AnimatePresence>
      {showSplash && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-ink-950"
        >
          {/* Background Orbs */}
          <motion.div
            className="pointer-events-none absolute -left-40 top-1/4 h-[500px] w-[500px] rounded-full bg-brand-500/30 blur-[120px]"
            animate={{
              x: [0, 30, -10, 0],
              y: [0, -20, 10, 0],
              scale: [1, 1.1, 0.98, 1],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="pointer-events-none absolute -right-40 bottom-1/4 h-[500px] w-[500px] rounded-full bg-accent-500/20 blur-[120px]"
            animate={{
              x: [0, -25, 15, 0],
              y: [0, 15, -25, 0],
              scale: [1, 0.95, 1.05, 1],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Grid Pattern */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                'linear-gradient(to right, #FFFFFF 1px, transparent 1px), linear-gradient(to bottom, #FFFFFF 1px, transparent 1px)',
              backgroundSize: '56px 56px',
              maskImage:
                'radial-gradient(ellipse 80% 70% at 50% 50%, black 40%, transparent 90%)',
            }}
          />

          {/* Center Content */}
          <div className="relative flex flex-col items-center">
            
            {/* Logo with glow ring */}
            <motion.div
              initial={{ scale: 0.7, opacity: 0, filter: 'blur(10px)' }}
              animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              {/* Pulse rings */}
              <motion.span
                className="absolute inset-0 rounded-3xl bg-brand-500/30 blur-2xl"
                animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />

              {/* Logo container */}
              <div className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl md:h-28 md:w-28">
                <Image
                  src="/buzzly 2.jpeg"
                  alt="BUZZLY"
                  width={112}
                  height={112}
                  priority
                  className="h-full w-full object-contain p-2"
                />
              </div>
            </motion.div>

            {/* Brand Name */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 text-center"
            >
              <h1 className="font-display text-2xl font-black tracking-tight text-white md:text-3xl">
                BUZZLY
                <span className="text-brand-500">.</span>
              </h1>
              <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.3em] text-white/50 md:text-[11px]">
                PUBLICITY & ADVERTISING
              </p>
            </motion.div>

            {/* Progress Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="mt-10 h-[2px] w-32 overflow-hidden rounded-full bg-white/10"
            >
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-brand-500 to-accent-500"
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.6,
                }}
              />
            </motion.div>
          </div>

          {/* Footer */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="absolute bottom-12 text-[9px] font-bold uppercase tracking-[0.3em] text-white/40"
          >
            Made in Bahrain
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}