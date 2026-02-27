import { useIsomorphicLayoutEffect, useLocalStorage } from 'react-use';
import type { ColorTheme } from '../ThemeProvider';

const COLOR_THEME_LOCAL_STORAGE_KEY = 'color-theme';
const COLOR_THEME_DEFAULT_VALUE: ColorTheme = 'cyberpunk';

export function useColorTheme() {
  const [colorTheme, setColorTheme] = useLocalStorage<ColorTheme>(
    COLOR_THEME_LOCAL_STORAGE_KEY,
    COLOR_THEME_DEFAULT_VALUE,
  );

  useIsomorphicLayoutEffect(() => {
    // Apply or remove the color theme class on the root element based on the state
    handleSetColorTheme(colorTheme ?? COLOR_THEME_DEFAULT_VALUE);
  }, []);

  /** Replace the current color theme class with the new one */
  function handleSetColorTheme(value: ColorTheme) {
    const root = document.documentElement;

    root.classList.remove(colorTheme ?? COLOR_THEME_DEFAULT_VALUE);

    setColorTheme(value);
    root.classList.add(value ?? COLOR_THEME_DEFAULT_VALUE);
  }

  return {
    colorTheme,
    setColorTheme: handleSetColorTheme,
  } as const;
}
