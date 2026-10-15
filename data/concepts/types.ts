export type Locale = 'en' | 'ar';

export interface ConceptSection {
  number: string;
  label: string;
  title: string;
  content: string;
  bullets?: string[];
}

export interface ConceptTranslation {
  /** Concept card title (list view) */
  title: string;
  /** Short subtitle for card */
  tagline: string;
  /** Fictional brand this concept is for */
  brand: string;
  /** Category — e.g. "Brand Identity", "Social Campaign" */
  category: string;
  /** Hero section */
  hero: {
    eyebrow: string;
    headline: string;
    subheadline: string;
  };
  /** Detailed sections on concept page */
  sections: {
    brief: ConceptSection;
    idea: ConceptSection;
    execution: ConceptSection;
    objective: ConceptSection;
  };
  /** Next concept CTA text */
  nextLabel: string;
}

export interface ConceptContent {
  slug: string;
  number: string;
  /** Lucide icon name */
  icon: string;
  /** Accent for visuals */
  accent: 'brand' | 'accent';
  /** Cover image path (in /public/concepts/) */
  cover: string;
  /** Gallery images for execution section */
  gallery: string[];
  translations: Record<Locale, ConceptTranslation>;
}