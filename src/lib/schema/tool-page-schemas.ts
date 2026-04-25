import { CATEGORIES, type Tool } from '@/config/tools';
import { SITE_URL } from '@/config/site';

/** Short product name for WebApplication & breadcrumbs (e.g. "Age Calculator" from "Age Calculator — How Old…"). */
export function getWebApplicationName(tool: Tool): string {
  const split = tool.title.split(/\s[—-]\s/);
  if (split[0]?.trim()) return split[0]!.trim();
  return tool.title;
}

function toolPageUrl(slug: string): string {
  return `${SITE_URL}/${slug}`;
}

export function buildWebApplicationSchema(tool: Tool): Record<string, unknown> {
  const name = getWebApplicationName(tool);
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name,
    description: tool.description,
    url: toolPageUrl(tool.slug),
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };
}

export function buildFaqPageSchema(
  faqs: { q: string; a: string }[]
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function buildBreadcrumbListSchema(tool: Tool): Record<string, unknown> {
  const cat = CATEGORIES[tool.category];
  const page = toolPageUrl(tool.slug);
  const name = getWebApplicationName(tool);
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: cat.label,
        item: `${SITE_URL}/category/${tool.category}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name,
        item: page,
      },
    ],
  };
}

export function buildOrganizationSchema(): Record<string, unknown> {
  const logoUrl = `${SITE_URL}/apple-icon`;
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'OneAnswer',
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: logoUrl,
      width: 180,
      height: 180,
    },
    description: 'Free instant-answer tools for everyone',
  };
}
