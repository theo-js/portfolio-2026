import type { Locale } from 'next-intl';
import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';

export const generateStaticParams = async () => {
  const projectSlugs = fs.readdirSync(
    path.join(process.cwd(), 'app/[locale]/projects/[projectSlug]/_projectSlugs'),
  );
  const locales = (process.env.NEXT_PUBLIC_AVAILABLE_LOCALES ?? '').split(',');
  return locales.flatMap((locale) => projectSlugs.map((projectSlug) => ({ projectSlug, locale })));
};

const ProjectDetailsPage = async ({
  params: paramsPromise,
}: {
  params: Promise<{ locale: Locale; projectSlug: string }>;
}) => {
  const params = await paramsPromise;

  try {
    const MdxFile = (await import(`./_projectSlugs/${params.projectSlug}/${params.locale}.mdx`))
      .default;
    return <MdxFile />;
  } catch {
    return notFound();
  }
};

export const dynamicParams = false;

export default ProjectDetailsPage;
