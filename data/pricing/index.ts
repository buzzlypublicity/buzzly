import { socialMediaPricing } from './social-media';
import { webDevPricing } from './web-development';
import { videoProductionPricing } from './video-production';
import { brandingDesignPricing } from './branding-design';
import type { PricingCategory } from './types';

export const ALL_PRICING_CATEGORIES: PricingCategory[] = [
  socialMediaPricing,
  videoProductionPricing,
  brandingDesignPricing,
  webDevPricing,
];

export type { PricingCategory, PricingPackage, PricingFeature } from './types';