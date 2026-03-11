import { cookies } from 'next/headers';
import { CookieName } from '@/core/ids/cookies';
import { GLASSMORPHISM_ENABLED_DEFAULT_VALUE } from './constants';

export async function getSSRIsGlassmorphismEnabled() {
  const cookieStore = await cookies();
  const cookieValue = cookieStore.get(CookieName.GlassmorphismEnabled)?.value;
  return {
    ssrIsGlassmorphismEnabled: (cookieValue || GLASSMORPHISM_ENABLED_DEFAULT_VALUE) === 'true',
  };
}
