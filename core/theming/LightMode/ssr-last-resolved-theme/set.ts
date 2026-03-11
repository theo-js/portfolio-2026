'use client';

import { CookieName } from '@/core/ids/cookies';
import { useTheme } from 'next-themes';
import type { FC } from 'react';
import { useCookie, useIsomorphicLayoutEffect } from 'react-use';

/** Gets the last resolved theme from next-themes and syncs it to a cookie for SSR access. */
export const SyncCookieWithResolvedTheme: FC = () => {
  const [, setLastResolvedTheme] = useCookie(CookieName.LastResolvedTheme);
  const { resolvedTheme } = useTheme();

  useIsomorphicLayoutEffect(() => {
    if (resolvedTheme) setLastResolvedTheme(resolvedTheme);
  }, [resolvedTheme]);

  return null;
};
