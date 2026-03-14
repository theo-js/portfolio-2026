'use client';

import gsap from 'gsap';
import { type ForwardRefRenderFunction, forwardRef, useImperativeHandle, useRef } from 'react';
import { ANIMATION_DURATION } from '../constant';

interface PercentageHandle {
  animate: () => void;
}

interface PercentageProps {
  level: number;
  delay: number;
}

const PercentageRenderFunction: ForwardRefRenderFunction<PercentageHandle, PercentageProps> = (
  { level, delay },
  forwardedRef,
) => {
  const ref = useRef<HTMLSpanElement>(null);

  function animate(): void {
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

  useImperativeHandle(forwardedRef, () => ({ animate }));

  return (
    <span className="glass:text-white inline-block w-[3ch] text-right text-sm text-gray-700 dark:text-white/60">
      <span ref={ref}>{level}</span>

      <span>%</span>
    </span>
  );
};

export const Percentage = forwardRef(PercentageRenderFunction);
