'use client';

import { CharacterCarousel, type CharacterCarouselHandle } from '@/components/ui/CharacterCarousel';
import { useCustomVariantsContext } from '@/core/theming/CustomVariants/CustomVariantsContextProvider';
import { cn } from '@/lib/utils';
import { InView } from '@theo-js/react-gsap-reveal';
import { useTranslations } from 'next-intl';
import { useRef, type FC } from 'react';

const title2BaseClassname = '-ml-[0.08em]  leading-normal ';

export const AnimatedTitle2: FC = () => {
  const t = useTranslations('sections.home');
  const { isGlassmorphismEnabled } = useCustomVariantsContext();
  const characterCarouselHandlesRef = useRef<CharacterCarouselHandle[]>([]);

  function handleViewportEnterWhenGlassmorphismIsEnabled([root]: HTMLSpanElement[]): void {
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

  function handleViewportLeaveWhenGlassmorphismIsEnabled(): void {
    characterCarouselHandlesRef.current?.forEach((handle) => handle.reset());
  }

  /*
    Only animate if glassmorphism (white text) is enabled
    since it requires splitting the title into individual spans
    and that breaks the gradient text effect
  */
  if (isGlassmorphismEnabled)
    return (
      <InView
        as="span"
        onEnter={handleViewportEnterWhenGlassmorphismIsEnabled}
        onLeave={handleViewportLeaveWhenGlassmorphismIsEnabled}
        repeat
        className={cn(title2BaseClassname, 'mt-3 mb-7 flex! text-white md:mt-2 md:mb-8')}
      >
        {t('title2')
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

  return (
    <span
      className={cn(
        title2BaseClassname,
        'from-primary via-secondary to-tertiary use-bg-as-text-color mt-[-0.5rem] mb-6 block overflow-visible bg-gradient-to-r whitespace-nowrap md:mt-[-1.25rem]',
      )}
    >
      {t('title2')}
    </span>
  );
};
