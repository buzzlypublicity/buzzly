import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import {
  ALL_SERVICES,
  getServiceBySlug,
  type Locale,
} from '@/data/services';
import { ServiceDetail } from '@/components/services/service-detail';

/* ============================================================
   STATIC PARAMS
   ============================================================ */
export function generateStaticParams() {
  return ALL_SERVICES.flatMap((service) =>
    routing.locales.map((locale) => ({
      locale,
      slug: service.slug,
    }))
  );
}

/* ============================================================
   METADATA
   ============================================================ */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  const content = service.translations[locale as Locale];
  return {
    title: content.hero.headline,
    description: content.hero.subheadline,
  };
}

/* ============================================================
   PAGE
   ============================================================ */
export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const content = service.translations[locale as Locale];

  return (
    <ServiceDetail
      service={service}
      content={content}
      locale={locale as Locale}
    />
  );
}