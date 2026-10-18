import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/buzzly-ai/'],
    },
    sitemap: 'https://buzzlypublicity.com/sitemap.xml',
  };
}