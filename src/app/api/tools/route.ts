import { NextResponse } from 'next/server';
import { TOOLS } from '@/config/tools';

export const revalidate = 86400; // cache 24 hours

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const q = searchParams.get('q')?.toLowerCase();

  let tools = TOOLS;
  if (category) tools = tools.filter((t) => t.category === category);
  if (q) tools = tools.filter((t) => t.title.toLowerCase().includes(q) || t.keywords.some((k) => k.includes(q)));

  return NextResponse.json({ success: true, count: tools.length, tools });
}
