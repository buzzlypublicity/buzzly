import { MetadataRoute } from 'next';
import { ALL_SERVICES } from '@/data/services';
import { ALL_SECTORS } from '@/data/sectors';
import { ALL_CONCEPTS } from '@/data/concepts';
import { CASE_STUDIES } from '@/data/case-studies';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://buzzlypublicity.com';

  const staticRoutes = [
    '', '/about', '/services', '/work', '/pricing', '/contact',
    '/privacy', '/terms', '/buzzly-ai'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  const serviceRoutes = ALL_SERVICES.map((s) => ({
    url: `${baseUrl}/services/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const sectorRoutes = ALL_SECTORS.map((s) => ({
    url: `${baseUrl}/sectors/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const conceptRoutes = ALL_CONCEPTS.map((c) => ({
    url: `${baseUrl}/work/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const caseStudyRoutes = CASE_STUDIES.map((cs) => ({
    url: `${baseUrl}/case-studies/${cs.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...serviceRoutes, ...sectorRoutes, ...conceptRoutes, ...caseStudyRoutes];
}