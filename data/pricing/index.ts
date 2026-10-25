import { socialMediaPricing } from './social-media';
import { webDevPricing } from './web-development';
import { videoProductionPricing } from './video-production';
import { brandingDesignPricing } from './branding-design';
import type { PricingCategory } from './types';
  import { mobileAppPricing, posSoftwarePricing } from './custom-services'; // 👈 Add

export const ALL_PRICING_CATEGORIES: PricingCategory[] = [
  socialMediaPricing,
  videoProductionPricing,
  brandingDesignPricing,
  webDevPricing,
  mobileAppPricing,      // 👈 Add
  posSoftwarePricing,    // 👈 Add
];

export type { PricingCategory, PricingPackage, PricingFeature } from './types';