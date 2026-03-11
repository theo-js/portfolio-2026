export const CookieName = {
  LastResolvedTheme: 'last-resolved-theme',
  GlassmorphismEnabled: 'glassmorphism-enabled',
  ColorTheme: 'color-theme',
};
export type CookieName = (typeof CookieName)[keyof typeof CookieName];
