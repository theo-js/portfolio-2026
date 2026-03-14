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
  const viewTransition = document.startViewTransition(onTransitionEnd);

  viewTransition.finished.finally(() => {
    setIsThemeTransitionInProgress(false);
  });
}
