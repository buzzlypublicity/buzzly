import type { SectorContent, Locale } from './types';
import { fnb } from './fnb';
import { fashionRetail } from './fashion-retail';
import { beautyWellness } from './beauty-wellness';
import { realEstate } from './real-estate';
import { startupsTech } from './startups-tech';
import { professionalServices } from './professional-services';

export const ALL_SECTORS: SectorContent[] = [
  fnb,
  fashionRetail,
  beautyWellness,
  realEstate,
  startupsTech,
  professionalServices,
];

export function getSectorBySlug(slug: string): SectorContent | undefined {
  return ALL_SECTORS.find((s) => s.slug === slug);
}

export function getAllSectorSlugs(): string[] {
  return ALL_SECTORS.map((s) => s.slug);
}

export type { SectorContent, SectorTranslation, Locale } from './types';