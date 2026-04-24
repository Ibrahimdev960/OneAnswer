'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { TOOLS, CATEGORIES, getPopularTools, type ToolCategory } from '@/config/tools';

export default function HomePage() {
  const [search, setSearch] = useState('');
  const popular = getPopularTools();

  const filtered = useMemo(() => {
    if (!search.trim()) return [];
    const q = search.toLowerCase();
    return TOOLS.filter(
      (t) => t.title.toLowerCase().includes(q) || t.slug.includes(q) || t.keywords.some((k) => k.includes(q))
    );
  }, [search]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <section className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-sky-50 dark:bg-sky-900/20 text-sky-600 dark:text-sky-400 text-sm font-medium px-4 py-1.5 rounded-full border border-sky-200 dark:border-sky-800 mb-6">
          20+ free tools — no sign up required
        </div>
        <h1 className="text-4xl sm:text-6xl font-bold text-slate-900 dark:text-white mb-4 leading-tight">
          Instant answers to<br /><span className="text-sky-500">every question</span>
        </h1>
        <p className="text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto mb-8">
          Free calculators and tools for the questions everyone searches.
        </p>
        <div className="relative max-w-lg mx-auto">
          <input
            type="text"
            placeholder="Search tools... (age, BMI, currency...)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-5 py-4 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all text-lg shadow-sm"
          />
        </div>
        {filtered.length > 0 && (
          <div className="max-w-lg mx-auto mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-lg overflow-hidden text-left">
            {filtered.slice(0, 6).map((t) => (
              <Link key={t.slug} href={`/${t.slug}`} className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border-b border-slate-100 dark:border-slate-800 last:border-0">
                <span className="text-xl">{t.emoji}</span>
                <div>
                  <div className="font-medium text-slate-800 dark:text-slate-200 text-sm">{t.slug.replace(/-/g, ' ')}</div>
                  <div className="text-xs text-slate-400">{t.description.slice(0, 60)}...</div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Most Popular</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {popular.map((tool) => (
            <Link key={tool.slug} href={`/${tool.slug}`} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 flex flex-col items-center text-center group">
              <span className="text-4xl mb-3">{tool.emoji}</span>
              <h3 className="font-semibold text-slate-800 dark:text-slate-200 text-sm leading-tight group-hover:text-sky-500 transition-colors">
                {tool.slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
              </h3>
            </Link>
          ))}
        </div>
      </section>

      {(Object.keys(CATEGORIES) as ToolCategory[]).map((catKey) => {
        const cat = CATEGORIES[catKey];
        const catTools = TOOLS.filter((t) => t.category === catKey);
        if (!catTools.length) return null;
        return (
          <section key={catKey} className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">{cat.emoji} {cat.label}</h2>
              <Link href={`/category/${catKey}`} className="text-sm text-sky-500 hover:text-sky-600 font-medium">View all</Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {catTools.slice(0, 4).map((tool) => (
                <Link key={tool.slug} href={`/${tool.slug}`} className="flex items-center gap-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 hover:border-sky-300 dark:hover:border-sky-700 hover:shadow-sm transition-all group">
                  <span className="text-xl flex-shrink-0">{tool.emoji}</span>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-sky-500 transition-colors leading-tight">
                    {tool.slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
