'use client';

import { type FC, useRef } from 'react';
import gsap from 'gsap';
import { useTranslations } from 'next-intl';
import { InView } from '@theo-js/react-gsap-reveal';
import { AnimatedGlow } from '../AnimatedGlow';
import { ANIMATED_GLOW_DURATION } from '../constants';

const BG_ELEMENTS_COUNT = 4;

export const DecorativeElement: FC = () => {
  const t = useTranslations('sections.contact');
  const motionBackgroundsRef = useRef<HTMLDivElement[]>([]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  function handleViewportEnter() {
    // If the timeline already exists, resume it instead of creating a new one
    if (timelineRef.current) {
      timelineRef.current.resume();
      return;
    }

    // Create a new timeline if it doesn't exist
    const tl = gsap.timeline({
      repeat: -1,
      defaults: { ease: 'none', duration: 4, stagger: 0.7 },
    });
    timelineRef.current = tl;

    tl.to([...motionBackgroundsRef.current], { scale: 1.2, rotate: 80 })
      .to([...motionBackgroundsRef.current], {
        scale: 1,
        rotate: 0,
      })
      .to([...motionBackgroundsRef.current], { scale: 1.2, rotate: -80 })
      .to([...motionBackgroundsRef.current], {
        scale: 1,
        rotate: 0,
      });
  }

  return (
    <InView onEnter={handleViewportEnter} repeat onLeave={() => timelineRef.current?.pause()}>
      <div className="from-primary/60 to-secondary/60 dark:from-primary/20 dark:to-secondary/20 glass:border-white/40 glass:bg-white/50 glass:dark:bg-white/20 glass:grayscale-0 relative h-full min-h-48 overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br grayscale-40 backdrop-blur-xl dark:border-white/10 dark:grayscale-0">
        <AnimatedGlow duration={ANIMATED_GLOW_DURATION} ease="power3.in" />

        {[...new Array(BG_ELEMENTS_COUNT)].map((_, i) => {
          const opacity = i === 0 ? 1 : 1 / i / BG_ELEMENTS_COUNT;
          return (
            <div
              key={i}
              ref={(div) => {
                if (div) motionBackgroundsRef.current[i] = div;
              }}
              className="from-primary/70 to-secondary/70 dark:from-primary/30 dark:to-secondary/30 absolute inset-0 bg-gradient-to-br"
              style={{ opacity }}
            />
          );
        })}

        <div className="relative z-10 flex h-full items-center justify-center">
          <p className="p-6 text-center text-lg text-white">
            {t.rich('message', {
              primary: (chunks) => (
                <span className="text-primary light:text-white brightness-150">{chunks}</span>
              ),
              secondary: (chunks) => (
                <span className="text-secondary light:text-white brightness-150">{chunks}</span>
              ),
            })}
          </p>
        </div>
      </div>
    </InView>
  );
};
