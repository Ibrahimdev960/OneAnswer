import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: { default: 'OneAnswer — Instant Answers to Every Question', template: '%s | OneAnswer' },
  description: 'Free online calculators and tools. Age calculator, currency converter, BMI calculator, IP address finder, and 50+ more instant-answer tools.',
  keywords: ['calculator', 'converter', 'online tools', 'free tools', 'instant answers'],
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
