import { getRequestConfig } from 'next-intl/server';
import { resolveLocaleAndMessages } from './resolve-locale-and-messages';

export default getRequestConfig(async ({ requestLocale }) => {
  const requestedLocale = await requestLocale;
  return resolveLocaleAndMessages(requestedLocale);
});
