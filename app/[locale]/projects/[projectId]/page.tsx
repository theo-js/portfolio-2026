import type { Locale } from 'next-intl';
import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';

export const generateStaticParams = async () => {
  const projectIds = fs.readdirSync(
    path.join(process.cwd(), 'app/[locale]/projects/[projectId]/_projectIds'),
  );
  const locales = (process.env.NEXT_PUBLIC_AVAILABLE_LOCALES ?? '').split(',');
  return locales.flatMap((locale) => projectIds.map((projectId) => ({ projectId, locale })));
};

const ProjectDetailsPage = async ({
  params: paramsPromise,
}: {
  params: Promise<{ locale: Locale; projectId: string }>;
}) => {
  const params = await paramsPromise;

  try {
    const MdxFile = (await import(`./_projectIds/${params.projectId}/${params.locale}.mdx`))
      .default;
    return <MdxFile />;
  } catch {
    return notFound();
  }
};

export const dynamicParams = false;

export default ProjectDetailsPage;
