// lib/theme.ts
import { cookies } from 'next/headers';

export type Theme = 'light' | 'dark';

export async function getServerTheme(): Promise<Theme> {
  const cookieStore = await cookies();
  const stored = cookieStore.get('theme')?.value;
  if (stored === 'dark' || stored === 'light') return stored;
  return 'light';
}