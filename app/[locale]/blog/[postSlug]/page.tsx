import type { Locale } from 'next-intl';
import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import { LongPostBody } from '@/components/layout/LongPostLayout';
import { PostDetailsHeader } from './_components/Header';

export const generateStaticParams = async () => {
  const postSlugs = fs.readdirSync(
    path.join(process.cwd(), 'app/[locale]/blog/[postSlug]/_postSlugs'),
  );
  const locales = (process.env.NEXT_PUBLIC_SUPPORTED_LOCALES ?? '').split(',');
  return locales.flatMap((locale) => postSlugs.map((postSlug) => ({ postSlug, locale })));
};

const PostPage = async ({
  params: paramsPromise,
}: {
  params: Promise<{ locale: Locale; postSlug: string }>;
}) => {
  const params = await paramsPromise;

  try {
    const PostContent = (await import(`./_postSlugs/${params.postSlug}/${params.locale}.mdx`))
      .default;

    return (
      <>
        <PostDetailsHeader />

        <LongPostBody>
          <PostContent />
        </LongPostBody>
      </>
    );
  } catch {
    return notFound();
  }
};

export const dynamicParams = false;

export default PostPage;
