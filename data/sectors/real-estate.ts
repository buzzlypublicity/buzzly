import type { SectorContent } from './types';

export const realEstate: SectorContent = {
  slug: 'real-estate',
  number: '04',
  icon: 'Building2',
  accent: 'accent',
  featured: false,
  translations: {
    en: {
      name: 'Real Estate & Property',
      tagline: 'Developers, brokers, and property brands.',
      hero: {
        eyebrow: 'Sector 04',
        headline: 'Turn listings into leads — and leads into keys.',
        subheadline:
          'We help developers, brokers, and property brands generate qualified leads, build trust, and move inventory faster.',
      },
      why: 'Real estate is high-ticket and high-consideration. Every lead costs more to win — so every campaign has to work harder. We build funnels that respect that math.',
      whatWeDo: {
        title: 'What we do for real estate',
        subtitle: 'Campaigns built around qualified leads and closings.',
        items: [
          { title: 'Project Launch Campaigns', description: 'Pre-launch teasers, launch day assets, and post-launch momentum.' },
          { title: 'Lead Generation Ads', description: 'Meta and Google campaigns optimized for qualified inquiries, not clicks.' },
          { title: 'Property Content', description: 'Photography, drone shots, video walkthroughs, and 3D tours.' },
          { title: 'Landing Pages', description: 'High-converting pages built specifically for each project or unit type.' },
          { title: 'CRM Integration', description: 'Leads routed into your CRM with tracking and follow-up flows.' },
          { title: 'Brand Building', description: 'Positioning developers and agencies as market authorities.' },
        ],
      },
      approach: {
        title: 'How we approach real estate',
        subtitle: 'Lead quality over lead quantity. Always.',
        steps: [
          { number: '01', title: 'Market Study', description: 'We study the property market, competitors, and buyer profiles.' },
          { number: '02', title: 'Funnel Design', description: 'From ad to landing page to CRM — every step mapped.' },
          { number: '03', title: 'Content Production', description: 'Photography, video, and copy that sell the lifestyle, not just the unit.' },
          { number: '04', title: 'Optimize for Closings', description: 'Leads tracked end-to-end, campaigns refined for real sales.' },
        ],
      },
      offerings: {
        title: 'What we deliver',
        subtitle: 'The full real estate marketing stack.',
        items: [
          'Project launch campaigns',
          'Lead generation ads',
          'Photography & drone',
          'Video walkthroughs',
          'Landing page builds',
          'CRM integration',
          'Monthly reporting',
        ],
      },
      cta: {
        title: 'Ready to fill your pipeline?',
        subtitle: "Let's build a campaign that delivers qualified buyers, not just clicks.",
        buttonPrimary: 'Book a real estate consultation',
        buttonSecondary: 'See our process',
      },
    },
    ar: {
      name: 'العقارات والإسكان',
      tagline: 'مطورون، وسطاء، وعلامات عقارية.',
      hero: {
        eyebrow: 'القطاع 04',
        headline: 'حوّل القوائم إلى عملاء — والعملاء إلى مفاتيح.',
        subheadline:
          'نساعد المطورين والوسطاء والعلامات العقارية على توليد عملاء مؤهلين وبناء الثقة وتحريك المخزون بشكل أسرع.',
      },
      why: 'العقارات ذات قيمة عالية وتفكير طويل. كل عميل محتمل يكلف أكثر للفوز — لذا يجب أن تعمل كل حملة بجهد أكبر. نبني قنوات تحترم هذه المعادلة.',
      whatWeDo: {
        title: 'ما نقوم به للعقارات',
        subtitle: 'حملات مبنية حول العملاء المؤهلين والإغلاقات.',
        items: [
          { title: 'حملات إطلاق المشاريع', description: 'تلميحات ما قبل الإطلاق، أصول يوم الإطلاق، وزخم ما بعده.' },
          { title: 'إعلانات توليد العملاء', description: 'حملات ميتا وجوجل محسّنة للاستفسارات المؤهلة، لا للنقرات.' },
          { title: 'محتوى العقارات', description: 'تصوير وطائرات مسيّرة وجولات فيديو وجولات ثلاثية الأبعاد.' },
          { title: 'صفحات هبوط', description: 'صفحات عالية التحويل مصممة خصيصًا لكل مشروع أو نوع وحدة.' },
          { title: 'تكامل CRM', description: 'العملاء يوجهون إلى نظام CRM مع تتبع وتدفقات متابعة.' },
          { title: 'بناء العلامة', description: 'تموضع المطورين والوكالات كسلطات سوقية.' },
        ],
      },
      approach: {
        title: 'كيف نتعامل مع العقارات',
        subtitle: 'جودة العملاء قبل الكمية. دائمًا.',
        steps: [
          { number: '01', title: 'دراسة السوق', description: 'ندرس سوق العقارات والمنافسين وملفات المشترين.' },
          { number: '02', title: 'تصميم القناة', description: 'من الإعلان إلى صفحة الهبوط إلى CRM — كل خطوة مرسومة.' },
          { number: '03', title: 'إنتاج المحتوى', description: 'تصوير وفيديو ونصوص تبيع نمط الحياة، لا الوحدة فقط.' },
          { number: '04', title: 'التحسين للإغلاق', description: 'العملاء يُتابعون من البداية للنهاية، والحملات تُحسَّن للمبيعات الفعلية.' },
        ],
      },
      offerings: {
        title: 'ما نقدمه',
        subtitle: 'منظومة تسويق عقاري كاملة.',
        items: [
          'حملات إطلاق المشاريع',
          'إعلانات توليد العملاء',
          'تصوير وطائرات مسيّرة',
          'جولات فيديو',
          'بناء صفحات الهبوط',
          'تكامل CRM',
          'تقارير شهرية',
        ],
      },
      cta: {
        title: 'جاهز لملء خط أنابيبك؟',
        subtitle: 'لنبنِ حملة تسلّم مشترين مؤهلين، لا نقرات فقط.',
        buttonPrimary: 'احجز استشارة عقارية',
        buttonSecondary: 'اطّلع على منهجنا',
      },
    },
  },
};