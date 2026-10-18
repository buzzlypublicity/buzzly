import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { ChatUI } from '@/components/chat/chat-ui';
import { Sparkles, ArrowLeft, Home } from 'lucide-react';
import { Link } from '@/i18n/navigation';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Chat' });
  return { 
    title: t('title'),
    description: 'Chat with BUZZLY AI to learn more about our services, pricing, and how we can help your brand grow.',
    robots: { index: false, follow: false } // 👈 SEO best practice: Don't index AI chat pages
  };
}

export default async function BuzzlyAIPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Chat');

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-background">
      {/* ============================================================
          TOP BAR (Light, clean, minimal)
         ============================================================ */}
      <header className="relative z-10 flex shrink-0 items-center justify-between border-b border-border/50 bg-background/80 px-4 py-3 backdrop-blur-xl md:px-6 md:py-4">
        <div className="flex items-center gap-3">
          {/* Back to Home */}
          <Link
            href="/"
            className="group flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-card text-muted transition-all hover:border-brand-500/40 hover:text-brand-500"
            aria-label="Back to home"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5 flip-rtl" />
          </Link>

          {/* Brand + Status */}
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-gradient shadow-lg shadow-brand-500/25">
              <Sparkles className="h-4 w-4 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="font-display text-[15px] font-black tracking-tight text-foreground md:text-base">
                {t('title')}
              </h1>
              <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                {t('status')}
              </p>
            </div>
          </div>
        </div>

        {/* Right side — Quick Home link (mobile) */}
        <Link
          href="/"
          className="flex items-center gap-1.5 rounded-full border border-border/60 bg-card px-3 py-1.5 text-[11px] font-bold text-muted transition-all hover:border-brand-500/40 hover:text-brand-500 md:hidden"
        >
          <Home className="h-3 w-3" />
          Home
        </Link>
      </header>

      {/* ============================================================
          CHAT AREA (Full height, full width)
         ============================================================ */}
      <main className="relative flex-1 overflow-hidden">
        {/* Ambient background orbs — subtle, low opacity */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-40 top-0 h-[400px] w-[400px] rounded-full orb-brand blur-3xl opacity-40" />
          <div className="absolute -right-40 bottom-0 h-[400px] w-[400px] rounded-full orb-teal blur-3xl opacity-40" />
        </div>

        <div className="relative h-full">
          <ChatUI variant="page" />
        </div>
      </main>
    </div>
  );
}



 