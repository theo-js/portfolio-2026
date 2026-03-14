import { THEME_TRANSITION_ORIGIN_ELEMENT_CLASSNAME, TRANSITION_DURATION } from './constants';
import { generateWavyAnimationKeyframes } from './generateWavyAnimationKeyframes';

export function triggerThemeTransition({
  onTransitionEnd,
  setIsThemeTransitionInProgress,
}: {
  onTransitionEnd: () => void;
  setIsThemeTransitionInProgress: (value: boolean) => void;
}) {
  // Fallback for browsers that do not support View Transitions API
  if (typeof document === 'undefined' || !document.startViewTransition) {
    onTransitionEnd();
    return;
  }

  setIsThemeTransitionInProgress(true);
  document.documentElement.classList.add('theme-transition');

  const viewTransition = document.startViewTransition(onTransitionEnd);

  viewTransition.ready.then(() => {
    // Disable default fade-out animation, keep the old view
    document.documentElement.animate([{ opacity: 1 }, { opacity: 1 }], {
      duration: TRANSITION_DURATION,
      pseudoElement: '::view-transition-old(root)',
    });

    // Find the 1st visible element with the specified class name to use as the transition origin
    const transitionOriginElements = document.getElementsByClassName(
      THEME_TRANSITION_ORIGIN_ELEMENT_CLASSNAME,
    );
    const transitionOriginElement = Array.from(transitionOriginElements).find((element) =>
      element.checkVisibility(),
    );

    // Generate keyframes
    const originRect = transitionOriginElement?.getBoundingClientRect();
    const originX = originRect ? originRect.left + originRect.width / 2 : window.innerWidth;
    const originY = originRect ? originRect.top + originRect.height / 2 : 0;
    const maxRadius = Math.hypot(
      Math.max(originX, window.innerWidth - originX),
      Math.max(originY, window.innerHeight - originY),
    );
    const keyframes = generateWavyAnimationKeyframes({
      originX,
      originY,
      maxRadius,
    });

    // Animate the new view with a wavy circular reveal effect
    document.documentElement.animate(keyframes, {
      duration: TRANSITION_DURATION,
      easing: 'ease',
      pseudoElement: '::view-transition-new(root)',
    });
  });

  viewTransition.finished.finally(() => {
    setIsThemeTransitionInProgress(false);
    document.documentElement.classList.remove('theme-transition');
  });
}
