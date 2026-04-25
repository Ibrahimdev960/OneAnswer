import { ImageResponse } from 'next/og';
import { getToolBySlug } from '@/config/tools';
import { getWebApplicationName } from '@/lib/schema/tool-page-schemas';
import { isImplementedToolSlug } from '@/components/tools/implemented/implemented-slugs';

export const runtime = 'edge';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

type Props = { params: Promise<{ slug: string }> };

export default async function OGImage({ params }: Props) {
  const { slug } = await params;
  const tool = isImplementedToolSlug(slug) ? getToolBySlug(slug) : undefined;
  const name = tool ? getWebApplicationName(tool) : 'OneAnswer';
  const emoji = tool?.emoji ?? '✨';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'linear-gradient(125deg, #0ea5e9 0%, #0284c7 45%, #0c4a6e 100%)',
          padding: 56,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            flex: 1,
            minWidth: 0,
            paddingRight: 24,
          }}
        >
          <div style={{ fontSize: 100, lineHeight: 1.1 }}>{emoji}</div>
          <div
            style={{
              fontSize: 52,
              fontWeight: 700,
              color: 'white',
              lineHeight: 1.1,
              marginTop: 28,
              fontFamily: 'ui-sans-serif, system-ui, "Segoe UI", Roboto, sans-serif',
            }}
          >
            {name}
          </div>
          <div
            style={{
              fontSize: 28,
              color: 'rgba(255, 255, 255, 0.92)',
              marginTop: 20,
              fontWeight: 500,
              fontFamily: 'ui-sans-serif, system-ui, "Segoe UI", Roboto, sans-serif',
            }}
          >
            OneAnswer — free instant answer tools
          </div>
        </div>
        <div
          style={{
            width: 200,
            height: 200,
            borderRadius: 40,
            background: 'rgba(255, 255, 255, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: 64,
            fontWeight: 800,
            fontFamily: 'ui-sans-serif, system-ui, "Segoe UI", Roboto, sans-serif',
            flexShrink: 0,
          }}
        >
          OA
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
