import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'BUZZLY Publicity',
    short_name: 'BUZZLY',
    description: 'Bilingual creative publicity agency in Bahrain.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0A0B0F', // 👈 Dark ink background (premium feel)
    theme_color: '#E97A00',       // 👈 Orange theme (top bar)
    orientation: 'portrait',
    scope: '/',
    lang: 'en',
    icons: [
      {
        src: '/icons/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable', // 👈 Ye Android ko bata ta hai ke icon adaptive shape mein dikhao
      },
    ],
  };
}