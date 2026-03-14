export type ScrollToCharsParams = {
  targetChar: string;
  gsapOptions?: Partial<gsap.TweenVars>;
};

export type CharacterCarouselHandle = {
  scrollToChar: (params: ScrollToCharsParams) => void;
  reset: (params?: { gsapOptions: Partial<gsap.TweenVars> }) => void;
};

export type CharacterCarouselProps = {
  /* Spacing between characters in the Y axis, in pixels. */
  charSpacingY?: number;
};
