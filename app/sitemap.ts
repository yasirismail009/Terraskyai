import { MetadataRoute } from 'next';
import { routing } from '../i18n/routing';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://terraskyai.com';

  const routes = [
    '',
    '/careers',
    '/contact',
    '/services',
    '/technology-in-action',
    '/vision-mission',
    '/products/skysight',
    '/products/terrascout',
  ];

  return routes.flatMap((route) =>
    routing.locales.map(
      (locale): MetadataRoute.Sitemap[number] => ({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'weekly' : ('monthly' as const),
        priority: route === '' ? 1 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((l) => [l, `${baseUrl}/${l}${route}`])
          ),
        },
      })
    )
  );
}