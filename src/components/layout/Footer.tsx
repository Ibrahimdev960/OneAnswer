import Link from 'next/link';
import { CATEGORIES, getPopularTools, type ToolCategory } from '@/config/tools';
import { getWebApplicationName } from '@/lib/schema/tool-page-schemas';

const CATEGORY_ORDER: ToolCategory[] = [
  'age-date',
  'time',
  'health',
  'conversion',
  'live',
  'random',
  'math',
];

export function Footer() {
  const popular = getPopularTools().slice(0, 8);

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 bg-sky-500 rounded-md flex items-center justify-center text-white font-bold text-xs">OA</div>
              <Link href="/" className="font-bold text-slate-900 dark:text-white hover:text-sky-500 transition-colors">
                OneAnswer
              </Link>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Free instant-answer tools for questions everyone asks.{' '}
              <Link href="/" className="text-sky-500 hover:underline">Back to homepage</Link>
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-3 text-sm">Popular tools</h3>
            <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
              {popular.map((t) => (
                <li key={t.slug}>
                  <Link href={`/${t.slug}`} className="hover:text-sky-500 transition-colors">
                    {getWebApplicationName(t)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-3 text-sm">All categories</h3>
            <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
              {CATEGORY_ORDER.map((key) => {
                const c = CATEGORIES[key];
                return (
                  <li key={key}>
                    <Link href={`/category/${key}`} className="hover:text-sky-500 transition-colors">
                      {c.emoji} {c.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-3 text-sm">Site</h3>
            <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
              <li><Link href="/privacy" className="hover:text-sky-500 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-sky-500 transition-colors">Terms of Use</Link></li>
              <li><Link href="/about" className="hover:text-sky-500 transition-colors">About</Link></li>
              <li><Link href="/contact" className="hover:text-sky-500 transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 dark:border-slate-800 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-slate-400">
          <p>© {new Date().getFullYear()} OneAnswer. All rights reserved.</p>
          <p className="text-xs">This site contains Google AdSense advertisements.</p>
        </div>
      </div>
    </footer>
  );
}
