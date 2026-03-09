import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';
import { ViewTransition, type FC } from 'react';
import { GithubIcon, LinkIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SectionId } from '@/components/section/SectionId.enum';
import type { Project } from '@/components/section/sections/Projects/types';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Reveal } from '@/components/ui/reveal';
import { Button } from '@/components/ui/button';
import { TypographyH1 } from '@/components/ui/typography/TypographyH1';
import { ViewTransitionName } from '@/core/ids/viewTransition';
import { ProjectTagBadge } from '@/components/section/sections/Projects/ProjectTag/Badge';
import { MarkAsVisited } from './Header.client';

interface ProjectDetailsHeaderProps {
  project: Project;
}

export const ProjectDetailsHeader: FC<ProjectDetailsHeaderProps> = async ({ project }) => {
  const t = await getTranslations();

  return (
    <>
      <MarkAsVisited projectSlug={project.slug} />

      <header className="flex flex-col gap-4">
        {/* Links */}
        <Breadcrumb>
          <BreadcrumbList options={{ duration: 2 }}>
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

        <div className="flex flex-col items-start justify-between gap-6 md:flex-row">
          <div className="flex flex-col items-start gap-4 md:flex-row">
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

          {/* Links */}
          {(project.website || project.github) && (
            <Reveal
              as="ul"
              className="flex! shrink-0 items-end gap-2 md:flex-col"
              childAs="li"
              childProps={{
                className: cn(
                  !project.website && 'first:hidden!',
                  !project.github && '[&:nth-child(2)]:hidden!',
                ),
              }}
            >
              {project.website && (
                <Button variant="outline" asChild>
                  <a href={project.website} target="_blank" rel="noopener noreferrer">
                    <LinkIcon />
                    {t('sections.projects.view-website')}
                  </a>
                </Button>
              )}

              {project.github && (
                <ViewTransition
                  name={ViewTransitionName.ProjectGithubButton({ slug: project.slug })}
                >
                  <Button variant="outline" asChild>
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <GithubIcon />
                      {t('sections.projects.view-github')}
                    </a>
                  </Button>
                </ViewTransition>
              )}
            </Reveal>
          )}
        </div>
      </header>
    </>
  );
};
