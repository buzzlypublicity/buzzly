import type { ServiceContent, Locale } from './types';
import { publicRelations } from './public-relations';
import { socialMedia } from './social-media';
import { brandStrategy } from './brand-strategy';
import { contentCreation } from './content-creation';
import { influencerMarketing } from './influencer-marketing';
import { digitalAdvertising } from './digital-advertising';

/* ============================================================
   ALL SERVICES (ordered)
   ============================================================ */
export const ALL_SERVICES: ServiceContent[] = [
  publicRelations,
  socialMedia,
  brandStrategy,
  contentCreation,
  influencerMarketing,
  digitalAdvertising,
];

/* ============================================================
   HELPERS
   ============================================================ */

export function getServiceBySlug(slug: string): ServiceContent | undefined {
  return ALL_SERVICES.find((s) => s.slug === slug);
}

export function getAllServiceSlugs(): string[] {
  return ALL_SERVICES.map((s) => s.slug);
}

export function getServiceTranslation(
  slug: string,
  locale: Locale
): ServiceContent['translations'][Locale] | undefined {
  const service = getServiceBySlug(slug);
  return service?.translations[locale];
}

export type { ServiceContent, ServiceTranslation, Locale } from './types';