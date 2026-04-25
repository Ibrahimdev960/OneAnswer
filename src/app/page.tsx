import type { Metadata } from 'next';
import HomePageClient from '@/components/home/HomePageClient';

/** No search-param variants: the homepage canonical is always the root URL. */
export const metadata: Metadata = {
  alternates: { canonical: '/' },
  openGraph: { url: '/' },
};

export default function HomePage() {
  return <HomePageClient />;
}
