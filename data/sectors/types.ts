export type Locale = 'en' | 'ar';

export interface SectorTranslation {
  name: string;
  tagline: string;
  hero: {
    eyebrow: string;
    headline: string;
    subheadline: string;
  };
  why: string;
  whatWeDo: {
    title: string;
    subtitle: string;
    items: { title: string; description: string }[];
  };
  approach: {
    title: string;
    subtitle: string;
    steps: { number: string; title: string; description: string }[];
  };
  offerings: {
    title: string;
    subtitle: string;
    items: string[];
  };
  cta: {
    title: string;
    subtitle: string;
    buttonPrimary: string;
    buttonSecondary: string;
  };
}

export interface SectorContent {
  slug: string;
  number: string;
  icon: string;
  accent: 'brand' | 'accent';
  featured: boolean;
  translations: Record<Locale, SectorTranslation>;
}