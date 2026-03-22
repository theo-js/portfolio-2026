import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { ViewTransition, type FC } from 'react';
import { GithubIcon, LinkIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MaxContentWidth } from '@/components/ui/layout/MaxContentWidth';
import type { Project } from '@/components/section/sections/Projects/types';
import { Reveal } from '@/components/ui/reveal';
import { Button } from '@/components/ui/button';
import { TypographyH1 } from '@/components/ui/typography/TypographyH1';
import { ViewTransitionName } from '@/core/ids/viewTransition';
import { ProjectTagBadge } from '@/components/section/sections/Projects/ProjectTag/Badge';
import { MarkAsVisited } from './client';
import { BreadCrumbsBar } from './BreadCrumbsBar';
import { ProjectBackgroundImage } from './BackgroundImage';

interface ProjectDetailsHeaderProps {
  project: Project;
}

export const ProjectDetailsHeader: FC<ProjectDetailsHeaderProps> = async ({ project }) => {
  const t = await getTranslations();

  return (
    <>
      <MarkAsVisited projectSlug={project.slug} />

      <header className="x relative overflow-hidden px-6 pt-24 pb-4">
        {project.backgroundImageUrl && (
          <ProjectBackgroundImage projectBackgroundImageUrl={project.backgroundImageUrl} />
        )}

        <BreadCrumbsBar projectTitleTKey={project.titleTKey} />

        <MaxContentWidth className="flex flex-col gap-4">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="flex flex-col items-start gap-4 md:flex-row">
              {/* Image */}
              <ViewTransition name={ViewTransitionName.ProjectImage({ slug: project.slug })}>
                <div className="glass:border-white/40 relative size-21 shrink-0 overflow-hidden rounded-lg border border-gray-300 dark:border-white/20">
                  <Image
                    src={project.imageUrl}
                    alt={t(`sections.projects.${project.titleTKey}`)}
                    className="bg-background h-full w-full object-cover"
                    width={82}
                    height={82}
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
        </MaxContentWidth>
      </header>
    </>
  );
};
