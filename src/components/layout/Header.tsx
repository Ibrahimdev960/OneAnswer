'use client';
import Link from 'next/link';
import { useState } from 'react';

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
            OA
          </div>
          <span className="font-bold text-xl text-slate-900 dark:text-white">OneAnswer</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-400">
          <Link href="/category/age-date" className="hover:text-sky-500 transition-colors">Age & Date</Link>
          <Link href="/category/conversion" className="hover:text-sky-500 transition-colors">Converters</Link>
          <Link href="/category/health" className="hover:text-sky-500 transition-colors">Health</Link>
          <Link href="/category/random" className="hover:text-sky-500 transition-colors">Random</Link>
          <Link href="/category/live" className="hover:text-sky-500 transition-colors">Live Tools</Link>
        </nav>

        <button
          className="md:hidden p-2 text-slate-600 dark:text-slate-400"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-3 space-y-2">
          {['age-date', 'conversion', 'health', 'random', 'live'].map((cat) => (
            <Link
              key={cat}
              href={`/category/${cat}`}
              className="block py-2 text-slate-600 dark:text-slate-400 hover:text-sky-500 capitalize"
              onClick={() => setMenuOpen(false)}
            >
              {cat.replace('-', ' & ')}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
