import Link from 'next/link';
import { AdUnit } from '@/components/ads/AdUnit';
import { Tool, getRelatedTools } from '@/config/tools';

interface FAQ {
  q: string;
  a: string;
}

interface ToolWrapperProps {
  tool: Tool;
  children: React.ReactNode;
  faqs?: FAQ[];
  explanation?: string;
}

export function ToolWrapper({ tool, children, faqs, explanation }: ToolWrapperProps) {
  const related = getRelatedTools(tool.slug, tool.category);

  const faqSchema = faqs
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      }
    : null;

  const toolSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: tool.title,
    description: tool.description,
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  return (
    <>
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-sky-500 transition-colors">Home</Link>
          <span>/</span>
          <Link href={`/category/${tool.category}`} className="hover:text-sky-500 transition-colors capitalize">
            {tool.category.replace('-', ' & ')}
          </Link>
          <span>/</span>
          <span className="text-slate-600 dark:text-slate-300">{tool.emoji} {tool.slug.replace(/-/g, ' ')}</span>
        </nav>

        {/* H1 */}
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-2 leading-tight">
          {tool.emoji} {tool.title}
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mb-8">{tool.description}</p>

        {/* Tool */}
        <div className="tool-card mb-8">
          {children}
        </div>

        {/* Ad unit */}
        <AdUnit slot="1234567890" format="horizontal" className="mb-8" />

        {/* Explanation */}
        {explanation && (
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
              About this tool
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{explanation}</p>
          </section>
        )}

        {/* FAQ */}
        {faqs && faqs.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <details key={i} className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4">
                  <summary className="font-medium text-slate-900 dark:text-white cursor-pointer list-none flex items-center justify-between">
                    <h3 className="text-sm sm:text-base">{faq.q}</h3>
                    <svg className="w-4 h-4 text-slate-400 group-open:rotate-180 transition-transform flex-shrink-0 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{faq.a}</p>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* Bottom ad */}
        <AdUnit slot="0987654321" format="rectangle" className="mb-8" />

        {/* Related Tools */}
        {related.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Related Tools</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {related.map((t) => (
                <Link
                  key={t.slug}
                  href={`/${t.slug}`}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 text-center hover:border-sky-300 dark:hover:border-sky-700 hover:shadow-sm transition-all group"
                >
                  <div className="text-2xl mb-2">{t.emoji}</div>
                  <div className="text-xs font-medium text-slate-600 dark:text-slate-400 group-hover:text-sky-500 transition-colors leading-tight">
                    {t.slug.replace(/-/g, ' ')}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
