import type { IntlMessages } from './messages';

export async function resolveLocaleAndMessages(
  locale: string | undefined,
): Promise<{ locale: string; messages: IntlMessages }> {
  const resolvedLocale = locale || (process.env.NEXT_PUBLIC_DEFAULT_LOCALE ?? '');
  let messages: IntlMessages;

  try {
    messages = (await import(`../../assets/i18n/${locale}.json`)).default;
  } catch {
    messages = (await import(`../../assets/i18n/${process.env.NEXT_PUBLIC_DEFAULT_LOCALE}.json`))
      .default;
  }

  return { locale: resolvedLocale, messages };
}
