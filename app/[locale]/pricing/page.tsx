import { setRequestLocale } from 'next-intl/server';
import { PricingHero } from '@/components/pricing/pricing-hero';
import { PricingTabs } from '@/components/pricing/pricing-tabs';
import { PricingCards } from '@/components/pricing/pricing-cards';
import { PricingPromise } from '@/components/pricing/pricing-promise';
import { PricingAddons } from '@/components/pricing/pricing-addons';
import { PricingComparison } from '@/components/pricing/pricing-comparison';
import { PricingFinalCTA } from '@/components/pricing/pricing-final-cta';

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <PricingHero />
      
      {/* 👇 Yahan common wrapper div lagaya hai 👇 */}
      <div className="relative">
        <PricingTabs />
        <PricingCards />
      </div>
      {/* 👆 Wrapper yahan khatam hota hai 👆 */}

      <PricingPromise />
      <PricingAddons/>
      <PricingComparison/>
      <PricingFinalCTA/>
      {/* Baaki sections (FAQ, CTA) baad mein yahan aayenge */}
    </>
  );
}