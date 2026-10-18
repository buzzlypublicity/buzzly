import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { ContactHero } from '@/components/contact/contact-hero';
import { ContactForm } from '@/components/contact/contact-form';
import { ContactFAQ } from '@/components/contact/contact-faq';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'MetadataContact' });
  return {
    title: t('title'),
    description: t('description'),
    alternates: { canonical: `/${locale}/contact` },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `https://buzzlypublicity.com/${locale}/contact`,
      images: ['/og-image.jpg'],
    },
  };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <ContactHero />
      <ContactForm/>
      <ContactFAQ/>
    </>
  );
}