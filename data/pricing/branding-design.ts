import type { PricingCategory } from './types';

export const brandingDesignPricing: PricingCategory = {
  id: 'branding-design',
  title: {
    en: 'Branding & Design',
    ar: 'الهوية التجارية والتصميم',
  },
  description: {
    en: 'Unique brand identities, professional logos, and premium marketing graphics.',
    ar: 'هويات تجارية فريدة وشعارات احترافية ورسومات تسويقية متميزة.',
  },
  pricingType: {
    en: 'One-time Project',
    ar: 'مشروع لمرة واحدة',
  },
  packages: [
    {
      id: 'brand-essentials',
      name: { en: 'Brand Essentials', ar: 'أساسيات العلامة' },
      price: 'Custom',
      features: [
        { en: 'Logo Design', ar: 'تصميم الشعار' },
        { en: 'Basic Visual Identity', ar: 'هوية بصرية أساسية' },
        { en: 'Color Palette', ar: 'لوحة الألوان' },
      ],
    },
    {
      id: 'brand-identity',
      name: { en: 'Brand Identity', ar: 'هوية العلامة' },
      price: 'Custom',
      isPopular: true,
      features: [
        { en: 'Logo System', ar: 'نظام الشعار' },
        { en: 'Typography & Colors', ar: 'الخطوط والألوان' },
        { en: 'Brand Guidelines', ar: 'إرشادات العلامة التجارية' },
      ],
    },
    {
      id: 'complete-brand',
      name: { en: 'Complete Brand System', ar: 'نظام علامة كامل' },
      price: 'Custom',
      features: [
        { en: 'Brand Strategy', ar: 'استراتيجية العلامة' },
        { en: 'Complete Identity', ar: 'هوية كاملة' },
        { en: 'Agreed Brand Assets', ar: 'أصول العلامة المتفق عليها' },
      ],
    },
  ],
};