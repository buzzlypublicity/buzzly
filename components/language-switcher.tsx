'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { useTransition } from 'react';

const LABELS: Record<string, string> = { en: 'EN', ar: 'AR' };

export function LanguageSwitcher() {
  const locale = useLocale();
  const t = useTranslations('Language');
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function switchTo(next: string) {
    if (next === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  }

  return (
    <div
      className="inline-flex items-center gap-1 rounded-full border border-ink-200/60 bg-white/70 p-1 backdrop-blur dark:border-ink-800 dark:bg-ink-900/70"
      aria-label={t('label')}
    >
      {routing.locales.map((loc) => {
        const active = loc === locale;
        return (
          <button
            key={loc}
            onClick={() => switchTo(loc)}
            disabled={isPending}
            aria-pressed={active}
            className={`rounded-full px-3 py-1 text-xs font-semibold tracking-wide transition-all ${
              active
                ? 'bg-brand-500 text-white shadow-sm'
                : 'text-ink-500 hover:text-brand-500 dark:text-ink-400'
            }`}
          >
            {LABELS[loc]}
          </button>
        );
      })}
    </div>
  );
}