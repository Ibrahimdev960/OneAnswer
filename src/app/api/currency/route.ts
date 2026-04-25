import { NextResponse } from 'next/server';

export const revalidate = 3600; // cache for 1 hour

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const from = (searchParams.get('from') || 'USD').toUpperCase();
    const to = (searchParams.get('to') || 'PKR').toUpperCase();

    // Free tier: no API key needed for open.er-api.com
    const res = await fetch(`https://open.er-api.com/v6/latest/${from}`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) throw new Error('Exchange rate API failed');
    const data = await res.json();

    if (data.result !== 'success') throw new Error('Invalid response from exchange rate API');
    const rate = data.rates[to];
    if (!rate) throw new Error(`Currency ${to} not found`);

    return NextResponse.json({
      success: true,
      from,
      to,
      rate,
      lastUpdated: data.time_last_update_utc,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to fetch exchange rate';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
