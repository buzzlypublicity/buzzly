import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { WorkHero } from '@/components/work/work-hero';
import { WorkConcepts } from '@/components/work/work-concepts';
import { WorkApproach } from '@/components/work/work-approach';
import { ServicesFinalCTA } from '@/components/services/services-final-cta';
import { ClientWork } from '@/components/work/client-work';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'MetadataWork' });
  return {
    title: t('title'),
    description: t('description'),
    alternates: { canonical: `/${locale}/work` },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `https://buzzlypublicity.com/${locale}/work`,
      images: ['/og-image.jpg'],
    },
  };
}

export default async function WorkPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <WorkHero />
      <WorkConcepts />
      <ClientWork/>
      <WorkApproach />
      <ServicesFinalCTA />
    </>
  );
}