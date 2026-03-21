import type { Locale } from 'next-intl';
import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import { MaxContentWidth } from '@/components/ui/layout/MaxContentWidth';
import { ProjectDetailsHeader } from './_components/Header/server';
import { projects } from '@/components/section/sections/Projects/constants';
import { ProjectDetailsFooter } from './_components/Footer';
import { ProjectDetailsBody } from './_components/Body';

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

        <div className="glass:light:bg-black/20 glass:dark:bg-black/40 glass:backdrop-blur-4xl glass:border-y glass:border-white/20 relative bg-clip-padding px-6">
          <MaxContentWidth className="relative">
            <div className="glass:border-transparent border-y py-8">
              <ProjectDetailsBody>
                <ProjectDetailsContent />
              </ProjectDetailsBody>
            </div>
          </MaxContentWidth>
        </div>

        <ProjectDetailsFooter {...{ project }} />
      </>
    );
  } catch {
    return notFound();
  }
};

export const dynamicParams = false;

export default ProjectDetailsPage;
