/**
 * Next.js: `app/sitemap.ts` → `/sitemap.xml` (metadata route).
 * Rebuilds from `TOOLS` + `CATEGORIES` so new tools in config appear automatically.
 */
import { MetadataRoute } from 'next';
import { TOOLS, CATEGORIES } from '@/config/tools';
import { SITE_URL } from '@/config/site';

const HOME_PRIORITY = 1.0;
const CATEGORY_PRIORITY = 0.6;
const TOOL_PRIORITY_POPULAR = 0.9;
const TOOL_PRIORITY_REGULAR = 0.7;
const LEGAL_PAGE_PRIORITY = 0.3;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const home: MetadataRoute.Sitemap[number] = {
    url: SITE_URL,
    lastModified: now,
    changeFrequency: 'daily',
    priority: HOME_PRIORITY,
  };

  const categoryPages: MetadataRoute.Sitemap = Object.keys(CATEGORIES).map((cat) => ({
    url: `${SITE_URL}/category/${cat}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: CATEGORY_PRIORITY,
  }));

  const toolPages: MetadataRoute.Sitemap = TOOLS.map((tool) => ({
    url: `${SITE_URL}/${tool.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: tool.popular ? TOOL_PRIORITY_POPULAR : TOOL_PRIORITY_REGULAR,
  }));

  const aboutPrivacy: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/about`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: LEGAL_PAGE_PRIORITY,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: LEGAL_PAGE_PRIORITY,
    },
  ];

  return [home, ...categoryPages, ...toolPages, ...aboutPrivacy];
}
