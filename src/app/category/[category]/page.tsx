import Link from 'next/link';
import { notFound } from 'next/navigation';
import { TOOLS, CATEGORIES, type ToolCategory } from '@/config/tools';
import type { Metadata } from 'next';

interface Props { params: { category: string } }

export function generateStaticParams() {
  return Object.keys(CATEGORIES).map((cat) => ({ category: cat }));
}

export function generateMetadata({ params }: Props): Metadata {
  const cat = CATEGORIES[params.category as ToolCategory];
  if (!cat) return {};
  return {
    title: `${cat.label} Tools`,
    description: `Free ${cat.label.toLowerCase()} calculators and tools. Get instant answers online — no sign up required.`,
  };
}

export default function CategoryPage({ params }: Props) {
  const catKey = params.category as ToolCategory;
  const cat = CATEGORIES[catKey];
  if (!cat) notFound();

  const tools = TOOLS.filter((t) => t.category === catKey);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
        <Link href="/" className="hover:text-sky-500 transition-colors">Home</Link>
        <span>/</span>
        <span className="text-slate-600 dark:text-slate-300">{cat.label}</span>
      </nav>

      <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
        {cat.emoji} {cat.label} Tools
      </h1>
      <p className="text-slate-500 dark:text-slate-400 mb-10">
        Free {cat.label.toLowerCase()} calculators and tools — instant results, no sign up.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {tools.map((tool) => (
          <Link
            key={tool.slug}
            href={`/${tool.slug}`}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 hover:border-sky-300 dark:hover:border-sky-700 hover:shadow-md transition-all group"
          >
            <div className="text-4xl mb-4">{tool.emoji}</div>
            <h2 className="font-semibold text-slate-900 dark:text-white group-hover:text-sky-500 transition-colors mb-2 leading-tight">
              {tool.slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{tool.description}</p>
            {tool.popular && (
              <span className="inline-block mt-3 text-xs bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 px-2 py-0.5 rounded-full font-medium">
                Popular
              </span>
            )}
          </Link>
        ))}
      </div>

      {/* Other categories */}
      <div className="mt-16">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Other Categories</h2>
        <div className="flex flex-wrap gap-3">
          {(Object.entries(CATEGORIES) as [ToolCategory, { label: string; emoji: string }][])
            .filter(([key]) => key !== catKey)
            .map(([key, c]) => (
              <Link
                key={key}
                href={`/category/${key}`}
                className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-sky-300 dark:hover:border-sky-700 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-sky-500 transition-all"
              >
                {c.emoji} {c.label}
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
