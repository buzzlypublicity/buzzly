'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Maximize2 } from 'lucide-react';
import { useRouter } from '@/i18n/navigation';
import { ChatUI } from './chat-ui';

export function ChatWidget() {
  const t = useTranslations('Chat');
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Icon */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-24 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-brand-500 text-white shadow-xl shadow-brand-500/30 md:bottom-8 ${
          isRTL ? 'left-5 md:left-8' : 'right-5 md:right-8'
        } ${isOpen ? 'hidden' : 'flex'}`}
      >
        <MessageCircle className="h-6 w-6" strokeWidth={2.5} />
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex h-4 w-4 rounded-full bg-white"></span>
        </span>
      </motion.button>

      {/* Side Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
            />

            {/* Drawer Panel */}
            <motion.div
              initial={{ x: isRTL ? '-100%' : '100%' }}
              animate={{ x: 0 }}
              exit={{ x: isRTL ? '-100%' : '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={`fixed inset-y-0 z-50 flex w-full max-w-sm flex-col bg-background shadow-2xl ${
                isRTL ? 'left-0 border-r' : 'right-0 border-l'
              } border-border/50`}
            >
              {/* Drawer Header */}
              <div className="flex shrink-0 items-center justify-between border-b border-border/50 px-4 py-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500 text-white">
                    <SparklesIcon />
                  </div>
                  <div>
                    <h3 className="font-display text-sm font-bold text-foreground">BUZZLY AI</h3>
                    <p className="text-[10px] text-green-500 font-semibold flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" /> {t('status')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {/* Expand Button */}
                  <button
  onClick={() => {
    setIsOpen(false);
    router.push('/buzzly-ai');
  }}
  className="flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:bg-foreground/5 hover:text-foreground transition-colors"
  title="Expand to full page"
>
  <Maximize2 className="h-4 w-4" />
</button>
                  {/* Close Button */}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:bg-foreground/5 hover:text-foreground transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Chat UI */}
              <div className="flex-1 overflow-hidden">
                <ChatUI variant="drawer" />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function SparklesIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
    </svg>
  );
}