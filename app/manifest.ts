import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'BUZZLY Publicity',
    short_name: 'BUZZLY',
    description: 'Bilingual creative agency based in Bahrain.',
    start_url: '/',
    display: 'standalone',
    background_color: '#FDFAF4',
    theme_color: '#E97A00',
    icons: [
      {
        src: '/icons/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}