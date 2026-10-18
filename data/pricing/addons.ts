export interface Addon {
  id: string;
  name: { en: string; ar: string };
  price: number; // Only number, we'll add BD prefix in UI
  icon: string; // Lucide icon name string
}

export const PRICING_ADDONS: Addon[] = [
  { id: 'reel', name: { en: 'Extra Short Video / Reel', ar: 'فيديو قصير / ريلز إضافي' }, price: 15, icon: 'Video' },
  { id: 'page', name: { en: 'Additional Website Page', ar: 'صفحة إضافية للموقع' }, price: 20, icon: 'FileText' },
  { id: 'rush', name: { en: 'Rush Delivery (Priority Queue)', ar: 'تسليم سريع (أولوية)' }, price: 30, icon: 'Zap' },
  { id: 'revision', name: { en: 'Extra Design Revision Round', ar: 'جولة مراجعة تصميم إضافية' }, price: 10, icon: 'RefreshCw' },
  { id: 'photo', name: { en: 'Professional Photography Session', ar: 'جلسة تصوير احترافية' }, price: 50, icon: 'Camera' },
];