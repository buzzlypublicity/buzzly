import { setRequestLocale } from 'next-intl/server';
import { ContactHero } from '@/components/contact/contact-hero';
import { ContactForm } from '@/components/contact/contact-form';
import { ContactFAQ } from '@/components/contact/contact-faq';

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <ContactHero />
      <ContactForm/>
      <ContactFAQ/>
      {/* Baaki sections baad mein */}
    </>
  );
}