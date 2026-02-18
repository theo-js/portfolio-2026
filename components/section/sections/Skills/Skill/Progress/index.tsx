'use client';

import { cn } from '@/lib/utils';
import { InView } from '@theo-js/react-gsap-reveal';
import gsap from 'gsap';
import { useRef, type FC } from 'react';
import styles from './index.module.scss';

interface ProgressBarProps {
  bgColorClassName: string;
  level: number;
  progressDelay: number;
  shimmerDelay: number;
}
export const ProgressBar: FC<ProgressBarProps> = ({
  bgColorClassName,
  level,
  progressDelay,
  shimmerDelay,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  function handleEnter(): void {
    const progressBar = ref.current;
    if (!progressBar) return;

    gsap.to(progressBar, {
      width: `${level}%`,
      duration: 1.5,
      ease: 'power2.out',
      delay: progressDelay,
    });
  }

  return (
    <>
      {/* Track */}
      <div className="relative h-2 overflow-hidden rounded-full bg-gray-300 dark:bg-white/10">
        {/** Progress */}
        <InView onEnter={handleEnter} style={{ display: 'contents' }}>
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
        </InView>

        {/* Pulsing glow */}
        <div className="absolute inset-0 animate-pulse rounded-full border border-red-500 bg-gradient-to-r from-transparent via-white/20 to-transparent blur-sm" />
      </div>
    </>
  );
};
