import { useIsomorphicLayoutEffect } from 'react-use';
import { useState } from 'react';
import { LocalStorageKey } from '@/core/ids/localStorage';
import type { ColorTheme } from './color-themes';

const COLOR_THEME_DEFAULT_VALUE: ColorTheme = 'plasma';

export function useColorTheme() {
  const [colorTheme, setColorTheme] = useState<ColorTheme>(COLOR_THEME_DEFAULT_VALUE);

  /** Replace the current color theme class with the new one */
  function handleSetColorTheme(value: ColorTheme) {
    const root = document.documentElement;

    root.classList.remove(colorTheme ?? COLOR_THEME_DEFAULT_VALUE);

    setColorTheme(value);
    root.classList.add(value ?? COLOR_THEME_DEFAULT_VALUE);
  }

  function saveColorTheme(theme: ColorTheme): void {
    localStorage.setItem(LocalStorageKey.ColorTheme, theme);
  }

  useIsomorphicLayoutEffect(() => {
    // Apply or remove the color theme class on the root element based on the state
    handleSetColorTheme(
      (localStorage.getItem(LocalStorageKey.ColorTheme) as ColorTheme) ?? COLOR_THEME_DEFAULT_VALUE,
    );
  }, []);

  return {
    colorTheme,
    setColorTheme: handleSetColorTheme,
    saveColorTheme,
  } as const;
}
