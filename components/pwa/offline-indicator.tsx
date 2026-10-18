'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { WifiOff, Wifi, RefreshCw } from 'lucide-react';

export function OfflineIndicator() {
  const t = useTranslations('Offline');
  const [isOffline, setIsOffline] = useState(false);
  const [wasOffline, setWasOffline] = useState(false);

  useEffect(() => {
    // Set initial state
    setIsOffline(!navigator.onLine);

    const handleOffline = () => {
      setIsOffline(true);
      setWasOffline(true);
    };
    const handleOnline = () => {
      setIsOffline(false);
      // Show "back online" for 2 seconds
      setTimeout(() => setWasOffline(false), 2000);
    };

    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  return (
    <AnimatePresence>
      {(isOffline || wasOffline) && (
        <motion.div
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -60, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed inset-x-0 top-0 z-[100] flex justify-center px-3 pt-3"
        >
          <div
            className={`flex items-center gap-2.5 rounded-full px-4 py-2.5 shadow-xl backdrop-blur-xl ${
              isOffline
                ? 'bg-ink-950/95 text-white'
                : 'bg-green-500/95 text-white'
            }`}
          >
            {isOffline ? (
              <>
                <WifiOff className="h-4 w-4 shrink-0" />
                <span className="text-[12px] font-semibold md:text-[13px]">
                  {t('offlineMessage')}
                </span>
              </>
            ) : (
              <>
                <Wifi className="h-4 w-4 shrink-0" />
                <span className="text-[12px] font-semibold md:text-[13px]">
                  {t('onlineMessage')}
                </span>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}