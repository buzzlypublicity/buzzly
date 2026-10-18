'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import {
  Share2,
  Code,
  Video,
  Palette,
} from 'lucide-react';
import { ALL_PRICING_CATEGORIES } from '@/data/pricing';

const ICON_MAP: Record<string, React.ElementType> = {
  'social-media': Share2,
  'web-development': Code,
  'video-production': Video,
  'branding-design': Palette,
};

export function PricingTabs() {
  const t = useTranslations('PricingTabs');
  const locale = useLocale();
  const [activeTab, setActiveTab] = useState<string>(ALL_PRICING_CATEGORIES[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveTab(entry.target.id);
        });
      },
      { rootMargin: '-20% 0px -60% 0px' }
    );

    ALL_PRICING_CATEGORIES.forEach((cat) => {
      const el = document.getElementById(cat.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleTabClick = (id: string) => {
    setActiveTab(id);
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 130;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <div className="sticky top-16 z-40 w-full border-b border-border/50 bg-background/90 backdrop-blur-xl md:top-[72px]">
      <div className="mx-auto max-w-7xl px-2 md:px-8">
        {/* Mobile pe horizontally scrollable aur centered */}
        <div className="flex items-center justify-start overflow-x-auto py-2.5 md:justify-center md:py-3.5 no-scrollbar">
          <div className="flex gap-1.5 px-2 md:gap-2">
            {ALL_PRICING_CATEGORIES.map((category) => {
              const Icon = ICON_MAP[category.id] || Share2;
              const isActive = activeTab === category.id;

              return (
                <button
                  key={category.id}
                  onClick={() => handleTabClick(category.id)}
                  className={`relative flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-bold transition-colors duration-300 md:px-4 md:py-2 md:text-[13px] ${
                    isActive
                      ? 'text-white'
                      : 'text-muted hover:bg-foreground/5 hover:text-foreground'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-pricing-tab-mobile"
                      className="absolute inset-0 rounded-full bg-brand-500 shadow-md shadow-brand-500/25"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}

                  <span className="relative z-10 flex items-center gap-1.5">
                    <Icon
                      className={`h-3 w-3 md:h-3.5 md:w-3.5 ${isActive ? 'text-white' : 'text-muted/70'}`}
                      strokeWidth={2.5}
                    />
                    {category.title[locale as 'en' | 'ar']}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
      {/* Hide scrollbar CSS */}
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}