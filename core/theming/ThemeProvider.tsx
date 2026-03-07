import type { FC, PropsWithChildren } from 'react';
import { ThemeProvider as NextThemeProvider } from 'next-themes';
import { LocalStorageKey } from '../ids/localStorage';
import { CustomVariantsProvider } from './CustomVariants/CustomVariantsContextProvider';

export type LightMode = 'light' | 'dark' | 'system';

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => (
  <NextThemeProvider
    attribute="class"
    defaultTheme="dark"
    storageKey={LocalStorageKey.Theme}
    enableSystem
    disableTransitionOnChange
  >
    <CustomVariantsProvider>{children}</CustomVariantsProvider>
  </NextThemeProvider>
);
