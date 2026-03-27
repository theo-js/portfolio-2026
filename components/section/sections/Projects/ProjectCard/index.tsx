'use client';

import { ExternalLinkIcon, GithubIcon, SparklesIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { ViewTransition, type FC } from 'react';
import { ViewTransitionName } from '@/core/ids/viewTransition';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/effects/reveal';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import type { Project } from '../types';
import { ProjectTagBadge } from '../ProjectTag/Badge';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard: FC<ProjectCardProps> = ({ project, index }) => {
  const t = useTranslations('sections.projects');

  return (
    <div className="group relative">
      {/* Card container */}
      <div className="glass:bg-white/20 glass:border-white/40 glass:backdrop-blur-none glass:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.06),_0_8px_10px_-6px_rgba(0,0,0,0.06)] relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white/20 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
        {/* Image */}
        <ViewTransition name={ViewTransitionName.ProjectImage({ slug: project.slug })}>
          <div className="relative h-64 overflow-hidden rounded-t-2xl">
            <Link
              href={`/projects/${project.slug}`}
              className="block h-full w-full duration-300 hover:scale-105"
            >
              <Image
                src={project.imageUrl}
                alt={project.titleTKey}
                className="h-full w-full object-cover xl:transform-[translateX(calc(-60px*var(--offset-center)))_scaleX(calc(1+abs(var(--offset-center))/2.6))]"
                width={400}
                height={400}
                loading="lazy"
              />
            </Link>

            {/* Overlay */}
            <div
              className={`absolute inset-0 bg-gradient-to-t ${project.color} pointer-events-none opacity-0 transition-opacity duration-300 group-hover:opacity-40`}
            />

            {/* Floating icon */}
            <div className="absolute top-4 right-4 scale-0 rotate-[-90deg] transition-all duration-500 group-hover:scale-100 group-hover:rotate-0">
              <div className={`bg-gradient-to-br p-3 ${project.color} rounded-full`}>
                <SparklesIcon className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>
        </ViewTransition>

        {/* Content */}
        <Reveal
          delay={index * 0.1}
          animation="fadeIn"
          className="flex! grow-1 flex-col p-6"
          childProps={(index) => (index === 1 ? { className: 'grow-1' } : {})}
        >
          <ViewTransition name={ViewTransitionName.ProjectTitle({ slug: project.slug })}>
            <h3 className="glass:text-white mb-3 w-fit text-2xl text-gray-900 dark:text-white">
              {t(project.titleTKey)}
            </h3>
          </ViewTransition>

          <p className="glass:text-white mb-4 leading-relaxed text-gray-600 dark:text-white/60">
            {t(project.descriptionTKey)}
          </p>

          {/* Tags */}
          <Reveal className="mb-6 flex! flex-wrap gap-2" options={{ delay: 0.3 + index * 0.1 }}>
            {project.tags.map((tag) => (
              <ViewTransition
                key={tag.id}
                name={ViewTransitionName.ProjectTag({ slug: project.slug, tagId: tag.id })}
              >
                <ProjectTagBadge projectTag={tag} />
              </ViewTransition>
            ))}
          </Reveal>

          {/* Action buttons */}
          <Reveal
            className="mt-auto flex! gap-4"
            options={{ delay: 0.4 + index * 0.1 }}
            childProps={{
              className: cn('first:grow', !project.github && '[:nth-child(2)]:hidden!'),
            }}
          >
            <Button
              asChild
              className="flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2"
            >
              <Link href={`/projects/${project.slug}`} rel="noopener noreferrer">
                <ExternalLinkIcon className="h-4 w-4" />
                <span className="text-sm">{t('view-project')}</span>
              </Link>
            </Button>

            {project.github && (
              <ViewTransition name={ViewTransitionName.ProjectGithubButton({ slug: project.slug })}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button asChild variant="outline" size="icon">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={t('view-github')}
                      >
                        <GithubIcon className="h-4 w-4" />
                      </a>
                    </Button>
                  </TooltipTrigger>

                  <TooltipContent>{t('view-github')}</TooltipContent>
                </Tooltip>
              </ViewTransition>
            )}
          </Reveal>
        </Reveal>

        {/* Glow effect */}
        <div
          className={`pointer-events-none absolute -right-20 -bottom-20 h-45 w-45 bg-gradient-to-br dark:h-40 dark:w-40 ${project.color} -z-1 rounded-full opacity-0 brightness-75 transition-opacity duration-500 group-hover:opacity-5 dark:blur-3xl dark:brightness-100 dark:group-hover:opacity-30`}
        />
      </div>
    </div>
  );
};
