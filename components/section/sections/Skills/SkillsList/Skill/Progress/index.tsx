'use client';

import { cn } from '@/lib/utils';
import gsap from 'gsap';
import { type ForwardRefRenderFunction, forwardRef, useImperativeHandle, useRef } from 'react';
import { ANIMATION_DURATION } from '../constant';
import styles from './index.module.scss';

export interface ProgressBarHandle {
  animate: () => void;
}

interface ProgressBarProps {
  bgColorClassName: string;
  level: number;
  progressDelay: number;
  shimmerDelay: number;
}

const ProgressBarRenderFunction: ForwardRefRenderFunction<ProgressBarHandle, ProgressBarProps> = (
  { bgColorClassName, level, progressDelay, shimmerDelay },
  forwardedRef,
) => {
  const ref = useRef<HTMLDivElement>(null);

  function animate(): void {
    const progressBar = ref.current;
    if (!progressBar) return;

    gsap.to(progressBar, {
      width: `${level}%`,
      duration: ANIMATION_DURATION,
      ease: 'power2.out',
      delay: progressDelay,
    });
  }

  useImperativeHandle(forwardedRef, () => ({
    animate,
  }));

  return (
    <>
      {/* Track */}
      <div className="glass:bg-white/40 relative h-2 overflow-hidden rounded-full bg-gray-300 dark:bg-white/10">
        {/** Progress */}
        <div
          ref={ref}
          className={cn(
            'dark:text-foreground absolute inset-y-0 left-0 overflow-hidden rounded-full bg-gradient-to-r text-transparent shadow-[0_0_10px_currentColor]',
            bgColorClassName,
          )}
          style={{
            filter: 'drop-shadow(0 0 8px currentColor) drop-shadow(0 0 4px currentColor)',
          }}
        >
          {/* Shimmer effect */}
          <div
            className={cn(
              'h-full w-full bg-gradient-to-r from-transparent via-white/50 to-transparent',
              styles.shimmerAnimation,
            )}
            style={{
              animationDelay: `${shimmerDelay}s`,
            }}
          />
        </div>

        {/* Pulsing glow */}
        <div className="absolute inset-0 animate-pulse rounded-full border border-red-500 bg-gradient-to-r from-transparent via-white/20 to-transparent blur-sm" />
      </div>
    </>
  );
};

export const ProgressBar = forwardRef(ProgressBarRenderFunction);
