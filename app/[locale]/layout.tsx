import type { Metadata } from 'next';
import { Inter, Cairo, Space_Grotesk } from 'next/font/google';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { getServerTheme } from '@/lib/theme';
import { ChatProvider } from '@/context/chat-context';
import { ConditionalChrome } from '@/components/global/conditional-chrome';
import '../globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const cairo = Cairo({ subsets: ['arabic', 'latin'], variable: '--font-cairo', display: 'swap' });
const grotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-grotesk', display: 'swap' });

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  return {
    title: t('title'),
    description: t('description'),
    alternates: { languages: { en: '/en', ar: '/ar' } },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const dir = locale === 'ar' ? 'rtl' : 'ltr';
  const theme = await getServerTheme();
  const htmlClass = theme === 'dark' ? 'dark' : '';

  return (
    <html
      lang={locale}
      dir={dir}
      className={htmlClass}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <body
        className={`${inter.variable} ${cairo.variable} ${grotesk.variable} font-sans antialiased`}
      >
        <NextIntlClientProvider>
          <ChatProvider>
            <ConditionalChrome>{children}</ConditionalChrome>
          </ChatProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}