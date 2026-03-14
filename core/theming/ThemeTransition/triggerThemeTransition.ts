const TRANSITION_DURATION = 800;

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

    // Animate the new view with a circular reveal effect
    document.documentElement.animate(
      [{ clipPath: 'circle(0% at 100dvw 0)' }, { clipPath: 'circle(110vmax at 100dvw 0)' }],
      {
        duration: TRANSITION_DURATION,
        easing: 'ease',
        pseudoElement: '::view-transition-new(root)',
      },
    );
  });

  viewTransition.finished.finally(() => {
    setIsThemeTransitionInProgress(false);
    document.documentElement.classList.remove('theme-transition');
  });
}
