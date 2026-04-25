import Link from 'next/link';
import { AdUnit } from '@/components/ads/AdUnit';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';
import { CATEGORIES, Tool, getCrossCategoryTools, getRelatedToolLinks } from '@/config/tools';
import {
  buildBreadcrumbListSchema,
  buildFaqPageSchema,
  buildWebApplicationSchema,
  getWebApplicationName,
} from '@/lib/schema/tool-page-schemas';

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

function formatKeywordDisplay(k: string): string {
  return k
    .trim()
    .split(/\s+/)
    .map((w) => (w.length ? w[0]!.toUpperCase() + w.slice(1).toLowerCase() : ''))
    .join(' ');
}

export function ToolWrapper({ tool, children, faqs, explanation }: ToolWrapperProps) {
  const related = getRelatedToolLinks(tool.slug, tool.category, 4);
  const relatedSlugs = new Set(related.map((r) => r.slug));
  const youMightLike = getCrossCategoryTools(tool.slug, tool.category, 8)
    .filter((t) => !relatedSlugs.has(t.slug))
    .slice(0, 4);
  const categoryMeta = CATEGORIES[tool.category];
  const h1Text = getWebApplicationName(tool);
  const currentPageLabel = h1Text;

  const webAppSchema = buildWebApplicationSchema(tool);
  const breadcrumbSchema = buildBreadcrumbListSchema(tool);
  const faqSchema = faqs && faqs.length > 0 ? buildFaqPageSchema(faqs) : null;

  return (
    <>
      <SchemaMarkup id="ld-json-web-application" schema={webAppSchema} />
      <SchemaMarkup id="ld-json-breadcrumb-list" schema={breadcrumbSchema} />
      {faqSchema && <SchemaMarkup id="ld-json-faq-page" schema={faqSchema} />}

      <article
        className="max-w-3xl mx-auto px-4 sm:px-6 py-8"
        id={`tool-${tool.slug}`}
        aria-labelledby="tool-page-heading"
      >
        <nav className="mb-6" aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-slate-400 list-none p-0 m-0">
            <li>
              <Link href="/" className="hover:text-sky-500 transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden className="text-slate-500 select-none" role="presentation">
              /
            </li>
            <li>
              <Link
                href={`/category/${tool.category}`}
                className="hover:text-sky-500 transition-colors"
              >
                {categoryMeta.label}
              </Link>
            </li>
            <li aria-hidden className="text-slate-500 select-none" role="presentation">
              /
            </li>
            <li
              className="text-slate-600 dark:text-slate-300"
              aria-current="page"
            >
              {currentPageLabel}
            </li>
          </ol>
        </nav>

        <header>
          <h1
            id="tool-page-heading"
            className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-2 leading-tight"
          >
            <span className="inline-block" role="img" aria-label={`${h1Text} — tool icon`}>
              {tool.emoji}
            </span>{' '}
            {h1Text}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mb-8">{tool.description}</p>
        </header>

        <section aria-label="Tool" className="mb-8">
          <div className="tool-card">{children}</div>
        </section>

        <aside className="mb-8" aria-label="Advertisement">
          <AdUnit slot="1234567890" format="horizontal" className="w-full" />
        </aside>

        {explanation ? (
          <section className="mb-8" aria-labelledby="about-tool-heading">
            <h2
              id="about-tool-heading"
              className="text-xl font-semibold text-slate-900 dark:text-white mb-3"
            >
              About this tool
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{explanation}</p>
          </section>
        ) : null}

        {faqs && faqs.length > 0 ? (
          <section className="mb-8" aria-labelledby="faq-heading">
            <h2
              id="faq-heading"
              className="text-xl font-semibold text-slate-900 dark:text-white mb-4"
            >
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <details
                  key={i}
                  className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4"
                >
                  <summary className="font-medium text-slate-900 dark:text-white cursor-pointer list-none flex items-center justify-between gap-2">
                    <h3 className="text-sm sm:text-base m-0 font-medium">{faq.q}</h3>
                    <svg
                      className="w-4 h-4 text-slate-400 group-open:rotate-180 transition-transform flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </summary>
                  <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </section>
        ) : null}

        <aside className="mb-8" aria-label="Advertisement">
          <AdUnit slot="0987654321" format="rectangle" className="w-full" />
        </aside>

        {related.length > 0 ? (
          <section className="mb-10" aria-labelledby="related-tools-heading">
            <h2
              id="related-tools-heading"
              className="text-xl font-semibold text-slate-900 dark:text-white mb-4"
            >
              Related Tools
            </h2>
            <ul className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-0 m-0 list-none" role="list">
              {related.map((t) => (
                <li key={t.slug}>
                  <Link
                    href={`/${t.slug}`}
                    className="block bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 text-center hover:border-sky-300 dark:hover:border-sky-700 hover:shadow-sm transition-all group h-full"
                  >
                    <div
                      className="text-2xl mb-2"
                      role="img"
                      aria-label={`${getWebApplicationName(t)}: related tool icon`}
                    >
                      {t.emoji}
                    </div>
                    <div className="text-xs font-medium text-slate-600 dark:text-slate-400 group-hover:text-sky-500 transition-colors leading-tight">
                      {getWebApplicationName(t)}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {youMightLike.length > 0 ? (
          <section className="mb-10" aria-labelledby="you-might-like-heading">
            <h2
              id="you-might-like-heading"
              className="text-xl font-semibold text-slate-900 dark:text-white mb-4"
            >
              You might also like
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
              Popular tools in other categories:
            </p>
            <ul className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-0 m-0 list-none" role="list">
              {youMightLike.map((t) => (
                <li key={t.slug}>
                  <Link
                    href={`/${t.slug}`}
                    className="block bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 text-center hover:border-sky-300 dark:hover:border-sky-700 hover:shadow-sm transition-all group h-full"
                  >
                    <div
                      className="text-2xl mb-2"
                      role="img"
                      aria-label={`${getWebApplicationName(t)}: tool icon`}
                    >
                      {t.emoji}
                    </div>
                    <div className="text-xs font-medium text-slate-600 dark:text-slate-400 group-hover:text-sky-500 transition-colors leading-tight">
                      {getWebApplicationName(t)}
                    </div>
                    <div className="text-[10px] mt-1 text-slate-400 line-clamp-1">
                      {CATEGORIES[t.category].label}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {tool.keywords.length > 0 ? (
          <section
            className="border-t border-slate-200 dark:border-slate-800 pt-8"
            aria-labelledby="related-searches-heading"
          >
            <h2
              id="related-searches-heading"
              className="text-xl font-semibold text-slate-900 dark:text-white mb-3"
            >
              Related searches
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
              People also look for:
            </p>
            <ul
              className="flex flex-wrap gap-2 p-0 m-0 list-none text-sm text-slate-700 dark:text-slate-300"
              role="list"
            >
              {tool.keywords.map((k) => (
                <li key={k} className="m-0">
                  <span className="inline-block bg-slate-100 dark:bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-200/80 dark:border-slate-700/80">
                    {formatKeywordDisplay(k)}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </article>
    </>
  );
}
