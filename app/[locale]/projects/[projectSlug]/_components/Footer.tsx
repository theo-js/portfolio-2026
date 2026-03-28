import { projects } from '@/components/section/sections/Projects/constants';
import type { Project } from '@/components/section/sections/Projects/types';
import { Label } from '@/components/ui/label';
import { MaxContentWidth } from '@/components/ui/layout/MaxContentWidth';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import type { FC } from 'react';

interface ProjectDetailsFooterProps {
  project: Project;
}

export const ProjectDetailsFooter: FC<ProjectDetailsFooterProps> = async ({ project }) => {
  const t = await getTranslations();
  const projectIndex = projects.findIndex((p) => p.slug === project.slug);
  const prevProject = projectIndex > 0 ? projects[projectIndex - 1] : projects[projects.length - 1];
  const nextProject = projectIndex < projects.length - 1 ? projects[projectIndex + 1] : projects[0];

  return (
    <footer className="px-6 pt-8 pb-24">
      <MaxContentWidth>
        <nav className="flex items-start justify-between gap-16">
          <div className="flex flex-col items-start gap-1">
            <Label id="prev-project-label" className="cursor-default">
              {t('sections.projects.previous-project')}
            </Label>
            <Link
              href={`/projects/${prevProject.slug}`}
              className="text-muted-foreground glass:text-white/80 hover:text-foreground glass:hover:text-white inline-flex items-center gap-2 text-lg md:text-2xl"
              aria-labelledby="prev-project-label"
            >
              <ArrowLeftIcon size={20} className="hidden md:inline" />
              {t(`sections.projects.${prevProject.titleTKey}`)}
            </Link>
          </div>

          <div className="flex flex-col items-end gap-1 text-right">
            <Label id="next-project-label" className="cursor-default">
              {t('sections.projects.next-project')}
            </Label>
            <Link
              href={`/projects/${nextProject.slug}`}
              className="text-muted-foreground glass:text-white/80 hover:text-foreground glass:hover:text-white inline-flex items-center gap-2 text-lg md:text-2xl"
              aria-labelledby="next-project-label"
            >
              {t(`sections.projects.${nextProject.titleTKey}`)}
              <ArrowRightIcon size={20} className="hidden md:inline" />
            </Link>
          </div>
        </nav>
      </MaxContentWidth>
    </footer>
  );
};
