import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // 👇 Array format use karo — string format Next.js 16 mein reliable nahi
  matcher: [
    /*
     * Match all request paths EXCEPT:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files) ← YE SABSE ZAROORI HAI
     * - _vercel (Vercel internal routes)
     * - images (aapki public images)
     * - favicon.ico, favicon.png
     * - Any file with extension (.*\\..*) → .jpg, .png, .css, .js, etc.
     */
    '/((?!api|_next/static|_next/image|_vercel|images|favicon\\.ico|favicon\\.png|.*\\..*).*)',
  ],
};