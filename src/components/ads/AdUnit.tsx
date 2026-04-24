'use client';
import { useEffect, useRef, useState } from 'react';

interface AdUnitProps {
  slot: string;
  format?: 'auto' | 'horizontal' | 'rectangle' | 'vertical';
  className?: string;
}

const FORMAT_HEIGHTS: Record<string, string> = {
  horizontal: 'h-24',
  rectangle: 'h-64',
  vertical: 'h-96',
  auto: 'h-28',
};

export function AdUnit({ slot, format = 'auto', className = '' }: AdUnitProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { rootMargin: '200px' }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {}
  }, [visible]);

  const height = FORMAT_HEIGHTS[format] || FORMAT_HEIGHTS.auto;

  return (
    <div ref={ref} className={`${height} w-full ${className}`}>
      {visible ? (
        <ins
          className="adsbygoogle block"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
      ) : (
        /* Placeholder reserves space before ad loads — prevents CLS */
        <div className={`ad-placeholder w-full ${height}`}>
          <span>Advertisement</span>
        </div>
      )}
    </div>
  );
}
