'use client';

import { type FC, useRef } from 'react';
import { Reveal } from '../reveal';
import { useGSAP } from '@gsap/react';
import { cn } from '@/lib/utils';
import { useHasReachedBottomOfWindow } from '@/core/runtime/scroll/useHasReachedBottomOfWidow';
import gsap from 'gsap';

export const ScrollIndicator: FC = () => {
  const dotElementRef = useRef<HTMLDivElement>(null);
  const { hasReachedBottomOfWindow } = useHasReachedBottomOfWindow();

  useGSAP(
    () => {
      gsap.to(dotElementRef.current, {
        y: 16,
        repeat: -1,
        yoyo: true,
        ease: 'bounce',
        duration: 0.75,
      });
    },
    { dependencies: [], scope: dotElementRef },
  );

  return (
    <Reveal
      animation="scaleIn"
      className={cn(
        'pointer-events-none fixed bottom-8 left-1/2 z-50 -translate-x-1/2',
        hasReachedBottomOfWindow && 'opacity-0!',
      )}
    >
      <div className="glowing-border flex h-10 w-6 justify-center rounded-full border-2 pt-2">
        <div ref={dotElementRef} className="bg-primary h-1.5 w-1.5 rounded-full" />
      </div>
    </Reveal>
  );
};
