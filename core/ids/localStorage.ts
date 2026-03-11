export const LocalStorageKey = {
  IsUserAwareOfThemeSelector: 'is-user-aware-of-theme-selector',
  Theme: 'theme',
} as const;

export type LocalStorageKey = (typeof LocalStorageKey)[keyof typeof LocalStorageKey];
