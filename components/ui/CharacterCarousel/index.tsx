'use client';

import {
  useRef,
  useEffect,
  useImperativeHandle,
  forwardRef,
  type ForwardRefRenderFunction,
} from 'react';
import gsap from 'gsap';
import { useLocale } from 'next-intl';
import { DEFAULT_CHAR_SPACING_Y, getAlphabet } from './constants';
import type { CharacterCarouselHandle, CharacterCarouselProps, ScrollToCharsParams } from './types';

const CharacterCarouselRenderFunction: ForwardRefRenderFunction<
  CharacterCarouselHandle,
  CharacterCarouselProps
> = ({ charSpacingY = DEFAULT_CHAR_SPACING_Y }, forwardedRef) => {
  const containerRef = useRef<HTMLSpanElement | null>(null);
  const innerRef = useRef<HTMLSpanElement | null>(null);
  const charElementsRef = useRef<HTMLSpanElement[]>([]);

  const locale = useLocale();
  const alphabet = getAlphabet(locale);
  const initialChar = alphabet[0];

  // Duplicate the alphabet 3 times to allow seamless looping
  const extendedChars = [...alphabet, ...alphabet, ...alphabet];
  const middleIndex = alphabet.length; // index de départ au milieu

  // Current position
  const currentIndexRef = useRef(middleIndex + alphabet.indexOf(initialChar));

  function getCharHeight(): number {
    const charElement = charElementsRef.current[0];
    return charElement ? charElement.offsetHeight : 0;
  }

  useEffect(() => {
    // Set initial position
    if (innerRef.current) {
      gsap.set(innerRef.current, {
        y: -currentIndexRef.current * getCharHeight() - charSpacingY / 2,
      });
    }
  }, []);

  function scrollToChar({ targetChar, gsapOptions = {} }: ScrollToCharsParams): void {
    const targetIndexInChars = alphabet.indexOf(targetChar);
    if (targetIndexInChars === -1) return; // character not found

    const current = currentIndexRef.current;
    const total = alphabet.length;

    // Calculate best option to scroll (up or down)
    const options = [
      middleIndex + targetIndexInChars, // middle version
      middleIndex + targetIndexInChars + total, // scroll down (cycle)
      middleIndex + targetIndexInChars - total, // scroll up (cycle)
    ];

    // Choose the closest option
    const nextIndex = options.reduce((prev, curr) =>
      Math.abs(curr - current) < Math.abs(prev - current) ? curr : prev,
    );

    // Adjust container height to remove extra space within words
    if (containerRef.current) {
      const charWidth: string =
        targetChar === ' '
          ? '.5ch'
          : `${charElementsRef.current[targetIndexInChars]?.clientWidth || 0}px`;
      containerRef.current.style.width = charWidth;
    }

    // Animate
    const DEFAULT_OPTIONS = { duration: 2, ease: 'power3.out' };
    gsap.to(innerRef.current, {
      ...DEFAULT_OPTIONS,
      ...gsapOptions,
      y: -nextIndex * getCharHeight() - charSpacingY / 2,

      onComplete: () => {
        // Re-adjust the position to stay within the central “cycle”
        const normalizedIndex = middleIndex + targetIndexInChars;
        gsap.set(innerRef.current, {
          y: -normalizedIndex * getCharHeight() - charSpacingY / 2,
        });
        currentIndexRef.current = normalizedIndex;
      },
    });

    currentIndexRef.current = nextIndex;
  }

  useImperativeHandle(forwardedRef, () => ({
    scrollToChar,
    reset: (params) => scrollToChar({ targetChar: initialChar, gsapOptions: params?.gsapOptions }),
  }));

  return (
    <span ref={containerRef} className="relative inline-block h-[1em] overflow-hidden">
      <span ref={innerRef} className="block">
        {extendedChars.map((c, i) => (
          <span
            key={i}
            ref={(el) => {
              if (el) charElementsRef.current[i] = el;
            }}
            className="mx-auto block w-fit text-center leading-[.72em]"
            style={{
              height: `calc(1em + ${charSpacingY}px)`,
              paddingBlock: `${charSpacingY / 2}px`,
            }}
          >
            {c}
          </span>
        ))}
      </span>
    </span>
  );
};

export const CharacterCarousel = forwardRef(CharacterCarouselRenderFunction);
