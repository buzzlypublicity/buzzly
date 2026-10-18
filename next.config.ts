import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import path from 'path';
import withPWAInit from '@ducanh2912/next-pwa'; // 👈 Naya package import kiya

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const withPWA = withPWAInit({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  // workboxOptions: {...} (Agar aapko zaroorat pare to)
});

const nextConfig: NextConfig = {
  // Turbopack root fix (Jo aapne pehle set kiya tha)
  turbopack: {
    root: path.join(__dirname),
  },
  
  // React Strict Mode (Best practice)
  reactStrictMode: true,

  // Image Optimization (Future-proofing)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default withNextIntl(withPWA(nextConfig));