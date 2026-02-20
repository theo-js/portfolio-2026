import { ExternalLinkIcon, GithubIcon, SparklesIcon } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { FC } from 'react';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/ui/reveal';
import type { Project } from '../types';
import { RevealWithDescriptionGrow } from './RevealWithDescriptionGrow';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard: FC<ProjectCardProps> = async ({ project, index }) => {
  const t = await getTranslations('sections.projects');

  return (
    <div className="group relative">
      {/* Card container */}
      <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
        {/* Image */}
        <div className="relative h-64 overflow-hidden">
          <div className="h-full w-full">
            <Image
              src={project.imageUrl}
              alt={project.titleTKey}
              className="h-full w-full object-cover"
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
          <h3 className="mb-3 text-2xl text-gray-900 dark:text-white">{t(project.titleTKey)}</h3>

          <p className="mb-4 leading-relaxed text-gray-600 dark:text-white/60">
            {t(project.descriptionTKey)}
          </p>

          {/* Tags */}
          <Reveal className="mb-6 flex! flex-wrap gap-2" options={{ delay: 0.3 + index * 0.1 }}>
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-gray-300 bg-white/10 px-3 py-1 text-xs text-gray-700 dark:border-white/20 dark:bg-white/10 dark:text-white/70"
              >
                {tag}
              </span>
            ))}
          </Reveal>

          {/* Action buttons */}
          <Reveal
            className="mt-auto flex! gap-4"
            options={{ delay: 0.4 + index * 0.1 }}
            childProps={{ className: 'first:grow' }}
          >
            <Button
              asChild
              className="from-primary to-secondary flex flex-1 items-center justify-center gap-2 rounded-lg bg-gradient-to-r px-4 py-2 text-white"
            >
              <a href={project.link} target="_blank" rel="noopener noreferrer">
                <ExternalLinkIcon className="h-4 w-4" />
                <span className="text-sm">{t('view-project')}</span>
              </a>
            </Button>

            <Button
              asChild
              className="flex items-center justify-center rounded-lg border border-gray-300 bg-white/10 px-4 py-2 text-gray-700 transition-colors hover:bg-white/20 dark:border-white/20 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
            >
              <a href={project.github} target="_blank" rel="noopener noreferrer">
                <GithubIcon className="h-4 w-4" />
              </a>
            </Button>
          </Reveal>
        </RevealWithDescriptionGrow>

        {/* Glow effect */}
        <div
          className={`pointer-events-none absolute -right-20 -bottom-20 h-40 w-40 bg-gradient-to-br ${project.color} rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-30`}
        />
      </div>
    </div>
  );
};
