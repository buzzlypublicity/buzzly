'use client';

import { usePathname } from '@/i18n/navigation';
import { Navbar } from '@/components/global/navbar';
import { Footer } from '@/components/global/footer';
import { ChatWidget } from '@/components/chat/chat-widget';

export function ConditionalChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Check if we're on the AI page
  const isAIPage =
    pathname === '/buzzly-ai' || pathname.startsWith('/buzzly-ai/');

  // Full-screen AI Experience — no navbar, no footer, no widget
  if (isAIPage) {
    return <>{children}</>;
  }

  // Normal pages — with Navbar, Footer, Widget
  return (
    <>
      <Navbar />
      <main className="pt-16 md:pt-[72px] pb-[76px] md:pb-0">
        {children}
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}