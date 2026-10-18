export type Locale = 'en' | 'ar';

export interface PricingFeature {
  en: string;
  ar: string;
}

export interface PricingPackage {
  id: string;
  name: { en: string; ar: string };
  price: string;         // e.g., "BD 40", "BD 99", "Custom"
  period?: { en: string; ar: string }; // e.g., "/ Month"
  isPopular?: boolean;
  features: PricingFeature[];
}

export interface PricingCategory {
  id: string;
  title: { en: string; ar: string };
  description: { en: string; ar: string };
  pricingType: { en: string; ar: string }; // e.g., "Monthly Retainer", "One-time Project"
  packages: PricingPackage[];
}