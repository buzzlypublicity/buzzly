'use client';

import { useTheme } from '@/hooks/use-theme';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggle() {
  const { theme, toggle, mounted } = useTheme();

  // Hydration safe — mount hone tak empty render
  if (!mounted) {
    return (
      <div className="h-9 w-9 rounded-full border border-ink-200/60 dark:border-ink-800" />
    );
  }

  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggle}
      type="button"
      aria-label="Toggle theme"
      className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-ink-200/60 bg-white/70 backdrop-blur transition-colors hover:border-brand-500 hover:text-brand-500 dark:border-ink-800 dark:bg-ink-900/70"
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}