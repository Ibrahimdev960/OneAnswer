import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * 301 to lowercase pathname — enforces /age-calculator not /Age-Calculator.
 * Preserves `search` (query string) and hash is not in NextRequest the same way; `nextUrl` handles it.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const lower = pathname.toLowerCase();
  if (pathname === lower) {
    return NextResponse.next();
  }
  const url = request.nextUrl.clone();
  url.pathname = lower;
  return NextResponse.redirect(url, 301);
}

export const config = {
  matcher: [
    /*
     * All paths except Next internals and direct static file requests
     * (Vercel/Next still serves hashed assets under _next).
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
