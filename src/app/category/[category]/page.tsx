import Link from 'next/link';
import { notFound } from 'next/navigation';
import { TOOLS, CATEGORIES, type ToolCategory } from '@/config/tools';
import { getWebApplicationName } from '@/lib/schema/tool-page-schemas';
import type { Metadata } from 'next';

type Props = { params: Promise<{ category: string }> };

export function generateStaticParams() {
  return Object.keys(CATEGORIES).map((cat) => ({ category: cat }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: catParam } = await params;
  const catKey = catParam as ToolCategory;
  const cat = CATEGORIES[catKey];
  if (!cat) return {};
  const title = `${cat.label} Tools`;
  const description = `Free ${cat.label.toLowerCase()} calculators and tools. Get instant answers online — no sign up required.`;
  const keywords = Array.from(
    new Set(TOOLS.filter((t) => t.category === catKey).flatMap((t) => t.keywords))
  ).slice(0, 25);
  return {
    title,
    description,
    keywords: keywords.length ? keywords : undefined,
    openGraph: { title, description, type: 'website', url: `/category/${catKey}` },
    alternates: { canonical: `/category/${catKey}` },
    twitter: { title, description },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category: catParam } = await params;
  const catKey = catParam as ToolCategory;
  const cat = CATEGORIES[catKey];
  if (!cat) notFound();

  const tools = TOOLS.filter((t) => t.category === catKey);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <nav className="mb-6" aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-slate-400 list-none p-0 m-0">
          <li>
            <Link href="/" className="hover:text-sky-500 transition-colors">
              Home
            </Link>
          </li>
          <li aria-hidden className="text-slate-500 select-none" role="presentation">/</li>
          <li className="text-slate-600 dark:text-slate-300" aria-current="page">
            {cat.label}
          </li>
        </ol>
      </nav>

      <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
        {cat.emoji} {cat.label} Tools
      </h1>
      <p className="text-slate-500 dark:text-slate-400 mb-2">
        Free {cat.label.toLowerCase()} calculators and tools — instant results, no sign up.
      </p>
      <p className="text-sm text-slate-500 dark:text-slate-500 mb-10">
        <Link href="/" className="text-sky-500 hover:text-sky-600 font-medium">
          ← All tools on OneAnswer
        </Link>
      </p>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 p-0 m-0 list-none" role="list">
        {tools.map((tool) => {
          const label = getWebApplicationName(tool);
          return (
            <li key={tool.slug}>
              <Link
                href={`/${tool.slug}`}
                className="block h-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 hover:border-sky-300 dark:hover:border-sky-700 hover:shadow-md transition-all group"
              >
                <div className="text-4xl mb-4" role="img" aria-label={`${label} icon`}>
                  {tool.emoji}
                </div>
                <h2 className="font-semibold text-slate-900 dark:text-white group-hover:text-sky-500 transition-colors mb-2 leading-tight">
                  {label}
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{tool.description}</p>
                {tool.popular && (
                  <span className="inline-block mt-3 text-xs bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 px-2 py-0.5 rounded-full font-medium">
                    Popular
                  </span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>

      <section className="mt-16" aria-labelledby="other-categories-heading">
        <h2 id="other-categories-heading" className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
          Other categories
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
          Explore tools by topic—each category opens more instant-answer tools.
        </p>
        <ul className="flex flex-wrap gap-3 p-0 m-0 list-none" role="list">
          {(Object.entries(CATEGORIES) as [ToolCategory, { label: string; emoji: string }][])
            .filter(([key]) => key !== catKey)
            .map(([key, c]) => (
              <li key={key}>
                <Link
                  href={`/category/${key}`}
                  className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-sky-300 dark:hover:border-sky-700 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-sky-500 transition-all"
                >
                  {c.emoji} {c.label}
                </Link>
              </li>
            ))}
        </ul>
      </section>
    </div>
  );
}
