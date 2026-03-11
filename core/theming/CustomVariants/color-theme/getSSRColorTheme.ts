import { cookies } from 'next/headers';
import { CookieName } from '@/core/ids/cookies';
import { COLOR_THEME_DEFAULT_VALUE, type ColorTheme } from './themes';

export async function getSSRColorTheme() {
  const cookieStore = await cookies();
  const cookieValue = cookieStore.get(CookieName.ColorTheme)?.value;
  return {
    ssrColorTheme: (cookieValue || COLOR_THEME_DEFAULT_VALUE) as ColorTheme,
  };
}
