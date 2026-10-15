import { setRequestLocale } from 'next-intl/server';
import { WorkHero } from '@/components/work/work-hero';
import { WorkConcepts } from '@/components/work/work-concepts';
import { WorkApproach } from '@/components/work/work-approach';
import { ServicesFinalCTA } from '@/components/services/services-final-cta';

export default async function WorkPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <WorkHero />
      <WorkConcepts />
      <WorkApproach />
      <ServicesFinalCTA />
    </>
  );
}