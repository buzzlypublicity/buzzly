/* ============================================================
   SERVICE DATA — Type Definitions
   ============================================================ */

export type Locale = 'en' | 'ar';

export interface ServiceTranslation {
  title: string;
  tagline: string;
  hero: {
    eyebrow: string;
    headline: string;
    subheadline: string;
  };
  overview: string;
  whatWeDo: {
    title: string;
    subtitle: string;
    items: {
      title: string;
      description: string;
    }[];
  };
  process: {
    title: string;
    subtitle: string;
    steps: {
      number: string;
      title: string;
      description: string;
    }[];
  };
  deliverables: {
    title: string;
    subtitle: string;
    items: string[];
  };
  faqs: {
    title: string;
    items: {
      question: string;
      answer: string;
    }[];
  };
  cta: {
    title: string;
    subtitle: string;
    buttonPrimary: string;
    buttonSecondary: string;
  };
}

export interface ServiceContent {
  slug: string;
  number: string;
  /** Lucide icon name — e.g. 'Megaphone', 'Share2' */
  icon: string;
  accent: 'brand' | 'accent';
  translations: Record<Locale, ServiceTranslation>;
}