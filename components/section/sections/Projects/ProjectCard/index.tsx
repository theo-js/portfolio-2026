import { ExternalLinkIcon, GithubIcon, SparklesIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import type { FC } from 'react';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/ui/reveal';
import type { Project } from '../types';
import { RevealWithDescriptionGrow } from './RevealWithDescriptionGrow';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard: FC<ProjectCardProps> = async ({ project, index }) => {
  const t = await getTranslations('sections.projects');

  return (
    <div className="group relative">
      {/* Card container */}
      <div className="glass:bg-white/20 glass:border-white/40 glass:backdrop-blur-none glass:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.06),_0_8px_10px_-6px_rgba(0,0,0,0.06)] relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white/20 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
        {/* Image */}
        <div className="relative h-64 overflow-hidden rounded-t-2xl">
          <div className="h-full w-full duration-300 group-hover:scale-105">
            <Image
              src={project.imageUrl}
              alt={project.titleTKey}
              className="h-full w-full object-cover xl:transform-[translateX(calc(-60px*var(--offset-center)))_scaleX(calc(1+abs(var(--offset-center))/2.6))]"
              width={400}
              height={400}
              loading="eager"
            />
          </div>

          {/* Overlay */}
          <div
            className={`absolute inset-0 bg-gradient-to-t ${project.color} opacity-0 transition-opacity duration-300 group-hover:opacity-40`}
          />

          {/* Floating icon */}
          <div className="absolute top-4 right-4 scale-0 rotate-[-90deg] transition-all duration-500 group-hover:scale-100 group-hover:rotate-0">
            <div className={`bg-gradient-to-br p-3 ${project.color} rounded-full`}>
              <SparklesIcon className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>

        {/* Content */}
        <RevealWithDescriptionGrow delay={index * 0.1} descriptionIndex={1}>
          <h3 className="glass:text-white mb-3 text-2xl text-gray-900 dark:text-white">
            {t(project.titleTKey)}
          </h3>

          <p className="glass:text-white mb-4 leading-relaxed text-gray-600 dark:text-white/60">
            {t(project.descriptionTKey)}
          </p>

          {/* Tags */}
          <Reveal className="mb-6 flex! flex-wrap gap-2" options={{ delay: 0.3 + index * 0.1 }}>
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="glass:text-white glass:border-white/40 rounded-full border border-gray-300 bg-white/10 px-3 py-1 text-xs text-gray-700 dark:border-white/20 dark:bg-white/10 dark:text-white/70"
              >
                {tag}
              </span>
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
              <a
                href={project.link}
                target={project.link.startsWith('http') ? '_blank' : '_self'}
                rel="noopener noreferrer"
              >
                <ExternalLinkIcon className="h-4 w-4" />
                <span className="text-sm">{t('view-project')}</span>
              </a>
            </Button>

            {project.github && (
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
            )}
          </Reveal>
        </RevealWithDescriptionGrow>

        {/* Glow effect */}
        <div
          className={`pointer-events-none absolute -right-20 -bottom-20 h-45 w-45 bg-gradient-to-br dark:h-40 dark:w-40 ${project.color} rounded-full opacity-0 brightness-75 transition-opacity duration-500 group-hover:opacity-5 dark:blur-3xl dark:brightness-100 dark:group-hover:opacity-30`}
        />
      </div>
    </div>
  );
};
