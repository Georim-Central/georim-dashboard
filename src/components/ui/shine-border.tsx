import { ReactNode, useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

interface ShineBorderProps {
  active?: boolean;
  children: ReactNode;
  className?: string;
  borderWidth?: number;
  duration?: number;
  colors?: [string, string, string];
}

export function ShineBorder({
  active = false,
  children,
  className,
  borderWidth = 2,
  duration = 4,
  colors = ['#7626c6', '#a855f7', '#f59e0b'],
}: ShineBorderProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [borderRadius, setBorderRadius] = useState('1.5rem');

  useEffect(() => {
    if (!active) return;

    const child = contentRef.current?.firstElementChild;
    if (!(child instanceof HTMLElement)) return;

    const syncBorderRadius = () => {
      const nextBorderRadius = window.getComputedStyle(child).borderRadius;
      if (nextBorderRadius) {
        setBorderRadius(nextBorderRadius);
      }
    };

    syncBorderRadius();

    if (typeof ResizeObserver === 'undefined') return;

    const observer = new ResizeObserver(syncBorderRadius);
    observer.observe(child);

    return () => observer.disconnect();
  }, [active]);

  if (!active) {
    return <>{children}</>;
  }

  const gradient = `conic-gradient(from 0deg, ${colors[0]}, ${colors[1]}, ${colors[2]}, ${colors[0]})`;
  const overlayRadius = `calc(${borderRadius} + ${borderWidth}px)`;

  return (
    <div className={cn('relative isolate block', className)}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute overflow-hidden"
        style={{
          inset: -borderWidth,
          padding: borderWidth,
          borderRadius: overlayRadius,
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
        }}
      >
        <div
          className="absolute inset-[-150%] animate-spin"
          style={{
            animationDuration: `${duration}s`,
            backgroundImage: gradient,
            transformOrigin: 'center',
          }}
        />
      </div>
      <div ref={contentRef} className="relative h-full">
        {children}
      </div>
    </div>
  );
}
