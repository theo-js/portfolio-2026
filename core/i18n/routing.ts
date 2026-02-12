import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: process.env.NEXT_PUBLIC_SUPPORTED_LOCALES?.split(',') ?? [],
  defaultLocale: process.env.NEXT_PUBLIC_DEFAULT_LOCALE ?? '',
  localeCookie: { name: 'locale' },
  localeDetection: true,
  alternateLinks: true,
});
