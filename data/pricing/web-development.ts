import type { PricingCategory } from './types';

export const webDevPricing: PricingCategory = {
  id: 'web-development',
  title: {
    en: 'Web Development',
    ar: 'تطوير المواقع الإلكترونية',
  },
  description: {
    en: 'Professional, fast & high-converting web solutions tailored for your business in Bahrain.',
    ar: 'حلول ويب احترافية وسريعة وعالية التحويل مصممة خصيصاً لعملك في البحرين.',
  },
  pricingType: {
    en: 'One-time Project',
    ar: 'مشروع لمرة واحدة',
  },
  packages: [
    {
      id: 'basic',
      name: { en: 'Basic Plan', ar: 'الخطة الأساسية' },
      price: 'BD 49',
      features: [
        { en: 'Ideal for Landing Pages & Single-Page Sites', ar: 'مثالي لصفحات الهبوط والمواقع ذات الصفحة الواحدة' },
        { en: 'With Domain & Hosting (Provided by Client)', ar: 'مع النطاق والاستضافة (يقدمها العميل)' },
        { en: 'Mobile & Tablet Fully Responsive', ar: 'متجاوب بالكامل مع الجوال والتابلت' },
        { en: 'Contact Form Integration', ar: 'دمج نموذج الاتصال' },
        { en: 'Social Media Links Integration', ar: 'دمج روابط وسائل التواصل' },
        { en: 'Fast Loading Speed Performance', ar: 'أداء تحميل سريع' },
        { en: 'Basic SEO Setup', ar: 'إعداد SEO أساسي' },
        { en: 'Modern & Clean UI Layout', ar: 'تصميم واجهة حديث ونظيف' },
        { en: '100% Launch Ready Solution', ar: 'حل جاهز للإطلاق 100%' },
      ],
    },
    {
      id: 'standard',
      name: { en: 'Standard Plan', ar: 'الخطة القياسية' },
      price: 'BD 99',
      period: { en: '+ D/H', ar: '+ النطاق والاستضافة' }, // Domain & Hosting
      isPopular: true,
      features: [
        { en: '5 to 6 Pages Professional Website', ar: 'موقع احترافي من 5 إلى 6 صفحات' },
        { en: 'Dynamic & Modern Design', ar: 'تصميم ديناميكي وحديث' },
        { en: 'Content Management System (CMS)', ar: 'نظام إدارة المحتوى (CMS)' },
        { en: 'WhatsApp Chat Integration', ar: 'دمج محادثة واتساب' },
        { en: 'Speed & Performance Optimization', ar: 'تحسين السرعة والأداء' },
        { en: 'SEO Friendly Architecture', ar: 'بنية صديقة لـ SEO' },
        { en: 'Domain & Hosting Setup', ar: 'إعداد النطاق والاستضافة' },
        { en: 'Advanced Security', ar: 'أمان متقدم' },
        { en: 'Fully Ready to Launch', ar: 'جاهز تماماً للإطلاق' },
      ],
    },
    {
      id: 'business',
      name: { en: 'Business Plan', ar: 'خطة الأعمال' },
      price: 'BD 189',
      period: { en: '+ D/H', ar: '+ النطاق والاستضافة' },
      features: [
        { en: 'Complete E-Commerce / Corporate Site', ar: 'موقع تجارة إلكترونية / شركات كامل' },
        { en: '8 to 10 Pages & Unlimited Product Uploads', ar: '8 إلى 10 صفحات وتحميل منتجات غير محدود' },
        { en: 'Payment Gateway Integration', ar: 'دمج بوابة الدفع' },
        { en: 'Advanced Security & SSL Setup', ar: 'أمان متقدم وإعداد SSL' },
        { en: 'Premium Responsive Custom Design', ar: 'تصميم مخصص متجاوب متميز' },
        { en: 'Full On-Page SEO Optimization', ar: 'تحسين SEO كامل داخل الصفحة' },
        { en: 'WhatsApp Chat & Lead Capturing', ar: 'محادثة واتساب والتقاط العملاء المحتملين' },
        { en: 'Domain & Hosting Setup', ar: 'إعداد النطاق والاستضافة' },
        { en: 'Complete Turnkey Launch', ar: 'إطلاق متكامل جاهز' },
      ],
    },
  ],
};