/** Canonical site origin: metadata, sitemap, and robots. Override with NEXT_PUBLIC_SITE_URL in env if needed. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://oneanswer.app').replace(/\/$/, '');

export function getSiteUrl(): URL {
  return new URL(SITE_URL);
}
