import { ImageResponse } from 'next/og';

/**
 * Apple touch icon — same mark as the in-app logo at a size suitable for iOS and Organization schema.
 */
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
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
          borderRadius: 40,
          color: '#ffffff',
          fontSize: 78,
          fontWeight: 800,
          fontFamily:
            'ui-sans-serif, system-ui, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          letterSpacing: '-0.03em',
        }}
      >
        OA
      </div>
    ),
    { ...size }
  );
}
