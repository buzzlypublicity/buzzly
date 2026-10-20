import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // 👇 Ye pattern static files ko 100% exclude karta hai
  matcher: [
    '/((?!api|_next/static|_next/image|_vercel|images|favicon\\.ico|favicon\\.png|.*\\..*).*)',
  ],
};