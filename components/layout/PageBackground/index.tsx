'use client';

import { useTheme } from 'next-themes';
import { useWindowScroll } from '@/core/runtime/scroll/useWindowScroll';
import { cn } from '@/lib/utils';
import { type CSSProperties, useMemo, type FC, type HTMLProps, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useIsHydrated } from 'radix-ui/internal';

export const PageBackground: FC<HTMLProps<HTMLDivElement>> = ({ className, ...props }) => {
  const { windowScroll } = useWindowScroll();
  const { resolvedTheme } = useTheme();
  const isHydrated = useIsHydrated();

  const backgroundColor: CSSProperties['backgroundColor'] = useMemo(() => {
    if (resolvedTheme === 'light') return 'transparent'; // no animation in light mode

    const maxScroll =
      typeof document !== 'undefined' ? document.body.scrollHeight - window.innerHeight : 0;
    const ratio = Math.min(1, Math.max(0, (windowScroll?.y ?? 0) / maxScroll));
    const red = interpolateColorComponent({
      valueTop: 10,
      valueMiddle: 15,
      valueBottom: 10,
      ratio,
    });
    const green = interpolateColorComponent({
      valueTop: 10,
      valueMiddle: 10,
      valueBottom: 10,
      ratio,
    });
    const blue = interpolateColorComponent({
      valueTop: 10,
      valueMiddle: 25,
      valueBottom: 10,
      ratio,
    });
    return `rgb(${red}, ${green}, ${blue})`;
  }, [windowScroll?.y, resolvedTheme]);

  function interpolateColorComponent({
    valueTop,
    valueMiddle,
    valueBottom,
    ratio,
  }: {
    valueTop: number;
    valueMiddle: number;
    valueBottom: number;
    ratio: number;
  }) {
    if (ratio <= 0.5) {
      // top -> middle
      return valueTop + (valueMiddle - valueTop) * (ratio / 0.5);
    } else {
      // middle -> bottom
      return valueMiddle + (valueBottom - valueMiddle) * ((ratio - 0.5) / 0.5);
    }
  }

  return (
    <div
      className={cn(
        'user-select-none pointer-events-none fixed inset-0 overflow-hidden',
        className,
      )}
      style={isHydrated ? { backgroundColor } : undefined}
      {...props}
    >
      <AnimatedBlobs />
    </div>
  );
};

const AnimatedBlobs: FC = () => {
  const blob1 = useRef<HTMLDivElement>(null);
  const blob2 = useRef<HTMLDivElement>(null);
  const blob3 = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ repeat: -1, yoyo: true });

    if (blob1.current) {
      tl.to(blob1.current, { x: 100, y: 50, scale: 1.2, duration: 10, ease: 'power1.inOut' });
      tl.to(blob1.current, { x: 0, y: 0, scale: 1, duration: 10, ease: 'power1.inOut' });
    }

    if (blob2.current) {
      const tl2 = gsap.timeline({ repeat: -1, yoyo: true });
      tl2.to(blob2.current, { x: -100, y: -50, scale: 1.3, duration: 12.5, ease: 'power1.inOut' });
      tl2.to(blob2.current, { x: 0, y: 0, scale: 1, duration: 12.5, ease: 'power1.inOut' });
    }

    if (blob3.current) {
      const tl3 = gsap.timeline({ repeat: -1, yoyo: true });
      tl3.to(blob3.current, { x: 100, y: 50, scale: 1.5, duration: 15, ease: 'power1.inOut' });
      tl3.to(blob3.current, { x: -100, y: -50, scale: 1, duration: 15, ease: 'power1.inOut' });
    }
  }, []);

  return (
    <>
      <div
        ref={blob1}
        className="bg-primary/10 absolute top-20 left-20 h-96 w-96 rounded-full blur-3xl"
      />
      <div
        ref={blob2}
        className="bg-secondary/10 absolute right-20 bottom-20 h-96 w-96 rounded-full blur-3xl"
      />
      <div
        ref={blob3}
        className="bg-tertiary/10 absolute top-1/2 left-1/2 h-96 w-96 rounded-full blur-3xl"
      />
    </>
  );
};
