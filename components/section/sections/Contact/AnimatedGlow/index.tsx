'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef, type FC } from 'react';
import { ANIMATED_GLOW_REPEAT_DELAY } from '../constants';

interface AnimatedGlowProps {
  delay?: number;
  duration?: number;
  ease?: gsap.TweenVars['ease'];
}

/** Parent should have position relative and overflow hidden */
export const AnimatedGlow: FC<AnimatedGlowProps> = ({ delay = 0, duration = 3, ease = 'none' }) => {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        repeat: -1, // Infinite repeat
        repeatDelay: ANIMATED_GLOW_REPEAT_DELAY,
        delay,
        defaults: { duration, ease },
      });

      tl.fromTo(
        ref.current,
        {
          transform: 'translateX(-100%)',
        },
        {
          transform: 'translateX(100%)',
        },
      );
    },
    { scope: ref, dependencies: [delay, duration, ease] },
  );

  return (
    <div
      ref={ref}
      className="via-primary/30 from-primary/0 to-primary/0 pointer-events-none absolute inset-0 hidden rounded-2xl bg-gradient-to-r opacity-15 dark:block"
    />
  );
};
