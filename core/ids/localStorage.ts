export const LocalStorageKey = {
  ColorTheme: 'color-theme',
  GlassmorphismEnabled: 'glassmorphism-enabled',
  IsUserAwareOfThemeSelector: 'is-user-aware-of-theme-selector',
  Theme: 'theme',
};

export type LocalStorageKey = (typeof LocalStorageKey)[keyof typeof LocalStorageKey];
