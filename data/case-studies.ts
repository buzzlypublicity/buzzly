export type Locale = 'en' | 'ar';

export const CASE_STUDIES = [
  {
    slug: 'education-sector-campaign',
    clientName: { en: 'Leading Private School', ar: 'مدرسة خاصة رائدة' },
    industry: { en: 'Education', ar: 'التعليم' },
    service: { en: 'Social Media & Admissions Campaign', ar: 'حملة سوشيال ميديا وقبول' },
    heroImage: '/images/work/education.jpg',
    logo: '/images/clients/school-logo.png', // Agar logo ho to
    challenge: {
      en: 'The school was struggling to fill new seats for the upcoming academic year. Despite having a great curriculum, their digital presence was outdated, and they were not reaching the right parents in Bahrain.',
      ar: 'كانت المدرسة تواجه صعوبة في ملء المقاعد الجديدة للعام الدراسي القادم. على الرغم من وجود منهج رائع، إلا أن حضورهم الرقمي كان قديماً، ولم يصلوا إلى أولياء الأمور المناسبين في البحرين.'
    },
    strategy: {
      en: 'We built a 3-month "Admissions Open" campaign. We focused on showcasing the campus life, student success stories, and the modern facilities through high-quality video reels. We also targeted specific neighborhoods in Bahrain with Meta Ads.',
      ar: 'قمنا ببناء حملة "التسجيل مفتوح" لمدة 3 أشهر. ركزنا على إظهار حياة الحرم الجامعي وقصص نجاح الطلاب والمرافق الحديثة من خلال مقاطع فيديو عالية الجودة. كما استهدفنا أحياء محددة في البحرين بإعلانات ميتا.'
    },
    executionImages: [
      '/images/work/edu-1.jpg',
      '/images/work/edu-2.jpg',
      '/images/work/edu-3.jpg'
    ],
    results: [
      { value: '+140%', label: { en: 'Increase in Admissions Inquiries', ar: 'زيادة في استفسارات القبول' } },
      { value: '3.5M+', label: { en: 'Total Video Views', ar: 'إجمالي مشاهدات الفيديو' } },
      { value: 'O(1)', label: { en: 'Cost per Lead (Reduced)', ar: 'انخفاض تكلفة العميل المحتمل' } }
    ]
  },
  {
    slug: 'real-estate-launch',
    clientName: { en: 'Premium Real Estate Developer', ar: 'مطور عقاري متميز' },
    industry: { en: 'Real Estate', ar: 'العقارات' },
    service: { en: 'Brand Strategy & Digital Ads', ar: 'استراتيجية العلامة والإعلانات الرقمية' },
    heroImage: '/images/work/real-estate.jpg',
    challenge: {
      en: 'A new luxury residential project needed to generate high-quality leads before the launch. The market was saturated with similar projects, making it hard to stand out.',
      ar: 'احتاج مشروع سكني فاخر جديد إلى توليد عملاء محتملين ذوي جودة عالية قبل الإطلاق. كان السوق مشبعاً بمشاريع مماثلة، مما جعل التميز صعباً.'
    },
    strategy: {
      en: 'We positioned the project not just as a home, but as a lifestyle investment. We utilized drone videography, 3D renders, and targeted LinkedIn + Meta ads aimed at high-net-worth individuals in the GCC.',
      ar: 'قمنا بتموضع المشروع ليس مجرد منزل، بل كاستثمار في نمط الحياة. استخدمنا التصوير بالطائرات بدون طيار، والصور ثلاثية الأبعاد، وإعلانات لينكدإن وميتا المستهدفة للأفراد ذوي الثروات العالية في دول الخليج.'
    },
    executionImages: [
      '/images/work/re-1.webp',
      '/images/work/re-2.jpg'
    ],
    results: [
      { value: '500+', label: { en: 'Qualified Leads Generated', ar: 'عميل محتمل مؤهل' } },
      { value: '4.5x', label: { en: 'Return on Ad Spend (ROAS)', ar: 'عائد الإنفاق الإعلاني' } },
      { value: '100%', label: { en: 'Inventory Sold in 6 Months', ar: 'بيع المخزون في 6 أشهر' } }
    ]
  },
  {
    slug: 'fnb-influencer-campaign',
    clientName: { en: 'Regional F&B Chain', ar: 'سلسلة مطاعم إقليمية' },
    industry: { en: 'F&B & Hospitality', ar: 'المطاعم والضيافة' },
    service: { en: 'Influencer Marketing & Content', ar: 'تسويق المؤثرين والمحتوى' },
    heroImage: '/images/work/fnb.jpg',
    challenge: {
      en: 'A popular restaurant chain wanted to launch a new seasonal menu and drive footfall to their Bahrain branches during a highly competitive month.',
      ar: 'أرادت سلسلة مطاعم شهيرة إطلاق قائمة موسمية جديدة وزيادة الزيارات إلى فروعهم في البحرين خلال شهر شديد التنافسية.'
    },
    strategy: {
      en: 'Instead of generic ads, we invited 15 local food influencers for an exclusive tasting event. The generated content was then used as "Spark Ads" on TikTok and Instagram, amplifying the reach to their targeted followers.',
      ar: 'بدلاً من الإعلانات العامة، دعونا 15 مؤثراً محلياً للطعام لحضور حدث تذوق حصري. تم استخدام المحتوى الذي تم إنشاؤه كـ "إعلانات شرارة" على تيك توك وإنستغرام، مما أدى إلى تضخيم الوصول إلى متابعيهم المستهدفين.'
    },
    executionImages: [
      '/images/work/fnb-1.jpg',
      '/images/work/fnb-2.jpg',
      '/images/work/fnb-3.jpg'
    ],
    results: [
      { value: '+85%', label: { en: 'Increase in Weekend Bookings', ar: 'زيادة في حجوزات عطلة نهاية الأسبوع' } },
      { value: '1.2M', label: { en: 'Organic Reach', ar: 'وصول عضوي' } },
      { value: '25k', label: { en: 'New Followers Gained', ar: 'متابع جديد' } }
    ]
  },
  {
    slug: 'retail-ecommerce',
    clientName: { en: 'Boutique Fashion Retailer', ar: 'متجر أزياء راقي' },
    industry: { en: 'Retail & E-Commerce', ar: 'التجزئة والتجارة الإلكترونية' },
    service: { en: 'Web Development & Photography', ar: 'تطوير الويب والتصوير' },
    heroImage: '/images/work/retail.jpg',
    logo: '/images/clients/retail-logo.png',
    challenge: {
      en: 'The client had a strong physical presence but zero online sales. Their old website was slow, not mobile-friendly, and did not have a payment gateway, causing them to lose customers to competitors.',
      ar: 'كان العميل يتمتع بحضور قوي على أرض الواقع ولكن بدون مبيعات عبر الإنترنت. كان موقعهم القديم بطيئاً وغير متوافق مع الجوال ويفتقر إلى بوابة دفع، مما أدى إلى فقدان العملاء لصالح المنافسين.'
    },
    strategy: {
      en: 'We completely rebuilt their website on a modern, lightning-fast framework with a seamless checkout experience. We also did a professional photoshoot of their latest collection to ensure the product images looked premium and trustworthy.',
      ar: 'أعدنا بناء موقعهم بالكامل على إطار عمل حديث وسريع للغاية مع تجربة دفع سلسة. كما قمنا بجلسة تصوير احترافية لمجموعتهم الأخيرة لضمان ظهور صور المنتجات بمظهر متميز وموثوق.'
    },
    executionImages: [
      '/images/work/retail-1.jpg',
      '/images/work/retail-2.jpg',
      '/images/work/retail-3.jpg'
    ],
    results: [
      { value: '+210%', label: { en: 'Increase in Online Sales', ar: 'زيادة في المبيعات الإلكترونية' } },
      { value: '1.2s', label: { en: 'Page Load Speed', ar: 'سرعة تحميل الصفحة' } },
      { value: '4.8/5', label: { en: 'Customer Satisfaction', ar: 'رضا العملاء' } }
    ]
  }
];