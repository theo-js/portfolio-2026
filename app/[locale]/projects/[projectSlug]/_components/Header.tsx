import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';
import { ViewTransition, type FC } from 'react';
import { SectionId } from '@/components/section/SectionId.enum';
import type { Project } from '@/components/section/sections/Projects/types';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { TypographyH1 } from '@/components/ui/typography/TypographyH1';
import { ViewTransitionName } from '@/core/ids/viewTransition';
import { ProjectTagBadge } from '@/components/section/sections/Projects/ProjectTag/Badge';

interface ProjectDetailsHeaderProps {
  project: Project;
}

export const ProjectDetailsHeader: FC<ProjectDetailsHeaderProps> = async ({ project }) => {
  const t = await getTranslations();

  return (
    <header className="flex flex-col gap-4">
      {/* Links */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={`/#${SectionId.Projects}`}>{t('sections.projects.tag')}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator />

          <BreadcrumbItem className="text-primary glass:text-white">
            {t(`sections.projects.${project.titleTKey}`)}
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex items-start gap-4">
        {/* Image */}
        <ViewTransition name={ViewTransitionName.ProjectImage({ slug: project.slug })}>
          <div className="relative size-21 shrink-0 overflow-hidden rounded-lg">
            <Image
              src={project.imageUrl}
              alt={t(`sections.projects.${project.titleTKey}`)}
              className="h-full w-full object-cover"
              width={400}
              height={400}
              loading="eager"
            />
          </div>
        </ViewTransition>

        <div className="flex flex-col gap-1">
          {/* Title */}
          <ViewTransition name={ViewTransitionName.ProjectTitle({ slug: project.slug })}>
            <TypographyH1 className="use-bg-as-text-color from-secondary to-tertiary glass:bg-white glass:bg-none w-fit bg-gradient-to-r pb-1 text-left">
              {t(`sections.projects.${project.titleTKey}`)}
            </TypographyH1>
          </ViewTransition>

          {/* Tags */}
          <div className="flex! flex-wrap gap-2">
            {project.tags.map((tag) => (
              <ViewTransition
                key={tag.id}
                name={ViewTransitionName.ProjectTag({ slug: project.slug, tagId: tag.id })}
              >
                <ProjectTagBadge projectTag={tag} />
              </ViewTransition>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};
