import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /** Single canonical URL form: no `/path/` for HTML routes (sitemap, assets unchanged). */
  trailingSlash: false,
  /**
   * 301s for any legacy paths after URL changes. Add rows here when renaming routes
   * so existing backlinks keep passing equity to the new slug.
   */
  async redirects() {
    return [
      /** Example legacy prefix from STEP 7 — any `/tools/{slug}` → `/{slug}` (301). */
      { source: '/tools/:path*', destination: '/:path*', permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ];
  },
};

export default nextConfig;
