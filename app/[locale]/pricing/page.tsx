import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { PricingHero } from '@/components/pricing/pricing-hero';
import { PricingTabs } from '@/components/pricing/pricing-tabs';
import { PricingCards } from '@/components/pricing/pricing-cards';
import { PricingPromise } from '@/components/pricing/pricing-promise';
import { PricingAddons } from '@/components/pricing/pricing-addons';
import { PricingComparison } from '@/components/pricing/pricing-comparison';
import { PricingFinalCTA } from '@/components/pricing/pricing-final-cta';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'MetadataPricing' });
  return {
    title: t('title'),
    description: t('description'),
    alternates: { canonical: `/${locale}/pricing` },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `https://buzzlypublicity.com/${locale}/pricing`,
      images: ['/og-image.jpg'],
    },
  };
}

export default async function PricingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <PricingHero />
      <div className="relative">
        <PricingTabs />
        <PricingCards />
      </div>
      <PricingPromise />
      <PricingAddons/>
      <PricingComparison/>
      <PricingFinalCTA/>
    </>
  );
}