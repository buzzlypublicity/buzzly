import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import {
  ALL_SECTORS,
  getSectorBySlug,
  type Locale,
} from '@/data/sectors';
import { SectorDetail } from '@/components/services/sector-detail';

export function generateStaticParams() {
  return ALL_SECTORS.flatMap((sector) =>
    routing.locales.map((locale) => ({ locale, slug: sector.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const sector = getSectorBySlug(slug);
  if (!sector) return {};

  const t = sector.translations[locale as Locale];
  return { title: t.hero.headline, description: t.hero.subheadline };
}

export default async function SectorPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const sector = getSectorBySlug(slug);
  if (!sector) notFound();

  return (
    <SectorDetail
      sector={sector}
      content={sector.translations[locale as Locale]}
      locale={locale as Locale}
    />
  );
}