import { NextIntlClientProvider } from 'next-intl';
import { resolveLocaleAndMessages } from './resolve-locale-and-messages';

export default async function NextIntlProvider({
  children,
  locale,
}: React.PropsWithChildren<{
  locale: string;
}>) {
  const providerProps = await resolveLocaleAndMessages(locale);

  return <NextIntlClientProvider {...providerProps}>{children}</NextIntlClientProvider>;
}
