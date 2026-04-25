import { revalidatePath } from 'next/cache';
import { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

/**
 * POST /api/revalidate — on-demand ISR path revalidation (no redeploy).
 * Production: set `REVALIDATE_SECRET` and send `Authorization: Bearer <secret>`.
 * Body: `{ "path": "/age-calculator" }`
 */
export async function POST(request: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET;
  if (secret) {
    const auth = request.headers.get('authorization');
    const bearer = auth?.match(/^Bearer\s+(.+)$/i)?.[1];
    if (bearer !== secret) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }
  } else if (process.env.NODE_ENV === 'production') {
    return Response.json(
      { error: 'REVALIDATE_SECRET is not set' },
      { status: 503 }
    );
  }

  let body: { path?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Expected JSON body' }, { status: 400 });
  }

  const { path } = body;
  if (typeof path !== 'string' || !path.startsWith('/')) {
    return Response.json(
      { error: 'body.path must be a string starting with /' },
      { status: 400 }
    );
  }

  revalidatePath(path);
  return Response.json({ revalidated: true, path });
}
