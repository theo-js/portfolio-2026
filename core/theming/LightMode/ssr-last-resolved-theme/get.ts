import { cookies } from 'next/headers';
import { DEFAULT_LIGHT_MODE } from '../constants';
import type { LightMode } from '../types';
import { CookieName } from '@/core/ids/cookies';

export async function getSSRLastResolvedTheme() {
  const cookieStore = await cookies();
  const cookieValue = cookieStore.get(CookieName.LastResolvedTheme)?.value;
  return {
    ssrResolvedTheme: (cookieValue || DEFAULT_LIGHT_MODE) as LightMode,
  };
}
