'use client';

import { CharacterCarousel, type CharacterCarouselHandle } from '@/components/ui/CharacterCarousel';
import { cn } from '@/lib/utils';
import { InView } from '@theo-js/react-gsap-reveal';
import { useTranslations } from 'next-intl';
import { useRef, type FC } from 'react';

export const AnimatedSubtitle: FC = () => {
  const t = useTranslations('sections.home');
  const characterCarouselHandlesRef = useRef<CharacterCarouselHandle[]>([]);

  function handleViewportEnter([root]: HTMLSpanElement[]): void {
    const chars = root.querySelectorAll('& > span');
    chars.forEach((char, index) => {
      const characterCarouselHandle = characterCarouselHandlesRef.current?.[index];
      const targetChar = char.getAttribute('data-char');
      if (!characterCarouselHandle || !targetChar) return;

      const stagger = 0.03;
      const baseDelay = 0.75;
      const reversedIndex = chars.length - 1 - index;
      const delay = reversedIndex * stagger + baseDelay;

      characterCarouselHandle.scrollToChar({
        targetChar,
        gsapOptions: {
          delay,
          duration: 1.5,
          ease: 'power4.out',
        },
      });
    });
  }

  function handleViewportLeave(): void {
    characterCarouselHandlesRef.current?.forEach((handle) => handle.reset());
  }

  return (
    <InView
      as="span"
      onEnter={handleViewportEnter}
      onLeave={handleViewportLeave}
      repeat
      className={cn(
        'glass:text-white/90 mt-4 mb-7 -ml-[0.08em] flex! text-3xl text-gray-700 md:mt-7 md:text-4xl md:tracking-normal dark:text-white/80',
      )}
    >
      {t('subtitle')
        .split('')
        .map((char, i) => (
          <span key={i} data-char={char} className="inline-flex items-center">
            <CharacterCarousel
              ref={(el) => {
                if (el) characterCarouselHandlesRef.current[i] = el;
              }}
            />
          </span>
        ))}
    </InView>
  );
};
