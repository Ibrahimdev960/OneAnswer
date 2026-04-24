# OneAnswer — Universal Instant-Answer Site

Free, fast, SEO-first tool site with Google AdSense monetization.
Built with Next.js 14, TypeScript, and Tailwind CSS.

## Quick Start

```bash
npm install
npm run dev
# Open http://localhost:3000
```

## How to Add a New Tool (< 30 min)

1. Add entry to `/src/config/tools.ts`
2. Create folder: `src/app/(tools)/my-tool/page.tsx`
3. Use `<ToolWrapper>` component — done!

The tool is automatically added to: sitemap, search, category pages, related tools.

## AdSense Setup

Replace `ca-pub-XXXXXXXXXXXXXXXX` in `/src/components/ads/AdUnit.tsx` with your publisher ID.
Replace `data-ad-slot` values with your real slot IDs.
Add the AdSense script tag to `src/app/layout.tsx`.

## Free APIs Used (no key required)

- Currency: open.er-api.com
- IP detection: ipapi.co  
- Timezone: Browser Intl API (no API call)

## Deploy to Vercel

```bash
npm i -g vercel && vercel
```

## Tools Included (12 tools)

- Age Calculator, Days Until, BMI Calculator
- Currency Converter, Weight Converter, Temperature Converter
- IP Address Finder, Timezone Converter
- Password Generator, Coin Flip
- Word Counter, Percentage Calculator
