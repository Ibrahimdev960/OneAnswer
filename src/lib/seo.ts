import type { Metadata } from 'next';
import type { Tool } from '@/config/tools';
import { SITE_URL } from '@/config/site';
import { getWebApplicationName } from '@/lib/schema/tool-page-schemas';

const TITLE_MAX = 60;
const SUFFIX = ' — OneAnswer';
const DESC_MIN = 150;
const DESC_MAX = 160;

const CTA = ' Use OneAnswer free—get your answer in seconds, no sign-up.';
const PAD = ' Free online, accurate, and private—open the tool and get your result now.';

function toTitleCaseFromQuery(s: string): string {
  return s
    .trim()
    .split(/\s+/)
    .map((w) => (w.length ? w[0]!.toUpperCase() + w.slice(1).toLowerCase() : ''))
    .join(' ');
}

function formatSlugAsQuery(slug: string): string {
  return toTitleCaseFromQuery(slug.replace(/-/g, ' '));
}

/**
 * Primary "exact search query" for the &lt;title&gt;: prefer first keyword, else H1 part of `tool.title`, else slug.
 */
export function getToolExactSearchQuery(tool: Tool): string {
  if (tool.keywords[0]) {
    return toTitleCaseFromQuery(tool.keywords[0]!);
  }
  const beforeDash = tool.title.split(/\s[—-]\s/)[0]?.trim();
  if (beforeDash) return beforeDash;
  return formatSlugAsQuery(tool.slug);
}

/**
 * Title: "Exact Search Query — OneAnswer" (max {@link TITLE_MAX} chars) for high-intent SERP snippets.
 */
export function buildToolHeadTitle(tool: Tool): string {
  const q = getToolExactSearchQuery(tool);
  const maxQuery = TITLE_MAX - SUFFIX.length;
  if (q.length + SUFFIX.length <= TITLE_MAX) {
    return `${q}${SUFFIX}`;
  }
  let trimmed = q.slice(0, maxQuery).trim();
  const lastSp = trimmed.lastIndexOf(' ');
  if (lastSp > 12) {
    trimmed = trimmed.slice(0, lastSp);
  }
  const out = `${trimmed}${SUFFIX}`;
  return out.length <= TITLE_MAX ? out : out.slice(0, TITLE_MAX);
}

/**
 * Meta description: {@link DESC_MIN}–{@link DESC_MAX} chars, keywords + CTA.
 */
export function buildToolMetaDescription(tool: Tool): string {
  let text = tool.description.trim();
  if (text.length < 120) {
    text = `${text}${CTA}`.trim();
  } else if (text.length < DESC_MIN) {
    text = `${text} ${CTA}`.trim();
  }
  if (text.length < DESC_MIN) {
    text = (text + PAD).replace(/\s+/g, ' ').trim();
  }
  if (text.length < DESC_MIN) {
    text = (text + CTA).replace(/\s+/g, ' ').trim();
  }
  if (text.length > DESC_MAX) {
    let cut = text.slice(0, DESC_MAX);
    const lastSpace = cut.lastIndexOf(' ');
    if (lastSpace > Math.floor(DESC_MAX * 0.55)) {
      cut = cut.slice(0, lastSpace);
    }
    text = /[.…]$/.test(cut) ? cut : `${cut}…`;
  }
  if (text.length < DESC_MIN) {
    text = (text + ' ' + PAD + CTA).replace(/\s+/g, ' ').trim();
  }
  if (text.length < DESC_MIN) {
    const filler =
      ' OneAnswer: free online tools with instant results—use this page now, no account required.';
    text = (text + filler).replace(/\s+/g, ' ').trim().slice(0, DESC_MAX);
  }
  return text.slice(0, DESC_MAX);
}

function toolPageUrl(slug: string): string {
  return `${SITE_URL}/${slug}`;
}

/**
 * Full Metadata for a tool page — use from `generateMetadata` in the dynamic tool route
 * (covers all tools; no per-file duplication).
 *
 * Examples (output titles & lengths may vary slightly with truncation):
 * - **age-calculator** → "Age Calculator — OneAnswer" · primary query from keyword `age calculator`
 * - **bmi-calculator** → "Bmi Calculator — OneAnswer" (from "bmi calculator") or similar
 * - **currency-converter** → "Currency Converter — OneAnswer" (from "currency converter")
 */
export function generateToolMetadata(tool: Tool, slug: string): Metadata {
  const headTitle = buildToolHeadTitle(tool);
  const description = buildToolMetaDescription(tool);
  const pageUrl = toolPageUrl(slug);
  return {
    title: { absolute: headTitle },
    description,
    keywords: [...tool.keywords],
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: headTitle,
      description,
      url: pageUrl,
      type: 'website',
      images: [
        {
          url: `/${slug}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: `${getWebApplicationName(tool)} — OneAnswer`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: headTitle,
      description,
      images: [`/${slug}/opengraph-image`],
    },
  };
}
