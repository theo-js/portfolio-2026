import { LocalStorageKey } from '@/core/ids/localStorage';
import { useIsomorphicLayoutEffect, useLocalStorage } from 'react-use';

const GLASSMORPHISM_ENABLED_DEFAULT_VALUE = true;

export function useGlassmorphim() {
  const [isGlassmorphismEnabled, setIsGlassmorphismEnabled] = useLocalStorage(
    LocalStorageKey.GlassmorphismEnabled,
    GLASSMORPHISM_ENABLED_DEFAULT_VALUE,
  );

  function handleSetIsGlassmorphismEnabled(value: boolean) {
    setIsGlassmorphismEnabled(value);

    const root = document.documentElement;
    if (value) {
      root.classList.add('glass');
    } else {
      root.classList.remove('glass');
    }
  }

  useIsomorphicLayoutEffect(() => {
    // Apply or remove the glassmorphism class on the root element based on the state
    handleSetIsGlassmorphismEnabled(isGlassmorphismEnabled ?? GLASSMORPHISM_ENABLED_DEFAULT_VALUE);
  }, []);

  return {
    isGlassmorphismEnabled: isGlassmorphismEnabled ?? GLASSMORPHISM_ENABLED_DEFAULT_VALUE,
    setIsGlassmorphismEnabled: handleSetIsGlassmorphismEnabled,
  } as const;
}
