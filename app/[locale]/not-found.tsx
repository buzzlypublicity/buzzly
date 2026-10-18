'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  const t = useTranslations('NotFound');

  return (
    <div className="relative flex min-h-[calc(100vh-72px)] flex-col items-center justify-center overflow-hidden bg-background px-5 text-center">
      {/* Background Orbs */}
      <div className="pointer-events-none absolute -left-40 top-1/4 h-[400px] w-[400px] rounded-full orb-brand blur-3xl opacity-30" />
      <div className="pointer-events-none absolute -right-40 bottom-1/4 h-[400px] w-[400px] rounded-full orb-teal blur-3xl opacity-30" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 max-w-lg"
      >
        {/* 404 Number */}
        <h1 className="font-display text-[120px] font-black leading-none tracking-tighter text-foreground md:text-[180px]">
          4<span className="text-gradient-animated">0</span>4
        </h1>
        
        <h2 className="mt-2 font-display text-2xl font-black text-foreground md:text-3xl">
          {t('title')}
        </h2>
        
        <p className="mt-4 text-[15px] text-muted md:text-base">
          {t('subtitle')}
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="skeu-btn inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold sm:w-auto"
          >
            <Home className="h-4 w-4" />
            {t('cta')}
          </Link>
          <button
            onClick={() => window.history.back()}
            className="skeu-btn-secondary inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold sm:w-auto"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </button>
        </div>
      </motion.div>
    </div>
  );
}