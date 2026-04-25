import type { Metadata } from 'next';
import { GoogleAnalytics } from '@next/third-parties/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';
import { buildOrganizationSchema } from '@/lib/schema/tool-page-schemas';
import { getSiteUrl } from '@/config/site';

/**
 * System UI stack (no `next/font/google` fetch at build). Avoids build failures when
 * fonts.googleapis.com is blocked (CI/sandbox) and still keeps CLS low vs. late-loaded webfonts.
 */

/** Set `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX` in env to enable GA4 (Search Console + weekly review in docs). */
const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: {
    default: 'OneAnswer — Instant Answers to Every Question',
    template: '%s | OneAnswer',
  },
  description: 'Free online calculators and tools. Age calculator, currency converter, BMI calculator, IP address finder, and 50+ more instant-answer tools.',
  applicationName: 'OneAnswer',
  keywords: ['calculator', 'converter', 'online tools', 'free tools', 'instant answers'],
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'OneAnswer',
    title: 'OneAnswer — Instant Answers to Every Question',
    description: 'Free online calculators, converters, and tools. Get instant answers to the questions everyone asks.',
  },
  twitter: { card: 'summary_large_image' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <SchemaMarkup id="ld-json-organization" schema={buildOrganizationSchema()} />
      </head>
      <body className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 font-sans antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        {gaId ? <GoogleAnalytics gaId={gaId} /> : null}
      </body>
    </html>
  );
}
