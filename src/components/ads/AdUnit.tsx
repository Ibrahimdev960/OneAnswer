'use client';
import { useEffect, useRef, useState } from 'react';

interface AdUnitProps {
  slot: string;
  format?: 'auto' | 'horizontal' | 'rectangle' | 'vertical';
  className?: string;
}

/** Reserved min-heights (px) so layout is stable before AdSense fills — targets CLS < 0.1 */
const FORMAT_MIN_HEIGHT: Record<NonNullable<AdUnitProps['format']>, number> = {
  horizontal: 90,
  rectangle: 250,
  vertical: 600,
  auto: 100,
};

function getMinHeight(format: AdUnitProps['format']): number {
  if (!format) return FORMAT_MIN_HEIGHT.auto;
  return FORMAT_MIN_HEIGHT[format] ?? FORMAT_MIN_HEIGHT.auto;
}

export function AdUnit({ slot, format = 'auto', className = '' }: AdUnitProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const minH = getMinHeight(format);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { root: null, rootMargin: '0px', threshold: 0.01 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const run = () => {
      try {
        const w = window as unknown as { adsbygoogle?: unknown[] };
        w.adsbygoogle = w.adsbygoogle || [];
        w.adsbygoogle.push({});
      } catch {
        // ignore
      }
    };
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      const id = requestIdleCallback(run, { timeout: 2000 });
      return () => cancelIdleCallback(id);
    }
    const t = setTimeout(run, 0);
    return () => clearTimeout(t);
  }, [visible]);

  return (
    <div
      ref={ref}
      className={`w-full ${className}`}
      style={{ minHeight: minH }}
    >
      {visible ? (
        <ins
          className="adsbygoogle block"
          style={{ display: 'block', minHeight: minH }}
          data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
      ) : (
        <div
          className="ad-placeholder w-full"
          style={{ minHeight: minH }}
          aria-hidden
        >
          <span>Advertisement</span>
        </div>
      )}
    </div>
  );
}
