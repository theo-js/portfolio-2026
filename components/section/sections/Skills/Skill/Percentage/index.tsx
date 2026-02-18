'use client';

import { InView } from '@theo-js/react-gsap-reveal';
import gsap from 'gsap';
import { type FC, useRef } from 'react';
import { ANIMATION_DURATION } from '../constant';

interface PercentageProps {
  level: number;
  delay: number;
}

export const Percentage: FC<PercentageProps> = ({ level, delay }) => {
  const ref = useRef<HTMLSpanElement>(null);

  function handleEnter(): void {
    const progressBar = ref.current;
    if (!progressBar) return;

    gsap.from(progressBar, {
      innerText: 0,
      duration: ANIMATION_DURATION,
      snap: {
        innerText: 1,
      },
      ease: 'power2.out',
      delay,
    });
  }

  return (
    <InView onEnter={handleEnter} style={{ display: 'contents' }}>
      <span className="inline-block w-[3ch] text-sm text-gray-700 dark:text-white/60">
        <span ref={ref}>{level}</span>

        <span>%</span>
      </span>
    </InView>
  );
};
