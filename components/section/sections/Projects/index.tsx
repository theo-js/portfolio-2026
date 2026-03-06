import type { FC } from 'react';
import { ExternalLinkIcon, GithubIcon } from 'lucide-react';
import { BaseSection } from '../../components/BaseSection';
import { SectionId } from '../../SectionId.enum';
import { Reveal } from '@/components/ui/reveal';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselIndicator,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { ProjectCard } from './ProjectCard';
import { projects } from './constants';
import { getTranslations } from 'next-intl/server';

export const ProjectsSection: FC = async () => {
  const t = await getTranslations('sections.projects');

  return (
    <BaseSection id={SectionId.Projects}>
      {/* Projects carousel */}
      <Carousel
        opts={{
          align: 'start',
          loop: true,
          skipSnaps: true,
        }}
      >
        <div className="contents gap-2 md:flex">
          <CarouselPrevious className="hidden xl:grid" />
          <CarouselContent>
            {projects.map((project, index) => (
              <CarouselItem
                key={project.titleTKey}
                className="grid basis-[calc(100%-2rem)] md:basis-[calc(50%-2rem)]"
              >
                <ProjectCard {...{ project, index }} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNext className="hidden xl:grid" />
        </div>

        <CarouselIndicator slidesLength={projects.length} className="mt-4" />
      </Carousel>

      {/* CTA */}
      <Reveal animation="scaleIn" className="mx-auto mt-16 w-fit text-center">
        <Button
          asChild
          variant="outline"
          rounded
          size="2xl"
          className="inline-flex items-center gap-3"
        >
          <a
            href={`${process.env.NEXT_PUBLIC_GITHUB_PROFILE_URL}?tab=repositories`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubIcon className="h-5 w-5" />
            <span>{t('cta')}</span>
            <ExternalLinkIcon className="h-4 w-4" />
          </a>
        </Button>
      </Reveal>
    </BaseSection>
  );
};
