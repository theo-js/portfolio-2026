export const LocalStorageKey = {
  ColorTheme: 'color-theme',
  GlassmorphismEnabled: 'glassmorphism-enabled',
  IsUserAwareOfThemeSelector: 'is-user-aware-of-theme-selector',
  Theme: 'theme',
} as const;

export type LocalStorageKey = (typeof LocalStorageKey)[keyof typeof LocalStorageKey];
