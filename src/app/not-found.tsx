import Link from 'next/link';
import { getPopularTools } from '@/config/tools';

export default function NotFound() {
  const popular = getPopularTools().slice(0, 4);
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <p className="text-8xl mb-6">🔍</p>
      <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-3">Page Not Found</h1>
      <p className="text-slate-500 dark:text-slate-400 mb-8">
        The tool or page you are looking for does not exist. Try one of our popular tools below.
      </p>
      <div className="grid grid-cols-2 gap-3 mb-8">
        {popular.map((t) => (
          <Link key={t.slug} href={`/${t.slug}`}
            className="flex items-center gap-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 hover:border-sky-300 dark:hover:border-sky-700 transition-all text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-sky-500">
            <span className="text-xl">{t.emoji}</span>
            {t.slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
          </Link>
        ))}
      </div>
      <Link href="/" className="btn-primary inline-block w-auto px-8">Go to Homepage</Link>
    </div>
  );
}
