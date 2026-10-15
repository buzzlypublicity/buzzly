import type { ConceptContent, ConceptTranslation, Locale } from './types';
import { naseejBrandIdentity } from './naseej-brand-identity';
import { bloomSocialCampaign } from './bloom-social-campaign';
import { waveProductLaunch } from './wave-product-launch';

/* ============================================================
   ALL CONCEPTS (ordered)
   ============================================================ */
export const ALL_CONCEPTS: ConceptContent[] = [
  naseejBrandIdentity,
  bloomSocialCampaign,
  waveProductLaunch,
];

/* ============================================================
   HELPERS
   ============================================================ */

export function getConceptBySlug(slug: string): ConceptContent | undefined {
  return ALL_CONCEPTS.find((c) => c.slug === slug);
}

export function getAllConceptSlugs(): string[] {
  return ALL_CONCEPTS.map((c) => c.slug);
}

export function getConceptTranslation(
  slug: string,
  locale: Locale
): ConceptTranslation | undefined {
  const concept = getConceptBySlug(slug);
  return concept?.translations[locale];
}

/** Get next concept (wraps around) */
export function getNextConcept(slug: string): ConceptContent {
  const idx = ALL_CONCEPTS.findIndex((c) => c.slug === slug);
  const nextIdx = (idx + 1) % ALL_CONCEPTS.length;
  return ALL_CONCEPTS[nextIdx];
}

export type { ConceptContent, ConceptTranslation, Locale } from './types';