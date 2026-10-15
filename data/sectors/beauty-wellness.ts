import type { SectorContent } from './types';

export const beautyWellness: SectorContent = {
  slug: 'beauty-wellness',
  number: '03',
  icon: 'Sparkles',
  accent: 'brand',
  featured: false,
  translations: {
    en: {
      name: 'Beauty & Wellness',
      tagline: 'Salons, spas, skincare & self-care brands.',
      hero: {
        eyebrow: 'Sector 03',
        headline: 'Turn self-care into a habit — and habits into loyal clients.',
        subheadline:
          'We help salons, spas, skincare brands, and wellness studios build steady bookings, repeat visits, and a reputation that sells for you.',
      },
      why: 'Beauty and wellness is personal. Clients choose based on trust, mood, and results — not price alone. We build campaigns that earn that trust at scale.',
      whatWeDo: {
        title: 'What we do for beauty brands',
        subtitle: 'Campaigns built around bookings, treatments, and trust.',
        items: [
          { title: 'Booking Campaigns', description: 'Ads and offers that convert into actual appointments, not just likes.' },
          { title: 'Before & After Content', description: 'Real transformations shot and edited for social proof.' },
          { title: 'Service Menus & Bundles', description: 'Packaging, pricing, and upselling strategy for treatments.' },
          { title: 'Influencer Seeding', description: 'Beauty creators whose audiences are ready to book.' },
          { title: 'Review & Reputation', description: 'Google, Instagram, and platform reviews turned into assets.' },
          { title: 'Retention Flows', description: 'WhatsApp and email campaigns that bring clients back on schedule.' },
        ],
      },
      approach: {
        title: 'How we approach beauty',
        subtitle: 'Trust first. Then bookings. Then scale.',
        steps: [
          { number: '01', title: 'Brand Audit', description: 'We review your current presence, reviews, and competitor positioning.' },
          { number: '02', title: 'Offer Design', description: 'Bundles, pricing, and seasonal offers built to convert.' },
          { number: '03', title: 'Content Sprint', description: 'Before-after, treatment videos, and testimonials produced in one push.' },
          { number: '04', title: 'Bookings & Retention', description: 'Ads drive traffic, retention flows drive repeat visits.' },
        ],
      },
      offerings: {
        title: 'What we deliver',
        subtitle: 'The full beauty marketing stack.',
        items: [
          'Booking-focused ad campaigns',
          'Before & after content',
          'Treatment videos & reels',
          'Influencer collaborations',
          'Google & Instagram reputation',
          'WhatsApp retention flows',
          'Seasonal offer planning',
        ],
      },
      cta: {
        title: 'Ready to fill your calendar?',
        subtitle: "Let's build a booking system that works while you focus on your clients.",
        buttonPrimary: 'Book a beauty consultation',
        buttonSecondary: 'See our process',
      },
    },
    ar: {
      name: 'التجميل والعناية الشخصية',
      tagline: 'صالونات، سبا، علامات العناية بالبشرة والعناية الذاتية.',
      hero: {
        eyebrow: 'القطاع 03',
        headline: 'حوّل العناية الذاتية إلى عادة — والعادة إلى عميل دائم.',
        subheadline:
          'نساعد الصالونات والسبا وعلامات العناية بالبشرة واستوديوهات العافية على بناء حجوزات ثابتة وزيارات متكررة وسمعة تبيع نيابة عنك.',
      },
      why: 'التجميل والعناية الشخصية مسألة شخصية. العملاء يختارون بناءً على الثقة والمزاج والنتائج — لا السعر وحده. نبني حملات تكسب هذه الثقة على نطاق واسع.',
      whatWeDo: {
        title: 'ما نقوم به لعلامات التجميل',
        subtitle: 'حملات مبنية حول الحجوزات والعلاجات والثقة.',
        items: [
          { title: 'حملات الحجز', description: 'إعلانات وعروض تتحول إلى مواعيد فعلية، لا مجرد إعجابات.' },
          { title: 'محتوى قبل وبعد', description: 'تحولات حقيقية مصوّرة ومحرّرة كدليل اجتماعي.' },
          { title: 'قوائم الخدمات والحزم', description: 'استراتيجية تغليف وتسعير وبيع إضافي للعلاجات.' },
          { title: 'تعاون المؤثرين', description: 'صنّاع جمال جماهيرهم جاهزة للحجز.' },
          { title: 'التقييمات والسمعة', description: 'تقييمات جوجل وإنستغرام والمنصات تتحول إلى أصول.' },
          { title: 'تدفقات الاحتفاظ', description: 'حملات واتساب وبريد تُعيد العملاء في الوقت المحدد.' },
        ],
      },
      approach: {
        title: 'كيف نتعامل مع التجميل',
        subtitle: 'الثقة أولاً. ثم الحجوزات. ثم التوسع.',
        steps: [
          { number: '01', title: 'تدقيق العلامة', description: 'نراجع حضورك وتقييماتك وتموضع المنافسين.' },
          { number: '02', title: 'تصميم العروض', description: 'حزم وأسعار وعروض موسمية مصممة للتحويل.' },
          { number: '03', title: 'سبرنت المحتوى', description: 'قبل-بعد وفيديوهات علاجات وشهادات في دفعة واحدة.' },
          { number: '04', title: 'الحجوزات والاحتفاظ', description: 'الإعلانات تجلب الزيارات، وتدفقات الاحتفاظ تُعيدها.' },
        ],
      },
      offerings: {
        title: 'ما نقدمه',
        subtitle: 'منظومة تسويق كاملة للتجميل.',
        items: [
          'حملات إعلانية تركز على الحجز',
          'محتوى قبل وبعد',
          'فيديوهات علاجات وريلز',
          'تعاونات مع مؤثرين',
          'سمعة جوجل وإنستغرام',
          'تدفقات واتساب للاحتفاظ',
          'تخطيط عروض موسمية',
        ],
      },
      cta: {
        title: 'جاهز لملء تقويمك؟',
        subtitle: 'لنبنِ نظام حجز يعمل بينما تركز على عملائك.',
        buttonPrimary: 'احجز استشارة تجميل',
        buttonSecondary: 'اطّلع على منهجنا',
      },
    },
  },
};