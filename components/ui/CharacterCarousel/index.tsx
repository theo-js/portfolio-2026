'use client';

import { useRef, useEffect, useImperativeHandle, forwardRef } from 'react';
import gsap from 'gsap';
import { useLocale } from 'next-intl';

function getAlphabet(locale: string): string[] {
  // 1st caracter should be a space
  switch (locale) {
    case 'fr':
      return [
        ...' 0123456789aâàbcdeéèêfghjiîïlmnoôpqrstuùüvwxzABCDEÉÈÊFGHIJÎÏLMNOÔPQRSTUÙÜVWXZ.?!',
      ];
    case 'nl':
      return [
        ...' 0123456789aâàbcdeéèêfghjiîïklmnopqrstuùüvwxzABCDEÉÈÊFGHIJÎÏKLMNOPQRSTUÙÜVWXZ.?!',
      ];
    case 'ru':
      return [
        ...' 0123456789абвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ.?!',
      ];
    default:
      return [...' 0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ.?!'];
  }
}

type ScrollToCharsParams = { targetChar: string; gsapOptions?: Partial<gsap.TweenVars> };

export type CharacterCarouselHandle = {
  scrollToChar: (params: ScrollToCharsParams) => void;
  reset: (params?: { gsapOptions: Partial<gsap.TweenVars> }) => void;
};
export const CharacterCarousel = forwardRef<CharacterCarouselHandle>((_props, forwardedRef) => {
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
      gsap.set(innerRef.current, { y: -currentIndexRef.current * getCharHeight() });
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
    let nextIndex = options.reduce((prev, curr) =>
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
      y: -nextIndex * getCharHeight(),

      onComplete: () => {
        // Re-adjust the position to stay within the central “cycle”
        const normalizedIndex = middleIndex + targetIndexInChars;
        gsap.set(innerRef.current, { y: -normalizedIndex * getCharHeight() });
        currentIndexRef.current = normalizedIndex;
      },
    });

    currentIndexRef.current = nextIndex;
  }

  // Fonction exposée pour scroller vers un caractère
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
            className="mx-auto block h-[1em] w-fit text-center leading-[.72em]"
          >
            {c}
          </span>
        ))}
      </span>
    </span>
  );
});
