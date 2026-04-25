import type { MetadataRoute } from 'next';

/**
 * Web app manifest — icons + theme help browsers and support install / richer mobile UI.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'OneAnswer — Instant answers to every question',
    short_name: 'OneAnswer',
    description:
      'Free online calculators, converters, and tools. Age calculator, currency converter, BMI, and more—no sign-up.',
    start_url: '/',
    scope: '/',
    display: 'browser',
    background_color: '#f8fafc',
    theme_color: '#0ea5e9',
    icons: [
      { src: '/icon', sizes: '32x32', type: 'image/png', purpose: 'any' },
      { src: '/apple-icon', sizes: '180x180', type: 'image/png', purpose: 'any' },
    ],
  };
}
