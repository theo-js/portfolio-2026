import { type FC } from 'react';
import { ExternalLinkIcon, GithubIcon } from 'lucide-react';
import { BaseSection } from '../../components/BaseSection';
import { SectionId } from '../../SectionId.enum';
import { Reveal } from '@/components/ui/reveal';
import { getTranslations } from 'next-intl/server';
import { ProjectCard } from './ProjectCard';
import { projects } from './constants';

export const ProjectsSection: FC = async () => {
  const t = await getTranslations('sections.projects');

  return (
    <BaseSection id={SectionId.Projects}>
      {/* Projects grid */}
      <Reveal className="grid! gap-8 md:grid-cols-2">
        {projects.map((project, index) => (
          <ProjectCard key={project.titleTKey} {...{ project, index }} />
        ))}
      </Reveal>

      {/* CTA */}
      <Reveal animation="scaleIn" className="mx-auto mt-16 w-fit text-center">
        <a
          href={`${process.env.NEXT_PUBLIC_GITHUB_PROFILE_URL}?tab=repositories`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 rounded-full border border-gray-300 bg-white/5 px-8 py-4 text-gray-700 backdrop-blur-xl transition-all hover:bg-white/10 dark:border-white/20 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
        >
          <GithubIcon className="h-5 w-5" />
          <span>{t('cta')}</span>
          <ExternalLinkIcon className="h-4 w-4" />
        </a>
      </Reveal>
    </BaseSection>
  );
};
