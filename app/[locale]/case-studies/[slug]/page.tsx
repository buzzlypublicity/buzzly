import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { CASE_STUDIES } from '@/data/case-studies';
import { CaseStudyDetail } from '@/components/work/case-study-detail';

export function generateStaticParams() {
  return CASE_STUDIES.map((study) => ({ slug: study.slug }));
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const study = CASE_STUDIES.find((s) => s.slug === slug);
  if (!study) notFound();

  return <CaseStudyDetail study={study} locale={locale} />;
}