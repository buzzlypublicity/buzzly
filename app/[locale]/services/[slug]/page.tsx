import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { routing } from '@/i18n/routing';
import { ALL_SERVICES, getServiceBySlug, type Locale } from '@/data/services';
import { ServiceDetail } from '@/components/services/service-detail';

export function generateStaticParams() {
  return ALL_SERVICES.flatMap((service) =>
    routing.locales.map((locale) => ({ locale, slug: service.slug }))
  );
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  const content = service.translations[locale as Locale];
  return {
    title: content.hero.headline,
    description: content.hero.subheadline,
    alternates: { canonical: `/${locale}/services/${slug}` },
    openGraph: {
      title: `${content.hero.headline} | BUZZLY`,
      description: content.hero.subheadline,
      url: `https://buzzlypublicity.com/${locale}/services/${slug}`,
      images: ['/og-image.jpg'],
    },
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const service = getServiceBySlug(slug);
  if (!service) notFound();

  return <ServiceDetail service={service} content={service.translations[locale as Locale]} locale={locale as Locale} />;
}