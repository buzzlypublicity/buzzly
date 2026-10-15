import type { ServiceContent } from './types';

export const influencerMarketing: ServiceContent = {
  slug: 'influencer-marketing',
  number: '05',
  icon: 'Users',
  accent: 'brand',
  translations: {
    en: {
      title: 'Influencer Marketing',
      tagline: 'Reach that feels like a recommendation.',
      hero: {
        eyebrow: 'Service 05',
        headline: 'Partner with creators your audience already trusts.',
        subheadline:
          'Creator partnerships built on audience fit and authentic reach — not vanity metrics or paid shoutouts.',
      },
      overview:
        'We match your brand with the right creators, negotiate the deal, brief the content, and measure what actually moved.',
      whatWeDo: {
        title: 'What we do',
        subtitle: 'The full creator pipeline, managed end-to-end.',
        items: [
          { title: 'Creator Sourcing', description: 'Vetted creators whose audiences match yours.' },
          { title: 'Outreach & Negotiation', description: 'Deals structured for performance, not fame.' },
          { title: 'Campaign Briefs', description: 'Clear briefs that protect both brand and creator voice.' },
          { title: 'Content Review', description: 'Approval workflows that don\'t kill creativity.' },
          { title: 'Amplification', description: 'Boosting the best creator content for scale.' },
          { title: 'Performance Reporting', description: 'Real metrics — reach, engagement, and conversions.' },
        ],
      },
      process: {
        title: 'How we run it',
        subtitle: 'Built on fit, not follower count.',
        steps: [
          { number: '01', title: 'Audience Mapping', description: 'Who you need to reach and where they live online.' },
          { number: '02', title: 'Creator Selection', description: 'A shortlist matched on audience, values, and tone.' },
          { number: '03', title: 'Campaign Launch', description: 'Briefs sent, deals signed, content scheduled.' },
          { number: '04', title: 'Measure & Optimize', description: 'What worked gets scaled. What didn\'t, doesn\'t get repeated.' },
        ],
      },
      deliverables: {
        title: 'What you get',
        subtitle: 'A creator program built around results.',
        items: [
          'Audience & creator mapping',
          'Vetted creator shortlist',
          'Negotiated contracts',
          'Campaign brief & content direction',
          'Content approval workflows',
          'Amplification strategy',
          'Full performance report',
        ],
      },
      faqs: {
        title: 'Frequently asked',
        items: [
          {
            question: 'How do you choose creators?',
            answer: 'Audience fit, engagement quality, brand alignment, and content style — follower count is one factor, not the deciding one.',
          },
          {
            question: 'Do you handle contracts and payments?',
            answer: 'Yes — we negotiate, draft, and manage contracts, and can handle creator payments on your behalf.',
          },
          {
            question: 'What if a creator underperforms?',
            answer: 'Every campaign has clear KPIs. Underperforming creators are not re-booked, and learnings feed the next cycle.',
          },
        ],
      },
      cta: {
        title: "Ready to work with creators?",
        subtitle: "Let's build a creator roster that actually drives results.",
        buttonPrimary: 'Start an influencer campaign',
        buttonSecondary: 'See our process',
      },
    },
    ar: {
      title: 'التسويق عبر المؤثرين',
      tagline: 'وصول يبدو كتوصية.',
      hero: {
        eyebrow: 'الخدمة 05',
        headline: 'تعاون مع صنّاع محتوى يثق بهم جمهورك بالفعل.',
        subheadline:
          'شراكات مع صنّاع المحتوى مبنية على ملاءمة الجمهور والوصول الأصيل — لا على المقاييس الوهمية.',
      },
      overview:
        'نوفّق بين علامتك التجارية والصنّاع المناسبين، نتفاوض على الصفقة، نجهز البريف، ونقيس ما نجح فعلاً.',
      whatWeDo: {
        title: 'ما نقوم به',
        subtitle: 'خط أنابيب كامل لصنّاع المحتوى، يُدار من البداية للنهاية.',
        items: [
          { title: 'اختيار الصنّاع', description: 'صنّاع مدققون تتطابق جماهيرهم مع جمهورك.' },
          { title: 'التواصل والتفاوض', description: 'صفقات مبنية على الأداء، لا على الشهرة.' },
          { title: 'بريف الحملة', description: 'بريفات واضحة تحمي العلامة وصوت الصانع معًا.' },
          { title: 'مراجعة المحتوى', description: 'سير موافقات لا يقتل الإبداع.' },
          { title: 'التعزيز', description: 'تعزيز أفضل محتوى الصنّاع للتوسع.' },
          { title: 'تقارير الأداء', description: 'مقاييس حقيقية — وصول وتفاعل وتحويلات.' },
        ],
      },
      process: {
        title: 'كيف نُنفّذها',
        subtitle: 'مبنية على الملاءمة، لا على عدد المتابعين.',
        steps: [
          { number: '01', title: 'رسم الجمهور', description: 'من تحتاج للوصول إليه وأين يتواجد على الإنترنت.' },
          { number: '02', title: 'اختيار الصنّاع', description: 'قائمة قصيرة مطابقة للجمهور والقيم والنبرة.' },
          { number: '03', title: 'إطلاق الحملة', description: 'بريفات ترسل، عقود توقّع، محتوى يُجدول.' },
          { number: '04', title: 'القياس والتحسين', description: 'ما نجح يتوسع، وما لم ينجح لا يتكرر.' },
        ],
      },
      deliverables: {
        title: 'ما تحصل عليه',
        subtitle: 'برنامج صنّاع مبني حول النتائج.',
        items: [
          'رسم الجمهور والصنّاع',
          'قائمة قصيرة مدققة',
          'عقود متفاوض عليها',
          'بريف الحملة والتوجيه الإبداعي',
          'سير عمل موافقات المحتوى',
          'استراتيجية التعزيز',
          'تقرير أداء كامل',
        ],
      },
      faqs: {
        title: 'الأسئلة الشائعة',
        items: [
          {
            question: 'كيف تختارون الصنّاع؟',
            answer: 'ملاءمة الجمهور وجودة التفاعل ومواءمة العلامة وأسلوب المحتوى — عدد المتابعين عامل واحد، لا العامل الحاسم.',
          },
          {
            question: 'هل تديرون العقود والمدفوعات؟',
            answer: 'نعم — نتفاوض ونصيغ وندير العقود، ويمكننا إدارة مدفوعات الصنّاع نيابة عنك.',
          },
          {
            question: 'ماذا لو أدى الصانع دون المتوقع؟',
            answer: 'كل حملة لها مؤشرات أداء واضحة. الصنّاع دون المستوى لا يُعاد التعاقد معهم، والدروس تغذي الدورة التالية.',
          },
        ],
      },
      cta: {
        title: 'جاهز للعمل مع الصنّاع؟',
        subtitle: 'لنبنِ قائمة صنّاع تحقق نتائج فعلية.',
        buttonPrimary: 'ابدأ حملة مؤثرين',
        buttonSecondary: 'اطّلع على منهجنا',
      },
    },
  },
};