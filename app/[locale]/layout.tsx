// import type { Metadata } from "next";
import type { FC, PropsWithChildren } from 'react';
import { NextIntlProvider } from '@/core/i18n/NextIntlProvider';
import { ThemeProvider } from '@/core/theming/ThemeProvider';
import type { Params } from 'next/dist/server/request/params';
import { getLocale, getTranslations } from 'next-intl/server';
import { getOrigin } from '@/lib/server';
import type { Metadata } from 'next';
import '@/core/theming/globals.css';

const JsonLd: FC = async () => {
  const t = await getTranslations();
  const origin = await getOrigin();
  const locale = await getLocale();

  const jsonLd: object = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': 'https://example.com/#person',
    name: 'Théo Bayenet',
    jobTitle: t('meta.jsonld.jobtitle'),
    description: t('meta.description'),
    url: `${origin}/${locale}`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
      }}
    />
  );
};

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  const locale = await getLocale();
  const origin = await getOrigin();

  return {
    title: t('meta.title'),
    description: t('meta.description'),
    alternates: {
      canonical: `${origin}/${locale}`,
      languages: process.env.NEXT_PUBLIC_SUPPORTED_LOCALES?.split(',').reduce(
        (acc, locale) => ({
          ...acc,
          [locale]: `${origin}/${locale}`,
        }),
        {},
      ),
    },
    robots: 'index, follow',
    openGraph: {
      title: t('meta.title'),
      description: t('meta.description'),
      url: `${origin}/${locale}`,
      siteName: t('meta.title'),
      locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('meta.title'),
      description: t('meta.description'),
      images: ['/profile-theo-bayenet.webp'],
    },
    applicationName: t('meta.title'),
    authors: [{ name: 'Théo Bayenet', url: origin }],
    creator: 'Théo Bayenet',
  };
}

export async function generateStaticParams() {
  return (
    process.env.NEXT_PUBLIC_SUPPORTED_LOCALES?.split(',').map((locale) => ({
      locale,
    })) || []
  );
}

export default async function RootLayout({
  children,
  params: rawParams,
}: PropsWithChildren<{
  params: Params;
}>) {
  const params = await rawParams;
  const locale = ((params.locale as string) || process.env.NEXT_PUBLIC_DEFAULT_LOCALE) ?? '';

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <NextIntlProvider locale={locale}>
          <ThemeProvider>{children}</ThemeProvider>
        </NextIntlProvider>

        <JsonLd />
      </body>
    </html>
  );
}
