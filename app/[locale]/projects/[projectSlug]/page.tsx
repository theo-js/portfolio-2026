import type { Locale } from 'next-intl';
import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import { ProjectDetailsHeader } from './_components/Header/server';
import { LongPostBody } from '@/components/layout/LongPostLayout';
import { ProjectDetailsFooter } from './_components/Footer';
import { projects } from '@/components/section/sections/Projects/constants';

export const generateStaticParams = async () => {
  const projectSlugs = fs.readdirSync(
    path.join(process.cwd(), 'app/[locale]/projects/[projectSlug]/_projectSlugs'),
  );
  const locales = (process.env.NEXT_PUBLIC_SUPPORTED_LOCALES ?? '').split(',');
  return locales.flatMap((locale) => projectSlugs.map((projectSlug) => ({ projectSlug, locale })));
};

const ProjectDetailsPage = async ({
  params: paramsPromise,
}: {
  params: Promise<{ locale: Locale; projectSlug: string }>;
}) => {
  const params = await paramsPromise;

  try {
    const ProjectDetailsContent = (
      await import(`./_projectSlugs/${params.projectSlug}/${params.locale}.mdx`)
    ).default;

    const project = projects.find((project) => project.slug === params.projectSlug);
    if (!project) throw new Error('Project not found');

    return (
      <>
        <ProjectDetailsHeader {...{ project }} />

        <LongPostBody>
          <ProjectDetailsContent />
        </LongPostBody>

        <ProjectDetailsFooter {...{ project }} />
      </>
    );
  } catch {
    return notFound();
  }
};

export const dynamicParams = false;

export default ProjectDetailsPage;
