import type { PricingCategory } from './types';

export const mobileAppPricing: PricingCategory = {
  id: 'mobile-app',
  title: {
    en: 'Mobile App Development',
    ar: 'تطوير تطبيقات الجوال',
  },
  description: {
    en: 'Native iOS & Android apps built for your business — from customer apps to internal tools.',
    ar: 'تطبيقات iOS وAndroid أصلية مبنية لأعمالك — من تطبيقات العملاء إلى الأدوات الداخلية.',
  },
  pricingType: {
    en: 'Custom Quote',
    ar: 'عرض سعر مخصص',
  },
  packages: [
    {
      id: 'mobile-app-custom',
      name: { en: 'Custom Mobile App', ar: 'تطبيق جوال مخصص' },
      price: 'Contact Sales',
      period: { en: 'Custom Quote', ar: 'عرض مخصص' },
      features: [
        { en: 'Native iOS & Android (React Native)', ar: 'iOS وAndroid أصلي (React Native)' },
        { en: 'Custom UI/UX design tailored to your brand', ar: 'تصميم UI/UX مخصص لعلامتك' },
        { en: 'Push notifications & user authentication', ar: 'إشعارات فورية ومصادقة المستخدم' },
        { en: 'Backend API & database setup', ar: 'إعداد API وقاعدة البيانات' },
        { en: 'App Store & Google Play submission', ar: 'النشر في App Store وGoogle Play' },
        { en: 'Post-launch support & maintenance', ar: 'دعم وصيانة بعد الإطلاق' },
        { en: 'Bilingual interface (Arabic + English)', ar: 'واجهة ثنائية اللغة' },
      ],
    },
  ],
};

export const posSoftwarePricing: PricingCategory = {
  id: 'pos-software',
  title: {
    en: 'POS Software',
    ar: 'برنامج نقاط البيع (POS)',
  },
  description: {
    en: 'Point-of-sale software for local shops, restaurants, and retail — sell smarter, track stock, manage staff.',
    ar: 'برنامج نقاط بيع للمتاجر المحلية والمطاعم والتجزئة — بِع بذكاء، تتبَّع المخزون، أدِر فريقك.',
  },
  pricingType: {
    en: 'Custom Quote',
    ar: 'عرض سعر مخصص',
  },
  packages: [
    {
      id: 'pos-custom',
      name: { en: 'POS Software', ar: 'برنامج POS' },
      price: 'Contact Sales',
      period: { en: 'Custom Quote', ar: 'عرض مخصص' },
      features: [
        { en: 'Fast touch-friendly billing interface', ar: 'واجهة فوترة سريعة وصديقة للمس' },
        { en: 'Product & inventory management', ar: 'إدارة المنتجات والمخزون' },
        { en: 'Barcode scanner & receipt printer support', ar: 'دعم ماسح الباركود وطابعة الفواتير' },
        { en: 'Sales reports & daily summary', ar: 'تقارير المبيعات وملخص يومي' },
        { en: 'Multi-user staff accounts with roles', ar: 'حسابات موظفين متعددة مع أدوار' },
        { en: 'Bilingual interface (Arabic + English)', ar: 'واجهة ثنائية اللغة' },
        { en: 'Local hardware setup & training', ar: 'إعداد الأجهزة المحلية والتدريب' },
      ],
    },
  ],
};