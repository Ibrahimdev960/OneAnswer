import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 bg-sky-500 rounded-md flex items-center justify-center text-white font-bold text-xs">OA</div>
              <span className="font-bold text-slate-900 dark:text-white">OneAnswer</span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Free instant-answer tools for questions everyone asks.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-3 text-sm">Popular Tools</h3>
            <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
              <li><Link href="/age-calculator" className="hover:text-sky-500 transition-colors">Age Calculator</Link></li>
              <li><Link href="/currency-converter" className="hover:text-sky-500 transition-colors">Currency Converter</Link></li>
              <li><Link href="/bmi-calculator" className="hover:text-sky-500 transition-colors">BMI Calculator</Link></li>
              <li><Link href="/ip-address" className="hover:text-sky-500 transition-colors">My IP Address</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-3 text-sm">Categories</h3>
            <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
              <li><Link href="/category/age-date" className="hover:text-sky-500 transition-colors">Age & Date</Link></li>
              <li><Link href="/category/health" className="hover:text-sky-500 transition-colors">Health</Link></li>
              <li><Link href="/category/conversion" className="hover:text-sky-500 transition-colors">Converters</Link></li>
              <li><Link href="/category/random" className="hover:text-sky-500 transition-colors">Random</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-3 text-sm">Legal</h3>
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
