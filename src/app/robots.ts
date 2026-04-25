/**
 * Next.js: `app/robots.ts` → `/robots.txt` (metadata route).
 * Allow public HTML, block API; reference sitemap for discovery.
 */
import { MetadataRoute } from 'next';
import { SITE_URL } from '@/config/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
