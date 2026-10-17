import { setRequestLocale, getTranslations } from 'next-intl/server';
import { LegalLayout, type LegalSection } from '@/components/legal/legal-layout';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'PrivacyPolicy' });
  return { title: t('meta.title'), description: t('meta.description') };
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('PrivacyPolicy');

  const sections: LegalSection[] = [
    { id: 'overview',       title: t('sections.overview.title'),       content: <p>{t('sections.overview.content')}</p> },
    { id: 'data-collect',   title: t('sections.dataCollect.title'),    content: <p>{t('sections.dataCollect.content')}</p> },
    { id: 'how-we-use',     title: t('sections.howWeUse.title'),       content: <p>{t('sections.howWeUse.content')}</p> },
    { id: 'third-party',    title: t('sections.thirdParty.title'),     content: <p>{t('sections.thirdParty.content')}</p> },
    { id: 'retention',      title: t('sections.retention.title'),      content: <p>{t('sections.retention.content')}</p> },
    { id: 'your-rights',    title: t('sections.yourRights.title'),     content: <p>{t('sections.yourRights.content')}</p> },
    { id: 'contact',        title: t('sections.contact.title'),        content: <p>{t('sections.contact.content')}</p> },
  ];

  return (
    <LegalLayout
      type="privacy"
      title={t('title')}
      lastUpdated={t('lastUpdated')}
      sections={sections}
    />
  );
}