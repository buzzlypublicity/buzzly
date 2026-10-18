import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { ServicesHero } from "@/components/services/services-hero";
import { ServicesList } from "@/components/services/services-list";
import { SectorsServed } from "@/components/services/sectors-served";
import { HowWeWork } from "@/components/services/how-we-work";
import { WhyBuzzly } from "@/components/services/why-buzzly";
import { ServicesFinalCTA } from "@/components/services/services-final-cta";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'MetadataServices' });
  return {
    title: t('title'),
    description: t('description'),
    alternates: { canonical: `/${locale}/services` },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `https://buzzlypublicity.com/${locale}/services`,
      images: ['/og-image.jpg'],
    },
  };
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <ServicesHero/>
      <ServicesList/>
      <SectorsServed/>
      <HowWeWork/>
      <WhyBuzzly/>
      <ServicesFinalCTA/>
    </>
  );
}