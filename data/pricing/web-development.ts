
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
      price: 'BD 89',
      features: [
        {
          en: '2 to 3 Professional Website Pages',
          ar: 'من صفحتين إلى 3 صفحات احترافية للموقع',
        },
        {
          en: 'Domain & Hosting (Provided by Client)',
          ar: 'النطاق والاستضافة (يقدمهما العميل)',
        },
        {
          en: 'Mobile & Tablet Fully Responsive',
          ar: 'متجاوب بالكامل مع الجوال والتابلت',
        },
        {
          en: 'Contact Form Integration',
          ar: 'دمج نموذج الاتصال',
        },
        {
          en: 'Social Media Links Integration',
          ar: 'دمج روابط وسائل التواصل الاجتماعي',
        },
        {
          en: 'Fast Loading Speed Performance',
          ar: 'أداء سريع في تحميل الصفحات',
        },
        {
          en: 'Professional SEO Setup',
          ar: 'إعداد تحسين محركات البحث الاحترافي (SEO)',
        },
        {
          en: 'Modern & Clean UI Layout',
          ar: 'تصميم واجهة مستخدم حديثة ونظيفة',
        },
        {
          en: '100% Launch-Ready Solution',
          ar: 'حل جاهز للإطلاق بالكامل',
        },
      ],
    },
    {
      id: 'standard',
      name: { en: 'Standard Plan', ar: 'الخطة القياسية' },
      price: 'BD 189',
      period: { en: '+ D/H', ar: '+ النطاق والاستضافة' },
      isPopular: true,
      features: [
        {
          en: '5 to 6 Pages Professional Website',
          ar: 'موقع احترافي يتكون من 5 إلى 6 صفحات',
        },
        {
          en: 'Dynamic & Modern Design',
          ar: 'تصميم ديناميكي وحديث',
        },
        {
          en: 'Optional CMS Installation (Content Management System)',
          ar: 'تثبيت اختياري لنظام إدارة المحتوى (CMS)',
        },
        {
          en: 'Professional SEO Optimization',
          ar: 'تحسين محركات البحث الاحترافي (SEO)',
        },
        {
          en: 'Advanced Ai ChatBot Integrations',
          ar: 'التكامل مع واجهات API وخدمات الطرف الثالث',
        },
        {
          en: 'WhatsApp Chat Integration',
          ar: 'دمج محادثة واتساب',
        },
        {
          en: 'Speed & Performance Optimization',
          ar: 'تحسين السرعة والأداء',
        },
        {
          en: 'SEO-Friendly Website Architecture',
          ar: 'بنية موقع متوافقة مع SEO',
        },
        {
          en: 'Domain & Hosting Setup',
          ar: 'إعداد النطاق والاستضافة',
        },
        {
          en: 'Advanced Security',
          ar: 'أمان متقدم',
        },
        {
          en: 'Fully Ready to Launch',
          ar: 'جاهز تماماً للإطلاق',
        },
      ],
    },
    {
      id: 'business',
      name: { en: 'Business Plan', ar: 'خطة الأعمال' },
      price: 'BD 389',
      period: { en: '+ D/H', ar: '+ النطاق والاستضافة' },
      features: [
        {
          en: 'Complete E-Commerce / Corporate Website',
          ar: 'موقع متكامل للتجارة الإلكترونية أو الشركات',
        },
        {
          en: '8 to 10 Pages & Unlimited Product Uploads',
          ar: 'من 8 إلى 10 صفحات مع إمكانية رفع منتجات غير محدودة',
        },
        {
          en: 'Payment Gateway Integration',
          ar: 'دمج بوابة الدفع الإلكتروني',
        },
        {
          en: 'Advanced Security & SSL Setup',
          ar: 'أمان متقدم وإعداد SSL',
        },
        {
          en: 'Premium Responsive Custom Design',
          ar: 'تصميم مخصص متميز ومتجاوب',
        },
        {
          en: 'Professional SEO with Technical Analysis',
          ar: 'تحسين محركات البحث الاحترافي مع التحليل التقني',
        },
        {
          en: 'Advanced Ai ChatBot Integrations',
          ar: 'التكامل مع واجهات API وخدمات الطرف الثالث المتقدمة',
        },
        {
          en: 'WhatsApp Chat & Lead Capturing',
          ar: 'محادثة واتساب وجمع بيانات العملاء المحتملين',
        },
        {
          en: 'Domain & Hosting Setup',
          ar: 'إعداد النطاق والاستضافة',
        },
      ],
    },
  ],
};
