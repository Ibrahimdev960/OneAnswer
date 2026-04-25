import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Use | OneAnswer',
  description: 'Terms of use for OneAnswer free online tools and calculators.',
  alternates: { canonical: '/terms' },
  openGraph: { url: '/terms' },
};

export default function TermsPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">Terms of Use</h1>
      <p className="text-sm text-slate-400 mb-8">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

      <div className="space-y-8 text-slate-600 dark:text-slate-400 leading-relaxed">
        {[
          {
            title: 'Agreement',
            body: 'By using OneAnswer, you agree to these terms. If you do not agree, please do not use the site.',
          },
          {
            title: 'No warranty',
            body: 'All tools are provided for general information only. Results are not guaranteed to be accurate for every use case. We are not liable for any decisions you make based on this site.',
          },
          {
            title: 'Not professional advice',
            body: 'Health, financial, and other calculators are not a substitute for professional advice. Always consult a qualified expert when it matters for your health, safety, or finances.',
          },
          {
            title: 'Use of the service',
            body: 'Do not use OneAnswer in any way that could harm, overload, or attempt to break our service or third-party APIs we rely on. Automated scraping or abuse may be blocked.',
          },
          {
            title: 'Advertising',
            body: 'The site is supported by advertising (e.g. Google AdSense). Your use of the site is also subject to the practices described in our Privacy Policy regarding cookies and third-party services.',
          },
          {
            title: 'Changes',
            body: 'We may update these terms from time to time. Continued use of the site after changes means you accept the updated terms.',
          },
        ].map(({ title, body }) => (
          <section key={title}>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">{title}</h2>
            <p>{body}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
