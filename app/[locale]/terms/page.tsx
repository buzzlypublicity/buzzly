import { setRequestLocale, getTranslations } from 'next-intl/server';
import { LegalLayout, type LegalSection } from '@/components/legal/legal-layout';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'TermsOfService' });
  return { title: t('meta.title'), description: t('meta.description') };
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('TermsOfService');

  const sections: LegalSection[] = [
    { id: 'overview',        title: t('sections.overview.title'),        content: <p>{t('sections.overview.content')}</p> },
    { id: 'payment',         title: t('sections.payment.title'),         content: <p>{t('sections.payment.content')}</p> },
    { id: 'responsibilities',title: t('sections.responsibilities.title'),content: <p>{t('sections.responsibilities.content')}</p> },
    { id: 'revisions',       title: t('sections.revisions.title'),       content: <p>{t('sections.revisions.content')}</p> },
    { id: 'advertising',     title: t('sections.advertising.title'),     content: <p>{t('sections.advertising.content')}</p> },
    { id: 'ip',              title: t('sections.ip.title'),              content: <p>{t('sections.ip.content')}</p> },
    { id: 'liability',       title: t('sections.liability.title'),       content: <p>{t('sections.liability.content')}</p> },
    { id: 'law',             title: t('sections.law.title'),             content: <p>{t('sections.law.content')}</p> },
  ];

  return (
    <LegalLayout
      type="terms"
      title={t('title')}
      lastUpdated={t('lastUpdated')}
      sections={sections}
    />
  );
}