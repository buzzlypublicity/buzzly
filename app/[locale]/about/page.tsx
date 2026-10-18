import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { AboutHero } from '@/components/about/about-hero';
import { WhoWeAre } from '@/components/about/who-we-are';
import { OurStory } from '@/components/about/our-story';
import { WhatWeDo } from '@/components/about/what-we-do';
import { OurApproach } from '@/components/about/our-approach';
import { OurValues } from '@/components/about/our-values';
import { AboutFinalCTA } from '@/components/about/about-final-cta';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'MetadataAbout' });
  return {
    title: t('title'),
    description: t('description'),
    alternates: { canonical: `/${locale}/about` },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `https://buzzlypublicity.com/${locale}/about`,
      images: ['/og-image.jpg'],
    },
  };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <AboutHero />
      <WhoWeAre/>
      <OurStory/>
      <WhatWeDo/>
      <OurApproach/>
      <OurValues/>
      <AboutFinalCTA/>
    </>
  );
}