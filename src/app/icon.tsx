import { ImageResponse } from 'next/og';

/**
 * Favicon — matches header branding (sky-500 tile + “OA”).
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/app-icons
 */
export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0ea5e9',
          borderRadius: 6,
          color: '#ffffff',
          fontSize: 14,
          fontWeight: 800,
          fontFamily:
            'ui-sans-serif, system-ui, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          letterSpacing: '-0.02em',
        }}
      >
        OA
      </div>
    ),
    { ...size }
  );
}
