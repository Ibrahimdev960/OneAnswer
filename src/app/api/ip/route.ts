import { NextResponse } from 'next/server';

export const revalidate = 0; // never cache — always fresh

export async function GET(request: Request) {
  try {
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0].trim() : '8.8.8.8';

    const res = await fetch(`https://ipapi.co/${ip}/json/`, {
      headers: { 'User-Agent': 'OneAnswer/1.0' },
      next: { revalidate: 0 },
    });

    if (!res.ok) throw new Error('IP API failed');
    const data = await res.json();

    return NextResponse.json({
      success: true,
      data: {
        ip: data.ip,
        city: data.city,
        region: data.region,
        country: data.country_code,
        country_name: data.country_name,
        org: data.org,
        timezone: data.timezone,
        latitude: data.latitude,
        longitude: data.longitude,
      },
    });
  } catch {
    return NextResponse.json({ success: false, error: 'Could not detect IP address' }, { status: 500 });
  }
}
