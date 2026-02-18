import type { FC, PropsWithChildren } from 'react';
import { ThemeProvider as NextThemeProvider } from 'next-themes';

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => (
  <NextThemeProvider attribute="class" enableSystem disableTransitionOnChange>
    {children}
  </NextThemeProvider>
);
