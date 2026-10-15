import type { ServiceContent } from './types';

export const contentCreation: ServiceContent = {
  slug: 'content-creation',
  number: '04',
  icon: 'Camera',
  accent: 'accent',
  translations: {
    en: {
      title: 'Content Creation',
      tagline: 'Content that stops the scroll.',
      hero: {
        eyebrow: 'Service 04',
        headline: 'Create content worth watching twice.',
        subheadline:
          'Visual storytelling, photography, motion, and copy that captures attention — and turns it into action.',
      },
      overview:
        'From a single product shoot to a full monthly content engine, we produce assets that feel native to every platform they live on.',
      whatWeDo: {
        title: 'What we do',
        subtitle: 'Every format your brand needs.',
        items: [
          { title: 'Photography', description: 'Product, lifestyle, and campaign photography.' },
          { title: 'Video Production', description: 'Reels, TikToks, YouTube, and brand films.' },
          { title: 'Motion Graphics', description: 'Animated logos, explainers, and lower-thirds.' },
          { title: 'Copywriting', description: 'Long-form, short-form, and ad copy.' },
          { title: 'Design Assets', description: 'Static posts, carousels, and stories.' },
          { title: 'Content Systems', description: 'Reusable templates and monthly shot lists.' },
        ],
      },
      process: {
        title: 'How we run it',
        subtitle: 'From idea to publish-ready asset.',
        steps: [
          { number: '01', title: 'Creative Brief', description: 'What we\'re making, why, and for whom.' },
          { number: '02', title: 'Pre-Production', description: 'Shot lists, scripts, storyboards, and locations.' },
          { number: '03', title: 'Production Day', description: 'Efficient, professional shoots with minimal disruption.' },
          { number: '04', title: 'Post & Delivery', description: 'Editing, color, and delivery in every format you need.' },
        ],
      },
      deliverables: {
        title: 'What you get',
        subtitle: 'Publish-ready assets, on schedule.',
        items: [
          'Content plan & shot list',
          'Professional photography',
          'Edited video assets (short & long-form)',
          'Motion graphics where needed',
          'Copywriting for every asset',
          'Full source files & edits',
          'Publish-ready crops for each platform',
        ],
      },
      faqs: {
        title: 'Frequently asked',
        items: [
          {
            question: 'Do you shoot on location?',
            answer: 'Yes — we shoot on location, in studio, or at your office depending on the project.',
          },
          {
            question: 'What formats do you deliver?',
            answer: 'Every asset is delivered in the correct aspect ratio for each platform: 9:16, 1:1, 16:9, and more.',
          },
          {
            question: 'Can we own the raw files?',
            answer: 'Yes — raw files and project files are handed over upon project completion.',
          },
        ],
      },
      cta: {
        title: 'Ready to create content that performs?',
        subtitle: "Let's plan your next shoot, series, or content engine.",
        buttonPrimary: 'Start a content project',
        buttonSecondary: 'See our process',
      },
    },
    ar: {
      title: 'إنشاء المحتوى',
      tagline: 'محتوى يوقف التمرير.',
      hero: {
        eyebrow: 'الخدمة 04',
        headline: 'أنشئ محتوى يستحق المشاهدة مرتين.',
        subheadline:
          'سرد بصري، تصوير، موشن، ونصوص تجذب الانتباه — وتحوّله إلى فعل.',
      },
      overview:
        'من جلسة تصوير منتج واحدة إلى محرك محتوى شهري كامل، ننتج أصولاً تبدو أصلية على كل منصة تظهر فيها.',
      whatWeDo: {
        title: 'ما نقوم به',
        subtitle: 'كل صيغة تحتاجها علامتك.',
        items: [
          { title: 'التصوير الفوتوغرافي', description: 'تصوير المنتجات ونمط الحياة والحملات.' },
          { title: 'إنتاج الفيديو', description: 'ريلز وتيك توك ويوتيوب وأفلام العلامة التجارية.' },
          { title: 'موشن جرافيك', description: 'شعارات متحركة ومقاطع توضيحية وعناصر سفلية.' },
          { title: 'كتابة النصوص', description: 'نصوص طويلة وقصيرة وإعلانية.' },
          { title: 'أصول التصميم', description: 'منشورات ثابتة وكاروسيلات وستوريز.' },
          { title: 'أنظمة المحتوى', description: 'قوالب قابلة لإعادة الاستخدام وقوائم تصوير شهرية.' },
        ],
      },
      process: {
        title: 'كيف نُنفّذها',
        subtitle: 'من الفكرة إلى أصل جاهز للنشر.',
        steps: [
          { number: '01', title: 'البريف الإبداعي', description: 'ما ننتجه، لماذا، ولمن.' },
          { number: '02', title: 'ما قبل الإنتاج', description: 'قوائم تصوير وسكربتات ولوحات قصصية ومواقع.' },
          { number: '03', title: 'يوم الإنتاج', description: 'جلسات فعالة ومهنية بأقل انقطاع.' },
          { number: '04', title: 'المعالجة والتسليم', description: 'مونتاج وتصحيح لوني وتسليم بكل الصيغ التي تحتاجها.' },
        ],
      },
      deliverables: {
        title: 'ما تحصل عليه',
        subtitle: 'أصول جاهزة للنشر، في الموعد.',
        items: [
          'خطة محتوى وقائمة تصوير',
          'تصوير فوتوغرافي احترافي',
          'مقاطع فيديو محررة (قصيرة وطويلة)',
          'موشن جرافيك حيث يلزم',
          'كتابة نصوص لكل أصل',
          'الملفات المصدرية الكاملة',
          'قصات جاهزة للنشر لكل منصة',
        ],
      },
      faqs: {
        title: 'الأسئلة الشائعة',
        items: [
          {
            question: 'هل تصوّرون في الموقع؟',
            answer: 'نعم — نصوّر في الموقع أو الاستوديو أو مكتبك حسب المشروع.',
          },
          {
            question: 'ما الصيغ التي تسلّمونها؟',
            answer: 'كل أصل يُسلَّم بنسبة العرض الصحيحة لكل منصة: 9:16 و1:1 و16:9 وغيرها.',
          },
          {
            question: 'هل نملك الملفات الخام؟',
            answer: 'نعم — الملفات الخام وملفات المشروع تُسلَّم عند اكتمال المشروع.',
          },
        ],
      },
      cta: {
        title: 'جاهز لإنشاء محتوى يحقق الأداء؟',
        subtitle: 'لنخطط جلستك أو سلسلتك أو محرك المحتوى التالي.',
        buttonPrimary: 'ابدأ مشروع محتوى',
        buttonSecondary: 'اطّلع على منهجنا',
      },
    },
  },
};