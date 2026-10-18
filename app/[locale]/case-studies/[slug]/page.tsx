import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { CASE_STUDIES } from '@/data/case-studies';
import { CaseStudyDetail } from '@/components/work/case-study-detail';

export function generateStaticParams() {
  return CASE_STUDIES.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const study = CASE_STUDIES.find((s) => s.slug === slug);
  if (!study) return {};

  return {
    title: `${study.clientName[locale as 'en'|'ar']} - Case Study`,
    description: study.challenge[locale as 'en'|'ar'],
    alternates: { canonical: `/${locale}/case-studies/${slug}` },
    openGraph: {
      title: `${study.clientName[locale as 'en'|'ar']} | BUZZLY Case Study`,
      description: study.challenge[locale as 'en'|'ar'],
      url: `https://buzzlypublicity.com/${locale}/case-studies/${slug}`,
      images: [study.heroImage],
    },
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const study = CASE_STUDIES.find((s) => s.slug === slug);
  if (!study) notFound();

  return <CaseStudyDetail study={study} locale={locale} />;
}