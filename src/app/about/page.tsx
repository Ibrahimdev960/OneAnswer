import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About OneAnswer',
  description: 'OneAnswer provides free, instant-answer tools for the questions everyone searches online.',
  alternates: { canonical: '/about' },
  openGraph: { url: '/about' },
};

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-6">About OneAnswer</h1>
      <div className="prose prose-slate dark:prose-invert space-y-4 text-slate-600 dark:text-slate-400 leading-relaxed">
        <p>
          <strong className="text-slate-900 dark:text-white">OneAnswer</strong> is a collection of free, instant-answer tools for the questions that billions of people search for every day — age calculators, currency converters, BMI calculators, timezone converters, and many more.
        </p>
        <p>
          Our goal is simple: give you the answer in under 3 seconds, with no sign-up, no pop-ups, and no friction. Every tool is built to work on any device, load instantly, and give you accurate results.
        </p>
        <p>
          This site is free to use and is supported by Google AdSense advertisements. We take your privacy seriously — we do not collect personal data, track your inputs, or share your information with third parties.
        </p>
        <p>
          Built by a software engineer who wanted better, faster tools than what was available. If you have a tool suggestion, <Link href="/contact" className="text-sky-500 hover:underline">contact us</Link>.
        </p>
      </div>
    </div>
  );
}
