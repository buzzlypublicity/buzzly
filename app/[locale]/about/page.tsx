import { setRequestLocale } from 'next-intl/server';
import { AboutHero } from '@/components/about/about-hero';
import { WhoWeAre } from '@/components/about/who-we-are';
import { OurStory } from '@/components/about/our-story';
import { WhatWeDo } from '@/components/about/what-we-do';
import { OurApproach } from '@/components/about/our-approach';
import { OurValues } from '@/components/about/our-values';
import { AboutFinalCTA } from '@/components/about/about-final-cta';

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
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