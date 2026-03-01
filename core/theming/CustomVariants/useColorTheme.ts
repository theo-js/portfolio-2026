import { useIsomorphicLayoutEffect } from 'react-use';
import { useState } from 'react';
import { colorThemesDictionary, type ColorTheme } from './color-themes';

const COLOR_THEME_LOCAL_STORAGE_KEY = 'color-theme';
const COLOR_THEME_DEFAULT_VALUE: ColorTheme = Object.keys(colorThemesDictionary)[
  new Date().getDay() // use a different default color theme for each day of the week
] as ColorTheme;

export function useColorTheme() {
  const [colorTheme, setColorTheme] = useState<ColorTheme>(
    (localStorage.getItem?.(COLOR_THEME_LOCAL_STORAGE_KEY) as ColorTheme) ??
      COLOR_THEME_DEFAULT_VALUE,
  );

  /** Replace the current color theme class with the new one */
  function handleSetColorTheme(value: ColorTheme) {
    const root = document.documentElement;

    root.classList.remove(colorTheme ?? COLOR_THEME_DEFAULT_VALUE);

    setColorTheme(value);
    root.classList.add(value ?? COLOR_THEME_DEFAULT_VALUE);
  }

  function saveColorTheme(theme: ColorTheme): void {
    localStorage.setItem(COLOR_THEME_LOCAL_STORAGE_KEY, theme);
  }

  useIsomorphicLayoutEffect(() => {
    // Apply or remove the color theme class on the root element based on the state
    handleSetColorTheme(colorTheme ?? COLOR_THEME_DEFAULT_VALUE);
  }, []);

  return {
    colorTheme,
    setColorTheme: handleSetColorTheme,
    saveColorTheme,
  } as const;
}
