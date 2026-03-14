import { CookieName } from '@/core/ids/cookies';
import { useCookie, useIsomorphicLayoutEffect } from 'react-use';
import { triggerThemeTransition } from '../../ThemeTransition/triggerThemeTransition';
import { GLASSMORPHISM_CLASSNAME, GLASSMORPHISM_ENABLED_DEFAULT_VALUE } from './constants';

export function useGlassmorphim({
  setIsThemeTransitionInProgress,
}: {
  setIsThemeTransitionInProgress: (value: boolean) => void;
}) {
  const [isGlassmorphismEnabledCookieValue, setIsGlassmorphismEnabled] = useCookie(
    CookieName.GlassmorphismEnabled,
  );
  const isGlassmorphismEnabled =
    isGlassmorphismEnabledCookieValue ?? GLASSMORPHISM_ENABLED_DEFAULT_VALUE;

  function handleSetIsGlassmorphismEnabled(value: boolean) {
    setIsGlassmorphismEnabled(value ? 'true' : 'false');

    const root = document.documentElement;
    if (value) {
      root.classList.add(GLASSMORPHISM_CLASSNAME);
    } else {
      root.classList.remove(GLASSMORPHISM_CLASSNAME);
    }
  }

  useIsomorphicLayoutEffect(() => {
    // Apply or remove the glassmorphism class on the root element based on the state
    handleSetIsGlassmorphismEnabled(
      (isGlassmorphismEnabled ?? GLASSMORPHISM_ENABLED_DEFAULT_VALUE) === 'true',
    );
  }, []);

  return {
    isGlassmorphismEnabled: isGlassmorphismEnabled === 'true',
    setIsGlassmorphismEnabled: (value: boolean) =>
      triggerThemeTransition({
        onTransitionEnd: () => handleSetIsGlassmorphismEnabled(value),
        setIsThemeTransitionInProgress,
      }),
  } as const;
}
