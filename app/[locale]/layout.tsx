import type { Metadata, Viewport } from 'next';
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

/* ============================================================
   STATIC PARAMS
   ============================================================ */
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

/* ============================================================
   ADVANCED METADATA (SEO, OpenGraph, Twitter)
   ============================================================ */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    metadataBase: new URL('https://buzzlypublicity.com'),
    title: {
      default: t('title'),
      template: `%s | BUZZLY Publicity`,
    },
    description: t('description'),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: '/en',
        ar: '/ar',
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `/${locale}`,
      siteName: 'BUZZLY Publicity',
      images: [
        {
          url: '/og-image.jpg', // 1200x630 image public folder mein daalein
          width: 1200,
          height: 630,
          alt: 'BUZZLY Publicity - Creative Agency in Bahrain',
        },
      ],
      locale: locale === 'ar' ? 'ar_BH' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: ['/og-image.jpg'],
    },
  };
}

/* ============================================================
   VIEWPORT & THEME COLOR
   ============================================================ */
export const viewport: Viewport = {
  themeColor: '#E97A00',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

/* ============================================================
   LOCAL BUSINESS SCHEMA (JSON-LD)
   ============================================================ */
const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'BUZZLY Publicity & Advertising W.L.L',
  image: 'https://buzzlypublicity.com/og-image.jpg',
  '@id': 'https://buzzlypublicity.com',
  url: 'https://buzzlypublicity.com',
  telephone: '+97366316733',
  priceRange: 'BHD',
  description:
    'Bilingual creative publicity agency in Bahrain. PR, Social Media, Branding, Content, Influencer Marketing, Digital Ads.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Flat 13, Building 1435, Road 504, Block 205',
    addressLocality: 'Muharraq',
    addressRegion: 'Muharraq',
    postalCode: '205',
    addressCountry: 'BH',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 26.2572,
    longitude: 50.611,
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00',
    closes: '18:00',
  },
  sameAs: [
    'https://www.instagram.com/buzzlypublicity',
    'https://www.linkedin.com/company/buzzlypublicity',
  ],
};

/* ============================================================
   LAYOUT COMPONENT
   ============================================================ */
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
      <head>
        {/* PWA & Mobile Meta Tags */}
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        
        {/* JSON-LD Schema for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
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