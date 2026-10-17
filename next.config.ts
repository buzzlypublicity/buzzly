// next.config.ts
import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import path from 'path';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),   // 👈 ye line
  },
};

export default withNextIntl(nextConfig);


