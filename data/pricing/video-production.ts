import type { PricingCategory } from './types';

export const videoProductionPricing: PricingCategory = {
  id: 'video-production',
  title: {
    en: 'Video Production',
    ar: 'إنتاج الفيديو',
  },
  description: {
    en: 'High-converting video ads and creative visual content that captures attention.',
    ar: 'إعلانات فيديو عالية التحويل ومحتوى بصري إبداعي يجذب الانتباه.',
  },
  pricingType: {
    en: 'Per Project',
    ar: 'لكل مشروع',
  },
  packages: [
    {
      id: 'short-form',
      name: { en: 'Short-Form Content', ar: 'محتوى قصير' },
      price: 'Custom',
      features: [
        { en: 'Reels & Promotional Clips', ar: 'ريلز ومقاطع ترويجية' },
        { en: 'Professional Scripting', ar: 'كتابة نصوص احترافية' },
        { en: 'Basic Editing & Color Grading', ar: 'مونتاج أساسي وتصحيح ألوان' },
      ],
    },
    {
      id: 'campaign',
      name: { en: 'Campaign Production', ar: 'إنتاج حملة' },
      price: 'Custom',
      isPopular: true,
      features: [
        { en: 'Planned Videos & Campaign Assets', ar: 'فيديوهات مخططة وأصول الحملة' },
        { en: 'Full Pre-production & Storyboarding', ar: 'ما قبل الإنتاج كامل ولوحات القصص' },
        { en: 'Advanced Editing & Motion Graphics', ar: 'مونتاج متقدم وموشن جرافيك' },
      ],
    },
    {
      id: 'custom-production',
      name: { en: 'Custom Production', ar: 'إنتاج مخصص' },
      price: 'Custom',
      features: [
        { en: 'Complex Shoots & Multiple Scenes', ar: 'تصوير معقد ومشاهد متعددة' },
        { en: 'Large Scale Productions', ar: 'إنتاجات واسعة النطاق' },
        { en: 'Dedicated Crew & Equipment', ar: 'طاقم ومعدات مخصصة' },
      ],
    },
  ],
};