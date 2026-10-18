'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Video, 
  FileText, 
  Zap, 
  RefreshCw, 
  Camera, 
  Check, 
  MessageCircle,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { PRICING_ADDONS } from '@/data/pricing/addons';

// Icon Mapper
const ICON_MAP: Record<string, React.ElementType> = {
  Video,
  FileText,
  Zap,
  RefreshCw,
  Camera,
};

export function PricingAddons() {
  const t = useTranslations('PricingAddons');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const [selected, setSelected] = useState<string[]>([]);

  const toggleAddon = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const totalPrice = PRICING_ADDONS.filter((a) => selected.includes(a.id)).reduce(
    (sum, addon) => sum + addon.price,
    0
  );

  // WhatsApp message generator
  const whatsappMessage = () => {
    const selectedNames = PRICING_ADDONS.filter(a => selected.includes(a.id)).map(a => a.name.en).join(', ');
    const text = selected.length > 0 
      ? `Hi BUZZLY, I'd like to request a custom quote with the following add-ons: ${selectedNames}. (Estimated total: BD ${totalPrice})`
      : `Hi BUZZLY, I'd like to build a custom package. Can we discuss?`;
    
    return `https://wa.me/97366316733?text=${encodeURIComponent(text)}`;
  };

  return (
    <section className="relative overflow-hidden bg-background py-20 md:py-28">
      {/* Background Orbs */}
      <div className="pointer-events-none absolute -left-40 top-1/4 h-[400px] w-[400px] rounded-full orb-brand blur-3xl opacity-30" />
      <div className="pointer-events-none absolute -right-40 bottom-1/4 h-[400px] w-[400px] rounded-full orb-teal blur-3xl opacity-30" />

      <div className="relative mx-auto max-w-4xl px-5 md:px-8">
        
        {/* Header */}
        <div className="mx-auto mb-10 max-w-2xl text-center md:mb-14">
          <div className="skeu-badge inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-500 md:text-[11px]">
            <Sparkles className="h-3 w-3" strokeWidth={2.5} />
            {t('badge')}
          </div>
          <h2 className="mt-4 font-display text-3xl font-black text-foreground md:text-4xl lg:text-5xl">
            {t('title')}
          </h2>
          <p className="mt-4 text-[14px] leading-relaxed text-muted md:text-[15px]">
            {t('subtitle')}
          </p>
        </div>

        {/* Add-ons List */}
        <div className="space-y-3 md:space-y-4">
          {PRICING_ADDONS.map((addon, i) => {
            const Icon = ICON_MAP[addon.icon] || Sparkles;
            const isSelected = selected.includes(addon.id);

            return (
              <motion.div
                key={addon.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                <div
                  onClick={() => toggleAddon(addon.id)}
                  className={`group relative flex cursor-pointer items-center justify-between gap-4 rounded-2xl border p-4 transition-all duration-300 md:p-5 ${
                    isSelected
                      ? 'border-brand-500 bg-brand-500/[0.06] shadow-lg shadow-brand-500/10'
                      : 'border-border/60 bg-card hover:border-brand-500/40 hover:bg-foreground/[0.02]'
                  }`}
                >
                  <div className="flex items-center gap-4 md:gap-5">
                    {/* Custom Checkbox */}
                    <div
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 transition-colors duration-300 md:h-7 md:w-7 ${
                        isSelected
                          ? 'border-brand-500 bg-brand-500 text-white'
                          : 'border-border/80 bg-transparent text-transparent group-hover:border-brand-500/50'
                      }`}
                    >
                      <Check className="h-3.5 w-3.5 md:h-4 md:w-4" strokeWidth={3} />
                    </div>

                    {/* Icon & Name */}
                    <div className="flex items-center gap-3 md:gap-4">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors md:h-12 md:w-12 ${
                        isSelected ? 'bg-brand-500/15 text-brand-500' : 'bg-foreground/5 text-muted'
                      }`}>
                        <Icon className="h-5 w-5 md:h-6 md:w-6" />
                      </div>
                      <span className={`font-display text-[14px] font-bold md:text-base ${
                        isSelected ? 'text-brand-500' : 'text-foreground'
                      }`}>
                        {addon.name[locale as 'en' | 'ar']}
                      </span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="shrink-0 font-display text-sm font-black text-foreground md:text-lg">
                    + BD {addon.price}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Desktop Summary & CTA (Hidden on Mobile) */}
        <div className="mt-10 hidden items-center justify-between rounded-2xl bg-foreground p-6 md:flex">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-muted">
              {t('estimatedTotal')}
            </p>
            <p className="mt-1 font-display text-2xl font-black text-background">
              BD {totalPrice}
            </p>
          </div>
          <a
            href={whatsappMessage()}
            target="_blank"
            rel="noopener noreferrer"
            className="skeu-btn inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-[14px] font-bold"
          >
            <MessageCircle className="h-4 w-4" />
            {t('cta')}
          </a>
        </div>

        {/* Bottom spacing for mobile sticky bar */}
        <div className="h-24 md:hidden" />

      </div>

      {/* Mobile Sticky Bottom Bar */}
      <div className="fixed inset-x-0 bottom-[76px] z-40 md:hidden">
        <div className="mx-auto max-w-md px-4 pb-4">
          <AnimatePresence>
            <motion.div 
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              className="flex items-center justify-between rounded-full bg-foreground p-2 shadow-2xl"
            >
              <div className="pl-4">
                <p className="text-[9px] font-bold uppercase tracking-wider text-muted">
                  {t('total')}
                </p>
                <p className="font-display text-lg font-black text-background">
                  BD {totalPrice}
                </p>
              </div>
              <a
                href={whatsappMessage()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-full bg-brand-500 px-5 py-3 text-[12px] font-bold text-white"
              >
                {t('ctaShort')}
                <ArrowRight className={`h-3.5 w-3.5 ${isRTL ? 'rotate-180' : ''}`} />
              </a>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}