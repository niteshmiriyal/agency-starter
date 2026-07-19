import { ImageResponse } from 'next/og';

import { siteConfig } from '@/config/site';

export const alt = siteConfig.name;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/**
 * Default Open Graph share image, generated at request time from
 * `siteConfig` so every route has a branded card without a designed asset.
 * A route can override this by adding its own `opengraph-image.tsx`.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 24,
          padding: 80,
          backgroundColor: '#0a0a0a',
          color: '#fafafa',
        }}
      >
        <div
          style={{
            fontSize: 28,
            fontWeight: 500,
            color: '#a1a1aa',
            letterSpacing: 3,
            textTransform: 'uppercase',
          }}
        >
          {siteConfig.name}
        </div>
        <div
          style={{
            fontSize: 60,
            fontWeight: 700,
            lineHeight: 1.15,
            maxWidth: 980,
          }}
        >
          {siteConfig.description}
        </div>
      </div>
    ),
    { ...size },
  );
}
