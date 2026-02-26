'use client';

import { useTheme } from 'next-themes';
import { useWindowScroll } from '@/core/runtime/scroll/useWindowScroll';
import { cn } from '@/lib/utils';
import { type CSSProperties, useMemo, type FC, type HTMLProps, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useIsHydrated } from 'radix-ui/internal';

const commonBgClasses = 'user-select-none pointer-events-none fixed inset-0 overflow-hidden';

export const PageBackground: FC<HTMLProps<HTMLDivElement>> = ({ className, ...props }) => {
  const { windowScroll } = useWindowScroll();
  const { resolvedTheme } = useTheme();
  const isHydrated = useIsHydrated();

  const animatedBgColor: CSSProperties['backgroundColor'] = useMemo(() => {
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
    <>
      {/* Dark Mode */}
      <div className="hidden dark:contents">
        <div
          className={cn(commonBgClasses, className)}
          style={isHydrated ? { background: animatedBgColor } : undefined}
          {...props}
        >
          <AnimatedBlobsDark />
        </div>
      </div>

      {/* Light mode */}
      <div className="contents dark:hidden">
        <div
          className={cn(
            commonBgClasses,
            'bg-accent', // 'bg-[linear-gradient(to_top,color-mix(in_oklab,var(--primary)_25%,transparent),color-mix(in_oklab,var(--secondary)_25%,transparent)),linear-gradient(to_left,color-mix(in_oklab,var(--primary)_25%,white_75%),color-mix(in_oklab,var(--tertiary)_25%,white_75%))]',
            className,
          )}
          {...props}
        >
          <AnimatedBlobsLight />
        </div>
      </div>
    </>
  );
};

const AnimatedBlobsDark: FC = () => {
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
    <div className="relative mx-auto h-screen max-w-[1900px]">
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
    </div>
  );
};

const AnimatedBlobsLight: FC = () => {
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
    <div className="relative mx-auto h-screen max-w-[1900px]">
      <div
        ref={blob1}
        className="from-primary/10 absolute top-20 left-20 h-96 w-96 rounded-full bg-gradient-to-b to-transparent opacity-60"
      />
      <div
        ref={blob2}
        className="from-secondary/10 absolute right-20 bottom-20 h-96 w-96 rounded-full bg-gradient-to-b to-transparent opacity-60"
      />
      <div
        ref={blob3}
        className="from-tertiary/10 absolute top-1/2 left-1/2 h-96 w-96 rounded-full bg-gradient-to-b to-transparent opacity-30"
      />
    </div>
  );
};
