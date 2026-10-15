import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import {
  ALL_CONCEPTS,
  getConceptBySlug,
  type Locale,
} from '@/data/concepts';
import { ConceptDetail } from '@/components/work/concept-detail';

export function generateStaticParams() {
  return ALL_CONCEPTS.flatMap((concept) =>
    routing.locales.map((locale) => ({
      locale,
      slug: concept.slug,
    }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const concept = getConceptBySlug(slug);
  if (!concept) return {};

  const t = concept.translations[locale as Locale];
  return {
    title: t.hero.headline,
    description: t.hero.subheadline,
  };
}

export default async function ConceptPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const concept = getConceptBySlug(slug);
  if (!concept) notFound();

  return (
    <ConceptDetail
      concept={concept}
      content={concept.translations[locale as Locale]}
      locale={locale as Locale}
    />
  );
}