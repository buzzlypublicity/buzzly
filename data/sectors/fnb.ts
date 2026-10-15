import type { SectorContent } from './types';

export const fnb: SectorContent = {
  slug: 'fnb',
  number: '01',
  icon: 'UtensilsCrossed',
  accent: 'brand',
  featured: true,
  translations: {
    en: {
      name: 'F&B & Hospitality',
      tagline: 'Restaurants, cafés, hotels & resorts.',
      hero: {
        eyebrow: 'Sector 01',
        headline: 'Fill seats, build regulars, own the neighbourhood.',
        subheadline:
          'We help restaurants, cafés, hotels, and hospitality brands turn attention into footfall — and first-time guests into loyal regulars.',
      },
      why: 'F&B is one of the toughest marketing categories — margins are tight, competition is fierce, and trends shift weekly. We build campaigns that work in that environment.',
      whatWeDo: {
        title: 'What we do for F&B brands',
        subtitle: 'Campaigns built around covers, orders, and reviews.',
        items: [
          { title: 'Menu & Launch Campaigns', description: 'New menu drops, seasonal offerings, and launch moments that drive reservations.' },
          { title: 'Influencer Seeding', description: 'Food bloggers and micro-influencers whose audiences actually book tables.' },
          { title: 'Location-Based Ads', description: 'Meta and Google campaigns targeting diners within a 5km radius.' },
          { title: 'Review Management', description: 'Google, TripAdvisor, and Zomato reputation strategy.' },
          { title: 'Content Production', description: 'Food photography, reels, and behind-the-scenes storytelling.' },
          { title: 'Loyalty Campaigns', description: 'Email and WhatsApp campaigns that bring guests back.' },
        ],
      },
      approach: {
        title: 'How we approach F&B',
        subtitle: 'Every neighbourhood is different. Every menu is different.',
        steps: [
          { number: '01', title: 'Local Audit', description: 'We study your location, competitors, and diner demographics.' },
          { number: '02', title: 'Campaign Design', description: 'Offers, creatives, and placements tailored to your price point and audience.' },
          { number: '03', title: 'Content Sprint', description: 'Photoshoot, reels, and copy produced to run for months.' },
          { number: '04', title: 'Measure & Refine', description: 'Covers, orders, and reservations tracked — campaigns refined monthly.' },
        ],
      },
      offerings: {
        title: 'What we deliver',
        subtitle: 'The full F&B marketing stack.',
        items: [
          'Menu photography & reels',
          'Google Business optimization',
          'Meta & TikTok location ads',
          'Influencer collaborations',
          'Seasonal campaign planning',
          'WhatsApp loyalty flows',
          'Review & reputation management',
        ],
      },
      cta: {
        title: 'Ready to fill more tables?',
        subtitle: "Let's build a campaign around your location, your menu, and your regulars.",
        buttonPrimary: 'Book an F&B consultation',
        buttonSecondary: 'See our process',
      },
    },
    ar: {
      name: 'المطاعم والضيافة',
      tagline: 'مطاعم، مقاهي، فنادق ومنتجعات.',
      hero: {
        eyebrow: 'القطاع 01',
        headline: 'املأ الطاولات، وابنِ عملاء دائمين، وسيطر على الحي.',
        subheadline:
          'نساعد المطاعم والمقاهي والفنادق وعلامات الضيافة على تحويل الانتباه إلى زيارات — والزائر الأول إلى عميل دائم.',
      },
      why: 'قطاع المطاعم والضيافة من أصعب فئات التسويق — هوامش ضيقة، منافسة شرسة، وترندات تتغير أسبوعيًا. نبني حملات تعمل في هذه البيئة.',
      whatWeDo: {
        title: 'ما نقوم به لعلامات المطاعم',
        subtitle: 'حملات مبنية حول الطلبات والحجوزات والتقييمات.',
        items: [
          { title: 'حملات إطلاق المنيو', description: 'إطلاق قوائم جديدة وعروض موسمية ولحظات تُحرّك الحجوزات.' },
          { title: 'تعاون مع المؤثرين', description: 'مدونو طعام ومؤثرون صغار تتوقع جماهيرهم الطاولات فعلاً.' },
          { title: 'إعلانات جغرافية', description: 'حملات ميتا وجوجل تستهدف المطاعم في نطاق 5 كلم.' },
          { title: 'إدارة التقييمات', description: 'استراتيجية سمعة على جوجل وTripAdvisor وZomato.' },
          { title: 'إنتاج المحتوى', description: 'تصوير طعام وريلز وحكايات من الكواليس.' },
          { title: 'حملات الولاء', description: 'حملات بريد وواتساب تُعيد الضيوف.' },
        ],
      },
      approach: {
        title: 'كيف نتعامل مع المطاعم',
        subtitle: 'كل حي مختلف. كل منيو مختلف.',
        steps: [
          { number: '01', title: 'تحليل محلي', description: 'ندرس موقعك ومنافسيك وديموغرافية روادك.' },
          { number: '02', title: 'تصميم الحملة', description: 'عروض ومحتوى ومواضع مخصصة لمستواك السعري وجمهورك.' },
          { number: '03', title: 'سبرنت المحتوى', description: 'جلسة تصوير وريلز ونصوص تكفي لأشهر.' },
          { number: '04', title: 'القياس والتحسين', description: 'الطلبات والحجوزات تُتابع — والحملات تُحسَّن شهريًا.' },
        ],
      },
      offerings: {
        title: 'ما نقدمه',
        subtitle: 'منظومة تسويق كاملة للمطاعم.',
        items: [
          'تصوير منيو وريلز',
          'تحسين Google Business',
          'إعلانات ميتا وتيك توك جغرافية',
          'تعاونات مع مؤثرين',
          'تخطيط حملات موسمية',
          'تدفقات واتساب للولاء',
          'إدارة التقييمات والسمعة',
        ],
      },
      cta: {
        title: 'جاهز لملء المزيد من الطاولات؟',
        subtitle: 'لنبنِ حملة حول موقعك ومنيوك وعملائك الدائمين.',
        buttonPrimary: 'احجز استشارة F&B',
        buttonSecondary: 'اطّلع على منهجنا',
      },
    },
  },
};