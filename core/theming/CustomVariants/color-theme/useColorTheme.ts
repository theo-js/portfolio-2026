import { useCookie, useIsomorphicLayoutEffect } from 'react-use';
import { CookieName } from '@/core/ids/cookies';
import { COLOR_THEME_DEFAULT_VALUE, type ColorTheme } from './themes';

export function useColorTheme() {
  const [colorTheme, setColorTheme] = useCookie(CookieName.ColorTheme);

  /** Replace the current color theme class with the new one */
  function handleSetColorTheme(value: ColorTheme) {
    const root = document.documentElement;

    root.classList.remove(colorTheme ?? COLOR_THEME_DEFAULT_VALUE);

    setColorTheme(value);
    root.classList.add(value ?? COLOR_THEME_DEFAULT_VALUE);
  }

  useIsomorphicLayoutEffect(() => {
    // Apply or remove the color theme class on the root element based on the state
    handleSetColorTheme((colorTheme as ColorTheme) ?? COLOR_THEME_DEFAULT_VALUE);
  }, []);

  return {
    colorTheme: (colorTheme as ColorTheme) ?? COLOR_THEME_DEFAULT_VALUE,
    setColorTheme: handleSetColorTheme,
  } as const;
}
