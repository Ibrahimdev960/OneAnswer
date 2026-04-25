import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getToolBySlug } from '@/config/tools';
import { IMPLEMENTED_TOOL_SLUGS } from '@/components/tools/implemented/implemented-slugs';
import { isImplementedToolSlug, toolViewBySlug } from '@/components/tools/implemented/registry';
import { generateToolMetadata } from '@/lib/seo';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return IMPLEMENTED_TOOL_SLUGS.map((slug) => ({ slug }));
}

/**
 * SEO: unique metadata per tool via `generateToolMetadata` (see `src/lib/seo.samples.ts` for age, BMI, currency).
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!isImplementedToolSlug(slug)) return {};
  const tool = getToolBySlug(slug);
  if (!tool) return {};
  return generateToolMetadata(tool, slug);
}

export default async function ToolPage({ params }: Props) {
  const { slug } = await params;
  if (!isImplementedToolSlug(slug)) notFound();
  const View = toolViewBySlug[slug];
  return <View />;
}
